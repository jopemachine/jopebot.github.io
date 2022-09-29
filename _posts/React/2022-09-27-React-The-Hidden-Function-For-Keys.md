---
layout: post
title: 번역 - React — The hidden function for keys
subtitle: React 세부사항
author: jopemachine
original-author: Bruno Noriller
tags:
  - React
  - Frontend
  - Translation
header-img: img/header-img/react.png
header-mask: 0.3
last-update: September 29, 2022
---

# 번역 - React — The hidden function for keys

![](/img/posts/React/2022-09-27-React-The-Hidden-Function-For-Keys/1_Y9wZFcxL-JEYxZhLYTPksA.jpg)

React가 당신에게 화를 내지 않도록, 리스트들에 `key`를 전달해줘야 한다는 사실을 알고 있나요?

당신은 생각할 것입니다: 왜 모든 `key`를 무작위로 만들어서 사용하면 안 되는거지?

## Keys!

대부분의 튜토리얼들에선 리스트를 매핑하는 맥락에서만 `key`를 언급합니다. 결국 당신은 그 외엔 `key`에 기능이 없다고 생각할 수 있습니다.

아마 당신이 저 같은 사람이라면, 당신은 아마 리스트들에 `key`를 추가하는 것을 가끔 깜빡해, 경고 메세지를 보고 `key`를 추가할 것입니다.

그러나 어떤 사람들은 아예 다른 방향으로 생각해, 모든 곳에 `key`를 사용하기 시작합니다. 가끔은 `Math.random()`이나, `new Date().getTime()` 같은 함수를 사용하기도 합니다.

당신은 아마 "좀 이상하지만 괜찮군.." 이렇게 생각할 수도 있습니다. 아뇨! 이것은 괜찮지 않으며, 당신은 결국 디버깅 불가능한 버그를 마주치게 될 수 있습니다. (당신이 직접 React 코드를 파헤치고 디버깅 해 보지 않는 한)

## keys에 대해 알아야 하는 것들

당신은 서로 다른 레벨에 있는 **동일한** `key` 값들을 줄 수 있습니다. (심지어 동일한 컴포넌트 내에서도요.)

```js
function ThisIsOk(){
  return (
    <div key="this is ok!">
      <AnyComponent key="this is ok!" />
      <div> {/* here wouldn't be ok */}
        <AnotherComponent key="this is ok!" />
      </div>
    </div>
  )
}
```

이것은 음.. 트리 때문에 발생하는 문제입니다!

React가 컴포넌트들을 렌더링하는 방식을 살펴 보면, 기본적으로 하나의 큰 컴포넌트들의 트리를 렌더링 하는 것임을 알 수 있습니다. (이게 당신이 Wrapper 없이 여러 컴포넌트를 리턴하는 컴포넌트를 사용할 수 없는 이유입니다.)

React는 모든 컴포넌트들을 뽑아서, 리스트를 만듭니다. 당신이 컴포넌트에 `key`를 넣을 때, 아래의 몇 가지 일이 발생할 것입니다.

* React는 *컴포넌트에 key를 필요로 하지 없습니다.* (또는 내부적으로 React가 수행하는 모든 작업들에)

* React는 `key`를 가진 모든 컴포넌트를 동일한 컴포넌트로 취급합니다!

* React가 `key`를 다시 찾지 못한 컴포넌트들은 쉽게 제거해 낼 것입니다.

## 예제

여기에 작은 샌드박스가 있습니다. 가능하면 `input`들을 사용해 보십시오.

[https://codesandbox.io/s/keys-example-ll5rxg?file=/src/App.js](https://codesandbox.io/s/keys-example-ll5rxg?file=/src/App.js)

여기서 일어나는 일은 컴포넌트가 다시 렌더링 되어야 할 때마다 다른 `key`를 찾기 때문에 무작위로 컴포넌트가 파괴된다는 것입니다. 이것은 직접적으로 일어날 수도, 간접적으로 일어날 수도 있습니다.

그 다음, 당신은 `key`가 없거나, 정적인(static) `key`를 보게 됩니다. 이것들도 서로 다른 레벨의 같은 `key` 입니다.

마지막으로 이상한 점: 동일한 `key`를 가진 두 개의 컴포넌트가 교대로 렌더링되고 있습니다. 같은 `key`를 가진 두 컴포넌트가 같은 위치에 있기 때문에 기본적으로 동일한 컴포넌트이고 두 컴포넌트의 상태가 지속된다고 할 수 있습니다!

## 이게 무엇을 의미하는거죠?

아마도 당신은 무슨 일이 있어도 컴포넌트를 리셋할 수 없는 버그를 마주쳐 본 적이 있을 것입니다. 그래서 당신은 상태를 리셋하기 위해 몇몇 디펜던시와 함께, `useEffect`를 사용하기 시작했습니다. 글쎄요.. 당신만 그런 것은 아닙니다!

하지만 이제.. 당신은 상태를 리셋하기 위해 다른 `key`를 전달하기만 하면 된다는 점을 알고 있습니다! 더 이상 `useEffect`가 필요하지 않죠!

또한 당신은 동일한 위치에서 동일한 컴포넌트를 렌더링 할 수 있고, 그것이 이전 상태를 유지한다는 점을 알고 있습니다. 비록 이것을 어디에 활용해야 할 지는 잘 모르겠지만요.

Cover Photo by [Samantha Lam](https://unsplash.com/@contradirony?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/keys?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

# 원문

- [React — The hidden function for keys](https://medium.com/@noriller/react-the-hidden-function-for-keys-7c78c01773e6)
