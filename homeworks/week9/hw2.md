## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
VARCHAR 可以設置最大長度而 TEXT 不能，而資料的查詢速度 VARCHAR 也比 TEXT 還要快，所以除非你是要儲存不知道長度的資料時才會使用 TEXT，不然大部分會使用VARCHAR。

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？
Cookie 是一個存在本地的小型資料，在 response header 會有一個 set-cookie 而在 request header 中會有一個 Cookie 幫你把 Cookie 的資料帶給伺服器

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？
使用者可以在我們的輸入框輸入一些預期外的文字，例如`<script>alert(1)</script>`瀏覽器便會把它當做腳本來執行，如此一來，有心人便可以在你的網站植入一些惡意的程式，像是偷取帳號密碼，或是 cookie 資料等等。

