import '../css/dashboard/map.scss';

window.$ = window.jQuery = require('jquery');
require('jquery.easing');
require('bootstrap');
import {renderMap} from './renderData';
import {renderData} from './renderData';
import {renderContacts} from './renderData';


if(sessionStorage.token && sessionStorage.name && sessionStorage.email){

  var AlertMap = renderMap();

  $(document).ready(function () {
    $(".menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  });

  window.onload = renderData(AlertMap);
  // window.renderData = renderData;

  document.getElementById('refresh').addEventListener('click', (e)=> renderData(AlertMap));
  document.getElementById('recent').addEventListener('click', (e)=> renderData(AlertMap));
  document.getElementById('contacts').addEventListener('click', (e)=> renderContacts());
  document.getElementById('logout')
    	.addEventListener('click', (e)=> { 
        sessionStorage.clear();
        window.location.assign("/")
      });

}else{
  window.location.assign("/");
}



