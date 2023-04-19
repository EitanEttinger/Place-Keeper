'use strict'

const STORAGE_KEY = 'UserPrefsDB'

function getFromLocalStorage() {
  const gUser = loadFromStorage(STORAGE_KEY)
  console.log('gUser', gUser)
  return gUser
}
