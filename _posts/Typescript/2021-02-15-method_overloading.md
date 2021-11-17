---
layout: post
title: 타입스크립트 메서드 오버로드
subtitle: Typescript 문법
author: jopemachine
header-img: img/header-img/typescript.jpg
header-mask: 0.3
tags:
  - Typescript
last-update: October 10, 2021
---

## 타입스크립트에서 메서드 오버로드가 다른 언어와 다른 이유

타입스크립트는 메서드 오버로드를 지원하지 않는다.

다른 언어처럼 오버로드한다면 타입스크립트를 자바스크립트로 바꾸어 실행할 때, 오버로드 했던 함수들이 같은 헤더를 갖게 된다.

자바스크립트에서 함수 변수는 단순히 함수 포인터일 뿐으로, 오버로딩이 불가능하다.

그래서 타입스크립트에서의 메서드 오버로드는 구현 없이 헤더만 여럿 선언해 놓고

하나의 구현부에서 수동으로 매개 변수를 검사하는 식으로 작성해야 한다.

## 메서드 오버로드 예제

```ts
  public connect(path: string, connectionListener?: GenericFunction): Socket;

  public connect(
    port: number,
    host: string,
    connectionListener?: GenericFunction
  ): Socket;

  public connect(
    options: TcpSocketConnectOpts | IpcSocketConnectOpts,
    connectionListener?: GenericFunction
  ): Socket;

  public connect(arg1: any, arg2?: any, arg3?: any) {
    let connectionPromise: Promise<Deno.Conn>;
    let path, port, host, options, connectionListener: any;

    // * arg1: port
    // * arg2: host
    // * arg3: connectionListener
    if (typeof arg1 === "number" && arg2 && typeof arg2 === "string") {
      port = arg1;
      host = arg2;
      connectionListener = arg3;

      ...
    }

    // handle 'path', 'connectionListener'
    else if (typeof arg1 === "string" && arg2 && !arg3) {
      path = arg1;
      connectionListener = arg2;

      ...
    }

    // handle 'options', 'connectionListener'
    else {
      options = arg1;
      connectionListener = arg2;
      ...
    }

```

## 출처

[https://stackoverflow.com/questions/12688275/is-there-a-way-to-do-method-overloading-in-typescript](https://stackoverflow.com/questions/12688275/is-there-a-way-to-do-method-overloading-in-typescript)
