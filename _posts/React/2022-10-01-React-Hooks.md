---
layout: post
title: 번역 - React Hooks, 아마도 아무도 말해주지 않았을 위험들
subtitle: 자바스크립트 세부사항 스터디
author: jopemachine
original-author: Adnan Sahinovic
tags:
  - React
  - Javascript
  - Translation
header-img: img/header-img/react.png
header-mask: 0.3
last-update: October 01, 2022
---

# 번역 - React Hooks: 아마도 아무도 말해주지 않았을 위험들

> hook와 함께 React에 도입된 위험을 피하는 방법을 알아봅니다.

![](/img/posts/React/2022-10-01-React-Hooks/1_A8RpghVYVzO0jmgfIdCJ8A.jpg)

<sub>Photo by Oscar Omondi on Unsplash</sub>

React 16.8에 hook이 도입된 이후로 몇 년이 지났고 대부분의 개발자는 이전 클래스 구조를 포기했습니다.

> Hook를 사용하면 로직을 쉽게 추출하고 재사용할 수 있습니다. 초기 출시 이후, hook는 프론트엔드 세계를 폭풍으로 몰아넣었습니다.

지난 몇 년 동안 나는 내 코드와 다른 사람들의 코드를 검토하면서 수십 개의 hook 관련 문제를 발견했습니다. 나는 당신이 같은 실수를 할 필요가 없도록 hook를 사용하면서 직면한 위험을 공유하려고 노력할 것입니다.

우리는 종종 주류 혁신을 당연하게 여기고 그것에 대해 충분히 비판적이지 않습니다. 전 새로운 도구 역시 그것이 얼마나 쉽게 새로운 버그를 유발할 수 있는지, 또는 나쁜 코딩 습관을 유발할 수 있는지 검토되어어 한다고 생각합니다.

오해하지 마세요. 컴포넌트 간에 로직을 추출하고 공유하는 쉬운 방법이 없었기 때문에 hook는 구식 React에 필요합니다. 개발자는 HOC(High Order Components) 또는 Render Props를 처리해야 했습니다. 이 두 패턴 모두 대부분의 개발자들이 사용하기에 너무 어려웠습니다.

> hook에 대해 아무것도 모르거나 새로 공부할 필요가 있는 경우 여기에 좋은 링크가 있습니다. [Dan Abramov — Making sense of react hooks](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889)

## 의존성(Dependencies)

문자열, boolean, 숫자 및 기타 프리미티브 타입 값은 `useEffect`에 대한 dependency로 추가하기 쉽습니다. 그러나 배열이나 객체를 dependency로 사용할 수 없습니다. 이유는, 그것들은 단순한 방법으로 비교할 수 없기 때문입니다.

> 기본적으로 배열과 개체는 참조로 비교됩니다.

이러한 dependency는 다음 두 가지 경우에 `useEffect` hook의 실행에 영향을 줄 수 있습니다.

* 배열, 객체가 실제로 동일하지만 서로 다른 참조를 사용해 비교하는 경우

* 배열과 객체가 서로 다른 값을 가지지만, JS가 같은 참조를 사용해 비교하는 경우

두 경우 모두 이 hook은 버그로 이어지며 제대로 수행되지 않습니다.

이 문제를 극복하기 위한 잘 알려진 hack 및 trick이 있습니다. 이들 중 어느 것도 완벽한 솔루션은 아니지만 우리는 때로는 코드가 제대로 돌게 하기만 하면 됩니다.

* 첫 번째 옵션은 `JSON.stringify()`를 사용하는 것입니다.

```js
useEffect(() => {
  console.log(numbersArray)
}, [JSON.stringify(numbersArray)])
```

* 또 다른 (ES6) 옵션은 템플릿 리터럴을 사용하여 문자열로 바꾸는 것입니다. 결과가 배열로 래핑되지 않는다는 점을 제외하면 `JSON.stringify()`와 유사합니다.

```js
useEffect(() => {
  console.log(numbersArray)
}, [`${numbersArray}`])
```

* 배열 크기가 변경되지 않는 경우 세 번째 옵션은 스프레드 연산자를 사용하는 것입니다.

```js
useEffect(() => {
  console.log(numbersArray)
}, [ ...numbersArray ])
```

## 조건부(Conditionals)

> hook는 실행 순서에 의존하므로 조건부로 hook를 호출할 수 없습니다.

조건부 hook를 사용하면 실행 순서가 변경되고 Linter가 에러를 낼 것입니다. 이 문제는 우리가 hook를 구성할 수 있는 방법을 제한합니다.

기술적으로 당신은, 조건문에서 hook를 사용할 수 없습니다. 그러나 내부적으로 작동하는 방식을 안다면 조건부 hook가 작동하도록 만들 수 있습니다.

렌더링하려는 각 hook에 대해 두 개 이상의 컴포넌트를 만들어야 합니다. 각 컴포넌트에서 해당 논리를 추가할 수 있습니다.

```js
// 조건부 렌더링 로직
const { userId } = useParams();

if (userType === 'someType') {
  return <UseHookFirst userId />
} else if (userType === 'otherType') {
  return <UseHookSecond userId />
} else {
  return <UseHookThird userId />
}
```

```js
// 조건부로 렌더링 되는 hook
import React from 'react'

const UseHookFirst = ({ userId }) => {
  const data = useHookOne(userId)
  return (<div>Your data is here: {data}</div>);
}

export default UseHookFirst;
```

이런 식으로 `userId` 변수를 기반으로 두 개의 다른 hook를 렌더링할 수 있습니다.

## useEffect의 문제

개발자는 `useEffect`를 사용하여 상태, DOM을 수정하거나 API를 호출합니다.

> 전 "어째서 useEffect가 두 번 호출되죠?" 또는 "왜 useEffect가 무한 루프를 돌죠?"란 질문을 몇 번이나 받았는지 상상해 볼 수 조차 없습니다.

그렇다면 `useEffect`를 바로 사용하는 게 나쁜 이유는 무엇입니까?

* useEffect의 장점: 거의 모든 곳에 사용할 수 있습니다.

* useEffect의 단점: 거의 모든 곳에 사용할 수 있습니다.

### 무한 루프

> [https://stackoverflow.com/questions/53070970/infinite-loop-in-useeffect](https://stackoverflow.com/questions/53070970/infinite-loop-in-useeffect), 이 문제는 11개월 전에 올라왔으며 175,000명의 개발자가 조회했습니다.

무한 루프를 수행하는 가장 간단한 방법은 일부 상태가 변경될 때 `useEffect`를 트리거하고 변경될 때 정확히 그 상태 변경을 트리거하는 코드를 실행하는 것입니다.

```js
const Calculation = () => {
  const [number, setNumber] = useState();

  useEffect(() => {
    setNumber(Math.random());
  }, [number])
}
```

가장 확실한 해결책은 이 문제를 일으키는 dependency를 제거하는 것입니다.

**단일 책임 원칙을 유지하기 위해, 항상 여러 useEffect를 사용해야 합니다.** dependency가 적을수록 잠재적으로 가질 수 있는 버그가 줄어듭니다.

이 hook 안에 너무 많은 코드가 있으면 문제가 발생할 수 있습니다. `useEffect` 내부에서 함수를 추출해내고, 리팩토링하세요.

## useCallback & useMemo 남용

신입 React 개발자는 memorize 기능이 더 안전한 접근 방식이라고 생각하는 경우가 많습니다. 필요한 경우, 메모이제이션은 불필요한 렌더링을 방지하는 강력한 도구 세트를 제공합니다.

그러나 너무 좋은 모든 것은 높은 가격을 수반합니다. `useCallback` 및 `useMemo`를 모든 곳에 사용하면 코드 복잡성을 증가시켜 개발 속도에 영향을 미치고 장기적으로 버그를 유발할 수 있습니다.

> 성능 최적화는 무료가 아닙니다. useMemo와 useCallback을 앱의 미세 조정으로 생각해야 합니다.

### 최적화 하지 말아야 할 때

강력하긴 하지만, 모든 기능에 `useMemo` 또는 `useCallback`을 사용해서는 안 됩니다. 사용하기 전에 먼저 앱 성능을 확인하는 것이 좋습니다. 종종 이러한 hook를 추가하기 전에 코드 개선을 시작하는 것이 더 낫습니다.

**대부분의 경우 개발자는 불필요한 재렌더링 최적화를 해서는 안 됩니다.** React는 원래 빠릅니다. 전 제가 React를 사용하면서 성능 문제를 경험해 본적이 있다고 생각하지 않습니다. (React Native 및 모바일 앱 개발에는 해당되지 않습니다.)

이 두 함수가 나쁜 코드를 고쳐줄 수는 없지만, 그러나 이미 적절하게 코드가 잘 배치되어 있다면, 이 두 함수가 좋은 코드를 훌룡한 코드로 만들어 줄 수 있습니다.

### 최적화가 필요할 때

입력이 점차적으로 변경되는 기능을 만들 때 `useMemo`를 사용할 수 있습니다. 또한 데이터가 메모리 이슈를 일으킬 만큼 큰 경우, 또는 인자가 너무 커서 비교의 비용이 wrapper를 사용하는 비용보다 크지 않게 되는 경우에 사용하면 좋습니다.

`useCallback`은 매 호출마다 코드가 다시 컴파일 되는 경우 잘 작동합니다. 결과를 메모라이징해 놓으면 시간이 지남에 따라 입력이 변경될 때 함수를 계속해서 호출하는 비용을 줄일 수 있습니다.

### useMemo를 값 비싼 계산에 사용하기

`useMemo`의 이점은 다음과 같은 값을 얻을 수 있다는 것입니다.

```js
const a1 = {b: props.b}
```

위 값을 게으르게(lazily) 얻으려면,

```js
const a2 = useMemo(() => ({b: props.b}), [props.b])
```

이 경우 `useMemo`는 유용하지 않지만 계산하는 데 비용이 많이 드는 값을 계산하는 함수를 상상해 보십시오. 많은 앱이 이 작업을 수행하지 않지만 이런 경우 `useMemo`가 완벽한 솔루션입니다.

**일반적으로 렌더링 문제를 감지하기 시작하면 렌더링을 최적화하기에 완벽한 순간입니다.**

# 원문

- [React hooks the dangers probably no one told you about](https://medium.com/@i-ads/react-hooks-the-dangers-probably-no-one-told-you-about-264fb4393e9c)
