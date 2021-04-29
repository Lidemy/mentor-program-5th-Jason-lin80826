function capitalize(str) {
  const first = str[0]
  const newFirst = first.toUpperCase()
  const newstr = str.replace(/^[a-z]/, newFirst)
  return newstr
}

console.log(capitalize('adick'), capitalize('aick'), capitalize('9hello'))
