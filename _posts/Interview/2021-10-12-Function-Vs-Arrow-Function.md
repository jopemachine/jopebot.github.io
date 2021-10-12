---
layout: post
title: "일반 function vs Arrow function"
subtitle: "프론트 면접 질문 정리"
author: jopemachine
tags: 
 - Frontend
 - Javascript
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# 일반 function vs Arrow function

## this 바인딩

- 자바스크립트에서 function의 this는 다소 복잡한 방식으로 바인딩 된다.

```
1. 메소드일 경우 해당 객체를 가리킴

2. 생성자일 경우 해당 객체를 가리킴

3. 일반적으로 전역 객체인 window를 가리킴.
```

<br />

그래서 Arrow function이 없었던 ES5까지는 *this에 상위 컨텍스트의 문맥을 넣고 싶다면* `call`, `apply`, `bind` 함수를 사용해야 했다.

<br />

- Arrow function의 경우 자동으로 this가 상위 컨텍스트의 this를 이어 받기 때문에 `call`, `apply`, `bind`를 사용할 필요가 없다.

- 상위 컨텍스트의 this를 이어 받는다 => Lexical scope라고 함.

- 메소드 같은 경우 해당 객체를 가리켜야지 상위 컨텍스트의 this를 이어 받으면 안 된다. 이런 곳엔 일반 함수를 쓰는 편이 좋다.

- 이벤트 핸들러 같은 경우에도 상위 컨텍스트의 this를 이어 받지 않기 위해 일반 함수를 쓰는 편이 좋음. (this를 안 쓰면 상관 없다.)

## 생성자 함수로 쓸 수 없다.

- arrow function 생성자 함수로 사용할 수 없다. (new 연산자로 호출할 수 없음.)

- class 안의 constructor에도 arrow function을 쓸 수 없다.

## Related links

- [Functions vs Arrow functions](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

- [Execution context란?](https://jopemachine.github.io/2021/10/07/Execution-Context/)