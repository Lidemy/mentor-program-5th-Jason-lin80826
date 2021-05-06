const request = require('request')

const id = '5nim7hdqglhzm7ueuaygfvg4amxu0u'
const options = {
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json'
  },
  url: `https://api.twitch.tv/kraken/games/top/?client_id=${id}`,
  method: 'GET',
  body: ''
}
request(options, (err, response, body) => {
  if (response.statusCode === 200) {
    const result = JSON.parse(body)
    const data = result.top
    data.forEach((element) => {
      console.log(`${element.viewers} ${element.game.name}`)
    })
  }
})
