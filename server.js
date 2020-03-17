const http = require('http')
const fs = require('fs')
const {Transform} = require('stream')
const {Buffer} = require('buffer')

const transformToOneLine = () => new Transform({
  transform(chunk, encoding, done) {
    const matchAllSpacesOnFirstOrNewLines = /^\s*|\n/gm
    this.push(Buffer.from(chunk.toString().replace(matchAllSpacesOnFirstOrNewLines, ''), 'utf-8'))
    done()
  }
})

http.createServer((req, res) => {
  const stream = fs.createReadStream(__dirname + '/random.json', {
    emitClose: true
  })

  res.setHeader('Content-Type', 'application/json')
  stream
    .pipe(transformToOneLine())
    .pipe(res)
}).listen(9090)
