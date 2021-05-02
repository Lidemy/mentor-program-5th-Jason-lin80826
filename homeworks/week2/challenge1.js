function search(arr, target) {
  let right = arr.length - 1
  let left = 0
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] === target) {
      return mid
    } else {
      if (arr[mid] < target) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
  }
  return -1
}
const a = search([1, 3, 14, 16, 18], 16)
console.log(a)
