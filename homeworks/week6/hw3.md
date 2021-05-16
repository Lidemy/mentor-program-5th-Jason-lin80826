## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
1. `<video>` 用於文檔中嵌入媒體撥放器
2. ` <audio> `元素用於嵌入音頻的內容
3. `<q>` 指示一段元素內的文字，屬於行內引文

## 請問什麼是盒模型（box modal）
CSS盒模型本質上是一個盒子，封裝周圍的HTML元素，它包括：外邊距（margin）、邊框（border）、內邊距（padding）、實際內容（content）四個屬性。
 ### content-box
CSS盒模型：標準模型 + IE模型
![Alt text](https://pic1.zhimg.com/80/v2-ad08059be04698f8a70d2729cea8ec18_720w.jpg)

### border-box
![Alt text](https://pic3.zhimg.com/80/v2-d755200d4f64ca2463b75375a2b47d26_720w.jpg)

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
#### 1. inline: 
(1) 元素可在同一行內呈現，圖片或文字均不換行，也不會影響其版面配置
(2) 不可設定長寬，元素的寬高由它的內容撐開
#### 2. block:
(1) 元素寬度預設會撐到最大，使其占滿整個容器
(2) 可以設定長寬/margin/padding，但仍會占滿一整行    
#### 3. inline-block:
(1) 以inline的方式呈現，但同時擁有block的屬性
(2) 可設定元素的寬高/margin/padding
(3) 可水平排列
## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
1. static:預設的定位方式
2. relative:根據現在排版流的位置進行行定位
3. absolute: 會先往父元素尋找第一個不是 static 的元素來定位 
4. fixed: 會根據 viewport 來定位