---
layout: post
title: 번역 - Avoid Using Array Index for Key in React
subtitle: React 세부사항
author: jopemachine
tags:
  - React
  - Frontend
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: September 25, 2022
---

# Avoid Using Array Index for Key in React

이 두 번째 게시물에서, 나는 React js에서 array 인덱스를 key 값으로 사용하는 것에 대해 논의할 것입니다.

react는 배열 내 아이템 목록들을 렌더링 하기 위해 `map()` 메서드를 사용해 배열을 순회할 때, 각 아이템들에 key 속성을 명시해 react가 각 아이템들의 업데이트, 또는 제거를 감지할 수 있도록 돕도록 요구합니다.

종종 react 개발자들은 key 값으로 배열의 인덱스를 사용해 그 경고를 제거합니다. 맞죠?

![](/img/posts/React/2022-09-25-Avoid-Using-Array-Index-For-Key-In-React/1_TKtkAOW20-NQVlG1-2kLOQ.png)

Robin Pokorny의 조언에 따르면, 배열의 인덱스를 key로 사용하는 것은 괜찮습니다.

아래의 상황에서 당신은 인덱스를 사용할 수 있습니다.

1. 리스트와 아이템들이 정적이며, 변경되거나 재계산되지 않을 경우

2. 리스트 내 아이템들이 ID를 갖고 있지 않은 경우

3. 리스트가 절대로 **정렬**되거나 **필터링** 되지 않을 경우

그러나 여전히 가장 좋은 방법은 리스트, 아이템 ID를 key로 사용하는 것입니다.

하지만 당신은 여전히 key로 배열 인덱스를 사용하지 말아야 하는 이유에 대해 물어보고 싶을 것입니다. 맞죠? 여기에 그 이유가 있습니다.

## 배열 인덱스는 react 앱을 손상시키고 잘못된 데이터를 렌더링하게 만들 수 있습니다.

이제 우린 react가 각 아이템들에 대해 왜 하나의 키 값을 요구하는지 알고 있으므로, 인덱스를 사용하는 것은 어플리케이션이 업데이트 될 때 (1개 이상의 아이템이 추가, 제거될 때) 손상을 발생시킬 수 있습니다.

당신이 아이템들의 리스트를 갖고 있고, 그 리스트를 `map()` 메서드로 순회한다고 가정해봅시다. 그리고 리스트의 아이템들은 곧 업데이트 될 것입니다. 우리가 배열의 중간에 아이템을 삽입하거나, 제거한다고 가정해봅시다.
만약, 키 값이 이전과 같다면 react는 DOM elements들이 이전과 같은 리스트를 나타내고 있다고 생각할 것이고, 이것은 완전히 틀렸습니다.

## 해결 방법

### 아이템의 ID 사용하기

첫 번째 해결 방법은 각 아이템의 ID를 사용하는 것입니다. 각 아이템들에 영구적인 ID를 명시해야 합니다.

![](/img/posts/React/2022-09-25-Avoid-Using-Array-Index-For-Key-In-React/1_KrBlswNZr7nt-3hJfQeCog.png)

위 예제 코드에서 수학 수업을 듣는 학생들의 배열을 정의했습니다.

각 학생들은 특별한, 고유 ID를 갖고 있으며, 이것은 학생들을 구별하는데 매우 유용합니다.

따라서, key 값에 해당 ID를 사용할 수 있습니다.

### ID Generator 사용하기

두 번째 해결 방법은 내가 좋아하는 것으로, 고유 ID 생성기를 사용하는 것입니다.

나는 [NanoID](https://github.com/ai/nanoid/)라고 이름 붙힌 npm package를 사용합니다.

`NanoID`를 사용하는 이유는 아래와 같습니다.

* UUID보다 훨씬 더 빠릅니다.

* `Math.random` 대신 `crypto` 모듈을 사용해 구현되었기 때문에, 비결정적 (Unpredictability)입니다.

* 균일한 결과를 냅니다. `NanoID`는 더 나은 알고리즘을 사용하며, 균일성(Uniformity)이 테스트되었습니다.

* documentation이 잘 작성되어 있습니다.

![](/img/posts/React/2022-09-25-Avoid-Using-Array-Index-For-Key-In-React/1_IV7HTQgTslufILFHKadDOA.png)

이제 우린 각 학생들에 대해 ID 생성기를 사용할 것이며, 만약 우리가 랜덤한 고유 ID를 찾고 있었다면 이건 매우 좋은 생각입니다.

그리고 우리가 우리 데이터를 정의할 때 고유 ID를 생성하기 때문에, 우린 react가 다시 렌더링 할 때 여전히 고유한 ID를 갖고 있습니다. 즉, 이 방법은 안전합니다.

`NanoID`에 대해 더 배우기 위해 [이 레포지토리](https://github.com/ai/nanoid/)를 방문해보세요.

오늘은 여기까지 입니다.

react key 속성의 값으로 배열 인덱스를 사용하는 것에 대한 새로운 통찰력을 얻으셨기를 바랍니다.

<hr />

### References and related articles:

https://reactjs.org/docs/lists-and-keys.html#keys

https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern

https://www.developerway.com/posts/react-key-attribute

https://www.geeksforgeeks.org/reactjs-keys

https://adhithiravi.medium.com/why-do-i-need-keys-in-react-lists-dbb522188bbb


## 원문

- [Avoid Using Array Index for Key in React](https://medium.com/@rizfirsy/avoid-using-array-index-for-key-in-react-a9ff784be724)
