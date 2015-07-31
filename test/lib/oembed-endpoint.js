var test = require('tape')
var endpoint = require('../../src/lib/oembed-endpoint.js')

test(function (t) {
  t.equal(
    endpoint('https://www.youtube.com/watch?v=docqkEMKD70'), 'https://www.youtube.com/oembed'
  )
  t.equal(
    endpoint('https://www.flickr.com/photos/sdasmarchives/9971218535/'),
    'https://www.flickr.com/services/oembed.json'
  )
  t.end()
})
