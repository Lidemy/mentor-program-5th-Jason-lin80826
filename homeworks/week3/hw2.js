const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
})

const lines = []

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', (line) => {
  lines.push(line)
})

// 輸入結束，開始針對 lines 做處理
rl.on('close', () => {
  solve(lines)
})

// 上面都不用管，只需要完成這個 function 就好，可以透過 lines[i] 拿取內容
function solve(lines) {
  const temp = lines[0].split(' ')
  console.log(temp)
  const a = Number(temp[0])
  const b = Number(temp[1])
  isNarcissistic(a, b)
}
function isNarcissistic(a, b) {
  for (let j = a; j <= b; j++) {
    const c = j.toString()
    const arr = [...c]
    const arrLen = arr.length
    let sum = 0
    if (j < 10) {
      console.log(j)
    } else {
      for (let k = 0; k < arrLen; k++) {
        sum = sum + Math.pow(Number(arr[k]), arrLen)
      }
      if (sum === j) {
        console.log(j)
      }
    }
  }
}
solve('5 200')
