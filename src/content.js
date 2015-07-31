'use strict'

require('whatwg-fetch')
var domready = require('domready')

if ((/github\.com/).test(window.location.hostname)) {
  domready(function () {
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

        if (!(/gyazo\.com\/[a-f0-9]+\/?$/).test(url.href)) {
          return
        }

        e.preventDefault()

        window.fetch('https://api.gyazo.com/api/oembed/?url=' + window.encodeURIComponent(url))
          .then(function (res) {
            return res.json()
          })
          .then(function (json) {
            var directUrl = json.url
            var markdown = '[![Gyazo](' + directUrl + ')](' + url + ')'

            replace(markdown)
          })
      }
    })
  })
}
