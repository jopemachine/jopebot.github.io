---
layout: post
title: Lighthouse란?
subtitle: 프론트 성능 최적화
author: jopemachine
tags:
  - Frontend
  - Browser
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: November 21, 2021
---

# Lighthouse란?

- 웹 페이지의 품질 개선을 위한 자동화된 오픈 소스 툴로, 기본적으로 크롬 개발자 도구에 내장되어 있으며 추가 설치를 통해 노드 모듈로서도 사용 가능함. 측정 리포트는 `html`, `json` 파일로 저장 가능함.

- 모바일 환경, 데스크톱 환경에서 따로 성능 측정이 가능.

- 구글에선 좋은 사용자 경험을 위해 `90점 ~ 100점` 정도의 점수 획득을 권장하고 있다고 함.

- 측정 지표는 `성능`, `접근성`, `프로그레시브 웹 앱`, `SEO`이다.

- 기본적으로 한 화면에 대해 측정하지만, 여러 개의 URL에 대해 품질을 측정하는 것도 가능.

## Lighthouse CLI options

- 개인적으로 CLI로 사용하는 편이 쾌적했다.

- 스로틀링 배율을 변경하고 싶으면 아래처럼 바꿀 수 있다. (당연히 스로틀링 옵션에 따라 점수가 달라짐.) 모바일 환경에선 디폴트로 4배의 CPU 스로틀링이 들어가는 것 같다.

```
$ lighthouse [url] --throttling.cpuSlowdownMultiplier=1 --throttling.rttMs=40
```

- 모바일 환경이 디폴트 값인데 기기를 바꾸려면, `form-factor` 옵션을, 데스크톱 환경으로 바꾸려면 `preset` 옵션을 변경한다.

```
$ lighthouse [url] --preset=desktop
```

- 기기 화면 크기를 고정하고 싶으면 `screenEmulation` 옵션을 변경한다.

# Related links

- [Lighthouse Github](https://github.com/GoogleChrome/lighthouse)
- [사이트 성능 측정 Lighthouse](https://skyksit.tistory.com/entry/%EC%82%AC%EC%9D%B4%ED%8A%B8-%EC%84%B1%EB%8A%A5-%EC%B8%A1%EC%A0%95-lighthouse)
- [Lighthouse 사용법](https://velog.io/@dell_mond/Lighthouse-%EC%82%AC%EC%9A%A9%EB%B2%95)
- [pagespeed.web.dev](https://pagespeed.web.dev/)