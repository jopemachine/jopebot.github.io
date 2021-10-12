---
layout: post
title: "Critical rendering path (CRP) 및 관련 최적화"
subtitle: "프론트 면접 질문 정리"
author: jopemachine
tags: 
 - Frontend
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# Critical rendering path (CRP), Pixel pipeline

- 브라우저가 TCP 연결에서 받은 데이터를 파싱한 후 랜더링 되기 까지의 과정

## DOM, CSSOM Parsing

- 렌더링 트리를 그리기 전 각각의 `DOM`, `CSSOM` 트리를 생성한다.

## Javascript execute

- JS는 DOM 조작이 가능하므로 JS가 다 실행될 때 까지 렌더링 트리를 만들 수 없다.

## Rendering tree 구축 (attachment)

## Layout

- 화면에 그려질 모든 요소의 크기와 위치를 계산하는 비교적 무거운 작업

- 각 레이어마다 `Layout` 과정이 필요함.

## Painting (Rasterizing)

- 화면에 그려질 요소들의 색상을 계산

## Composite

- CRP에서 그려진 각각의 레이어들을 합성해 하나의 화면으로 만드는 과정

# CRP 관련 최적화

## Reflow

- 특정 CSS attribute 변화 등으로 CRP를 다시 도는 것을 `Reflow`라고 함.

- CRP의 모든 phase 들을 다시 돌아야 되기 때문에 성능 저하의 원인이 됨.

## Repaint

- 색상 관련 attribute 등 특정 CSS attribute는 굳이 Layout을 다시 계산해야할 필요가 없다. (css triggers 참고)

- Layout 과정을 생략한 채 CRP를 다시 도는 것을 `Repaint`라고 한다.

## GPU 사용한 최적화

- 애니메이션 관련해 width 를 직접 변화시키면 변화될 때 마다 Reflow가 일어나 프레임 드랍이 발생하기 쉽다. (살짝씩 끊겨 보임)

- `transform`, `opacity` 을 사용하면 Layout, Paint 작업을 GPU로 최적화해 휠씬 부드러운 애니메이션을 만들 수 있다. 가능한 경우 이것들로 애니메이션을 만들어야 함.

## Forced reflow (강제 동기 레이아웃)

- DOM을 변경하지 않았는데 강제로 Reflow가 일어나 프레임 드랍을 일으키는 것.

- 빈번한 Forced Reflow로 레이아웃 쓰레싱이 발생할 수 있다.

- js에서 element에 접근할 때 마다 `강제 동기 레이아웃`이 발생하므로 캐싱해 놓고 쓰거나 `virtual dom`을 사용하는 등의 해결책을 사용해야 한다.

