'use strict'

function onInit() {}

function showAge(newVal) {
  document.querySelector('#sAge').innerHTML = newVal
}

function showZoom(newVal) {
  document.querySelector('#sZoom').innerHTML = newVal
}

function onSubmit(ev) {
  ev.preventDefault()
  console.log('ev', ev)

  const userData = getData(ev.target)
  submit(userData)
}
