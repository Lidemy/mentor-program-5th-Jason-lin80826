const box = document.querySelector('.img-list')
const next = document.querySelector('.next')
const prev = document.querySelector('.prev')
const pointers = document.querySelectorAll('.pointer a')
const carousel = document.getElementById('switch')
let index = 0
let clickIndex = 0
if (index === 0) {
  prev.style.display = 'none'
}
window.addEventListener('load', () => {
  autotimer()
})
function autotimer() {
  window.timer = setInterval(() => {
    move(box, -1226 * (index + 1), true, () => { changeStyle(true) })
    index++
  }, 3000)
}
function move(obj, target, boolen, callback) {
  clearInterval(obj.timer)
  let leftmove
  if (typeof boolen === 'boolean') {
    leftmove = boolen ? -1226 : 1226
  } else {
    leftmove = (clickIndex - index) * -1226
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
    for (let i = 0; i < pointers.length; i++) {
      pointers[i].className = ''
    }
    pointers[index].className = 'active'
  } else {
    for (let i = 0; i < pointers.length; i++) {
      pointers[i].className = ''
    }
    pointers[clickIndex].className = 'active'
    index = clickIndex
  }
  if (index !== 0) {
    prev.style.display = 'block'
  } else {
    prev.style.display = 'none'
  }
}
next.onclick = () => {
  clearInterval(window.timer)
  move(box, -1226 * (index + 1), true, () => { changeStyle(true) })
  index++
}
prev.onclick = () => {
  clearInterval(window.timer)
  move(box, -1226 * (index - 1), false, () => { changeStyle(true) })
  index--
}
for (let i = 0; i < pointers.length; i++) {
  pointers[i].addEventListener('click', () => {
    clickIndex = i
    move(box, -1226 * clickIndex, clickIndex, () => { changeStyle(false) })
  })
}
carousel.onmouseover = () => {
  clearInterval(window.timer)
}
carousel.onmouseout = () => {
  autotimer()
}
