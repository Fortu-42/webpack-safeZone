import { renderData} from './renderData';
import postAjax from './ajax';

module.exports = {
    sendAlert: function(e, alertMap){
        e.preventDefault();
        const Description = e.target[0].value;
        const idAlert = e.target[1].value;
        var errorMessage = '';
        const message = document.getElementById('error-span');
        const alert = document.getElementById('bNotification');
  
        if(Description == ''){

          errorMessage = 'Escriba una corta descripción del incidente'
          message.innerHTML = errorMessage;

        }else if (idAlert === 'Seleccione el Tipo de Alerta'){

          errorMessage = 'Por favor seleccione un tipo de alerta';
          message.innerHTML = errorMessage;

        }else{

          errorMessage = 'Por favor espere...';
          message.style.color = '#333';
          message.innerHTML = errorMessage;
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
                userEmail : sessionStorage.email,
                Latitude,
                Longitude,
                Description
              },
              bNotification,
              sessionStorage.token
            );          
        }
  
        function bNotification(data){

          if(data.success){
          alert.innerHTML = `
          <div id="green-alert" class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Exito! </strong> ${data.message_api}.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;
          }else{
            alert.innerHTML = `        
            <div id="green-alert" class="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Ups, algo salió mal</strong> ${data.message_api}.
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>`;
          }
        
          renderData(alertMap);
          message.innerText = '';  
          
        }

        
        $('#exampleModalPanic').modal('hide');
        $("#wrapper").toggleClass("toggled");
      }
}