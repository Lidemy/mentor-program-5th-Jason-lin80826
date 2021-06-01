## 什麼是 Ajax？
全名是「Asynchronous JavaScript and XML」，意思是『非同步 JavaScript 與 XML』的意思，這邊最重要的就是這個非同步啦，當我們遇到可能要耗非常多時間，或者不穩定的操作，就不能用同步的方式來執行，而是要用非同步。這樣我便可以不需要等待結果回來便直接執行下一行程是，等到結果回來時會透過 callback function 得到我要的資料

## 用 Ajax 與我們用表單送出資料的差別在哪？
ajax在提交、請求、接收時，都是異步進行，網頁不需要刷新，而 form 提交則是會刷新整個頁面，ajax 需要使用 javascript 來實現，form 則是瀏覽器自帶的功能
## JSONP 是什麼？
這是跨來源請求除了 CORS 以外的另外一種方法，全名叫做：JSON with Padding，有些東西是不受同源政策限制的，例如說`<script>`這個標籤，利用`<script>`裡面放資料，並透過 callback function 就可以獲得裡面的資料，
一般來說，Server 通常會提供一個callback的參數讓 client 端帶過去，但如果可以還是用 CORS 會必較好。

## 要如何存取跨網域的 API？
除了上面提過的 JSONP 以外呢，必較常用的方法是就是在 SEVER 端 Response 的 Header 裡面加上Access-Control-Allow-Origin。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
因為跨網域的限制是只有在瀏覽器上才存在，第四周的時候我們是利用 nodeJS 來發送請求，所以沒有這個問題。
