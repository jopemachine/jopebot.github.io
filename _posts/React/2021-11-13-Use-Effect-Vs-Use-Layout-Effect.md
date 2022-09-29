---
layout: post
title: useEffect vs useLayoutEffect
subtitle: React 세부사항
author: jopemachine
tags:
  - Frontend
  - React
header-img: img/header-img/react.png
header-mask: 0.3
last-update: September 29, 2022
---

# useEffect vs useLayoutEffect

> 둘은 같은 API를 갖고 있고 이름도 비슷한데 어떻게 다른가?

`useEffect`로 전달된 콜백은 `Layout`, `Paint` 이후 발생한다.

(두 번째 인자로 전달된 상태의 변화에 맞춰 바로 동기적으로 실행되는 게 아니라 지연한다)

대다수의 Side effect가 이렇게 다뤄져야 하므로 일반적으로 `useEffect`를 사용해야 한다.

하지만 특정 이펙트들은 **레이아웃이 일어나기 전에 상태의 변화에 맞춰 동기적**으로 실행되어야 한다.

이런 이펙트들은 `useEffect` 보다 `useLayoutEffect`로 구현하는 편이 좋다.

그리고 `useLayoutEffect`는 *동기적으로 일어나기 때문에 당연히 무거운 작업을 넣어 놓으면 안 된다*.

![](/img/posts/Front/2021-11-13-Use-Effect-Vs-Use-Layout-Effect/hook-flow.png)

## Related links

- [React 공식 문서](https://ko.reactjs.org/docs/hooks-reference.html#timing-of-effects)

- [useLayoutEffect 훅에 대하여](https://merrily-code.tistory.com/46)

- [Hook flow](https://github.com/donavon/hook-flow)
