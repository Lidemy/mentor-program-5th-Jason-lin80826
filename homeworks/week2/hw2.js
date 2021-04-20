function capitalize(str) {
    var first = str[0]
    var newFirst = first.toUpperCase()
    newstr = str.replace(/^[a-z]/,newFirst)
    return  newstr
}

console.log(capitalize('adick'),capitalize('aick'),capitalize('9hello'));
