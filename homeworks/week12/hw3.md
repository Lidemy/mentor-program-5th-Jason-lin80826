## 請簡單解釋什麼是 Single Page Application
單頁面應用程式 Single Page Applications

過去: Multi-Page (多頁式)

![Alt text](http://ithelp.ithome.com.tw/upload/images/20141029/2014102923474354510c1f4a492_resize_600.png)

以前製作網站大多是一個一個頁面切換，點選一個按鈕，重新載入另外一個頁面。

現在: Single-Page (單頁式)

![Alt text](http://ithelp.ithome.com.tw/upload/images/20141029/2014102923513354510d053e402_resize_600.png)

如今隨著Ajax的出現，透過Ajax的技術，不需要重新載入網頁，回應更即時。SPA利用Ajax在背景傳輸完後，再由Javascript Template來產生HTML


## SPA 的優缺點為何

優點:用戶體驗好、快，內容的改變不需要重新加載整個頁面，避免了不必要的跳轉和重複渲染；基於上面一點，SPA 相對對伺服器壓力小；前後端職責分離，架構清晰，前端進行交互邏輯，後端負責數據處理；這樣做的好處是整個業務系統架構清晰，可以單獨開發、測試。

缺點：初次加載耗時較多，需要在加載頁面的時候JavaScript、CSS 統一載入，部分頁面按需加載，SEO 難度較大由於所有的內容都在一個頁面中動態替換顯示，所以在 SEO 上其有著天然的弱勢。



## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？

1. 這種用法可以讓使用者操作時的頁面不會跳轉，可以指更新部分的網頁，體驗比較好，藉由發出 request 接收後端的資料來 render 前端頁面。
2. 如果是之前 php 的作業，新增、刪除、修改、都是利用頁面的跳轉，或是用 form 發出 post 請求，也就是 Server-side render 

參考資料：
1. https://kknews.cc/code/4javbnq.html
2. https://ithelp.ithome.com.tw/articles/10160709