import postAjax from './ajax';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

module.exports= {
    renderMap: function(){
        mapboxgl.accessToken = 'pk.eyJ1IjoiZm9ydHVuYXRvaGVycmVyYSIsImEiOiJjaXlyazYwbXcwMDF3MndzNGVzYTU3bDU5In0.qHIS7XYrfatU8ImS4XiEjA';
        var AlertMap = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/navigation-preview-day-v2?optimize=true',
        center: [-64.681180,10.176877],
        zoom: 15
        });
    
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

        return AlertMap;
    },
    renderData: function(AlertMap) {
      postAjax(
        'https://api.safezoneapp.io/api/alerts/currentalerts',
        'GET',
        null,
        renderMapData,
        sessionStorage.token
        );

      function renderMapData(data){
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
              `)
          )
          .addTo(AlertMap);
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
    },
    renderContacts : function(){
      postAjax(
        'https://api.safezoneapp.io/api/contacts/getcontact',
        'GET',
        null,
        renderContactsData,
        sessionStorage.token
        );

        function renderContactsData(data){
          if(data.message_api === "Users has not registered contacts"){
            document.getElementById('modal-body').innerHTML = `
            <div class='contacts-container'>
              <i class="em em-cry"></i>
              <h4 class="no-contacts">No tienes contactos registrados</h4>
            </div>
            `;
          }else{
            console.log('jejeps');
            
          }
          
        }
    }
}