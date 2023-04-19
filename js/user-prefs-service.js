'use strict'

const STORAGE_KEY = 'UserPrefsDB'
const gPrefsUser = {
  name: '',
  email: '',
  age: 0,
  bgColor: '',
  bgImg: '',
  txtColor: '',
  zoom: 0,
  birthDate: '',
  birthTime: '',
}
let gUser

function getData(form) {
  var formData = new FormData(form)
  const userData = Object.fromEntries(formData)
  return userData
}

function submit(userData) {
  gUser = userData
  saveToStorage(STORAGE_KEY, gUser)
}
