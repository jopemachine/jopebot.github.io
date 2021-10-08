---
layout: post
title: requestAnimationFrame vs requestIdleCallback
subtitle: 프론트 면접 질문 정리
author: jopemachine
tags:
  - Frontend
  - Browser
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: November 13, 2021
---

# requestAnimationFrame vs requestIdleCallback

- Passive event listenrer 라고 부름.

## requestAnimationFrame

- `rAF`는 브라우저에서 다큐먼트의 스타일, 레이아웃을 새로 계산할 때 마다 (정확히는 바로 직전) 콜백함수를 실행시킨다.

## requestIdleCallback

- `rAF`와 API는 유사하지만 완전히 다른 목적으로 쓰임.

- 브라우저가 idle 상태일 때 콜백을 호출해주기 때문에 애니메이션 등의 작업에 악영향 없이 백그라운드 작업을 수행할 수 있게 해 준다.

- 이 콜백에서 DOM을 변경하지 말 것. DOM을 변경하고 싶다면 `rAF` 사용.

- 레이아웃 변경을 일으키지 않는 무한 스크롤 뷰 등에 사용 가능.

- 참고로 React v16까지의 내부의 업데이트 큐가 `rIC`를 통해 실행된다. (하지만 v17 이후에선 페이스북에서 자체적으로 만든 스케줄러를 사용한다.)

## Related links

- [스택 오버플로우, requestidlecallback vs requestanimationframe](https://stackoverflow.com/questions/41740082/scroll-events-requestanimationframe-vs-requestidlecallback-vs-passive-event-lis)

- [MSDN requestIdleCallback API](https://developer.mozilla.org/ko/docs/Web/API/Window/requestIdleCallback)

- [두 함수를 포함한 Frame의 lifecycle에 관한 글](https://medium.com/@paul_irish/requestanimationframe-scheduling-for-nerds-9c57f7438ef4)