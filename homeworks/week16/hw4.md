``` js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```
this 指向會跟這個函式如何呼叫有關所以直接看函式呼叫的部分，
1. `obj.inner.hello()` 可以看成`obj.inner.hello.call(obj.inner)`所以 this 就是 obj.inner 而 obj.inner.value 就是 2
2. `obj2.hello()` 可以看成`obj2.hello.call(obj2)` 但 obj2 就是 obj.inner，所以這題的 this 還是 obj.inner，value 就是 2
3. `hello()` 可以看成 `hello.call(windows)`，所以這邊的 this 就是 windows，但 windows下並沒有 value 這個變數所以輸出 undefined
```
2
2
undefined
```