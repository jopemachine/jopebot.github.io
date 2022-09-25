---
layout: post
title: 강타입 언어 vs 약타입 언어 / 동적 타입 언어 vs 정적 타입 언어
subtitle: 프로그래밍 언어
author: jopemachine
tags:
  - Programming
  - Programming Language
header-img: img/header-img/coding.jpg
header-mask: 0.3
last-update: September 25, 2022
---

# 강타입 언어 vs 약타입 언어

- 이 용어들은 언어가 **올바르지 않은 타입 정보를 가진 프로그램을 실행하는 것을 허용하는지**를 나타낸다.

- `강타입`, `약타입`의 언어의 기준은 자의적일 수 있다. `강타입` 언어에 대한 명확한 정의가 정해져 있지 않다.

- 그럼에도 불구하고 일반적인 `강타입` 언어의 특징을 정리해 보면 다음과 같다.

- `강타입`은 형선언을 하고, 타입의 정의가 복합적이고 잘 정의되어 있고, 타입의 변환이 엄격해 암묵적인 캐스팅을 금지한다. (`약타입`은 그 반대)

- `약타입` 언어는 런타임에 타입 오류가 있더라도 실행을 막지 않는다.

# 동적 타입 언어 vs 정적 타입 언어

- 이 용어들은 언어에서 **자료형이 결정되는 시점**을 나타낸다.

- `정적 타입 언어`는 컴파일 시 변수의 타입이 결정된다. `동적 타입 언어`는 런타임에 자료형이 결정된다.

- `동적 타입 언어`는 자료형을 지정할 필요가 없으니 유연하고 자유롭게 소스 코드를 작성할 수 있는 반면, `정적 타입 언어`는 안정적인 코드 작성이 가능하다.

- `약한 타입`, `강한 타입` 언어 개념과 `동적 타입`, `정적 타입` 언어는 완전히 다른 개념이다.

![](/img/posts/Programming/2021-11-15-Vs/img1.daumcdn.png)

## 약타입 언어에서 강타입 언어의 특징 사용하기

- 타입스크립트, 파이썬과 같은 약타입 언어에서 강타입 언어의 특징을 일부 사용해 보다 안정적인 프로그램을 만들기 위해 라이브러리들 ([joi](https://github.com/sideway/joi) 등)이 있다.

- `joi`를 사용해 타입스크립트에서 정의한 타입을 런타입에 검증할 수 있다. IO를 통과하는 객체들에 이와 같은 라이브러리를 사용해 검증해두면, 객체들의 타입 안정성을 보장할 수 있고, 더 안정적으로 코딩할 수 있다.

- 타입스크립트의 경우 타입 가드 함수 내부에서 객체를 검증할 수도 있다. 더 적은 런타임 코스트로 객체 검증이 가능.

```ts
// 출처 : https://frontendmasters.com/courses/production-typescript/types-at-runtime/
function isITeam(arg: any): arg is ITeam {
  return (
    typeof arg.name === 'string' &&
    typeof arg.id === 'string'
  );
}
```