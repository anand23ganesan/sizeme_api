<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
* {
  box-sizing: border-box;
}

input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

input[type=submit]:hover {
  background-color: #45a049;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .col-25, .col-75, input[type=submit] {
    width: 100%;
    margin-top: 0;
  }
}
</style>
</head>
<body>

<h2>Bata Shoesize Form For API</h2>
<p>Please click on the submit button.</p>

<div class="container">
   <form  action="./" method="POST" autocomplete="off">
          <div class="row">
            <div class="col-25">
              <label for="fname">Key</label>
            </div>
            <div class="col-75">
              <input type="text" name="auth_key" value="alphabata20200827140138">
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Password</label>
            </div>
            <div class="col-75">
             <input type="text" name="auth_password" value="1HzdhgRbd1Yw4sOsawt7FEpQrAsX6i4f">
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Redirect Url</label>
            </div>
            <div class="col-75">
              <input type="text" name="redirect_url" value="https://google.com">
            </div>
          </div>

<!--           <div class="row">
            <div class="col-25">
              <label for="fname">Redirect Text</label>
            </div>
            <div class="col-75">
              <input type="text" name="redirect_text" value="Back">
            </div>
          </div> -->

          <div class="row">
            <div class="col-25">
              <label for="fname">User Name</label>
            </div>
            <div class="col-75">
              <input type="text" name="user_name" value="sridevi">
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Email</label>
            </div>
            <div class="col-75">
              <input type="text" name="user_email" value="sridevi073@gmail.com">
            </div>
          </div>
<!-- 
          <div class="row">
            <div class="col-25">
              <label for="fname">Provider</label>
            </div>
            <div class="col-75">
              <input type="text" name="user_provider" value="google">
            </div>
          </div> -->

          <!-- <div class="row">
            <div class="col-25">
              <label for="fname">Geography</label>
            </div>
            <div class="col-75">
              <input type="text" name="Geography" value="ROW" readonly>
            </div>
          </div> -->

          <!-- <div class="row">
            <div class="col-25">
              <label for="fname">Gender</label>
            </div>
            <div class="col-75">
              <input type="text" name="gender" value="M">
            </div>
          </div> -->

          <!--div class="row">
            <div class="col-25">
              <label for="fname">Age</label>
            </div>
            <div class="col-75">
              <input type="text" name="age" value="25">
            </div>
          </div> -->

          <!-- <div class="row">
            <div class="col-25">
              <label for="fname">Size System</label>
            </div>
            <div class="col-75">
              <input type="text" name="sizesystem" value="UK" id="systemsize">
            </div>
          </div> -->

          <div class="row">
            <div class="col-25">
              <label for="fname">ORG ID</label>
            </div>
            <div class="col-75">
              <input type="text" name="orgid" value="37">
            </div>
          </div>

           <div class="row">
            <div class="col-25">
              <label for="fname">Channel ID</label>
            </div>
            <div class="col-75">
              <input type="text" name="channelid" value="1">
            </div>
          </div>

          

          <!--  <div class="row">
            <div class="col-25">
              <label for="fname">Shoe Size</label>
            </div>
            <div class="col-75">
              <input type="text" autocomplete="off" name="shoesize" value="9" id="shoesize">
            </div>
          </div> -->

        <!--   <div class="row">
            <div class="col-25">
              <label for="fname">Background</label>
            </div>
            <div class="col-75">
              <input type="text" name="bgcolor" value="ffffff">
            </div>
          </div> -->

<!--           <div class="row">
            <div class="col-25">
              <label for="fname">Font Color</label>
            </div>
            <div class="col-75">
              <input type="text" name="fontcolor" value="000">
            </div>
          </div> -->

<!--           <div class="row">
            <div class="col-25">
              <label for="fname">Button Color</label>
            </div>
            <div class="col-75">
              <input type="text" name="btncolor" value="000">
            </div>
          </div> -->
          
          <div class="row">
            <input type="submit" value="Submit">
          </div>
        </form>
</div>

</body>
</html>
