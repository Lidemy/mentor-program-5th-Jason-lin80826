``` js
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```
1. 編譯階段：

```js
global EC
global VO {
    fn: function
    a: undefined
}
```
2. 執行階段：
3. a 賦值為 1
```js
global EC
global VO {
    fn: function
    a: 1
}
```
4. 呼叫fn 並且初始化
```js
fn EC
fn AO {
    fn2: function
    a: undefined
}
global EC
global VO {
    fn: function
    a: 1
}
```
5. `console.log(a)`，此時的 fn AO 中的 a 是 undefined 所以輸出 undefined
6. a 賦值為 5
```js
fn EC
fn AO {
    fn2: function
    a: 5
}
global EC
global VO {
    fn: function
    a: 1
}
```
7. `console.log(a)` 此時的 fn AO 中的 a 是 5 所以輸出 5
8. a++ 所以 a 的值為 6
9. var a 由於 a 沒有要賦值所以不理它
10. 呼叫 fn2 並且初始化
```js
fn2 EC
fn2 AO {
}
fn EC
fn AO {
    fn2: function
    a: 6
}
global EC
global VO {
    fn: function
    a: 1
}
```
11. `console.log(a)`，由於 fn2 AO 中沒有 a 所以往上找，找到在 fn AO 中的 a 為 6 所以以輸出 6
12. 由於 fn2 AO 中沒有 a 所以往上找，找到在 fn AO 中的 a 賦值為 20
13. 由於 fn2 AO 中沒有 b 所以往上找，在 fn AO 中也沒有，再往上找，在 global VO 中也沒有，所以在非嚴格模式下新增 b 這個變數並且賦值為 100
```js
fn2 EC
fn2 AO {
}
fn EC
fn AO {
    fn2: function
    a: 20
}
global EC
global VO {
    fn: function
    a: 1
    b: 100
}
```
14. fn2 執行完畢並 pop off
15. `console.log(a)`此時的 fn AO 中的 a 是 20 所以輸出 20
16. fn 執行完畢並 pop off
```js 
global EC
global VO {
    fn: function
    a: 1
    b: 100
}
```
17. `console.log(a)`此時的 global VO 中的 a 是 1 所以輸出 1
18. a 賦值為 10
```js 
global EC
global VO {
    fn: function
    a: 10
    b: 100
}
```
19. `console.log(a)`此時的 global VO  中的 a 是 10 所以輸出 10
20. `console.log(b)`此時的 global VO  中的 b 是 100 所以輸出 100
```js
undefined
5
6
20
1
10
100
```