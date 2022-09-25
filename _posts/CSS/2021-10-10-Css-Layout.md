---
layout: post
title: CSS 레이아웃
subtitle: CSS 세부사항
author: jopemachine
tags:
  - Frontend
  - CSS
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: September 25, 2022
---

# CSS 레이아웃

![](/img/posts/Interview/2021-10-10-Css-Layout/helloworld-59361-19.png)

- Element의 크기는 `Content box`, `padding`, `border`, `margin`으로 구성됨

## margin

- `border`와 `외부 엘리먼트들` 사이의 여백

## border

- 엘리먼트의 가장자리. `margin`과 `padding`의 경계.

## padding

- `콘텐츠 박스`와 `border` 사이의 여백.

## content box

- 콘텐츠 박스

# box-sizing

## content-box

- width: 300px 이라 하면 **콘텐츠 박스의 길이를 300px로 지정**.

- `box-sizing`의 디폴트 값

## border-box

- width: 300px 이라 하면 **border와 padding, 콘텐츠 박스의 길이를 합쳐 300px로 지정**.
