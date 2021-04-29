function join(arr, concatStr) {
  let newStr = ''
  for (let i = 0; i < arr.length; i++) {
    if (i === arr.length - 1) {
      newStr += arr[i]
    } else {
      newStr += arr[i] + concatStr
    }
  }
  return newStr
}

function repeat(str, times) {
  let newStr = ''
  for (let i = 0; i < times; i++) {
    newStr += str
  }
  return newStr
}

console.log(join(['a'], '!'))
console.log(repeat('ab', 7))
console.log(repeat('yoyo', 2))
console.log(join([1, 2, 3], ''))
console.log(join(['a', 'b', 'c'], '!'))
console.log(join(['a', 1, 'b', 2, 'c', 3], ','))
