function search(arr,target){
    var right = arr.length-1
    var left = 0
    while(left <= right){
        var mid = Math.floor((left+right)/2)
        if(arr[mid] === target){
            return mid
        }else{
            if(arr[mid]<target){
                left = mid + 1
            }else{
                right = mid -1
            }
        }
    }
    return -1
}
var a = search([1, 3, 14, 16, 18], 1)
console.log(a)