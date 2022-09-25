---
layout: post
title: Cumulative Layout Shift
subtitle: Frontend 최적화
author: jopemachine
tags:
  - Frontend
  - Frontend Optimization
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: September 25, 2022
---

# Cumulative Layout Shift

- `Cumulative Layout Shift` (CLS)는 Lighthouse v8 기준 가중치 15%로 꽤 높은 가중치를 차지하고 있다.

- 실제로 사용자가 대기 시간에 다른 요소를 클릭하게 됨으로써 예기치 못한 불편을 초래할 수 있다.

- 레이아웃 쉬프트를 제거하려면 해당 동적으로 크기가 변하는 엘리먼트 (이미지, iframe 등)에 직접 사이즈를 주는 게 가장 직접적이지만, 이렇게 하면 width나 height를 특정 비율로 화면에 맞춰야 하는 경우에 대응할 수 없다.

- 내 경우엔 이미지의 css에 `aspect-ratio`를 사용해 제거할 수 있었다.

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
