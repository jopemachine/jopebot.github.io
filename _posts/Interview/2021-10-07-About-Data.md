---
layout: post
title: Data 속성에 관해
subtitle: 프론트 면접 질문 정리
author: jopemachine
tags:
  - Frontend
  - HTML
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: October 12, 2021
---

# Data 속성에 관해

- 프론트 코딩할 때 숨겨둔 HTML 엘리먼트에 데이터를 저장하는 건 너무... 구리다.

- 그래서 특정 **data를 DOM에 저장할 수 있는 방법**을 제공한다.

- `data-` 뒤에 붙는 문자는 자유다. `data-code`, `data-value` 등 원하는대로 붙여 사용할 수 있다.

- 해당 속성들은 js에서 `dataset` 객체를 통해 사용 가능하다.

- 데이터를 읽는 속도가 비교적 느리고 검색 크롤러가 못 찾기 때문에 관찰해야 하거나 접근 가능해야 하는 내용은 여기 넣지 말 것. (SEO에 방해)