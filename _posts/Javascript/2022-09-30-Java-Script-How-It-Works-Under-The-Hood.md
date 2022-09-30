---
layout: post
title: 번역 - JavaScript의 내부 작동 원리, 입문자를 위한 설명
subtitle: 자바스크립트 세부사항 스터디
author: jopemachine
original-author: Ali Mustafa
tags:
  - Javascript
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: September 30, 2022
---

# JavaScript의 내부 작동 원리, 입문자를 위한 설명

> JavaScript가 내부적으로 작동하는 방식을 이해하여 더 나은 코드를 작성하세요

![](/img/posts/Javascript/2022-09-30-Java-Script-How-It-Works-Under-The-Hood/0_UErecmJ-Qi12rXR2.png)

매일 JavaScript를 작성하면서 알았을 수도 있지만, 브라우저가 작성된 코드를 읽는 방법과 내부에서 실제로 어떤 일이 일어나는지 궁금했었던 적이 있나요? 당신은 텍스트 편집기에서 코드를 작성하지만 그게 어떻게 0과 1로 바뀔까요? JavaScript에는 개발자로서 익숙해지면 더 나은 코드를 작성하는 데 도움이 될 수 있는 몇 가지 주제가 있습니다.

JavaScript 엔진은 많은 작업을 수행하지만 가장 중요한 것은 코드를 읽고 실행하는 것입니다. 그 목적을 위해 우리는 데이터를 저장하고 쓸 장소와 무슨 일이 일어나고 있는지 라인 별로 추적하고 실행할 저장소가 필요합니다.

![](/img/posts/Javascript/2022-09-30-Java-Script-How-It-Works-Under-The-Hood/1_pgLyQDVYWw6qS3L7ouk58Q.png)

메모리 관리는 JavaScript가 함수와 변수에 메모리를 할당할 필요 없이 스스로 처리해주는 것들 중 하나입니다. 이것은 힙, 스택 및 콜 스택이 작동하는 방식에도 동일하게 적용됩니다. (개발자가 잘 몰라도 알아서 처리해 줌.) 그러나 이들에 대해 알고 작동 방식을 알면 JavaScript가 작동하는 방식을 이해하는 데 도움이 되며 결과적으로 더 나은 코드를 작성할 수 있습니다.

## 콜 스택(Call stack)

자바스크립트(JavaScript)는 한 번에 한 가지 작업만 할 수 있는 단일 스레드 프로그래밍 언어이며 FILO(First in Last Out)를 따르는 콜 스택이 하나만 있으며, 이는 첫 번째 넣은 항목이 마지막에 나오는(popped out) 것을 의미하며 자바스크립트 인터프리터가 스크립트의 함수들과 동기적인(Synchronous) 코드 실행을 추적할 수 있도록 도와주는 메커니즘입니다.

![](/img/posts/Javascript/2022-09-30-Java-Script-How-It-Works-Under-The-Hood/1_PkT7QWALgM5PFqOTib_axw.png)

## 메모리 힙(Memory Heap)

자바스크립트가 변수, 객체, 함수를 저장하는 공간 또는 영역으로 런타임이 되어야 알 수 있습니다(known at run time). JavaScript는 객체와 함수를 힙에 저장하고 변수는 스택에 저장한다는 점에 주목해야 합니다.

![](/img/posts/Javascript/2022-09-30-Java-Script-How-It-Works-Under-The-Hood/1_A9qc5aFj51k5cl48iOmCjQ.png)

## 스택 오버플로우(Stack overflow)

함수 호출이 재귀적으로 일어나, 브라우저가 종료 점이 없는 콜 스택(maximum call stack)을 갖게 될 때 일어나는 상황을 가리키며, 대부분의 경우 재귀로 인해 발생합니다.

```js
function callMyself(){
  callMyself();
}
```

![](/img/posts/Javascript/2022-09-30-Java-Script-How-It-Works-Under-The-Hood/1_elp7EuwjvARNHSYEty6e0Q.png)

## 가비지 콜렉션

JavaScript는 선언되었지만 현재 애플리케이션의 어떤 부분에서도 사용되지 않는 객체에서 메모리를 확보하고 해제하는 가비지 수집 언어입니다.

라이브러리를 통해 가비지 컬렉션을 구현하는 저수준 언어에 비해, 대부분의 고수준 언어(high level)들은 자체적인 가비지 컬렉터 구현을 갖고 있습니다. 가비지 컬렉션은 메모리 관리에 대해 걱정할 필요가 없게 해 주는 반면, 몇 가지 보안 문제를 제공합니다.

저수준 언어에서는 어떤 면에서 위험한 메모리 할당을 제어하지만 최적화할 수 있기 때문에 C와 같은 저수준 언어는 매우 빠르고 메모리 효율적입니다. JavaScript의 가비지 컬렉션은 참조가 없는 모든 객체를 메모리에서 삭제하는 **Mark and Sweep**이라는 알고리즘을 통해 제어됩니다.

![](/img/posts/Javascript/2022-09-30-Java-Script-How-It-Works-Under-The-Hood/0_Z40bxfgsrNMdRQ37.gif)

1. **Mark**: 여전히 참조를 갖고 있는 객체들을 마킹합니다.

2. **Sweep**: 메모리에서 모든 객체들을 스캔하고, 마킹되지 않은 객체들을 제거합니다.

## 메모리 누수

시스템이 메모리 할당을 관리할 수 없는 경우, 메모리 누수라고 하며 이는 성능 저하와 오류를 초래하는 버그로 분류되며, 누수된 메모리는 무슨 이유에서든 운영 체제나 사용 가능한 메모리 풀로 반환되지 않습니다. 가비지 수집 언어에서 메모리 누수의 주요 원인은 **원치 않는 참조**입니다. 가장 일반적인 유형의 메모리 누수는 다음과 같이 나눌 수 있습니다.

1. **전역 변수**: JavaScript 전역 변수는 루트 노드에서 참조하기 때문에 가비지 콜렉팅의 대상이 되지 않으며 실행되는 동안 응용 프로그램을 차지하게 됩니다.

2. **이벤트 리스너(Event listener)**: 적절하게 처리 되지 않는 경우, 이벤트 리스너는 콜백에 무거운 객체 참조가 유지될 때, 특히 SPA(단일 페이지 애플리케이션)에 많이 일어납니다.

3. **setInterval**: `setInterval`이 지정된 시간 동안 실행될 수 있는 함수를 호출할 때마다 새로운 스택 프레임이 힙에 추가되게 됩니다. 따라서, 중지하지 않는다면 계속 실행되는 `setInterval`이 메모리 누수를 일으킬 수 있습니다.

## 자바스크립트 런타임

우리가 이미 언급했듯이 자바스크립트는 단일 스레드 언어이며 스택과 힙만 가지고 있기 때문에 다른 프로그램을 실행하고 싶다면 이전 프로그램 실행이 완료될 때까지 기다려야 합니다. 동기적인(synchronous) JavaScript 코드가 실행되는 동안 백그라운드에서 작동하는 웹 브라우저 및 웹 브라우저는 JS 엔진과 통신하기 위해 웹 API라는 것을 사용합니다

브라우저는 백그라운드에서 작업을 수행하기 위해 **C / C++** 과 같은 저수준의 언어를 사용하며 이러한 API를 **웹 API**라고 합니다. 이것들은 비동기(asynchronous)라고 불리는 것으로, 우리가 이들에게 백그라운드에서 무언가를 하고, 완료되었을 때 데이터를 반환하도록 지시할 수 있다는 것을 의미합니다.

![](/img/posts/Javascript/2022-09-30-Java-Script-How-It-Works-Under-The-Hood/1_9Wc5goWTOoGEzNwbrz6wUQ.png)

## 콜백 큐(Call back queue)

비동기 코드가 푸시되고 실행을 기다리는 FIFO 데이터 구조입니다.

## 이벤트 루프(Event loop)

콜 스택과 콜백 큐를 계속 살펴보면서 실행 중이며, 콜 스택이 비어 있으면 콜백 큐의 첫 번째 콜백 함수를 콜 스택으로 푸시합니다.

![](/img/posts/Javascript/2022-09-30-Java-Script-How-It-Works-Under-The-Hood/0_L9xXi0dsAp2S5BUD.gif)

# 원문

- [How JavaScript Works Under the Hood, Explained for Dummies](https://javascript.plainenglish.io/how-javascript-works-under-the-hood-explained-for-dummies-216ce155183c)
