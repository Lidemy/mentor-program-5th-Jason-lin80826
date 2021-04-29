const request = require('request')

const country = process.argv[2]
const url = `https://restcountries.eu/rest/v2/name/${country}`
request(url, (err, response, body) => {
  if (response.statusCode === 200) {
    const result = JSON.parse(body)
    result.forEach((element) => {
      const { name, capital, currencies, callingCodes } = element
      console.log('============')
      console.log(`國家：${name}`)
      console.log(`首都：${capital}`)
      console.log(`國碼：${currencies[0].code}`)
      console.log(`首都：${callingCodes[0]}`)
    })
  } else {
    console.log('找不到國家資訊')
  }
})
