import postAjax from "../utils/ajax";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import dayjs from "dayjs";
import "dayjs/locale/es"; // load on demand

module.exports = {
  renderMap: function() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZm9ydHVuYXRvaGVycmVyYSIsImEiOiJjaXlyazYwbXcwMDF3MndzNGVzYTU3bDU5In0.qHIS7XYrfatU8ImS4XiEjA";
    var AlertMap = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/navigation-preview-day-v2?optimize=true",
      center: [-70.631328, -33.453086],
      zoom: 14
    });

    return AlertMap;
  },
  renderData: function(AlertMap) {
    postAjax(
      "https://api.safezoneapp.io/api/alerts/currentalerts",
      "GET",
      null,
      renderMapData,
      sessionStorage.token
    );
    // .slice(0,10).split('-').reverse().join('-')

    function renderMapData(data) {
      // markers mapping
      data.markers.map(marker => {
        var el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundImage = imageUrl(marker.alertId);
        el.style.width = "25px";
        el.style.height = "25px";
        el.style.backgroundSize = "cover";
        el.style.cursor = "pointer";
        dayjs().locale("es");
        var date = dayjs(marker.Date).format("DD-MM-YYYY");
        var time = dayjs(marker.Date).format("hh:mm:ss A");
        new mapboxgl.Marker(el)
          .setLngLat([marker.Longitude, marker.Latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 15 }).setHTML(`
              <h5><i class="em em-male-police-officer"></i> ${
                marker.Description
              }</h5>
              <p><b><i class="em em-email"></i> Usuario:</b> ${marker.Email}</p>
              <p><b><i class="em em-calendar"></i> Fecha:</b> ${date}</p>
              <p><b><i class="em em-clock3"></i> Hora:</b> ${time}
              `)
          )
          .addTo(AlertMap);
      });
    }

    function imageUrl(alertType) {
      switch (alertType) {
        case 1:
          return "url(../svg/amarillo.svg)";
          break;

        case 2:
          return "url(../svg/verde.svg)";
          break;

        case 3:
          return "url(../svg/naranja.svg)";
          break;

        case 4:
          return "url(../svg/azul.svg)";
          break;

        case 5:
          return "url(../svg/rojo.svg)";
          break;

        default:
          break;
      }
    }

    document.getElementById("userName").innerText = sessionStorage.name;
    document.getElementById("userEmail").innerText = sessionStorage.email;
  },
  renderContacts: function() {
    postAjax(
      "https://api.safezoneapp.io/api/contacts/getcontact",
      "GET",
      null,
      renderContactsData,
      sessionStorage.token
    );

    function renderContactsData(data) {
      if (data.message_api === "Users has not registered contacts") {
        document.getElementById("modal-body").innerHTML = `
            <div class='contacts-container'>
              <i class="em em-cry"></i>
              <h4 class="no-contacts">No tienes contactos registrados</h4>
            </div>
            `;
      } else if (data.message_api === "Loadedpost") {
        let ul = document.createElement("ul");
        ul.className = "list-group";
        data.emails.map(contact => {
          ul.innerHTML += `<li class="list-group-item">
                  <p><b>Nombre:</b> ${contact.Name}</p>
                  <p><b>Apellido:</b> ${contact.LastName}</p>
                  <p><b>Email:</b> ${contact.Email}</p>
                </li>`;

          document.getElementById("modal-body").innerHTML = ul.innerHTML;
        });
      }
    }
  }
};
