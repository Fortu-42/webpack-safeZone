
module.exports =  function postAjax(url, method, data=null, success, token=null) {
    // console.log(`
    // url : ${url},
    // method: ${method},
    // data: ${data},
    // success: ${success},
    // token: ${token}
    // `);

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    xhr.onerror = (error) => {
      console.log(error);
      console.log(xhr.responseText);
    };

    xhr.open(method , url, true);

    xhr.addEventListener("readystatechange", function(){
      if (this.readyState === 4 && (this.status === 202 || this.status === 200)) {
          success(JSON.parse(xhr.response));
      }else if (this.status === 400){
        success(JSON.parse(xhr.response));
      }    
    });

    xhr.setRequestHeader('Accept', 'application/json');

    xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.withCredentials = true;

    if(token){

      xhr.setRequestHeader('Authorization', `Bearer ${token}`);

    }
    if(data){

      xhr.send(JSON.stringify(data));

    }else if(!data){

      xhr.send(data);

    }

    return xhr;
}

    // var params = typeof data == 'string' ? data : Object.keys(data).map(
    //         function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
    //     ).join('&');
  