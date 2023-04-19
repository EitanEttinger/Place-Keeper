'use strict'

function onInit() {
  const gUser = getFromLocalStorage()
  if (!gUser) return
  console.log('gUser', gUser)

  const elBody = document.querySelector(`body`)
  elBody.style.backgroundColor = gUser.bgColor
  elBody.style.color = gUser.txtColor
}
