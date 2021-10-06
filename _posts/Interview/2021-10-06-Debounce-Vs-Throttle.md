---
layout: post
title: "Debounce vs Throttle"
subtitle: "프론트 면접 질문 정리"
author: jopemachine
tags: 
 - Frontend
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# Debounce vs Throttle

이 방법 모두 과도한 이벤트 핸들러 실행을 제어하기 위한 방법이다.

## Debounce

- 어떤 내용을 입력하다 특정 시간 동안 대기하고 있다가 입력 내용을 바탕으로 서버 요청 (이나 특정 무거운 콜백함수 실행) 을 하는 것.

- Example: 연관 검색어 목록 구현

### Related modules

- [p-debounce](https://github.com/sindresorhus/p-debounce)

- [debounce-fn](https://github.com/sindresorhus/debounce-fn)

## Throttle

- 입력되는 동안 바로 이전에 요청한 작업을 주기적으로 실행함.

- Example: 화면을 아래로 내리지 않더라도 계속 데이터를 받아오다 화면이 내려가면 보여주는 식으로 무한 스크롤 기능 구현.

### Related modules

- [p-throttle](https://github.com/sindresorhus/p-throttle)
