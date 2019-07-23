---
layout: post
title: "모각코 8회차 결과"
subtitle: '2019-07-23, 8회차 모각코 결과'
author: "jopemachine"
header-img: "img/post-bg-infinity.jpg"
header-mask: 0.3
tags:
  - 모각코
---

<i>Posting Time : 19-07-23, 16:47</i><br>
<i>Updating Time : 19-07-23, 16:47</i><br>

---

<h2>Counting Sort</h2>

Counting Sort 과정을 설명하면 아래와 같다.

배열의 최댓값을 크기로 하는 배열과, 원래 배열의 크기와 같은 배열

2개를 만들어 둔다. 

그리고 배열의 각 값들을 인덱스로 해서 새로 만든 배열에 집어 넣는다.

그리고 RadixSort 때 처럼 각 원소들의 누적합을 구한다.

원래의 배열의 마지막 원소부터 각 원소의 값을 인덱스로 해서 누적합 배열의

해당 값을 찾아 그 값을 인덱스로 해 새 배열에 그대로 집어넣는다.

반복문으로 이 과정을 끝까지 반복하면 새로 만든 배열은 기존의 배열을

정렬한 배열이 된다.

![](/img/posts/2019-07-23-Mogacko08_Result/ScreenClip.png)

<br>
<hr>
<h2>Bucket Sort</h2>

버킷 정렬의 과정을 설명하면 아래와 같다.

우선 힙에 정렬하려는 배열과 동일한 크기의 배열을 만든다.

그리고 각 배열의 원소들을 한 연결 리스트의 root 노드로 하고, 

이것을 하나의 버킷으로 한다. 

하나의 버킷이 갖는 범위는 배열의 길이 * 해당 원소의 크기 / 배열의 최댓값 + 1로 나눈 것이다.

![](/img/posts/2019-07-23-Mogacko08_Result/ScreenClip2.png)

Bucket Sort는 코드를 짜 봤는데, 노트북을 포맷했더니 C lion 작동에 문제가 있어 아직 테스트를 못 해봤다.

집에 가서 고칠 생각이다. 코드는 아래와 같음.

{% highlight cpp %}

#include <iostream>
#include <cmath>
#include <list>
#include "../Utility.h"

// int만 인자로 받을 수 있다
void bucketSort(int* intArray, int length, int maxRadix, int (*comparator)(void* a, void* b)) {

    // 동일한 크기의 링크드 리스트 배열을 만든다.
    std::list<int> lists[length];

    // 나눌 값을 구함
    int dividor = (int) pow(10, maxRadix);

    // 어떤 버켓에 들어가야 하는지 판단하고, 넣는다
    for(int i = 0; i < length; i++){
        lists[(intArray[i] * length) / dividor].push_back(intArray[i]);
    }

    // 버켓에 있는 모든 수들을 꺼내서 원래 배열에 넣는다.
    int index = 0;
    for(int i = 0; i < length; i++) {
        while (!lists[i].empty()) {
            intArray[index++] = lists->front();
            lists->pop_front();
        }
    }
}

void test_bucketSort() {
    int* a = new int[10]{ 188, 333, 222, 277, 121, 333, 100, 299, 343 ,626 };
    bucketSort(a, 10, 3, ascending_compare);

    for (int i = 0; i < 10; i++) {
        printf("%d\n", a[i]);
    }
};

{% endhighlight %}

<br>
<hr>
<h2>KeyMapper.h 작성</h2>

WinAPI 공부 겸 GUI 계산기를 만들어 보려고 하고 있는데, 오늘은 키보드의 어떤 키를 눌렀을 때 대응되는 

값을 찾기 위해 unordered_map (hashmap) 으로 싱글톤 KeyMapper 클래스를 만들어 보았다.

{% highlight cpp %}

#pragma once
#include <unordered_map>
using namespace std;

class KeyMapper {
public:

	static KeyMapper* getInstance() {
		if (Instance == nullptr) Instance = new KeyMapper();
		return Instance;
	}

	int value(char key) {
		// 해당 map의 원하는 value 값 반환
		return m_Map.find(key)->second;
	}

private:

	static KeyMapper* Instance;

	// unordered_map의 사용법에 주의하자.
	// 내부적으로 pair 객체로 구현되어 있다.
	unordered_map<char, int> m_Map;

	KeyMapper() {
		m_Map.insert({ '1', 0x31 });
		m_Map.insert({ '2', 0x32 });
		m_Map.insert({ '3', 0x33 });
		m_Map.insert({ '4', 0x34 });
		m_Map.insert({ '5', 0x35 });
		m_Map.insert({ '6', 0x36 });
		m_Map.insert({ '7', 0x37 });
		m_Map.insert({ '8', 0x38 });
		m_Map.insert({ '9', 0x39 });
	}

};

KeyMapper* KeyMapper::Instance = nullptr;

{% endhighlight %}

<br>
<hr>
<h2>Calculator.h 작성</h2>

계산기의 작동로직은 Calculator.h에 작성했는데, 백준에서 풀었던 1918번 중위 표기식을 후위 표기식으로 

고치는 로직과, 후위 표기식을 파싱해 결과 값을 내 놓는 코드를 작성했다.

{% highlight cpp %}

#include "Calculator.h"

using namespace std;

// 중위 표기식을 후위 표기식으로 바꿔 반환하는 함수
string Calculator::InfToPost(string infixStr) {

	stack<char> stk;
	string ret = "";

	for (int i = 0; i < infixStr.size(); i++) {

		// 우선순위 1
		if (infixStr.at(i) == '*' || infixStr.at(i) == '/') {

			while (!stk.empty() && (stk.top() == '*' || stk.top() == '/')) {
				cout << stk.top();
				stk.pop();
			}
			stk.push(infixStr.at(i));
		}

		// 우선순위 2
		else if (infixStr.at(i) == '+' || infixStr.at(i) == '-') {

			while (!stk.empty() && stk.top() != '(') {
				cout << stk.top();
				stk.pop();
			}
			stk.push(infixStr.at(i));
		}

		// 우선순위 3
		else if (infixStr.at(i) == '(') {
			stk.push('(');
		}

		// 우선순위 4
		else if (infixStr.at(i) == ')') {

			while (stk.top() != '(') {

				cout << stk.top();
				stk.pop();

			}
			stk.pop();
		}

		// 그 외 
		else {
			cout << infixStr.at(i);
		}
	}
	while (!stk.empty()) {
		ret += stk.top();
		stk.pop();
	}
}

int Calculator::parsingPost(string postfixStr) {

	stack<char> stk;
	
	int loop = postfixStr.size();

	for (int i = 0; i < loop; i++) {
		// 연산자를 만난 경우 스택에서 피연산자 2개를 꺼내 연산을 수행한다 
		if (postfixStr.at(i) == '*' || postfixStr.at(i) == '/' || postfixStr.at(i) == '+' || postfixStr.at(i) == '-') {
			if (stk.empty()) {
				// 에러 처리
			}
			int operand1 = stk.top();
			stk.pop();
			int operand2 = stk.top();
			stk.pop();
			stk.push(binaryOpEval(postfixStr.at(i), {operand1, operand2}));
		}
	}
}

int Calculator::binaryOpEval(char op, pair<int, int> operand) {
	switch (op) {
		case '+':
			return operand.first + operand.second;
		case '-':
			return operand.first - operand.second;
		case '*':
			return operand.first * operand.second;
		case '/':
			return operand.first / operand.second;
	}
}

{% endhighlight %}