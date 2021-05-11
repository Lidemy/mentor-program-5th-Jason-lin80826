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
function solve(lines) {
  const arr = []
  const temp = lines[1].split(' ')
  const obj = temp.reduce((pre, item) => {
    if (Object.prototype.hasOwnProperty.call(pre, item)) {
      pre[item]++
    } else {
      pre[item] = 1
    }
    return pre
  }, {})
  for (const prop in obj) {
    arr.push(obj[prop])
  }
  console.log(Math.max(...arr))
}
solve([
  '10',
  '1 1 2 2 2 3 3 3 4 4'
])
