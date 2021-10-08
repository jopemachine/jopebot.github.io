---
layout: post
title: CLS 줄이는 법, Layout shift 제거하는 법
subtitle: Frontend 최적화
author: jopemachine
tags:
  - Frontend
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: November 21, 2021
---

# CLS 줄이는 법, Layout shift 제거하는 법

- CLS는 Lighthouse v8 기준 가중치 15%로 꽤 높은 가중치를 차지하고 있다.

- 레이아웃 쉬프트를 제거하려면 해당 동적으로 크기가 변하는 엘리먼트 (이미지, iframe 등)에 직접 사이즈를 주는 게 가장 직접적이지만, 이렇게 하면 width나 height를 특정 비율로 화면에 맞춰야 하는 경우에 대응할 수 없다.

- `aspect-ratio`를 함께 사용해 해결할 수 있었다.

```css
.image {
  /* 아래 width, height 부분에 이미지의 width, height를 적어 주면 된다. */
  aspect-ratio: width / height;
  width: 100%;
}
```

## 출처

- [Optimize CLS](https://web.dev/i18n/ko/optimize-cls/)

- [aspect-ratio란?](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio)