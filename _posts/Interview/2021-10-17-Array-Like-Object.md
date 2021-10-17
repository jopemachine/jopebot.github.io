---
layout: post
title: "ArrayLike object에 대해"
subtitle: "프론트 면접 질문 정리"
author: jopemachine
tags: 
 - Frontend
 - Javascript
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# ArrayLike object에 대해

- 객체인데 `length`와 (optional) map, filter 등의 메서드를 선언하고 배열인 척 한다.

- `arguments`, `HtmlCollection`이 대표적인 Array like object.

## ArrayLike 객체를 배열로 변환하는 법

- `map`, `filter`, `join` 등 배열 메서드들의 구현은 선택적이고, 메서드 시그니쳐, 구현부도 다를 수 있다. 그 외에도 배열이 아니기 때문에 다루기 어려운 부분이 있을 수 있다.

### Array.from 이용

### spread operator 이용

- ES6 이후부턴 [Symbol.iterator]가 구현되어 있는 Array like object들에 적용할 수 있다.

# Related links

- [htmlcollection to an array](https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array)