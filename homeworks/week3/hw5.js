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
  for (let i = 1; i <= count; i++) {
    const temp = lines[i].split(' ')
    const A = temp[0]
    const B = temp[1]
    const K = Number(temp[2])
    console.log(compare(A, B, K))
  }
}
function compare(A, B, K) {
  if (A === B) {
    return 'DRAW'
  }
  if (K === -1) {
    const temp = B
    B = A
    A = temp
  }
  const a = A.length
  const b = B.length
  if (a !== b) {
    return a > b ? 'A' : 'B'
  }
  return A > B ? 'A' : 'B'
}
