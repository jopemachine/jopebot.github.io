---
layout: post
title: Semantic versioning
subtitle: 기타
author: jopemachine
tags:
  - Frontend
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: September 25, 2022
---

# Semantic versioning

`1.2.3` -> 1: `Major`, 2: `Minor`, 3: `patch`

## Major

- 기존 버전과 호환되지 않는 breaking change

## Minor

- 기존 버전과 호환되는 기능 추가

## Patch

- 기존 버전과 호환되는 버그 수정

### package.json의 `~`와 `^`의 차이

- `~`는 과거의 디폴트 방식이었음.

- 예를 들어 `~1.2.3`는 `1.2.3` 이상 `1.3.0` 미만 버전을 포함함.

- `^`는 현재의 디폴트 방식.

- `^1.2.3`는 `1.2.3` 버전 이상 `2.0.0` 버전 미만까지를 포함함. (호환되는 모든 버전 포함)

- 단, **0.x 버전은 정식 버전이 아니기 때문에 패치 버전만 갱신**한다. 즉, `^0.2.3` 인 경우 `0.2.3` 이상 `0.3.0` 버전 미만까지만 포함한다.
