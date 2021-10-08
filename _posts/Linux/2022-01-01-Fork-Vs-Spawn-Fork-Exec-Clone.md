---
layout: post
title: fork vs spawn (그 외 exec, clone 등)
subtitle: Linux
author: jopemachine
tags:
  - Linux
  - Nodejs
header-img: img/header-img/linux.png
header-mask: 0.3
last-update: January 01, 2022
---

# fork vs spawn (fork_exec, clone 등)

## fork

- 현재 프로세스를 clone해 자식 프로세스를 생성함.
- 부모 프로세스의 모든 리소스를 카피한다.
- Linux (Unix)에서 기본 값.

## spawn

- 프로세스 생성 속도는 fork 보다 살짝 느리다.
- spawn은 fork + exec 이다, 즉 자식 프로세스를 생성한 후 명령어를 실행한다.
- child_process에 최소한의 자원만 카피한다.
- Windows에서 기본 값.

### posix_spawn

- 모든 modern UNIX 시스템에 포함됨.
- 메모리의 모든 내용을 복사하지 않음. (경량화 버전)

## clone

- posix_spawn의 리눅스 버전. 경량화 된 자식 프로세스 spawn.

## exec

- 자식 프로세스를 생성하는 게 아니라, 현재 프로세스의 내용을 바꾸는 함수.
- 현재 PCB를 재활용하기 위해 사용.

## Related links

- [nodejs의 자식프로세스](https://velog.io/@dev2820/nodejs%EC%9D%98-%EC%9E%90%EC%8B%9D%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4#spawn-%EB%AA%85%EC%84%B8) 

- [Node Js Child Process Difference Between Spawn Fork](https://stackoverflow.com/questions/17861362/node-js-child-process-difference-between-spawn-fork)