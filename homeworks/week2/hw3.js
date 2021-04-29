function reverse(str) {
  const arr = [...str]
  let newStr = ''
  for (let i = arr.length - 1; i >= 0; i--) {
    newStr += arr[i]
  }
  console.log(newStr)
}

reverse('hello')
reverse('yoyoyo')
reverse('1abc2')
reverse('1,2,3,2,1')
