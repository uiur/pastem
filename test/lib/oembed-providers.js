var test = require('tape')
var url = require('url')
var providers = require('../../src/lib/oembed-providers.json')

test(function (t) {
  t.ok(Object.keys(providers).every(function (key) {
    return url.parse(key).protocol === 'https:'
  }), 'all endpoints are https')

  t.end()
})
