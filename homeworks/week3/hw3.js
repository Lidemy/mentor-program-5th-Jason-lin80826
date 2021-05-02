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
  const arr = []
  for (let i = 1; i <= count; i++) {
    arr.push(Number(lines[i]))
  }
  for (let j = 0; j <= arr.length - 1; j++) {
    const number = arr[j]
    console.log(isPrime(number))
  }
}
function isPrime(number) {
  if (number === 1) return 'Composite'
  if (number === 2) return 'Prime'
  for (let k = 2; k < number; k++) {
    if (number % k === 0) {
      return 'Composite'
    }
  }
  return 'Prime'
}
