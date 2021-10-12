---
layout: post
title: "브라우저에 URL을 입력했을 때"
subtitle: "프론트 면접 질문 정리"
author: jopemachine
tags: 
 - Frontend
 - Browser
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# 브라우저에 URL을 입력했을 때

- 브라우저가 url을 해석하고 문법 (정규표현식 인 듯)에 맞지 않으면 기본 검색 엔진 (구글 등) 으로 검색.

- 문법에 맞으면 URL을 인코딩해 `HSTS`를 확인한다.

- url의 도메인에 맞는 IP가 있는지 DNS 캐시에서 확인한다.

- 캐시에 url이 없다면 해당 클라이언트에 등록된 DNS 서버에 조회해 (`DNS resolution`) ip 주소를 가져오고 캐싱한다.

- TCP 연결이 열려 있다면 바로 request를 만들어 데이터를 가져오고, 닫혀 있다면 OS에 요청해 `3-way handshake`로 TCP 연결을 연다.

- `HTTPS` 요청인 경우 `TLS Handshake` 과정을 통해 세션 키 생성.

- `HTTP2`인 경우 스트림을 `multiplexing` 해 하나의 커넥션에서 여러 파일을 병렬적으로 다운 받는다.

- 웹 서버에서 전송 받은 데이터들이 브라우저 엔진으로 들어감.

- html을 파싱하면서 `DOM 트리`를 만들기 시작.

- 파싱하면서 link 태그를 만나면 html 파서를 블록하고 css들을 병렬적으로 다운받고 파싱해 `CSSOM을 구성`한다.

- `script` 태그를 만나면 html 파서를 블록하고 js를 파싱하고 실행한 후 html 파서를 다시 가동.

- `async script` 태그를 만나면 html 파서를 중단하지 않고 다운로드 한다. 하지만 다운로드 후 script가 실행될 땐 html 파서를 block한다.

- html 파싱이 끝나면 `defer script`를 실행한다.

- 다 만들어진 DOM Tree, CSSOM Tree를 `Render Tree`로 바꾼다.

- `레이아웃` (각 요소의 위치와 크기)을 계산한다.

- 각 요소를 `Rasterizing` 한다.

- 각 레이어를 `합성`해 화면을 만들어 브라우저에 렌더링 한다.

- 서버와의 세션이 종료되면 `4 way handshake`로 연결을 종료.

# Related links

- [URL을 입력하고 벌어지는 일](https://github.com/baeharam/Must-Know-About-Frontend/blob/main/Notes/network/type-url-process.md)