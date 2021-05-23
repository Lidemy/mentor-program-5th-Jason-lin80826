## 什麼是 DOM？
文件物件模型（Document Object Model, DOM），並定義讓程式可以存取並改變文件架構、風格和內容的方法。DOM 提供了文件以擁有屬性與函式的節點與物件組成的結構化表示。節點也可以附加事件處理程序，一旦觸發事件就會執行處理程序。 

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
![Alt text](https://static.coderbridge.com/img/techbridge/images/huli/event/eventflow.png)
##### 先捕獲，後冒泡，target 則沒有分捕獲還是冒泡，捕獲與冒泡就只是事件傳遞的階段。
## 什麼是 event delegation，為什麼我們需要它？
就是所謂的事件代理，將事件綁訂到父元素上，假如說我們有很多個在此父元素下的子元素都需要同樣的事件監聽，這麼做便可以不用對每一個子元素都綁定事件監聽，也能達到一樣的效果，並可以減少 DOM 操作。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
event.preventDefault() 是阻止某些預設的行為，像是 a 標籤的自動跳轉，或是將表單給 submit 出去，event.stopPropagation()則是阻止事件的傳遞，讓事件不要在往下一個節點傳遞