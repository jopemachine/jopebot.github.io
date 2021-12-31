---
layout: post
title: Blocking, non blocking vs sync, async
subtitle: Programming
author: jopemachine
tags:
  - Programming
header-img: img/header-img/coding.jpg
header-mask: 0.3
last-update: December 31, 2021
---

# Blocking, Non blocking vs Sync, Async

![](/img/posts/Programming/2021-12-31-Blocking-Non-Blocking-Vs-Sync-Async/download.png)

비동기 처리에 대해 원래 sync는 blocking이고 async는 non blocking 이다 라고만 이해해두었으나, 잘못 이해하고 있는 부분이 있어 다시 정리해둔다.

(여전히 잘못 이해하고 있는 부분이 있을 수 있음)

## Blocking vs Non blocking

### Blocking

- Blocking은 말 그대로 파일을 읽거나 API 콜을 하는 등 (시간이 오래 걸리기 때문에 병렬 처리가 필요한) 특정 태스크가 끝날 때 까지 기다리는 방식이다.

- Blocking 함수는 **함수가 끝난 시점에 태스크가 끝나 있다**.

- 병렬 구조 없이 Blocking 함수가 끝날 때 까지 기다리고만 있기 때문에 비효율적이다.

- 기본적으로 function call은 blocking 이다.

### Non-blocking

- 반면에 Non blocking 함수는 실행 흐름에 Multiplex를 적용해 바로 리턴하고, 비동기 태스크 (오래 걸리는 작업)를 다른 스레드에서 처리하거나 (멀티 스레딩 언어) 태스크 큐에 넣어놓고 콜 스택이 비었을 때 처리되도록 한다 (Javascript).

- **Non-blocking인 함수는 함수가 끝난 시점과 태스크가 무관하며, 콜백 함수를 태스크 큐에 등록해 놓는 식으로 처리를 위임**한다. 위임된 콜백은 종종 polling (IOCP, epoll 등) 을 통해 구현된다.

## Sync vs Async

- `Sync`는 예측 가능한 시점에, 예측 가능한 순서대로 실행된다. 예측 가능한 순서란 것은, 함수 내에서 실행 흐름의 주도권이 계속 본인에게 있다는 것을 의미함.

- `Sync`는 시스템 콜이 리턴되는 시점에 function call도 리턴.

- 반면 `Async`는 순서가 정해져 있지 않다. 태스크에 관심이 없고, 실행 흐름을 양도한다.

### Sync blocking

![](/img/posts/Programming/2021-12-31-Blocking-Non-Blocking-Vs-Sync-Async/synchronous-blocking-IO.png)

- 태스크를 수행하면서 단순히 끝나기만을 기다리기만 해, 애플리케이션 전체의 수행이 blocking 된다.

- 커널 관점에서 바라본다면, System call이 끝날 때 까지 기다리며, 콜이 끝나야 리턴한다.

### Sync non-blocking

![](/img/posts/Programming/2021-12-31-Blocking-Non-Blocking-Vs-Sync-Async/Synchronous-non-blocking-IO.png)

- 폴링 하면서 다른 작업을 처리. (Busy waiting)

### Async non-blocking

![](/img/posts/Programming/2021-12-31-Blocking-Non-Blocking-Vs-Sync-Async/Asynchronous-non-blocking-IO.png)

- 태스크를 등록해놓고 다른 일을 함.

- 자바스크립트에선 프라미스에 then 콜백을 등록해놓고 await 없이 다른 일 처리를 실행하는 것.

### Async blocking

- async 함수를 호출해 Async blocking인 줄 알았는데 내부에서 sync blocking function을 호출해서 실은 blocking인 경우.

### Async await (javascript)

```js
(async function () {
  await fs.promises.readFile('a');
  console.log('blocking');
}) ();

console.log('non-blocking');
```

- 태스크를 수행하면서 해당 function call 아래 라인은 blocking 된다.

- 즉, 해당 function 내부에서 Blocking 되는 것 처럼 보이지만, 비동기 처리가 되어 있기 때문에, (브라우저) 이벤트 처리 등 애플리케이션은 자기 일 처리가 가능함.

- `await` 구문을 적용하면 function call이 끝난 시점에 태스크가 끝나게 된다, 즉 `await` 구문은 Async 함수를 sync로 보이게 만들어준다.

### Generator(javascript)

- async, await이 표준이 아닐 땐 `co`와 같은 라이브러리를 사용해 Generator로 동기적으로 만들어 사용했다.

## 결론

- sync, async와 blocking, non-blocking은 다른 개념이다.

## Related links

- [JS Async Programming With Promise and Generator](https://suhwan.dev/2018/04/18/JS-async-programming-with-promise-and-generator/)
