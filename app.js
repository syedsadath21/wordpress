   var allLinks;
   var altText;   
   const cros = "https://cors-anywhere.herokuapp.com/";

     //  $('.getUrls').click(function(event){
    function getUrls(){
      $('.submit').attr('disabled','true');
      $('#input').attr('disabled','true');
      $('#loading-point').html('<img class="loading" src="./images/source.gif" />');
          const url = "https://"+ document.getElementById("input").value; 

          const urls = [
              cros + url +'.findlaw1.flsitebuilder.com/feed/',
              cros + url +'.findlaw2.flsitebuilder.com/feed/',
              cros + url +'.findlaw3.flsitebuilder.com/feed/',
              cros + url +'.findlaw4.flsitebuilder.com/feed/',
              cros + url +'.findlaw5.flsitebuilder.com/feed/'
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
              $('#loading-point').empty();
              $('<h4 class="alert alert-danger hideEror">'+ "Please check the SubID and try again..!" + '</h4>').appendTo('#error-msg');
            }   
            var erMsg = document.getElementsByClassName('alert-danger') 
            if(erMsg.length > 1){          
              $('<h4 class="alert alert-danger">'+ erMsg[4].innerText + '</h4>').appendTo('#error-msg');
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
            return $('<li>'+ response + '</li>').appendTo('#linkList ul');
          }
          

            // setTimeout(function(){ 
            //   $('.Getlink').trigger("click");
            //   }, 5000);
              // setTimeout(function(){ 
              //   $('#linkList').empty();
              // }, 8000);

             // $('.Getlink').click(function(){
              function getUrls(response) {
                allLinks =  document.getElementById('linkList').querySelectorAll('a');
                // altText = document.getElementById('linkList').querySelectorAll('img');

                //   for(let j=0; j < altText.length; j++){
                //     if(altText[j].getAttribute('alt').substr(0,6) !== "DO NOT"){
                //       let altName = altText[j].getAttribute('alt');
                //       $('<h1 class="firmName">' + altName + '</h1>').appendTo('#data');
                //     }                  
                //   }       

                //for(let i=0; i < allLinks.length; i++){
                  //if(allLinks[i].getAttribute('href').length === 54){
                    //console.log(allLinks[i].getAttribute('href').substr(0,43));
                     let builderLink = document.getElementsByTagName('atom:link')[0].getAttribute('href').substr(0,43);
                     let firmName = document.getElementsByTagName('atom:link')[0].previousElementSibling.innerText;
                     $('#loading-point').empty();
                     $('<h1 class="firmName">' + firmName + '</h1>').appendTo('#data');
                     $('<h4><span>Builder URL </span>: <a target="_blank" class="builderLink">'+ builderLink + '</a></h4>').appendTo('#data');
                     $('.builderLink').attr('href',builderLink);
                     $('<h4><span>SubID </span>: '+ builderLink.substr(8,7) + '</h4>').appendTo('#data');
                     $('#linkList').empty();
                       //dashboard link
                        $('<a target="_blank" class="link-btn dashLink">Dashboard</a>').appendTo('#data');
                        $('.dashLink').attr('href',builderLink+'wp-admin/');
                      //coportal link
                        $('<a target="_blank" class="link-btn coPortalLink">CoPortal</a>').appendTo('#data');
                        $('.coPortalLink').attr('href','http://coportal.int.thomsonreuters.com/index.jsp?page=sub_details&subscription_id='+ builderLink.substr(8,7));
                     
                  //   //sub id link
                  //   $('<h4><span>SubID </span>: <a target="_blank" class="subLink">'+ document.getElementById("input").value + '</a></h4>').appendTo('#data');
                  //   $('.subLink').attr('href','http://coportal.int.thomsonreuters.com/index.jsp?page=sub_details&subscription_id='+ document.getElementById("input").value);
                  //}                  
                }
            //     if ( allLinks[0].getAttribute('href').substr(8,7) === "findlaw" 
            //       && allLinks[1].getAttribute('href').substr(8,7) === "findlaw" 
            //       && allLinks[2].getAttribute('href').substr(8,7) === "findlaw" 
            //       && allLinks[3].getAttribute('href').substr(8,7) === "findlaw" 
            //       && allLinks[4].getAttribute('href').substr(8,7) === "findlaw") {
            //         $('#loading-point').empty();
            //         $('<h4 class="alert alert-danger">'+ "No WordPress Site Found For This SubId" + '</h4>').appendTo('#error-msg');
            //     }                             
            // }

            // $('.test').click(function(){
            //   const resultUrl = document.getElementsByClassName('builderLink')[0].innerText;    
            //   fetch(cros + resultUrl) 
            //   .then(response => response.text())
            //   .then(contents => document.getElementById("result").innerHTML = $(contents).find('.flfooterbrand').html() )
            //   .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
            //   setTimeout(function(){
            //       let details= document.getElementById('result').querySelectorAll('a')[0]
            //       $('<h4 class="alert alert-success">'+'Firm Name: '+ details.innerText + '</h4>').appendTo('#data');
            //       $('<h4 class="alert alert-success">'+ 'WLD: '+ details.getAttribute('href') + '</h4>').appendTo('#data');
            //     }, 2000);
            // });
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