var fs = require('fs')
var url = require('url')
var concat = require('concat-stream')

fs.createReadStream('./src/lib/oembed-providers.json', 'utf8').pipe(concat(function (body) {
  var hosts = Object.keys(JSON.parse(body)).map(function (s) {
    var tokens = url.parse(s).host.split('.')

    if (tokens.length > 2) {
      tokens.shift()
    }
    return tokens.join('.')
  })

  console.log(hosts.join('\n'))
}))
