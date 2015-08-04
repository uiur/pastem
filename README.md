# pastem
[![Build Status](https://travis-ci.org/uiureo/pastem.svg?branch=master)](https://travis-ci.org/uiureo/pastem)

A chrome extension that converts a url to embeded markdown on paste.

![](https://i.gyazo.com/cc1949bfb4fb6a16d414a2121e0eb735.gif)

For example, if you paste `http://gyazo.com/f02ef690f64fdba4eb3f321e72f17d61` in a github issue, it's automatically expanded into this markdown code.

`[![Gyazo](https://i.gyazo.com/f02ef690f64fdba4eb3f321e72f17d61.png)](http://gyazo.com/f02ef690f64fdba4eb3f321e72f17d61)`

## Install
https://chrome.google.com/webstore/detail/pastem/ibmnfmdbnmihdjoegiodchoidmgpencc

## Supported links
pastem automatically converts urls on following hosts.

- youtube.com
- deviantart.com
- blip.tv
- dailymotion.com
- flickr.com
- scribd.com
- vimeo.com
- instagram.com
- soundcloud.com
- kickstarter.com
- coub.com
- wordpress.com
- ted.com
- spotify.com
- cacoo.com
- etsy.com
- gyazo.com

## Development
Run this command to build.
```
npm run build
```

## License
MIT
