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
  const count = Number(lines[0])
  let str = ''
  for (let i = 1; i <= count; i++) {
    str += '*'
    console.log(str)
  }
}
solve(['5'])
