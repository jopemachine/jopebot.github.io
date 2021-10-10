---
layout: post
title: "실행 컨텍스트 (Execution context)"
subtitle: "프론트 면접 질문 정리"
author: jopemachine
tags: 
 - Frontend
 - Javascript
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# 실행 컨텍스트 (Execution context)

- 실행 가능한 코드를 형상화하고 구분하는 추상적인 개념.

- 실행 가능한 코드가 되기 위해 필요한 컨텍스트

- 변수 스코프, this 바인딩 등 스택 프레임의 정보들.

- 스코프를 생성할 때 생성된다. 즉, 익명함수 (IIFE) 실행, eval, 함수 실행, 코드 블럭을 사용했을 때 실행 컨텍스트가 생성된다.

- 자바스크립트 엔진 스택 프레임에 쌓이게 됨.

## 스코프 체인 (Scope chain)

- 실행 컨텍스트가 중첩될 때 마다 생성됨.

- 변수의 이름은 스코프 체인에서 검색되어 참조된다.

## Global execution context

- 가장 root에 있는 실행 컨텍스트.

## 클로저와 실행 컨텍스트

- 함수의 실행이 끝나면 기본적으로 해당 함수의 스코프도 제거되지만 클로저의 경우 함수의 상태로서 컨텍스트가 유지된다.

- 따라서 클로저를 갖는 함수를 무분별하게 호출하면 매모리 누수로 이어질 수 있다.




