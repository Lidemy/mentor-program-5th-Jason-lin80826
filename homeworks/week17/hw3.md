## 什麼是 MVC？
#### Model
Model 常譯為「模型」，負責和資料庫溝通。這裡我們要先注意：應用程式和資料庫是兩個不同的東西，在應用程式裡想要做「新增/瀏覽/修改/刪除」的動作，就需要先有 Model 層幫忙去資料庫裡取出必要的資料，把資料放進應用程式裡的某個程式物件，然後才能用 JavaScript 去操作該物件。
#### View
View 常譯為「視圖」，View 所管理的功能層叫作「表現層 (presentation layer)」，顧名思義是負責管理畫面的呈現，也就是 HTML 樣板 (template)。

在開發框架裡，因為 HTML template 會有需要以動態顯示資料的情況 (也就是由 Model 取出的資料內容)，所以 View 會再進一步運用樣板引擎 (template engine) 將資料帶入 template。我們很快就會在實作中看到相關細節。

#### Controller
Controller 常譯為「控制器」，它掌握使用者互動邏輯，也是應用程式收發 request/response 的核心。來自路由的 request 會先被送到 Controller，再由 Controller 通知 Model 調度資料，並且把資料傳遞給 View 來產生樣板 (template)，並將呈現資料的 HTML 頁面回傳給客戶端。

你可以把 Controller 想做是 MVC 架構的中間人，它決定了應用程式的工作流程 (workflow)，並且蒐集不同元件的工作結果，統一回傳給使用者。以下常見的設計問題，會由 Controller 來控制：

1. 使用者是否需要先登入 (認證) 才可以看到網頁內容？
2. 使用者是否只能閱讀資料，但不能修改或刪除？
3. 使用者新增了資料之後，會重新導向至哪個頁面？

## 請寫下這週部署的心得

這周我是使用 heroku 部屬，相較於之前 14 周的部屬簡單了許多，先把資料夾用 git 管理，註冊好帳號後，安裝好 heroku 的 cli 並且登入創建一個新的 app 後安裝 clearDB 就可以在 heroku 看到我的 app 了 ，然後在修改我們專案中的 port， package.json 還有 config 檔案 ，都好了就先用 git commit 之後可以 Push 到 heroku 上面了喔，真的是非常的方便，但之後還是會研究一下如何部屬到自己的主機上面，感覺又是一段好長的路阿~

## 寫 Node.js 的後端跟之前寫 PHP 差滿多的，有什麼心得嗎？
用 Node.js 寫對我來說最大的優點就是語法比較熟悉，用 PHP 的時候基本上除了老師影片教過的那些，其他的幾乎都很不熟悉，所以寫起來有些綁手綁腳的，而且這次有用上 express 這個框架以及 Sequelize 來取代之前 SQL Query 的寫法，連一些資安方面的問題都幫我們解決了，真的是讚讚，最後 MVC 這個大名鼎鼎的名詞終於在這次的作業中實做了，Model，View，Controller 把各自的責任分得很清楚，寫起來感覺特別的開心，如果之後有 Bug 應該也會比較好找，蠻開心這周的作業有把它做出來的。

參考資料:
[MVC架構是什麼?](https://tw.alphacamp.co/blog/mvc-model-view-controller)