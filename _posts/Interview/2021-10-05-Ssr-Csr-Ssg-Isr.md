---
layout: post
title: "SSR, CSR, SSG, ISR"
subtitle: "프론트 면접 질문 정리"
author: "jopemachine"
tags: 
 - Frontend
header-img: "img/header-img/linux.png"
header-mask: 0.3
---

# SSR, CSR, SSG, ISR

## SSR vs CSR

### SSR (Server Side Rendering, 서버 사이드 렌더링)

- 말 그대로 렌더링 로직을 서버에 두는 방식
- 서버에 부하 걸린다
- 초기 구동 속도가 빠르지만, 클라이언트에서 js를 로드하는 경우 TTV (time to view) 시점과 TTI (Time to interact) 시점이 일치하지 않는다. 
- React에서 Next.js를 써서 CSR과 섞어 쓸 수 있다.
- Vue에서 Nuxt.js를 써서 구현 가능
- 서버에서 새로 html을 불러와야 해서 blinking이 발생하고 SPA 구축 안 됨.

### CSR (Client Side Rendering, 클라이언트 사이드 렌더링)

- html은 주요 컨텐츠 없이 다운로드 된다. 
- js를 다운로드 받고 클라이언트에서 DOM 조작을 통해 렌더링 한다.
- 자바스크립트 실행이 다 끝난 후에야 렌더링이 되기 때문에 TTI와 TTV가 일치한다.
- 자바스크립트 프레임 워크를 다 다운로드 받을 때 까지 로딩 시간이 좀 걸린다.
- 클라이언트에서 js를 실행한 후에야 주요 컨텐츠를 알 수 있기 때문에 SEO (Search Engine Optimization)가 잘 안 된다.
- SPA와 잘 어울림.

## SSG, ISR

### SSG (Static Site Generate), Pre rendering

- SSR의 종류 중 하나임.
- 일반적인 SSR이 런타임에 사이트를 생성해 렌더링 하는 것이라면, Pre rendering은 빌드 타임에 미리 생성해 놓는 방식이다, 즉 Static generating 임.

### ISR (Incremental Static Regeneration)

- SSR와 CSR의 혼용.
- 서버에서 어느 정도 렌더링 해서 html을 보내주면 js 로드해 놓고 점진적으로 렌더링 해서 보여줌.