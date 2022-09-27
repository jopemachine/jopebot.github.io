---
layout: post
title: 번역 - The JavaScript framework war is over
subtitle: 자바스크립트 생태계
author: jopemachine
tags:
  - Javascript
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: September 27, 2022
---

# 번역 - The JavaScript framework war is over

## 참가자들

프레임워크 간의 전쟁은 JavaScript 커뮤니티에서 뜨거운 주제이며 업계의 많은 성스러운(holy) 전쟁 중 하나입니다.

처음부터 `jQuery`와 `AngularJS`가 모던 프레임워크로 이어지면서 전쟁은 치열했습니다.

`Backbone`이나 `Sencha`와 같은 많은 사람들이 길을 잃고 시체를 남겼습니다. 유지해야 하는 수 많은 레거시 코드들이 있습니다.

놀랍게도 여전히 큰 커뮤니티가 있는 `jQuery`와 같은 다른 프레임워크들은 살아남았습니다.

`Angular`와 같은 다른 것들은 예상하거나 약속한대로 작동하지 않는 것 같아 보입니다.

## jQuery

아마도 현존하는 가장 오래된 참가자일 것입니다.

브라우저 간 상호운용성을 보장해주며 큰 인기를 얻었지만 애플리케이션 확장이 어려웠다.

오늘 날 `jQuery`는 주류에서 벗어났고, 대부분의 프로젝트들에서 최선의 선택이 아닙니다.

```js
$(document).ready(() => {
  $("#app").html("Hello World!");
});
```

## AugularJS

AngularJS는 이미 LTS 모드에 있고, 형을 위해 은퇴한 상태입니다.

프레임워크 생태계의 큰 도약이었다는데 의심의 여지가 없으며, 우리들 중 일부는 여전히 그것을 그리워하고 있습니다.

그러나 AugularJS는 더 이상 적극적으로 유지되지 않기 때문에 더 이상 참가자가 아닙니다.

```js
angular
  .module("app", [])
  .controller("HelloWorldCtrl", ($scope) => {
    $scope.message = "Hello World!";
  });
```

## Angular

`React`와 경쟁하기 위해 세상에 등장했습니다.

`AngularJS`는 늙어서 성능 문제, 견고성 문제가 있었고 `React`가 점점 좋아지면서 많은 프로그래머가 부러워하는 시선으로 `React`를 보았습니다.

`Angular`는 `AngularJS`를 현대화하여 ECMAScript 6의 마지막 개선 사항을 활용하고 `React`와 효과적으로 경쟁하겠다는 약속을 이행하려고 했습니다

```js
import { Component } from '@angular/core';

@Component ({
   selector: 'my-app',
   template: `<h1>Hello {{name}}</h1>`,
})
export class AppComponent  { name = 'World'; }
```

`Angular`의 가장 주목할만한 어려움은 높은 러닝 커브입니다. 많은 개념이 필요하고 모든 것이 간단하지 않고 막다른 골목이 많습니다.

`Angular`를 제대로 배우는 것은 어렵습니다. `AngularJS`에서 러닝 커브를 물려받았지만 `RxJS` 또는 계층적 의존성 주입(*Dependency injection*)과 같은 새로운 어려움이 있습니다.

![](/img/posts/Javascript/2022-09-27-The-Java-Script-Framework-War-Is-Over/1_uZ2ljdD_1znAZaFEdaEL1A.png)

`Angular`의 또 다른 우려는 많은 약속을 어겼다는 것입니다.

예를 들어, 모두들 V2 버전부터 서버 측 렌더링 페이지를 만드는 간단한 방법이 있을 거라 예상했지만, 2022년 2월 24일 현재 Angular.io 웹 사이트 자체는 JavaScript 없이 자체적으로 작동할 수 없습니다.

하지만 `Angular`의 가장 큰 문제는 단편화와 버전 업그레이드입니다.

`Angular`의 버전을 업그레이드하는 것은 매우 어렵습니다. 사용자가 어플리케이션을 업데이트 할 때 위험을 감수해야 해서 업데이트 하지 않을 정도로 어렵습니다.

npm 웹사이트에서 볼 수 있습니다.

![](/img/posts/Javascript/2022-09-27-The-Java-Script-Framework-War-Is-Over/1_kvAaYQAboZvLC0pL7rGQWA.png)

## VueJS

`Vue`는 `AngularJS`보다 성능이 뛰어나지만 `Angular`보다 안정적이고 사용하기 쉬운 것을 필요로 하는 많은 개발자들의 솔루션이었습니다.

템플릿 시스템의 `Vue`는 `AngularJS`의 단순성을 유지하면서 원래 `Angular`에 매우 가깝지만 동시에 `React`에서 약간의 힘을 얻었습니다.

```html
<template>
  <div>{{ msg }}</div>
</template>

<script>
export default {
  name: "App",
  data() {
    return { msg: "Hello World!" };
  }
}
</script>
```

그러나 `VueJS`는 버전 1과 2에서 심각한 문제가 있었습니다.

배열을 잘 다루지 못했고 `VueJS` 개발자는 배열 업데이트 알고리즘을 잘못 선택한 JavaScript를 비난했습니다.

`Vuex`나 `Redux`와 같은 라이브러리를 사용하지 않으면 심각한 문제들을 마주할 수 있습니다.

여기에서 `AngularJS`에서는 작동하지만 `VueJS`에서는 작동하지 않는 앱을 ​​볼 수 있습니다.

![](/img/posts/Javascript/2022-09-27-The-Java-Script-Framework-War-Is-Over/1_H7OXTkqeHnnAyDob8A-87Q.png)

이론적으로 이 문제는 버전 3에서 해결되었습니다. 그러나 자신이 저지른 실수에 대해 다른 사람을 비난하는 것은 커뮤니티와 잘 어울리지 않았습니다.

## SvelteJS

`SvelteJS`는 전쟁에서 성장하는 경쟁자이며 큰 약속을 하고 있습니다.

주요 강점은 컴포넌트를 명령형 언어로 번역하는 것이라고 주장하며, 이에 따르면 `React`가 취하는 선언적 언어보다 낫다고 합니다.

```html
<script>
  let world = "World";
</script>

<div>
  Hello {world}!
</div>
```

사용하기가 더 간단하다는 것은 의심의 여지가 없지만 명령형으로의 번역과 결과 컴포넌트는 보이는 것만큼 예측하기 쉽지 않습니다.

`SvelteJS`는 경우에 따라 변경 사항을 올바르게 감지할 수 없습니다. 이 경우 상태가 손상되고 보기가 올바르게 업데이트되지 않을 수 있습니다.

이 문제는 예전 VueJS 이슈처럼 `SvelteJS` 프로젝트를 정당화하기 어려울 정도로 많은 우려를 불러일으키고 있습니다.

![](/img/posts/Javascript/2022-09-27-The-Java-Script-Framework-War-Is-Over/1_ZmQB7ka0oYgxXEk-5WrQUQ.gif)

## StencilJS

글쎄요, 기술적으로 프레임워크는 아니지만, 프레임 워크입니다.

`StencilJS`를 사용하면 컴포넌트를 작성하고 다른 프레임워크로 변환할 수 있습니다.

오늘 날엔, 구성 요소를 `Angular`, `React`, `Vue` 및 `WebComponents` 구성 요소로 변환해줍니다.

```js
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'app'
})
export class MyComponent {
  @Prop() world: string;

  render() {
    return (
      <p>
        Hello {this.world}
      </p>
    );
  }
}
```

그런데 이 클래스에는 이상한 점이 하나 있습니다. 다른 어떤 프레임워크와 정말 비슷합니다, 맞죠?

## Mitosis

당신은 아마 이 프레임워크에 대해 들어 본 적이 없겠지만, 제가 이 게시물을 작성하게 만든 프레임워크입니다.

Mitosis는 `Angular`를 만든 *Misko Hevery*가 만든 최신 프레임워크입니다.

맞습니다. Misko는 `Angular` 이후 또 다른 프레임워크를 만들었습니다.

```js
import { useState } from "@builder.io/mitosis";

export default function MyComponent(props) {
  const state = useState({
    world: "World",
  });

  return <div>Hello {state.world}!</div>;
}
```

`Mitosis`는 `StencilJS`와 동일한 목적을 가지고 있으며 구성 요소를 수많은 프레임워크로 변환합니다. 그런데 코드가 다른 어떤 프레임워크와 닮은 것 같지 않나요?

## React

npm 저장소에서 10년 이상 된 가장 오래된 모던 프레임워크 중 하나입니다.

많이 바뀌었지만 여전히 대부분의 이전 버전과 호환됩니다.

그리고 모든 변화가 더 좋아졌습니다.

어떤 사람들은 hook가 `React`를 훨씬 더 나은 프레임워크로 만들었다고 말합니다.

```js
import { useState } from "react";

export default function HelloWorld() {
  const [world] = useState("World");

  return <div>Hello {world}!</div>;
}
```

그러나 `React`의 최고의 품질은 hook이나 눈에 보이는 기능에 있는 게 아니라 그 반대입니다.

`React`는 JavaScript의 최신 표준을 지원하고 `JSX`를 지원합니다.

`React`는 더 이상 프레임워크가 아니며, 한 번도 프레임워크였던 적이 없었을 수도 있습니다. 그저 라이브러리일 뿐입니다.

표준을 너무 세게 밀어붙여서 결국 사용자 코드에서 제거되었습니다.

## 그래서 우승자는..

`JSX`에요. 아 좋아요, 사실 `React`입니다. 그러나 진짜 우승자는 `React` 그 자체가 아니라, 그 뒤에 숨겨진 철학입니다.

`React`는 그 자체로 라이브러리이지만 `Preact` 또는 `React Native`와 같은 다른 많은 것으로 대체될 수 있습니다.

하지만 자세히 보면 `StencilJS`나 `Mitosis`는 `React`와 매우 흡사하고 이것은 우연이 아니라 아래 이유 때문입니다.

> 최고의 프레임워크는 사용자 코드에서 자신을 제거합니다. - 변화에 열려 있는 것이 보다 현명한 결정입니다.

`React`는 JavaScript 및 `JSX`(XML이 포함된 JavaScript)를 많이 활용하며 사용자 코드는 `React`에 대해 매우 불가지론적이어서 몇 가지 조정만 하면 정확히 동일한 코드가 다른 프레임워크에서 작동할 수 있습니다.

따라서 의심의 여지 없이 `React`는 프레임워크 전쟁의 승자입니다. `React`는 사용자 코드 내부의 프레임워크가 아니기 때문입니다.

읽어주셔서 감사합니다. 기사가 마음에 들면 Medium에서 가장 성공적인 기사를 확인하여 더 많은 것을 읽으십시오. 이 추천 링크를 방문하여 Medium 회원이 될 수도 있습니다.

# 원문

- [The javascript framework war is over](https://medium.com/codex/the-javascript-framework-war-is-over-bd110ddab732)
