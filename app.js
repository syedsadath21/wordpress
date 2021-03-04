   var allLinks;
   var altText;   
   const cros = "https://cors-anywhere.herokuapp.com/";

//    if(document.getElementById("input").value.length === 7){
//     $('.submit').attr('disabled','true');
//   }

     //  $('.getUrls').click(function(event){
    function fetchData(){
      $('#data').empty();
      $('.submit').attr('disabled','true');
      $('#input').attr('disabled','true');      
      $('#loading-point').html('<img class="loading" src="./images/blue.gif" />');

      

          const url = "https://"+ document.getElementById("input").value; 

          const urls = [
              url +'.findlaw1.flsitebuilder.com/wp-json/',
              url +'.findlaw2.flsitebuilder.com/wp-json/',
              url +'.findlaw3.flsitebuilder.com/wp-json/',
              url +'.findlaw4.flsitebuilder.com/wp-json/',
              url +'.findlaw5.flsitebuilder.com/wp-json/',
              url +'.findlaw6.flsitebuilder.com/wp-json/'
          ];

          Promise.all(urls.map(url =>
            fetch(url)
              .then(checkStatus)                 
              .then(parseJSON)
              .then(getUrls)
              // .catch(error => console.log('Server Down Please Try After Some Time'))
              .catch(erorStatus)
          ))
          
        }
        
          function erorStatus(response){
            if(response.ok !== false){
                $('<h4 class="alert alert-danger hideEror">'+ "Please check the SubID and try again." + '</h4>').appendTo('#error-msg');
            } 
            var erMsg = document.getElementsByClassName('alert-danger') 
            if(erMsg.length > 1){          
                $('<h4 class="alert alert-danger">&#10071; '+ erMsg[5].innerText + '</h4>').appendTo('#error-msg');
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
                var builderLink = myJson.url;
                let subId = builderLink.substr(8,7);
                
                $('<h1 class="firmName">' + firmName + '</h1>').appendTo('#data');                
                $('<h4><span>Builder URL </span>: <a target="_blank" class="builderLink">'+ builderLink + '</a></h4>').appendTo('#data');
                $('.builderLink').attr('href',builderLink);
                $('<h4 class="subid"><span>Sub ID </span>: '+ subId + '</h4>').appendTo('#data');
                //dashboard link
                $('<a target="_blank" class="link-btn dashLink">Dashboard</a>').appendTo('#data');
                $('.dashLink').attr('href',builderLink+'/safe/');
                //coportal link
                $('<a target="_blank" class="link-btn coPortalLink">CoPortal</a>').appendTo('#data');
                $('.coPortalLink').attr('href','http://coportal.int.thomsonreuters.com/index.jsp?page=sub_details&subscription_id='+ subId);
                if(builderLink.length !== 0){
                    $('#loading-point').empty();
                }
                $('#linkList').empty();   
                fetchWld();
                
                function fetchWld(){
                    const myLink = cros+builderLink;
                    fetch(myLink) 
                    .then(response => response.text())
                    .then(contents =>  $('<p>'+ ($(contents).find('.flfooterbrand').html()) + '</p>').appendTo('#linkList'))
                    .then(getWld)
                    .catch(error => console.log('Could not find WLD Id'))                   
                }
                function getWld(){
                    let wldLink = document.getElementById('linkList').querySelectorAll('a')[0].getAttribute('href');
                    let wldId = wldLink.substr(wldLink.length-13,7);
                    $('<h4><span>WLD ID </span>: '+ wldId + '</h4>').insertAfter('.subid');
                    //wld link
                    $('<a target="_blank" class="link-btn wldLink">WLD</a>').appendTo('#data');
                    $('.wldLink').attr('href',wldLink);
                }
            }
            // $('.submit').removeAttr('disabled');
            // $('#input').removeAttr('disabled');

        function fetchLiveSite(){
            const inputLink = document.getElementById("inputUrl").value +'/wp-json/'; 
            $('#loading-point').html('<img class="loading" src="./images/blue.gif" />');

            fetch(inputLink) 
            .then(checkStatus)                 
            .then(parseJSON)
            .then(getUrls)
            .catch(error => $('<h4 class="alert alert-danger">'+ "&#10071; Please check the URL and try again." + '</h4>').appendTo('#error-msg'));
        }


        $(document).ready(function(){
            $("#radio1").click(function(){
              $('#myform-firm').hide();
              $('#myform-sub').show();
            });
            $("#radio2").click(function(){
                $('#myform-sub').hide();
                $('#myform-firm').show();
              });
          });


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
