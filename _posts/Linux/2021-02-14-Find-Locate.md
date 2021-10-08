---
layout: post
title: find와 locate의 차이점에 대해서
subtitle: 리눅스 명령어 정리
author: jopemachine
header-img: img/header-img/linux.png
header-mask: 0.3
tags:
  - Linux
last-update: October 12, 2021
---

## find와 locate

`find`와 `locate`는 둘 다 파일을 찾는 명령어이다

### find

`find`는 런타임에 입력으로 주어진 파일 디렉터리에서 조건에 명시된 파일들을 찾는 명령어이다.

사용법은 아래와 같다.

```shell-script
$ find <~에서> <조건 옵션> <조건>
```

예제는 아래와 같다

```shell-script
# /etc에서 passwd 파일 찾기
$ find /etc -name passwd

# /usr/share에서 size가 10MB보다 큰 파일들 찾기
$ find /usr/share -size +10M

# /home에서 user가 chris인 파일들을 list 형식으로 출력
$ find /home -user chris -ls

# /home에서 user가 chris, joe인 파일들을 list 형식으로 출력
$ find /home -user chris -or -user joe -ls

# /etc에서 group이 ntp인 파일들을 list 형식으로 출력
$ find /etc -group ntp -ls

# /etc에서 수정된 지 10분 미만인 파일들을 출력
$ find /etc/ -mmin -10

# /bin, /usr/bin, /sbin, /usr/sbin에서 3일 동안 수정된적이 있는 파일들을 출력
$ find /bin /usr/bin /sbin /usr/sbin -ctime -3
```

#### 찾은 파일 실행하기

`find` 명령은 찾은 파일들에 `exec`, `ok` 옵션을 통해 다른 명령을 이어 실행할 수 있다.

명령어에 찾은 파일들의 경로를 `{}` 기호로 전달할 수 있고,

명령어를 실행한 후엔 명령이 끝났다는 의미로 `\;`를 입력해 줘야 한다.

예제는 아래와 같다.

```shell-script
# /etc에서 iptables가 담긴 파일들의 경로를 모두 찾아 I found를 붙여 출력한다.
$ find /etc -iname iptables -exec echo "I found {}" \;
```

### locate

`find` 명령어는 런타임에 파일들을 직접 찾는 명령어이므로 정확하지만 많은 파일들을 검색해야 할 경우 느리다.

`locate`는 미리 `updatedb` 명령어가 업데이트 해 놓은 파일 데이터베이스를 검색하므로 더 빠른 검색이 가능하지만,

`updatedb` 명령어가 실행된 이후 변경된 파일을 검색할 수 없으므로 부정확할 수 있다.

(`updatedb` 명령은 하루에 한 번씩 실행되어 리눅스 시스템의 모든 파일명을 수집하고 DB로 만들어두는 명령어이다.)

## 그 외 찾아볼 명령어

1. grep
-> `grep`은 파일, 표준 출력을 검색해 해당 row를 출력한다.

2. [fzf](https://github.com/junegunn/fzf)
-> `fzf`는 fuzzy finding을 위한 검색 명령어이다. `fzf`는 approximate string matching을 사용하여 비슷한 파일명을 찾아준다.
정확히 일치하지 않더라도 비슷한 파일명을 갖는 파일들을 찾아주기 때문에 제일 편리한 것 같다.

## Related

- [리눅스 바이블](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791185890586)
