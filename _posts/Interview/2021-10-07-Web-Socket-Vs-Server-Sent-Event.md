---
layout: post
title: "웹 소켓과 서버센트 이벤트 (Web socket vs Server sent event)"
subtitle: "프론트 면접 질문 정리"
author: jopemachine
tags: 
 - Frontend
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# 웹 소켓과 서버센트 이벤트 (Web socket vs Server sent event)

## 웹 소켓

- 양방향 통신, 단방향 통신인 Http와 구별됨.

- HTTP 풀링을 통한 구현보다 낮은 부하로 클라이언트와 서버 사이의 양방향 통신을 가능하게 하여 채팅 프로그램 등에 사용 가능함.

- 웹 소켓 handshake 요청을 통해 http 프로토콜에서 웹 소켓 프로토콜로 변경 (업그레이드)

## SSE (Server Sent Event)

- 클라이언트 입장에선 웹 소켓에서의 이벤트 핸들링과 비슷하게 구현됨.

- 말 그대로 서버의 이벤트가 발생했을 때 클라이언트에 이벤트 핸들러를 등록하는 것.

- 웹 소켓과 다르게 *단방향 통신*이다.

- 웹 소켓과 마찬가지로 폴링과 비교했을 때 휠씬 낮은 부하로, 빠르게 구현 가능.