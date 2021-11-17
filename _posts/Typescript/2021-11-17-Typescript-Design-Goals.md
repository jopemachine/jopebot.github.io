---
layout: post
title: Typescript의 Design goals
subtitle: Typescript
author: jopemachine
tags:
  - Typescript
header-img: img/header-img/typescript.jpg
header-mask: 0.3
last-update: November 17, 2021
---

# Typescript의 Design goals

## Goals

### `Statically identify constructs that are likely to be errors.`

- 오류일 가능성이 높은 구성들은 정적으로 식별한다.

### `Provide a structuring mechanism for larger pieces of code.`

- 더 큰 코드 베이스를 위한 구조화 메커니즘을 제공한다.

### `Impose no runtime overhead on emitted programs.`

- 자바스크립트로 개발했을 때와 비교해 오버헤드가 없다.

### `Emit clean, idiomatic, recognizable JavaScript code.`

- 깔끔하고, 자연스럽고, 인식 가능한 형태의 코드로 컴파일 한다.

### `Produce a language that is composable and easy to reason about.`

- (타입스크립트 언어 자체가) 구성 가능하고 추론하기 쉬운 언어여야 한다.

### `Align with current and future ECMAScript proposals.`

- 현재, 미래의 ECMAScript proposal를 따른다.

### `Preserve runtime behavior of all JavaScript code.`

- 모든 자바스크립트 코드의 런타임 동작을 유지한다.

### `Avoid adding expression-level syntax.`

- '표현식' 수준의 구문을 추가하는 것을 피한다.

### `Use a consistent, fully erasable, structural type system.`

- 일관되고 완전히 삭제 가능한, 구조적 타입 시스템을 사용한다

### `Be a cross-platform development tool.`

- 크로스 플랫폼을 지원한다.

### `Do not cause substantial breaking changes from TypeScript 1.0`

- 타입스크립트 1.0 이후 breaking change를 일으키지 않는다.

## Non Goals

### `Exactly mimic the design of existing languages. Instead, use the behavior of JavaScript and the intentions of program authors as a guide for what makes the most sense in the language.`

- 다른 기존 언어의 디자인을 정확히 모방하는 것을 피함. 대신 자바스크립트의 동작을 사용.

### `Aggressively optimize the runtime performance of programs. Instead, emit idiomatic JavaScript code that plays well with the performance characteristics of runtime platforms.`

- 적극적으로 성능이 좋아지게 최적화하는 것을 피함. 대신 런타임 플랫폼의 특성에 어울리는 코드를 컴파일 해야함.

### `Apply a sound or "provably correct" type system. Instead, strike a balance between correctness and productivity.`

- 정확성과 생산성 사이의 균형을 맞출 수 있도록 "적절한 수준"의 타입 시스템을 구현함

### `Provide an end-to-end build pipeline. Instead, make the system extensible so that external tools can use the compiler for more complex build workflows.`

- E2E 빌드 파이프라인을 제공하는 것을 피함. 대신 외부 라이브러리들이 만들어질 수 있도록 확장 가능한 시스템을 제공해야함.

### `Add or rely on run-time type information in programs, or emit different code based on the results of the type system. Instead, encourage programming patterns that do not require run-time metadata.`

- 프로그램에 런타임 타입 정보를 추가하지 않는다. 런타임 메타데이터가 필요하지 않은 패턴을 권장.

### `Provide additional runtime functionality or libraries. Instead, use TypeScript to describe existing libraries.`

- Typescript 이외에 추가 런타임 기능이나 라이브러리를 제공하지 않는다.

### `Introduce behaviour that is likely to surprise users. Instead have due consideration for patterns adopted by other commonly-used languages.`

- 사용자를 놀라게 할 수 있는 기능을 도입하지 않는다. 다른 언어들에서도 채택하고 있는 패턴들에 대해 고려한다.

## 원문

- [TypeScript Design Goals](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Design-Goals)