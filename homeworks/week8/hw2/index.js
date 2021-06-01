const gameList = document.querySelector('.game__list')
const h2 = document.querySelector('h2')
const btn = document.querySelector('.more')
const place1 = document.createElement('div')
const place2 = document.createElement('div')
const streamList = document.querySelector('.list')
let offset = 0
let placeholder = 0
getGameList()
function getGameList() {
  const limit = 5
  const request = new XMLHttpRequest()
  request.open('get', `https://api.twitch.tv/kraken/games/top?client_id=5nim7hdqglhzm7ueuaygfvg4amxu0u&limit=${limit}`)
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request.send(null)
  request.onload = function() {
    if (this.readyState === 4 && this.status === 200) {
      const games = JSON.parse(request.responseText)
      for (let i = 0; i < limit; i++) {
        const li = document.createElement('li')
        li.innerText = games.top[i].game.name
        gameList.appendChild(li)
      }
      gameList.addEventListener('click', (e) => {
        const gameName = e.target.innerHTML
        if (h2.innerHTML === gameName) {
          return
        }
        getGameData(gameName)
      })
    }
  }
}

function getGameData(gameName) {
  if (h2.innerHTML !== '' && h2.innerHTML !== gameName) {
    offset = 0
    streamList.innerHTML = ''
  }
  const limit = 20
  const request = new XMLHttpRequest()
  console.log(offset)
  request.open('get', `https://api.twitch.tv/kraken/streams/?client_id=5nim7hdqglhzm7ueuaygfvg4amxu0u&limit=${limit}&game=${gameName}&offset=${offset}`)
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request.send(null)
  request.onload = function() {
    const { streams } = JSON.parse(request.response)
    appendData(streams, gameName)
    if (h2.innerHTML !== '') {
      btn.style.display = 'block'
    }
  }
}

function appendData(streams, gameName) {
  h2.innerHTML = gameName
  for (const stream of streams) {
    const div = document.createElement('div')
    const preimg = stream.preview.medium
    const { logo } = stream.channel
    div.innerHTML = `
    <div class="stream">
      <div class="avatar">
        <img src="${preimg}" alt="">
      </div>
        <div class="info">
            <img src="${logo}" alt="">
            <span>
              <p>${stream.channel.status}</p>
              ${stream.channel.display_name}
            </span>
        </div>
    </div>
    `
    streamList.appendChild(div)
  }
  place1.innerHTML = `
  <div class="stream--place"></div>
  `
  place2.innerHTML = `
  <div class="stream--place"></div>
  `
  console.log(placeholder)
  if (placeholder === 0) {
    console.log(789)
    streamList.appendChild(place1)
  } else if (placeholder === 1) {
    streamList.appendChild(place1)
    streamList.appendChild(place2)
  } else if (placeholder === 2) {
    place1.innerHTML = ''
    place2.innerHTML = ''
  } else if (placeholder === 3) {
    streamList.appendChild(place1)
  }
}
btn.addEventListener('click', () => {
  offset += 20
  placeholder++
  placeholder %= 4
  const gameName = h2.innerHTML
  getGameData(gameName)
})
