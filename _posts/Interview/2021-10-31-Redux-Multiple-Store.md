---
layout: post
title: "Redux multiple store에 대해"
subtitle: "프론트 면접 질문 정리"
author: jopemachine
tags: 
 - Frontend
 - Redux
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# Redux multiple store에 대해

- Redux store는 의도적으로 싱글톤으로 만들어졌다. (Flux 패턴) 스토어 자체가 데이터의 도메인에 따라 리듀서들에 의해 나뉘기 때문에 스토어를 여러 개로 나누는 것은 불필요하다.

- 너무 빈번한 생태 변화에 의해 발생하는 퍼포먼스 이슈를 해결하기 위해 여러 개의 스토어를 만드는 것을 생각해 볼 수 있다.

- Redux (Flux)에서 추천하는 패턴이 아니니, 처음부터 Multiple store를 쓸 생각하지 말고 반드시 필요한 경우에 한해 고려할 것.

- Multiple store는 데이터 흐름 단방향성을 깨버리기 때문에 디버깅하기 힘들다.

- 매우 큰 규모의 앱 같은 경우 종종 앱의 각 영역들을 아예 다른 area로 바라본다. 즉, 전체 앱을 각각의 작은 앱들의 조합이라고 생각함.

- 이런 매우 큰 규모의 앱에 한해선 Multiple store를 사용한다고 함.

## Related link

- [Stackoverflow 관련 이슈](https://stackoverflow.com/questions/33619775/redux-multiple-stores-why-not)