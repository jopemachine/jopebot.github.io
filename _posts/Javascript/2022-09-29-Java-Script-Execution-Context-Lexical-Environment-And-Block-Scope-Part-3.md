---
layout: post
title: 번역 - JavaScript 실행 컨텍스트 — lexical environment와 block scope (part 3)
subtitle: 자바스크립트 세부사항 스터디
author: jopemachine
original-author: Carson
tags:
  - Javascript
  - Translation
header-img: img/header-img/javascript.png
header-mask: 0.3
last-update: October 03, 2022
---

# JavaScript 실행 컨텍스트 — lexical environment와 block scope (part 3)

JavaScript에는 ES6 업데이트 이후 세 가지 유형의 scope가 있습니다.

* Global Scope

* Function Scope

* Block Scope

실행 컨텍스트 관점에서 `scope`란 무엇입니까?

`Global scope`는 전역 실행 컨텍스트, `Function scope`는 함수 실행 컨텍스트와 관련됩니다.

![](/img/posts/Javascript/2022-09-29-Java-Script-Execution-Context-Lexical-Environment-And-Block-Scope-Part-3/1_bh07Xm-JASqBSmshdMkvdg.png)

ES6에서 도입된 `Block scope`는 두 형제와 다릅니다.

## Global scope의 예

`Block scope`를 이해하는 가장 쉬운 방법은 다른 두 scope와 비교해 보는 것입니다.

변수는 `Global scope, Function scope` 두 스코프에서 유사하게 작동하므로 이 게시물에서는 `Global scope`와 `Block scope`의 차이에 대해서만 설명합니다.

![](/img/posts/Javascript/2022-09-29-Java-Script-Execution-Context-Lexical-Environment-And-Block-Scope-Part-3/1_uCEaJre_zhDS8F4FnB3Tsw.png)

이 경우에는 하나의 `Global 실행 컨텍스트`와 하나의 `Global variable environment`만 있습니다.

두 번째 `apple` 할당문이 첫 번째 `apple` 할당문을 덮어 씁니다. 실행이 끝나면 "banana" 값이 저장된 `apple` 변수 하나만 남게 됩니다.

![](/img/posts/Javascript/2022-09-29-Java-Script-Execution-Context-Lexical-Environment-And-Block-Scope-Part-3/1_ej5LzaOsahZyrHYDculOcA.png)

Scope 관점에서 보면, `apple` 변수가 `Global scope`에 있다고 말할 수 있습니다.

## Block scope

위의 예를 `let`으로 다시 작성하여 새로운 범위인 `Block scope`를 생각해 볼 수 있습니다.

![](/img/posts/Javascript/2022-09-29-Java-Script-Execution-Context-Lexical-Environment-And-Block-Scope-Part-3/1_d7XcWhck3WD9Uots6Q2CFA.png)

콘솔은 두 개의 다른 값을 기록합니다. 첫 번째 `apple` 변수는 값 "apple"을 보유하는 반면, if문 내부에서 이 값은 "banana"입니다.

어떻게 같은 이름을 가진 두 개의 변수가 가능할까요?

## Lexical environment

2개의 프로세스를 통해 어떻게 작동하는지 알아보도록 하겠습니다.

컴파일 단계에서 `undefined`인 `apple` 변수가 `Global 실행 컨텍스트`에 추가됩니다.

![](/img/posts/Javascript/2022-09-29-Java-Script-Execution-Context-Lexical-Environment-And-Block-Scope-Part-3/1_iJi-66VGQdrbcQCEFIdURg.png)

이 순간 JavaScript 엔진은 두 가지 이유로 두 번째 `apple`을 건너뛰기로 결정합니다.

* 이 변수는 `let`으로 선언되었습니다.

* 이 변수는 `Block scope` 내에 있습니다.

다음으로 실행 단계가 시작됩니다. 첫 번째 `apple` 변수에는 "apple" 값이 할당됩니다.

![](/img/posts/Javascript/2022-09-29-Java-Script-Execution-Context-Lexical-Environment-And-Block-Scope-Part-3/1_9OmXaRzbzwKWi5D6v1wyww.png)

if문을 읽을 때 중첩 컴파일 단계가 발생합니다. `undefined`인 두 번째 `apple` 변수가 생성됩니다.

`Variable environment`에 생성하는 대신 이 `apple` 변수는 `Lexical environment`에 추가됩니다.

![](/img/posts/Javascript/2022-09-29-Java-Script-Execution-Context-Lexical-Environment-And-Block-Scope-Part-3/1_p4EJ8zmBhkC_x2oWwKU6EQ.png)

그 다음 "banana"라는 값이 `Lexical environment`에서 `apple`에 할당됩니다.

![](/img/posts/Javascript/2022-09-29-Java-Script-Execution-Context-Lexical-Environment-And-Block-Scope-Part-3/1_3TSLWLICAbtqokkyyyAvzg.png)

이제 두 환경에서 관리되는 동일한 이름을 가진 두 개의 변수가 있습니다. 이것이 JavaScript 엔진이 `let`을 처리하는 방식이며 여전히 `var`와 역 호환(backward compatible) 됩니다.

## Lexical environment에서의 Scope 스택

![](/img/posts/Javascript/2022-09-29-Java-Script-Execution-Context-Lexical-Environment-And-Block-Scope-Part-3/1_oR5T7wc5C457Ioo2WZJ3jg.png)

`let`과 `var`의 차이점을 더 잘 이해하기 위해 재미있는 예제에서 함께 결합해 보겠습니다.

컴파일 단계에서 `undefined` 상태인 `apple` 및 `grape` 변수가 `variable environment`에서 초기화됩니다. `grape` 초기화는 호이스팅 됩니다. 한편, `Lexical environment`에서는 `banana` 변수가 생성됩니다.

![](/img/posts/Javascript/2022-09-29-Java-Script-Execution-Context-Lexical-Environment-And-Block-Scope-Part-3/1_SZpz0TkyXsDVg3HUrqMMnw.jpg)

실행 단계가 시작됩니다. `apple`에는 "global apple" 값이 할당되고 `banana`에는 "global banana"가 할당됩니다.

![](/img/posts/Javascript/2022-09-29-Java-Script-Execution-Context-Lexical-Environment-And-Block-Scope-Part-3/1_Kxo8b223Kuo7x-pTfMQqYg.png)

이제 Block의 변수를 처리할 때입니다.

그런데, 여기 또 다른 `banana` 변수가 있습니다. 동일한 `Lexical environment`에 두 개의 `banana` 변수를 가질 수 있습니까?

Block scope에서 `let` 및 `const` 변수를 봤을 때 JavaScript는 해당 변수에 대해 별도의 영역을 만듭니다. `Lexical environment`는 변수에 대해 스택과 같은 구조를 유지하므로 이름이 같은 변수는 서로 충돌하지 않습니다.

![](/img/posts/Javascript/2022-09-29-Java-Script-Execution-Context-Lexical-Environment-And-Block-Scope-Part-3/1_wsbR6YbclfUbzC9Ux-RQ8w.png)

여기에서 `undefined`인 `banana` 및 `orange` 변수는 서로 간섭하지 않는(stand-along) 범위에 있습니다.

![](/img/posts/Javascript/2022-09-29-Java-Script-Execution-Context-Lexical-Environment-And-Block-Scope-Part-3/1_g5UYANZH_d4B65R7Vuq6gw.png)

그 다음 두 변수에 그에 상응하는 값이 할당됩니다.

![](/img/posts/Javascript/2022-09-29-Java-Script-Execution-Context-Lexical-Environment-And-Block-Scope-Part-3/1_exDRJdDy_Hf3eAFamEqsDA.png)

마지막 할당문을 실행하면 모든 변수가 준비됩니다.

첫 번째 변수를 콘솔에 출력할 때 JavaScript 엔진은 먼저 `Lexical environment`에서 위에서 아래로 `apple`을 찾으려고 시도합니다. 그런 다음 `Global variable environment`를 검사하고 "global apple"를 출력할 `apple`을 찾습니다.

![](/img/posts/Javascript/2022-09-29-Java-Script-Execution-Context-Lexical-Environment-And-Block-Scope-Part-3/1_v29HHb4SatdWn88Kzi0Cog.png)

`banana`를 검색할 때 JavaScript 엔진은 동일한 단계를 따라 "block banana"를 출력합니다.

![](/img/posts/Javascript/2022-09-29-Java-Script-Execution-Context-Lexical-Environment-And-Block-Scope-Part-3/1_-Pv8I5KmykzJM4Cb5_klHA.png)

이 단계에서, 현재 블록에 더 이상 실행 가능한 코드가 남아 있지 않으므로, `block scope`가 제거됩니다.

![](/img/posts/Javascript/2022-09-29-Java-Script-Execution-Context-Lexical-Environment-And-Block-Scope-Part-3/1_Ig6cz84BCl_6b5WZuRc9Hg.png)

자바스크립트가 계속 실행됩니다. `Global variable environment`에서 `banana`와 `grape`를 찾아 "global banana"와 "global grape"를 출력합니다.

![](/img/posts/Javascript/2022-09-29-Java-Script-Execution-Context-Lexical-Environment-And-Block-Scope-Part-3/1_RHoN6vrbp3HktqOmWXH5CA.png)

![](/img/posts/Javascript/2022-09-29-Java-Script-Execution-Context-Lexical-Environment-And-Block-Scope-Part-3/1_JvSA0uwBbhLXCw8W6Hs6og.png)

자바스크립트가 `orange`를 검색할 때 이 변수는 어디에도 존재하지 않습니다. `orange`가 존재했던 scope가 이미 제거되었기 때문이죠. “orange is not defined.” 라는 에러를 던질 것입니다.

![](/img/posts/Javascript/2022-09-29-Java-Script-Execution-Context-Lexical-Environment-And-Block-Scope-Part-3/1_ODunI92brU6jpQCtv5hahg.png)

전체 자바스크립트 실행이 끝났습니다.

Scope 외에 `let` 및 `const`와 관련해 뭔가 추가로 이해하신 점이 있으십니까?

## 변수 생성, 초기화, 할당에 관한 트릭

컴파일에서 실행까지 변수는 세 단계를 거칩니다.

1. 생성

2. 초기화

3. 할당

![](/img/posts/Javascript/2022-09-29-Java-Script-Execution-Context-Lexical-Environment-And-Block-Scope-Part-3/1_1HakEnjygGFe3mYW-eqfvg.png)

콘솔은 무엇을 기록합니까? `apple`인가요? 또는 `banana`입니까?

놀랍게도, `Cannot access apple before initialization.` 라는 에러를 출력합니다.

이 오류는 호이스팅과 관련이 있습니다.

* `let` 변수의 경우 생성은 호이스팅 되지만, 초기화, 할당 과정은 거치지 호이스팅 되지 않습니다.

* `var` 변수의 경우 생성, 초기화는 호이스팅 되지만 할당은 호이스팅 되지 않습니다.

* `function`의 경우, 생성, 초기화, 할당은 모두 동시에 호이스팅 됩니다.

사람들은 변수 초기화 이전의 코드 영역을 **temporal dead zone**이라고 명명했습니다.

* 변수 생성 전 이 변수에 접근하려 하면, `[variable name] is not defined.`란 에러 메세지를 보게 됩니다.

* 초기화 전 변수에 접근하려 하면, `Cannot access [variable name] before initialization.`란 에러를 보게 됩니다.

* 할당 전 변수를 출력해보면 `undefined` 값을 보게 됩니다.

Scope와 `Lexical environment`에 대해 알아야 할 모든 것을 살펴보았습니다.

## 결론

* `Lexical environment`는 실행 컨텍스트의 또 다른 구성 요소 입니다.

* `let`과 `const` 변수는 컴파일 단계 대신 실행 단계에 `block scope`에 만들어집니다.

* 이 변수들은 `Lexical environment`에 저장됩니다.

* 여러 `block scope`들은 스택 구조로 `Lexical environment`에 저장, 유지됩니다.

* 자바스크립트 엔진이 `block scope` 내의 모든 코드들을 실행시키고 나면, 관련된 `let`과 `const` 변수들은 모두 제거됩니다.

# 원문

> 해당 게시물은 원작자의 허락을 받고 번역되었습니다. 이 글의 모든 저작권은 원작자에게 있습니다.
>
> This article is a translated version of below article. All rights goes back to him.

- [Javascript execution context lexical environment and block scope part 3](https://cabulous.medium.com/javascript-execution-context-lexical-environment-and-block-scope-part-3-fc2551c92ce0)
