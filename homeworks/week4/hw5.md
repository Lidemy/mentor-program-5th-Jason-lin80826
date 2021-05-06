## 請以自己的話解釋 API 是什麼
我認為 API 就是定義好的交換資料的方法，例如說我今天想要去販賣機買飲料，我就照著投入硬幣，按下想要的飲料的按鈕這個方法，就可以獲得我想要的飲料，這一套就是定義好的交換方式，也就是所謂的 API。


## 請找出三個課程沒教的 HTTP status code 並簡單介紹
502 - Web 伺服器在作為閘道或 Proxy 時收到無效的回應
414 - 要求 URI 太長
305 - 要求的網頁必須透過 Server 指定的 proxy 才能觀看 ( 透過 Location 標頭 )


## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

假設 Base URL: https://restaurant-list.com

| 說明     | Method | path       | 參數                   | 範例             |
|--------|--------|------------|----------------------|----------------|
| 獲取所有餐廳 | GET    | /restaurants     | _limit:限制回傳資料數量           | /restaurants?_limit=5 |
| 獲取單一餐廳 | GET    | /restaurants/:id | 無                    | /restaurants/10      |
| 新增餐廳   | POST   | /restaurants     | name: 餐廳名稱 | 無              |
| 刪除指定餐廳   | DELETE   | /restaurants/:id     | 無 | 無              |
| 更改指定餐廳資訊   | PATCH   | /restaurants/:id     | name: 餐廳名稱 | 無              |