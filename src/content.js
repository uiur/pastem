'use strict'

require('whatwg-fetch')
var endpoint = require('./lib/oembed-endpoint.js')
var isUrl = require('is-url')

if ((/github\.com/).test(window.location.hostname)) {
  document.addEventListener('paste', function (e) {
    var element = e.target

    if (!element.classList.contains('comment-form-textarea')) return

    function replace (text) {
      var val = element.value
      var replacedText = val.substr(0, element.selectionStart) + text + val.substr(element.selectionEnd, val.length)
      element.value = replacedText
    }

    var input = e.clipboardData.getData('text/plain')

    if (!isUrl(input)) return
    var url = input

    var endpointUrl = endpoint(url)
    if (!endpointUrl) return

    e.preventDefault()

    window.fetch(endpointUrl + '?url=' + url)
      .then(function (res) {
        return res.json()
      })
      .then(function (json) {
        var imageUrl = json.type === 'photo' ? json.url : json.thumbnail_url
        var title = json.title || json.provider_name || ''

        var markdown = '[![' + title + '](' + imageUrl + ')](' + url + ')'

        replace(markdown)
      })
  })
}
