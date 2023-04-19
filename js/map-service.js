'use strict'

var KEY = `PlacesDB`
var KEY_MARK = `MarkersDB`
var gPlaces = []
let gMap

function onAddMap(map) {
  gMap = map
}

function getMap() {
  return gMap
}

function removePlace(placeId) {
  const placesIdx = gPlaces.findIndex((place) => placeId === place.id)
  gPlaces.splice(placesIdx, 1)
  saveToStorage(KEY, gPlaces)
}

function getPlaces() {
  gPlaces = loadFromStorage(KEY)
  if (!gPlaces) gPlaces = []
  return gPlaces
}

function getPlaceById(placeId) {
  const placeIndex = gPlaces.findIndex((place) => placeId === place.id)
  return gPlaces[placeIndex]
}

function addPlace(lat, lng, place) {
  const newPlace = createPlace(lat, lng, place)
  console.log('newPlace', newPlace)
  console.log('gPlaces', gPlaces)

  gPlaces.push(newPlace)

  saveToStorage(KEY, gPlaces)
}

// function centerMap(placeId) {
//   const placeIndex = gPlaces.findIndex((place) => placeId === place.id)
//   return placeIndex
// }

function createPlace(lat, lng, place) {
  return {
    id: makeid(3),
    lat,
    lng,
    place,
    time: Date.now(),
  }
}
