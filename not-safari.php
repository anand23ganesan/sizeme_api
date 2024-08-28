<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/all.min.css">
    <link rel="stylesheet" href="assets/css/style.css">

    <title>Bata</title>
  </head>
  <body>

    <section class="vertical-center">
        <div class="container">
           <div class="roll-up-area pd-t15">
               <p>This browser doesn’t allow camera access.</p>
           </div>
           <div class="browser-ins">
               <h4>Please try:</h4>
               <p><img src="assets/images/sf-to-apple.png" alt=""> Safari for an Apple device</p>
               <p><img src="assets/images/crome-to-and.png" alt="">Chrome for an Android device</p>
           </div>
           <div class="sigle-line-btn">
              <button type="submit" class="red-btn"  onclick="copyURL();"><img src="assets/images/copy-link-icon.png" alt="icon"> copy link</button>
           </div>
        </div>
    </section>


    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="assets/js/jquery-3.5.1.slim.min.js"></script>
    <script src="assets/js/popper.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script type="text/javascript">
            function copyURL (){
               var urlInput = document.createElement('input');
               var base_url = window.location.href;
              
              var notWantedString = "not-safari.php";
              var url = base_url.replace(notWantedString, '');
               document.body.appendChild(urlInput);
               urlInput.value = url;
               urlInput.select();
               document.execCommand('copy');
               document.body.removeChild(urlInput);
               alert("Copied URL: "+ url);
            };
    </script>

  </body>
</html>