---
layout: post
title: "영화 <우리집> 후기"
subtitle: '2019-07-30, 9회차 모각코 결과'
author: "jopemachine"
header-img: "img/post-bg-infinity.jpg"
header-mask: 0.3
tags:
  - 모각코
---

<i>Posting Time : 19-07-30, 16:56</i><br>
<i>Updating Time : 19-07-30, 16:56</i><br>

---

오늘은 지금까지 인프런에서 들은 JS 강의의 코드를 타이핑하면서 복습을 진행했다.

해당 강의는 아래의 강의이다. (코드는 https://github.com/indongyoo/functional-javascript-01 참조)

![](/img/posts/2019-07-30-Mogacko09_Result/ScreenClip2.png)

모각코 시작할 땐 C++ 공부도 함께 진행하려 했으나, JS 강의 복습해야 하는 양이 생각보다 많아서,

C++ 공부는 나중에 따로 해야할 것 같다.

복습은 직접 강의에 나온 코드들을 따라치면서 진행했다.

JS IDE로 WebStorm을 처음 사용해 봤는데, 기초적인 내용들을 학습하는데,

아래처럼 코드에서 인자의 이름을 보여주니 학습할 때 아주 용이했다.

![](/img/posts/2019-07-30-Mogacko09_Result/ScreenClip1.png)

강의 별로 js 파일을 나눠서 사용했다.

<h2>1강</h2>

{% highlight js %}

// #### 1강 ####
const a = 10;
const add10 = a => a + 10;
const r = add10(a);

console.log(r); // r = 20

const add5 = a => a + 5;
console.log(add5);
console.log(add5(5)); // 10

const f = () => 1;
const ff = f => 1;
// 함수를 리턴하는 함수. 
// 1을 리턴받으려면 커링을 사용해야 함
const f1 = () => () => 1;

console.log(ff()); // 1, 단순히 함수의 결과를 리턴한 것
console.log(f1()); // [Function]
console.log(f1()()); // 1, 커링 기법

const f2 = f1();
console.log(f2); // [Function]
console.log(f2()); // 1, 커링 기법

const apply1 = f => f(1);
const add2 = a => a + 2;
console.log(apply1(add2)); // 3

const times = (f, n) => {
    let i = -1;
    while (++i < n) f(i);
};

times(console.log, 3);
times(a => console.log (a+10), 3);

const addMaker = a=>b=>a+b;
const add10_2 = addMaker(10);
const log = console.log;

log(add10_2(5));
log(add10_2(10));


{% endhighlight %}

<h2>2강</h2>

{% highlight js %}

// #### 2강 ####

const log = console.log;

const list = [1,2,3];
for (let i = 0; i < list.length; i++){
    log(list[i]);
}

const str = 'abc';

for (let i = 0; i < str.length; i++){
    log(str[i]);
}
// for of 문으로 바꿔 쓸 수 있다!
for (const a of list){
    log(a);
}

for (const a of str) {
    log(a);
}

log('Arr-----------');

const arr = [1,2,3];
// array의 Iterator 구하기
let iter1 = arr[Symbol.iterator]();
iter1.next();
// Iterator로 순회
for (const a of iter1){
    log(a);
}
// array를 직접 순회
for (const a of arr){
    log(a);
}

log('Set-----------');
const set = new Set([1,2,3]);
let iter2 = set[Symbol.iterator];
for (const a of set) log(a);
// 아래처럼은 순회할 수 없다.
// 왜? Set의 Iterator는 next가 불가능하기 때문에
// for (const a of iter2) log (a);

log('Map-----------');
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
for (const a of map.keys()) log (a); // a,b,c
for (const a of map.values()) log(a); // 1,2,3
for (const a of map.entries()) log(a); // entry들이 직접 모두 나옴

// 사용자 정의 이터러블

const iterable = {
    [Symbol.iterator]() {
        let i = 3;
        return {
            next(){
                // 끝난 경우 value은 정의할 필요 없다
                return i == 0 ? {done: true} : {value: i--, done: false};
            },
            // 완전한 iterable을 만들기 위해선, 여기에도
            // Symbol.iterator를 정의해 줘야만 한다.
            [Symbol.iterator](){
                return this;
            }
        }
    }
};

// 아래와 같이 Custom Iteator를 만든다
let iterator = iterable[Symbol.iterator]();
iterator.next();
for (const a of iterator) log(a);

// 스프레드 연산자
const a = [1,2];
// a[Symbol.iterator] = null; 하면 아래처럼 스프레드 연산자를 사용할 수 없게
// 된다. 즉, 아래 연산자는 iterable 객체에만 적용가능한 연산자이다. 
log([...a, ...arr, ...set, ...map.keys()]);


{% endhighlight %}

<h2>3강</h2>

{% highlight js %}

// #### 3강 ####

const log = console.log;

function *gen(){
    yield 1;
    if (false) yield 2;
    yield 3;
}

let iter = gen();
log(iter[Symbol.iterator]() == iter); // true
log (iter.next());
log (iter.next());
log (iter.next()); // { value: undefined, done: true }
log (iter.next());

for (const a of gen()) log(a);

function* infinity(i = 0){
    while(true) yield i++;
}

log(infinity()); // Object [Generator] {}
let iter2 = infinity();

log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());

function* limit(l, iter){
    for (const a of iter){
        yield a;
        if(a == l) return;
    }
}

const iter3 = limit(3, infinity(0));
// 3까지 밖에 나오지 않고 나머지는 undefined, done true로 나온다
log(iter3.next());
log(iter3.next());
log(iter3.next());
log(iter3.next());
log(iter3.next());
log(iter3.next());

function* odds(l){
    for (const a of limit(l, infinity(1))){
        if((a % 2) == 1) yield a;
    }
}

// 1,3,5,7,9, undefined
let iter4 = odds(10);
log(iter4.next());
log(iter4.next());
log(iter4.next());
log(iter4.next());
log(iter4.next());
log(iter4.next());

// 39까지 홀수 출력
for (const a of odds(40)) log(a);

log(...odds(10), ...odds(20));
log([...odds(10), ...odds(20)]);

const [head, ...tail] = odds(5);
log(head);
log(tail);

const [a,b, ...rest] = odds(10);
log(a); // 1
log(b); // 3
log(rest); // [5,7,9]

{% endhighlight %}

<h2>4강</h2>

{% highlight js %}

// #### 4강 ####

const log = console.log;
const products = [
    {name: '반팔티', price: 15000},
    {name: '긴팔티', price: 20000},
    {name: '핸드폰케이스', price: 15000},
    {name: '후드티', price: 30000},
    {name: '바지', price: 25000}
];

const map = (f, iter) => {
    let res = [];
    for (const a of iter)
        res.push(f(a));
    return res;
};

// f는 p의 name을 반환할 뿐인 간단한 함수
log(map(p => p.name, products));

let m = new Map();
m.set('a', 10);
m.set('b', 20);

// m의 해당하는 value 값들을 두 배로 만들어 값을 찍는다
log(map(([k,a]) => [k, a * 2], m));
// 위에서 만든 값으로 Map을 만든다
log(new Map(map(([k,a]) => [k, a * 2], m)));

const filter = (f, iter) => {
    let res = [];
    for (const a of iter) {
        if (f(a) == true) res.push(a);
    }
    return res;
}

log(...filter(p => p.price < 20000, products));

log(...filter(p => p.price >=20000, products));

// 홀수인 값 (5까지만) 들을 리턴
const isOdds = function* (){
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
};

// 제네레이터 뒤에 붙는 괄호에 주의
log(filter(n => (n % 2 == 1), isOdds()));

const nums = [1,2,3,4,5];

let total = 0;
for (const n of nums){
    total += n;
}
log(total);

const reduce = (f, acc, iter) => {
    // 인자가 둘만 있는 경우 acc가 빠진 경우로 취급.
    if(!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const a of iter){
        acc = f(acc, a);
    }
    return acc;
};

const add = (a,b) => a+b;

log(reduce(add, 0, [1,2,3,4,5,6,7,8,9,10]));

log(add(add(add(0,1),2), 3));

// 인자가 둘 만 있는 경우
log(reduce(add, [1, 2, 3, 4, 5]));

log(
    reduce(
        (total_price, produce) => total_price + produce.price,
        0,
        products
    )
);

{% endhighlight %}

<h2>5강</h2>

{% highlight js %}

// #### 5강 ####

const log = console.log;

const curry = f =>
    (a, ...rest) => rest.length == 1 ? f(a, ...rest) :(...rest) => f(a, ...rest);

const map = curry((f, iter) => {
    let res = [];
    for (const a of iter) {
        res.push(f(a));
    }
    return res;
});

const filter = curry((f, iter) => {
    let res = [];
    for (const a of iter) {
        if (f(a)) res.push(a);
    }
    return res;
});

const reduce = curry((f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const a of iter) {
        acc = f(acc, a);
    }
    return acc;
});

const products = [
    {name: '반팔티', price: 15000},
    {name: '긴팔티', price: 20000},
    {name: '핸드폰케이스', price: 15000},
    {name: '후드티', price: 30000},
    {name: '바지', price: 25000}
];

const add = (a, b) => a + b;
log(
    reduce(
        add,
        map(p => p.price,
            filter(p => p.price < 20000, products))
    )
);

// go는 args로 실행할 함수 (명령어) 들을 받고,
// 왼쪽 인자부터 차례대로 실행하며 오른쪽으로 결과값들을 넘겨준다
const go = (...args) => reduce((a,f)=> f(a), args);

// pipe는 go와 비슷하지만, go에선 맨 왼쪽 인자 함수에 인자를 넘겨줘야 하지만,
// pipe는 해당 함수를 실행할 때 넣어주면 된다. pipe는 go를 커링해서 구현된 것임
const pipe = (f, ...fs) => (...as) => go (f(...as), ...fs);

const goRes = go(
    add(0,1), // res = 1
    arg => arg + 10, // res = 11
    arg => arg + 100, // res = 111
);

log(goRes);

go(
    add(0,1), // res = 1
    arg => arg + 10, // res = 11
    arg => arg + 100, // res = 111
    log
);

const f = pipe(
    add,
    a => a + 10,
    a => a + 100
);

log (f(3,4)); // 117

const f_res = pipe(
    add,
    a => a + 10,
    a => a + 100
)(3,4);

log(f_res); // 117

log(
    reduce(
        add,
        map(p => p.price,
            filter(p => p.price >= 20000, products))
    )
)

// 위처럼 쓸 수도 있지만 아래처럼 go를 이용해 기술하면
// 가독성이 좋아진다. 그런데 두 번째 인자가 중복되고 있다.
go(
    products,
    products => filter(p => p.price < 20000, products),
    products => map(p => p.price, products),
    prices => reduce(add, prices),
    log
);

// curry를 이용해 map, filter, reduce 등의 정의에 활용하면 아래처럼 쓸 수도 있다!
// (왼쪽 함수의 리턴 값을 오른쪽 함수의 인자로 넘김으로써)
go(
  products,
  filter(p => p.price < 20000),
  map(p => p.price),
  reduce(add),
  log
);

// Currying에 대해서

const mult = curry((a,b) => a*b);

log(mult(3,2)); // 6
log(mult(3)(2)); // 6

const mult3 = mult(3);
log(mult3(10));
log(mult3(5));
log(mult3(3));

// 함수 조합으로 함수 만들기

const total_price = pipe(
    map(p => p.price),
    reduce(add)
);

const base_total_price = predi => pipe(
    filter(predi),
    total_price
);

go(
    products,
    base_total_price(p => p.price < 20000),
    log
)

go(
    products,
    base_total_price(p => p.price >= 20000),
    log
)

{% endhighlight %}
