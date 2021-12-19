---
layout: post
title: CORS vs CSP
subtitle: Broswer
author: jopemachine
tags: 
 - Frontend
 - Browser
header-img: img/header-img/frontend.jpg
header-mask: 0.3
---

# CORS vs CSP

## CORS, 동일 출처 정책

- CORS를 사용하면 현재 도메인과 (Response에서 허용해주지 않는) 다른 도메인의 API 콜을 제한함. (포트 포함)

- 공격자가 XSS (악성 스크립트 삽입 실행) 공격으로 스크립트를 삽입해 데이터를 탈취하는 것을 막기 위한 것.

## CSP (Content Security Policy

- 악의적인 의도를 가진 스크립트를 차단하고, XSS를 완화함.

- http header (`Content-Security-Policy`)에 추가 가능.

- 예를 들어, 아래와 세부적인 사항을 추가할 수 있다.

```
- 인라인 자바스크립트의 실행을 허용할 것인가?
=> 개발자의 실수로, XSS가 일어나 DB에 악성 js가 들어갔더라도 해당 정책 때문에 악성코드 실행이 중지됨.

- 어떤 도메인인의 js 파일만 로드될 수 있는가?
```

# Related links

- [What Is the Difference Between Cors and Csps](https://stackoverflow.com/questions/39488241/what-is-the-difference-between-cors-and-csps)

- [XSS (Cross-Site Scripting)](https://isc9511.tistory.com/19)

- [Content Security Policy 위키백과](https://en.wikipedia.org/wiki/Content_Security_Policy)