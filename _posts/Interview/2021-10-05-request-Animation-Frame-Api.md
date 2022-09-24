---
layout: post
title: requestAnimationFrame API에 대해
subtitle: 프론트 면접 질문 정리
author: jopemachine
tags:
  - Frontend
  - Browser
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: October 12, 2021
---

# requestAnimationFrame API에 대해

## 필요한 이유

- 애니메이션을 사용하는 js 로직을 `setTimeout`으로 사용하는 경우 애니메이션이 프레임 시작과 동시에 실행됨을 보장할 수 없고 끊길 수 있다.

- `requestAnimationFrame`은 애니메이션이 프레임 시작과 동시에 실행됨을 보장해준다.

- `requestAnimationFrame`은 화면에 해당 요소가 보이지 않는 경우 콜백을 호출하지 않는다.

- 콜백은 브라우저의 animation queue에 들어가며, 이 큐는 마이크로 태스크 큐 보다는 우선순위가 낮고 매크로 태스크 큐 보다는 높은 우선 순위를 가진다.

## 구현

- *1초에 해당 화면의 주사율에 해당하는 만큼 콜백 함수가 실행*되고 진행된 시간 경과 값이 timestamp로 함수 인자에 주어진다.

- 스스로 재귀 호출하지 않으니 직접 재귀 호출해 쓰면 된다.

## 사용해야 하는 경우

- css transition으로 처리가 안 되는 js로만 구현 가능한 애니메이션 구현에 사용하면 된다.

# Related links

- [Must Know About Frontend - Css 애니메이션 vs Js 애니메이션](https://github.com/baeharam/Must-Know-About-Frontend/blob/main/Notes/frontend/css-js-animation.md)
