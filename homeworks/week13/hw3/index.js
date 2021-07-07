const gameList = document.querySelector('.game__list')
const h2 = document.querySelector('h2')
const btn = document.querySelector('.more')
const streamList = document.querySelector('.list')
let offset = 0
const gameLimit = 5
const limit = 20

init()
async function init() {
  try {
    let response = await getGameList()
    const firstGameName = response.top[0].game.name
    const { top } = response
    top.forEach((game) => {
      const li = document.createElement('li')
      li.innerText = game.game.name
      gameList.appendChild(li)
    })
    await clickGameEvent()
    response = await getGameData(firstGameName)
    const { streams } = response
    appendData(streams, firstGameName)
  } catch (error) {
    console.log(error.message)
  }
}
async function clickGameEvent() {
  gameList.addEventListener('click', async(e) => {
    const gameName = e.target.innerHTML
    if (h2.innerHTML === gameName) return
    try {
      const response = await getGameData(gameName)
      const { streams } = response
      appendData(streams, gameName)
    } catch (error) {
      console.log(error.message)
    }
  })
}
async function getGameList() {
  const response = await fetch(`https://api.twitch.tv/kraken/games/top?limit=${gameLimit}`, {
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': '5nim7hdqglhzm7ueuaygfvg4amxu0u'
    }
  })
  const data = await response.json()
  return data
}

async function getGameData(gameName) {
  if (h2.innerHTML !== '' && h2.innerHTML !== gameName) {
    offset = 0
    streamList.innerHTML = ''
  }
  const response = await fetch(`https://api.twitch.tv/kraken/streams/?limit=${limit}&game=${gameName}&offset=${offset}`, {
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': '5nim7hdqglhzm7ueuaygfvg4amxu0u'
    }
  })
  const data = await response.json()
  return data
}

function appendData(streams, gameName) {
  !streams.length < limit ? btn.style.display = 'block' : btn.style.display = 'none'
  h2.innerHTML = gameName
  for (const stream of streams) {
    const div = document.createElement('div')
    const preimg = stream.preview.medium
    const { logo, status } = stream.channel
    div.innerHTML = `
    <div class="stream">
      <div class="avatar">
        <img src="${preimg}" alt="">
      </div>
        <div class="info">
            <img src="${logo}" alt="">
            <span>
              <p>${status}</p>
              ${stream.channel.display_name}
            </span>
        </div>
    </div>
    `
    streamList.appendChild(div)
  }
  addPlaceholder()
  addPlaceholder()
}
function addPlaceholder() {
  const placeholder = document.createElement('div')
  placeholder.classList.add('stream--place')
  streamList.appendChild(placeholder)
}
btn.addEventListener('click', async() => {
  const placeholders = document.querySelectorAll('.stream--place')
  placeholders.forEach((placeholder) => placeholder.remove())
  offset += 20
  const gameName = h2.innerHTML
  try {
    const response = await getGameData(gameName)
    const { streams } = response
    appendData(streams, gameName)
  } catch (error) {
    console.log(error.message)
  }
})
