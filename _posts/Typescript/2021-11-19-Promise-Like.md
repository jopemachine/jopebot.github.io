---
layout: post
title: PromiseLike, ArrayLike 같은 타입들을 쓰는 이유
subtitle: Typescipt
author: jopemachine
tags:
  - Typescript
  - Translation
header-img: img/header-img/typescript.jpg
header-mask: 0.3
last-update: November 23, 2021
---

# PromiseLike, ArrayLike 같은 타입들을 쓰는 이유

`Like`가 붙는 타입들은 더 느슨한 선언을 가진다.

예를 들어, `Array`의 경우, 아래의 모든 메서드, 프로퍼티를 가지지 않으면 `Array` 타입이 아니다.

```ts
interface Array<T> {
    length: number;
    toString(): string;
    toLocaleString(): string;
    push(...items: T[]): number;
    pop(): T | undefined;
    concat(...items: T[][]): T[];
    concat(...items: (T | T[])[]): T[];
    join(separator?: string): string;
    reverse(): T[];
    shift(): T | undefined;
    slice(start?: number, end?: number): T[];
    sort(compareFn?: (a: T, b: T) => number): this;
    splice(start: number, deleteCount?: number): T[];
    splice(start: number, deleteCount: number, ...items: T[]): T[];
    unshift(...items: T[]): number;
    indexOf(searchElement: T, fromIndex?: number): number;
    lastIndexOf(searchElement: T, fromIndex?: number): number;

    // lots of other methods such as every, forEach, map, etc

    [n: number]: T;
}
```

하지만 `length` 프로퍼티를 가지고 number를 인덱스로 사용할 수 있는 타입이라면 모두 `ArrayLike` 타입에 해당한다.

```ts
interface ArrayLike<T> {
    readonly length: number;
    readonly [n: number]: T;
}
```

`Promise`도 마찬가지로, 만약 어떤 프라미스를 인자로 받는 함수를 작성한다면 `Promise` 대신 `PromiseLike` 타입을 사용해 `bluebird` 등 다른 서드파티 프라미스 라이브러리를 사용하는 유저들도 해당 함수를 사용 가능하도록 만들 수 있다.

```ts
function doSomething(promise: PromiseLike<any>) { ... }
```

## 원문

- [Why Does Typescript Use Like Types](https://stackoverflow.com/questions/43712705/why-does-typescript-use-like-types)

