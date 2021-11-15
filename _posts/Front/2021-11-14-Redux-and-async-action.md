---
layout: post
title: Redux와 비동기 액션 처리
subtitle: 프론트 면접 질문 정리
author: jopemachine
tags:
  - Frontend
  - Redux
header-img: img/header-img/frontend.jpg
header-mask: 0.3
last-update: November 15, 2021
---

# Redux와 비동기 액션 처리

- 모든 리듀서들은 순수함수이다.

- 상태는 디스패치로만 변경되며, 수정되는 것이 아니라 교체된다. (불변성 개념 참고) 액션이 디스패치 되면 모든 리듀서들에 액션이 넘어가고, 리듀서는 자신이 다뤄야할 액션에 해당하는 코드를 실행하고 바뀐 상태를 스토어에 반영한다.

- Redux state는 갱신 될 때 마다 새로운 객체 (`combineReducers`의 반환 객체)를 리턴해줘야 하는데 리듀서에서 단순히 비동기 코드를 쓰는 식으론 이런 동작을 재현할 수 없음. 그래서 [Redux Three Principles](https://redux.js.org/understanding/thinking-in-redux/three-principles)에선 모든 리듀서가 순수함수여야 한다고 규정하고 있다.

- 그럼 비동기 코드를 특정 액션이 일어날 때 처리할 수 있게 하려면 어떻게 해야 하는가?

- 비동기 처리가 필요한 각 액션들을 `TRY`, `SUCCESS`, `FAIL`로 나눠 놓고, 비동기 액션을 처리하기 위해 `TRY` 액션을 호출했을 때, 리듀서에 들어가기 전 미들웨어에서 비동기 액션을 처리하고 처리된 후 자동으로 `SUCCESS`, `FAIL`에 해당하는 액션들이 디스패치 되게 한 후, 이 부분이 리듀서에서 처리되도록 만들면 문제를 해결할 수 있다.

- 이런 일을 해 주는 대표적인 오픈소스 미들웨어엔 `redux-thunk`, `redux-saga`가 있다.

## redux-thunk

- `thunk`의 의미는 함수애 의해 반환된 함수이다. (아래 Related links 참고)

- redux store 객체의 `dispatch`, `getState` 메서드를 함수 인자로 넘겨주는 식으로 굉장히 심플하게 구현되어 있다. 아래 코드가 `redux-thunk`의 코드이다.

```js
const thunkMiddleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    // 이 미들웨어는 액션이 함수인 경우만 처리함
    if (typeof action === 'function') {
      // 해당 함수를 호출함. 인자는 dispatch, getState로 가정.
      return action(dispatch, getState)
    }

    // 액션이 함수 형태라 아니라면 다음 미들웨어로 넘김.
    return next(action)
  }
```

- 구현을 보면 알겠지만, 비동기 형태로 처리할 action은 함수 형태로 넘겨주게 한다. 원래 action은 `plain object` 여야만 하도록 되어 있으니 여기에 function이 넘어오면 redux-thunk에서 처리할 비동기 액션이라고 가정할 수 있는 것이다.

- 사용자 입장에서 코드를 써 보면 아래와 같이 쓸 수 있다.

```js
function fetchData(someValue) {
  return async (dispatch, getState) => {
    // TRY 액션 디스패치
    dispatch(requestStarted())

    let response

    try {
      response = await myAjaxLib.post('/someEndpoint', { data: someValue })
    } catch (error) {
      // FAIL 액션 디스패치
      dispatch(requestFailed(error.message))
      return
    }

    // SUCCESS 액션 디스패치
    dispatch(requestSucceeded(response.data))
  }
}

...
// thunk (함수가 리턴한 함수!)를 디스패치 함으로써 redux-thunk에서 fetchData를 실행
dispatch(fetchData(someValue))
```

- 결론적으로 redux-thunk는 액션을 함수 형태로 디스패치 함으로써 비동기 문제를 해결한다.

## redux-saga

- redux-saga는 아예 다른 방법으로 접근한다. action이 plain object여야 한다는 가정을 깨지 않고, 특정 액션들을 받아들이는 스레드를 만든다. (스레드처럼 동작하도록 만든다)

- 제네레이터 문법을 사용하기 때문에 진입 장벽이 어느 정도 있을 수 있다.

```js

import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from '...'

function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      // SUCCESS 액션을 디스패치한다.
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      // FAIL 액션을 디스패치한다.
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

function* mySaga() {
  // TRY 액션의 디스패치를 받아온다.
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

// 스레드처럼 동작하는 Saga를 만든다.
function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}

export default mySaga;
```

## 비교

- `redux-thunk`와 달리 `redux-saga`는 마치 스레드처럼 동작하기 때문에 특정 Action을 watching해 코드를 중지하거나 계속 실행하는 등 보다 구체적인 제어가 가능하다.

- 사용하는 입장에선 `TRY`, `SUCCESS`, `FAIL` 액션들을 만들어 놓고 비슷하게 쓸 수 있으나 미들웨어의 구현은 굉장히 다름.

- `saga`의 의미는 `Saga 패턴`에서 온 것이라고 함.

## Related links

- [redux-thunk에서 thunk의 의미](https://daveceddia.com/what-is-a-thunk/)

- [리듀서가 순수함수여야만 하는 이유](https://usecode.pw/why-redux-need-reducers-to-be-pure-functions/)