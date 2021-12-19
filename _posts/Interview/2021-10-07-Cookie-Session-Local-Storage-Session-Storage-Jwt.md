---
layout: post
title: Cookie, Session, Web Storage, JWT, IndexedDB
subtitle: 프론트 면접 질문 정리
author: jopemachine
tags:
  - Frontend
  - Browser
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: December 19, 2021
---

# Cookie, session, Web Storage (Local storage, Session storage), JWT, IndexedDB

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

## Web storage

- HTML 5에서 도입된 `key-value storage`.

- 키와 값은 UTF-16 문자열만 사용 가능. (정수는 자동으로 문자열로 변환)

- 최대 10MB 까지 저장 가능.

- 서로 다른 프로토콜을 사용하는 페이지들은 서로 다른 Web storage를 사용함. 즉, http 프로토콜로 접속되었을 때 사용하는 Web stroage와 https 프로토콜을 사용했을 때 사용되는 Web storage는 공유되지 않음.

### Local storage

- 클라이언트 기기 (Local storage)에 서비스 데이터를 저장함.

- 삭제하지 않는 한 계속 영구적으로 남아 있음.

### Session storage

- 여기서 Session은 page session을 의미함. 즉, 창이 닫히는 순간 삭제되는 휘발성 데이터 저장에 사용.

- 새로고침해도 남아 있지만 *새로운 탭에서 페이지를 열거나 탭을 닫으면 Session storage가 초기화 된다*.

## IndexedDB

- 오프라인에서 많은 양의 데이터를 영구적으로 사용하기 위한 솔루션. 오프라인에 저장해야 하는 데이터의 양이 커지면 Web storage보다 IndexedDB를 사용하는게 효율적일 수 있음.

- 비슷한 용도로 WebSQL이란 게 있지만, deprecated 되었다.

- 로컬 스토리지와 다르게 String 이외에도 객체 데이터 타입을 저장할 수 있다.

- `createObjectStore`라는 메서드 호출로 ObjectStore에 데이터를 저장하거나 조회할 수 있다.

- (크롬의 경우) 개발자 도구 > Application 탭에서 IndexedDB에 저장된 레코드들을 확인할 수 있다.

# Related links

- [세션 vs 토큰 vs 쿠키? 기초개념 잡아드림. 10분 순삭!](https://www.youtube.com/watch?v=tosLBcAX1vk)