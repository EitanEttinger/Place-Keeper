'use strict'

function makeid(length) {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

function saveToStorage(key, value) {
  var json = JSON.stringify(value)
  localStorage.setItem(key, json)
}

function loadFromStorage(key) {
  var json = localStorage.getItem(key)
  var value = JSON.parse(json)
  return value
}
