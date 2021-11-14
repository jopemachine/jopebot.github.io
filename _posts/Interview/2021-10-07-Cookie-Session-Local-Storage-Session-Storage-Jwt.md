---
layout: post
title: Cookie, session, local storage, session storage, JWT
subtitle: 프론트 면접 질문 정리
author: jopemachine
tags:
  - Frontend
  - Browser
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: October 12, 2021
---

# Cookie, session, local storage, session storage, JWT

## Cookie

- 서버에서 키, 값의 유효 기간을 정해주면 브라우저에서 저장해 놓고 *해당 도메인에 request를 보낼 때 헤더에 항상 포함*시킨다.

## Session

- 서버 메모리에 저장해놓는 유저의 정보.

- 보통 쿠키 형태로 세션 ID를 전달 받으면 *세션 DB에서 해당 유저 정보를 조회해 사용*한다.

- 세션 DB에서 유저 데이터를 지워 연결을 끊는 등 세밀한 작업을 간단하게 작업 가능.

- 유저 수가 많아지면 더 많은 리소스가 필요.

## Token

- 쿠키를 사용할 수 없는 앱 환경에서 쿠키 대신 사용함.

- 토큰을 사용해 세션 DB에서 유저 정보를 찾음.

## JWT (Json Web Token)

- 어떤 정보도 서버에 저장해놓지 않은 채 로그인을 유지할 수 있게 해 줌.

- 로그인 request가 들어오면 특유의 사인 (Signature) 알고리즘을 사용해 유저에게 사인을 보내줌.

- 매 request에서 사인을 받아 *사인이 변조되었는지 체크하고 변조되지 않은 경우 올바른 요청으로 간주*함.

## Local storage

- HTML 5에서 도입된 `key-value storage`.

- 사용자 기기 (Local storage)에 서비스 데이터를 저장함.

- 삭제하지 않으면 계속 거기 남아 있음.

## Session storage

- HTML 5에서 도입된 `key-value storage`.

- session은 page session을 의미함.

- 창이 닫히는 순간 삭제되는 휘발성 데이터 저장에 사용.

- 새로고침해도 남아 있지만 *새로운 탭에서 페이지를 열거나 탭을 닫으면 session storage를 초기화*함.

## IndexedDB

# Related links

- [세션 vs 토큰 vs 쿠키? 기초개념 잡아드림. 10분 순삭!](https://www.youtube.com/watch?v=tosLBcAX1vk)