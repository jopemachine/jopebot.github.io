---
layout: post
title: "Virtual DOM"
subtitle: "프론트 면접 질문 정리"
author: jopemachine
tags: 
 - Frontend
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# Virtual DOM

- 메모리 상에 올라가 있는 *UI의 가상적인 표현*. 즉, virtual DOM의 변경만으론 Reflow를 일으키지 않음. 

- DOM에 줘야 하는 변화들을 **묶어서 적용해** 강제 동기 레이아웃을 일으키지 않게 해 주기 위한 일종의 자동화, 추상화된 DOM 트리.

- 직접 DOM 조작을 묶어서 해도 되지만 코드 베이스가 커질수록 복잡도 증가해 유지 보수에 어려움 생김.

## Virtual DOM과 react

- Virtual DOM은 `react`의 개념이 아님. `react` 사용하지 않고도 사용 가능한 애초에 별개의 개념.

- `react-dom`과 같은 라이브러리에 의해 브라우저의 DOM, `ink`의 콘솔, `react-native`의 모바일 네이티브 컴포넌트들과의 동기화가 이뤄짐. 이것을 `Reconcilation`이라고 부름

- 잘 최적화해 놓는다면 `react`를 쓰지 않는 것이 당연히 더 빠르다.

## Virtual DOM과 state

- state가 변하면 virtual DOM이 다시 그려짐.

- 엘리먼트의 타입이 다른 경우 완전히 새로운 트리를 그리지만, 엘리먼트의 타입이 다른 경우 변경된 속성들만 갱신 가능하다

- `react`의 경우 트리 변경이 일어나야 할 때 전체 트리를 다시 만들어야 하는 상황을 피하기 위해 휴리스틱 알고리즘에 의존하고 있음.

- 이 알고리즘 (DOM과 virtual DOM에서 변경된 부분을 비교하는 알고리즘)을 `diff 알고리즘`이라고 함.