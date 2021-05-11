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
  const len = Number(lines[1])
  const arr = []
  let sum = 0
  for (let i = 0; i < len; i++) {
    arr[i] = Number(lines[i + 2])
  }
  arr.sort((a, b) => a - b)
  if (arr.length < count) {
    arr.forEach((item) => {
      sum += item
    })
    console.log(sum)
  } else {
    for (let j = arr.length - 1; j >= arr.length - count; j--) {
      sum += arr[j]
    }
    console.log(sum)
  }
}
solve([
  '0',
  '2',
  '1',
  '5'
])
