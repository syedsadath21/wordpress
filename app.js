   var allLinks;
   var altText;   
   const cros = "https://cors-anywhere.herokuapp.com/";

   if(document.getElementById("input").value.length === 7){
    $('.submit').attr('disabled','true');
  }

     //  $('.getUrls').click(function(event){
    function fetchData(){
      $('#data').empty();
      $('.submit').attr('disabled','true');
      $('#input').attr('disabled','true');      
      $('#loading-point').html('<img class="loading" src="./images/source.gif" />');

      

          const url = "https://"+ document.getElementById("input").value; 

          const urls = [
              url +'.findlaw1.flsitebuilder.com/wp-json/',
              url +'.findlaw2.flsitebuilder.com/wp-json/',
              url +'.findlaw3.flsitebuilder.com/wp-json/',
              url +'.findlaw4.flsitebuilder.com/wp-json/',
              url +'.findlaw5.flsitebuilder.com/wp-json/'
          ];

          Promise.all(urls.map(url =>
            fetch(url)
              .then(checkStatus)                 
              .then(parseJSON)
              .then(getUrls)
              // .catch(error => console.log('Server Down Please Try After Some Time'))
              .catch(erorStatus)
          ))
          
          function erorStatus(response){
            if(response.ok !== false){
                $('<h4 class="alert alert-danger hideEror">'+ "Please check the SubID and try again." + '</h4>').appendTo('#error-msg');
            }   
            var erMsg = document.getElementsByClassName('alert-danger') 
            if(erMsg.length > 1){          
                $('<h4 class="alert alert-danger">&#10071; '+ erMsg[4].innerText + '</h4>').appendTo('#error-msg');
                $('#loading-point').empty();
            }
          }
          function checkStatus(response) {
              if (response.ok) {
                return Promise.resolve(response.text());
              } else {
                return Promise.reject(new Error(response.statusText));
              }
            }

          function parseJSON(response) {
            //return $('<li>'+ $(response).find('.flfooterbrand').html() + '</li>').appendTo('#linkList ul');
            if( JSON.parse(response) !== '[object Object]'){
                return $('<li>'+ response + '</li>').appendTo('#linkList ul');
            }
          }
          

            function getUrls(response) {
                allLinks =  document.getElementById('linkList').querySelectorAll('a');                
                let linkList = document.getElementById('linkList');
                let myJson = JSON.parse(linkList.childNodes[1].childNodes[1].innerText);

                let firmName = myJson.name;
                let builderLink = myJson.url;
                let subId = builderLink.substr(8,7);
                
                $('<h1 class="firmName">' + firmName + '</h1>').appendTo('#data');
                
                $('<h4><span>Builder URL </span>: <a target="_blank" class="builderLink">'+ builderLink + '</a></h4>').appendTo('#data');
                $('.builderLink').attr('href',builderLink);
                $('<h4><span>SubID </span>: '+ subId + '</h4>').appendTo('#data');
                //dashboard link
                $('<a target="_blank" class="link-btn dashLink">Dashboard</a>').appendTo('#data');
                $('.dashLink').attr('href',builderLink+'/wp-admin/');
                //coportal link
                $('<a target="_blank" class="link-btn coPortalLink">CoPortal</a>').appendTo('#data');
                $('.coPortalLink').attr('href','http://coportal.int.thomsonreuters.com/index.jsp?page=sub_details&subscription_id='+ subId);
                if(builderLink.length !== 0){
                    $('#loading-point').empty();
                }
                $('#linkList').empty();                                          
            }
            // $('.submit').removeAttr('disabled');
            // $('#input').removeAttr('disabled');
        }


    // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();
