---
layout: post
title: "웹 폰트의 문제점과 해결"
subtitle: "프론트 면접 질문 정리"
author: "jopemachine"
tags: 
 - Frontend
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# 웹 폰트의 문제점과 해결 (FOIT, FOUT)

웹 폰트가 다운로드 되기 전 글자는 어떻게 렌더링 할 것인가?

- 브라우저에 따라 `FOUT` (Flash of unstyled text), `FOIT` (Flash of invisible text) 방식 중 어떤 것을 사용할 것인지 디폴트 값이 다름.

- `font-display` 란 css attribute를 사용해 방식을 변경할 수 있다.

## font-display

### block

- `FOIT` 방식으로 렌더링.

- timeout (3s)이 지나면 디폴트 폰트로 렌더링.

### swap

- `FOUT` 방식으로 렌더링.

### fallback

- block과 같지만 timeout을 0.1 초로 한다.

### optional

- 브라우저 상태에 따라 자동으로 결정.

### auto

- 브라우저마다 다른 디폴트 값을 적용.