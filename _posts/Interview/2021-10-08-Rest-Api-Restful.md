---
layout: post
title: "Rest API, Restful"
subtitle: "프론트 면접 질문 정리"
author: jopemachine
tags: 
 - Frontend
 - Backend
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# Rest API, Restful

- Representational State Transfer.

- URL에 API의 의미 체계를 담음

- Http method에 동사, URL엔 명사로 구성해 의미 체계를 구성해서 이 둘만으로 어떤 일을 하는 API인지 알게 하자. (self-descriptive)

- Rest API의 원칙을 지키는 API를 Restful 하다고 함

## SOAP vs Rest API

- 둘 다 API를 구축하는 방법론

- SOAP는 W3C에서 관리하는 프로토콜로, REST 보다 더 구체적인 명세 (XML 메세징 등) 를 가짐. REST는 프로토콜이 아니기 때문에 둘은 서로 다른 개념임.

- SOAP는 다른 언어, 다른 플랫폼에서 빌드된 애플리케이션이 통신할 수 있도록 설계된 최초의 표준 프로토콜.

- 많은 레거시 시스템이 SOAP를 준수하고, 웹 서비스의 경우 REST API로 작성하는 경우가 많다.

# Http Method

## get

- 서버의 리소스를 get.

## head

- 서버에서 리소스 (본문, body)를 주지 않고, 리소스가 있다는 것을 응답 코드로 (200) 확인.

## post

- 서버에 데이터를 post (보냄)

- 요청에 필요한 정보들은 body에 넣어 보내므로 보안 상 적절하며, 길이 제한 없이 text, binary 데이터 전송 가능.

## delete

- 서버에 데이터를 delete 하도록 요청. 당연히 구현에 따라 삭제하지 않을 수도 있음.

## option

- 서버의 지원 가능한 option들 (http method)을 가져옴.

## put

- 서버에 리소스를 put (저장)

## connect

- 요청한 리소스에 대해 양방향 연결함.

- 클라이언트가 프록시를 통해 서버와 SSL 연결할 때 사용. (SSL 터널링)

## trace