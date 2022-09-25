---
layout: post
title: 프론트 성능 측정의 지표에 관해
subtitle: Frontend 최적화
author: jopemachine
tags:
  - Frontend
  - Frontend Optimization
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: September 25, 2022
---

# 프론트 성능 측정의 지표에 관해

## `DomContentLoaded` 이벤트 (DCL)

- HTML 문서가 파싱된 후 발생하는 이벤트.

- 클라이언트 사이드 자바스크립트 코드(`react`, `jquery` 등)를 로드.

- 예전엔 `DCL`의 발생 시점을 프론트 성능 측정의 지표로 사용했었다고 한다.

### DCL이 늦어진다면?

- 블록 리소스 (css, js 등) 때문에 html 파싱이 중단된 건 아닌지?

- 자바스크립트는 `body` 엘리먼트 하단에 두는 것이 기본이고 `async`나 `defer`를 써서 html 파싱이 블록되지 않게 해야 한다.

#### script 엘리먼트의 `async` 속성을 사용해 최적화

- 자바스크립트 실행 순서는 중요하지 않지만 **onload가 시작되기 전 JS가 실행되어야만 한다면** `async` 속성을 설정해야 한다.

#### script 엘리먼트의 `defer` 속성을 사용해 최적화

- 자바스크립트의 실행 순서는 중요하되 **DOM이 다 로딩된 후에 JS를 실행해도 된다**면 `defer` 속성을 설정해야 한다.

## `window.onload`

- HTML 파싱이 끝나고 모든 종속 리소스들의 로드가 끝난 후 발생하는 이벤트.

### DCL vs onload

- 이미지는 블록 리소스가 아니므로 이미지 다운로드 중에도 (`DCL` 후) 렌더링 트리가 그려진다.

- 하지만 `onload` 이벤트는 모든 이미지를 포함한 종속 리소스들의 다운로드가 끝나고 발생한다.

## First meaningful paint (FMP)

- 화면에 `Hero Element`가 처음 렌더링 되는 시점.

- **실질적인 프론트 성능 측정의 지표**로 사용됨.

- `Hero Element`의 명확한 정의는 없으며 서비스에 따라 개발자가 정의해야 한다.

## First paint (FP)

- 단순히 non-blank인 화면의 첫 번째 렌더링.

## First contentful paint (FCP)

## Time to first byte (TTFB)

- 네트워크 경계에서 첫 번째 바이트가 브라우저에 도달한 시점.

- 서버의 성능을 나타내는 지표이지 _프론트 성능 측정의 지표_ 가 아님
