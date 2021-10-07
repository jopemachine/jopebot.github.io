---
layout: post
title: "프론트 개발 환경 구성 (Development environment)"
subtitle: "프론트 면접 질문 정리"
author: jopemachine
tags: 
 - Frontend
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# 프론트 개발 환경 구성 (Development environment)

## Babel

- ES6를 지원하지 않는 브라우저를 지원하기 위한 트랜스 컴파일러

- Promise 같이 존재하지 않는 객체 같은 경우 폴리필 (polyfill)을 만들어 대체한다.

- 웹팩과 같이 사용되어 빌드 과정에서 자동으로 수행됨

- 여러가지 플러그인들로 수동으로 구성할 수 있으나 보통 프리셋 사용.

- 직접 플러그인, 프리셋을 구성해 쓸 수 있으나 직접 할 일은 별로 없음.

## Webpack

- 모듈 번들러.

- Entry를 그래프의 시작점으로 의존성을 분석해 모든 리소스를 모듈 형태로 로드해 플러그인을 거쳐 컴파일 (빌드) 한다.

### Loader

- test, use로 로딩할 파일을 지정하고 지정한 서드파티 로더를 통해 모듈 형태로 변환한다.

#### css loader

- `style-loader`: js의 css 문자열을 DOM에 적용해 줌.

- `css-loader`: css를 모듈 형태로 바꿔 js에 문자열 형태로 넣어줌.

#### image loader

- `file-loader`: 이진 파일을 사용할 수 있게 해 준다.

- `url-loader`: 이미지를 base64 포맷으로 html에 포함시켜 빌드해 줌.

#### html loader

- `file-loader`

- `html-loader`

#### sass loader

- `node-sass`

- `sass-loader`

### Plugin

- 번들링 된 결과물을 가공한다.

- 난독화, 텍스트 추출 등이 가능

### BannerPlugin

- 코드 위쪽에 코드 베이스의 정보를 기입해 줌.

### DefinePlugin

- 환경변수를 전달해준다. (말 그대로 define)

### HTMLTemplatePlugin

- ejs 문법으로 html을 템플릿으로 활용할 수 있게 해 준다.

- 그 외 주석을 제거하거나 white space를 제거하는 등 minifier로 활용 가능.

### CleanWebpackPlugin

- 빌드할 때 마다 기존 dist 폴더 내용을 제거해준다.

### MiniCssExtractPlugin

- css를 js에서 분리해서 빌드해 줌.

## linter

- 코딩 컨벤션에 따라 자동으로 코드 스타일을 변경하거나 강요해 줌.

- `rules`에 새 룰을 추가하거나 삭제해 커스터마이징 가능.

- eslint의 경우 document 페이지에 각 룰들에 대한 설명이 자세히 나와 있는데 자동 수정 규칙은 렌치 아이콘이 그려져 있다.

## prettier

- 마찬가지로 코드 스타일, 포맷팅을 강요해 줌.

- eslint랑 겹치는 부분도 있으나 eslint가 못 고치는 부분도 일부 고쳐줌.

- eslint와 충돌나지 않게 하기 위해 `eslint-config-prettier`를 설치해 충돌을 방지할 수 있음.

- `eslint-prettier-plugin` 설치해 eslint 돌아갈 때 자동으로 prettier가 돌아가게 할 수 있음.

## lint-staged

- 코드 베이스가 커지면 linter가 너무 느려짐

- `lint-staged`를 사용하면 커밋된 파일에만 lint를 적용할 수 있다.

