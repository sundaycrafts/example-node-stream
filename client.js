const {default: axios} = require('axios')
const fs = require('fs')

const request = axios.create({
  baseURL: 'http://localhost:9090',
  responseType: 'stream'
})

const dispatchRequest = async () => {
  const {status, data} = await request.get(`/`)

  if (status !== 200) {
    console.log(`The error occurred. Response code: ${status}`)
    return
  }

  data.pipe(fs.createWriteStream('result.json'))
}

dispatchRequest()
