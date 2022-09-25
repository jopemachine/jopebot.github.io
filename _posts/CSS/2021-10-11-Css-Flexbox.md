---
layout: post
title: CSS Flexbox 모델
subtitle: CSS 세부사항
author: jopemachine
tags:
  - Frontend
  - CSS
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: September 25, 2022
---

# CSS Flexbox 모델

- 동일한 간격 또는 일정 간격으로 아이템들을 정렬하기 위한 레이아웃 모델.

- **한 번에 한 행, 열만 다룬다는 점에서 CSS grid layout과 다르다.**

- `display: flex`를 통해 지정 가능함

## flex-direction

- 어떤 차원을 정렬할 것인지 결정 (이 축을 `주축`이라 함)

### row

### column

### row-inverse

### column-inverse

## flex-wrap

- flex container에 선언

- 브라우저 width가 모자랄 때 아이템들을 밑으로 넘길 것인지를 결정

## flex-grow

- flex item에 지정.

- flex item들의 공간이 flex container의 공간보다 작을 때 각 item들의 크기를 늘리는데 사용됨.

- `flex-grow`가 1이면 다른 아이템들과 모두 같은 공간을 할당 받음.

- `flex-grow`가 3이면 다른 아이템들의 세 배의 공간을 할당 받음.

## flex-shrink

- flex item에 지정.

- flex item들의 공간이 flex container의 공간보다 클 때 각 item들의 크기를 줄이는데 사용됨.

- `flex-shrink`가 0이면 flex container를 초과함.

- `flex-shrink`가 2이면 다른 item들 보다 두 배 더 줄어듬.

## flex-basic

- flex item에 지정하여 초기 크기 지정.

- `auto`이면 같은 공간 할당

- `flex-basic`를 지정하지 않으면 flex item의 크기가 `flex-basic` 값으로 들어감.

## flex

- `flex-grow`, `flex-shrink`, `flex-basic` 순으로 지정하는 축약형 속성.

- 보통 flex만 지정함.

- `flex: 1`로 지정하면 `flex-grow`가 1이 되고 `flex-shrink`, `flex-basic`은 기본 값으로 `1`, `0`을 사용한다.

## justify-content vs align-items

- justify는 *텍스트 행의 끝을 나란히 맞춘다*는 의미.

- `justify-content`는 아이템들을 `주축`을 따라 나란히 정렬한다. 예를 들어, `flex-direction`이 기본 값인 row라면, `justify-content`는 가로 축으로 정렬하는 게 된다.

- `align-items`는 아이템들을 `주축에 수직인 방향`으로 나란히 정렬한다. 예를 들어, `flex-direction`이 기본 값인 row라면, `align-items`는 세로 축으로 정렬하는 게 된다.

- 사용 가능한 값들은 아래와 같다.

### flex-start

### flex-end

### center

### space-around

### space-evenly

### space-between

# Related links

- [Basic Concepts of Flexbox](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)

- [Flexbox froggy](https://flexboxfroggy.com/#ko)
