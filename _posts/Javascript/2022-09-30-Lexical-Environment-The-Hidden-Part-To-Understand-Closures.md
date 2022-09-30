---
layout: post
title: 번역 - Lexical Environment — The hidden part to understand Closures
subtitle: 자바스크립트 세부사항 스터디
author: jopemachine
tags:
  - Javascript
  - Translation
header-img: img/header-img/javascript.png
header-mask: 0.3
last-update: September 30, 2022
---

# Lexical Environment — The hidden part to understand Closures

![](/img/posts/Javascript/2022-09-30-Lexical-Environment-The-Hidden-Part-To-Understand-Closures/0_rOhdypP7zTFRNuoB.jpg)

JavaScript 세계를 처음 접하는 경우 **클로저**는 어려운 개념일 수 있습니다. 인터넷을 검색하면 클로저가 무엇인지에 대한 수많은 정의를 접할 수 있습니다. 그러나 저는 이러한 정의들 대부분이 모호하고 클로저가 존재하는 근본적인 원인을 설명하지 못한다고 느꼈습니다.

오늘 우리는 `실행 컨텍스트`, `Lexical Environment` 및 `Identifier Resolution`을 포함하여 ECMAScript 262 사양의 일부 개념들을 이해할 것입니다. 또한 이러한 메커니즘으로 인해 ECMAScript의 모든 함수는 클로저라는 것을 알게 될 것입니다.

먼저 용어를 설명한 다음 이 부분들이 함께 작동하는 방식을 설명하는 몇 가지 코드 샘플을 보여 드리겠습니다. 이 방식이 당신의 이해를 확고히 하는 데 도움이 될 것입니다.

## 실행 컨텍스트

JavaScript 인터프리터는 우리가 작성한 함수나 스크립트를 실행하려고 할 때마다 새로운 컨텍스트를 생성합니다. 모든 스크립트 / 코드는 **전역 실행 컨텍스트**라는 실행 컨텍스트로 시작합니다. 그리고 함수를 호출할 때마다 새로운 실행 컨텍스트가 생성되어 실행 스택의 맨 위에 놓입니다. 다른 중첩된 함수를 호출하는 중첩 함수를 호출할 때도 동일한 패턴이 따릅니다.

![](/img/posts/Javascript/2022-09-30-Lexical-Environment-The-Hidden-Part-To-Understand-Closures/1_ndhfnSGObBsaongagpUiBg.png)

위 그림과 같이 코드가 실행되면 어떻게 되는지 봅시다.

* *전역 실행 컨텍스트*가 생성되어 실행 컨텍스트 스택의 맨 아래에 배치됩니다.

* 막대가 호출되면 새 ***bar* 실행 컨텍스트**가 생성되고 전역 실행 컨텍스트 위에 놓입니다.

* *bar*가 중첩 함수 *foo*를 호출할 때 새로운 ***foo* 실행 컨텍스트**가 생성되어 *bar* 실행 컨텍스트 위에 배치됩니다.

* *foo*가 반환되면 해당 컨텍스트가 스택에서 튀어나오고(popped out) 실행 흐름이 bar 컨텍스트로 돌아갑니다.

* *bar* 실행이 완료되면 실행 흐름이 전역 컨텍스트로 돌아가고 마지막으로 스택이 비워집니다.

> 실행 스택은 LIFO(Last-In-First-Out) 데이터 구조로 작동합니다. 아래 컨텍스트를 실행하기 전에 가장 위 실행 컨텍스트가 반환될 때까지 기다립니다.

개념적으로 실행 컨텍스트는 다음과 같은 구조를 가지고 있습니다.

```
// Execution context in ES5
ExecutionContext = {
  ThisBinding: <this value>,
  VariableEnvironment: { ... },
  LexicalEnvironment: { ... }
}
```

구조가 위협적으로 보이더라도 걱정하지 마십시오. 우리는 곧 이러한 구성 요소를 살펴보게 될 것입니다. 기억해야 할 핵심 사항은 실행 컨텍스트에 대한 모든 호출은 두 단계로 나뉜다는 것입니다.: **생성 단계**와, **실행 단계**. 생성 단계는 컨텍스트가 생성되었지만 아직 호출되지 않은 경우입니다.

생성 단계에서 아래의 몇 가지 일이 발생합니다.

* VariableEnvironment는 변수, 인수 및 함수 선언의 저장소로 사용됩니다. `var`로 선언된 변수는 `undefined` 값으로 초기화됩니다.

* `This`의 값이 결정됩니다.

* LexicalEnvironment는 이 단계에서 그냥 VariableEnvironment의 복사본(copy)일 뿐 입니다.

실행 단계가 되면,

* 값들이 할당됩니다.

* LexicalEnvironment가 바인딩들을 결정하는데 사용됩니다.

이제 lexical environment가 무엇인지 이해해 봅시다.

## Lexical Environment

ECMAScript 사양 262(8.1)에 따르면,

> Lexical Environment는 ECMAScript 코드의 어휘 중첩 구조(lexical nesting structure)를 기반으로 하는 특정 변수 및 함수들에 대한 식별자(*identifier*)의 연결을 정의하는 데 사용되는 타입입니다.

여기에서 몇 가지를 단순화해봅시다. Lexical Environment은 두 가지 주요 구성 요소로 구성됩니다.: **Environment Record** 및, 외부(부모) Lexical Environment에 대한 **참조**.

```js
var x = 10;

function foo(){
  var y = 20;
  console.log(x + y); // 30
}

// Lexical Environment은 두 가지 주요 구성 요소로 구성됩니다.
// Environment Record 및 외부 환경에 대한 참조

// 전역 컨텍스트에 대한 환경
globalEnvironment = {
  environmentRecord: {
    // 전역에서의 바인딩
    x: 10
  },
  outer: null // 부모 환경은 없음
};

// "foo" 함수의 환경
fooEnvironment = {
  environmentRecord: {
    y: 20
  },
  outer: globalEnvironment
};
```

시각적으로 다음과 같이 보일 것입니다.

![](/img/posts/Javascript/2022-09-30-Lexical-Environment-The-Hidden-Part-To-Understand-Closures/1_hrzr05Ps9hkLst69yqONCQ.png)

foo 컨텍스트에서 식별자 "x"를 확인하려고 할 때, 외부 환경(전역)에 도달합니다. 이 프로세스를 식별자 확인(*Identifier Resolution*) 이라고 하며 실행 컨텍스트를 실행할 때 발생합니다.

이제 이러한 여러 environment에 대한 지식으로 무장하여, 실행 컨텍스트의 구조로 돌아가서 무슨 일이 일어나는지 알아 봅시다.

* **VariableEnvironment**: environmentRecord는 변수, 인수 및 함수 선언의 초기 저장에 사용되는 테이블로, 나중에 컨텍스트 활성화 단계에 들어갈 때 채워집니다.

```js
function foo(a) {
  var b = 20;
}

foo(10);

// 생성 단계에서 foo 함수 컨텍스트의 VariableEnvironment 컴포넌트
fooContext.VariableEnvironment = {
  environmentRecord: {
    arguments: { 0: 10, length: 1, callee: foo },
    a: 10,
    b: undefined
  },
  outer: globalEnvironment
};

// 실행 단계 후 VariableEnvironment environmentRecord 테이블은 값으로 채워집니다.
fooContext.VariableEnvironment = {
  environmentRecord: {
    arguments: { 0: 10, length: 1, callee: foo },
    a: 10,
    b: 20
  },
  outer: globalEnvironment
};
```

* **LexicalEnvironment**: 처음에는 VariableEnvironment의 복사본일 뿐입니다. 실행 중인 컨텍스트에서 컨텍스트에 나타나는 식별자의 바인딩을 결정하는 데 사용됩니다.

`VE(VariableEnvironment)`와 `LE(LexicalEnvironment)`는 본질적으로 모두 Lexical Environment입니다. 즉, 둘 다 정적으로(생성 단계에서) 컨텍스트에 생성된 내부 함수에 대한 외부 바인딩을 캡처합니다. 이 메커니즘이 클로저를 발생시킵니다.

> 내부 함수를 위해 외부 바인딩을 정적으로 캡처하는 것으로, 클로저가 형성됩니다.

## Identifier Resolution (aka. 스코프 체인 검색(Scope chain lookup))

클로저를 이해하기 전에 실행 컨텍스트에서 스코프 체인이 생성되는 방식을 이해합시다. 앞에서 보았듯이 각 실행 컨텍스트는 Identifier Resolution에 사용되는 *LexicalEnvironment*가 있습니다. 컨텍스트에 대한 모든 로컬 바인딩은 environment record 테이블에 저장됩니다. 현재 environmentRecord에서 식별자가 조회되지 않으면 프로세스는 외부(상위) 환경 레코드 테이블로 계속 진행됩니다. 이 패턴은 식별자가 확인될 때까지 계속되며, 찾을 수 없으면 *ReferenceError*가 발생합니다.

이것은 prototype lookup chain과 매우 유사합니다. 이제 여기서 기억해야 할 핵심은 *LexicalEnvironment*가 컨텍스트 생성 단계에서 외부 바인딩을 어휘적으로(정적으로) 캡처하고 실행 중인 컨텍스트에서 그대로 사용한다는 것입니다. (실행 단계).

## 클로저

이전 섹션에서 함수 생성 단계에서 내부 컨텍스트의 *LexicalEnvironment*에 외부 바인딩을 정적으로 저장하면 함수가 나중에 활성화되는지 여부에 관계없이 클로저가 발생한다는 것을 보았 습니다. 예를 들면 다음과 같습니다.

### 예제 1

```js
var a = 10;
function foo(){
  console.log(a);
};

function bar(){
  var a = 20;
  foo();
};

bar(); // "10"을 출력할 것임.
```

foo의 *LexicalEnvironment*는 생성 시 10을 값으로 갖고 있었던, "a"를 캡처합니다. 따라서 foo가 나중에(실행 단계에서) 호출되면 "a" 식별자는 20이 아닌, 10의 값으로 확인됩니다.

개념적으로 Identifier Resolution(식별자 확인) 프로세스는 다음과 같이 진행됩니다.

```
// "foo"의 env record 내부에서 "a"의 바인딩을 확인함
-- foo.[[LexicalEnvironment]].[[Record]] --> not found
// 만약 찾지 못하면, "foo"의 외부 환경을 확인함
--- global[[LexicalEnvironment]][[Record]] --> found 10
// 식별자 a의 값을 10으로 확인함
```

![](/img/posts/Javascript/2022-09-30-Lexical-Environment-The-Hidden-Part-To-Understand-Closures/1_2k4F54dvycjQwQTIFR8khA.png)

### 예제 2

```
function outer() {
  let id = 1;

  return function inner(){
    console.log(id);
  }
};

const innerFunc = outer();

innerFunc(); // 1 출력
```

`outer` 함수가 반환되면 실행 컨텍스트가 실행 스택에서 튀어나옵니다. 그러나 나중에 *innerFunc()*를 호출하면 내부 함수의 *LexicalEnvironment*가 생성될 때 외부(부모) 환경의 `id` 바인딩을 정적으로 캡처했기 때문에 여전히 올바른 값을 출력합니다.

```
// "inner"의 env record 내부에서 "id"의 바인딩을 확인함
-- inner.[[LexicalEnvironment]].[[Record]] --> not found
// 만약 찾지 못하면, "inner"의 외부 환경을 확인함
--- outer[[LexicalEnvironment]][[Record]] --> found 1
// 식별자 id의 값을 1으로 확인함
```

![](/img/posts/Javascript/2022-09-30-Lexical-Environment-The-Hidden-Part-To-Understand-Closures/1_t1b0bQBvGITKrDbNS5VG3w.png)

## 결론

* 실행 컨텍스트 스택은 **LIFO** 데이터 구조를 따릅니다.

* 코드 / 스크립트가 실행되는 하나의 전역 컨텍스트가 있습니다.

* 함수를 호출하면 새 실행 컨텍스트가 생성됩니다. 중첩된 함수 호출이 있는 경우 새 컨텍스트가 만들어지고 컨텍스트 스택의 맨 위에 놓입니다. 함수 실행이 완료되면 스택에서 튀어나오고 실행 흐름은 스택의 그 아래에 있는 컨텍스트로 돌아갑니다.

* Lexical Environment에는 두 가지 주요 구성 요소가 있습니다. **environmentRecord** 및 외부 환경에 대한 **참조**입니다.

* VariableEnvironment와 LexicalEnvironment는 모두 컨텍스트에서 생성된 내부 함수에 대한 외부 바인딩을 정적으로 캡처합니다.

* **생성 단계**에서 모든 함수는 부모 환경의 외부 바인딩을 정적으로(어휘적으로) 캡처합니다. 이렇게 하면 상위 컨텍스트가 실행 스택에서 지워지더라도 중첩된 함수가 외부 바인딩에 액세스할 수 있습니다. 이 메커니즘은 JavaScript에서 클로저의 기초가 됩니다.

# 원문

- [Lexical Environment — The hidden part to understand Closures](https://amnsingh.medium.com/lexical-environment-the-hidden-part-to-understand-closures-71d60efac0e0)
