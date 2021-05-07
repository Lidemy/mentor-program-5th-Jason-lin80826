const request = require('request')

function search(country) {
  request(`https://restcountries.eu/rest/v2/name/${country}`, (err, response, body) => {
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
}
search(process.argv[2])
