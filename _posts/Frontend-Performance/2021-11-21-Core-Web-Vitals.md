---
layout: post
title: Core Web Vitals
subtitle: Frontend 최적화
author: jopemachine
tags:
  - Frontend
  - Frontend Optimization
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: September 25, 2022
---

# Core Web Vitals

- `Web vital`은 *웹에서 우수한 사용자 경험을 제공하기 위한 지표*로, 웹에 있는 대부분의 사이트의 성능 특성을 전반적으로 측정 가능하다.

- 하나의 메트릭 만으론 모든 성능 지표를 나타낼 수 없기 때문에 여러 가지 측정 지표를 만들어 사용한다.

- 실제로 사용자의 입력을 받아야만 측정할 수 있는 메트릭 (`Real user monitoring`, RUM)이 있고 Lighthouse등의 성능 측정 도구로 측정 가능한 메트릭이 있다. (`Lab data`, `Field data`라고 표현)

- 각 매트릭스들의 가중치는 정기적인 조사를 통해 시간이 지남에 따라 변화함.

## First contentful paint (FCP)

- 페이지가 로드되기 시작한 시점부터 페이지 콘텐츠의 콘텐츠 일부가 화면에 렌더링 될 때 까지의 시간

## Largest contentful paint (LCP)

- 페이지가 로드되기 시작한 시점부터 뷰 포트에서 가장 큰 콘텐츠가 화면에 렌더링 될 때 까지의 시간

- 가장 큰 콘텐츠가 Hero element가 아닐 경우 의미 없는 지표가 될 수 있음.

![](/img/posts/Frontend-Performance/2021-11-21-Core-Web-Vitals/elqsdYqQEefWJbUM2qMO.svg)

### LCP가 열악한 경우

- 서버 응답 시간이 느린 경우. (`TTBT` 부터 확인할 것.)

- 자바스크립트 실행 시간이 너무 김 (클라이언트 렌더링)

- 필요 없는 css import문을 제거할 것.

- 리소스 로드에 너무 긴 시간이 걸림.

- [Optimize LCP](https://web.dev/optimize-lcp/)

## First input delay (FID)

- 사용자가 처음으로 상호 작용할 때 부터 실제로 핸들러 처리를 시작하기 까지의 지연 시간.

## Time to interactive (TTI)

- 페이지가 로드되기 시작한 시점부터 사용자 입력에 신속하게 안정적으로 응답할 수 있는 시점까지 걸리는 시간.

## Total blocking time (TBT)

- 메인 스레드가 입력 응답을 막을 만큼 오래 차단되었을 때의 지연 시간.

- `TBT`와 `FID`는 서로 다른 메트릭이지만, 일반적으로 낮은 `FID`의 원인은 **자바스크립트의 과도한 실행시간**이며, `TBT`를 개선하면 `FID`도 개선된다고 함.

## [Cumulative layout shift (CLS)](https://jopemachine.github.io/2021/11/21/Cls-Layout-Shift/)

# Related links

- [How Metrics Are Measured](https://web.dev/user-centric-performance-metrics/#how-metrics-are-measured)

- [Custom metric 추가하는 법](https://web.dev/custom-metrics/)

- [Lab and Field Data Differences](https://web.dev/lab-and-field-data-differences/)
