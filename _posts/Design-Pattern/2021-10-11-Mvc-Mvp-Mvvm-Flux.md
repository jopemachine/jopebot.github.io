---
layout: post
title: MVC, MVP, MVVM, Flux 디자인 패턴
subtitle: 디자인 패턴
author: jopemachine
tags:
  - Frontend
  - Flux
  - Redux
  - Design pattern
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: September 25, 2022
---

# MVC, MVP, MVVM, Flux 디자인 패턴

## MVC

- 개발할 때 `Model`, `View`, `Controller` 3가지로 개념을 구분해 개발하는 방법론.

- 기존 애플리케이션 환경에서 보편적으로 사용되던 형태라고 한다. (`Angular` 등)

- `Model`: 데이터, `Controller`: Model의 데이터를 조작하거나 View를 업데이트, `View`: 데이터를 사용자에게 출력.

- 단점: 서로 상호작용 하는 `Model`과 `View`가 점점 늘어나면서, 양방향 데이터의 흐름이 복잡해져 유지보수에 어려움 생기며, 양방향 데이터의 흐름이 복잡해짐.

-> `Model`과 `View`의 의존 관계 (바인딩)을 어떻게 핸들링해야 할까? 에서 아래의 다른 패턴들이 등장.

![](/img/posts/Interview/2021-10-11-Mvc-Mvp-Mvvm-Flux/1.png)

## Flux

- `Action`, `Dispatcher`, `Store`, `View`로 구성.

- Redux의 모델이다 (하지만 flux 패턴을 그대로 구현한 것은 아니기 때문에 다른 점이 많이 있다함)

- 양방향 데이터의 흐름을 단방향으로 만들어 복잡한 시스템에서의 데이터 변화를 예측하기 쉽게 만듬.

## MVP

- `Model`, `View`, `Presenter`로 나눠 `View`와 `Model`의 의존성을 제거.

- `Presenter`: 뷰와 모델 사이에서 데이터 전달.

- 단점: `View`와 `Presenter` 사이에 의존성이 생김.

## MVVM

- `Model`, `View`, `ViewModel`로 나눠 `View`와 `Model`의 의존성을 제거.

- `View`는 `ViewModel`를 Observe 함으로써, Model 데이터의 상태 변화를 감지할 때 마다 화면을 갱신.

- `Model`의 데이터가 `ViewModel`에 바인딩 되어 있어야 한다.
