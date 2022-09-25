---
layout: post
title: 자바스크립트 디버깅 console.log로 그 당시의 값을 출력하기
subtitle: 자바스크립트 세부사항
author: jopemachine
tags:
  - Javascript
header-img: img/header-img/javascript.png
header-mask: 0.3
last-update: September 25, 2022
---

# 자바스크립트 디버깅 console.log 관련

```js
// X
console.log(obj);

// O
console.log(JSON.parse(JSON.stringify(obj)))
```

- 로그를 남길 당시의 object 값을 보기 위해선, 단순히 `console.log`로 값을 찍는 게 아니라 아래처럼 `JSON.parse`, `JSON.stringify`를 사용하면 좋다.

- 많은 브라우저가 값이 갱신 될때마다 끊임없이 바뀐 값을 보여주기 때문.

## Related links

- [Web API Console log](https://developer.mozilla.org/ko/docs/Web/API/Console/log)
