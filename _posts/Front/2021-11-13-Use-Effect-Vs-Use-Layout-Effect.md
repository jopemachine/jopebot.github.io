---
layout: post
title: "useEffect vs useLayoutEffect"
subtitle: "프론트 면접 질문 정리"
author: jopemachine
tags: 
 - Frontend
 - React
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# useEffect vs useLayoutEffect

useEffect로 전달된 콜백은 레이아웃 배치, 페인트 이후 발생한다.

(두 번째 인자로 전달된 상태의 변화에 맞춰 바로 동기적으로 실행되는 게 아니라 지연한다)

대다수의 Side effect는 이렇게 다뤄져야 한다,

하지만 특정 이펙트들은 레이아웃이 일어나기 전에 상태의 변화에 맞춰 동기적으로 실행되어야 한다.

이런 이펙트들은 `useEffect` 보다 `useLayoutEffect`로 구현하는 편이 좋다.

## Related links

- [React 공식 문서](https://ko.reactjs.org/docs/hooks-reference.html#timing-of-effects)