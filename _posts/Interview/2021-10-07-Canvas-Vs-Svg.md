---
layout: post
title: "canvas vs svg"
subtitle: "프론트 면접 질문 정리"
author: jopemachine
tags: 
 - Frontend
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# canvas vs svg

## svg

- 확장 가능한 `XML` 기반의 벡터 이미지.

- DOM 사양의 일부로 각 개체별로 `HTML`에 추가된다.

- 크기가 커져도 벡터 이미지이므로 성능에 영향 없지만, 모양이 복잡하고 개체 수가 많아질 수록 성능이 저하된다.

## canvas

- 비트맵 기반의 그래픽.

- 퍼포먼스가 중요한 게임 등에 사용됨.

- `canvas` 단일 태그로 나타남.

- js로만 조작 가능.

- 저수준 API만 제공해서 다루기 까다롭지만 픽셀 단위로 조작 가능함.

- 비트맵 기반이므로 크기가 커지면 성능 저하된다.

## Related

- [SVG 란?](https://www.youtube.com/watch?v=knwej7J-bpU)