---
layout: post
title: (Typescript) unknown 타입을 이용한 에러 핸들링
subtitle: Typescript
author: jopemachine
tags:
  - Typescript
header-img: img/header-img/typescript.jpg
header-mask: 0.3
last-update: November 28, 2021
---

# Typescript

## unknown 타입을 이용한 에러 핸들링

- try-catch 문의 catch 문에서 잡힌 에러는 사실 스트링 타입일 수도 있음.

```ts
function somethingRisky() {}

try {
  somethingRisky();
} catch (err) {
  // Bad
  console.error(err);
}
```

- `somethingRisky` 함수에서 string 타입의 에러를 던지지 않는다고 해도 그 함수가 사용하는 다른 함수에서 그런 에러를 던질 수도 있다.

- 따라서, err는 unknown 타입으로 만들어져야 적절함.

```ts
function somethingRisky() {}

try {
  somethingRisky();
} catch (err: unknown) {
  if (err instanceof Error) {
    console.error(err.stack);
  } else {
    console.error(err);
  }
}
```

- 물론 타입 가드를 사용해 아래처럼 만들어도 된다.

```ts
function somethingRisky() {}

function isError(err: any): err is Error {
  return err instanceof Erorr;
}

try {
  somethingRisky();
} catch (err: unknown) {
  // Good, 타입 가드를 통해 아래 라인의 err는 Error 타입이 된다.
  if (isError(err)) {
    console.error(err.stack);
  } else {
    console.error(err);
  }
}
```

- assert문을 넣어 스트링 타입의 경우 catch 문에 아예 들어올 수 없도록 만들고 싶다면, 아래처럼 만들면 된다.

```ts
function somethingRisky() {}

function assertIsError(err: any): asserts err is Error {
  return (!(err instanceof Error)) throw new Error(`Not an error: ${err}`);
}

try {
  somethingRisky();
} catch (err: unknown) {
  assertIsError(err);
  // 조건문 없이 타입 가드를 적용할 수 있어서 좋음.
  // 마찬가지로 아랫 줄 부터 타입 가드가 적용된다.
  console.log(err.stack;) 
}
```

# 원문

- [Frontend masters - Production-Grade Typescript 강의](https://frontendmasters.com/courses/production-typescript/error-handling-with-unknown/)