---
layout: post
title: (Typescript) type vs interface
subtitle: Typescript
author: jopemachine
tags:
  - Typescript
  - Translation
header-img: img/header-img/typescript.jpg
header-mask: 0.3
last-update: November 28, 2021
---

# type vs interface

## type을 써야할 때

- 프리미티브 타입의 별칭을 만드는 경우

```ts
// type과 interface의 가장 눈에 보이는 차이는, type은 프리미티브 타입 aliasing이 가능하다는 것.
// 아래와 같은 별칭 선언은 interface로 할 수 없다.
type Nullish = null | undefined;
type Fruit = 'apple' | 'pear' | 'orange';
type Num = number | bigint;
```

- `튜플` 타입, `union` 타입, `function` 타입 정의에 type을 쓴다.

```ts
// 튜플 타입 선언도 type으로 가능
type row = [colOne: number, colTwo: number];

// 함수 타입은 사실 인터페이스로도 만들 수 있지만, type 쪽이 깔끔하다.
type Sum = (x: number, y: number) => number;
interface Sum {
  (x: number, y: number): number;
}

// Union 타입을 만드는 것도 역시 type으로만 가능하다.
type Fruit = 'apple' | 'pear' | 'orange';
type Vegetable = 'broccoli' | 'carrot' | 'lettuce';

// 'apple' | 'pear' | 'orange' | 'broccoli' | 'carrot' | 'lettuce';
type HealthyFoods = Fruit | Vegetable;
```

- `mapped types`이 필요할 경우

```ts
type Fruit = 'apple' | 'orange' | 'banana';

// 타입을 사용하면 문제 없음!
// mapped type을 사용하려면 type을 사용해야 한다.
// mapped type에 관해서는 아래 링크 참고
// https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types
type FruitCount = {
  [key in Fruit]: number;
}

const fruits: FruitCount = {
  apple: 2,
  orange: 3,
  banana: 4
};

type Fruit = 'apple' | 'orange' | 'banana';

// 아래는 ERROR!!
interface FruitCount {
  [key in Fruit]: number;
}
```

- 함수를 오버로딩 할 때

```ts
/* Intersection vs Inheritance */

interface NumLogger { 
  log: (val: number) => void;
}
// 아래 코드는 아무 문제 없음.
type StrAndNumLogger = NumLogger & { 
  log: (val: string) => void;
}

const logger: StrAndNumLogger = {
  log: (val: string | number) => console.log(val)
}

logger.log(1)
logger.log('hi')

// 에러!!, NumLogger를 extend할 수 없음!
// Interface 'StrAndNumLogger' incorrectly extends interface 'NumLogger'
// 위와 같은 에러 발생 때문에 함수 오버로딩이 필요한 상황인 경우 type을 사용해야 한다.
interface StrAndNumLogger extends NumLogger { 
    log: (val: string) => void; 
};
```

## interface를 써야할 때

- 굳이 type을 사용하지 않아도 되는 다른 상황들

- 자바스크립트의 객체의 개방, 확장성에 대응하듯 interface 키워드는 확장에 열려 있음.

- 선언 병합 (declaration merging)이 필요한 상황들 (라이브러리 제작 등)엔 반드시 interface 사용.

```ts
interface Person {
  name: string;
}

interface Person {
  age: number;
}

// Person 타입은 자동으로 아래처럼 병합된다!
// interface Person {
//   age: number;
//   name: string;
// }

// no error
const person: Person = {
  name: 'Mark',
  age: 25
};

```

## Best practice

- interface를 type 보다 먼저 고려한다.

# 원문

- [Interfaces vs Types in Typescript](https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript)

## 참고

- [Differences Between Type Aliases and Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)