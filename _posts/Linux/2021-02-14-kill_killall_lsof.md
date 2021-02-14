---
layout: post
title: "특정 프로세스 죽이기"
subtitle: '리눅스 명령어 정리'
author: "jopemachine"
header-img: "img/posts/header-img/linux.png"
header-mask: 0.3
tags:
  - Linux
---

## kill

`kill`은 프로세스에 각종 신호를 보낼 수 있는 명령어이다.

리눅스에서 사용할 수 있는 신호들은 아래와 같다.

|   신호   |   번호   |  ️     설명       |
| ---- | ----- | ----- |
| SIGHUP | 1 | 터미널 제어 시 또는 제어 프로세스 종료 시 감지되는 행업 신호 |
| SIGINT | 2 | 키보드에서 인터럽트 신호를 보냈을 때 발생 |
| SIGQUIT | 3 | 키보드에서 종료 신호를 보냈을 때 발생 |
| SIGABRT | 6 | abort (3번 신호) 를 무시하라는 신호 |
| SIGKILL | 9 | 프로세스 종료 신호 |
| SIGTREM | 15 | 프로세스 중단 신호 |
| SIGCONT | 19, 18, 25 | 중지된 프로세스 재개  |
| SIGSTOP | 17, 19, 23 | 프로세스 중지  |

여러 번호를 갖는 시그널들은 컴퓨터 아키텍쳐마다 다른 신호가 사용되기 때문이다.

`kill`은 인자가 주어지지 않았을 때 기본적으로 15번 시그널을 전송한다.

프로세스를 종료하기 위한 사용법은 아래와 같다.

```shell-script
$ kill -9 10432
$ kill kill -SIGKILL 10432
```

**종료하려는 프로세스의 포트번호를 모를 땐 먼저 포트 번호를 알아내야 한다.**

`lsof` 명령을 이용할 수 있다.

아래와 같이 사용 가능하다.

```shell-script
# 3000번 포트의 프로세스 출력
$ lsof -i :3000
COMMAND  PID     USER   FD   TYPE            DEVICE SIZE/OFF NODE NAME
Kite    1304 igyubong   26u  IPv4 0x95363694aab149d      0t0  TCP 192.168.219.199:64677->kul08s06-in-f14.1e100.net:http (ESTABLISHED)

$ kill -9 1304
```

**해당 프로세스를 모두 종료해도 괜찮을 땐, `killall` 명령을 이용할 수도 있다.**

```shell-script
$ killall -9 node
```

`killall` 명령어는 일일히 PID를 확인하지 않고도 프로세스를 바로 종료할 수 있다는 장점이 있지만,

실행 중인 모든 프로세스를 종료한다.

## 그 외 명령어 및 프로그램

1. [kill-port](https://www.npmjs.com/package/kill-port)


## 출처

[리눅스 바이블](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791185890586)


