---
layout: post
title: package-lock.json의 lockfileVersion에 대해
subtitle: npm 이슈
author: jopemachine
tags:
  - npm
header-img: img/header-img/node.png
header-mask: 0.3
last-update: September 29, 2022
---

# package-lock.json의 lockfileVersion에 대해

- npm 7에서 `package-lock.json`의 포맷이 크게 바뀜 (버전 1 -> 버전 2)

- 버전 2의 경우 npm 6 이하와의 하위 호환성을 보장한다.

- 버전 3의 경우 하위 호환성을 보장하지 않고, 한 번 사용하면 npm 6에서 사용 불가능함. *버전 3은* 숨겨진 `package-lock.json`에서 사용됨.

- npm 6 이전과의 호환성을 보장하지 않아도 되게 된 후엔 *버전 3*을 사용할 것이라고 한다.

## dependencies

- `lockfileVersion`이 1인 npm 버전 (npm 7 이전) 을 지원하기 위한 레거시 데이터.

## packages

- npm 7 이후에서 사용하는 `dependencies` 데이터.

- `packages`가 있는 경우 `dependencies`는 무시됨.

## Related links

[https://docs.npmjs.com/cli/v7/configuring-npm/package-lock-json](https://docs.npmjs.com/cli/v7/configuring-npm/package-lock-json)
