---
layout: post
title: Function Naming Pattern (A/HC/LC Pattern)
subtitle: 프로그래밍
author: jopemachine
tags:
  - Programming
  - Javascript
  - Translation
header-img: img/header-img/coding.jpg
header-mask: 0.3
last-update: November 19, 2021
---

# Function Naming Pattern (A/HC/LC Pattern)

## A/HC/LC Pattern

A/HC/LC Pattern이란 아래와 같은 패턴으로 함수 이름을 명명하는 방법론이다.

_prefix는 optional임에 유의할 것._

```
prefix? + action (A) + high context (HC) + low context (LW)
```

예제:

| Name                   | Prefix   | Action (A) | High context (HC) | Low context (LC) |
| ---------------------- | -------- | ---------- | ----------------- | ---------------- |
| `getUser`              |          | `get`      | `User`            |                  |
| `getUserMessages`      |          | `get`      | `User`            | `Messages`       |
| `handleClickOutside`   |          | `handle`   | `Click`           | `Outside`        |
| `shouldDisplayMessage` | `should` | `Display`  | `Message`         |                  |

즉, 함수가 하는 일 (동사) + Context (목적어) 로 구성하는 것인데, 더 명확한 표현을 위해 Context를 High context와 Low context로 나눌 수 있다.

## Frequent patterns

자주 사용되는 단어들

### Action

- 함수 이름 짓기에서 가장 중요한 부분.

#### get

```js
function getFruitCount() {
  return this.fruits.length
}
```

#### set

```js
let fruits = 0

function setFruits(nextFruits) {
  fruits = nextFruits
}

setFruits(5)
console.log(fruits) // 5
```

#### reset

```js
const initialFruits = 5
let fruits = initialFruits
setFruits(10)
console.log(fruits) // 10

function resetFruits() {
  fruits = initialFruits
}

resetFruits()
console.log(fruits) // 5
```

#### fetch

```js
function fetchPosts(postCount) {
  return fetch('https://api.dev/posts', {...})
}
```

#### remove

```js
function removeFilter(filterName, filters) {
  return filters.filter((name) => name !== filterName)
}

const selectedFilters = ['price', 'availability', 'size']
removeFilter('price', selectedFilters)
```

#### delete

```js
function deletePost(id) {
  return database.find({ id }).delete()
}
```

#### compose

```js
function composePageUrl(pageName, pageId) {
  return (pageName.toLowerCase() + '-' + pageId)
}
```

#### handle

```js
function handleLinkClick() {
  console.log('Clicked a link!')
}

link.addEventListener('click', handleLinkClick)
```

### Context

- Function이 작용하는 domain.

### Prefixes

- 함수의 의미를 보다 명확하게 하기 위해 사용한다.

- 함수 이름 명명에 비교적 드물게 사용됨.

#### is

- 해당 context의 특성을 기술한다 (대게 boolean 리턴)

#### has

- 해당 context의 value나 state를 가지는지를 기술한다 (대게 boolean 리턴)

#### should

- 해당 context가 특정 상태가 되어야 하는지 기술 (대게 boolean 리턴)

## Related links

- [Naming Cheatsheet 원문](https://github.com/kettanaito/naming-cheatsheet#ahclc-pattern)
