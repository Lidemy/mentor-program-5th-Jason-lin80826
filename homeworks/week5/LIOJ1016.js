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
  const count = Number(lines[0])
  for (let i = 1; i < lines.length; i++) {
    arr[i - 1] = lines[i]
  }
  const a = arr.filter((item) => item === 'A').length
  const b = arr.filter((item) => item === 'B').length
  if (a === b || count === 1 || a === 0 || b === 0) {
    console.log('PEACE')
    return
  }
  if (a > b) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] === 'B') {
        console.log(j + 1)
      }
    }
  } else {
    for (let k = 0; k < arr.length; k++) {
      if (arr[k] === 'A') {
        console.log(k + 1)
      }
    }
  }
}
solve([
  '5',
  'A',
  'B',
  'B',
  'A',
  'B'
])
