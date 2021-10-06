---
layout: post
title: "px, em, rem, vw, vh"
subtitle: "프론트 면접 질문 정리"
author: jopemachine
tags: 
 - Frontend
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# px, em, rem, vw, vh

**폰트 크기 단위**에 무엇을 사용해야 적절한가?

- 더 나은 단위가 있는 게 아니라 경우에 따라 선택해 사용

## px (pixel)

- 가장 기본적인 단위로 세밀한 조정이 가능한, `절대적`인 단위. (물리적인 1px.)

- 사용자가 브라우저에서 폰트 설정을 바꿔도 적용되지 않는다.

## em

- 부모 엘리먼트의 `폰트의 크기에 상대적으로` 크기가 지정됨.

- 부모 엘리먼트의 폰트 크기가 8em인 경우 16.8px이 됨.

- 사실 %로 지정하는 것과 동일함

- 나중에 폰트 변경에 대비해 텍스트 컨테이너 폰트 사이즈의 경우 em을 단위로 셋팅 하는게 바람직함.

## rem

- em인데 부모가 아닌 `Root element에 상대적`인 폰트 사이즈 단위이다.

## vw, vh

- view port에 상대적인 값을 폰트 크기 사이즈로 지정할 수 있다.

## %

- em과 마찬가지로 부모 엘리먼트 폰트 크기에 상대적인 단위.