---
layout: post
title: "Typescript utility types "
subtitle: "프론트 면접 질문 정리"
author: jopemachine
tags: 
 - Frontend
 - Typescript
header-img: "img/header-img/frontend.jpg"
header-mask: 0.3
---

# Typescript utility types

- 타입스크립트는 타입 변환에 자주 사용되는 유틸리티 타입들을 global로 제공함.

## Partial

- 모든 프로퍼티 Optional로 만든다.

```typescript
interface Todo {
  title: string;
  description: string;
}

let fieldsToUpdate: Partial<Todo>
// fieldsToUpdate는 아래 타입과 같다.

// interface Todo {
//   title?: string;
//   description?: string;
// }
```

## Required

- 모든 프로퍼티 Required로 만든다

```typescript
interface Props {
  a?: number;
  b?: string;
}
 
let props: Required<Props>
// props는 아래 타입과 같다.

// interface Props {
//   a: number;
//   b: string;
// }
```

## Readonly

- 모든 프로퍼티를 Readonly로 만든다.

```typescript
interface Todo {
  title: string;
}

const todo: Readonly<Todo> = {
  title: 'some_title'
};

// todo는 아래 타입과 같다.

// interface Todo {
//   readonly title: string;
// }
```

## Record

- Object 타입의 대체.

```typescript
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};
```

## Pick

- Record 타입에서 원하는 키를 골라 타입을 만듬

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPreview = Pick<Todo, "title" | "completed">;

// TodoPreview는 아래 타입과 같다.

// interface Todo {
//   title: string;
//   completed: boolean;
// }
```

## Omit

- Record 타입에서 원하는 키를 제거해 타입을 만듬

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPreview = Omit<Todo, "description">;

// TodoPreview는 아래 타입과 같다.

// interface Todo {
//   title: string;
//   completed: boolean;
// }
```

## Exclude

- 앞 타입의 키들에서 뒷 타입의 키들을 뺌.

```typescript
type T0 = Exclude<"a" | "b" | "c", "a">;

// T0는 "b" | "c"
```

## Extract

- 앞 타입의 키들에서 뒷 타입의 키들을 추출.

```typescript
type T0 = Extract<"a" | "b" | "c", "a" | "f">;

// T0는 "a"
```

## NonNullable

- 타입에서 Nullable 타입을 제거.

```typescript
type T0 = NonNullable<string[] | null | undefined>;

// T0는 string[]
```

## Parameters

- 함수 타입에서 parameter 타입을 추출함

```typescript
type T0 = Parameters<(s: string) => void>;

// T0는 [s: string]
```

## ConstructorParameters

- 생성자의 parameter 타입을 추출함

```typescript
type T0 = ConstructorParameters<ErrorConstructor>;

// T0는 [message?: string]
```

## ReturnType

- 함수의 리턴 타입을 추출함

```typescript
type T0 = ReturnType<() => string>;

// T0는 string 타입.
```

## InstanceType

- 클래스의 인스턴스의 타입을 추출

```typescript
class C {
  x = 0;
  y = 0;
}
 
type T0 = InstanceType<typeof C>;

// T0는 C 타입.
```

## ThisParameterType

- 해당 함수의 this의 타입을 추출

```typescript
function toHex(this: Number) {
  return this.toString(16);
}
 
function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}

// n은 toHex this의 타입. 즉, Number이므로
// numberToString(3)는 되고 numberToString("3")은 안 됨.
```

## OmitThisParameter

- this가 함수의 인자로 쓰였을 때 인자를 생략해 없애줌.

```typescript

// 1
function toHex(this: Number) {
  return this.toString(16);
}
 
const fiveToHex = toHex.bind(5);

// fiveToHex는 Number를 인자로 받으므로 컴파일 에러
console.log(fiveToHex());
```

```typescript
// 2
function toHex(this: Number) {
  return this.toString(16);
}
 
const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);

// fiveToHex는 this가 생략되었으니 에러가 나지 않음!
console.log(fiveToHex());
```

## ThisType

## String manipulation types

### Uppercase

### Lowercase

### Capitalize

### Uncapitalize

## Related

- [utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html)