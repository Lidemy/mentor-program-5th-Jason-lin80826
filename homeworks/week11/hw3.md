## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
1. 雜湊與加密的差別:
雜湊是將輸入透過一連串的演算，將資料轉換成看似亂碼的字串。轉換後的內容，稱作雜湊值(hash sum)，它的特性為，相同的輸入一定會有相同的輸出，也無法透過任何函式或演算法來從輸出逆推輸入，但值得注意的一點，不同的輸入也是有可能有相同的輸出，這個現象就稱為碰撞，但他發生的機率其實極低，碰撞的發生機率，也代表著雜湊函式的好壞。
加密跟解密必須要有金鑰（Key）才能進行。以最簡單的 凱薩加密法 來說，他加密的方式就是把每個英文字母加上一個 偏移量，這個偏移量就是用來執行加解密的 Key，也就是說加密這個行為是可逆的，這大概是我目前所知道雜湊跟加密的差異。

2. 為什麼密碼要雜湊過後才存入資料庫:
因為如果資料庫中使用者的密碼都是存明碼的話，一但駭客成功入侵資料庫，獲得了使用者的資料，假設有個使用者的密碼為 `123` 他有可能其他的平台的帳號密碼也同樣是這組，所以它其他平台也都瞬間變得不安全，但如果今天密碼經過雜湊後，駭客基本上是無法從雜湊後的資料回推使用者的密碼的，就相對上安全許多。

## `include`、`require`、`include_once`、`require_once` 的差別
include 跟 require 的功能基本上一樣，加上once可以防止進行重複引入檔案時，造成多次重覆讀取而使得常數或自訂函數重複定義的情形。
另外include()提供有回傳值（return）的功能但是require()函數並不容許有回傳值，若引入檔的程式中有誤，譬如整個引入檔的儲存位置錯誤或根本就不存在，如果使用require()函數來進行引入檔案的引入時，會直接停止程式的執行；若使用的是include()函數，則會先產生警告訊息並忽略錯並繼續執行後續的程式。

## 請說明 SQL Injection 的攻擊原理以及防範方法
SQL Injection 就是指 SQL 語法上的漏洞，藉由特殊字元，改變語法上的邏輯，假設我今天有個 SQL 語法如下
`select * from members where account='$name' and password='$password'`
那如過有人輸入的的帳號是 `' or 1=1 /*`，那 SQL 就會變成
`select * from members where account='' or 1=1 /*' and password=''`。
因為「`/*`」在 MySQL 語法中代表註解的意思，所以「/*」後面的字串通通沒有執行，而這句判斷式「1=1」永遠成立，駭客就能登入此網站成功

####防範方法:
因為我只會 PHP 的，以下用 PHP 舉例:
```
$stmt = $conn -> prepare("select * from members where account='$name' and password='$password");
$stmt -> bind_param("ss", $account, $password);
$stmt -> execute();
```
重點應該是在這句 prepare()，Prepared Statement或參數化查詢是一種用於資料庫查詢時的技術，使用時會在 SQL 指令中需要填寫數值的地方用參數代替。使用時，資料庫伺服器不會把設參數的地方當作 SQL 指令的一部分來處理，而是先在資料庫編譯完後，再將參數套用並執行這樣就避免了 SQL Injection 拼字串的方式更改你的邏輯。

##  請說明 XSS 的攻擊原理以及防範方法

XSS 全名為 Cross-Site-Scripting，利用 input 欄位可以輸入內容的特性，只要使用者輸入特別的 JS 語法，且網頁有 輸出此內容 的時候，就可以竄改網頁或竊取資料。例如說今天有個留言板，留言後內容會被瀏覽器解析出來並顯示，那如果今天我輸入的留言內容為`<script>alert('123')</script>`，那他就會被當成一個腳本並且執行，網頁就會跳出 123 這個視窗，如果執行的腳本是偷取資料的，那使用者的資安便會有危險。

####防範方法:
過濾或替換特殊字元，例如 PHP 的 htmlentities() 跟 htmlspecialchars()，使特殊字元可以正確的被解析。
## 請說明 CSRF 的攻擊原理以及防範方法

CSRF 是一種 Web 上的攻擊手法，全稱是 Cross Site Request Forgery，跨站請求偽造。假設今天有個轉帳的網址叫做`https://transfer?to_user=huli&money=100`，發送請求便會給 huli 100 元，如果使用者在沒有登出的情況下點了另外一個網頁他的 html 中有一個圖片的標籤為`<img src="https://transfer?to_user=jason&money=1000" />`，由於使用者再會轉帳的這個網站中並沒有登出，所以瀏覽器的 cookie 依然保有著他的 SESSION_ID 當他瀏覽了有上述 img 標籤的網站，瀏覽器所發出的 request 是會通過後端的驗證的，便會在不知情的情況下變成轉給 jason 1000元，如果改用 POST 方法一樣可以用一個 FORM 表單來達到相同效果。

####防範方法:
1. 加上圖形驗證碼、簡訊驗證碼
2. 加上 CSRF token :
假設你的 server 支持 cross origin 的 request，會發生什麼事呢？攻擊者就可以在他的頁面發起一個 request，順利拿到這個 csrf token 並且進行攻擊
3. same site cookie: 
瀏覽器驗證是否從同一個 site 發出的 request，如果不是就不會帶上 Cookie
