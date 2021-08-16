``` js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

1. `console.log(1)` 放入 call stack 中並輸出 1 
2. setTimeout 把 `() => {
  console.log(2)
}` 放入 callback Queue 中
3. `console.log(3)` 放入 call stack 中並輸出 3 
4. setTimeout 把 `() => {
  console.log(4)
}` 放入 callback Queue 中
5. `console.log(5)` 放入 call stack 中並輸出 5 
6. 此時 call stack 清空了 `() => {
  console.log(2)
}` 從 callback Queue 放入 call stack 並執行
7. `console.log(2)` 放入 call stack 中並輸出 2 
8. `() => {
  console.log(4)
}` 從 callback Queue 放入 call stack 並執行
9. `console.log(4)` 放入 call stack 中並輸出 4 

所以最後答案為:
```
1
3
5
2
4
```