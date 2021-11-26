---
layout: post
title: Code Formatter vs Linter
subtitle: Programming
author: jopemachine
tags:
  - Programming
  - Translation
header-img: img/header-img/coding.jpg
header-mask: 0.3
last-update: November 26, 2021
---

# Code formatter vs Linter

- Code formatter: tab, space와 같은 옵션을 통일함

- Code linter: var 대신 let/const를 쓰게 하는 등 베스트 프랙티스를 가이드함.

## Linter를 formatter로 쓰는 것

- 린터와 포맷터의 작업은 겹치는 부분도 있음. 예를 들어, 린터로 포맷팅을 할 수도 있지만 코드 포맷터만큼 좋지 않음.

```
foo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne(), noWayYouGottaBeKiddingMe());
```

위와 같은 매우 긴 라인을 아래처럼 Reformat 해주는 일은 하지 못함.

```
foo(
  reallyLongArg(),
  omgSoManyParameters(),
  IShouldRefactorThis(),
  isThereSeriouslyAnotherOne(),
  noWayYouGottaBeKiddingMe()
);
```

## Linter와 Formatter의 작동 방식

- 린터는 포맷터와 아예 다른 방식으로 작동함.

- 린터는 코드를 분석하고, 결함을 찾고, 코드를 고치기 위해 AST를 사용한다.

- 포맷터 역시 AST를 사용하지만 포맷터는 코드를 AST로 부터 직접 재생성함.

- 그래서 코드 포맷터는 100% 일관된 코드를 생성하며, 항상 린터보다 더 빠르다.

## Best practice

- 코드 포맷터로 소스를 포맷팅하고, 

- 린터를 사용해 가이드 라인을 검사해 일어날 수 있는 에러를 잡아라.

## eslint, prettier

- 예를 들어, `eslint`는 이름처럼 린터이고, `prettier`, `typescript-formatter`는 포맷터이다.

- eslint와 prettier를 같이 쓸 때 충돌나지 않게 하기 위해 eslint-config-prettier를 설치해 충돌 방지.

- eslint-prettier-plugin을 설치하면 린터 돌릴 때 prettier 같이 돌아감.

## lint-staged

- 스테이지된 파일들에만 lint를 적용한다.

- 린터는 프로젝트가 커지면 많이 느려지기 때문에 유용함.

## 원문

- [Format Code vs and Lint Code](https://medium.com/@awesomecode/format-code-vs-and-lint-code-95613798dcb3)