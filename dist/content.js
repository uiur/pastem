(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


  if (!loaded)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    while (listener = fns.shift()) listener()
  })

  return function (fn) {
    loaded ? fn() : fns.push(fn)
  }

});

},{}],2:[function(require,module,exports){
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

},{"domready":1}]},{},[2]);
