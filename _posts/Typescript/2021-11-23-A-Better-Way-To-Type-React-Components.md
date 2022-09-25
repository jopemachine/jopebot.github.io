---
layout: post
title: React.FC를 기피해야 하는 이유
subtitle: Typescript
author: jopemachine
tags:
  - Frontend
  - React
  - Typescript
  - Translation
header-img: img/header-img/typescript.jpg
header-mask: 0.3
last-update: September 25, 2022
---

# React.FC를 기피해야 하는 이유

```ts
type MyComponentProps = { title: string };
// 👍 Like this..
function MyComponentFC(props: MyComponentProps) {}
// 👎 ...not like this
const MyComponent: React.FC<MyComponentProps> = (props) => {};
```

- 함수 표현식은 좋지만, top-level에선 함수 선언 (function declaration)을 선호한다.

- `React.FC`를 사용하면 함수의 리턴 타입을 명시하지 못하고 annotate 해야 한다.

- `React.FC`를 쓰면 아래처럼 컴포넌트의 선언과 `export`가 따로 놀게 된다. 타입스크립트 문법 상 `MyComponent`를 바로 `default`로 `export` 할 수가 없다.

```ts
const MyComponent: React.FC<{}> = () => {
  // Potentially lots of content here...
  // ...
};
export default MyComponent;
```

- 그러지 말고 아래처럼 쓰는 게 깔끔하다.

```ts
// Clearer that MyComponent is the main API.
export default function MyComponent() {}
```

- 또한 `React.FC`은 제네릭과 같이 쓸 수 없다.

```ts
type MyDropDownProps<T> = {
 items: T[];
 itemToString(item: T): string;
 onSelected(item: T): void;
};

// 아래 예제들은 모두 틀림.
const MyDropDown: React.FC<MyDropDownProps> = (props) => {};
const MyDropDown: React.FC<MyDropDownProps<T>> = <T>(props) => {};
const MyDropDown: React.FC<MyDropDownProps<T>> = (props) => {};
const MyDropDown<T>: React.FC<MyDropDownProps<T>> = (props) => {};
// React.FC를 쓸 때 제네릭을 직접적으로 쓰는 방법은 없다
```

- `React.FC`는 `props`에 `children`을 자동으로 추가해준다. 즉 아래와 같은 코드를 쓸 수 있다.

```ts
type MyComponentProps = { className: string };

// MyComponentProps에 children의 타입이 명시되어 있지 않지만 예상대로 작동한다.
const MyComponent: React.FC<MyComponentProps> = function ({
  className,
  children,
}) {
  // children is typed
  return <div className={className}>{children}</div>;
};
```

- 위와 같은 코드는 편리해보이지만, 사실 오히려 불편하다.

```tsx
type MyComponentProps = { title: string };
const MyComponent: React.FC<MyComponentProps> = function ({ title }) {
  // children 타입 정의가 없어 타입스크립트에서 경고 (complain)
  return <div>{title}</div>;
};

// 타입스크립트는 아래처럼 사용하는 것을 허용.
// 하지만 children 타입을 명시하지 않는 걸 허용하는 건 오히려 좋지 않다.
const myValue = <MyComponent title="Hello">My children</MyComponent>;

// 아래처럼 에러를 일으켜야 한다.
function MyComponentCorrect({ title }: MyComponentProps) {
  return <div>{title}</div>;
}
const myValueCorrect = (
  <MyComponentCorrect title="Hello">My children</MyComponentCorrect>
);
// Error:
// Type '{ children: string; title: string; }' is not assignable to type 'IntrinsicAttributes & MyComponentProps'.
//   Property 'children' does not exist on type 'IntrinsicAttributes & MyComponentProps'.
```

- 아래와 같은 코드가 더 명시적이고, 바람직하다.

```ts
// 직접 children의 타입을 명시해 에러를 해결.
type MyComponentProps = {
  title: string;
  // ReactNode is all allowed children types including arrays, fragments, scalar values, etc.
  children: React.ReactNode;
};
function MyComponentCorrect({ title, children }: MyComponentProps) {}
```

- 코드의 구조를 우선순위화 하기에도 함수 선언식이 유용하다.

- 함수형 컴포넌트에 화살표 함수 (`FooItem`)를 사용하면 아래처럼 Reference 에러를 만나게 된다.

```ts
const BoundFooItem = partial(FooItem, { title: "Foo" });
// OOOPS: ReferenceError: Cannot access 'FooItem' before initialisation
export default function Foo() {}
export const FooItem = () => {};
```

- 대신 함수 선언식을 사용하면, 호이스팅으로 인해 예상대로 작동한다.

- 호이스팅을 통해 더 중요한 content를 위에 올려 쓸 수 있다.

```ts
// 1. Setup variables. Works as expected
const BoundFooItem = partial(FooItem, { title: "Foo" });
// 2. Main export
export default function Foo() {}
// 3. Additional exports. Often children types that can be semantically grouped with main export.
// (Many prefer not to mix default with named exports, but a discussion for another time).
export function FooItem() {}
// 4. Helper components
function MyInternalComponent() {}
// 5. Utils
function add() {}
function partial() {}
function identity() {}
```

## 원문

- [A Better Way to Type React Components](https://blog.variant.no/a-better-way-to-type-react-components-9a6460a1d4b7)