---
layout: post
title: 번역 - 당신의 코드 베이스를 향상시키기 위한 5개의 TypeScript 라이브러리
subtitle: Typescript
author: jopemachine
original-author: Jose Granja
tags:
  - Typescript
header-img: img/header-img/typescript.jpg
header-mask: 0.3
last-update: October 01, 2022
---

# 번역 - 당신의 코드 베이스를 향상시키기 위한 5개의 TypeScript 라이브러리

TypeScript 언어는 지난 몇 년 동안 성장한 것 외에는 아무 것도 하지 않았습니다. 많은 웹 개발자들이 가장 좋아하는 언어로 평가되었습니다. Plain JavaScript 코드베이스에서 작업해야 하는 빈도는 점점 줄어들고 있습니다.

그러나 때로는 TypeScript는 충분히 가능한만큼 활용되지 않습니다. 너무 많은 casting이나 `any`를 사용하는 것이 가장 빈번한 실수들 중 하나입니다.

이 기사에서는 TypeScript 경험을 향상시키고 정적 타이핑에 대한 자신감을 높여주는 라이브러리 목록을 볼 것입니다. 이러한 최소한의 라이브러리들이 모든 개발자들을 인간 공학적으로 향상시켜 줄 겁니다.

## zod

TypeScript의 약한 점은 컴파일 시간에만 유효성이 검사된다는 것입니다. 한 번 파싱되고, 빌드되고 나면, 모든 타입들이 제거됩니다. 아래 상황에서 이 점은 의도치 않은 버그로 이어질 수 있습니다.

* 컴파일러가 몇 가지 가정을 통해 개발자를 신뢰하는 경우 (`any`, `ts-expect-error`, 캐스팅 등...)

* 네트워크가 예상과 다른 REST 스키마를 반환하는 경우

후자의 예제를 봅시다.

```ts
interface User {
  name: string;
  email: string;
}

async function fetchUser(id: string): User {
    const url = `/users/${id}`;
    const response = await fetch(url);
    return (await response.json()) as User;
}
```

위의 코드에서 컴파일러는 네트워크가 `name`과 `email` 속성을 가진 JSON `User` 객체를 반환할 것이라고 믿고 있습니다. 만약 이게 사실이 아닌 경우, 우린 production에서 여러 문제에 직면하게 될 것입니다. 불행하게도, 이것은 런타임에만 발견 될 수 있습니다.

`zod`를 사용하면 런타임에도 유효성이 검사되는 스키마를 정의할 수 있습니다.

`zod`를 사용하여 이전 코드를 리팩토링 해보겠습니다.

```ts
const UserSchema = z.object({
  name: z.string(),
  email: z.string(),
});

async function fetchUser(id: string) {
    const url = `/users/${id}`;
    const response = await fetch(url);
    // ✅ 만약 스키마에 매칭되지 않는다면 sentry에 로그를 남길 수 있게, 에러를 던짐.
    return UserSchema.parse(await response.json());
}
```

우리는 오류를 어떻게 처리할 지 선택할 수 있습니다. 위의 예에서 `UserSchema.parse`는 런타임에 오류를 발생시킵니다.

`safeParse` 메서드를 사용하여 오류를 발생시키지 않도록 할 수 있습니다. 사용자 경험을 방해하지 않고 센트리에 문제만 기록하는 데 이상적입니다.

`zod`는 상당히 강력하며 `z.infer`를 사용하여 스키마에서 타입을 추출할 수도 있습니다. 해당 스키마를 코드 전체에 전파할 수도 있습니다.

```ts
const UserSchema = z.object({
  name: z.string(),
  email: z.string(),
});

export type User = z.infer<typeof UserSchema>;
```

요약하면 코드 비일관성으로 이어질 수 있는 잘못된 타입들이 발생하지 않도록 만드는 강력한 라이브러리입니다.

그 외 다른 중요한 사실:

* 매우 작은 사이즈: minified + zipped 되었을 때 8kb

* 제로 디펜던시

* 불변성

* 간결하고, 연결 가능한(chainable) 인터페이스

* 함수형 접근

* Plain Javascript와도 사용 가능. 반드시 타입스크립트를 사용할 필요는 없음.

### 요구 조건

* 타입스크립트 4.1 이상

* Strict mode

### 설치

```
npm install --save-dev zod
```

## tiny invariant

때로는 코드에서 `nullable`이 아닌 것이 확실한 위치들이 있습니다. TypeScript의 strict 모드에서, null 체크를 하지 않으면 오류가 발생합니다. 이것을 우회하기 위한 네이티브 `!` 연산자가 있습니다.

아래 예제를 봅시다,

```ts
interface User {
    name?: string;
    email?: string;
}

const u: User = { name: 'Joe', email: 'joe@no-reply.com'};

// ❌ 에러: Object is possibly 'undefined'
console.log(u.name.toUpperCase());
// ✅ 컴파일 성공
console.log(u.name!.toUpperCase());
```

위의 내용은 때때로 개발자의 가정이 틀릴 수 있으므로 나쁜 습관입니다.

TypeScript에는 `Assertion Functions`라는 기본 기능이 있습니다. 그 위에 `tiny-invariant` 라이브러리가 구축됩니다. 당신은 `tiny-invariant`에 가정과, 가정이 사실이 아니었을 경우 던질 에러 메시지를 제공할 수 있습니다. 이러한 가정이 충족되지 않을 때마다 런타임에 예외가 발생합니다. 던져진 에러는 나중에 Sentry나 다른 provider에서 잡을 수 있습니다. 그러면 코드베이스에 대한 신뢰도가 높아지고 비일관성을 감지할 수 있게 됩니다.

아래 예제를 봅시다,

```ts
import invariant from 'tiny-invariant';

interface User {
    name?: string;
    email?: string;
}

const u: User = { name: 'Joe', email: 'joe@no-reply.com'};

invariant(u.name, 'Name should not be null for this scenario')
// ✅ `!` 연산자 없이 컴파일 성공
console.log(u.name.toUpperCase());
```

코드베이스는 더 실패에 유연하고(resilient)이고 간결해집니다. 이제 많은 불필요한 if 문들을 안전하게 지울 수 있습니다.

이 패키지는 minimal하기 때문에, 원하는 경우 고유한 invariant 기능을 구현할 수 있습니다.

### 요구 조건

- Strict mode (그렇지 않으면 의미가 없음)

### 설치

```
npm install --save-dev tiny-invariant
```

## type-fest

TypeScript의 가장 강력한 기능 중 하나는 `mapped-type`입니다. 자세히 알아보려면, [여기](https://betterprogramming.pub/mastering-typescripts-mapped-types-5fa5700385eb) 기사를 살펴보세요.

TypeScript는 일부 유틸리티와 함께 ​​제공되지만 이것은 제한적이며, 시작점일 뿐입니다. 결과적으로 아마도 당신은 코드베이스에 유틸리티 모음이 있을 것 입니다. 아마도 프로젝트 별로 관리할 수 있는 utils.d.ts에 있을 것입니다. 물론 이건 완전히 괜찮습니다, 다만 여기 이 문제를 해결할 수 있는 다른 방법이 있습니다.

사용할 수 있는 타입 라이브러리 유틸리티가 많이 있습니다. 일부는 이제 `ts-toolbet`처럼 죽었습니다. 새로운 매핑을 작성하는 데 낭비되는 시간을 줄이는 battle-test를 거친 타입들을 제공합니다. npm 트렌드를 살펴보면 `type-fest`가 시장을 어떻게 지배하고 있는지 알 수 있습니다.

![](/img/posts/Typescript/2022-10-01-5-Type-Script/1_tABIwNix_hF0qWSa-pJP5Q.png)

예를 들어 보겠습니다. TypeScript에 내장된 Optional 유틸리티는 상당히 제한적입니다. 이것은 모든 속성들을 optional로 단순히 표시할 수 있게 해 줍니다. 세분화가 부족합니다.

해당 사용 사례와 관련하여 type-fest가 어떤 기능을 제공하는지 살펴보겠습니다.

```ts
import {SetOptional, OptionalKeysOf } from 'type-fest';

interface User {
    name: string;
    email: string;
}

// Native Utility: 모든 key들이 partial로 마킹 됨.
type PartialUser = Partial<User>;
// Result:
// {
//   name?: string
//   email?: string;
// }

// 💪 선택된 key들만 optional
type PartialUserEmail = SetOptional<User, 'email'>;
// Result:
// {
//   name: string
//   email?: string | undefined;
// }

// 💪 타입에서 optional key들만 추출하기
type PartialKeys = OptionalKeysOf<PartialUserEmail>;
// Result:
// email
```

우리는 위처럼 하기 위해 얼마나 강력하고, 적은 코드가 필요한지 알 수 있습니다. 모든 유형이 컴파일 시간에 제거되므로 번들 크기가 증가하지 않습니다.

이러한 모든 유형의 라이브러리 유틸리티에는 몇 가지 요구 사항과 제한 사항이 있습니다. 따라서 최신 TypeScript 버전으로 강제 업데이트하거나 코드를 엄격 모드로 설정해야 할 수 있습니다.

### 요구 조건

* TypeScript 버전 4.7 이상

* Strict mode

### 설치

```
npm install --save-dev type-fest
```

## ts-morph

코드에 대한 정적 분석을 수행하는 것이 유용한 다양한 시나리오가 있습니다. 이를 위해 `jscodeshift` 또는 `babel`을 사용할 수 있습니다. 그러나 타이핑에 대해 더 많은 통찰력을 갖는 것이 유용할 수 있습니다.

이런 목적을 위해, 당신은 가파른 학습 곡선을 지닌 타입스크립트 컴파일러를 사용해야 합니다. 다행히도, `ts-morph` 프로젝트가 오래 전 시작되었습니다. 프로그래밍 방식으로 TypeScript 코드를 탐색하고 조작하는 더 쉬운 방법을 제공합니다.

어떻게 이걸 달성할 수 있었을까요?

* 컴파일러 API를 몇몇 Wrapper로 감싸 제공합니다.

* 컴파일러 API에 fallback을 허용합니다.

* 모든 변경은 메모리에서 우선 수행하고, 지시되었을 때만 코드를 emit 합니다.

Enum을 확인하고 존재하는 경우에만 변경하는 간단한 예를 확인해봅시다.

설치는 꽤 간단합니다

```
npm install --save-dev ts-morph
```

`example.ts` 파일을 만들어 코드를 실행할 수 있습니다.

```ts
import { Project } from 'ts-morph';

const project = new Project();

const OLD_FUNCTION_NAME = 'addingNumbers';
const NEW_FUNCTION_NAME = 'sum'

// ✅ 변경 범위를 지정합니다.
project.addSourceFilesAtPaths('src/**/*.ts');

project.getSourceFiles().forEach((sourceFile) => {
  // ✅ 검사할 타겟들을 가져옵니다.
  const functions = sourceFile.getFunctions();

  // ✅ 원하는 타겟들을 필터링합니다.
  functions.forEach((item) => {
    if (item.getName() === OLD_FUNCTION_NAME) {
      // ✅ 새로운 함수 이름으로 변경합니다.
      item.rename(NEW_FUNCTION_NAME);
    }
  });

  // ✅ 새 파일로 emit 합니다.
  sourceFile.save();
});
```

그런 다음 실행하기만 하면 됩니다.

```
npx ts-node example.ts
```

## Type-docs

문서화 프로세스는 API를 구축할 때 핵심적인 측면입니다. 다른 개발자가 귀하의 애플리케이션이 무엇을 노출하는지 빠르게 파악하는 데 도움이 됩니다. 일반적으로 각 언어에는 자체 문서 작성 프로세스가 있습니다.

TypeScript에는 도구가 내장되어 있지 않기 때문에 TypeDoc이 탄생했습니다. 코드 주석을 사용해 HTML 또는 JSON으로 문서를 작성합니다. Type-docs는 확장 가능하며 다양한 설정을 지원합니다.

Type-docs는 [https://typedoc.org](https://typedoc.org)에서 찾을 수 있는 편리한 문서와 함께 제공됩니다.

도구를 마스터하는 방법을 배우기 위해 따라야 할 쉬운 예가 있습니다.

메서드에 주석을 추가하는 방법의 예를 살펴보겠습니다.

```ts
/**
 * Calculates the square root of a number.
 *
 * @param x the number to calculate the root of.
 * @returns the square root if `x` is non-negative or `NaN` if `x` is negative.
 */
export function sqrt(x: number): number {
    return Math.sqrt(x);
}
```

아래는 결과입니다.

![](/img/posts/Typescript/2022-10-01-5-Type-Script/1_Zwq7lpOJsOOuCNf3p-pBMA.png)

기본적으로 많은 것을 얻을 수 있습니다.

* 깨끗한 인터페이스

* breadcrumbs

* 사이드 네비게이션 바

* 취향에 따라 쉽게 커스터마이징 가능한 CSS

설치하려면,

```
npm install typedoc --save-dev
```

문서를 생성하려면 `tsconfig.json` 설정 파일에 대해 알아야 합니다. 해당 경로는 프로그램을 실행할 때 지정된 entry-point를 기준으로 계산될 것입니다.

```
typedoc src/index.ts
```

여러 entry-point들을 정의할 수도 있습니다.

```
typedoc src/package1/index.ts src/package2/index.ts
```

파일을 전달하는 대신 폴더를 전달할 수 있으며 TypeDoc은 `index` 파일을 찾는 `entryPointStrategy`를 사용합니다.

이 전략은 작업 공간에 대한 문서를 쉽게 생성할 수 있게 해 줍니다.

```
// ✅ typedoc은 package 각 폴더 내부 index.ts 파일을 체크할 것입니다.
typedoc --entryPointStrategy packages .
```

## 결론

다섯 가지 TypeScript 라이브러리들은 모두 프로젝트를 인체 공학적으로 향상시킬 수 있는 후보입니다. 앞서 언급했듯이 이 들 중 일부는 쉽게 구현할 수 있습니다. 그것은 모두 당신의 개발 능력과 우선 순위에 달려 있습니다.

# 원문

- [5 Typescript libraries to improve your codebase](https://betterprogramming.pub/5-typescript-libraries-to-improve-your-codebase-d26f74a5c3)
