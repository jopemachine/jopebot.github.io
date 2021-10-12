---
layout: post
title: "Prototype 이란?"
subtitle: "프론트 면접 질문 정리"
author: jopemachine
tags: 
 - Frontend
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# 프로토타입 이란?

- 자바스크립트엔 ES6까지 class가 없었고, `상속` 개념을 사용하려면 프로토타입 기반의 상속을 이용한다. ES6의 class 개념도 프로토타입 기반에서 작동한다.

- 생성자 함수는 자신의 생성자 (`constructor` 함수)를 멤버로 갖는 프로토 타입을 가짐.

- 생성자 함수의 `prototype` 이란 프로퍼티로 프로토타입에 접근 가능하다.

- 생성자 함수로 생성된 인스턴스는 `__proto__`라는 은닉된 프로퍼티로 프로토타입에 접근 가능하다. 그러나 `Object.getPrototypeOf`를 사용하는 것이 권장됨.

- Arrow function과 메서드는 프로토타입을 갖지 않는다.

## 프로토타입 체인

- 프로토타입 검색 메커니즘을 확장한 것으로, 중복을 제거하는 여러가지 상속 패턴을 구현 가능.

- 상속과 마찬가지로 상위 프로토타입 객체에 동일한 이름의 프로퍼티가 있으면 하위 프로토타입 객체에 가려진다.

## 관련 함수들

### Object.create

### isPrototypeOf

### getPrototypeOf

### setPrototypeOf

# Related links

- [Must-Know-About-Frontend, Prototype](https://github.com/baeharam/Must-Know-About-Frontend/blob/main/Notes/javascript/prototype.md)