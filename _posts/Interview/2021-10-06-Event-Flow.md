---
layout: post
title: "Event flow"
subtitle: "프론트 면접 질문 정리"
author: jopemachine
tags: 
 - Frontend
 - Browser
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# Event flow

- `html`은 여러 Element 들의 중첩으로 이뤄져 있음

- 만약 어떤 요소에 클릭 이벤트가 일어났을 때 이 요소와 이 요소의 부모 엘리먼트들의 이벤트 처리는 어떻게 이뤄져야 하는가?

## 1. Capture phase (propagation up)

- **부모 엘리먼트에서 자식 엘리먼트 순서**로 전파된다. (html -> body -> div 같은 순으로..)

## 2. Target phase 

## 3. Bubble phase (propagtion down)

- **자식 엘리먼트에서 부모 엘리먼트 순서**로 전파된다 (div -> body -> html..)

## currentTarget vs target

- 특정 이벤트 객체엔 `target` 객체와 `currentTarget` 객체가 담겨 있다.

- target은 해당 event flow에서 가장 자식 (가장 위) 엘리먼트가 된다.

- `currentTarget`은 해당 phase 에서의 element를 가리킨다.

- `currentTarget`과 `target이` 일치하지 않는 경우 디폴트 값으로 bubble phase에서 실행되지만 css로 capture phase에서 실행되도록 변경할 수 있다.

## 이벤트 위임 (Event delegation)

- Event flow란 게 있기 때문에 자식 엘리먼트에 핸들러를 붙여 놓는 대신 부모 엘리먼트에서 target을 검사해 자식 엘리먼트의 이벤트 처리를 담당할 수 있다.

- 브라우저 환경에서 많은 핸들러로 인해 성능이 저하되는 것을 막기 위해 사용할 수 있다.