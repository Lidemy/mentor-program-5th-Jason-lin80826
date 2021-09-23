## 為什麼我們需要 Redux？

在 React 中，每個 Stateless Component 都必須保持 Pure，意思就是 Input 一樣的 prop 值，呈現出來的 UI 就會是一樣的，這樣的 Component 維護簡單也容易測試。持有 State 的叫做 Smart Component（以下稱 Container），它的任務就是將持有的 State 分派給所有的 Stateless Component。
當專案的規模一大，Container 的數量多，最常碰到的問題就是多個 Container 會需要用到同樣的 State，典型的解法就是 Container 再往上移一層，但久而久之重構次數多，維護成本相對也就高。
Redux 就是處理這樣的問題，將所有的 State 存在 Component 堆疊中的最上層 Store，根據各個 Component 的需要切出資料並往下傳遞，這樣一來 Store 以下的 Component 就幾乎都可以做到 Stateless 了

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

1. Action: 描述一個行為（可能是按下按鈕、輸入文字等），這個行為可能會造成狀態變化，通常 action 會用純物件表示。
2. Reducer: 接收一個行為，並且與 state 計算後回傳下一個 state，是一個純函數。
3. Store: 存放所有狀態的地方，統一透過 store.getState() 拿狀態

![圖片](https://note.pcwu.net/assets/images/2017-03-04-redux-intro-8c335.png)

以上的圖片就是一個簡單的流程：

1. 事件發生： 例如使用者點擊某元件 onclick
2. 發送 action： Action Creator 向 Store 發送 action
   更改 state： Store 調用 Reducer ，給予 state 和 action 而得到新的 state。
3. 發佈通知： 需要用到 state 的元件會向 store 訂閱通知，一但 state 有變化，即會收到通知，可重新取得所需 state，重新渲染元件。

## 該怎麼把 React 跟 Redux 串起來？

#### (1) mapStateToProps

```js
const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    filter: state.filter,
  };
};
```

#### (2) mapDispatchToProps

```js
const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (task) => {
      dispatch(addTask(task));
    },
    editTask: (idx, task) => {
      dispatch(editTask(idx, task));
    },
    deleteTask: (idx) => {
      dispatch(deleteTask(idx));
    },
    toggleTask: (idx) => {
      dispatch(toggleTask(idx));
    },
  };
};

// 接收到props的component可以直接呼叫 this.props.addTask('some tasks');
```

```js
import { connect } from 'react-redux';

const TodoAppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default TodoAppContainer;
```

最後再包上 Provider

```js
ReactDOM.render(
  <Provider store={store}>
    <TodoAppContainer />
  </Provider>,
  document.getElementById('main')
);
```

### 參考資料

1. [為什麼用 Redux](https://medium.com/@tonypai/%E7%82%BA%E4%BB%80%E9%BA%BC%E7%94%A8-redux-why-use-redux-eaeccfbb2006)
2. [Redex 核心概念筆記](https://note.pcwu.net/2017/03/04/redux-intro/)
3. [串接 React 和 Redux](https://ithelp.ithome.com.tw/articles/10187062)
