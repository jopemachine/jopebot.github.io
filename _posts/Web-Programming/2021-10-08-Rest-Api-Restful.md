---
layout: post
title: Rest API, Restful
subtitle: 웹 프로그래밍
author: jopemachine
tags:
  - Web Programming
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: December 21, 2022
---

# Rest API, Restful

- `REST` (Representational State Transfer).

- Http method에 동사, URL엔 명사로 구성해 의미 체계를 구성해서 이 둘만으로 어떤 일을 하는 API인지 알게 하자. **즉, self-descriptive한 API를 구축하자**는 것.

- Rest API의 원칙을 지키는 API를 Restful 하다고 함.

## SOAP vs Rest API

- 둘 다 API를 구축하는 방법론

- `SOAP`는 W3C에서 관리하는 프로토콜로, `REST` 보다 더 구체적인 명세 (XML 메세징 등) 를 가짐. `REST`는 *프로토콜이 아니기 때문에 둘은 서로 다른 개념*임.

- `SOAP`는 다른 언어, **다른 플랫폼에서 빌드된 애플리케이션이 통신할 수 있도록 설계된 최초의 표준 프로토콜.**

- 많은 레거시 시스템이 `SOAP`를 준수하고, 웹 서비스의 경우 `REST` API로 작성하는 경우가 많다.

## Rest의 특징

- Stateless. 상태가 없음.

- 기존 HTTP 웹 표준을 그대로 적용하기 때문에, Last-modified, E-Tag를 이용한 캐싱 구현 가능

- URL이 자체적으로 무슨 일을 하는지 설명함 (Self-descriptiveness)

## Rest URL 가이드

- 슬래시 (`/`)로 계층 관계를 나타냄. 이 때 마지막 단어에선 `/` 제외할 것.

- 단어에 공백이 필요하면 하이픈 (`-`)을 사용. 언더바(`_`)는 사용하면 안 됨.

- 알파벳은 소문자로 통일

- 파일 확장자를 URI에 포함시키면 안 됨.

- 단, 복수에 주의할 것.

## Http 응답 코드

Rest한 API는 URI 외에도 응답 코드도 잘 설계되어야 함.

| 상태코드                     | 설명                                      |
| ------------------------ | --------------------------------------- |
| 200                      | 클라이언트의 요청이 정상적으로 수행됨                    |
| 201 (작성됨)                | 클라이언트의 자원 생성 요청이 성공적으로 수행됨.             |
| 204 (콘텐츠 없음)             | 요청은 처리되었으나 콘텐츠 없음.                      |
| 301 (영구 이동)              | 다른 곳으로 이동됨.                             |
| 302 (임시 이동)              | 다른 페이지로 이동해야하지만, 향후 요청 시 해당 url로 요청해야함. |
| 400                      | 요청이 잘못됨. 요청의 구문을 인식하지 못함.               |
| 401 (권한 없음)              | 인증이 필요한 API인데, Unauthenticated된 요청임.    |
| 402 (결제 필요)              | 결제가 필요한 요청임.                            |
| 403 (금지됨)                | 사용자가 리소스에 대한 권한을 갖고 있지 않아 요청을 거부함.      |
| 404 (Resource Not found) | 요청한 리소스를 찾을 수 없음.                       |
| 405 (메소드 금지)             | API가 허용하지 않는 http 메서드를 사용하고 있음.         |
| 500 (서버 내부 오류)           | 서버 코드에 에러 발생                            |
| 501 (미구현 사항)             | 서버에 해당 기능이 없음.                          |

# Http Method

## GET

- 서버의 리소스를 읽거나 검색해 반환함.

- 같은 요청에 대해 항상 같은 응답을 반환해야 한다.

- get 요청이 데이터를 수정하면 안 된다.

- 주로 성공하면 200을, 실패하면 404, 400을 리턴한다.

## HEAD

- 서버에서 리소스 (본문, body)를 주지 않고, 리소스가 있다는 것을 응답 코드로 (200) 확인.

## POST

- 서버에 데이터를 post (보냄).

- 서버 데이터를 변경하므로 같은 요청이 반복되었을 때 다른 결과가 나올 수 있다.

- 요청에 필요한 정보들은 body에 넣어 보내므로 보안 상 적절하며, 길이 제한 없이 text, binary 데이터 전송 가능.

- 주로 성공하면 201을 리턴한다.

### html `input` form의 경우

- `method="POST"`인 경우 모든 form data는 message body에 인코딩 되며, 반면 `method="GET"`인 경우 모든 form data는 URL에 인코딩 되어 들어감.

## DELETE

- 서버에 데이터를 delete 하도록 요청. 당연히 구현에 따라 삭제하지 않을 수도 있음.

## OPTION

- 서버의 지원 가능한 option들 (http method)을 가져옴.

## PUT

- 서버에 리소스를 put (저장).

## CONNECT

- 요청한 리소스에 대해 양방향 연결함.

- 클라이언트가 프록시를 통해 서버와 SSL 연결할 때 사용. (`SSL 터널링`).

## TRACE

# Related links

- [Http 상태 코드](https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C)
