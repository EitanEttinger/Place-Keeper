'use strict'

let gMarkers = []

function getPosition() {
  if (!navigator.geolocation) {
    alert('HTML5 Geolocation is not supported in your browser')
    return
  }

  // One shot position getting or continues watch
  navigator.geolocation.getCurrentPosition(showLocation, handleLocationError)
  // navigator.geolocation.watchPosition(showLocation, handleLocationError)
}

function showLocation(position) {
  console.log(position)
  const { latitude: lat, longitude: lng, accuracy } = position.coords
  document.getElementById('latitude').innerHTML = lat
  document.getElementById('longitude').innerHTML = lng
  document.getElementById('accuracy').innerHTML = accuracy

  var date = new Date(position.timestamp)
  document.getElementById('timestamp').innerHTML =
    date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  initMap(lat, lng)

  return position
}

function handleLocationError(error) {
  var locationError = document.getElementById('locationError')

  switch (error.code) {
    case 0:
      locationError.innerHTML =
        'There was an error while retrieving your location: ' + error.message
      break
    case 1:
      locationError.innerHTML =
        "The user didn't allow this page to retrieve a location."
      break
    case 2:
      locationError.innerHTML =
        'The browser was unable to determine your location: ' + error.message
      break
    case 3:
      locationError.innerHTML =
        'The browser timed out before retrieving the location.'
      break
  }
}

function mapReady() {
  console.log('Map is ready')
}

function initMap(lat = 31, lng = 31) {
  const elMap = document.querySelector('.map')
  const options = {
    center: { lat, lng },
    zoom: 16,
  }

  const map = new google.maps.Map(elMap, options)

  console.log('init map', map)
  map.setCenter({ lat: 29.55738611461527, lng: 34.951629697788505 })

  const marker = new google.maps.Marker({
    position: { lat, lng },
    map,
    title: 'Hello World!',
  })

  onAddMap(map)
  onAddPlace(map)
  renderPlaces(map)
}

function onAddPlace(map) {
  map.addListener('click', (e) => {
    let place = prompt(`Give me the name MF`)
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()

    addPlace(lat, lng, place)
    renderPlaces(map)
  })
}

function renderPlaces(map) {
  const elContainer = document.querySelector(`.place-container`)
  const places = getPlaces()

  let strHTMLs = places.map(
    (place) =>
      `<tr>
      <td>${place.place} , ${new Date(place.time).toLocaleTimeString()}
        <button onclick="onRemovePlace('${place.id}')">X</button>
        <button onclick="onPanToPlace('${place.id}')">Go</button>
      </td>
    </tr>`
  )

  elContainer.innerHTML = strHTMLs.join(``)

  places.map((place) => {
    let marker = new google.maps.Marker({
      position: { lat: place.lat, lng: place.lng },
      map,
      title: place.place,
    })
    gMarkers.push(marker)
  })
}

function onRemovePlace(placeId) {
  const map = getMap()

  removePlace(placeId)

  for (let i = 0; i < gMarkers.length; i++) {
    gMarkers[i].setMap(null)
  }
  renderPlaces(map)
}

function onPanToPlace(placeId) {
  const place = getPlaceById(placeId)

  const gMap = getMap()

  gMap.setCenter({ lat: place.lat, lng: place.lng })
}
