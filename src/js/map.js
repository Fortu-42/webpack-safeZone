import '../css/dashboard/map.scss';

window.$ = window.jQuery = require('jquery');
require('jquery.easing');
require('bootstrap');
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
//import {initializeFirebase} from './pushNotifications';
import {renderMap, renderData, renderContacts} from './renderData';
import {sendAlert} from './sendData';

//initializeFirebase();

if(sessionStorage.token && sessionStorage.name && sessionStorage.email){

  $(document).ready(function () {
    $(".menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  });
  
  const AlertMap = renderMap();

  AlertMap.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
  }));

  var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      country: 've',
      language: 'es'
  });

  document.getElementById('geocoder').appendChild(geocoder.onAdd(AlertMap));

  renderData(AlertMap);

  // document.getElementById('refresh').addEventListener('click', (e)=> renderData(AlertMap));
  // document.getElementById('recent').addEventListener('click', (e)=> renderData(AlertMap));
  document.getElementById('contacts').addEventListener('click', (e)=> renderContacts());
  document.getElementById('panicForm')
    .addEventListener('submit', (e)=> {
      sendAlert(e, AlertMap)
    });
  document.getElementById('logout')
    	.addEventListener('click', (e)=> { 
        e.preventDefault();
        sessionStorage.clear();
        window.location.assign("/")
      });

  $('#bNotification').on('closed.bs.alert', function () {
    alert.innerHTML = '';
  })
}else{
  window.location.assign("/");
}



