---
layout: post
title: "Resource hints"
subtitle: "프론트 면접 질문 정리"
author: "jopemachine"
tags: 
 - Frontend
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# Resource hints

## preload

- current navigation에 사용할 리소스들을 미리 가져온다.

- `as`로 리소스 타입을 명시해야 한다.

## prefetch

- next navigation에 사용할 리소스들을 미리 가져온다.

- next navigation에 사용할 리소스이기 때문에 preload 보다 우선순위가 낮다.

## preconnect

- 다른 도메인에 미리 DNS lookup, TLS negotiation, TCP handshake 등 연결 절차를 밟음.