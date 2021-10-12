---
layout: post
title: "Layout shift"
subtitle: "프론트 면접 질문 정리"
author: jopemachine
tags: 
  - Frontend
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# Layout shift

- 화면 요소들의 크기, 위치가 (이미지, 웹 폰트, iframe, 광고 등 *동적으로 로딩되는 콘텐츠들*) 로딩 상태에 따라 변하면서 발생한다.

- 콘텐츠가 불안정해 사용자가 클릭하려 했을 때 화면 요소 위치가 변경되는 등 사용자 경험을 저해함.

- Chrome devtool의 performance, lighthouse 탭에서 `Cumulative Layout shift`라는 값을 통해 측정 가능하다.
