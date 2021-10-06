---
layout: post
title: "프론트 성능 측정의 지표에 관해"
subtitle: "프론트 면접 질문 정리"
author: "jopemachine"
tags: 
 - Frontend
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# 프론트 성능 측정의 지표에 관해

## DomContentLoaded 이벤트 (DCL)

- HTML 문서가 파싱된 후 발생하는 이벤트

- 자바스크립트 프레임 워크 (react, jquery 등) 을 로드.

- 예전엔 `DCL`이 프론트 성능 측정의 지표였다.

### DCL이 늦어진다면?

- 블록 리소스 (css, js 등) 때문에 html 파싱이 중단된 건 아닌지?

- js는 body 태그 하단에 두는 것이 기본이고 DOM async나 defer를 써서 html 파싱이 블록되지 않게 할 것.

## window.onload

- HTML 파싱이 끝나고 모든 종속 리소스들의 로드가 끝난 후 발생하는 이벤트

### DCL vs onload

- 이미지는 블록 리소스가 아니므로 이미지 다운로드 중에도 (DCL 후) 렌더링 트리가 그려진다.

- 하지만 onload 이벤트는 모든 이미지(를 포함한 종속 리소스들) 들의 다운로드가 끝나고 발생한다.

## First meaningful paint (FMP)

- 화면에 Hero Element가 처음 렌더링 되는 시점

- 실질적인 프론트 성능 측정의 지표로 사용됨.

- Hero element의 명확한 정의는 없으며 서비스에 따라 개발자가 정의해야 한다.

## First paint (FP)

- non-blank인 첫 번째 렌더링

## First contentful paint (FCP)

## Time to first byte (TTFB)

- 네트워크 경계에서 첫 번째 바이트가 브라우저에 도달한 시점.

- 서버의 성능을 나타내는 지표 (프론트 성능 측정의 지표 X)