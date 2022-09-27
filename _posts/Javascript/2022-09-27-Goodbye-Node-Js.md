---
layout: post
title: 번역 - Goodbye Node JS
subtitle: 자바스크립트 생태계
author: jopemachine
tags:
  - Javascript
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: September 27, 2022
---

# Goodbye Node JS

2009년 5월 27일 오픈소스 런타임 환경 출시

Node js는 서버 측 애플리케이션에 혁명을 일으켰고 수많은 불가능을 현실로 만들었습니다. 여기 이제 새로운 아이가 있습니다.

## 이 아이는 누구인가요? 🤔

Bun(그리고 예라고 묻기 전에 모든 멋진 이름은 이미 사용되었습니다 😅)은 Jared Sumner와 40명 이상의 기여자가 만든 새로운 오픈 소스 런타임 환경입니다.

이 괴상해 보이는 이름의 런타임 환경은 정말 큰 힘이 됩니다.

제작자에 따르면 다음과 같이 만들어졌습니다.

* 빠르게 시작합니다.

* 새로운 레벨의 퍼포먼스를 보여줍니다.

* 훌룡하고 완성된 툴이 될 예정입니다.

베타 릴리스에서 제작자는 엄청나게 빠른 올인원 JavaScript 런타임이라고 주장했습니다.

![](/img/posts/Javascript/2022-09-27-Goodbye-Node-Js/1__-eXW38rRFCB4M49TC4RiQ.jpg)

## 얼마나 빠른데? 🚀

다음은 Node JS 및 Deno와 비교한 Bun의 벤치마크 성능입니다.

![](/img/posts/Javascript/2022-09-27-Goodbye-Node-Js/1_C5slzNbrm1ol9h6vM_BlNw.png)

![](/img/posts/Javascript/2022-09-27-Goodbye-Node-Js/1_OAKBmvGJkfLiZlFSB2qUdQ.png)

![](/img/posts/Javascript/2022-09-27-Goodbye-Node-Js/1_5-Iux4z7Y99ROk7SAspevg.png)

잠시 시간을 내어 그 숫자에 흠뻑 빠져보세요.

그리고 예, 적어도 Bun에 따르면 그것은 아주 훌룡합니다.

deno에는 좋지 않지만 Ryan Dahl과 deno의 팀은 뭔가를 준비하고 있다고 확신합니다.

## Bun은 어떤 식으로 작동합니까? ⚙️

글쎄요, Node.Js는 V8 엔진을 사용하며 JIT(Just In Time) 컴파일 덕분에 훌륭한 도구가 되었습니다.

이제 Bun은 더 빠른 것으로 간주되는 JavaScript Core를 사용합니다.

또한 C와 Rust가 아기를 낳은 것처럼 보이는 같은 저수준 언어인, Zig로 작성되었습니다.

낮은 수준의 메모리 제어와 보이지 않는 제어 흐름의 제거는 Bun을 최대한 빠르게 만드는 Zig의 기능입니다.

## 기능 📋

> 웹팩을 대체할 네이티브 번들러
>
> 타입스크립트를 즉시 작성할 수 있도록 만들어주는 트랜스파일러
>
> 태스크 러너
>
> npm 클라이언트
>
> 환경 변수 자동 로드 (require(“dotenv”).load()는 이제 그만)
>
> 네이티브 테스트 러너
>
> Node.js API 함수 90% 지원

이보다 더 좋을 수는 없다고 생각합니다

새로운 도구이기 때문에 버그가 있다는 점은 유의해야 합니다. WSL(Linux용 Windows 하위 시스템)을 사용하는 것이 가장 좋습니다.

Bun의 도입은 분명히 많은 개발자들에게 꿈이 실현되는 것 같을 것입니다.

그러나 이 도구는 충분한 테스트 시간을 견뎌내야합니다, 그렇지 못하면 Windows 8 처럼 될 것입니다. 그렇게 되지 않기를 바랍니다.

Bun에 대한 더 많은 정보를 원하시면 [여기](https://bun.sh/)를 클릭하세요.

읽어 주셔서 감사합니다.

# 원문

- [Goodbye node js](https://medium.com/@appiahyoofi/goodbye-node-js-9e2f71f5e430)
