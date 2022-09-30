---
layout: post
title: 번역 - JavaScript 실행 컨텍스트 — 컴파일부터 실행까지 (part 1)
subtitle: 자바스크립트 세부사항 스터디
author: jopemachine
original-author: Carson
tags:
  - Javascript
  - Translation
header-img: img/header-img/javascript.png
header-mask: 0.3
last-update: September 30, 2022
---

# JavaScript 실행 컨텍스트 — 컴파일부터 실행까지 (part 1)

많은 사람들에게 JavaScript는 미스터리입니다. JavaScript만의 독특한 특징이 있습니다.

아래의 용어를 들어본 적이 있을 것입니다.

* 호이스팅

* 스코프, 스코프 체인

* 클로저

* this

위 항목 모두 JavaScript에서 고유한 `이상한` 동작을 가지고 있습니다.

위 개념들을 이해하기 위한 핵심 키는 **실행 컨텍스트** 입니다. 이 게시물이 MDN의 정확하지만 모호한 정의를 카피하는 게 아니라 Javascript를 이해하기 위한 다른 관점을 제공해 줄 수 있기를 바랍니다.

오해하지 마세요. 이 개념의 정의들은 유용합니다. 저는 MDN의 정의들을 읽어보았습니다. 그러나 뭔가를 암기하는 것 보다 이해하는 게 훨씬 중요한 일이라고 생각합니다.

이 시리즈의 포스팅을 읽고 나면 아마도 이 모든 용어에 대한 정의가 더 잘 이해될 것입니다.

따라서 이 정보는 당신의 지식이 될 것 입니다.

## 두 단계: 컴파일과 실행

JavaScript 코드들이 실행될 때 컴파일과 실행이라는 두 단계에 대해 이야기 해 봅시다.

두 단계는 간단해 보이지만, 이 두 단계에 모든 미스테리들이 숨어 있습니다.

JavaScript 코드가 컴파일 되면서 어떤 일이 일어날까요? 실행 문맥 (Execution context)이 생성됩니다. 실행 문맥이 준비가 되었을 때, 실행이 시작됩니다. 모든 실행 가능한 자바스크립트 코드들이 라인 별로 실행되게 됩니다.

![](/img/posts/Javascript/2022-09-25-Java-Script-Execution-Context-From-Compiling-To-Execution-Part-1/1_lmo_CUqm66ZBNUiBSuPojQ.png)

실행 문맥은 아래의 몇 가지 항목들로 구성됩니다. 더 잘 이해하기 위해, 우리는 아래의 4가지 컴포넌트들에 초점을 맞추겠습니다.

* Variable environment

* Lexical environment

* Outer

* this

![](/img/posts/Javascript/2022-09-25-Java-Script-Execution-Context-From-Compiling-To-Execution-Part-1/1_oA9k4-1GL1prFuX1x1BjGA.png)

이 게시물에서 `Variable environment`은 핵심 사항입니다. 다른 구성 요소들은 잠깐 무시하겠습니다.

![](/img/posts/Javascript/2022-09-25-Java-Script-Execution-Context-From-Compiling-To-Execution-Part-1/1_ykOEGGPyhQo60EqgYbAsOQ.png)

실행 단계에서 브라우저는 JavaScript를 한 줄씩 실행합니다. 한편, 실행 컨텍스트는 라인 실행이 완료될 때마다 업데이트됩니다.

![](/img/posts/Javascript/2022-09-25-Java-Script-Execution-Context-From-Compiling-To-Execution-Part-1/1_RdzflfL5Jen687wfFdVqxQ.png)

## Variables와 variable environment

간단한 예제로 시작해봅시다.

![](/img/posts/Javascript/2022-09-25-Java-Script-Execution-Context-From-Compiling-To-Execution-Part-1/1_gpm72z1pO8pKZrv3mVwmOw.png)

이 JavaScript 조각이 실행되면 가장 먼저 밟게 되는 단계는 컴파일입니다. 이 단계에서 실행 컨텍스트가 생성됩니다.

![](/img/posts/Javascript/2022-09-25-Java-Script-Execution-Context-From-Compiling-To-Execution-Part-1/1_vDLs88kO4kUJtnY41jxbbg.png)

한편, 변수 `apple`은 `undefined`로 선언되어 `variable environment`에 저장됩니다.

![](/img/posts/Javascript/2022-09-25-Java-Script-Execution-Context-From-Compiling-To-Execution-Part-1/1_t0juECUwKdr6MYER9UezUw.png)

컴파일 단계가 종료되고 실행 단계가 시작됩니다.

첫 번째 라인이 실행되면 `apple` 변수에 숫자 10이 할당됩니다. 동시에 `variable environment`가 업데이트됩니다.

![](/img/posts/Javascript/2022-09-25-Java-Script-Execution-Context-From-Compiling-To-Execution-Part-1/1_HgvAv6kOpjFGadAVjxrdQg.png)

그런 다음 두 번째 줄이 실행됩니다. 콘솔은 `variable environment`에서 `apple` 변수를 검색합니다. 콘솔은 `10`을 기록합니다.

전체 프로세스가 종료됩니다. 전체 실행 컨텍스트가 제거됩니다. 이 예제에서 배울 수 있는 내용은 아래와 같습니다.

* 변수 할당은 실제로 두 단계로 분리되어 일어납니다.

* 변수 선언은 컴파일 단계에서 처리됩니다.

* 실행 단계는 변수의 할당과 나머지 코드들을 실행합니다.

## Hoisting, `variable environment`에서의 트릭

![](/img/posts/Javascript/2022-09-25-Java-Script-Execution-Context-From-Compiling-To-Execution-Part-1/1_8mQsDri7a9z2tSkJSZf9Bw.png)

이 코드는 이전 코드와 약간 다릅니다. `apple` 변수를 선언하기 전에 사용합니다.

우린 이 코드가 `undefined`를 기록할 것을 알고 있지만, 실행 컨텍스트 관점에서 한 단계씩 살펴보도록 하겠습니다.

컴파일 단계에서 1행은 변수 선언과 관련이 없기 때문에 건너뜁니다. 그런 다음 2행의 `apple`이 `variable environment`에 생성됩니다. 컴파일이 종료됩니다.

![](/img/posts/Javascript/2022-09-25-Java-Script-Execution-Context-From-Compiling-To-Execution-Part-1/1_t0juECUwKdr6MYER9UezUw.png)

첫 번째 줄에서 콘솔은 `variable environment`에서 `apple` 변수를 찾기 시작합니다. 이 순간 `apple`은 정의되지 않은 값을 가지고 있습니다. 콘솔 로그는 `undefined`를 출력합니다.

![](/img/posts/Javascript/2022-09-25-Java-Script-Execution-Context-From-Compiling-To-Execution-Part-1/1_p-AuLwbTMutHdodSF5r4Bg.png)

그런 다음 두 번째 줄이 실행되고 `apple` 변수가 값 `10`으로 업데이트됩니다. 전체 프로세스가 종료됩니다.

![](/img/posts/Javascript/2022-09-25-Java-Script-Execution-Context-From-Compiling-To-Execution-Part-1/1_IPXAOAktmEjcR8XcGREw-Q.png)

변수 `apple`이 맨 위로 들어 올려지는 것처럼 느껴지기 때문에 이 과정을 `Hoisting`이라고 합니다. 다음 코드는 `Hoisting` 효과를 시뮬레이션합니다.

![](/img/posts/Javascript/2022-09-25-Java-Script-Execution-Context-From-Compiling-To-Execution-Part-1/1_fUPnm3loVQrBuA_d279Tqg.png)

그러나 실행 컨텍스트의 관점에서는 호이스팅이 없습니다. 아무것도 따로 호이스팅 (계양) 되지 않습니다. 변수가 컴파일 단계에서 선언되었기 때문에 이런 일이 발생합니다. `Hoisting`에서의 네이밍은 변수 선언 단계의 결과를 기반으로 합니다.

## Hoisting과 함수

함수의 경우 선언할 때 두 가지 옵션이 있기 때문에 약간 다릅니다.

![](/img/posts/Javascript/2022-09-25-Java-Script-Execution-Context-From-Compiling-To-Execution-Part-1/1_K1kYfCYBTS-YrnMxyKqXoQ.png)

`showName` 함수를 선언할 때 할당이 발생합니다.

그와 달리, `showNumber` 함수는 할당이 없는 선언입니다.

흥미롭게도 콘솔 로그 `Hey, show number` 다음에 `showName is not a function` 오류 메시지가 표시됩니다.

두 단계를 검토하고 무슨 일이 일어났는지 살펴보겠습니다.

컴파일 단계에서 `showNumber`는 선언이므로 **실제로** 이 순간에 저장됩니다.

![](/img/posts/Javascript/2022-09-25-Java-Script-Execution-Context-From-Compiling-To-Execution-Part-1/1_wCzmwwMs_y2ClthGdFJSZw.png)

`showName` 함수의 경우 할당이기 때문에 `undefined`로 할당됩니다.

![](/img/posts/Javascript/2022-09-25-Java-Script-Execution-Context-From-Compiling-To-Execution-Part-1/1_7JeKg9AbdfVFQ0gi7-TuaQ.png)

`showName` 함수는 실행 단계까지 할당되지 않습니다.

![](/img/posts/Javascript/2022-09-25-Java-Script-Execution-Context-From-Compiling-To-Execution-Part-1/1_Y52Uvu2CQfXH7UkAM0lX4Q.png)

![](/img/posts/Javascript/2022-09-25-Java-Script-Execution-Context-From-Compiling-To-Execution-Part-1/1_LtPBQZILO0SUYMVsrJRCaA.png)

![](/img/posts/Javascript/2022-09-25-Java-Script-Execution-Context-From-Compiling-To-Execution-Part-1/1_eokIGJW2GVNccQNZK8OpqA.png)

2행에서 실행하는 대신 `showName` 값을 기록하면 콘솔은 `undefined`를 기록합니다.

`undefined`는 함수가 아니므로 `showName is not a function`라는 오류 메시지가 표시됩니다.

언급할 가치가 있는 또 다른 사항은 함수 블록 부분이 위 그래픽에서 엄밀하게는 정확하지 않다는 것입니다.

함수 블록은 `variable environment`가 아닌 `Heap`이라는 곳에 저장됩니다.

![](/img/posts/Javascript/2022-09-25-Java-Script-Execution-Context-From-Compiling-To-Execution-Part-1/1_XhE7rIP6CzQiDpwJumX3ew.png)

함수를 호출할 때 브라우저는 `variable environment` 대신 `HEAP`에서 함수 본문을 찾습니다.

단순하게 하기 위해 함수들을 이 게시글에선 `HEAP`과 별도로 표시했습니다.

## 컴파일 트릭을 이해하기 위한 두 가지 특이한 예제

첫 번째 경우는 *이름 충돌*입니다.

우리는 동일한 변수 이름을 사용하는 경우, 후자가 전자의 변수 이름을 덮어쓴다는 것을 알고 있습니다.

콘솔이 무엇을 기록할까요?

![](/img/posts/Javascript/2022-09-25-Java-Script-Execution-Context-From-Compiling-To-Execution-Part-1/1_VAWq9aF9B6OjPVe6iLI9xw.png)

콘솔은 `I'm declaration`이라는 메시지를 기록하지만 변수는 나중에 선언됩니다. 두 번째 `showNumber` 변수는 첫 번째 변수(함수)를 덮어쓰지 않습니다.

함수와 변수의 이름이 같으면 컴파일 단계에서 변수 선언이 무시됩니다. 즉, 함수가 더 높은 우선 순위를 가집니다.

이는 쉽게 간과되기 쉬운 함정이므로 함수와 동일한 변수 이름을 사용하는 것을 피해야 합니다.

또 다른 예제를 봅시다.

![](/img/posts/Javascript/2022-09-25-Java-Script-Execution-Context-From-Compiling-To-Execution-Part-1/1_b7y49IeVBOhcGMfAnsqV4A.png)

여기서 `if` 문의 조건은 negative 값인 `0`입니다. `if` 문의 코드는 실행되지 않습니다.

코드를 실행하면 콘솔은 `apple is not defined` 오류 메시지 대신 `undefined`를 기록합니다.

이 경우 `apple` 변수는 컴파일 단계에서 `variable environment`에 여전히 선언됩니다.

`if` 조건문은 컴파일 단계가 아닌 실행 단계에 적용됩니다.

## 핵심 정리

* JavaScript를 실행하려면 컴파일과 실행이라는 두 단계가 필요합니다.

* 컴파일 단계에서 실행 컨텍스트가 생성되며 `variable environment` 및 기타 구성 요소로 구성됩니다.

* 변수는 컴파일 단계에서 선언되고 실행 단계에서 할당됩니다.

# 원문

- [Javascript execution context part 1 from compiling to execution](https://cabulous.medium.com/javascript-execution-context-part-1-from-compiling-to-execution-84c11c0660f5)
