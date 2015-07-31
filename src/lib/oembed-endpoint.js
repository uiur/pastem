var providers = require('./oembed-providers.json')

function match (str, pattern) {
  var regex = new RegExp('^' + pattern.replace('.', '\\.').replace(/\*/g, '.*') + '$')

  return regex.test(str)
}

module.exports = function (url) {
  var endpoint

  var matched = Object.keys(providers).some(function (key) {
    endpoint = key

    return providers[endpoint].some(function (str) {
      return match(url, str)
    })
  })

  return matched ? endpoint : null
}
