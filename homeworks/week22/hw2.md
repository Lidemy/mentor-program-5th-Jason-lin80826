## 請列出 React 內建的所有 hook，並大概講解功能是什麼
1. useState
```js
   const [count, setCount] = useState(0);
```
useState 用來加入一些 local state,useState 唯一的 argument 是初始狀態，陣列的第一個 item 是 state 的名字，第二個則是改變它的函式

2. useEffect
```js
    useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  },[]);
```
當你呼叫 useEffect 時，你告訴 React 刷新 DOM 變動之後執行你的 「effect」，組件渲染完後才會呼叫 useEffect 內的 function，另外第二個參數稱作 dependencies，它是一個陣列，只要每次重新渲染後 dependencies 內的元素沒有改變，任何 useEffect 裡面的函式就不會被執行！，像這邊如果是空陣列的話，就只會再組件第一次渲染的時候執行

3. useMemo
```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
React.useMemo 讓 React 記住 function 的回傳值，如果 dependencies array 中的變數都沒有被經過修改，React.useMemo 將會沿用上次的回傳值。

4. useCallback
```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
當父元件傳遞的 props 是 Object 時，父元件的狀態被改變觸發重新渲染，Object 的記憶體位址也會被重新分配，因此，React 提供了 React.useCallback 這個方法讓 React 在元件重新渲染時，如果 dependencies array 中的值在沒有被修改的情況下，它會幫我們記住 Object，防止 Object 被重新分配記憶體位址。

5. useContext 
```js
  const value = useContext(MyContext);
```
接收一個 context object（React.createContext 的回傳值）並回傳該 context 目前的值。Context 目前的值是取決於由上層 component 距離最近的 <MyContext.Provider> 的 value prop。

6. uesRef
```js
  const renderCount = useRef(0);  
// renderCount = { current: 0 }
```
useRef 只會回傳一個值，這個值是一個有 current屬性 的 Object 。當更新 current 值並不會觸發 re-render

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點
![生命週期](https://miro.medium.com/max/2256/1*LJvN_m5gZ7w6zT_LrYXUJw.png)

### Lifecycle Methods 可以分為三大類：

1. Mounting - 裝載，當元件被加入到 DOM 中時會觸發
2. Updating - 更新，當元件的 props 或 state 更新，重新渲染 (re-rendered) DOM 時會觸發
3. Unmounting - 卸載，當元件要從 DOM 中被移除時會觸發

#### React 提供有這些 Mounting 階段的方法：

- constructor()
- componentWillMount()
- render()
- componentDidMount()

##### componentWillMount()
componentWillMount() 只會被執行一次，會在元件被掛載到實際的 HTML DOM 之前被呼叫執行。componentWillMount() 會在第一次的 render() 執行之前就先被執行，所以你不能在 componentWillMount() 中做跟 DOM 有關的操作。通常 componentWillMount() 比較少會用到，實用性不大，大部分可以在 componentWillMount() 做的事都可以也更適合在 constructor() 中完成。
由於 componentWillMount 容易被誤解誤用，從 React 17 開始被拿掉。
##### componentDidMount()
componentDidMount() 會在元件被掛載到 DOM 後被執行 - 也就是說元件已經實際存在在畫面中，任何需要 DOM 或會 Asynchronous 更新 state 狀態的操作都適合放在 componentDidMount() 做，像是綁定元件的 DOM 事件，或 AJAX 拉遠端資料來進一步初始化元件。

#### React 提供有這些 Updating 階段的方法：
- shouldComponentUpdate()
- componentWillUpdate()
- componentDidUpdate()
##### shouldComponentUpdate()
  shouldComponentUpdate() 是用來你想最佳化效能 (performance) 時使用，每當 Props 或 State 有更新時，React 會在 call render() 重繪畫面之前，先 call shouldComponentUpdate() 決定是否真的需要 render()。React 雖然會很聰明地自動偵測到 Props 和 State 狀態有改變來自動更新元件 (re-render)，但有些狀況下你可以幫助 React 更精確判斷元件是否真的需要更新，這就是 shouldComponentUpdate() 的功用了。你可以利用 shouldComponentUpdate() 傳進的參數 nextProps, nextState (新的 props 和 state 值) 和當前的 this.props, this.state 來判斷元件資料狀態變化，shouldComponentUpdate() 執行後得返回一個布林值 (Boolean) 來告訴 React 是否需要更新元件，如果返回 false，componentWillUpdate(), render(), componentDidUpdate() 這些 Lifecycole Methods 就不會被執行。
##### componentWillUpdate()
  componentWillUpdate() 會在元件準備更新、執行 render() 之前被執行。
##### componentDidUpdate()
  componentDidUpdate() 會在元件更新完成、執行完 render() 重繪後被執行。而每一次元件更新時，React 確保 componentDidUpdate() 只會被執行一次。
#### React 提供有這些 Updating 階段的方法：
- componentWillUnmount()
##### componentWillUnmount()
當元件將要從 DOM 中被移除之前，React 會執行 componentWillUnmount()，你可以在 componentWillUnmount() 中做資源清理的動作，清除跟這元件有關的任何遺留物，像是清除你在 componentDidMount() 中建立的資源，例如清除 timer、取消 AJAX request、移除 event listener 等。 

## 請問 class component 與 function component 的差別是什麼？
在 react-hooks 出現以前 只有 class component 會有 state 可以使用 state 和擁有 lifecycle ，而 functional component 基本上只負責單純呈現資料，有可能是寫死的資料，或是透過 props 傳來的資訊。
但 hooks 的出現改變了這些事情，
### Class component
- 需繼承React.Component
- 具有生命週期，可以針對某些情境決定是否渲染，ex shouldComponentUpdate()
- 具有state (Stateful component)
- 需要實作render方法
- 擁有this
- 每次都可以拿到最新的this.props，因為this隨時都在變化，
### Functional component
- 沒有生命週期 （React Hook userEffect 出現後，就有生命週期了！）
- 沒有state（Stateless），所以被稱為無狀態組件（但React Hook useState出現後就可以有state了！）
- 可以用arrow function 宣告或是一般的function
- 沒有this
- 編譯更快（因為不用將class轉換成es5
- props會一直是原本傳進來的那個，而不會跟著更新，閉包的概念

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

在 React 中表單元素的處理主要可以分成兩種 Controlled 和 Uncontrolled 這兩種，這裡關於 Controlled 和 Uncontrolled 指的是「資料受不受到 React 所控制」，也就是「受 React 所控制的資料（Controlled）」或「不受 React 所控制的資料（Uncontrolled）」。

#### Controlled Components
因為要將資料交給 React 處理，所以會先透過 useState 來建立保存資料狀態的地方，
#### Uncontrolled Components 
前面有提到 Uncontrolled Components 並不會把資料交給 React 管理，而是自己選到該元素後去從該 DOM 元素中把值取出來。在 React 中若想要選取到某一元素時，就可以使用 useRef 這個 React Hooks。

參考資料:
[React 性能優化那件大事，使用 memo、useCallback、useMemo](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-optimize-performance-using-memo-usecallback-usememo-a76b6b272df3)
[React Hook 筆記 useRef](https://medium.com/hannah-lin/react-hook-%E7%AD%86%E8%A8%98-useref-c628cbf0d7fb)
[React lifeCycle 生命週期](https://www.fooish.com/reactjs/component-lifecycle.html#mounting-lifecycle-methods)
[React 中的表單處理（Controlled vs Uncontrolled）以及 useRef 的使用](https://ithelp.ithome.com.tw/articles/10227866)
[React Functional Component 與Class Component的差異](https://medium.com/coding-hot-pot/react-functional-component-v-s-class-component-e46c6dc5a319)
