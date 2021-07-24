``` js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
1. 進入迴圈
2. i = 0, `console.log('i:'+0)` 放入 call stack 中並輸出 0 後 pop off
3. i = 0,所以 setTimeout 在 0s 後把 `() => {
  console.log(i)
}` 放入 callback Queue 中
4. i = 1, `console.log('i:'+1)` 放入 call stack 中並輸出 i:1 後 pop off
5. i = 1,所以 setTimeout 在 1s 後把 `() => {
  console.log(i)
}` 放入 callback Queue 中
6. i = 2, `console.log('i:'+2)` 放入 call stack 中並輸出 i:2 後 pop off
7. i = 2,所以 setTimeout 在 2s 後把 `() => {
  console.log(i)
}` 放入 callback Queue 中
8. i = 3, `console.log('i:'+3)` 放入 call stack 中並輸出 i:3 後 pop off
9. i = 3,所以 setTimeout 在 3s 後把 `() => {
  console.log(i)
}` 放入 callback Queue 中
10. i = 4, `console.log('i:'+4)` 放入 call stack 中並輸出 i:4 後 pop off
11. i = 4,所以 setTimeout 在 4s 後把 `() => {
  console.log(i)
}` 放入 callback Queue 中
12. i = 5，離開迴圈
13. 此時 call stack 清空
14. 總共有 5 個 callback function 要依序執行，但這些callback 都是執行 console.log(i)，此時的 i = 5
所以最後答案為:
```
i:0
i:1
i:2
i:3
i:4
5
5
5
5
5
```