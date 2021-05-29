const box = document.querySelector('.img-list')
const next = document.querySelector('.next')
const prev = document.querySelector('.prev')
const pointers = document.querySelector('.pointer')
const pointerNode = document.querySelectorAll('.pointer a')
const carousel = document.getElementById('switch')
const width = 1226
let index = 0
let clickIndex = 0
let isLoading = false
if (index === 0) {
  prev.style.display = 'none'
}
window.addEventListener('load', () => {
  autotimer()
})
function autotimer() {
  window.timer = setInterval(() => {
    move(box, -width * (index + 1), true, () => { changeStyle(true) })
    index++
  }, 3000)
}
function move(obj, target, boolen, callback) {
  if (isLoading) return
  isLoading = true
  let leftmove
  if (typeof boolen === 'boolean') {
    leftmove = boolen ? -width : width
  } else {
    leftmove = (clickIndex - index) * -width
  }
  obj.timer = setInterval(() => {
    const letpersec = leftmove / 10
    const currentLeft = box.offsetLeft
    let nowLeft = currentLeft + letpersec
    if ((nowLeft > target && leftmove > 0) || (nowLeft < target && leftmove < 0)) {
      nowLeft = target
    }
    if (nowLeft === target) {
      clearInterval(obj.timer)
      if (nowLeft <= -6130) {
        nowLeft = 0
        index = 0
      }
      callback && callback()
    }
    box.style.left = `${nowLeft}px`
  }, 50)
}
function changeStyle(auto) {
  if (auto) {
    for (let i = 0; i < pointerNode.length; i++) {
      pointerNode[i].className = ''
    }
    pointerNode[index].className = 'active'
  } else {
    for (let i = 0; i < pointerNode.length; i++) {
      pointerNode[i].className = ''
    }
    pointerNode[clickIndex].className = 'active'
    index = clickIndex
  }
  if (index !== 0) {
    prev.style.display = 'block'
  } else {
    prev.style.display = 'none'
  }
  isLoading = false
}
next.onclick = () => {
  clearInterval(window.timer)
  index %= 5
  if (isLoading) return
  move(box, -width * (index + 1), true, () => { changeStyle(true) })
  index++
}
prev.onclick = () => {
  if (isLoading) return
  clearInterval(window.timer)
  move(box, -width * (index - 1), false, () => { changeStyle(true) })
  index--
  if (index < 0) {
    index = 4
  }
}
pointers.addEventListener('click', (e) => {
  const pointer = [...pointerNode]
  clickIndex = pointer.indexOf(e.target)
  move(box, -width * clickIndex, clickIndex, () => { changeStyle(false) })
})
carousel.onmouseover = () => {
  clearInterval(window.timer)
}
carousel.onmouseout = () => {
  autotimer()
}
