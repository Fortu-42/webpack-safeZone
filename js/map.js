import '../css/dashboard/map.scss';


window.$ = window.jQuery = require('jquery');
require('jquery.easing');
require('bootstrap');
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import postAjax from './ajax';


if(sessionStorage.token && sessionStorage.name && sessionStorage.email){
  try{
 
    mapboxgl.accessToken = 'pk.eyJ1IjoiZm9ydHVuYXRvaGVycmVyYSIsImEiOiJjaXlyazYwbXcwMDF3MndzNGVzYTU3bDU5In0.qHIS7XYrfatU8ImS4XiEjA';
      var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/navigation-preview-day-v2?optimize=true',
      center: [-64.681180,10.176877],
      zoom: 15
    });
    
    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: true
    }));

    postAjax(
            'https://api.safezoneapp.io/api/alerts/currentalerts',
            'GET',
            null,
            renderData,
            sessionStorage.token
            );

    function renderData(data){

      // markers mapping
      data.markers.map(marker =>{

        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = imageUrl(marker.alertId);
        el.style.width = '25px';
        el.style.height = '25px';
        el.style.backgroundSize = 'cover';
        new mapboxgl.Marker(el)
        .setLngLat([marker.Longitude,marker.Latitude])
        .setPopup(
          new mapboxgl.Popup({offset: 15})
          .setHTML(`
            <h5>${marker.Description}</h5>
            <p><b>Usuario:</b> ${marker.Email}</p>
            <p><b>Fecha:</b> ${marker.Date}</p>
            `))
        .addTo(map);
      });      
    }

    function imageUrl(alertType){
      switch (alertType) {
        case 1:
          return 'url(../svg/amarillo.svg)'
          break;

        case 2:
          return 'url(../svg/verde.svg)'
          break;

        case 3: 
          return 'url(../svg/naranja.svg)'
          break;

        case 4:
          return 'url(../svg/azul.svg)'
          break;

        case 5:
          return 'url(../svg/rojo.svg)'
          break;

        default:
          break;
      }
    }

      var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        country: 've',
        language: 'es'
      });
    
    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
    
  }catch(e){
      console.log(e);
  }
    
    
    $(document).ready(function () {
      $(".menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
      });
    });


}else{
  window.location.assign("/");
}



