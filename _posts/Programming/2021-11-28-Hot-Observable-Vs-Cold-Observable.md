---
layout: post
title: Hot Observable vs Cold Observable
subtitle: Async Programming
author: jopemachine
tags:
  - Async Programming
header-img: img/header-img/coding.jpg
header-mask: 0.3
last-update: September 25, 2022
---

# Hot Observable vs Cold Observable

## Hot Observabel

- 구독하는 타이밍에 따라 받아볼 수 있는 데이터가 달라짐.

- 예를 들어, 브라우저의 onClick 핸들러 같은 걸 7초 이후에 구독한다고 하면, 그 때 까지의 유저의 클릭들을 다 놓치게 된다. 그러니 상식적으로 UI의 핸들러들은 생성 즉시 구독해야 한다.

- 비유적으로, 라이브 스트리밍을 많이 드는 것 같다. 이것도 마찬가지로, 라이브 스트리밍에 나중에 입장한 사람은 그 시점까지의 이벤트들을 놓치게 된다.

- 생성된 순간 바로 방출하기 시작한다.

## Cold Observable

- Timeout 앞에 Timeout을 하나 더 붙였다고 그 뒤에 받아볼 수 있는 데이터가 달라지지 않는다.

- 구독하는 순간 모든 데이터 스트림 이벤트를 받아볼 수 있게 된다. 당연히 생성된 순간 바로 방출할 필요는 없다.

# 출처

- [Frontend masters - Advanced Async Js 강의](https://frontendmasters.com/courses/advanced-async-js/multiple-subscribes-to-one-observable/)