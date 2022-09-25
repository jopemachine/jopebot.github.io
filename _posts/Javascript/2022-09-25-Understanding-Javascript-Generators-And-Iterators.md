---
layout: post
title: 번역 - Understanding Javascript Generators and Iterators
subtitle: 번역
author: jopemachine
tags:
  - Javascript
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: September 25, 2022
---

# 번역 - Understanding Javascript Generators and Iterators

당신의 가장 친한 친구가 매우 창의적인 화가라고 생각해보세요.

이 친구는 매일 그림을 그립니다.

매일 다른 아름답고 화려한 그림들을 창조합니다.

그러나 그녀의 창의성은 항상 일관적이지는 않습니다.

그래서 가끔은 더 많은 그림을 그리기도 하고, 다른 날은 좀 덜 그리기도 합니다.

매일 그리는 그림의 양은 확실하지 않고, 그녀의 영감과 창의성에 의존할 것입니다.

어느 날 그녀는 당신에게 그녀의 그림을 판매할 준비를 도와달라고 부탁합니다.

새로운 그림을 그릴 때 마다, 당신은 그 그림을 제대로 드라이해야 하고,

멋지고 튼튼한 종이에 싸서 판매할 준비가 된 상태로 보관해야 합니다.

각각의 새로운 그림에 대해 그 과정을 반복해야 합니다.

그래서 우리는 하루 동안 어느 정도 양의 그림을 생성할 지 알 수 없는 제작자와 함께 있습니다.

그럼에도 불구하고, 우리는 모든 그림을 완료하는 즉시 검토해야 하는 절차를 갖고 있습니다.

그러나 우리는 정확히 언제 새로운 그림이 그려질지, 하루에 그 그림들이 얼마나 완성될지 모릅니다.

하루가 끝날 때 까지 기다렸다가 모든 그림을 완성할 수 있다면, 얼마나 많은 그림이 있는지 알 수 있고

아래와 같은 프로세스를 실행할 수 있을 것입니다.

![](/img/posts/Javascript/2022-09-25-Understanding-Javascript-Generators-And-Iterators/1_ZPhOsvRrcKuV3dL3PSnuEA.png)

그러나 이것은 그렇지 않습니다.

우린 이 그림들을 만들어지는 즉시 처리하고 싶습니다.

우리 문제의 두 가지 전제를 소개합니다.

* 시간이 지남에 따라 **알 수 없는 양**의 그림을 생산하는 화가

* 각 그림이 **생산되는 즉시 처리해야** 합니다.

## 문제를 쪼개봅시다.

우선 아래의 전제를 살펴봅시다.

> 시간이 지남에 따라 알 수 없는 양의 그림을 생산하는 화가

이 전제에 따라 우리는 아래처럼 쓸 수 없습니다.

![](/img/posts/Javascript/2022-09-25-Understanding-Javascript-Generators-And-Iterators/1_jXvehc0fhxPGqao4tFVzWw.png)

그림들이 시간이 지남에 따라 만들어지기 때문에, 우린 얼마나 많은 그림들이 만들어질 지 모릅니다.

이런 일련의 그림의 배열을 생성하기 위해, 우린 미리 한 번에 모두 제작 가능한 컬렉션을 알아야 할 필요가 있습니다.

우리가 전체 컬렉션을 얻을 수 있는 방법의 한 가지는 하루에 완전히 끝나고, 전체 컬렉션을 얻었을 때 입니다.

그러나 이것은 우리가 원하는 게 아닙니다.

**반면 우리는 아래의 전제를 갖고 있습니다.**

> 각 그림이 생산되는 즉시 처리해야 합니다.

우리는 두 가지 기본적인 제약을 추출할 수 있습니다.

1. 불확실한 양의 컬렉션.

2. 오자마자 각각의 아이템들을 처리함.

따라서 다음과 같은 일반 루프를 사용하는 프로세스는 사용할 수 없습니다.

![](/img/posts/Javascript/2022-09-25-Understanding-Javascript-Generators-And-Iterators/1_6BtcApG-UniQC2_4B2xFQg.png)

문제는 우리가 아직 모든 항목을 갖고 있지 않고 (paintings[x]는 불가능), 얼마나 많은 항목이 있는지 정확히 모른다는 것입니다. (마찬가지로 paintings.length도 불가능함)

## Generators와 Iterator의 소개

화가와 그림 컬렉션에 대한 프로세스 간의 커뮤니케이션을 구축하기 위해, 일련의 프로토콜을 구축해야 합니다.

편의를 위해 우리는 먼저 이 문제를 풀기 위한 일련의 규칙(프로토콜) 을 정의하는 것으로 시작하겠습니다.

> 각 그림이 생산되는 즉시 처리해야 합니다.

우리는 이 문장을 아래처럼 조금 더 추상화 시켜 볼 수 있습니다.

> 생성된 값들의 시퀸스를 순회해야 합니다.

우리는 첫 번째 값을 얻어야 하며, 두 번째 값, 그 다음 세 번째 값... 들이 필요합니다.

이러한 문제를 해결하기 위해 우리는 `next()`라고 불리는 함수를 도입할 것입니다.

이 함수는 `value`라는 속성을 통해 제작된 그림에 엑세스 할 수 있는 object를 반환하며, `done`이라는 속성을 통해 어떤 날짜에 제작이 완료되었는지도 알려줍니다.

이 일련의 규칙들을 좀 더 일반적인 문제들에 추상화 시켜보면, 문맥과 값에 관계 없이 일반적인 컬렉션을 반복하는 방법을 정확히 정의할 수 있습니다.

이 프로토콜을 따른다면, 우린 생성된 값을 반복하는 방법을 알 수 있습니다.

따라서, 이것들을 반영해보면 아래와 같이 됩니다.:

![](/img/posts/Javascript/2022-09-25-Understanding-Javascript-Generators-And-Iterators/1_UaBBIHpOkP07ZkK52FzhSg.png)

이것이 **iterator 프로토콜** 입니다.

기본적으로 `{ value: …, done: …}` 모양에 맞는 객체를 반환하는 `next()`를 구현하는 모든 객체는 `iterator` 라고 할 수 있습니다.

그런 다음 그림에 대한 `iterator`를 다음과 같이 정의할 수 있습니다.

![](/img/posts/Javascript/2022-09-25-Understanding-Javascript-Generators-And-Iterators/1_I0LxCg0I4ToJhv5LojtJnw.png)

이제 우린 문제의 다른 부분을 공격할 수 있습니다.

> 시간이 지남에 따라 알 수 없는 양의 그림을 생산하는 화가

이 전제의 추상적 표현은 다음과 같을 수 있습니다.

> 시간이 지남에 따라 일련의 값을 만들어내는 producer

초기화하고, 값을 생성하고, 또 다른 값을 생성하고, 다시 또 다른 값을 생성하고...

이 부분과 `iterator`에서 이미 본 이전 부분 사이에는 상관 관계가 있습니다.

화가가 낮 시간 동안 그림을 제작하는 것과 마찬가지로, 이 producer는 시간이 지남에 따라 일련의 값을 생성합니다.

이 producer를 **generator 함수**라고 부릅니다.

`generator` 함수는 하나의 결과만 생성하는 일반 함수와 달리 여러 결과를 생성할 수 있습니다.

일반 함수가 여러 값을 반환해야 하는 경우 배열을 반환해야 합니다.

우리는 시간이 지남에 따라 결과를 생성해 처리해야 하기 때문에, 이러한 기능은 우리 문제와 맞지 않습니다.

그 대신 `generator` 함수는 여러 값을 반환합니다.

`generator` 함수는 부분적으로 실행되고, 결과를 생성해낼 것입니다.

계속하라는 신호를 받으면 부분적으로 다시 실행되어 다른 값을 생성하는 식입니다.

`generator` 함수를 선언하려면 `function*` (함수 선언 키워드 및 별표)를 사용해야 합니다.

따라서 그림 `generator` 함수는 다음과 같습니다.

![](/img/posts/Javascript/2022-09-25-Understanding-Javascript-Generators-And-Iterators/1_dCitkwK3AScTBxkHHqf9MQ.png)

흥미로운 점은 `generator` 함수가 호출될 때 `iterator` 프로토콜을 따르는 객체를 리턴한다는 것입니다.

`generator` 함수는 시간이 지남에 따라 여러 값을 생성합니다.

본문을 완료할 때까지 끝까지 실행하지 않고, 값을 리턴하고 일시 중지합니다.

`generator` 함수는 `iterator` 프로토콜을 따르는 객체를 리턴합니다.

생성된 값을 얻기 위해 신호를 보내는 방법은 `iterator` 객체에 `next()`를 호출하는 것입니다.

`next()` 함수를 호출하면 `generator` 함수의 본문이 첫 번째 `yield`문 까지 호출됩니다.

`next()` 함수는 `{ value: /* value from yield */, done: } `인터페이스 형태로 `iterator` 결과를 반환합니다.

만약 그 `iterator` 객체에 대해 다시 `next`를 호출한다면, `generator` 함수는 그 다음 `yield` 문까지 실행될 것입니다.

![](/img/posts/Javascript/2022-09-25-Understanding-Javascript-Generators-And-Iterators/1_4tbzRQuoDFQCgRRTDHZknw.png)

## 결론

시간이 지남에 따라 값의 시퀀스를 생성해야 할 때마다, `generator` 함수를 사용할 수 있습니다.

`generator` 함수는 완료될 때까지 실행되지 않고 yield 문까지 부분적으로 실행됩니다.

`generator` 함수는 무한히 실행될 수 있고 무한한 값을 생성할 수 있습니다.

`generator` 함수는 `iterator` 프로토콜을 따르는 `generator` 객체를 반환합니다.

모든 객체는 `iterator`가 될 수 있으며 반드시 `generator` 함수를 통해 생성할 필요는 없습니다.

객체가 `iterator`가 되기 위한 유일한 요구 사항은 `next()` 함수를 구현하고 **`iterator` 프로토콜을 준수하는 것**입니다.

다음 시간에는 `iterable`에 대해 이야기하겠습니다.

# 원문

- [Understanding javascript generators and iterators](https://medium.com/@dgmrtnz/understanding-javascript-generators-and-iterators-a3f206c1008d)
