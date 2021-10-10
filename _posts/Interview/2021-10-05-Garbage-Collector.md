---
layout: post
title: "Garbage collector"
subtitle: "프론트 면접 질문 정리"
author: "jopemachine"
tags: 
 - Frontend
 - Programming
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# Garbage collector

어떤 메모리를 언제 회수할 것인가 하는 것은 비결정적 (non-deterministic) 문제이다.

## Reference counting (참조 횟수 계산 방식)

- 값이 얼마나 많이 참조 되었는지를 추적.

- 서로를 가리키는 객체들이 존재하는 경우 참조 횟수가 0이 되지 않으므로 회수되지 않는다. (순환 참조 문제)

## Mark and sweep (표시하고 쓸기 방식)

- Root (전역 변수, 현재 함수의 지역변수나 매개변수 등) 에서 시작해 모든 객체를 모니터링 하고 도달 불가능한 객체를 가비지 컬렉팅함.

## 순환 참조 문제

- 자바스크립트 엔진은 대부분 Mark and sweep 방식을 사용.

- 하지만 내부에 사용하는 BOM, DOM 객체들이 네이티브 자바스크립트 객체로 구현되지 않았다면 여전히 순환 참조 문제를 만들 수 있음에 주의할 것.

# Related links

- [프론트엔드 개발자를 위한 자바스크립트 프로그래밍](https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=26434671)