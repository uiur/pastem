'use strict'

require('whatwg-fetch')
var endpoint = require('./lib/oembed-endpoint.js')
var isUrl = require('is-url')

function checkStatus (res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  } else {
    var err = new Error(res.statusText)
    err.response = res
    throw err
  }
}

var sites = {
  github: {
    host: /github\.com/,
    className: 'comment-form-textarea'
  },
  qiita: {
    host: /qiita\.com/,
    className: 'editorMarkdown_textarea'
  }
}

Object.keys(sites).find((site) => {
  if (sites[site].host.test(window.location.hostname)) {
    setupListener(sites[site].className)

    return true
  }
})

function setupListener (className) {
  document.addEventListener('paste', function (e) {
    var element = e.target

    if (!element.classList.contains(className)) return

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
      .then(checkStatus)
      .then(function (res) {
        return res.json()
      })
      .then(function (json) {
        var imageUrl = json.type === 'photo' ? json.url : json.thumbnail_url
        var title = json.title || json.provider_name || ''

        var markdown = '[![' + title + '](' + imageUrl + ')](' + url + ')'

        replace(markdown)
      }).catch(function () {
        replace(url)
      })
  })
}
