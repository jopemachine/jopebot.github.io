---
layout: post
title: Blocking, non blocking vs sync, async
subtitle: Programming
author: jopemachine
tags:
  - Programming
header-img: img/header-img/coding.jpg
header-mask: 0.3
last-update: September 24, 2022
---

# Blocking, Non blocking vs Sync, Async

![](/img/posts/Programming/2021-12-31-Blocking-Non-Blocking-Vs-Sync-Async/download.png)

원래 `sync`는 `blocking`이고 `async`는 `non blocking` 이라고 이해해두었으나, Node.js에서만 그렇게 작동하고, 원래 다른 개념이기 때문에 다시 정리해둔다.

## Blocking vs Non blocking

### Blocking

- `blocking`은 말 그대로 파일을 읽거나 API 콜을 하는 등 특정 태스크가 끝날 때 까지 기다리는 방식이다.

- `blocking` 함수는 **함수가 리턴하는 시점에 태스크가 끝나 있다**.

- 병렬 구조 없이 `blocking` 함수가 리턴할 때 까지 기다리고만 있기 때문에 비효율적이고, 작동 방식이 단순하다. (다만 `non-blocking`이라고 해서 병렬적인 것은 아니다. concurrency와 parallelism의 차이 참고)

- 기본적으로 `function call`은 `blocking`이다.

### Non-blocking

- 반면에 `Non blocking` 함수는 실행 흐름에 Multiplexing을 적용해 바로 리턴하고, 비동기 태스크 (오래 걸리는 작업)를 다른 스레드에서 처리하거나 (멀티 스레딩 언어) 태스크 큐에 넣어놓고 콜 스택이 비었을 때 처리되도록 한다 (브라우저 및 Node.js와 같은 이벤트 루프를 사용하는 런타임).

- **Non-blocking인 함수는 함수가 끝난 시점과 태스크가 무관하며, 콜백 함수를 태스크 큐에 등록해 놓는 식으로 처리를 위임**한다. 위임된 콜백은 종종 polling (`IOCP`, `epoll` 등)을 통해 구현된다.

## Sync vs Async

- `Sync`는 예측 가능한 시점에, 예측 가능한 순서대로 실행된다. 예측 가능한 순서란 것은, 함수 내에서 실행 흐름의 주도권이 계속 본인에게 있다는 것을 의미하며, 리턴 값을 받아서 바로 처리한다.

- `Sync`는 System call이 리턴되는 시점에 `function call`도 리턴.'

- 반면 `Async`는 순서가 정해져 있지 않다. 태스크에 관심이 없고, 실행 흐름을 런타임에 양도한다.

- `Aync`는 태스크에 관심이 없기 때문에 작업이 끝나지 않은 상태에서 `function call`이 그냥 리턴된다. 작업은 프라미스, 콜백 함수 등의 형태로 비동기 태스크를 위임한 런타임에서 처리된다.

### Sync blocking

![](/img/posts/Programming/2021-12-31-Blocking-Non-Blocking-Vs-Sync-Async/synchronous-blocking-IO.png)

- 태스크를 수행하면서 단순히 끝나기를 기다리기만 해, 해당 스레드의 수행이 block 된다.

- 커널 관점에서 바라본다면, 호출된 `System call`이 끝날 때 까지 caller는 계속 기다려야하며, `System call`이 끝나야 function call이 리턴되고, 리턴 받은 값으로 다음 명령어가 실행되게 된다.

### Sync non-blocking

![](/img/posts/Programming/2021-12-31-Blocking-Non-Blocking-Vs-Sync-Async/Synchronous-non-blocking-IO.png)

- Multiplexing을 통해 폴링(polling) 하면서 다른 작업을 처리한다. 작업이 처리되면 caller에서 다음 작업을 수행하기 때문에 `sync` (태스크가 위임되지 않았다.), 작업이 수행되는 동안 다른 작업을 수행할 수 있기 때문에 `non-blocking`이다.

- `epoll`, `select`가 대표적인 `Sync non-blocking` 함수.

### Async non-blocking

![](/img/posts/Programming/2021-12-31-Blocking-Non-Blocking-Vs-Sync-Async/Asynchronous-non-blocking-IO.png)

- 태스크를 등록해놓고 다른 작업을 처리 함.

- Node.js, 브라우저에서 프라미스에 `then` 콜백 함수를 위임해놓고 다른 일 처리를 실행하는 것. caller가 콜백 함수(태스크)에 관심이 없으므로 `async`, 호출한 이후 다른 작업을 수행할 수 있기 때문에 `non-blocking`이다.

- WinAPI에선 `IOCP`가 대표적인 `Async non-blocking`.

### Async blocking

- `async` 함수를 호출해 `Async blocking`인 줄 알았는데 내부에서 `Sync blocking function`을 호출해서 실은 `blocking인` 경우.

### Async await (javascript)

```js
(async function () {
  await fs.promises.readFile('a');
  console.log('blocking');
}) ();

console.log('non-blocking');
```

- 태스크를 수행하면서 해당 `function call` 아래 라인은 block 된다.

- 즉, 해당 function 내부에서 block 되는 것 처럼 보이지만, 비동기 처리가 되어 있기 때문에, (브라우저) 이벤트 처리 등 애플리케이션은 다른 일을 처리할 수 있다.

- `await` 구문을 적용하면 `function call`이 끝난 시점에 태스크가 끝나게 된다, 즉 `await` 구문은 `async` 함수를 `sync`로 보이게 만들어 줌으로써 caller 구현부를 단순하게 만들어준다.

### Generator (javascript)

- `async`, `await`이 표준이 아닐 땐 `co`와 같은 라이브러리를 사용해 `Generator`로 동기적으로 만들어 사용했다.

## 결론

- `sync`, `async`와 `blocking`, `non-blocking`은 다른 개념이다.

- Node.js에선 `sync`는 `blocking`으로, `async`는 `non-blocking`으로 구현되어 있다.

## Related links

- [JS Async Programming With Promise and Generator](https://suhwan.dev/2018/04/18/JS-async-programming-with-promise-and-generator/)
