'use strict'

var domready = require('domready')

if ((/github\.com/).test(window.location.hostname)) {
  domready(function () {
    document.addEventListener('paste', function (e) {
      var element = e.target
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

        var id = url.pathname.slice(1)

        var directUrl = 'https://i.gyazo.com/' + id + '.png'
        var permalinkUrl = 'http://gyazo.com/' + id

        var markdown = '[![Gyazo](' + directUrl + ')](' + permalinkUrl + ')'

        e.preventDefault()

        var replace = function (text) {
          var val = element.value
          var replacedText = val.substr(0, element.selectionStart) + text + val.substr(element.selectionEnd, val.length)
          element.value = replacedText
        }

        replace(markdown)
      }
    })
  })
}
