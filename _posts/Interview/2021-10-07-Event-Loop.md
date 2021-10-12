---
layout: post
title: "이벤트 루프에 관해 (Event loop)"
subtitle: "프론트 면접 질문 정리"
author: jopemachine
tags: 
 - Frontend
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# 이벤트 루프에 관해 (Event loop)

- *싱글 스레드로 도는 자바스크립트가 비동기 함수를 핸들링 하기 위한 동시성 모델* (디자인 패턴)

- 브라우저, Node 환경에서 각각 이벤트 루프가 존재해 비동기 작업을 처리한다.

- 콜스택이 빌 때 마다 태스크 큐에서 대기하던 콜백함수가 콜스택으로 넘어와 (`tick`) 실행되는 방식이다.

- 이벤트 구현을 위해 크롬은 `libevent`, 노드는 `libuv`를 사용한다. 

## 태스크 큐

- 태스크 큐는 콜백함수를 처리하는 큐 말고도 마이크로태스크 큐, Animation Frames 큐 (브라우저 환경), nextTick 큐 (노드 환경) 등 여러 큐가 있다

- promise는 마이크로태스크 큐 (Job queue) 에서 처리된다.

- 큐들의 우선순위는 `마이크로 태스크 큐 > animation frame 큐 > 콜백 큐`

## 브라우저 이벤트 루프 vs 노드 이벤트 루프

### 마이크로 태스크 vs 매크로 태스크

- Node js 11 이전엔 브라우저와 마이크로 태스크, 매크로 태스크 (콜백 함수의 태스크) 우선 순위 할당 방법이 달랐다.

### 타이머 동작

- `setTimeout`의 동작은 Node, 브라우저에서 다르다. 브라우저들 마다도 다르다.

## nextTick vs setImmediate

- 두 함수 모두 Nodejs의 전용 API. (일부 브라우저는 `setImmediate`를 지원하긴 한다)

- 이름이 서로 잘못 지어진 케이스.

- `nextTick`은 콜백 함수를 이벤트 루프의 phase에 관계 없이 바로 실행함. (immediate) 즉, `nextTick`이 더 먼저 실행된다.

- `setImmediate`는 이벤트 루프의 가능한 다음 loop에 실행함. (next loop)

