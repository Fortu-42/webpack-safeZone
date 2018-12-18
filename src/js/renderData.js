import postAjax from './ajax';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // load on demand

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
        // .slice(0,10).split('-').reverse().join('-')

      function renderMapData(data){
        // markers mapping
        data.markers.map(marker =>{
          var el = document.createElement('div');
          el.className = 'marker';
          el.style.backgroundImage = imageUrl(marker.alertId);
          el.style.width = '25px';
          el.style.height = '25px';
          el.style.backgroundSize = 'cover';
          el.style.cursor = 'pointer';
          dayjs().locale('es');
          var date = dayjs(marker.Date).format('DD-MM-YYYY');
          var time = dayjs(marker.Date).format('hh:mm:ss A');
          new mapboxgl.Marker(el)
          .setLngLat([marker.Longitude,marker.Latitude])
          .setPopup(
            new mapboxgl.Popup({offset: 15})
            .setHTML(`
              <h5><i class="em em-male-police-officer"></i> ${marker.Description}</h5>
              <p><b><i class="em em-email"></i> Usuario:</b> ${marker.Email}</p>
              <p><b><i class="em em-calendar"></i> Fecha:</b> ${date}</p>
              <p><b><i class="em em-clock3"></i> Hora:</b> ${time}
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

      document.getElementById('userName').innerText = sessionStorage.getItem('name');
      document.getElementById('userEmail').innerText = sessionStorage.getItem('email');
      
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
          }else if (data.message_api === "Loadedpost"){
            var ul = document.createElement('ul');
            ul.className = 'list-group';
            data.emails.map(contact => {
              ul.innerHTML +=
                `<li class="list-group-item">
                  <p><b>Nombre:</b> ${contact.Name}</p>
                  <p><b>Apellido:</b> ${contact.LastName}</p>
                  <p><b>Email:</b> ${contact.Email}</p>
                </li>`
                
              var list = document.getElementById('modal-body').innerHTML = ul.innerHTML;
            });
          }
          
        }
    },
    sendAlert: function(e){
      e.preventDefault();
      const Description = e.target[0].value;
      const idAlert = e.target[1].value;
      var data = {};
      var errorMessage = '';

      if(Description == ''){
        errorMessage = 'Escriba una corta descripción del incidente'
        document.getElementById('error-span').innerHTML = errorMessage;
      }else if (idAlert === 'Seleccione el Tipo de Alerta'){
        errorMessage = 'Por favor seleccione un tipo de alerta';
        document.getElementById('error-span').innerHTML = errorMessage;
      }else{
         window.navigator.geolocation.getCurrentPosition(
             position => getLocationAndSubmit(position.coords.latitude, position.coords.longitude),
             err => console.log(err)
           );
      }

      function getLocationAndSubmit(Latitude, Longitude){
          postAjax(
            'https://api.safezoneapp.io/api/alerts/addalert',
            'POST',
            {
              idAlert,
              userEmail : sessionStorage.getItem('email'),
              Latitude,
              Longitude,
              Description
            },
            notification,
            sessionStorage.getItem('token')
          );          
      }

      function notification(data){
        console.log(data);
      }
      

    }
}