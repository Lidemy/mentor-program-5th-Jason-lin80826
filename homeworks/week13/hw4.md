## Webpack 是做什麼用的？可以不用它嗎？
它是一個「打包工具」。將眾多模組與資源打包成一包檔案，並編譯我們需要預先處理的內容，變成瀏覽器看得懂的東西，讓我們可以上傳到伺服器。我認為主要就是模組化這個概念，可以更容易的把功能給分出來，就像是一台相機有著鏡頭、記憶卡、電池、各種按鈕等，如果有其中一個部件損壞或是需要更新的話，針對單一部件即可，讓我們方便組織與管理。


除此之外他還有著以下功能
1. 在前端中使用其他人開發好的 NPM 套件。
2. 使用 ES6 以上許多方便的 JavaScript 語法。
3. 使用 SCSS、less 這些 CSS 預處理器來寫 CSS。
4. 將各種類型的檔案（圖片、CSS）引入 JavaScript 中。

如果不用 webpack 也是可以的，但缺點就是當專案越來越大的時候，一個 js 的檔案可能就有上萬行，當需要維護時就會非常困難，或是可以自己來做打包的工作，但目前的我應該是沒有辦法，還是用別人的就好了~

## gulp 跟 webpack 有什麼不一樣？
gulp 是基於任務來作流程管理的像是以下的例子

```gulp.task('dev', function () { // 這個任務的名稱是 dev gulp
.src('src/js/*.js') // 找到src/js/ 目錄下的所有js 
.pipe(concat('all.js')) // 對其進行合併並且命名為all.js
.pipe(uglify()) // 壓縮 
.pipe(rename('all.min.js')) // 重命名 
.pipe(gulp.dest('dist/js/')); // 輸出壓縮後的js })
```


而 webpack 的核心是打包與模組化，可以透過 loader 載入圖片或是 css，或是可以更方便的管理其他人開發好的套件。

## CSS Selector 權重的計算方式為何？

#### CSS 的權重值的表示通常為（ID, class, element)，也就是：
element selector ( 0 ,0, 1)
class selector ( 0, 1, 0)
ID selector ( 1, 0, 0)
``` css
  h1 {color: red}            /*權重值(0, 0, 1)*/
  body h1 {color: green}     /*權重值(0, 0, 2)*/
  h1.special { color: blue}  /*權重值(0, 1, 1)*/
  #uniq{ color: orange}      /*權重值(1, 0, 0)*/
```
權重值( 1, 0, 0) > 權重值( 0, 1, 1) > 權重值( 0, 0, 2) > 權重值( 0, 0, 1)
所以最後是由ID選擇器勝出，而顯示橘色。

如果權重值相同的話，則是由後宣告的樣式蓋過前面的
#### 行內樣式與 !important
* 行內樣式宣告 所謂行內樣式就是直接寫在 html 裡面的，例如:
``` html
  <body>
  	<h1 style="color: pink;" class="special" id="uniq">I am an H1</h1>
  </body>
```
行內樣式宣告的權重是大於選擇器的權重值的。
* !important有點像是打破了選擇器的層級概念，通常會避免這樣的做法，因為若想用其它方式蓋掉是沒辦法的。!important的語法是寫在樣式聲明列的後面，但要在結束符;分號之前。!important的權重就是最大的。


參考資料
1. https://kknews.cc/code/3vm94o3.html
2. https://ithelp.ithome.com.tw/articles/10221486