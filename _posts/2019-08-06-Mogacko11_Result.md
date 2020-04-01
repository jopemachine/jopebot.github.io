---
layout: post
title: "2019 모각코 11회차 결과"
subtitle: '2019-08-06, 11회차 2019 모각코 결과'
author: "jopemachine"
header-img: "img/post-bg-infinity.jpg"
header-mask: 0.3
tags:
  - 2019 모각코
---

<h2>Currying 에 대해</h2>

~~~js

const log = console.log;

function multiply3 (x, y, z){
    return x*y*z;
}

log(multiply3(2,3,4));

function multiplyCurry(x){
    return function(y){
        return function(z){
            return x*y*z;
        }
    }
}

// 제한된 커링 형태
log(multiplyCurry(2)(3)(4)); // 24

// Function.prototype에 curry 함수를 정의하면
// 어떤 함수에서든 curry를 호출해 커링 함수로 바꿔, 인자를 하나씩 고정시켜 사용할 수 있음
Function.prototype.curry = function(one) {
    // this는 인자 함수.
    var origFunc = this;
    var target = origFunc.length;
    var args = [];
    function next(nextOne) {
        args = args.concat(nextOne);
        // 모든 인자가 나왔으면 apply로 함수를 평가하지만,
        if (args.length === target) {
            return origFunc.apply(null, args);
        }
        // 아직 인자가 다 나오지 않았다면 커링 형태의 함수를 리턴한다
        else {
            return function(nextOne) { return next(nextOne) };
        }
    }
    return next(one);
}

const curry = f =>
    (a, ...rest) => rest.length == 1 ? f(a, ...rest) :(...rest) => f(a, ...rest);

log(multiply3.curry(2)(3)); // Function
log(multiply3.curry(2)(3)(4)); // 24

{% endhighlight %}


<h2>코드 분석</h2>

아래의 강의를 참고하며 lib.js의 코드에 주석을 달며 공부했다. (코드는 https://github.com/indongyoo/functional-javascript-01 참조)

강의만 듣고 아래의 코드가 다 이해되지는 않았기 때문에 따로 복습 시간이 필요했다.

![](/img/posts/2019-08-06-Mogacko11_Result/ScreenClip.png)

{% highlight js %}

// log를 쉽게 작성하기 위함
const log = console.log;

// curry는 2번 커링 되어 있는 함수로,
// 함수 하나를 인자로 받고, 이 함수의 인자는 가변인자이다.
// 이 함수에서 인자의 길이가 2 이상인 경우, 다시 커링한다.

const curry = f =>
    // 인자 길이가 1 인 경우 f(a, ..._), 즉 f(a) 계산 결과를 리턴.
    // 인자 길이가 2 이상인 경우 다시 커링해서 (..._) => f(a, ..._) 다음 함수를 리턴
    (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

// isIterable는 a가 undefined가 아니고 a[Symbol.iterator]가 존재할 때 true
const isIterable = a => a && a[Symbol.iterator];

// go1은 go의 인자를 하나만 받도록 축소해 놓은 함수이다.
// a가 프라미스인 경우, then으로 연결해 값을 평가한 후 리턴하도록 한다
const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);

// then은 성공했을 때와 실패했을 때의 처리 함수를 각각 인자로 받음
// 프라미스가 성공했을 땐, then으로 연결해 f(acc, a)를 리턴하고, 실패했을 땐, acc를 그대로 리턴해
// 이후의 함수열들의 평가에 지장이 없게한다. (nop 심볼이 아닐 땐, Promise,reject로 평가를 종료함)

// 프라미스 타입이 아닐 땐, f(acc, a)를 리턴
const reduceF = (acc, a, f) =>
    a instanceof Promise ?
        a.then(a => f(acc, a), e => e == nop ? acc : Promise.reject(e)) :
        f(acc, a);

// head는 take(1)로 iterable 객체에서 하나의 원소를 빼 온 후, go1으로 (프라미스인 경우를 포함해)
// 적절하게 처리한 후, 배열 괄호를 제거하고 리턴한다
const head = iter => go1(take(1, iter), ([h]) => h);

// reduce는 f로 iterable 객체들의 각각에 전부 적용하는 함수
// 세 번째 인자가 없는 경우, acc 초기값으로 iterable 객체의 맨 처음 원소를 사용하는 것으로 간주한다
const reduce = curry((f, acc, iter) => {
    // head를 이용해 맨 앞의 원소를 빼 와, acc로 하고 iterable 객체는 acc[Symbol.iterator]로 구한다.
    if (!iter) return reduce(f, head(iter = acc[Symbol.iterator]()), iter);
    
    // next된 iter를 구함
    iter = iter[Symbol.iterator]();
    
    // acc가 프라미스 인 경우 까지 제대로 계산하기 위해 go1을 사용.
    // (정확히는 인자가 바로 프라미스로 들어오는 경우를 처리한 것)
    // go1은 하나의 함수열 밖에 처리하지 못하므로 재귀함수를 쓴다.
    // 재귀 하기 위해 arrow Function에서 일반 함수 형태로 고쳐, 함수 이름을 명시해야 한다.
    return go1(acc, function recur(acc) {
        let cur;
        // iterating이 끝날 때 까지 반복
        while (!(cur = iter.next()).done) {
            // acc에 reduceF를 진행해 cur.value가 프라미스인 경우를 처리
            acc = reduceF(acc, cur.value, f);
            // acc가 Promise 형태인 경우 acc.then(recur)로 프라미스 타입을 풀어주고 진행
            if (acc instanceof Promise) return acc.then(recur);
        }
        return acc;
    });
});

// go는 가변인자로 iterable한 함수열들을 받는다.
// (a, f) => f(a)란 간단한 함수 적용 arrow Function을 reduce의 인자로 넘겨,
// 각각의 함수들을 실행한 후, 다음 함수열의 인자로 넘긴다 (커링을 이용해 구현됨)
const go = (...args) => reduce((a, f) => f(a), args);

// pipe는 go에서 한 번 더 커링시켜 인자를 나중에 받도록 바꾼 함수이다.
// 구체적으로는, const a = pipe(functions) 식으로 저장해 놓고, a(args) 식으로 나중에 사용할 수 있도록 만들기 위해,
// go를 커링해, 실행할 작업 목록 (함수열)을 담고 있는 객체를 생성하는 함수.
const pipe = (f, ...fs) => (...args) => go(f(...args), ...fs);

// take는 iterable 객체에서 원하는 만큼 원소를 빼 오는 함수
const take = curry((l, iter) => {
    let res = [];
    iter = iter[Symbol.iterator]();
    return function recur() {
        let cur;
        // l 이전에 done 되면 종료
        while (!(cur = iter.next()).done) {
            const a = cur.value;
            // 함수열에서 프라미스를 만난 경우
            if (a instanceof Promise) {
                return a
                    // 프라미스인 경우, then으로 처리하되, l 까지 처리가 끝났다면 res를 반환해 재귀를 끝내고,
                    // 남아 있는 경우, recur을 호출해 재귀적으로 처리한다.
                    .then(a => (res.push(a), res).length == l ? res : recur())
                    // 프라미스가 실패할 경우, nop Symbol일 땐, 계속 처리하고, 아니면 reject
                    .catch(e => e == nop ? recur() : Promise.reject(e));
            }
            res.push(a);
            // 함수열에 프라미스가 없었던 경우, l까지 take해 온 result를 리턴
            if (res.length == l) return res;
        }
        return res;
    }();
});

// takeAll은 take에서 iterable이 done 될 때 까지 진행하는 함수
const takeAll = take(Infinity);

// L은 빈 객체. 지연평가 버전의 함수들은, 제너레이터를 이용해 
// 각 제너레이터들이 호출되었을 때 iterable이 만들어지는 형태로 구현됨
const L = {};

// L.range는 range의 지연 평가 버전. 제네레이터를 이용하므로, arrow Function으로 작성 할 수 없다.
// l을 인자로 받아 그것만큼의, iterable 할 수 있는 객체가 생성되는 것과 같은 효과를 갖는,
// 제너레이터를 L.range에 대입
L.range = function* (l) {
    let i = -1;
    while (++i < l) yield i;
};

// L.map은 map의 지연평가 버전. 각 원소들에 적용할 함수와,
// iterable 객체를 받아 iterating 하면서 인자로 받은 함수를 적용한다.
// go1을 이용해, 프라미스인 경우에도 적절히 처리한다
L.map = curry(function* (f, iter) {
    for (const a of iter) {
        yield go1(a, f);
    }
});

// nop은 Symbol('nop') 객체. new 키워드로 생성하지 않음에 유의.
const nop = Symbol('nop');

// L.filter는 filter의 지연평가 버전.
// f는 각 원소의 특정 기준을 판단해 boolean 값을 리턴해주는 함수여야 한다.
// go1을 이용해 원소 a를 판단하고, true인 경우엔, a를 yield 하고,
// 프라미스 타입이 리턴되었다면 then을 이용해 처리하되, 프라미스가 실패한 경우 Promise.reject
L.filter = curry(function* (f, iter) {
    for (const a of iter) {
        const b = go1(a, f);
        if (b instanceof Promise) yield b.then(b => b ? a : Promise.reject(nop));
        else if (b) yield a;
    }
});

// L.entries는 연관 배열의 entry들을 지연 반환해주는 제너레이터이다
L.entries = function* (obj) {
    for (const k in obj) yield [k, obj[k]];
};

// L.flatten은 flateen의 지연평가 버전.
// iterable 객체를 돌면서, 안에 또 iterable한 객체가 있다면
// 해당 객체를 yield* (역참조) 로 처리해, flatten 한다.
L.flatten = function* (iter) {
    for (const a of iter) {
        if (isIterable(a)) yield* a;
        else yield a;
    }
};

// deepFlat의 지연평가 버전. L.flatten에 비해, f란 label을 부여해,
// 재귀적으로 처리하므로, iterable이 몇 번 중첩되어 있어도 모두 flatten 할 수 있다
L.deepFlat = function* f(iter) {
    for (const a of iter) {
        if (isIterable(a)) yield* f(a);
        else yield a;
    }
};

// flatMap의 지연평가 버전. L.map으로 특정 함수를 적용하고 L.flatten으로 펴준다 
L.flatMap = curry(pipe(L.map, L.flatten));

// 지연평가에서, 모든 원소에 대해 반복하면 map이 된다.
const map = curry(pipe(L.map, takeAll));

// 마찬가지로, L.filter를 모든 원소에 대해 반복함으로써, filter를 구현
const filter = curry(pipe(L.filter, takeAll));

// find는 특정함수 f의 조건에 부합하는 원소들을 1개만 찾아, 배열 괄호를 벗겨 리턴해 준다
const find = curry((f, iter) => go(
    iter,
    L.filter(f),
    take(1),
    ([a]) => a));

// flatten은 L.flatten을 모든 원소에 대해 적용한 것
const flatten = pipe(L.flatten, takeAll);

// L.flatMap에서 L.flatten을 flatten으로 고친 것
const flatMap = curry(pipe(L.map, flatten));

const range = l => {
    let i = -1;
    let res = [];
    while (++i < l) {
        res.push(i);
    }
    return res;
};

~~~

각 함수의 병렬 평가 버전에 대해선 다시 강의를 듣고 복습할 생각이다.

