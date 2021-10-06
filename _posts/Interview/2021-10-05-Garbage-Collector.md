---
layout: post
title: "Garbage collector"
subtitle: "프론트 면접 질문 정리"
author: "jopemachine"
tags: 
 - Frontend
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# Garbage collector

어떤 메모리를 언제 회수할 것인가 하는 것은 비결정적 (non-deterministic) 문제이다.

## 참조 횟수 계산 방식 (Reference counting)

- 서로를 가리키는 객체들이 존재하는 경우 참조 횟수가 0이 되지 않으므로 회수되지 않는다. (순환 참조 문제)

## 표시하고 쓸기 방식 (Mark and sweep)

- Root (전역 변수, 현재 함수의 지역변수나 매개변수 등) 에서 시작해 모든 객체를 모니터링 하고 도달 불가능한 객체를 가비지 컬렉팅함.