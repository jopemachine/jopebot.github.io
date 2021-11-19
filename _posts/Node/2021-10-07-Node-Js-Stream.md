---
layout: post
title: Node.js stream에 대해
subtitle: Node.js
author: jopemachine
tags:
  - Node
header-img: img/header-img/node.png
header-mask: 0.3
last-update: November 19, 2021
---

# Node.js stream에 대해

1. `Readable`

2. `Writable`

3. `Duplex`

4. `Transform`

- 모두 `EventEmitter`를 상속해 이벤트 emit으로 구현하거나 다른 스트림에 파이프 시켜 구현할 수 있다.

- `Readable` 스트림의 경우 `data`, `end` 이벤트를 emit하고 `Wriable` 스트림의 경우 `drain`, `finish` 이벤트를 emit.

## 구현

- 큐를 사용해 구현되어 있음

- 버퍼에 highWatermark 만큼의 데이터가 모임.

- Stream pipe의 목표는 데이터 버퍼링을 허용 가능한 수준으로 제한하는 것

- `Duplex`, `Transform` 스트림은 각각 2개의 버퍼를 가짐.

## Readable stream의 모드

- `Flowing Mode`, `Pause Mode` 가 있다.

- `Flowing Mode`의 경우 알아서 읽어온다는 것이고, `Pause mode`는 데이터를 수동으로 가져와야 할 때 사용함

## 등장 배경 관련

- callback은 그냥 완료되면 실행하란 개념.

- 중간 중간 callback의 결과를 이벤트 방식으로 (EventEmitter) 가져올 순 없을까? 하는 과정에서 등장한 것이라 EventEmitter를 상속
