---
layout: post
title: "CORS, option method, preflight request"
subtitle: "프론트 면접 질문 정리"
author: jopemachine
tags: 
 - Frontend
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# CORS, option method, preflight request

## CORS (Cross origin resource policy)

- 다른 도메인에 요청을 날리는 것은 브라우저에서 보안 상 허용하지 않음.

- 그러나 웹 서비스 구현 시 반드시 필요한 작업.

- preflight의 response header의 `access-control-allow-origin`에 해당 도메인이 적혀 있으면 CORS를 허용한다. 즉, 일반적으로 서버에서 설정해줘야 하는 작업.

- 물론 브라우저를 사용하지 않으면 CORS 같은 거 없다.

## option method

- 해당 도메인이 어떤 method 들을 허용하는지 설명해준다.

- 해당 요청을 보내는 것이 허용되어 있는지 확인하기 위한 용도로 예비 요청 (preflight)에 사용됨.

## 브라우저의 처리

- 굳이 preflight 요청이 필요하지 않은 경우 브라우저에서 알아서 생략해준다.