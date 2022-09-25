---
layout: post
title: Type Systems, Covariance, Contravariance, Bivariance, and Invariance
subtitle: Programming
author: jopemachine
tags:
  - Programming
  - Typescript
  - Translation
header-img: img/header-img/typescript.jpg
header-mask: 0.3
last-update: September 25, 2022
---

# Type Systems: Covariance, Contravariance, Bivariance, and Invariance

## Invariance

```ts
function method(value: Invariant<City>) {...}
method(new Noun());         // error...
method(new City());         // okay
method(new SanFrancisco()); // error...
```

- `Invariance`는 딱 해당 객체만 허용한다. 해당 객체의 Superset, Subset들은 거절된다.

## Covariance

```ts
function method(value: Covariant<City>) {...}
method(new Noun());         // error...
method(new City());         // okay
method(new SanFrancisco()); // okay
```

- `Covariance`는 해당 객체의 Subset을 허용해준다.

## Contravariance

```ts
function method(value: Contravariant<City>) {...}
method(new Noun());         // okay
method(new City());         // okay
method(new SanFrancisco()); // error...
```

- `Contravariance`는 반대로 객체의 Superset을 허용해준다.

## Bivariance

```ts
function method(value: Bivariant<City>) {...}
method(new Noun());         // okay
method(new City());         // okay
method(new SanFrancisco()); // okay
```

- `Bivariance`는 객체의 Superset, Subset을 모두 허용한다.

# 하위 클래스들의 타입 변화

## Good

```ts
// Equally specific inputs and outputs — Good
class SubClass extends BaseClass {
  method(value: City): City { ... }
}

// More specific outputs — Good
class SubClass extends BaseClass {
  method(value: City): SanFrancisco { ... }
}

// Less specific inputs — Good
class SubClass extends BaseClass {
  method(value: Noun): City { ... }
}

```

## Bad

```ts
// Less specific outputs — Bad
class SubClass extends BaseClass {
  method(value: City): Noun { ... } // ERROR!!
}

// More specific inputs — Bad
class SubClass extends BaseClass {
  method(value: SanFrancisco): City { ... } // ERROR!!
}
```

## 원문

- [Type Systems: Covariance, Contravariance, Bivariance, and Invariance explained](https://medium.com/@thejameskyle/type-systems-covariance-contravariance-bivariance-and-invariance-explained-35f43d1110f8)