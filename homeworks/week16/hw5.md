## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。

其實在進入計劃之前就有看過 huli 寫的這幾篇文章，真的是學習 js 的一盞明燈阿，趁著這次機會又再度複習了一次，也把一些以前似懂非懂的部分弄清楚了，這些也會是面試常考的題目，另外關於 event loop 的部分似乎還有一個 macroTask 跟 microTask 必須要自己研究，還有老師提供的 3 題練習題也是十分有趣，可以讓我們把這周學習的東西實際應用上，尤其是第 2 題 debounce 跟 throttle 以後會用到的機會感覺蠻大的?這邊順便附上我的答案

```JS
class Robot {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    getCurrentPosition() {
        const x = this.x
        const y = this.y
        return {x, y}
    }
    go(str) {
        switch (str) {
            case 'N':
                this.y++     
                break;
            case 'E':
                this.x++  
                break;
            case 'S':
                this.y--      
                break;
            case 'W':
                this.x--  
                break;
        }
    }
}

function debounce(fn, delay) {
    let timer
    return function() {
        let args = arguments
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn(...args)
        },delay)
    };
}

function memoize(fn) {
    let obj = {}
    return function(){
        if(!obj.hasOwnProperty(...arguments)){
            obj[arguments[0]] = fn(...arguments)
        }    
        return obj[arguments[0]]
    };
}
```