---
layout: post
title: DNS Resolution이란?
subtitle: 웹 프로그래밍
author: jopemachine
tags:
  - Frontend
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: September 25, 2022
---

# DNS Resolution이란?

- DNS = `Domain Name System`. 즉, Domain에 이름을 붙이는 시스템을 말함. 도메인은 각각의 고유한 outer public IP 주소를 갖고 있지만 이걸 사람이 모두 기억하기는 힘듬.

- 따라서 어떤 서버에 각 도메인들의 url을 string 값으로 만들어서 ip 주소와 매칭 시키는 딕셔너리를 만들어 놓는데, 이를 `DNS 서버`라고 함.

- 브라우저에 url을 검색했을 때 `DNS Cache`에 해당 도메인의 ip 주소가 없으면 `DNS 서버`에 쿼리를 날려 ip 주소를 받아온 후 캐싱함.

- 이런 과정을 `DNS Resolution` 이라고 함.
