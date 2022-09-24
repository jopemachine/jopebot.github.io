---
layout: post
title: cluster vs worker_thread vs child_process
subtitle: Node.js
author: jopemachine
tags:
  - Node
header-img: img/header-img/node.png
header-mask: 0.3
last-update: October 12, 2021
---

# Cluster vs Worker_thread

## cluster

- 멀티프로세싱.

- 서버 포트를 공유하는 Node 프로세스를 여러 개 두어 요청이 많이 들어올 때 병렬로 요청이 분산되게 할 수 있다.

- 직접 구현해도 되지만 `pm2` 쓴다.

- 스케줄링은 OS에 맡길 수도 있고 `Round robin 방식`으로 설정할 수도 있다.

## worker_thread

- 노드에서 여러 스레드를 사용하고 싶을 때 사용한다

- `cluster` 모듈과 거의 같은 사용법을 갖고 있다.

- 멀티쓰레딩.

## child_process

- 다른 프로세스를 생성하고 명령어를 수행해 해당 결과를 표준 입출력으로 가져온다.

- 다른 프로세스를 생성해 `ipc` (Inter Process Communication)도 구현 가능함.

- `exec`: 셸을 실행해 명령어 실행.

- `spawn`: 새로운 프로세스 실행.
