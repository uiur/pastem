'use strict'

require('whatwg-fetch')
var endpoint = require('./lib/oembed-endpoint.js')

if ((/github\.com/).test(window.location.hostname)) {
  document.addEventListener('paste', function (e) {
    var element = e.target

    function replace (text) {
      var val = element.value
      var replacedText = val.substr(0, element.selectionStart) + text + val.substr(element.selectionEnd, val.length)
      element.value = replacedText
    }

    if (e.target.classList.contains('comment-form-textarea')) {
      var input = e.clipboardData.getData('text/plain')

      var url = null

      try {
        url = new window.URL(input)
      } catch(e) {
        console.log(e)
        return
      }

      e.preventDefault()

      window.fetch(endpoint(url) + '?url=' + url)
        .then(function (res) {
          return res.json()
        })
        .then(function (json) {
          var imageURL = json.type === 'photo' ? json.url : json.thumbnail_url
          var title = json.title || json.provider_name || ''

          var markdown = '[![' + title + '](' + imageURL + ')](' + url + ')'

          replace(markdown)
        })
    }
  })
}
