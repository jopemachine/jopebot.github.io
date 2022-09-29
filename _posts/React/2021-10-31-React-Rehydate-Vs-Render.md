---
layout: post
title: React, rehydrate vs render
subtitle: React 세부사항
author: jopemachine
tags:
  - Frontend
  - React
header-img: img/header-img/react.png
header-mask: 0.3
last-update: September 29, 2022
---

# React, Rehydate vs render

## render

```js
render(element, container, callback)
```

- `element`를 `container`의 자식으로 렌더링하고, 렌더링 후 `callback` 함수를 실행함.

- 이미 렌더링 된 적이 있다면 diff 알고리즘을 통해 필요한 부분만 업데이트함.

## hydrate, dehydrate, rehydrate

```js
hydrate(element, container, callback)
```

- 내려 받은 정적인 HTML 문서(plain text)를 동적인 리액트 컴포넌트 트리로 바꾸는 과정을 `hydrate` 라고 한다.

- 기본적으로 `render`와 동일한 역할을 하지만 `ReactDOMServer`와 함께 SSR에 사용됨.

- 반대로, 리액트 컴포넌트 트리를 정적인 HTML 문서로 만드는 과정을 `dehydrate` 라고 한다.

- 이미 렌더링 된 `html` 컨텐츠를 다시 리액트 컴포넌트 트리로 바꾸는 것을 `rehydrate` 라고 한다.

- render를 호출하면 페이지를 다시 렌더링 하지만, `hydrate`를 호출하면 html 엘리먼트가 서버에 의해 렌더링 될 것으로 예상하여, 이벤트 리스너만 핸들링 한다.

- 따라서 SSR 사용 시, `hydrate`를 사용해야 해야 함.

## Redux에서의 Rehydration

- persist 되어 있는 redux store를 메모리에 올리는 걸 `rehydration`이라 표현.
