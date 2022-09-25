---
layout: post
title: 브라우저에 URL을 입력했을 때 일어나는 일
subtitle: Frontend
author: jopemachine
tags:
  - Frontend
  - Browser
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: September 25, 2022
---

# 브라우저에 URL을 입력했을 때

- 브라우저가 쿼리를 해석하고 쿼리가 URL 문법 (정규표현식 인 듯)에 맞지 않으면 기본 검색 엔진 (구글 등) 으로 검색.

- 쿼리가 URL에 해당되면 `HSTS 리스트`를 확인한다. 리스트에 해당 도메인이 포함되고, http로 연결을 시도했다면 자동으로 https로 리다이렉트 한다.

- 요청된 도메인에 맞는 IP가 있는지 `DNS 캐시`에서 확인한다.

- 캐시에 도메인이 없다면 해당 클라이언트에 등록된 DNS 서버에 조회해 (`DNS resolution`) ip 주소를 가져오고 DNS 캐시에 저장한다.

- TCP 연결이 열려 있다면 바로 request를 만들어 데이터를 가져오고, 닫혀 있다면 OS에 요청해 `3-way handshake`로 TCP 연결을 연다.

- `HTTPS` 요청인 경우 `TLS Handshake` 과정을 통해 세션 키 생성.

- `HTTP2`인 경우 스트림을 `multiplexing` 해 하나의 커넥션에서 여러 파일을 병렬적으로 다운 받는다.

- 다운로드 받은 파일의 Mime type을 추론해 (Mime sniffing, Content sniffing) html인 경우 렌더링 프로세스로 넘겨준다.

- html 토큰화가 끝나고 Preload Scanner를 돌려 link, img 태그를 찾아 네트워크 스레드에 리소스들을 요청한다.

- html을 파싱하면서 `DOM 트리`를 만들기 시작.

- 파싱하면서 link 태그를 만나면 html 파서를 블록하고 css들을 병렬적으로 다운받고 파싱해 `CSSOM 트리` 구성한다.

- `script` 태그를 만나면 html 파서를 블록하고 js를 파싱하고 실행한 후 html 파서를 다시 가동.

- `async script` 태그를 만나면 html 파서를 중단하지 않고 다운로드 한다. 하지만 다운로드 후 script가 실행될 땐 html 파서를 block한다.

- html 파싱이 끝나면 `defer script`를 실행한다.

- 다 만들어진 `DOM Tree`, `CSSOM Tree`를 `Render Tree` (스타일이 결정된 렌더러들의 트리) 로 바꾼다. (`Attachment`)

- 트리를 순회하면서 각 요소의 위치와 크기를 재귀적으로 계산한다. (`레이아웃`) 이 때 상대적인 픽셀 단위는 절대적인 픽셀 단위로 변환된다.

- 각 요소를 픽셀화 (`Rasterizing`) 한다.

- 각 레이어를 `합성 (Composite)`해 화면을 만들어 브라우저에 렌더링 한다. (`Composition`)

- 서버와의 세션이 종료되면 `4 way handshake`로 연결을 종료.

# Related links

- [URL을 입력하고 벌어지는 일](https://github.com/baeharam/Must-Know-About-Frontend/blob/main/Notes/network/type-url-process.md)
