const request = require('request')

const id = '5nim7hdqglhzm7ueuaygfvg4amxu0u'
const game = process.argv[2]
const limit = 100
function getFirstData() {
  return new Promise((resolve, reject) => {
    request({
      headers: {
        Accept: 'application/vnd.twitchtv.v5+json'
      },
      url: `https://api.twitch.tv/kraken/streams/?client_id=${id}&game=${game}&offset=0&limit=${limit}`
    }, (err, response, body) => {
      if (response.statusCode === 200) {
        const result = JSON.parse(body)
        const { streams } = result
        resolve(streams)
      }
    })
  })
}
function getSecData() {
  return new Promise((resolve, reject) => {
    request({
      headers: {
        Accept: 'application/vnd.twitchtv.v5+json'
      },
      url: `https://api.twitch.tv/kraken/streams/?client_id=${id}&game=${game}&offset=101&limit=${limit}`
    }, (err, response, body) => {
      if (response.statusCode === 200) {
        const result = JSON.parse(body)
        const { streams } = result
        resolve(streams)
      }
    })
  })
}
async function getAllData() {
  let count = 1
  try {
    const first = getFirstData()
    const sec = getSecData()
    const [arr, arr2] = await Promise.all([first, sec])
    arr.forEach((element) => {
      console.log(`${element._id} ${element.channel.status} ${count}`)
      count++
    })
    arr2.forEach((element) => {
      console.log(`${element._id} ${element.channel.status} ${count}`)
      count++
    })
  } catch (error) {
    console.log(error)
  }
}
getAllData()
