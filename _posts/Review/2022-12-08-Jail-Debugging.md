---
layout: post
title: Backend.AI Jail 삽질 / 디버깅 경험기
subtitle: Troubleshooting Review
author: jopemachine
tags:
  - Debugging
  - Security
header-img: img/header-img/security.jpg
header-mask: 0.3
last-update: December 22, 2022
---

# Backend.AI Jail이란?

비록 아직 [Backend.AI Jail](https://github.com/lablup/backend.ai-jail)에 대해 모두 이해하진 못했지만, 내 이해를 토대로 간단하게 설명하면 `Backend.AI Jail`은 시스템 콜을 후킹해 특정 시스템 콜이 호출되었을 때 로그를 남기거나, 아예 프로세스를 종료시켜 버리도록 만들어주는 샌드박스이다.

좀 더 자세한 (그리고 정확한) 내용은 해당 [ppt](https://files.speakerdeck.com/presentations/e2f4e4e1127d4f478406d53c7af9428a/SPARCS_TeaParty_-_SornaJail.pdf)를 참고하면 좋을 것 같다.

## 개발 환경 구축부터 난항...

개인적으로 여러 프로그래밍 언어에 흥미를 갖고 있어 Go 언어의 경우 이미 어느 정도 익숙하게 사용할 수 있었고, Jail은 코드 양도 상대적으로 적은 편이라 어렵지 않을 것이라고 생각했다.

하지만 빌드하면서 바로 문제를 마주치게 되었다. 현재 시점에서 `Backend.AI Jail`은 `amd64` 머신 용으로 작성되어 있는데, 필자의 경우 `arm64` 프로세서 기반의 m1 맥북을 사용하고 있었고, 개발 환경과 CPU 아키텍쳐가 달라서 (컴파일은 당연히 안 되고) `syscall` 모듈의 많은 필드들이 vscode [LSP](https://learn.microsoft.com/ko-kr/visualstudio/extensibility/language-server-protocol?view=vs-2022)에 잡히지 않았다.

크로스 컴파일 관련 경험은 많지 않았기 때문에 처음엔 조금 당황스러웠다.

### 플랫폼에 맞는 환경 변수 설정

`linux/amd64` 용으로만 빌드할 수 있도록 작성된 프로그램이니, `amd64` 머신 쪽으로 관련된 환경 변수들(`GOOS`, `GOARCH`, `CGO_ENABLED`)을 설정해 주는 것으로 해결할 수 있을 거라고 생각했다.

vscode의 경우 위 환경 변수들을 적절히 설정해 주는 것으로 필드를 찾을 수 없다는 에러 메세지들이 더 이상 나오지 않고, 인텔리센스 기능도 활용 가능하게 만들 수 있었다.

그 다음은 도커 컨테이너를 빌드하고 실행, 내부에 접속해 소스 코드를 빌드해야 했다.

### 빌드 문제

그런데 attach한 docker 컨테이너 내부에서 `make build`를 실행할 때 `gcc: error: unrecognized command line option '-m64'`란 에러 메세지를 마주치게 되었다. `m64`라는 플래그가 무엇인지는 잘 모르겠지만 `gcc`에서 에러를 내고 있으니, 단순히 `m64`란 플래그를 주지 않으면 해결 될 줄 알고 몇 시간 동안 삽질했으나, `Dockerfile`에서도, `Makefile`에서도 그런 플래그를 주지 않았다.

그런데 잘 생각해보니 `arm64` 컨테이너에서 `gcc`의 플래그를 변경해 `amd64` 용으로 크로스 컴파일 하도록 만들 것이 아니라, 애초에 docker 컨테이너를 `amd64` 용으로 에뮬레이팅 하도록 바꾸면 플래그에 대해 신경쓸 필요 자체가 없어지는 문제였다.

결론적으로 아래처럼 설정 파일을 변경함으로써, `arm64` 기반의 맥북에서 개발 환경을 성공적으로 구축하고 드디어 빌드에 성공했다!.. 라고 착각하고 퇴근했다.

```
/src # ./backend.ai-jail --policy=./example_policy.yml --debug t1.py
DEBUG MODE: showing all details
Environment:
PATH=/go/bin:/usr/local/go/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOME=/root
ScmpFilter.Load (2): invalid argument
Unexpected wait status 0x100
/src #
```

다음 날 분명히 빌드에는 성공했었던 Jail을 실행시키니 예상대로 동작하지 않았다.

*invalid argument*라는 알 수 없는 에러 메세지가 발생하는데, `Jail`에서도 `libseccomp`의 소스 코드에서도 관련 있어 보이는 에러 메세지를 찾지 못했다. 알 수 없는 모종의 이유 (?)로 `libseccomp` 내부에서 `EINVAL` 에러를 던지고 있는 것 같다고 대충 추측하고 넘어갔다. 😅

가장 의심이 가는 것은 도커의 `amd64` 에뮬레이터였다. 그런데 이미 전에 쓰던 인텔 맥은 팔아 버렸고 어떻게 해야 할지 난감했다. 😢

집에 인텔 cpu를 사용하고 있는 데스크톱 컴퓨터가 따로 있긴 한데 지금은 고시텔에 지내고 있고, 여기 네트워크 환경이 워낙 안 좋아 원격 접속으로 이걸 쓰는 건 무리였다.

지난 주에 Backend.ai Cloud의 계정을 발급 받았으니, 이걸로 세션을 만들어 디버깅 해 보면 되지 않을까? 하는 생각이 잠깐 들었지만, 현재 구현에선 docker를 Backend.ai 세션 내부에서 돌릴 수 없었다.

좀 더 고민해 본 끝에 AWS EC2 인스턴스가 생각났다. 왜 이걸 바로 생각 못 했는지 바보 같이 느껴졌다. AWS EC2 인스턴스에 amd64 우분투 환경을 설정하고 의존성 몇 개 설치하고 Jail을 빌드하고 나니 드디어 Jail이 의도대로 동작하는 것을 확인할 수 있었다! 🎉

## 이슈 접근 및 해결

### 원인 파악 및 삽질

여기까지의 시도들은 모두 `amd64` 기반의 머신을 사용하고 있지 않았기 때문에 개인적으로 삽질했던 것이고, 원래 할당 받은 이슈인 Jail에서 python을 돌릴 때 뭔가 문제가 생기고 있다.. 는 이슈는 아직 디버깅 시작도 하지 못한 상태였다.

C언어로 fork를 호출하는 간단한 코드로 Jail을 테스트 해 보니 Allowed list에 fork를 넣으면 바이너리가 잘 실행되고, 빼면 실패했다. 분명히 잘 작동하고 있는 것 같었다.

그런데 인자로 python을 넘기니 전혀 예상치 못한 에러 메세지를 만나게 되었다.

```
Error loading shared library libpython3.8.so.1.0: Function not implemented (needed by /usr/bin/python3)
Error relocating /usr/bin/python3: Py_BytesMain: symbol not found
```

python 바이너리에서 `Py_BytesMain`을 찾지 못했다고? 바로 `python` 명령을 실행해 봤지만 당연히 정상적으로 실행되었다. 얼핏 보면 아마 엔트리 포인트 함수 이름 같은데 그게 아닌가 싶어서 구글링 해 봤지만, 대충 맞는 것 같았다. cpython Documentation에서 `Py_BytesMain`가 3.8 버전에서 구현된 함수라길래 파이썬 버전 업데이트를 위해 `alpine` 버전도 올려봤는데 똑같은 에러 메세지를 마주해야 했다. 혹시 몰라서 베이스 이미지도 `alpine`에서 `ubuntu`로 바꿔서 해 봐도 똑같은 맥락의 에러 메세지가 났다.

있어야 할 심볼을 찾지 못한 것도 그렇고, `Not implemented`라는 에러 메세지도 그렇고 뭔가 인프라 관련해 생긴 에러가 분명하다고 생각했다. 그게 몇 시간 동안 구글링 하며 괜한 시간을 날리고 삽질하게 된 원인이 되었다.

### 문제 해결

답은 코드에 있었다.

Jail이 무슨 일을 하는 프로그램인지 생각해보며 적당히 주석 처리하면서 디버깅해 보니 seccomp loader를 생성해 Allowed list의 시스템 콜들을 후킹 하지 않으면 정상적으로 동작하는 것을 확인할 수 있었다. 즉, 파이썬 바이너리에서 호출하는 시스템 콜들 중 Jail의 Default policy에서 엑세스를 제한하고 있는 것이 있을 것이라고 추측할 수 있었다. 🤔

그래서 호출되는 시스템 콜들을 확인하기 위해 `strace`를 사용해 디버깅 해 보았다.

`strace python3 -c "print('abc')"`의 출력 결과는 아래와 같았다.

```
execve("/usr/bin/python3", ["python3", "-c", "print('abc')"], 0x7ffc12ca1ef0 /* 8 vars */) = 0
arch_prctl(ARCH_SET_FS, 0x7f5bf3f79b48) = 0
set_tid_address(0x7f5bf3f79fb0)         = 5406
brk(NULL)                               = 0x55dd35728000
brk(0x55dd3572a000)                     = 0x55dd3572a000
mmap(0x55dd35728000, 4096, PROT_NONE, MAP_PRIVATE|MAP_FIXED|MAP_ANONYMOUS, -1, 0) = 0x55dd35728000
open("/etc/ld-musl-x86_64.path", O_RDONLY|O_LARGEFILE|O_CLOEXEC) = -1 ENOENT (No such file or directory)
...
munmap(0x7f5bf3a42000, 8192)            = 0
rt_sigprocmask(SIG_BLOCK, ~[RTMIN RT_1 RT_2], [], 8) = 0
rt_sigprocmask(SIG_SETMASK, [], NULL, 8) = 0
munmap(0x7f5bf3b75000, 114688)          = 0
munmap(0x7f5bf3a40000, 4096)            = 0
exit_group(0)                           = ?
+++ exited with 0 +++
```

출력 결과가 700줄이 넘어, 어떤 시스템 콜들이 호출되고 있는지 한 눈에 확인하기 어려웠다. 그래서 간단한 파싱 스크립트를 짜서 어떤 시스템 콜들이 있는지, 몇 번이나 호출되는지 확인해 보았다.

```
execve: 1
arch_prctl: 1
set_tid_address: 1
brk: 3
mmap: 155
open: 41
fcntl: 34
fstat: 59
read: 55
close: 37
mprotect: 3
getcwd: 2
getrandom: 1
munmap: 120
madvise: 9
stat: 77
readlink: 5
clock_gettime: 1
getdents64: 17
ioctl: 35
lseek: 60
rt_sigaction: 65
rt_sigprocmask: 5
dup: 3
geteuid: 1
getuid: 1
getegid: 1
getgid: 1
readv: 1
write: 1
exit_group: 1
```

위 시스템 콜들과 Default policy의 Allowed list를 대조해 본 결과, 이 중 4개의 시스템 콜이 Allowed list에 명시되어 있지 않다는 것을 확인할 수 있었고, 단지 이것들을 추가해주니 Jail에서 python이 실행되지 않는 문제를 간단히 해결할 수 있었다! 🎊

### `seccomp` Default policy 업데이트 자동화

문제의 발생한 근본적인 원인은 결국 시간이 지나면서 seccomp의 Default policy 시스템 콜 Allowed list가 노후화 되었었다는 것이었고, 나중에 같은 이유로 또 알 수 없는 에러 메세지로 실패하는 것을 방지하기 위해, Github action을 통해 [docker seccomp profile](https://github.com/moby/moby/blob/master/profiles/seccomp/default.json)을 가져와 자동으로 업데이트 하도록 변경했다.

[https://github.com/lablup/backend.ai-jail/pull/18](https://github.com/lablup/backend.ai-jail/pull/18)

## 느낀 점

`strace`나 `ltrace`와 같은 바이너리 트레이서 도구를 활용해 본 것은 처음이었고, 관련된 경험이 없었기 때문에 처음엔 막막했지만, 이 도구들은 딱히 시스템 프로그래밍이나 컴퓨터 구조와 관련된 전문 지식을 요하지 않아서 간단하게 활용해 볼 수 있었다.

호기심이 많아서 이것 저것 공부해뒀던 것들이 나름대로 이슈 해결에 도움이 되는 것 같아 기분 좋았다. 🙂
