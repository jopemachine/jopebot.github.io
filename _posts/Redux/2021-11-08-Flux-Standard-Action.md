---
layout: post
title: Flux-standard-action (FSA)이란?
subtitle: Redux 세부사항
author: jopemachine
tags:
  - Frontend
  - Redux
  - Flux
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: September 25, 2022
---

# Flux-standard-action (FSA) 이란?

- [https://github.com/redux-utilities/flux-standard-action](https://github.com/redux-utilities/flux-standard-action)

- `human-friendly`한 Flux action의 표준.

- Flux action의 shape에 대한 표준을 바탕으로 더 유용한 툴들을 만들어 낼 수 있다.

- FSA 를 지켜야 사용할 수 있는 라이브러리들이 있다.

## Rules

- Action은 반드시 plain object여야 한다.

- `type` 프로퍼티를 가져야 한다.

- `error`, `payload`, `meta` 프로퍼티를 가질 수 있다

- 그 외의 프로퍼티는 가질 수 없다.

### type

- 액션의 성질을 나타냄. 해당 액션으로 상태가 어떻게 변할 것인가.

### payload

- 액션의 인자에 해당.

- 규약 상 `error`가 true일 경우 `payload`는 반드시 에러 객체여야 한다.

### error

- 액션이 에러를 나타내는 경우 `error` 프로퍼티는 true로 셋팅될 수 있다 (optional)

### meta

- 어떤 종류의 값이든 될 수 있다

- payload에 담기지 않는 어떤 추가적인 데이터를 담기 위한 용도.
