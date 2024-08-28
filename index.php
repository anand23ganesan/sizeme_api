<!DOCTYPE html>
 <?php
        //header("Access-Control-Allow-Origin: *");
       //session_start();
       if ((($_REQUEST['auth_key']) == 'alphabata20200827140138') && (($_REQUEST['auth_password']) == '1HzdhgRbd1Yw4sOsawt7FEpQrAsX6i4f')) {
        $redirect_url = $_REQUEST['redirect_url'];
        // $redirect_text = $_REQUEST['redirect_text'];
        $user_name = $_REQUEST['user_name'];
        $user_email = $_REQUEST['user_email'];
        $user_provider = 'google';
        //$gender = $_REQUEST['gender'];
        //$age = $_REQUEST['age'];
        // $sizesystem = $_REQUEST['sizesystem'];
        // $sizesystem = strtoupper($_REQUEST['sizesystem']);
        // $shoesize = $_REQUEST['shoesize'];
        // $Geography = $_REQUEST['Geography'];
        $sizesystem = 'UK';
        $shoesize = 9;
        $Geography = 'ROW';
        $gender = 'M';
        $age = 25;
        $bgcolor = '#fff';
        $btncolor = '#ED1C24';
        $fontcolor = '#000';
       
        $_SESSION["login_email"] = $_REQUEST['user_email'];
        $_SESSION["login_name"] = $_REQUEST['user_name'];
        $_SESSION["login_provider"] = $_REQUEST['user_provider'];

       
       } else {
        echo "Authentication details is not valid !!!";
        echo "<script> document.location.href='https://shoesizefinder.bata.in/api/form.php';</script>";

        exit;
       }
       if(!empty($_REQUEST['orgid']) || $_REQUEST['orgid'] != ''){
             $orgId = $_REQUEST['orgid'];
       }else{
             $orgId  = 8;
       }
       if(!empty($_REQUEST['channelid']) || $_REQUEST['channelid'] != ''){
             $channelid = $_REQUEST['channelid'];
       }else{
             $channelid  = 1;
       }


     include 'mobile-detect.php';
     $detect = new Mobile_Detect();
     // Check is mobile or pc if pc goto blog
      $chrome = stripos($_SERVER['HTTP_USER_AGENT'], "Chrome");
      $Safari = stripos($_SERVER['HTTP_USER_AGENT'], "Safari");
      if ((($_REQUEST['auth_key']) == 'alphabata20200827140138') && (($_REQUEST['auth_password']) == '1HzdhgRbd1Yw4sOsawt7FEpQrAsX6i4f')) {
          $redirect_url = $_REQUEST['redirect_url'];
       }else{
          $redirect_url = 'index.php';
       }
     // Check is mobile or pc if pc goto blog
     if ($detect->isMobile()):
        $iPod = stripos($_SERVER['HTTP_USER_AGENT'], "iPod");
        $iPhone = stripos($_SERVER['HTTP_USER_AGENT'], "iPhone");
        $iPad = stripos($_SERVER['HTTP_USER_AGENT'], "iPad");
        $Android = stripos($_SERVER['HTTP_USER_AGENT'], "Android");
        $webOS = stripos($_SERVER['HTTP_USER_AGENT'], "webOS");
        $weblink = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        // Login Status
        $is_loged_in = isset(  $_SESSION["fms_is_loged_in"] ) && $_SESSION["fms_is_loged_in"] ? true :  false;
        // Api credentials
        $catelog_uri = 'http://steves-shoes.com/api/';
        $wasecure_key = 'ws_key=X99V0C9RPGY5Q1ETCKGCDQI241T4FP1H';


      // Fetching shoesizes from csv starts

      //fetching shoesize lenght
        $rows = array_map('str_getcsv', file('assets/csv/Shoesizes_length.csv'));
        $header = array_shift($rows);
        $csv = array();
        foreach ($rows as $row) {
          $csv[] = array_combine($header, $row);
        }
        $count = 1;
        if(!empty($csv)){
          foreach ($csv as $key => $value) {
            ?>
            <input type="hidden" name="csv_data" id="<?php echo 'csv_len'.$count; ?>" class="csv_sizes" data-gender ="<?php echo $value['gender']; ?>"  data-size="<?php echo $value['size']; ?>" data-length-max="<?php echo $value['max_length_in_mm']; ?>" data-length-min="<?php echo $value['min_length_in_mm']; ?>">
          <?php
            $count++;
          }
        }

        //fetching shoesize widths 
        $rows = array_map('str_getcsv', file('assets/csv/Shoesize_width.csv'));
        $header = array_shift($rows);
        $csv = array();
        foreach ($rows as $row) {
          $csv[] = array_combine($header, $row);
        }

        if(!empty($csv)){
          foreach ($csv as $key => $value) {
              ?>
              <input type="hidden" name="csv_width" class="csv_width" data-response="<?php echo $value['API_resonse']; ?>"  data-display="<?php echo $value['Foot_report_display']; ?>" data-women="<?php echo $value['Women']; ?>" data-men="<?php echo $value['Men']; ?>">
          <?php
          }
        }

      // Fetching shoesizes from csv ends

      //fetch error codes
        function clean($string) {
           $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.
           return preg_replace('/[^A-Za-z0-9\-.!]/', ' ', $string); // Removes special chars.
        }
        $array = $fields = array(); $i = 0;
        $handle = @fopen("assets/csv/errorcode.csv", "r");
        if ($handle) {
            while (($row = fgetcsv($handle, 4096)) !== false) {
                if (empty($fields)) {
                    $fields = $row;
                    continue;
                }
                foreach ($row as $k=>$value) {
                    $array[$i][$fields[$k]] = $value;
                }
                $i++;
            }
            if (!feof($handle)) {
                echo "Error: unexpected fgets() fail\n";
            }
            fclose($handle);
        }

        if(!empty($array)){
          foreach ($array as $key => $value) {
              $remarks = clean($value['remark']);
              $error_msg = clean($value['error_msg'])
              ?>
              <input type="hidden" name="csv_errors" id="<?php echo 'csv_'.$count; ?>" class="csv_errors" data-code="<?php echo $value['err_code']; ?>"  data-status="<?php echo $value['status']; ?>" data-paper="<?php echo $value['paper_type']; ?>" data-img="<?php echo $value['err_img']; ?>" data-remarks="<?php echo $remarks; ?>" data-error-msg="<?php echo clean($value['error_msg']); ?>" data-subcode="<?php echo $value['sub_code']; ?>">
          <?php
          $count++;
          }
        }

    //fetch error codes ends 

?>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
         <link href="https://fonts.googleapis.com/css?family=Muli" rel="stylesheet">
        <script
        src="https://code.jquery.com/jquery-3.5.1.min.js"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
        crossorigin="anonymous"></script>
         <script src="assets/js/popper.min.js"></script>
         <script src="assets/js/bootstrap.min.js"></script>
         <script src="assets/js/imagecapture.js?time=<?php echo time(); ?>"></script>
         <script src="assets/js/ajax.js?time=<?php echo time(); ?>"></script>
         <script src="assets/js/camera_module.js?time=<?php echo time(); ?>"></script>
         <script src="assets/js/device_info.js?time=<?php echo time(); ?>"></script>
         <script src="assets/js/script.js?time=<?php echo time(); ?>"></script>
         <script src="assets/js/bata.js?time=<?php echo time(); ?>"></script>

          <script src="assets/js/error_codes.js?time=<?php echo time(); ?>"></script>

         <link href="https://cdnfmas.s3-accelerate.amazonaws.com/assets-g-20190228/web/fmas-s2s-latest-min.css" title="uwstyle" type="text/css" rel="stylesheet" media="all" />
         <link href="https://cdnfmas.s3-accelerate.amazonaws.com/assets-g-20190228/web/fmas-universal-widget-latest-min.css" type="text/css" rel="stylesheet" media="all" />
         <!-- Need to include in the end of page, to load widget code -->
         <script src="https://cdnfmas.s3-accelerate.amazonaws.com/assets-g-20190228/web/md5.js" type="text/javascript"></script>
         <script src="https://cdnfmas.s3-accelerate.amazonaws.com/assets-g-20190228/web/fmas-universal-widget-latest-min.js" type="text/javascript"></script>
         <link rel="stylesheet" media="all" href="assets/css/bootstrap.min.css?time=<?php echo time(); ?>">
         <link rel="stylesheet" media="all" href="assets/css/all.min.css?time=<?php echo time(); ?>">
         <link rel="stylesheet" media="all" href="assets/css/style.css?time=<?php echo time(); ?>">
         <link rel="stylesheet" media="all" href="assets/css/developer.css?time=<?php echo time(); ?>">
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
         <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
         <script>var baseUrl = "<?php echo $weblink; ?>"</script>
        <!--  <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> -->
        <title>Bata Shoesize</title>
         <link rel="icon" href="assets/img/fms-fev.png">
         <?php if( $iPod || $iPhone || $iPad ): ?>
         <meta name="apple-mobile-web-app-capable" content="yes">
         <?php else: ?>
         <meta name="mobile-web-app-capable" content="yes">
         <?php endif; ?>
         <meta name="google-signin-client_id" content="726824913868-36iss64ogbthlmhnkcle4gq4nnoc92bp.apps.googleusercontent.com">
         <script src="https://apis.google.com/js/platform.js" async defer></script>
         <link rel="stylesheet" type="text/css"  href="assets/css/jquery-confirm.css"/>
         <script src="assets/js/jquery-confirm.js"></script>
        <script async defer
         src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD0JsyItHkuqxP2q0BjWnwtUBZbB8Ek5DI&callback=init"></script>
        <script type="text/javascript">
              $(document).ready(function() {
                if (typeof fms.getFootMeasurementFromLiveServer != "undefined") {
                  console.log('ready_doc');
                    fms.getFootMeasurementFromLiveServer( "autogettingrelutfromliveserver" );
                }
              });
        </script>
       
        <script>
          $(document).on('click','.fms-view-right-btn',function(){
                 $("#fms-right-result-btns .fms-retake-photo").show();
           });
           
          function checkOrientation(){
             if (window.matchMedia("(orientation: portrait)").matches) {
               $(".custom-home-wrapper").css('display','block');
               $(".rotate-screen").css('display','none');
             }
             if (window.matchMedia("(orientation: landscape)").matches) {
               //alert('Landscape');
               $(".custom-home-wrapper").css('display','none');
               $(".rotate-screen").css('display','block');
             }  
          }
          $(document).ready(function(){
            checkOrientation();
            $(document).on('click','.fms-shop-recommendations',function(){
              $(".back-button").attr('data-type','recommendations');
              $(".back-btn").attr('data-type','recommendations');
            });
            });
            $(window).on("orientationchange",function(){
               if(window.orientation == 0){
                 //alert('portrait');
                 $(".custom-home-wrapper").css('display','block');
                 $(".rotate-screen").css('display','none');
               
               }else{
                 //alert('Landscape');
                 $(".custom-home-wrapper").css('display','none');
                 $(".rotate-screen").css('display','block');
               }
          });
        </script>
        <script type="text/javascript">
           $(document).ready(function(){
             var isChromium = window.chrome;
             var winNav = window.navigator;
             var vendorName = winNav.vendor;
             var isOpera = typeof window.opr !== "undefined";
             var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
             var isIOSChrome = winNav.userAgent.match("CriOS");
             var isIOSOpera = winNav.userAgent.match("OPiOS");
             var isIOSFireFox = winNav.userAgent.match("FxiOS");
             var isIOSmercury = winNav.userAgent.match("mercury");
             var UCBrowser = winNav.userAgent.match("UCBrowser");
             var IOSsafari = winNav.userAgent.match("Safari");
             var isAndroid = winNav.userAgent.match("Android");
             var isAndroid = winNav.userAgent.match("Android");
               function createCookie(name, value) { 
                 document.cookie = name + "=" + value; 
               } 
               if (isIOSChrome) {
                 // window.location.href = "https://shoesize.online/dev/bata-9-api/not-safari.php";
               } 
               //Only For IOS
               if(isIOSOpera || isIOSFireFox || isIOSmercury || UCBrowser ){
                  window.location.href = "https://shoesizefinder.bata.in/api/not-safari.php";
               }
               //Only For Adroid
               if(isAndroid != null){
                  // if(isChromium !== null && typeof isChromium !== "undefined" && vendorName === "Google Inc." && isOpera === false && isIEedge === false) {
                  if(isChromium !== null && typeof isChromium !== "undefined") {
                       // is Google Chrome
                     //alert('chrome');
                    } else { 
                       // not Google Chrome 
                      window.location.href = "https://shoesizefinder.bata.in/api/not-safari.php";

                    }

               }
               
             /**Recommendations Backbutton script starts**/ 
             $('.back-button').on('click',function(){
               if($('#fms-result').css('display') == 'block'){
                 //console.log('hide');
                 $(this).css('display','none');
               }
             });
             /**Recommendations Backbutton script ends**/ 
           });
                
           function copyURL (){
             var urlInput = document.createElement('input');
             var url = window.location.href;
           
             document.body.appendChild(urlInput);
             urlInput.value = url;
             urlInput.select();
             document.execCommand('copy');
             document.body.removeChild(urlInput);
             alert("Copied URL: "+ url);
           };     
        </script>
        <script>
           var find_cate_url = "<?php echo $catelog_uri ?>",
            fms_cate_key = "<?php echo $wasecure_key ?>",
            is_user_loged_in = null,
            log_in_provider = null;
            $(document).on('click','.fms-shop-recommendations',function(){
               window.location.href = '<?php echo $redirect_url; ?>';
         
            });
        </script>
        <script>
           function getOS() {
             var userAgent = window.navigator.userAgent,
              platform = window.navigator.platform,
              macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
              windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
              iosPlatforms = ['iPhone', 'iPad', 'iPod'],
              os = null;
           
               if (macosPlatforms.indexOf(platform) !== -1) {
                  os = 'Mac OS';
               } else if (iosPlatforms.indexOf(platform) !== -1) {
                  os = 'iOS';
               } else if (windowsPlatforms.indexOf(platform) !== -1) {
                  os = 'Windows';
               } else if (/Android/.test(userAgent)) {
                  os = 'Android';
               } else if (!os && /Linux/.test(platform)) {
                  os = 'Linux';
               }
           
              return os;
           }
            window.fbAsyncInit = function() {
              FB.init({
                appId: '828335837513356',
                cookie: true,
                xfbml: true,
                version: 'v3.2'
              });
           
              FB.AppEvents.logPageView();
           
            };
           
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) {
                return;
              }
              js = d.createElement(s);
              js.id = id;
              js.src = "https://connect.facebook.net/en_US/sdk.js";
              js.crossorigin = "anonymous";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
           
            function googleOnSignIn(_data) {
              fms.googleOnSignIn(_data);
            }
            function resetForm() {
              document.getElementById("sent_to_api").reset();
            }
        </script>
               <!-- Geoloaction API's work start -->
        <script type="text/javascript">
           $(document).ready(function(){
               $.ajax({
                   url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyD0JsyItHkuqxP2q0BjWnwtUBZbB8Ek5DI',
                   dataType: 'json',
                   type: 'post',
                   contentType: 'application/x-www-form-urlencoded',
                   success: function( data, textStatus, jQxhr ){
                       // console.log('data',data);
                       if(data.location.lng != '' && data.location.lat != ''){
                         $("#geo_long").val(data.location.lng);
                         $("#geo_lat").val(data.location.lat);
                       }
                   },
                   error: function( jqXhr, textStatus, errorThrown ){
                       console.log( errorThrown );
                   }
               });
           });
        </script>
        <script>
           function init() {
             var userlat = $("#geo_lat").val();
             var userlong = $("#geo_long").val();
             if(userlat  != '' && userlong != ''){
                 var map = new google.maps.Map(document.getElementById('map'), {
                   zoom: 8,
                   center: {lat: userlat, lng: userlong}
                 });
             }else{
               var map = new google.maps.Map(document.getElementById('map'), {
                 zoom: 8,
                 center: {lat: 40.731, lng: -73.997}
               });
             }
             var geocoder = new google.maps.Geocoder;
             //var infowindow = new google.maps.InfoWindow;
             var infowindow = new google.maps.InfoWindow({
               content: name
             });
             //document.getElementById('CustomBackButton').addEventListener('click', function() {
               geocodeLatLng(geocoder, map, infowindow);
             //});
           }
           function geocodeLatLng(){
           
             var userlat = $("#geo_lat").val();
             var userlong = $("#geo_long").val();
             if(userlat  != '' && userlong != ''){
                 var map = new google.maps.Map(document.getElementById('map'), {
                   zoom: 8,
                   center: {lat: userlat, lng: userlong}
                 });
             }else{
               var map = new google.maps.Map(document.getElementById('map'), {
                 zoom: 8,
                 center: {lat: 40.731, lng: -73.997}
               });
             }
             if (navigator.geolocation) {
               navigator.geolocation.getCurrentPosition(function(position) {
                 var pos = {
                   lat: position.coords.latitude,
                   lng: position.coords.longitude
                 };
                 var geocoder = new google.maps.Geocoder;
                 //var infowindow = new google.maps.InfoWindow;
                 var infowindow = new google.maps.InfoWindow({
                   content: name
                 });
                 var latlng = {lat: position.coords.latitude, lng: position.coords.longitude}        
                 geocoder.geocode({'location': pos}, function(results, status) {
                   if (status === 'OK') {
                     if (results[0]) {
                       var marker = new google.maps.Marker({
                         position: latlng,
                         map: map
                       });
                       var address = results[0].address_components;
                       var country = '';
                       var state = '';
                       var city = '';
                       var town = '';
                       for (var i = 0; i < results[0].address_components.length; i++) {
                         var component = results[0].address_components[i];
                         var addressType = component.types[0];
                         //console.log("component",component);
                         //console.log('addressType',addressType);
                         switch (addressType) {
                             case 'country':
                                 country = component.long_name;
                                 break;
                            case 'administrative_area_level_1':
                              state = component.long_name;
                               break;
                            case 'administrative_area_level_2':
                              city = component.long_name;
                               break;
                            case 'political':
                              town = component.long_name;
                               break;
                         }
                       }
                       //alert(country)
                       //console.log('state',state);
                       $("#geo_location_country").val(country);
                       $(".geo_location_state").val(state);
                       $(".geo_location_city").val(city);
                       $(".geo_location_town").val(town);

                       
                       if (country == 'US' || country == 'CN' || country == 'MX' ){
                          $("#userGeoAfterCondition").val('US');
                          //$("name=[Geography]").val('US');

                       }else{
                         $("#userGeoAfterCondition").val('ROW');
                          //$("name=[Geography]").val('ROW');

                       }
                     infowindow.setContent(results[0].formatted_address);
                     infowindow.open(map, marker);
                     } else {
                       //window.alert('No results found');
                     }
                   } else {
                     //window.alert('Geocoder failed due to: ' + status);
                   }
                 });
               }, function() {
                   if(typeof infowindow != 'undefined'){
                       handleLocationError(true, infowindow, map.getCenter());
                   }
                 }
               );
             } else {
               // Browser doesn't support Geolocation
               if(typeof infowindow != 'undefined'){
                   handleLocationError(false, infowindow, map.getCenter());
               }
             }
           };
           
           function handleLocationError(browserHasGeolocation, infowindow, pos) {
             infowindow.setPosition(pos);
             infowindow.setContent(browserHasGeolocation ?
                                   'Error: The Geolocation service failed.' :
                                   'Error: Your browser doesn\'t support geolocation.');
             infowindow.open(map);
           }
        </script>
      <!-- Geoloaction API's work ends -->
        <?php
        if ((($_REQUEST['auth_key']) == 'findmeashoe') && (($_REQUEST['auth_password']) == 'Find123456')) {
          if (((!isset($gender)) || $gender == "") || ((!isset($Geography)) || $Geography == "")  || ((!isset($sizesystem)) || $sizesystem == "") || ((!isset($shoesize)) || $shoesize == "") || ((!isset($user_email)) || $user_email == "")) { ?>
      <script>
        $(document).ready(function() {
          console.log('con_first');
          $("#data-section").show();
         // if (typeof fms.getFootMeasurementFromLiveServer != "undefined") {
         //     fms.getFootMeasurementFromLiveServer( "autogettingrelutfromliveserverEmpty" );
         //   }
         });
      </script>
      <?php } else { ?>
        <script>
          $(document).ready(function() {
          console.log('second');

            $(".back-btn").show();
              if (typeof fms.getFootMeasurementFromLiveServer != "undefined") {
                fms.getFootMeasurementFromLiveServer( "autogettingrelutfromliveserver" );
              }else{
                 $(".fms-take-instruction").trigger("click");
              }
          });
        </script>
      <?php } ?>
      <script type="text/javascript">
         $(document).ready(function(){
             if($("#fms-user-ins-page1").css('display') == 'block'){
                 $(".back-button").show();
             }
         });
      </script>

        <style>
         .cross-icon-style{
             padding-right: 7px !important;
          }
          .button {
           background: none;
           background-color: #0082fc;
           border-radius: 5px;
           height: 35px;
          }
          /* .fms-shop-recommendations{
           width: 90%;
           text-align: center !important;
           }
           .response_buttons .fms-shop-recommendations{
           width: 93% !important;
           text-align: center !important;
           }*/
          #data-section.bata-close-application{
            padding: 8px 0px 6px 0px !important;
          }
           .fms-error-text{
           text-align:center;
           }
           #fms-left-result-btns .fms-take-photo-btn, 
           #fms-right-result-btns .fms-retake-photo,
           .fms-left-photo, 
           .fms-view-right-btn, .fms-view-left-btn{
           /*width: 45%;*/
           text-align:center;
           }
           .fms-view-right-btn > img, .fms-view-left-btn > img{
           width: 30px;
           margin-top: -6px;
           }
           .custom-email-error{
           color:red;
           font-size:12px;
           }
/*           .custom-img-div , .custom-text-div{    
           text-align: center; 
           }
           .rotate-screen img{
           height: 90px;
           width:90px;
           }*/
           .rotate-screen{
           /*display : block;*/
           display: none;
           }
           .custom-home-wrapper{
           /*display: none;*/
           }
           /*style for alert box*/
           .jconfirm-holder {
            padding-top:0px !important;
            padding-bottom:0px !important;
            position:absolute;
            top:0px;
           }
           .jconfirm .jconfirm-holder {
            padding: 0px !important;
           }
           /*style for alert box*/
          <?php
            if ($_REQUEST['bgcolor'] != '') { 
          ?>
            body,html {
             background-image: none;
             background-color: <?php echo "#" . $_REQUEST['bgcolor']; ?>
            }
         <?php 
          } 
          ?>
          <?php
          if ($_REQUEST['fontcolor'] != '') { ?>.fmd-radio-container input:checked~.fms-checkmark {
                background-color: <?php echo "#" . $_REQUEST['fontcolor']; ?>;
          }
            /*bata styles starts */
            /*.api-font-color{
              color: <?php echo  "#" .$_REQUEST['fontcolor']; ?> !important;
            }*/
          /*bata styles ends*/
          .fms-title-page1 {
              color: <?php echo "#" . $_REQUEST['fontcolor']; ?>;
          }
          .fms-error-text {
            color: <?php echo "#" . $_REQUEST['fontcolor']; ?>;
          }
          .fms-home-info-wrapper h3 {
            color: <?php echo "#" . $_REQUEST['fontcolor']; ?>;
          }
          .
          .fms-home-login-wrapper h3 {
            color: <?php echo "#" . $_REQUEST['fontcolor']; ?>;
          }


          .fms-foot-type-and-size {
            background-color: <?php echo $_REQUEST['fontcolor']; ?>;
          }
          div.fms-result-help-box .form-box .fields button {
            background: <?php echo "#" . $_REQUEST['btncolor']; ?>;
          }
          <?php
          }
         if ($_REQUEST['btncolor'] != '')
         ?>
          .api-btn-style {
             /*background: none;*/
             /*background-color: <?php echo "#" . $_REQUEST['btncolor']; ?> !important;*/
             /*border-radius: 5px;*/
           }

           .perfect-form-area input[type="radio"]:checked + label:after, .perfect-form-area input[type="radio"]:not(:checked) + label:after{

                /*background:  <?php echo "#" . $_REQUEST['btncolor']; ?> !important;*/
            }
           .red-btn{
              /*background-color: <?php echo "#" . $_REQUEST['btncolor']; ?> !important;*/
           }
           .api-style-hover:hover{
            /*background-color: <?php echo "#" . $_REQUEST['btncolor']; ?> !important;*/
           }

           .form-age select {

                /*background: url(../images/select-arrow.png) no-repeat right;*/
              background-image: linear-gradient(45deg, transparent 50%, <?php echo "#" . $_REQUEST['btncolor']; ?> 50%), linear-gradient(135deg, <?php echo "#" . $_REQUEST['btncolor']; ?> 50%, transparent 50%) !important;
               background-position:
               calc(100% - 15px) calc(1em - 7px),
               calc(100% - 6px) calc(1em - 7px),
               100% 0;
               background-size:
               10px 10px,
               10px 10px,
               2.5em 2.5em;
               background-repeat: no-repeat;
          }
           .profile-info{
            background-color: <?php echo "#" . $_REQUEST['btncolor']; ?> !important;
           }
          .fms-checkmark {
            border: 4px solid <?php echo "#" . $_REQUEST['btncolor']; ?>;
          }
         .fmd-radio-container input:checked~.fms-checkmark {
            background-color: <?php echo "#" . $_REQUEST['btncolor']; ?>;
          }
          .custom-radio label:before {
            border: 2px solid <?php echo "#" . $_REQUEST['btncolor']; ?>;
          }
         .custom-radio label input[type='radio']:checked+span{
              background-color:<?php echo "#" . $_REQUEST['btncolor']; ?>;
          }
          select.custom-select {
          /* background-image: linear-gradient(45deg, transparent 50%, <?php echo "#" . $_REQUEST['btncolor']; ?> 50%), linear-gradient(135deg, <?php echo "#" . $_REQUEST['btncolor']; ?> 50%, transparent 50%);*/
          }
          .confirm-buttons{
            background-color:<?php echo "#" . $_REQUEST['btncolor'] ; ?> !important;
            color: <?php echo $_REQUEST['fontcolor'] ; ?> !important;
          }
         /* arrows */
         select.classic {
            /* background-image:
             linear-gradient(45deg, transparent 50%, <?php echo "#" . $_REQUEST['btncolor']; ?> 50%),
             linear-gradient(135deg, <?php echo "#" . $_REQUEST['btncolor']; ?> 50%, transparent 50%);*/
             background-position:
             calc(100% - 15px) calc(1em - 7px),
             calc(100% - 6px) calc(1em - 7px),
             100% 0;
             background-size:
             10px 10px,
             10px 10px,
             2.5em 2.5em;
             background-repeat: no-repeat;
             margin-top: 17px;

          }
          <?php
            }
          ?>
        </style>
    </head>
   <body>
      <!-- For new user value = new_user for old user value would be old_user -->
      <input type="hidden" name="confirm_screen_status" id="confirm_screen_status" value="no">
      <input type="hidden" name="user_type" id="user_type" value="">
      <input type="hidden" name="api_shoe_size_eu" id="api_shoe_size_eu" value="">
      <input type="hidden" name="api_shoe_size_uk" id="api_shoe_size_uk" value="">
      <input type="hidden" name="api_shoe_size_us" id="api_shoe_size_us" value="">
      <input type="hidden" name="api_gender" id="api_gender" value="">
      <input type="hidden" name="geo_lat" id="geo_lat">
      <input type="hidden" name="geo_long" id="geo_long">
      <input type="hidden" name="geo_location_country" id="geo_location_country">
      <input type="hidden" name="userGeoAfterCondition" id="userGeoAfterCondition" value="ROW">
      <input type="hidden" name="current_foot_type" id="current_foot_type" value="right">
      <input type="hidden" name="user_email_custom" id="user_email_custom" value="<?php echo $user_email; ?>">
      <input type="hidden" name="left_foot_len" id="left_foot_len" value="0">
      <input type="hidden" name="bata_width" class="bata_width"  id="bata_width" value="">
      <input type="hidden" name="bata_size"  class="bata_size" id="bata_size" value="">
      <input type="hidden" name="bata_gender" class="bata_gender" id="bata_gender" value="">
      <input type="hidden" name="paw_warning" id="paw_warning" value="">
      <input type="hidden" name="paw_warning_image" id="paw_warning_image" value="">

      <input type="hidden" name="request_geo" id="request_geo" value="ROW">

      <input type="hidden" name="form-gender" id="form-gender" value="<?php echo $gender; ?>">
      <input type="hidden" name="form-shoesize" id="form-shoesize" value="<?php echo $shoesize; ?>">
      <input type="hidden" name="form-systemsize" id="form-systemsize" value="<?php echo $_REQUEST['sizesystem'];?>">
      <!-- New API's inputs  starts-->    
      <input type="hidden" name="left_paper_type" id="left_paper_type">   
      <input type="hidden" name="right_paper_type" id="right_paper_type">   

      <!-- New API's inputs  ends-->
      <!-- get api inputs  starts-->
        <!-- right foot -->
        <input type="hidden" name="other_details_right" id="other_details_right" value="empty">
        <input type="hidden" name="other_geo_right" id="other_geo_right" value="">
        <input type="hidden" name="other_gender_right" id="other_gender_right" value="">
        <input type="hidden" name="other_paper_type_right" id="other_paper_type_right" value="">
        <input type="hidden" name="other_paw_right" id="other_paw_right" value="">
        <input type="hidden" name="other_debug_image_right" id="other_debug_image_right" value="">



        <!-- left foot -->

        <input type="hidden" name="other_details_left" id="other_details_left" value="empty">
        <input type="hidden" name="other_geo_left" id="other_geo_left" value="">
        <input type="hidden" name="other_gender_left" id="other_gender_left" value="">
        <input type="hidden" name="other_paper_type_left" id="other_paper_type_left" value="">
        <input type="hidden" name="other_paw_left" id="other_paw_left" value="">
        <input type="hidden" name="other_debug_image_left" id="other_debug_image_left" value="">

        <!-- get api inputs ends -->
      <div id="map"></div>
        <!-- rotate-screen ends  -->
        <section class="rotate-screen" style="display: none;">
            <div class="container">
               <div class="rotate-device pd-t15">
                   <img src="assets/images/device.png" alt="">
                   <p>Please rotate your device <br> to go to the Portrait mode.</p>
                   <span>Landscape mode is not supported</span>
               </div>
            </div>
        </section>

        <!-- rotate-screen ends  -->

        <!-- wrapper custom-home-wrapper   starts -->
        <div class="wrapper custom-home-wrapper">
           <!-- fms-section-container div starts -->
           <div class="fms-section-container">
            <?php 
                 if ((($iPod || $iPhone || $iPad)&&($Safari)) || (($Android)&&($chrome))){ ?>

              <!-- When new user login data section  data-section -->
              <?php 
               if (((!isset($user_email)) || $user_email == "") || ((!isset($gender)) || $gender == "") || ((!isset($Geography)) || $Geography == "")  || ((!isset($sizesystem)) || $sizesystem == "") ||  ((!isset($shoesize)) || $shoesize == "")) { ?>
                <section id="data-section" class="do_not_show first_condition_section" style="display: none;">
                    <div class="container">
                       <div class="perfect-shoe-area pd-t15 fms-sec-title">
                           <h4>Find your <br> perfect shoe size</h4>
                       </div>
                       <div class="perfect-form-area">
                        <form id="sent_to_api" action="request.php" method="post">
                        <input type="hidden" name="geo_location_state" class="geo_location_state" >
                        <input type="hidden" name="geo_location_city" class="geo_location_city" >
                        <input type="hidden" name="geo_location_town" class="geo_location_town" >

                        <label class="hide"><span>TAG</span><input name="tag" placeholder="" value="client"></label>
                        <label class="hide"><span>Email</span><input name="email" placeholder="" value="adminappc@findmeashoe.com"></label>
                        <label><input type="hidden" name="fms-first-and-last-name" placeholder="First & Second Name" class="fms-first-and-last-name" value="<?php echo $user_name; ?>"></label>
                        <label class="hide"><span>Device</span><input name="device" placeholder="" value="iPhone 6S , iOS : 11.4  [ TOPVIEW: P: -4.3 R: 1.8] [Resolution: 1920x1080] [Paper_Type: 0]"></label>
                         <span></span>
                         <?php if ($user_email == "") { ?>
                         <p class="fms-error-message">Please enter email address, without email cannot proceed further!</p>
                         <?php } ?>
                         <?php if ($user_email == "") { ?>
                         <div class="email-css">
                            <label> <input type="email" name="user_email" placeholder="email" class="fms-user-email" required></label>
                         </div>
                         <?php } else { ?>
                         <label><input type="hidden" name="user_email" placeholder="email" class="fms-user-email" value="<?php echo $user_email; ?>"></label>
                         <?php } ?>

                        <!-- Radio buttons for gender starts -->
                        <?php if($gender){ ?>
                           <label><input type="hidden" name="gender" placeholder="email" class="custom-gender-input" value="<?php echo $gender; ?>"></label>
                            <div class="form-adj gender-icons">
                              <div class="character">
                                <img src="assets/images/male.png" alt="male">
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input gender-select" type="radio" name="gender" placeholder="" value="M" checked checked>
                                <label class="form-check-label " for="gender_male_up">Male</label>
                              </div>
                            </div>
                            <div class="form-adj gender-icons">
                              <div class="character">
                                <img src="assets/images/female.png" alt="male">
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="W" >
                                <label class="form-check-label" for="gender_female_up">Female</label>
                              </div>
                            </div>
                            <div class="form-adj gender-icons">
                              <div class="character">
                                <img src="assets/images/kid.png" alt="male">
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="B" >
                                <label class="form-check-label" for="gender_kids_up">Kid</label>
                              </div>
                            </div>
                        <?php }else{ ?>
                          <label><input type="hidden" name="gender" placeholder="email" class="custom-gender-input" value="M"></label>
                          <div class="form-adj gender-icons">
                            <div class="character">
                              <img src="assets/images/male.png" alt="male">
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="M" checked  checked>
                              <label class="form-check-label " for="gender_male_up">Male</label>
                            </div>
                          </div>
                          <div class="form-adj gender-icons">
                            <div class="character">
                              <img src="assets/images/female.png" alt="male">
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="W" >
                              <label class="form-check-label" for="gender_female_up">Female</label>
                            </div>
                          </div>
                          <div class="form-adj gender-icons">
                            <div class="character">
                              <img src="assets/images/kid.png" alt="male">
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="B" >
                              <label class="form-check-label" for="gender_kids_up">Kid</label>
                            </div>
                          </div>
                        <?php } ?>
                        <!-- Radio buttons for gender ends -->
                        <div class="speacer20"></div>
                        <!-- Geography select starts -->
                           <input class="form-check-input fms-geoloc" type="radio" name="Geography"  value="ROW" >
                        <!-- Geography select ends -->


                        <div class="speacer20"></div>
                        <!-- Age selects starts -->
                        <?php if($age){ ?>
                          <label class="hide"><span>Age</span><input name="age" placeholder="" value="<?php echo $age; ?>"></label>
                          <div class="form-group form-check-inline form-age">
                            <label for="inputState">Age</label>
                             <select class="form-control col-3 selected-form-age">
                            <?php 
                              for ($i=4; $i < 100; $i++) { 
                            ?>
                                <?php if($i == 25){
                                ?>
                                 <option  value="<?php echo $i; ?>" selected><?php echo $i;?></option>
                                <?php
                                }else{ ?>
                                  <option  value="<?php echo $i; ?>"><?php echo $i;?></option>
                              
                            <?php
                                }
                              }
                            ?>
                            </select>
                           <label class="hide"><span>Age</span><input name="age" class="request-form-age" placeholder="" value="25"></label>
                          </div>
                        <?php }else{ ?>
                        <div class="form-group form-check-inline form-age">
                          <label for="inputState">Age</label>
                           <select class="form-control col-3 selected-form-age">
                          <?php 
                            for ($i=4; $i < 100; $i++) { 
                          ?>
                              <?php if($i == 25){
                              ?>
                               <option  value="<?php echo $i; ?>" selected><?php echo $i;?></option>
                              <?php
                              }else{ ?>
                                <option  value="<?php echo $i; ?>"><?php echo $i;?></option>
                            
                          <?php
                              }
                            }
                          ?>
                          </select>
                         <label class="hide"><span>Age</span><input name="age" class="request-form-age" placeholder="" value="25"></label>
                        </div>
                        <?php } ?>
                        <!-- Age selects ends -->
                        <label class="hide"><span>User Name</span><input name="username" placeholder="" value="<?php echo $user_name; ?>"></label>
                        <label class="hide"><span>App Version</span><input name="appVersion" placeholder="" value="0.0"></label>
                        <!--<label class="hide"><span>Foote Type</span><input name="foot_type" placeholder="" value="1"></label>-->
                        <label class="hide"><span>Paper Type</span><input name="paper_type" placeholder="" value="0"></label>
                        <label class="hide"><span>Foot type</span><input name="foot_type" placeholder="" value="0"></label>
                        <label class="hide"><span>Org Id</span><input name="orgID" placeholder="" value="<?php echo $orgId; ?>"></label>
                        <label class="hide"><span>Image Data</span><input name="topView" placeholder="" value=""></label>
                        <label class="hide"><span>Curl Url</span><input name="requestUrl" placeholder="" value="request.php"></label>
                        <div class="speacer20"></div>
                        <!-- systemsize and shoesize starts -->

                                   <div class="fms-typical-size-container">
                                          <label class="hide"><span>SizeSystem</span><input type="hidden" name="SizeSystem" class="fms-SizeSystem fms-SizeSystem-new classic request-systemsize" value="<?php echo $sizesystem ?>"></label>
                                          <div class="typical-shoe">
                                            <h4>Typical shoe size</h4>
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input selected-shoesize" type="radio" name="selected-shoesize"  value="US" checked>
                                              <label class="form-check-label" for="shoes_us">US</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input selected-shoesize" type="radio" name="selected-shoesize" value="UK" >
                                              <label class="form-check-label" for="shoes_uk">UK</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input selected-shoesize" type="radio" name="selected-shoesize" value="EU" >
                                              <label class="form-check-label" for="shoes_eu">EU</label>
                                            </div>
                                          </div>

                                            <!-- Systemsize ends -->
                                            <div class="speacer20"></div>
                                            <div class="form-check-inline form-age form-age-scale">
                                                <label class="col-7 p-0" for="inputState">Size Scale</label>
                                                <select name="size" class="fms-shoesize shoesize classic form-control">
                                                </select>
                                            </div>
                                   </div>
      
                        <!-- systemsize and shoesize ends -->
                        <div id="device_info"></div>
                      </form>
                       </div>
                       <div class="sigle-line-btn">
                          <!-- <button type="submit" class="red-btn"><img src="images/left-circle-icon.png" alt="icon"> Go back</button> -->
                          <button class="fms-take-reset red-btn api-btn-style" onclick="resetForm();"><img src="assets/images/left-circle-icon.png" />Reset</button>
                          <button class="fms-take-instruction check-back red-btn api-btn-style"><img src="assets/images/check-circle.png" alt="icon"> Submit</button>
                          <a href="<?php echo $redirect_url; ?>" class="red-btn bata-close-application api-btn-style"><img class="cross-icon-style" src="assets/images/cross-icon.png" alt="icon">&nbsp;&nbsp;Go to bata.in</a>
                       </div>
                    </div>
                </section>
              <?php } else { ?>
                <section id="data-section" class="do_not_show second_condition_section" style="display: none;">
                  <div class="container">
                     <div class="perfect-shoe-area pd-t15">
                         <h4>Find your <br> perfect shoe size</h4>
                     </div>
                     <div class="perfect-form-area">
                      <form id="sent_to_api" action="request.php" method="post">
                          <input type="hidden" name="geo_location_state" class="geo_location_state" >
                          <input type="hidden" name="geo_location_city" class="geo_location_city" >
                          <input type="hidden" name="geo_location_town" class="geo_location_town" >
                          <label class="hide"><span>TAG</span><input name="tag" placeholder="" value="client"></label>
                         <label class="hide"><span>Email</span><input name="email" placeholder="" value="adminappc@findmeashoe.com"></label>
                         <label><input type="hidden" name="fms-first-and-last-name" placeholder="First & Second Name" class="fms-first-and-last-name" value="<?php echo $user_name; ?>"></label>
                         <label><input type="hidden" name="user_email" placeholder="email" class="fms-user-email" value="<?php echo $user_email; ?>"></label>
                         <label class="hide"><span>Device</span><input name="device" placeholder="" value="iPhone 6S , iOS : 11.4  [ TOPVIEW: P: -4.3 R: 1.8] [Resolution: 1920x1080] [Paper_Type: 0]"></label>
                         <div>
                        <!-- Radio buttons for gender starts -->
                        <label><input type="hidden" name="gender" placeholder="email" class="custom-gender-input fms-gender" value="<?php echo $gender; ?>"></label>
                        <?php if($gender == 'M'){ ?>
                          <div class="form-adj gender-icons">
                            <div class="character">
                              <img src="assets/images/male.png" alt="male">
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="M" checked id="gender_male" checked>
                              <label class="form-check-label " for="gender_male">Male</label>
                            </div>
                          </div>
                          <div class="form-adj gender-icons">
                            <div class="character">
                              <img src="assets/images/female.png" alt="male">
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="W" id="gender_female">
                              <label class="form-check-label" for="gender_female">Female</label>
                            </div>
                          </div>
                          <div class="form-adj gender-icons">
                            <div class="character">
                              <img src="assets/images/kid.png" alt="male">
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="B" id="gender_kids">
                              <label class="form-check-label" for="gender_kids">Kid</label>
                            </div>
                          </div>
                        <?php }elseif($gender == 'W'){ ?>
                          <div class="form-adj gender-icons">
                            <div class="character">
                              <img src="assets/images/male.png" alt="male">
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="M" checked id="gender_male_up">
                              <label class="form-check-label " for="gender_male_up">Male</label>
                            </div>
                          </div>
                          <div class="form-adj gender-icons">
                            <div class="character">
                              <img src="assets/images/female.png" alt="male">
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="W" id="gender_female_up" checked>
                              <label class="form-check-label" for="gender_female_up">Female</label>
                            </div>
                          </div>
                          <div class="form-adj gender-icons">
                            <div class="character">
                              <img src="assets/images/kid.png" alt="male">
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="B" id="gender_kids_up">
                              <label class="form-check-label" for="gender_kids_up">Kid</label>
                            </div>
                          </div>
                        <?php }else{ ?>
                         <div class="form-adj gender-icons">
                            <div class="character">
                              <img src="assets/images/male.png" alt="male">
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="M" checked id="gender_male">
                              <label class="form-check-label " for="gender_male">Male</label>
                            </div>
                          </div>
                          <div class="form-adj gender-icons">
                            <div class="character">
                              <img src="assets/images/female.png" alt="male">
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="W" id="gender_female" >
                              <label class="form-check-label" for="gender_female">Female</label>
                            </div>
                          </div>
                          <div class="form-adj gender-icons">
                            <div class="character">
                              <img src="assets/images/kid.png" alt="male">
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="B" id="gender_kids" checked>
                              <label class="form-check-label" for="gender_kids">Kid</label>
                            </div>
                          </div>
                        <?php } ?>                      
                        
                        
                        <!-- Radio buttons for gender ends -->
                        <div class="speacer20"></div>
                        <input type="hidden" name="Geography" class="fms-geoloc" value="<?php echo $Geography; ?>">

                        <div class="speacer20"></div>
                        <!-- Age selects starts -->
                        <?php if($age == ""){ ?>
                          <div class="form-group form-check-inline form-age">
                            <label for="inputState">Age</label>
                            <select class="form-control col-3 selected-form-age ">
                                <?php 
                                  for ($i=4; $i < 100; $i++) { 
                                ?>
                                    <?php if($i == 25){
                                    ?>
                                     <option  value="<?php echo $i; ?>" selected><?php echo $i;?></option>
                                    <?php
                                    }else{ ?>
                                      <option  value="<?php echo $i; ?>"><?php echo $i;?></option>
                                  
                                <?php
                                    }
                                  }
                                ?>
                            </select>
                            <label class="hide"><span>Age</span><input name="age" class="request-form-age" placeholder="" value="25"></label>
                            <label class="hide"><span>Age</span><input name="age" placeholder="" value="25" class="fms-age"></label>
                          </div>
                        <?php }else{ ?>
                          <div class="form-group form-check-inline form-age">
                            <label for="inputState">Age</label>
                            <select class="form-control col-3 selected-form-age">
                                <?php 
                                  for ($i=4; $i < 100; $i++) { 
                                ?>
                                    <?php if($i == $age){
                                    ?>
                                     <option  value="<?php echo $i; ?>" selected><?php echo $i;?></option>
                                    <?php
                                    }else{ ?>
                                      <option  value="<?php echo $i; ?>"><?php echo $i;?></option>
                                  
                                <?php
                                    }
                                  }
                                ?>
                            </select>
                            <label class="hide"><span>Age</span><input name="age" class="request-form-age" placeholder="" value="<?php echo $age; ?>"></label>
                            <label class="hide"><span>Age</span><input name="age" placeholder="" value="<?php echo  $age; ?>" class="fms-age"></label>
                          </div>
                        <?php } ?>
                       

                        <!-- Age selects ends -->

                       <label class="hide"><span>User Name</span><input name="username" placeholder="" value="<?php echo $user_name; ?>"></label>
                       <label class="hide"><span>App Version</span><input name="appVersion" placeholder="" value="0.0"></label>
                       <!--<label class="hide"><span>Foote Type</span><input name="foot_type" placeholder="" value="1"></label>-->
                       <label class="hide"><span>Paper Type</span><input name="paper_type" placeholder="" value="0"></label>
                       <label class="hide"><span>Foot type</span><input name="foot_type" placeholder="" value="0"></label>
                       <label class="hide"><span>Org Id</span><input name="orgID" placeholder="" value="<?php echo $orgId; ?>"></label>
                       <label class="hide"><span>Image Data</span><input name="topView" placeholder="" value=""></label>
                       <label class="hide"><span>Curl Url</span><input name="requestUrl" placeholder="" value="request.php"></label>
                       <!-- for new api's -->   
                        <input type="hidden" name="right[L1]" class="right_L1" value="">    
                        <input type="hidden" name="right[W1]" class="right_W1" value="">    
                        <input type="hidden" name="right[L2]" class="right_L2" value="">    
                        <input type="hidden" name="right[L4]" class="right_L4" value="">    
                        <input type="hidden" name="right[A24]" class="right_A24" value="">    
                        <input type="hidden" name="right[A0]" class="right_A0" value="">    
                        <input type="hidden" name="left[L1]" class="left_L1" value="">    
                        <input type="hidden" name="left[W1]" class="left_W1" value="">    
                        <input type="hidden" name="left[L2]" class="left_L2" value="">    
                        <input type="hidden" name="left[L4]" class="left_L4" value="">    
                        <input type="hidden" name="left[A24]" class="left_A24" value="">    
                        <input type="hidden" name="left[A0]" class="left_A0" value="">    
                        <!-- for new api's -->
                        <!-- Systemsize starts -->
                          <!-- <input type="hidden" name="sizesystem" class="fms-SizeSystem" value="<?php echo $sizesystem; ?>">
                          <input type="hidden" name="shoesize" class="shoesize" value="<?php echo $shoesize; ?>"> -->
                          <input type="hidden" name="selected-shoesize" class="form-check-input selected-shoesize" id="shoes_us" value="UK">  
                        <input type="hidden" name="SizeSystem" class="fms-SizeSystem request-systemsize" value="UK">
                          <!-- systemsize and shoesize starts -->
                           <div class="fms-typical-size-container">
                                  <!-- <label class="hide"><span>SizeSystem</span><input type="hidden" name="SizeSystem" class="fms-SizeSystem fms-SizeSystem-new classic request-systemsize" value="<?php echo $sizesystem ?>"></label>
                                   <div class="typical-shoe">
                                      <h4>Typical shoe size</h4>
                                      <div class="form-check form-check-inline">
                                        <input class="form-check-input selected-shoesize" type="radio" name="selected-shoesize" id="shoes_us" value="US" >
                                        <label class="form-check-label" for="shoes_us">US</label>
                                      </div>
                                      <div class="form-check form-check-inline">
                                        <input class="form-check-input selected-shoesize" type="radio" name="selected-shoesize" value="UK" id="shoes_uk" checked>
                                        <label class="form-check-label" for="shoes_uk">UK</label>
                                      </div>
                                      <div class="form-check form-check-inline">
                                        <input class="form-check-input selected-shoesize" type="radio" name="selected-shoesize" value="EU" id="shoes_eu">
                                        <label class="form-check-label" for="shoes_eu">EU</label>
                                      </div>
                                    </div> -->
                                    <input type="hidden" name="shoesize" class="shoesize" id="custom-shoesize-new" value="<?php echo $shoesize; ?>"> 
                                     <div class="speacer20"></div>
                                      <div class="form-check-inline form-age form-age-scale" style="width:100% !important;">  
                                        <input type="hidden" name="size" class="fms-shoesize shoesize">
                                        <!-- <label class="col-7 p-0" for="inputState">Size Scale</label> 
                                        <select name="size" class="fms-shoesize shoesize classic form-control">
                                        </select> -->
                                        <!-- uncomment it to show size scale latest changes -->
                                        <!-- <label class="col-8 p-0" for="inputState" style="padding-left:0px !important;">Are you above size UK <span class="show-custom-shoesize-val">12</span>?</label> -->
                                        <!-- uncomment it to show size scale latest changes -->
                                      </div>
                                      <!-- uncomment it to show size scale latest changes -->
                                      <!-- <div class="form-check-inline form-age form-age-scale"> 
                            <div class="form-check form-check-inline">  
                              <input class="form-check-input confirm-shoesize" type="radio" name="confirm-shoesize" value="yes" id="shoesize_yes" > 
                              <label class="form-check-label" for="shoesize_yes">Yes</label>  
                            </div>  
                            <div class="form-check form-check-inline" style="margin-left:25px;">  
                              <input class="form-check-input confirm-shoesize" type="radio" name="confirm-shoesize" value="no" id="shoesize_no" checked>  
                              <label class="form-check-label" for="shoesize_no">No</label>  
                            </div>  
                          </div> -->
                          <!-- uncomment it to show size scale latest changes -->
                           </div>
                          <!-- systemsize and shoesize ends -->
                        <div id="device_info"></div>
                      </form>
                     </div>
                     <div class="sigle-line-btn">
                        <!-- <button type="submit" class="red-btn"><img src="images/left-circle-icon.png" alt="icon"> Go back</button> -->
                        <button class="fms-take-instruction check-back red-btn api-btn-style"><img src="assets/images/check-circle.png" alt="icon"> Submit</button>
                        <button class="fms-take-reset red-btn api-btn-style" onclick="resetForm();"><img src="assets/images/left-circle-icon.png" />Reset</button>
                        <a href="<?php echo $redirect_url; ?>" class="red-btn bata-close-application api-btn-style"><img class="cross-icon-style" src="assets/images/cross-icon.png" alt="icon">&nbsp;&nbsp;Go to bata.in</a>
                     </div>
                     <div><p style="font-size:14px;">By using the shoe size finder you agree to our <a href="https://www.bata.in/bataindia/sc-177_cat-41/privacy-policy.html">terms & conditions</a></p></div>
                  </div>
               </section>
              <?php } ?>
              


              <!-- When new user login data section ends-->

              <!-- User confirmation screen starts user-confirmation-section -->
                <section  id="user-confirmation-section" style="display:none;" class="user-confirmation">
                  <div class="container">
                     <div class="perfect-shoe-area pd-t15">
                         <h4>Please confirm your details</h4>
                     </div>
                     <div class="perfect-form-area">
                        <!-- Radio buttons for gender starts -->
                        <div class="form-adj gender-icons">
                          <div class="character">
                            <img src="assets/images/male.png" alt="male">
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input confirm-gender" type="radio" name="confirm-gender" placeholder="" value="M" checked id="gender_M_confirm" checked>
                            <label class="form-check-label " for="gender_M_confirm">Male</label>
                          </div>
                        </div>
                        <div class="form-adj gender-icons">
                          <div class="character">
                            <img src="assets/images/female.png" alt="male">
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input confirm-gender" type="radio" name="confirm-gender" placeholder="" value="W" id="gender_W_confirm">
                            <label class="form-check-label" for="gender_W_confirm">Female</label>
                          </div>
                        </div>
                        <div class="form-adj gender-icons">
                          <div class="character">
                            <img src="assets/images/kid.png" alt="male">
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input confirm-gender" type="radio" name="confirm-gender" placeholder="" value="B" id="gender_B_confirm">
                            <label class="form-check-label" for="gender_B_confirm">Kid</label>
                          </div>
                        </div>
                        <!-- Radio buttons for gender ends -->
                        <div class="speacer20"></div>
                        <!-- Geography select starts -->
                        <div class="typical-shoe" style="display: none;">
                          <h4>Select Geography</h4>
                          <div class="form-check form-check-inline us-div">
                            <!-- <input class="form-check-input geo-loc-us" type="radio" name="confirm-geoloaction" value="US" id="us_geography_confirm"> -->
                            <label class="form-check-label" for="us_geography_confirm">US</label>
                          </div>
                          <div class="form-check form-check-inline rest-of-world-div">
                            <input class="form-check-input geo-loc-row" type="radio" name="confirm-geoloaction"  value="ROW" id="row_geography_confirm" checked>
                            <label class="form-check-label" for="row_geography_confirm">Rest of the world</label>
                          </div>
                        </div>
                        <!-- Geography select ends -->
                        <!-- Age selects starts -->
                        <div class="form-group form-check-inline form-age">
                          <label for="inputState">Age</label>
                           <select class="form-control col-3 selected-form-age">
                          <?php 
                            for ($i=4; $i < 111; $i++) { 
                          ?>
                              <?php if($i == 25){
                              ?>
                               <option  value="<?php echo $i; ?>" selected><?php echo $i;?></option>
                              <?php
                              }else{ ?>
                                <option  value="<?php echo $i; ?>"><?php echo $i;?></option>
                            
                          <?php
                              }
                            }
                          ?>
                          </select>
                         <label class="hide"><span>Age</span><input name="age" class="request-form-age" placeholder="" value="25"></label>
                        </div>
                        <!-- Age selects ends -->
                        <div class="speacer20"></div>
                        <!-- Systemsize starts -->
                        <!-- <label class="hide"><span>SizeSystem</span><input type="hidden" name="SizeSystem" class="fms-SizeSystem  custom-system-size custom-select custom-select-system" value="US"></label>
                        <div class="typical-shoe">
                          <h4>Typical shoe size</h4>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input selected-shoesize-confirm" type="radio" name="selected-shoesize-confim" id="shoes_us_confirm" value="US" checked>
                            <label class="form-check-label" for="shoes_us_confirm">US</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input selected-shoesize-confirm" type="radio" name="selected-shoesize-confim" value="UK" id="shoes_uk_confirm">
                            <label class="form-check-label" for="shoes_uk_confirm">UK</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input selected-shoesize-confirm" type="radio" name="selected-shoesize-confim" value="EU" id="shoes_eu_confirm">
                            <label class="form-check-label" for="shoes_eu_confirm">EU</label>
                          </div>
                        </div> -->
                        <!-- Systemsize ends -->
                        <input type="hidden" name="selected-shoesize-confim" class="form-check-input selected-shoesize-confirm" id="shoes_us_confirm" value="UK"> 
                        <input type="hidden" name="SizeSystem" class="fms-SizeSystem  custom-system-size custom-select custom-select-system" value="UK">
                        <div class="speacer20"></div>
                        <!-- <div class="form-check-inline form-age form-age-scale">
                          <label class="col-7 p-0" for="inputState">Size Scale</label>
                            <select name="size" class="fms-shoesize shoesize custom-shoesize custom-select form-control col-6">
                            </select>
                        </div> -->
                        <input type="hidden" name="size" class="fms-shoesize shoesize custom-shoesize custom-select"> 
                        <div class="form-check-inline form-age form-age-scale" style="width:100% !important;">  
                          <!-- uncomment it to show size scale latest changes -->
                          <!-- <label class="col-8 p-0" for="inputState"  style="padding-left:0px !important;">Are you above size UK <span class="show-custom-shoesize-val">12</span>?</label>  -->
                          <!-- uncomment it to show size scale latest changes -->
                            
                            <!-- <select name="confirm-shoesize" class=" confirm-shoesize-left form-control col-6"> 
                            <option value="yes">yes</option>  
                            <option value="no">no</option>  
                          </select> --> 
                        </div>  
                        <!-- uncomment it to show size scale latest changes -->
                        <!-- <div class="form-check-inline form-age form-age-scale"> 
                          <div class="form-check form-check-inline">  
                            <input class="form-check-input confirm-shoesize-left" type="radio" name="confirm-shoesize" value="yes" id="shoesize_yes1" > 
                            <label class="form-check-label" for="shoesize_yes1">Yes</label> 
                          </div>  
                          <div class="form-check form-check-inline" style="margin-left:25px;">  
                            <input class="form-check-input confirm-shoesize-left" type="radio" name="confirm-shoesize" value="no" id="shoesize_no1" checked>  
                            <label class="form-check-label" for="shoesize_no1">No</label> 
                          </div>  
                        </div> -->
                        <!-- uncomment it to show size scale latest changes -->
                        <div id="device_info"></div>
                     </div>
                     <div class="sigle-line-btn confirmation-buttons">
                        <!-- <button type="submit" class="red-btn"><img src="images/left-circle-icon.png" alt="icon"> Go back</button> -->
                        <button class="red-btn confirm-buttons submit-confirm api-btn-style"><img src="assets/images/check-circle.png" alt="icon"> Submit</button>
                        <button class="red-btn confirm-buttons reset-confirm api-btn-style"><img src="assets/images/left-circle-icon.png" />Cancel</button>
                     </div>
                  </div>
                </section>
              <!-- User confirmation screen ends -->

              <!-- Detail Instruction screen starts for the right foot fms-user-instruction -->
               <section id="fms-user-instruction" class="do_not_show" style="display: none;">
                <div id="fms-user-ins-page1" class="container">
                         <div class="white-sheet pd-t15">
                       <h3>Fetch <span class="grab-one-text">a</span> white <span  id="show-paper-size">A4</span> <span class="sheets-text change-sheet-multiple">sheet</span></h3>
                   </div>
                   <div class="home-img-area">
                      <!-- add this fms-instruction-img class if left right double , single image is different-->
                       <img src="assets/img/single-paper-grab-1.jpg"  alt="shoe" class="img-fluid fms-instruction-img">
                   </div>
                   <div class="speacer20"></div>
                   <div class="two-red-btn">
                       <div class="row">
                         <div class="col-6">
                           <!-- <button type="button" class="red-btn fms-cancel"><img src="assets/images/left-circle-icon.png" alt="icon" class="btn-icon"> Go Back</button> -->
                           <button type="button" class="red-btn back-btn-confirm api-btn-style hide-retake-back-butn"><img src="assets/images/left-circle-icon.png" alt="icon" class="btn-icon"> Go Back</button>
                           <button class="red-btn confirm-buttons reset-confirm retake-cancel-button" style="display:none;"><img src="assets/images/left-circle-icon.png" style="width:20px;margin-right: 20px;"/>Cancel</button>
                         </div>
                         <div class="col-6">
                           <button type="button" class="red-btn fms-take-ins-next api-btn-style"><img src="assets/images/left-circle-icon.png" alt="icon" class="btn-icon flip-icon"> Next</button>
                         </div>
                         <div class="col-12"> 
                           <button type="button" class="red-btn back-btn-confirm show-retake-back-butn" style="display:none;"> Change Your Details</button> 
                         </div>
                       </div>
                   </div>
                </div>
                <div id="fms-user-ins-page2" class="container" style="display:none;">
                    <div class="roll-up-area pd-t15">
                       <p><b>1. Roll up your pants:</b> Place your <span class="grab-foot-type" style="font-weight: bold;">right</span> <span style="font-weight: bold;">foot</span> on the <span class="change-sheet-multiple">sheet</span>. Make sure your heel and A4 <span class="change-sheet-multiple">sheet</span> are touching the wall edge.</p>  
                       <p><b>2. All four A4 <span class="change-sheet-multiple">sheet</span> corners are visible:</b> Click the photo keeping your foot in focus.</p> 
                       <p><b>3. Mobile below waist level:</b> Ensure before clicking the photo. </p>
                   </div>
                   <div class="home-img-area">
                      <!-- add this class fms-instruction-img  for dynamic image -->
                       <img src="assets/img/singlepaper_image_jun.png"  alt="shoe" class="img-fluid fms-instruction-img">
                   </div>
                   <div class="speacer20"></div>
                   <div class="two-red-btn">
                       <div class="row">
                         <div class="col-6">
                           <button type="button" class="red-btn go-back-second api-btn-style"><img src="assets/images/left-circle-icon.png" alt="icon" class="btn-icon"> Go Back</button>
                         </div>
                         <div class="col-6">
                           <button type="button" class="red-btn fms_second_next api-btn-style"><img src="assets/images/left-circle-icon.png" alt="icon" class="btn-icon flip-icon"> Next</button>
                         </div>
                       </div>
                   </div>
                </div>
                <div id="fms-user-ins-page3" class="container" style="display:none;">
                  <div class="roll-up-area pd-t15">
                     <p> Check if the A4 sheet, your foot and the wall edge are aligned.</p>  
                     <p>Any misalignment will affect the accuracy of the measurement.</p>
                  </div>
                  <div class="home-img-area">
                    <!-- fms-instruction-img-custom  add this class for dynamic -->
                     <img src="assets/images/measure-feet.png" alt="shoe" class="img-fluid">
                  </div>
                 <div class="speacer20"></div>
                 <div class="two-red-btn">
                     <div class="row">
                       <div class="col-6 p-2">
                         <button type="button" class="red-btn go-back-third  api-btn-style"><img src="assets/images/left-circle-icon.png" alt="icon" class="btn-icon"> Go Back</button>
                       </div>
                       <div class="col-6 p-2">
                         <button type="button" class="red-btn pd-left-30 fms-take-photo-btn api-btn-style"><img src="assets/images/camera-icon.png" alt="icon" class="camera-icon"> Take Picture</button>
                       </div>
                     </div>
                 </div>
                </div>
               </section>
              <!-- Detail Instruction screen starts for the right foot ends-->

              <!-- Detail Instruction screen starts for the left foot starts fms-user-instruction-left -->
               <section id="fms-user-instruction-left" class="do_not_show" style="display: none;">
                <div id="fms-user-ins-left-page1" class="container">
                         <div class="white-sheet pd-t15">
                       <h3>Fetch <span class="grab-one-text">a</span> white <span  id="show-paper-size-left">A4</span> <span class="change-sheet-multiple">sheet</span></h3>
                   </div>
                   <div class="home-img-area">
                      <!-- add this fms-instruction-img class if left right double , single image is different-->
                       <img src="assets/img/single-paper-grab-1.jpg"  alt="shoe" class="img-fluid fms-instruction-img">
                   </div>
                   <div class="speacer20"></div>
                   <div class="two-red-btn">
                       <div class="row">
                         <div class="col-6">
                           <!-- <button type="button" class="red-btn back-btn-confirm api-btn-style"><img src="assets/images/left-circle-icon.png" alt="icon" class="btn-icon"> Go Back</button> -->
                           <button type="button" class="red-btn confirm-buttons reset-confirm"><img src="assets/images/left-circle-icon.png" alt="icon" class="btn-icon"> Cancel</button>
                         </div>
                         <div class="col-6">
                           <button type="button" class="red-btn fms-take-ins-next-left api-btn-style"><img src="assets/images/left-circle-icon.png" alt="icon" class="btn-icon flip-icon"> Next</button>
                         </div>
                       </div>
                   </div>
                </div>
                <div id="fms-user-ins-left-page2" class="container" style="display:none;">
                    <div class="roll-up-area pd-t15">
                       <p><b>1. Roll up your pants:</b> Place your <span class="grab-foot-type" style="font-weight: bold;">left</span> <span style="font-weight: bold;">foot</span> on the <span class="change-sheet-multiple">sheet</span>. Make sure your heel and A4 <span class="change-sheet-multiple">sheet</span> are touching the wall edge.</p> 
                       <p><b>2. All four A4 <span class="change-sheet-multiple">sheet</span> corners are visible:</b> Click the photo keeping your foot in focus.</p> 
                       <p><b>3. Mobile below waist level:</b> Ensure before clicking the photo. </p>
                   </div>
                   <div class="home-img-area">
                      <!-- add this class fms-instruction-img  for dynamic image -->
                       <img src="assets/img/singlepaper_image_left_jun.png"  alt="shoe" class="img-fluid fms-instruction-img">
                   </div>
                   <div class="speacer20"></div>
                   <div class="two-red-btn">
                       <div class="row">
                         <div class="col-6">
                           <button type="button" class="red-btn go-back-second-left api-btn-style"><img src="assets/images/left-circle-icon.png" alt="icon" class="btn-icon"> Go Back</button>
                         </div>
                         <div class="col-6">
                           <button type="button" class="red-btn fms_second_next_left api-btn-style"><img src="assets/images/left-circle-icon.png" alt="icon" class="btn-icon flip-icon"> Next</button>
                         </div>
                       </div>
                   </div>
                </div>
                <div id="fms-user-ins-left-page3" class="container" style="display:none;">
                  <div class="roll-up-area pd-t15">
                     <p> Check if the A4 sheet, your foot and the wall edge are aligned.</p>  
                     <p>Any misalignment will affect the accuracy of the measurement.</p>
                  </div>
                  <div class="home-img-area">
                    <!-- fms-instruction-img-custom  add this class for dynamic -->
                     <img src="assets/images/measure-feet.png" alt="shoe" class="img-fluid">
                  </div>
                 <div class="speacer20"></div>
                 <div class="two-red-btn">
                     <div class="row">
                       <div class="col-6 p-2">
                         <button type="button" class="red-btn go-back-third-left api-btn-style"><img src="assets/images/left-circle-icon.png" alt="icon" class="btn-icon"> Go Back</button>
                       </div>
                       <div class="col-6 p-2">
                         <button type="button" class="red-btn pd-left-30 fms-take-photo-btn-left api-btn-style"><img src="assets/images/camera-icon.png" alt="icon" class="camera-icon"> Take Picture</button>
                       </div>
                     </div>
                 </div>
                </div>
               </section>
              <!-- Detail Instruction screen starts for the left foot ends-->

              <!-- Camera functionality starts camera-section -->
              <section id="camera-section" class="do_not_show" style="display: none;">
                 <div class="video-with-frame-container">
                    <div class="customer-logo">
                      <p class="camera-screen-text">Make sure your foot is within the outline.</p>
                      <a class="back-button-camera api-font-color" href="javascript:void(0);"> < Back</a>
                     <!--  <div class="foot-camera pd-t15">
                         <h1>Hello, <span class="camera-user-name"></span></h1>
                         <p>Make sure your foot is within the outline.</p>
                      </div> -->
                    </div>
                    <?php if( $iPod || $iPhone || $iPad ): ?>
                    <video id="video_steam" autoplay muted loop playsinline width="100%" height="100%"></video>
                    <?php else: ?>
                    <video id="video_steam" autoplay width="100%" height="100%"></video>
                    <?php endif; ?>
                    <img src="" class="fms-video-frame" onclick="void(0)" >
                    <div class="fms-camera-icon">
                        <img src="https://shoesizefinder.bata.in/api/assets/img/camera.png" class="">
                        <!-- <p>Tap anywhere to take a photo</p> -->
                    </div>
                    <p class="fms-camera-right"><span class="fmd-arr-dir-text">Tilt right</span><span class="fms-cam-arrows">&raquo;</span></p>
                    <p class="fms-camera-left"><span class="fmd-arr-dir-text">Tilt left</span><span class="fms-cam-arrows">&laquo;</span></p>
                    <p class="fms-camera-top"><span class="fms-cam-arrows">&raquo;</span><span class="fmd-arr-dir-text">Tilt up</span></p>
                    <p class="fms-camera-bottom"><span class="fmd-arr-dir-text">Tilt down</span><span class="fms-cam-arrows">&raquo;</span></p>
                    <p class="fms-camera-center"><span class="fmd-arr-dir-text">Please tilt your mobile to portrait.</span></p>
                 </div>
                 <canvas id="canvas_capture"></canvas>
                 <div class="roll-up-area pd-t15 padding-left-right">
                     <p>Recheck if all the corners of <span id="show-paper-size"></span> sheet and the wall edge are visible.</p>
                 </div>
                 <div class="fms-review-image">
                    <img id="img_elem" src="" class="image-preview-im img-fluid">
                 </div>
                 <div class="fms_counter"></div>
                 <div id="mobile-details" style="display:none;">
                    <table>
                       <tr>
                          <td>Pitch</td>
                          <td id="mob-x"></td>
                       </tr>
                       <tr>
                          <td>Roll</td>
                          <td id="mob-y"></td>
                       </tr>
                       <tr style="display: none;">
                          <td>Yaw</td>
                          <td id="mob-z"></td>
                       </tr>
                    </table>
                 </div>
                 <!-- <p class="fms-make-sure-text">Please make sure the paper corners are visibile</p> -->
                 <div class="fms-bottom-button-container camera_buttons two-red-btn">
                      <div class="row">
                        <div class="col-6">         
                          <button class="fms-retake-photo red-btn api-btn-style"><img src="assets/images/retake-icon.png" alt="icon" class="camera-icon"> Retake</button>  
                          <button data-ftype="l" class="start-left-foot red-btn api-btn-style"><img src="assets/images/retake-icon.png" alt="icon" class="camera-icon"> Retake</button>
                        </div>
                        <div class="col-6">
                          <button class="fms-get-size red-btn"><img src="assets/images/check-icon.png" alt="icon" class="btn-icon"> Submit</button>
                        </div>
                      </div>
                 </div>
              </section>
              <!-- Camera functionality ends  -->

              <!-- Foot report page fms-result -->
                <section id="fms-result" class="do_not_show" style="display: none;">
                  <div class="container fms-result-wrapper">
                      <div class="foot-profile pd-t15 mb-4">
                         <h2>Here’s the foot profile <br> for your: <span class="fms-foot-type api-font-color"> Right Foot </span></h2>
                         <!-- <p>You are a <span class="fms-bata-age">35</span> year old <span class="fms-bata-gender">male</span>.</p> -->
                         <p class="gender-and-age-text">You are a <span class="fms-bata-age"></span> <span class="fms-bata-gender">male</span>.</p>

                      </div>
                      <div class="profile-info">
                       <p>Your best fit is Bata Size <span class="fms-bata-size"></span></p>
                      </div>
                      <div class="foot-profile-img fms-result-container">
                        <div class="profile-detail">
                          <h4>Length</h4>
                          <p id="fms-foot-length">248mm</p>
                          <br>
                          <h4>Width</h4>
                          <p  id="fms-foot-width">248mm</p>
                        </div>
                        <div class="feet-profile-img">
                         <img src="" alt=" " class="img-fluid foot-report-image">
                         <button class="red-btn update-warning-btn api-btn-style" style="display:none;">Update required</button>
                        </div>
                      </div>
                      <div class="left-foot-no-data-div">
                      </div>
                      <div class="speacer20"></div>
                      <div class="retake-btns-area">
                          <div class="row">
                              <div class="col-12 p-1" id="fms-right-result-btns">
                                  <button data-ftype="r" class="button-half-width retake-btn fms-retake-photo api-btn-style">Retake right foot</button>
                                  <button data-ftype="l" class="button-half-width retake-btn float-right fms-left-photo api-btn-style">Take left foot</button>
                                  <button data-ftype="r" class="button-half-width retake-btn float-right fms-view-left-btn api-style-hover">View left foot</button>
                              </div>
                              <div class="col-12 p-1" id="fms-left-result-btns">
                                  <button data-ftype="r" class="button-half-width retake-btn fms-view-right-btn api-style-hover">View right foot</button>
                                  <button data-ftype="l" class="button-half-width retake-btn float-right fms-retake-left-photo api-btn-style">Retake Left foot</button>
                                  <button data-ftype="l" class="button-half-width retake-btn float-right start-left-foot api-btn-style">Start left foot</button>
                              </div>
                          </div>
                      </div>
                      <div class="sigle-line-btn three-foot-report-button">
                        <!-- <button type="button" class="red-btn"><img src="assets/images/check-icon.png" alt="icon"> Save Profile</button> -->
                        <!-- <button type="button" class="red-btn fms-shop-recommendations"><img style="width: 48px;" src="assets/images/shoe-icon.png" alt="icon"> View Recommendations</button> -->
                        <!-- <button href="javascript:void(0);" class="red-btn bata-close-application"><img src="assets/images/cross-icon.png" alt="icon"> Close this Application</button> -->
                         <a href="<?php echo $redirect_url; ?>" class="red-btn bata-close-application api-btn-style"><img class="cross-icon-style" src="assets/images/cross-icon.png" alt="icon">&nbsp;&nbsp;Go to bata.in</a>
                      </div>
                   </div>
                  <div class="fms-result-error container" style="display: none;">
                     <div class="roll-up-area pd-t15 fms-title-page1">
                         <p>Something doesn’t seem right Please re-take the picture </p>
                     </div>
                     <!-- alert-area  -->
                     <div class="fms-error-img">
                         <img src="" alt=" " class="img-fluid image-preview-error-image">
                     </div>
                     <p class="fms-err-code"></p>
                     <p class="fms-error-remark"></p>

                     <div class="fms-error-msg"></div>
                     <div class="two-red-btn fms-bottom-button-container response_buttons">
                         <div class="row">
                           <div class="col-6">
                             <button type="button" class="red-btn fms-cancel api-btn-style"><img src="assets/images/left-circle-icon.png" alt="icon" class="btn-icon"> Go Back</button>
                           </div>
                           <div class="col-6">
                               <!-- <button class="fms-retake-photo red-btn"><img src="assets/images/retake-icon.png" alt="icon" class="camera-icon"> Retake</button> -->
                              <button class="fms-retake-photo-error red-btn"><img src="assets/images/retake-icon.png" alt="icon" class="camera-icon"> Retake</button>

                              <!-- <button data-ftype="l" class="fms-left-photo red-btn"><img src="assets/images/retake-icon.png" alt="icon" class="camera-icon"> Retake</button> -->
                               <button data-ftype="l" class="fms-left-photo-error red-btn"><img src="assets/images/retake-icon.png" alt="icon" class="camera-icon"> Retake</button>
                           </div>
                         </div>
                     </div>
                  </div>

                </section>

              <!-- Foor report page fms-result ends -->

              <!-- Foot report page starts fms-catelog -->
              <section id="fms-catelog" class="do_not_show" style="display: none;">
                <div class="customer-logo">
                      <div class="back-button disable-selection" data-type="normal" id="CustomBackButton" style="display:none"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>
                </div>
                 <div class="fms-category-html">
                    <!-- <h3></h3>  -->
                    <div class="fms-cate-search-container"><input type="text" value="" placeholder="Type a brand name here"></div>
                    <div class="fms-category-html-wrap">
                    </div>
                 </div>
              </section>
              <!-- Foot report page ends fms-catelog -->

              <!-- Foot error page starts fms-error -->
              <section id="fms-error" class="do_not_show" style="display: none;">
                 <h3 class="fms-sec-title">Error</h3>
                 <img src="assets/img/error.jpg">
                 <p class="fms-error-message"></p>
              </section>
              <!-- Foot error page ends -->

              <!-- FMS orientations and dummy sections starts fms-oriandation  abd dummy-section -->
              <section id="fms-oriandation" style="display: none;">
                  <div class="motion-sensor-enable container" id="ios">
                    <div class="roll-up-area pd-t15">
                       <p>Please allow Bata shoe size finder application access to your camera.</p>
                    </div>
                    <div class="setting-area">
                      <ol>
                        <li>Open Settings <img src="assets/images/setting.png" alt="icon"></li>
                        <li>Scroll and tap Safari browser</li>
                        <span class="setting-safari w-75">Safari <img src="assets/images/safari.png" alt="icon"></span>
                        <li>Scroll and tap camera</li>
                        <li>Tap to provide camera access</li>
                        <span class="setting-safari">Camera and Microphone access 
                          <label class="switch float-right">
                            <input type="checkbox" checked>
                            <span class="slider round"></span>
                          </label>
                        </span>
                      </ol> 
                    </div>
                    <div class="sigle-line-btn">
                      <button type="button" class="red-btn fms-take-photo-btn api-btn-style"><img src="assets/images/check-circle.png" alt="icon"> Done</button>
                    </div>
                 </div>
              </section>

              <section id="dummy-section" style="display: none;">
                 <div class="fms-welcome-wrapper">
                    <div class="fms-welcome-content">Welcome to Bata shoesize :)</div>
                 </div>
              </section>
              <!-- FMS orientations and dummy sections ends fms-oriandation  abd dummy-section -->


              <!--  When camera settings not allow to access fms-camera-enable-flow  -->
              <section id="fms-camera-enable-flow" style="display: none;">
                 <div class="fms-camera-enable-flow container">
                    <div class="fms-camera-flow-ios" style="display: none;">
                      <div class="roll-up-area pd-t15">
                       <p>Please allow Bata shoe size finder application access to your camera.</p>
                      </div>
                      <div class="setting-area">
                        <ol>
                          <li>Open Settings <img src="assets/images/setting.png" alt="icon"></li>
                          <li>Scroll and tap Safari browser</li>
                          <span class="setting-safari w-75">Safari <img src="assets/images/safari.png" alt="icon"></span>
                          <li>Scroll and tap camera</li>
                          <li>Tap to provide camera access</li>
                          <span class="setting-safari">Camera and Microphone access 
                            <label class="switch float-right">
                              <input type="checkbox" checked>
                              <span class="slider round"></span>
                            </label>
                          </span>
                        </ol> 
                      </div>
                    </div>
                    <div class="fms-camera-flow-android" style="display: none;">
                        <div class="roll-up-area pd-t15">
                             <p>Please allow Bata shoe size finder application access to your camera.</p>
                         </div>
                         <div class="setting-area">
                             <ol>
                              <li>Click on the three dots on the right and go to Settings</li>
                              <span class="setting-opt"><i class="fa fa-ellipsis-v"></i> <i class="fa fa-chevron-right"></i> Settings </span>
                              <!-- <img class="fms-icon-full" src="assets/images/android-chrome-settings.png"> -->
                              <li>Scroll and tag Site Settings</li>
                              <li>Tap Camera</li>
                              <li>Tap to turn the camera on or off</li>
                              <div class="cam-setting">
                              <p>Camera</p>
                              <label class="switch">
                                  <input type="checkbox" checked readonly="readonly">
                                  <span class="slider round"></span>
                                </label>
                              </div>
                              <span class="camera-txt">Ask first before allowing sites to use your camera</span>
                            </ol> 
                         </div>

                    </div>
                    <div class="fms-bottom-button-container sigle-line-btn">
                       <button class="red-btn fms-take-photo-btn api-btn-style"><img src="assets/images/check-circle.png" alt="icon">Done</button>
                    </div>
                 </div>
              </section>

              <!--  When camera settings not allow to access ends -->

              <!-- Data updated section starts  data-section-updated -->
              <section id="data-section-updated" class="do_not_show" style="display: none;">
                 <div class="container">
                     <div class="perfect-shoe-area pd-t15">
                         <h4>Find your <br> perfect shoe size</h4>
                     </div>
                     <div class="perfect-form-area">
                      <form id="sent_to_api" action="request.php" method="post">
                        <input type="hidden" name="geo_location_state" class="geo_location_state" >
                        <input type="hidden" name="geo_location_city" class="geo_location_city" >
                        <input type="hidden" name="geo_location_town" class="geo_location_town" >
                        <label class="hide"><span>TAG</span><input name="tag" placeholder="" value="client"></label>
                        <label class="hide"><span>Email</span><input name="email" placeholder="" value="adminappc@findmeashoe.com"></label>
                        <label><input type="hidden" name="fms-first-and-last-name" placeholder="First & Second Name" class="fms-first-and-last-name" value="<?php echo $user_name; ?>"></label>
                        <label class="hide"><span>Device</span><input name="device" placeholder="" value="iPhone 6S , iOS : 11.4  [ TOPVIEW: P: -4.3 R: 1.8] [Resolution: 1920x1080] [Paper_Type: 0]"></label>
                         <span></span>
                         <?php if ($user_email == "") { ?>
                         <p class="fms-error-message">Please enter email address, without email cannot proceed further!</p>
                         <?php } ?>
                         <?php if ($user_email == "") { ?>
                         <div class="email-css">
                            <label> <input type="email" name="user_email" placeholder="email" class="fms-user-email" required></label>
                         </div>
                         <?php } else { ?>
                         <label><input type="hidden" name="user_email" placeholder="email" class="fms-user-email" value="<?php echo $user_email; ?>"></label>
                         <?php } ?>

                        <!-- Radio buttons for gender starts -->
                        <?php if($gender){ ?>
                           <label><input type="hidden" name="gender" placeholder="email" class="custom-gender-input" value="<?php echo $gender; ?>"></label>
                           <?php if($gender == 'M'){ ?>
                            <div class="form-adj gender-icons">
                              <div class="character">
                                <img src="assets/images/male.png" alt="male">
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="M" checked id="gender_male" checked>
                                <label class="form-check-label " for="gender_male">Male</label>
                              </div>
                            </div>
                            <div class="form-adj gender-icons">
                              <div class="character">
                                <img src="assets/images/female.png" alt="male">
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="W" id="gender_female">
                                <label class="form-check-label" for="gender_female">Female</label>
                              </div>
                            </div>
                            <div class="form-adj gender-icons">
                              <div class="character">
                                <img src="assets/images/kid.png" alt="male">
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="B" id="gender_kids">
                                <label class="form-check-label" for="gender_kids">Kid</label>
                              </div>
                            </div>
                          <?php }elseif($gender == 'W'){ ?>
                            <div class="form-adj gender-icons">
                              <div class="character">
                                <img src="assets/images/male.png" alt="male">
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="M" checked id="gender_male_up">
                                <label class="form-check-label " for="gender_male_up">Male</label>
                              </div>
                            </div>
                            <div class="form-adj gender-icons">
                              <div class="character">
                                <img src="assets/images/female.png" alt="male">
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="W" id="gender_female_up" checked>
                                <label class="form-check-label" for="gender_female_up">Female</label>
                              </div>
                            </div>
                            <div class="form-adj gender-icons">
                              <div class="character">
                                <img src="assets/images/kid.png" alt="male">
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="B" id="gender_kids_up">
                                <label class="form-check-label" for="gender_kids_up">Kid</label>
                              </div>
                            </div>
                          <?php }else{ ?>
                           <div class="form-adj gender-icons">
                              <div class="character">
                                <img src="assets/images/male.png" alt="male">
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="M" checked id="gender_male">
                                <label class="form-check-label " for="gender_male">Male</label>
                              </div>
                            </div>
                            <div class="form-adj gender-icons">
                              <div class="character">
                                <img src="assets/images/female.png" alt="male">
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="W" id="gender_female" >
                                <label class="form-check-label" for="gender_female">Female</label>
                              </div>
                            </div>
                            <div class="form-adj gender-icons">
                              <div class="character">
                                <img src="assets/images/kid.png" alt="male">
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="B" id="gender_kids" checked>
                                <label class="form-check-label" for="gender_kids">Kid</label>
                              </div>
                            </div>
                          <?php } ?>
                        <?php }else{ ?>
                          <label><input type="hidden" name="gender" placeholder="email" class="custom-gender-input" value="M"></label>
                          <div class="form-adj gender-icons">
                            <div class="character">
                              <img src="assets/images/male.png" alt="male">
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="M" checked id="gender_male_up" checked>
                              <label class="form-check-label " for="gender_male_up">Male</label>
                            </div>
                          </div>
                          <div class="form-adj gender-icons">
                            <div class="character">
                              <img src="assets/images/female.png" alt="male">
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="W" id="gender_female_up">
                              <label class="form-check-label" for="gender_female_up">Female</label>
                            </div>
                          </div>
                          <div class="form-adj gender-icons">
                            <div class="character">
                              <img src="assets/images/kid.png" alt="male">
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input gender-select" type="radio" name="gender-select" placeholder="" value="B" id="gender_kids_up">
                              <label class="form-check-label" for="gender_kids_up">Kid</label>
                            </div>
                          </div>
                        <?php } ?>
                        <!-- Radio buttons for gender ends -->
                        <div class="speacer20"></div>
                        <!-- Geography select starts -->
                           <input class="form-check-input fms-geoloc" type="radio" name="Geography"  value="ROW" id="row_geography_up">
                        <!-- Geography select ends -->


                        <div class="speacer20"></div>
                        <!-- Age selects starts -->
                        <div class="form-group form-check-inline form-age">
                          <label for="inputState">Age</label>
                           <select class="form-control col-3 selected-form-age">
                          <?php 
                            for ($i=4; $i < 111; $i++) { 
                          ?>
                              <?php if($i == 25){
                              ?>
                               <option  value="<?php echo $i; ?>" selected><?php echo $i;?></option>
                              <?php
                              }else{ ?>
                                <option  value="<?php echo $i; ?>"><?php echo $i;?></option>
                            
                          <?php
                              }
                            }
                          ?>
                          </select>
                         <label class="hide"><span>Age</span><input name="age" class="request-form-age" placeholder="" value="25"></label>
                        </div>
                        <!-- Age selects ends -->
                        <label class="hide"><span>Age</span><input name="age" placeholder="" value="25"></label>
                        <label class="hide"><span>User Name</span><input name="username" placeholder="" value="<?php echo $user_name; ?>"></label>
                        <label class="hide"><span>App Version</span><input name="appVersion" placeholder="" value="0.0"></label>
                        <!--<label class="hide"><span>Foote Type</span><input name="foot_type" placeholder="" value="1"></label>-->
                        <label class="hide"><span>Paper Type</span><input name="paper_type" placeholder="" value="0"></label>
                        <label class="hide"><span>Foot type</span><input name="foot_type" placeholder="" value="0"></label>
                        <label class="hide"><span>Org Id</span><input name="orgID" placeholder="" value="<?php echo $orgId; ?>"></label>
                        <label class="hide"><span>Image Data</span><input name="topView" placeholder="" value=""></label>
                        <label class="hide"><span>Curl Url</span><input name="requestUrl" placeholder="" value="request.php"></label>

                        <!-- Systemsize starts -->
                        <?php if ($sizesystem) { ?>
                          <label class="hide"><span>SizeSystem</span><input type="hidden" name="SizeSystem" class="fms-SizeSystem fms-SizeSystem-new classic request-systemsize" value="<?php echo $sizesystem ?>"></label>
                          <div class="typical-shoe">
                            <h4>Typical shoe size</h4>
                            <?php if($systemsize == 'UK'){ ?>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input selected-shoesize" type="radio" name="selected-shoesize" id="shoes_us" value="US" >
                                <label class="form-check-label" for="shoes_us">US</label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input selected-shoesize" type="radio" name="selected-shoesize" value="UK" id="shoes_uk" checked>
                                <label class="form-check-label" for="shoes_uk">UK</label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input selected-shoesize" type="radio" name="selected-shoesize" value="EU" id="shoes_eu">
                                <label class="form-check-label" for="shoes_eu">EU</label>
                              </div>
                            <?php }elseif($systemsize == 'US'){?>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input selected-shoesize" type="radio" name="selected-shoesize" id="shoes_us" value="US" checked>
                                <label class="form-check-label" for="shoes_us">US</label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input selected-shoesize" type="radio" name="selected-shoesize" value="UK" id="shoes_uk" >
                                <label class="form-check-label" for="shoes_uk">UK</label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input selected-shoesize" type="radio" name="selected-shoesize" value="EU" id="shoes_eu" >
                                <label class="form-check-label" for="shoes_eu">EU</label>
                              </div>
                            <?php }elseif($systemsize == 'EU'){ ?>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input selected-shoesize" type="radio" name="selected-shoesize" id="shoes_us" value="US" >
                                <label class="form-check-label" for="shoes_us">US</label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input selected-shoesize" type="radio" name="selected-shoesize" value="UK" id="shoes_uk" >
                                <label class="form-check-label" for="shoes_uk">UK</label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input selected-shoesize" type="radio" name="selected-shoesize" value="EU" id="shoes_eu" checked>
                                <label class="form-check-label" for="shoes_eu">EU</label>
                              </div>
                            <?php } ?>
                            
                          </div>
                        <?php }else{ ?>
                          <label class="hide"><span>SizeSystem</span><input type="hidden" name="SizeSystem" class="fms-SizeSystem fms-SizeSystem-new classic request-systemsize" value="US"></label>
                          <div class="typical-shoe">
                            <h4>Typical shoe size</h4>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input selected-shoesize" type="radio" name="selected-shoesize" id="shoes_us" value="US" checked>
                              <label class="form-check-label" for="shoes_us">US</label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input selected-shoesize" type="radio" name="selected-shoesize" value="UK" id="shoes_uk">
                              <label class="form-check-label" for="shoes_uk">UK</label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input selected-shoesize" type="radio" name="selected-shoesize" value="EU" id="shoes_eu">
                              <label class="form-check-label" for="shoes_eu">EU</label>
                            </div>
                          </div>
                        <?php } ?>
                        <!-- Systemsize ends -->
                        <div class="speacer20"></div>
                        <div class="form-check-inline form-age">
                          <label class="col-7 p-0" for="inputState">Size Scale</label>
                          <?php if ($shoesize) { ?>
                           <input type="hidden" name="custom-shoesize-new" id="custom-shoesize-new" value="<?php echo $shoesize; ?>"> 
                           <select name="size" class="fms-shoesize shoesize classic custom-shoesize-new shoesize-new  form-control">
                         </select>
                         <?php } else { ?>
                           <select name="size" class="fms-shoesize shoesize classic shoesize-new  form-control">
                           </select>
                         <?php } ?>
                        </div>
                        <div id="device_info"></div>
                      </form>
                     </div>
                     <div class="fms-bottom-button-container sigle-line-btn">
                       <button class="red-btn fms-take-instruction-updated  check-back api-btn-style" data-type="new_user"><img src="assets/images/check-circle.png" alt="icon">Submit</button>
                       <button class="red-btn fms-take-reset api-btn-style" onclick="resetForm();"><img src="assets/images/left-circle-icon.png" />Reset</button>
                     </div>
                  </div>
              </section>
              <!-- Data updated section ends -->

           </div>

           <!-- fms-section-container div ends -->
           <div id="note-to-user"></div>
           <div id="dummy-size-container"></div>
        </div>
        <!-- wrapper custom-home-wrapper  container ends -->
      <?php } else { ?>
        <!-- data-section  -->
      <?php } ?>
   </body>
</html>
<?php else: ?>
<?php
   //echo "<script> document.location.href='https://shoesize.online/dev/bata-9-api/desktop.php';</script>";
   echo "<script> var loc_path = document.location.hostname+document.location.pathname;  document.location.href='https://'+loc_path+'desktop.php';</script>";
   exit();
?>
<html lang="en" dir="ltr">
   <head>
      <meta charset="utf-8">
      <link rel="stylesheet" media="all" href="assets/css/style.css?time=<?php echo time(); ?>">
      <title>Findmeashoe</title>
   </head>
   <body>
      <div class="fms-desktop-welcome-page">
         <h2>Welcome to <?php echo $_SERVER['HTTP_HOST']; ?>!</h2>
         <img class="fms-home-shoes" src="assets/img/Homepage_Banner_v3.png">
         <p>Please open this link on a mobile browser to get started with the picture taking process. <br>
            You are one click away from finding your brand specific sizing! <br>
            <br><br>
            Open on mobile browser: <a href="https://shoesizefinder.bata.in/api"><?php echo $_SERVER['HTTP_HOST']; ?></a>
         </p>
         <br><br>
         <br><br>
         <p><a href="http://findmeashoe.com">www.findmeashoe.com</a> | &copy; Copyright 2019 reserved with EMBL Retail INC | <a href="http://findmeashoe.com/privacy-policy/">Privacy Policy</a> </p>
      </div>
   </body>
</html>
<?php endif; ?>