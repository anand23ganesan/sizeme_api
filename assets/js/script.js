/**
 * @author: Findmeashoe
 * Capturing image from mobile browser
 */
var $ = jQuery;
var fms = "";
$( document ).ready( function(){
	fms = new findmeashow();
	if( fms.showPichAndRole() ){
		if( typeof fms.camera.kickCamera != "undefined" ){
			registerEvent();
		} else {
			
		}
	} else {
		
	}
	
	// To register all fms related events here
	function registerEvent(){
		
		$( document ).on( 'mousedown', '.fms-cate-recomentation', function(){
			$( "#fmas-main-container" ).removeAttr("id");
			$( "#dummy-size-container" ).html( '' );
            $("#current_screen").val('');
			var parentCont = $( this ).closest( '.fms-prod-list' ),  
			cus_email = $( ".fms-user-email" ).val(),
			gender	= $(".fms-gender").val()? $(".fms-gender").val() : $( "[name=gender]" ).val(),
				data = { prod_id : parentCont.attr( "data-id" ), cus_email : cus_email,
				prod_name : parentCont.find( ".fms-prod-title" ).text(), parent_elem : "dummy-size-container",
				gender : gender};
			
				fms.fmsRecomCallBack( data );
		} );
		
		if( typeof navigation != 'undefined' ){
			Promise.all([navigation.permissions.request({ name: 'accelerometer' }),
	            navigation.permissions.request({ name: 'gyroscope' })])
			   .then(results => {
			     //alert( JSON.parse(results) );
			});
		}
		
		if( typeof screen != 'undefined' && 
			typeof screen.lockOrientation != 'undefined' ){
			window.screen.lockOrientation( 'portrait-primary' );
		}
		
		window.addEventListener("orientationchange", function() {
			//fms.setHeightForSections();
		});
		
		$( window ).on( 'visibilitychange', function(){
			if( fms.camera.isVideoOpen ){
				fms.camera.kickCamera();
			}
		} );

		
		setTimeout(function(){
			//$( ".fms-section-container section" ).hide();
			//$( ".do_not_show" ).removeClass( "do_not_show" );
			//$( "#social-logins" ).fadeIn();
			//fms.setHeightForSections();
		}, 2000 );
		
		$(document).on('click',".go-back-second",function(){	
			// get paper type here	
			var paper_type_val_show = fms.getPaperType( $( ".fms-SizeSystem" ).val(), "ROW", $( ".fms-shoesize" ).val() );	
			if (paper_type_val_show == "1" || paper_type_val_show == "0") {	
				$("#fms-user-ins-page1 .fms-instruction-img").attr("src", "https://shoesizefinder.bata.in/api/assets/img/single-paper-grab-1.png");	
			} else {	
				$("#fms-user-ins-page1 .fms-instruction-img").attr("src", "https://shoesizefinder.bata.in/assets/img/double-paper-grab-1.png");	
			}	
		});	
		$(document).on('click',".go-back-second-left",function(){	
			// get paper type here	
			var paper_type_val_show = fms.getPaperType( $( ".fms-SizeSystem" ).val(), "ROW", $( ".fms-shoesize" ).val() );	
			if (paper_type_val_show == "1" || paper_type_val_show == "0") {	
				$( "#fms-user-ins-left-page1 .fms-instruction-img" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/single-paper-grab-1.png" );	
			} else {	
				$( "#fms-user-ins-left-page1 .fms-instruction-img" ).attr( "src", "https://shoesizefinder.bata.in/assets/img/double-paper-grab-1.png" );	
			}	
		});

		// Take photo from here
		$( document ).on( "click", ".fms-take-photo-btn", function(){
			permission();
			$('.back-btn').hide();
			$('.back-ins-button').hide();
			$('.back-ins-button2').show();
            $("#current_screen").val('');
			$('.back-ins-button-left').hide();
			$('.back-ins-button-left2').hide();
			$('.back-ins-button-left3').hide();
			$('.back-button').hide();
			$( "[name=foot_type]" ).val(0);
            $("#current_foot_type").val('right');
			$(".camera_buttons .start-left-foot").hide();
			$(".camera_buttons .fms-retake-photo").show();
			//$( ".fms-video-frame" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-right.png" );
			// var geoValue = (typeof ($("input[name=Geography]:checked").val()) != "undefined") ? $("input[name=Geography]:checked").val() : $("input[name=Geography]").val();
			var geoValue = 'ROW';
			var customepaperT = fms.getPaperType( $( ".fms-SizeSystem" ).val(), geoValue, $( ".fms-shoesize" ).val() );
			if(this.isSinglePaper){
				$( ".fms-video-frame" ).removeClass('fms-double-frame-video');
				if(customepaperT == 1){
					$( ".fms-video-frame" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-right-letter.png" );
				}
				if(customepaperT == 0){
					$( ".fms-video-frame" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-right.png" );
				}
			}else{
				$( ".fms-video-frame" ).addClass('fms-double-frame-video');
				if(customepaperT == 4){
					$( ".fms-video-frame" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-right-double-letter.png" );
				}
				if(customepaperT == 3){
					$( ".fms-video-frame" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-right-double.png" );
				}
			}
            if( typeof fms.user != "undefined" ){
				fms.user();
			}
		});
		
		// view right foot
		$( document ).on( "click", ".fms-view-right-btn", function(){
			$( "[name=foot_type]" ).val(0);
            $("#current_foot_type").val('right');
			$("#current_screen").val('');

			$(".camera_buttons .start-left-foot").hide();
			$(".camera_buttons .fms-retake-photo").show();


			//$( ".fms-video-frame" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-right.png" );
			// var geoValue = (typeof ($("input[name=Geography]:checked").val()) != "undefined") ? $("input[name=Geography]:checked").val() : $("input[name=Geography]").val();
			var geoValue = 'ROW';

			var customepaperT = fms.getPaperType( $( ".fms-SizeSystem" ).val(),geoValue, $( ".fms-shoesize" ).val() );
			//console.log('customepaperT1',customepaperT);
			if(this.isSinglePaper){
				$( ".fms-video-frame" ).removeClass('fms-double-frame-video');
				if(customepaperT == 1){
					$( ".fms-video-frame" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-right-letter.png" );
				}
				if(customepaperT == 0){
					$( ".fms-video-frame" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-right.png" );
				}
			}else{
				$( ".fms-video-frame" ).addClass('fms-double-frame-video');
				if(customepaperT == 4){
					$( ".fms-video-frame" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-right-double-letter.png" );
				}
				if(customepaperT == 3){
					$( ".fms-video-frame" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-right-double.png" );
				}
			}
            fms.getFootMeasurementFromLiveServer( "autogettingrelutfromliveserver" );
		});
		
		// view left foot
        $( document ).on( "click", ".fms-view-left-btn", function(){
			$( "[name=foot_type]" ).val(1);
			$("#current_screen").val('');
			$("#current_foot_type").val('left');
			$(".camera_buttons .start-left-foot").show();
			$(".camera_buttons .fms-retake-photo").hide();
			//$( ".fms-video-frame" ).attr( "src", "https://shoesize.online/v4/assets/img/outline-left.png" );
			// var geoValue = (typeof ($("input[name=Geography]:checked").val()) != "undefined") ? $("input[name=Geography]:checked").val() : $("input[name=Geography]").val();
			var geoValue = 'ROW';

            var customepaperT = fms.getPaperType( $( ".fms-SizeSystem" ).val(), geoValue, $( ".fms-shoesize" ).val() );
            //console.log('customepaperTnew',customepaperT)
			if(this.isSinglePaper){
				$( ".fms-video-frame" ).removeClass('fms-double-frame-video');
				if(customepaperT == 1){
					$( ".fms-video-frame" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-left.png" );
				}
				if(customepaperT == 0){
					$( ".fms-video-frame" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-left.png" );
				}
			}else{
				$( ".fms-video-frame" ).addClass('fms-double-frame-video');
				if(customepaperT == 4){
					$( ".fms-video-frame" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-left-double-letter.png" );
				}
				if(customepaperT == 3){
					$( ".fms-video-frame" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-left-double.png" );
				}
			}
			fms.getFootMeasurementFromLiveServer( "autogettingrelutfromliveserver" );
		});
		
		$( document ).on( "click", ".fms-take-photo-btn-left", function(){
			permission();
			$('.back-ins-button').hide();
            $("#current_screen").val('');
			$('.back-ins-button2').hide();
			$('.back-ins-button-left').hide();
			$('.back-ins-button-left2').hide();
			$('.back-ins-button-left3').show();
			$('.back-button').hide();
			$('.back-btn').hide();
			$( "[name=foot_type]" ).val(1);
            $("#current_foot_type").val('left');
			$(".camera_buttons .fms-retake-photo").show();
			$(".camera_buttons .start-left-foot").hide();
			//$( ".fms-video-frame" ).attr('left_photograph');
			//$( ".fms-video-frame" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-left.png" );
			//$(".left_photograph").attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-left.png");
			var geoValue = (typeof ($("input[name=Geography]:checked").val()) != "undefined") ? $("input[name=Geography]:checked").val() : $("input[name=Geography]").val();
			var geoValue = 'ROW';

			var customepaperT = fms.getPaperType( $( ".fms-SizeSystem" ).val(),geoValue, $( ".fms-shoesize" ).val() );
			//console.log('customepaperT_new1',customepaperT);
			if(this.isSinglePaper){
				$( ".fms-video-frame" ).removeClass('fms-double-frame-video');
				if(customepaperT == 1){
					$( ".fms-video-frame" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-left.png" );
				}
				if(customepaperT == 0){
					$( ".fms-video-frame" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-left.png" );
				}
			}else{
				$( ".fms-video-frame" ).addClass('fms-double-frame-video');
				if(customepaperT == 4){
					$( ".fms-video-frame" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-left-double-letter.png" );
				}
				if(customepaperT == 3){
					$( ".fms-video-frame" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-left-double.png" );
				}
			}

            if( typeof fms.user != "undefined" ){
				fms.user();
			}
		});
		$(document).on("click", ".check-back", function () {
			$('.back-btn').hide();
			$('.back-ins-button').hide();
			$('.back-ins-button2').hide();
			$('.back-ins-button-left').hide();
			$('.back-ins-button-left2').hide();
			$('.back-ins-button-left3').hide();
			$('.back-button').show();
		});
		$(document).on("click", ".check-back2", function () {
			$('.back-btn').hide();
			$('.back-ins-button').hide();
			$('.back-ins-button2').hide();
			$('.back-ins-button-left').hide();
			$('.back-ins-button-left2').hide();
			$('.back-ins-button-left3').hide();
			$('.back-button').show();
		});
		
		$( document ).on( "click", ".video-with-frame-container", function(){
			if( typeof fms.capture != "undefined" ){
				fms.capture();
			}
		});
		
		$( document ).on( "click", ".fms-get-size", function(){
			if( typeof fms.sendData != "undefined" ){

				var deviceinf = deviceModule.init(),
				device = "Android : " + deviceinf.os.version;

				if( deviceinf.os.name == "iPhone" ){
					device = "iOS : " + deviceinf.os.version;
				}
				
			    // var geoValue = (typeof ($("input[name=Geography]:checked").val()) != "undefined") ? $("input[name=Geography]:checked").val() : $("input[name=Geography]").val();
				var geoValue = 'ROW';

				var paperT = fms.getPaperType($(".fms-SizeSystem").val(), geoValue, $(".shoesize").val());
				var userSize = $(".fms-SizeSystem").val() + ": " + $(".shoesize").val();
				var user_state = $(".geo_location_state").val();
				var city = $(".geo_location_city").val();
				var age = $("input[name=age]").val();
				var gender = $("input[name=gender]").val();
				var channel_id = 1;
				
				if( paperT != null ){
			    	$( "input[name=device]" ).val( deviceinf.os.name + " , " + device + "  [ TOPVIEW: P: "+ fms.captureVar.pitch +" R: "+ fms.captureVar.roll +"] [Resolution: "+ fms.camera.imageWidth +"x"+ fms.camera.imageHeight +"] [Paper_Type: "+ paperT +"] [User_Shoe_Size: " + userSize +"] [user_state: " + user_state +"]  [Region: " + city +"] [Age: " + age +"] [Gender: " + gender +"] [Channel ID:"+ channel_id +"]" );
			    	$( "input[name=paper_type]" ).val( paperT );
				} else {
				   fms.noteUserF( 'Please select US or EU sizesystem for US geography Or  UK / EU sizeSystem for Outside US', "error" ); 
				}
				fms.sendData();
			}
		});
		
		// Get shop recommentation page from foot profile page
		$( document ).on( 'click', '.fms-shop-recommendations', function(){
			fms.cateParentId = 2;
			fms.catereserveParentId = [2];
			fms.getCateList( 2 );
		} );
		
		// Logout from fb and google before check wich provided used to login
		$( document ).on( 'click', 'span.fms-logout', function(){
			if( log_in_provider != null ){
				if( log_in_provider == "fb" ){
					FB.logout(function(response) {
						window.location.reload();
					});
				} else if( log_in_provider == "google" ){
					if(gapi.auth2){
					 var auth2 = gapi.auth2.getAuthInstance();
					  auth2.signOut().then(function () {
					    	window.location.reload();
					  });
					}else{
						window.location.reload();
					}
				}
			}
		} );
		// Get catelog list from 
		$( document ).on('click', '#fms-catelog .fms-list', function(){
			fms.getCateList( $( this ).attr( 'data-id' ) );
		});
		$(document).on("click", '.fms-retake-photo', function () {
			$(".fms-section-container > section").hide();
			$('.fms-review-image').hide();
			$(".back-button").show();
			$("#current_screen").val('');
			$(".fms-result-error").hide();
			$('.hide-retake-back-butn').hide();	
			$('.retake-cancel-button').show();	
			$('.show-retake-back-butn').show();	

			$(".fms-take-instruction").trigger("click");
		});

		$(document).on("click", '.fms-retake-photo-error', function () {
			$(".fms-section-container > section").hide();
			$('.fms-review-image').hide();
			$(".back-button").show();
			$("#current_screen").val('');
			$(".fms-result-error").hide();
			$('.hide-retake-back-butn').hide();
			$('.retake-cancel-button').show();
			$('.show-retake-back-butn').show();

			// $(".fms-take-instruction").trigger("click");
			$("#fms-result").css('display','none');
			$("#fms-user-instruction").css('display','block');
			$("#fms-user-ins-page1").css('display','none');
			$("#fms-user-ins-page2").css('display','none');
			$("#fms-user-ins-page3").css('display','block');
		});
		
		$( document ).on( "click", ".fms-take-ins-next-left", function(){
			$('.back-ins-button').hide();
			$('.back-ins-button2').hide();
            $("#current_screen").val('');

			$('.back-ins-button-left').hide();
			$('.back-ins-button-left2').show();
			$('.back-ins-button-left3').hide();
			$('.back-button').hide();
			$('.back-btn').hide();
			$( '#fms-user-instruction-left #fms-user-ins-left-page1' ).hide();
			$( '#fms-user-instruction-left #fms-user-ins-left-page2' ).show();
			$( '#fms-user-instruction-left #fms-user-ins-left-page3' ).hide();

			// var geoValue = (typeof ($("input[name=Geography]:checked").val()) != "undefined") ? $("input[name=Geography]:checked").val() : $("input[name=Geography]").val();
			var geoValue = 'ROW';

			var paperT = fms.getPaperType($(".fms-SizeSystem").val(), geoValue, $(".shoesize").val());
			fms.showInstruction_left_2(paperT, geoValue);
		});
		 
		$( document ).on( "click", ".fms-left-photo", function(){
			//console.log('error_retake');
			$("#fms-result").show();
			$(".fms-result-wrapper").show();
		    //$(".fms-result-foot-top-info").show();
			$("#current_foot_type").val('left');
			//alert(JSON.stringify(left))
			$("#current_screen").val('');
			$(".fms-result-error").css('display','none');

			$(".fms-foot-type").text('Left foot');
			$( ".fms-result-foot-outline-left" ).show();
			$( ".fms-result-foot-outline-right" ).hide();
			$( "#fms-left-result-btns" ).show();
			$( "#fms-right-result-btns" ).hide();
			$( ".fms-result-foot-info" ).show();
			$( ".fms-result-foot-info-left" ).show();
			$( ".fms-result-description").hide();
			

			var left_foot_len = $("#left_foot_len").val();
			if(left_foot_len == 0){
				// $( "span.fms-foot-size" ).text( " No data here :)" );
				// $(".fms-result-foot-outline-left").hide();
				// $( ".fms-result-foot-info-left" ).html( "<div><p style='position:initial;font-size: 16px;margin-left: 30%;width:50%;text-align: center;font-style: italic;'>Did you know, 80% of the have people different measurements of their right and left foot?</p></div><br><br><div style='position:initial;font-size: 16px;margin-left: 30%;width:50%;text-align: center;'><p>Add your left picture to help us give you better recommendations!</p></div><br><br>" );

				$(".fms-left-photo").hide();
				$(".fms-result-foot-top-info").hide();
				$(".start-left-foot").show();
				$(".fms-retake-left-photo").hide();
				$(".fms-result-foot-info").hide();
				$(".fms-retake-left-photo").hide();
				$(".custom-shoesize-length-right").hide();
				$(".fms-bata-size").text(' ');
				$//(".fms-bata-size-text").html('<span style="font-size:21px">No data here :(</span>');

				// ****Bata style starts 
				var html = `<div class="measure-feet-txt">
						             <p>You haven’t measured your left foot yet. </p>
						           </div>
						           <div class="know-info">
						             <h5>Did you know?</h5>
						             <p>Many people have different measurements for each foot. Measure both feet to get your exact shoe size. </p>
						           </div>`;
				$(".profile-info").css('display','none');
				$(".foot-profile-img").css('display','none');		           
				$(".left-foot-no-data-div").html(html);
				// ***Bata style ends


				//$(".fms-bata-width").text('0');
				$(".fms-bata-gender").text(' ');
                $(".gender-and-age-text").css('display','none');
				var bata_gender = $(".bata_gender").val();
				if(bata_gender == "B" || bata_gender == "G" || bata_gender == ""){
					$(".fms-bata-width").text('');
					$(".fms-with-text").text('');
				}else{
					$(".fms-bata-width").text($(".bata_width").val());
					$(".fms-with-text").text('Width:');
					$(".fms-bata-size-text").html('Bata Size:');
				}	
				$(".start-left-foot").css({
					'background-color':'#ed1c24',
					'color':"#fff",
				});		
				//$(".three-foot-report-button").css('display','none');	
				$(".no-left-foot-buttons").css('display','block');

			}else{
                $(".gender-and-age-text").css('display','block');
				$(".fms-result-foot-top-info").show();
				$(".start-left-foot").hide();
				$(".fms-retake-left-photo").show();
				$(".fms-result-foot-info").show();
				$(".fms-retake-left-photo").show();
				$(".custom-shoesize-length-right").show();
				var bata_gender = $(".bata_gender").val();

				if(bata_gender == "B" || bata_gender == "G"){
					$(".fms-bata-width").text('');
					$(".fms-with-text").text('');
				}else{
					$(".fms-bata-width").text($(".bata_width").val());
					$(".fms-with-text").text('Width:');
				}				
				$(".fms-bata-size").text($(".bata_size").val());
				$(".fms-bata-gender").text($(".bata_gender").val());

				// ****bata style starts
					$(".profile-info").css('display','block');
					$(".foot-profile-img").css('display','flex');		           
					$(".left-foot-no-data-div").html(' ');
				    //$(".three-foot-report-button").css('display','block');	
					$(".no-left-foot-buttons").css('display','none');


				// ****bata style ends

			}
			
			
			$(".fms-view-right-btn").show();
			$(".fms-view-left-btn").hide();
			

			$( ".fms-result-wrapper" ).show();
		});

		$( document ).on( "click", ".fms-left-photo-error", function(){
			//console.log('error_retake');
			$("#fms-result").css('display','none');
			$("#fms-user-instruction-left").css('display','block');
			$("#fms-user-ins-left-page1").css('display','none');
			$("#fms-user-ins-left-page2").css('display','none');
			$("#fms-user-ins-left-page3").css('display','block');

			// $(".fms-result-wrapper").show();
		 	//    //$(".fms-result-foot-top-info").show();
			// $("#current_foot_type").val('left');
			// //alert(JSON.stringify(left))
			// $("#current_screen").val('');
			// $(".fms-result-error").css('display','none');

			// $(".fms-foot-type").text('Left foot');
			// $( ".fms-result-foot-outline-left" ).show();
			// $( ".fms-result-foot-outline-right" ).hide();
			// $( "#fms-left-result-btns" ).show();
			// $( "#fms-right-result-btns" ).hide();
			// $( ".fms-result-foot-info" ).show();
			// $( ".fms-result-foot-info-left" ).show();
			// $( ".fms-result-description").hide();
			

			// var left_foot_len = $("#left_foot_len").val();
			// if(left_foot_len == 0){
			// 	// $( "span.fms-foot-size" ).text( " No data here :)" );
			// 	// $(".fms-result-foot-outline-left").hide();
			// 	// $( ".fms-result-foot-info-left" ).html( "<div><p style='position:initial;font-size: 16px;margin-left: 30%;width:50%;text-align: center;font-style: italic;'>Did you know, 80% of the have people different measurements of their right and left foot?</p></div><br><br><div style='position:initial;font-size: 16px;margin-left: 30%;width:50%;text-align: center;'><p>Add your left picture to help us give you better recommendations!</p></div><br><br>" );

			// 	$(".fms-left-photo").hide();
			// 	$(".fms-result-foot-top-info").hide();
			// 	$(".start-left-foot").show();
			// 	$(".fms-retake-left-photo").hide();
			// 	$(".fms-result-foot-info").hide();
			// 	$(".fms-retake-left-photo").hide();
			// 	$(".custom-shoesize-length-right").hide();
			// 	$(".fms-bata-size").text(' ');
			// 	$//(".fms-bata-size-text").html('<span style="font-size:21px">No data here :(</span>');

			// 	// ****Bata style starts 
			// 	var html = `<div class="measure-feet-txt">
			// 			             <p>You haven’t measured your left foot yet. </p>
			// 			           </div>
			// 			           <div class="know-info">
			// 			             <h5>Did you know?</h5>
			// 			             <p>Many people have different measurements for each foot. Measure both feet to get your exact shoe size. </p>
			// 			           </div>`;
			// 	$(".profile-info").css('display','none');
			// 	$(".foot-profile-img").css('display','none');		           
			// 	$(".left-foot-no-data-div").html(html);
			// 	// ***Bata style ends


			// 	//$(".fms-bata-width").text('0');
			// 	$(".fms-bata-gender").text(' ');
			// 	$(".gender-and-age-text").css('display','none');
			// 	var bata_gender = $(".bata_gender").val();
			// 	if(bata_gender == "B" || bata_gender == "G" || bata_gender == ""){
			// 		$(".fms-bata-width").text('');
			// 		$(".fms-with-text").text('');
			// 	}else{
			// 		$(".fms-bata-width").text($(".bata_width").val());
			// 		$(".fms-with-text").text('Width:');
			// 		$(".fms-bata-size-text").html('Bata Size:');
			// 	}	
			// 	$(".start-left-foot").css({
			// 		'background-color':'#ed1c24',
			// 		'color':"#fff",
			// 	});		
			// 	//$(".three-foot-report-button").css('display','none');	
			// 	$(".no-left-foot-buttons").css('display','block');

			// }else{
			// 	$(".gender-and-age-text").css('display','block');

			// 	$(".fms-result-foot-top-info").show();
			// 	$(".start-left-foot").hide();
			// 	$(".fms-retake-left-photo").show();
			// 	$(".fms-result-foot-info").show();
			// 	$(".fms-retake-left-photo").show();
			// 	$(".custom-shoesize-length-right").show();
			// 	var bata_gender = $(".bata_gender").val();

			// 	if(bata_gender == "B" || bata_gender == "G"){
			// 		$(".fms-bata-width").text('');
			// 		$(".fms-with-text").text('');
			// 	}else{
			// 		$(".fms-bata-width").text($(".bata_width").val());
			// 		$(".fms-with-text").text('Width:');
			// 	}				
			// 	$(".fms-bata-size").text($(".bata_size").val());
			// 	$(".fms-bata-gender").text($(".bata_gender").val());

			// 	// ****bata style starts
			// 		$(".profile-info").css('display','block');
			// 		$(".foot-profile-img").css('display','flex');		           
			// 		$(".left-foot-no-data-div").html(' ');
			// 	    //$(".three-foot-report-button").css('display','block');	
			// 		$(".no-left-foot-buttons").css('display','none');


			// 	// ****bata style ends

			// }
			
			
			// $(".fms-view-right-btn").show();
			// $(".fms-view-left-btn").hide();
			

			// $( ".fms-result-wrapper" ).show();
		});
		
		$(document).on('click','.fms_second_next',function(){
			$("#fms-user-ins-page2").css('display','none');
			$("#fms-user-ins-page3").css('display','block');


		});

		$(document).on('click','.fms_second_next_left',function(){
			$("#fms-user-ins-left-page2").css('display','none');
			$("#fms-user-ins-left-page3").css('display','block');


		});


     	$(document).on('click','.fms-take-instruction-no-data',function(){
     		var user_type = $("#user_type").val();

     		if(user_type == 'old_user'){
     			var ap_gen = $(".first_condition_section .custom-gender-input").val();
     			var ap_shoe = $(".first_condition_section .fms-shoesize").val();
     			var ap_sys = $(".first_condition_section .fms-SizeSystem-new").val();



     			var formGeo = $("#request_geo").val('ROW');
				var formShoesize = $("#form-shoesize").val(ap_shoe),
				formSystem = $("#form-systemsize").val(ap_sys),
				formGender = $("#form-gender").val(ap_gen);
				//onsole.log('formGeo1',formGeo);
				if (typeof fms.getFootMeasurementFromLiveServer != "undefined") {
	              fms.getFootMeasurementFromLiveServer( "autogettingrelutfromliveserver" );
	            }else{
	                
	               $(".fms-take-instruction").trigger("click");
	            }

     		}else{
	            if (typeof fms.getFootMeasurementFromLiveServer != "undefined") {
	              fms.getFootMeasurementFromLiveServer( "autogettingrelutfromliveserver" );
	            }else{
	                
	               $(".fms-take-instruction").trigger("click");
	            }
            }

         });

		$( document ).on( "click", ".start-left-foot", function(){
			fms.updateShoeSizeVal('left');
			$( "[name=foot_type]" ).val(1);
			$('.back-ins-button').hide();
			$('.back-ins-button2').hide();
			$('.back-ins-button-left').show();
			$('.back-ins-button-left2').hide();
			$('.back-ins-button-left3').hide();
			$('.back-button').hide();
			$('.back-btn').hide();
            $("#current_screen").val('');

			$("#current_foot_type").val('left');
			$( ".fms-section-container > section" ).hide();
			$( '.fms-review-image' ).hide();
			$( '#fms-user-instruction-left #fms-user-ins-left-page2' ).hide();
			$( '#fms-user-instruction-left #fms-user-ins-left-page1' ).show();
			$( '#fms-user-instruction-left #fms-user-ins-left-page3' ).hide();

			if( $( ".fms-first-and-last-name" ).val().trim() == "" ){
				fms.noteUserF( 'Name field should not be empty.', "error" );
			} else if( $( ".fms-user-email" ).val().trim() == "" ){
				fms.noteUserF( 'Email field should not be empty.', "error" );
			}  else if( !( /\S+@\S+\.\S+/.test( $( ".fms-user-email" ).val().trim() ) ) ){
				fms.noteUserF( 'Invalid email address.', "error" );
			}  else {
				if (typeof fms.showInstruction_left != "undefined") {
					// var geoValue = (typeof ($("input[name=Geography]:checked").val()) != "undefined") ? $("input[name=Geography]:checked").val() : $("input[name=Geography]").val();
					var geoValue = 'ROW';

					var paperT = fms.getPaperType($(".fms-SizeSystem").val(), geoValue, $(".shoesize").val());
					//var paperT = fms.getPaperType( $( ".fms-SizeSystem" ).val(), $( "input[name=Geography]:checked" ).val(), $( ".shoesize" ).val()  );
					//var isType = ( $( ".fms-SizeSystem" ).val() == "UK" && parseInt( $( ".fms-shoesize" ).val() ) >= 10 ) || ( $( ".fms-SizeSystem" ).val() == "EU" && parseInt( $( ".fms-shoesize" ).val() ) >= 44 ) ? 2 : 1;
					fms.showInstruction_left(paperT,geoValue);
				}
			}
		});
		
		$( document ).on( "click", ".fms-retake-left-photo", function(){
			$( ".fms-section-container > section" ).hide();
			$( '.fms-review-image' ).hide();
            $(".back-button").show();
			$("#current_screen").val('');

			$("#current_foot_type").val('left');
			$( '#fms-user-instruction-left #fms-user-ins-left-page2' ).hide();
			$( '#fms-user-instruction-left #fms-user-ins-left-page1' ).show();
			$( '#fms-user-instruction-left #fms-user-ins-left-page3' ).hide();

			if( $( ".fms-first-and-last-name" ).val().trim() == "" ){
				fms.noteUserF( 'Name field should not be empty.', "error" );
			} else if( $( ".fms-user-email" ).val().trim() == "" ){
				fms.noteUserF( 'Email field should not be empty.', "error" );
			}  else if( !( /\S+@\S+\.\S+/.test( $( ".fms-user-email" ).val().trim() ) ) ){
				fms.noteUserF( 'Invalid email address.', "error" );
			}  else {
				if (typeof fms.showInstruction_left != "undefined") {
					// var geoValue = (typeof ($("input[name=Geography]:checked").val()) != "undefined") ? $("input[name=Geography]:checked").val() : $("input[name=Geography]").val();
					var geoValue = 'ROW';

					var paperT = fms.getPaperType($(".fms-SizeSystem").val(), geoValue, $(".shoesize").val());
					//var paperT = fms.getPaperType( $( ".fms-SizeSystem" ).val(), $( "input[name=Geography]:checked" ).val(), $( ".shoesize" ).val()  );
					//var isType = ( $( ".fms-SizeSystem" ).val() == "UK" && parseInt( $( ".fms-shoesize" ).val() ) >= 10 ) || ( $( ".fms-SizeSystem" ).val() == "EU" && parseInt( $( ".fms-shoesize" ).val() ) >= 44 ) ? 2 : 1;
					fms.showInstruction_left(paperT,geoValue);
					//$( "[name=foot_type]" ).val(1);
				}
			}
		});
		
		$(document).on("click", '.fms-error-cancel', function () {
			location.reload();
		});
		$(document).on("click", ".fms-take-reset", function () {
			//$(".fms-first-and-last-name, .fms-user-email").val("");
            $("#current_screen").val('');
			$('.fms-review-image').hide();
			$('.shoesize').val('9');
			$(".fmd-radio-container label:first-child input").prop("checked", true);
		});
		//back button
		$( document ).on( "click", ".back-ins-button", function(){
			//fms.camera.disableTourch();
			$(".fms-take-instruction").trigger("click");
			$('.back-ins-button').hide();
			$('.back-ins-button2').hide();
			$('.back-ins-button-left').hide();
			$('.back-ins-button-left2').hide();
			$('.back-ins-button-left3').hide();
			$('.back-button').hide();
			$('.back-btn').show();
			
		});
		
		$( document ).on( "click", ".back-ins-button-left", function(){
			//fms.camera.disableTourch();
			$(".fms-section-container > section").hide();
			$(".fms-left-photo").trigger("click");
			$('.back-ins-button').hide();
			$('.back-ins-button2').hide();
			$('.back-ins-button-left').hide();
			$('.back-ins-button-left2').hide();
			$('.back-ins-button-left3').hide();
			$('.back-button').hide();
			$('.back-btn').hide();
			
		});
		$( document ).on( "click", ".back-ins-button-left2", function(){
			//fms.camera.disableTourch();
			$(".fms-section-container > section").hide();
			$(".start-left-foot").trigger("click");
			$('.back-ins-button').hide();
			$('.back-ins-button2').hide();
			$('.back-ins-button-left').show();
			$('.back-ins-button-left2').hide();
			$('.back-ins-button-left3').hide();
			$('.back-button').hide();
			$('.back-btn').hide();
			
		});
		$( document ).on( "click", ".back-ins-button-left3", function(){
			//fms.camera.disableTourch();
			$(".fms-section-container > section").hide();
			$(".fms-take-ins-next-left").trigger("click");
			$('.back-ins-button').hide();
			$('.back-ins-button2').hide();
			$('.back-ins-button-left').hide();
			$('.back-ins-button-left2').show();
			$('.back-ins-button-left3').hide();
			$('.back-button').hide();
			$('.back-btn').hide();
			
		});
		
		$( document ).on( "click", ".back-ins-button2", function(){
			//fms.camera.disableTourch();
			$(".fms-take-ins-next").trigger("click");
			$('.back-ins-button').show();
			$('.back-ins-button2').hide();
			$('.back-ins-button-left').hide();
			$('.back-ins-button-left2').hide();
			$('.back-ins-button-left3').hide();
			$('.back-button').hide();
			$('.back-btn').hide();
			
		});
		$( document ).on( "click", ".fms-take-ins-next", function(){
			
        	$("#current_foot_type").val('right');
			$("#current_screen").val('');

			$( '#fms-user-instruction #fms-user-ins-page1' ).hide();
			$( '#fms-user-instruction #fms-user-ins-page2' ).show();
			$( '#fms-user-instruction #fms-user-ins-page3' ).hide();

			$('.back-ins-button').show();
			$('.back-ins-button2').hide();
			$('.back-ins-button-left').hide();
			$('.back-ins-button-left2').hide();
			$('.back-ins-button-left3').hide();
			$('.back-button').hide();
			$('.back-btn').hide();
			// var geoValue = (typeof ($("input[name=Geography]:checked").val()) != "undefined") ? $("input[name=Geography]:checked").val() : $("input[name=Geography]").val();
			var geoValue = 'ROW';

			var paperT = fms.getPaperType($(".fms-SizeSystem").val(), geoValue, $(".shoesize").val());
			fms.showInstruction_2(paperT, geoValue);
		});

		// new size scale change code	
		$(document).on("click",".selected-shoesize",function() {	
			var selected_shoesize_val = $(this).val();	
			if(selected_shoesize_val == "US") {	
				$('.show-custom-shoesize-val').html('15');	
			} else if(selected_shoesize_val == "UK") {	
				$('.show-custom-shoesize-val').html('12');	
			} else if(selected_shoesize_val == "EU") {	
				$('.show-custom-shoesize-val').html('46');	
			}	
		})	
		$(document).on("click",".selected-shoesize-confirm",function() {	
			var selected_shoesize_val = $(this).val();	
			if(selected_shoesize_val == "US") {	
				$('.show-custom-shoesize-val').html('15');	
			} else if(selected_shoesize_val == "UK") {	
				$('.show-custom-shoesize-val').html('12');	
			} else if(selected_shoesize_val == "EU") {	
				$('.show-custom-shoesize-val').html('46');	
			}	
		})	
		$(document).on("click",".confirm-shoesize-left",function() {	
			var changed_val = $(this).val();	
			if(changed_val == 'yes') {	
				$("#right_paper_type").val(3);	
				$("#left_paper_type").val(3);	
			} else {	
				$("#right_paper_type").val(0);	
				$("#left_paper_type").val(0);	
			}	
		})	
		// new size scale change code
		
		$( document ).on( "click", ".fms-take-instruction", function(){
			//console.log('enter_right');
			// set shoesize value in shoesize input based on new login	
			if($("#user_type").val() == 'new_user') {	
				fms.updateShoeSizeVal();	
			} else {	
				fms.updateShoeSizeVal('right');	
			}
        	$("#current_foot_type").val('right');
			$("#current_screen").val('');
			$("#fms-user-instruction").show();
			$( '#fms-user-instruction #fms-user-ins-page2' ).hide();
			$( '#fms-user-instruction #fms-user-ins-page1' ).show();
			$( '#fms-user-instruction #fms-user-ins-page3' ).hide();

			$('.back-ins-button').hide();
			$('.back-ins-button2').hide();
			$('.back-ins-button').hide();
			$('.back-ins-button-left').hide();
			$('.back-ins-button-left2').hide();
			$('.back-ins-button-left3').hide();
			$('.back-button').show();
			$('.back-btn').hide();
			if( $( ".fms-first-and-last-name" ).val().trim() == "" ){
				fms.noteUserF( 'Name field should not be empty.', "error" );
			} else if( $( ".fms-user-email" ).val().trim() == "" ){
				fms.noteUserF( 'Email field should not be empty.', "error" );
			}  else if( !( /\S+@\S+\.\S+/.test( $( ".fms-user-email" ).val().trim() ) ) ){
				fms.noteUserF( 'Invalid email address.', "error" );
			}  else {
				if (typeof fms.showInstruction != "undefined") {
					// var geoValue = (typeof ($("input[name=Geography]:checked").val()) != "undefined") ? $("input[name=Geography]:checked").val() : $("input[name=Geography]").val();
					var geoValue = 'ROW';
					var paperT = fms.getPaperType($(".fms-SizeSystem").val(), geoValue, $(".shoesize").val());
					// console.log('i_geoValue',geoValue);
					// console.log('i_shoe',$(".shoesize").val());

					// console.log('confirm_p',paperT);
					//alert(geoValue);
					//var paperT = fms.getPaperType( $( ".fms-SizeSystem" ).val(), $( "input[name=Geography]:checked" ).val(), $( ".shoesize" ).val()  );
					//var isType = ( $( ".fms-SizeSystem" ).val() == "UK" && parseInt( $( ".fms-shoesize" ).val() ) >= 10 ) || ( $( ".fms-SizeSystem" ).val() == "EU" && parseInt( $( ".fms-shoesize" ).val() ) >= 44 ) ? 2 : 1;
					fms.showInstruction(paperT,geoValue);
				}
			}

            var user_type = $("#user_type").val();
			if(user_type == 'new_user'){
				$(".back-button").hide();
			} 
		});
		$( document ).on( "click", ".fms-take-instruction-updated", function(){
        	$("#current_foot_type").val('right');
			$("#current_screen").val('');
			$( '#fms-user-instruction #fms-user-ins-page2' ).hide();
			$( '#fms-user-instruction #fms-user-ins-page1' ).show();
			$( '#fms-user-instruction #fms-user-ins-page3' ).hide();

			$('.back-ins-button').hide();
			$('.back-ins-button2').hide();
			$('.back-ins-button').hide();
			$('.back-ins-button-left').hide();
			$('.back-ins-button-left2').hide();
			$('.back-ins-button-left3').hide();
			$('.back-button').show();
			$('.back-btn').hide();
			if( $( ".fms-first-and-last-name" ).val().trim() == "" ){
				fms.noteUserF( 'Name field should not be empty.', "error" );
			} else if( $( ".fms-user-email" ).val().trim() == "" ){
				fms.noteUserF( 'Email field should not be empty.', "error" );
			}  else if( !( /\S+@\S+\.\S+/.test( $( ".fms-user-email" ).val().trim() ) ) ){
				fms.noteUserF( 'Invalid email address.', "error" );
			}  else {
				if (typeof fms.showInstruction != "undefined") {
					// var geoValue = (typeof ($(".fms-geoloc-new:checked").val()) != "undefined") ? $(".fms-geoloc-new:checked").val() : $(".fms-geoloc-new").val();
					var geoValue = 'ROW';

					$(".fms-SizeSystem").val($(".fms-SizeSystem-new").val());
					$(".shoesize").val($(".shoesize-new").val());
					$("input[name=Geography]").val(geoValue);

					var paperT = fms.getPaperType($(".fms-SizeSystem-new").val(), geoValue, $(".shoesize-new").val());
					//alert(geoValue);
					//var paperT = fms.getPaperType( $( ".fms-SizeSystem" ).val(), $( "input[name=Geography]:checked" ).val(), $( ".shoesize" ).val()  );
					//var isType = ( $( ".fms-SizeSystem" ).val() == "UK" && parseInt( $( ".fms-shoesize" ).val() ) >= 10 ) || ( $( ".fms-SizeSystem" ).val() == "EU" && parseInt( $( ".fms-shoesize" ).val() ) >= 44 ) ? 2 : 1;
					fms.showInstruction(paperT,geoValue);
				}
			}

            var user_type = $("#user_type").val();
			if(user_type == 'new_user'){
				$(".back-button").hide();
			} 
		});


		
		$(".shoesize").html(fms.sizeOption($(".fms-SizeSystem").val()));
		$(document).on("change", ".fms-SizeSystem", function () {
			if (typeof fms.sizeOption != "undefined") {
				$(".shoesize").html(fms.sizeOption($(this).val()));
			}
		});

		$(".shoesize").html(fms.sizeOption($(".fms-SizeSystem").val()));
		$(document).on("click", ".selected-shoesize", function () {
			if (typeof fms.sizeOption != "undefined") {
				$(".shoesize").html(fms.sizeOption($(this).val()));
			}
		});
		$(document).on("click", ".selected-shoesize-confirm", function () {
			if (typeof fms.sizeOption != "undefined") {
				$(".custom-shoesize").html(fms.sizeOption($(this).val()));
			}
		});
		
		$(document).on('click', '.fms_catelog_close span', function () {
			//$( 'section#fms-catelog' ).fadeOut();
		});
        
        //retake screen back buttton commented
		var customsystemSize = $("[name=SizeSystem]").val();
		var customshoesize = $(".fms-shoesize").val();
		var customgender = $("[name=gender]").val();
		var customgeography = $("[name=Geography]").val();

		$(document).on("click", '.back-btn-confirm',function (e) {
			var dataType = $(this).attr('data-type');
			if(dataType == 'recommendations'){
					if ($('div.mobile-nav').is('.show')) {
						$('nav.menu-burger').trigger('click');
						return;
					}
					if ($(".fms-section-container section:visible").is("#fms-catelog") &&
						fms.catereserveParentId.length != 0 && fms.catereserveParentId.length != 2 && typeof fms.catereserveParentId[fms.catereserveParentId.length - 2] != 0) {
						fms.getCateList(fms.catereserveParentId[fms.catereserveParentId.length - 2]);
						fms.catereserveParentId.pop();
					} else {
						var shown_container = $(".fms-section-container section:visible");
						if (shown_container.is("#fms-result")) {
							$(".fms-section-container section").hide();
							$(".fms-section-container section#data-section").show();
						} else if (shown_container.prev().length != 0) {
							$(".fms-section-container section").hide();
							shown_container.prev().show();
							if ($(".fms-section-container section:visible").prev().length == 0) {
								$('.back-button').hide();
								$('.back-button').css('display','none');

								// $(".back-button").css("visibility", "hidden");
							}
						}
					}
					if($("#fms-result").css('display') == 'block'){
						$('.back-button').css('display','none');
						$('.back-button').attr('data-type','normal');
						$('.back-btn').attr('data-type','normal');
						


					}
					e.preventDefault();

			}else{
				var user_type = $("#user_type").val();
				// var apiGeo = $("#request_geo").val();
				// if(apiGeo  == ''){
				// 	var geoUserLocation = $("#userGeoAfterCondition").val();
				// }else{
				// 	var geoUserLocation = apiGeo;
				// }
				var geoUserLocation = 'ROW';

				// console.log(geoUserLocation);
				//console.log('geoUserLocation',geoUserLocation);
				//alert(geoUserLocation);
				var current_foot_type = $("#current_foot_type").val();

				if($(".fms-section-container section#user-confirmation-section").css('display') == 'block'){
					if(current_foot_type == 'right'){
						$(".fms-take-instruction").trigger('click');
					}else{
						$(".start-left-foot").trigger('click');
					}
				}else{
					if(user_type == 'old_user'){
						var ceuSize = Math.ceil($("#api_shoe_size_eu").val());
						var cukSize = Math.ceil($("#api_shoe_size_uk").val());
						var cusSize = Math.ceil($("#api_shoe_size_us").val());
						var gender  = $("#api_gender").val();
						if(customsystemSize == 'UK'){
							 $('.fms-shoesize option[value='+cukSize+']').attr('selected','selected');
						}else if(customsystemSize == 'EU'){
							$('.fms-shoesize option[value='+ceuSize+']').attr('selected','selected');
						}else if(customsystemSize == 'US'){
							$('.fms-shoesize option[value='+cusSize+']').attr('selected','selected');
						}
						$(document).on('click','.selected-shoesize-confirm',function(){
							var value = $(this).val();
							$(".custom-system-size").val(value);
							if(value == 'UK'){
								 $('.fms-shoesize option[value='+cukSize+']').attr('selected','selected');
							}else if(value == 'EU'){
								$('.fms-shoesize option[value='+ceuSize+']').attr('selected','selected');
							}else if(value == 'US'){
								$('.fms-shoesize option[value='+cusSize+']').attr('selected','selected');
							}
							$("[name=SizeSystem]").val(value);
						});
						//$("[name=gender]").val(gender);
						var gender_from_api = $("[name=gender]").val();
						// console.log('gg',"gender_"+gender_from_api+"_confirm");

						// console.log('cc',gender);
						$("#gender_"+gender_from_api+"_confirm").prop('checked',true);
						if(geoUserLocation == 'ROW'){
							$(".geo-loc-row").attr('checked','checked');
						}else{
							$(".geo-loc-us").attr('checked','checked');
						}

						

						$(".fms-section-container section").hide();
						$(".fms-section-container section#user-confirmation-section").css('display','block');

						//$(".back-button").css("visibility", "hidden");
					}else{
						// if(current_foot_type == 'right'){
						// 	$(".fms-take-instruction").trigger('click');
						// }else{
						// 	$(".start-left-foot").trigger('click');
						// }
						$("#fms-user-instruction").hide();
						$("#data-section").show();
						
					}
				}

			}

		});

		
        $(document).on('click','.confirm-gender',function(){
			var value = $(this).val();
			//$("[name=gender]").val(value);

		});
		$(document).on('click','.confirm-geoloaction',function(){
			var value = $(this).val();
			//$("[name=Geography]").val(value);
		});
		$(document).on('click','.submit-confirm',function(){
			$("#current_screen").val('');
			$("#confirm_screen_status").val('yes');

			var gender = $('input[name=confirm-gender]:checked').val();
			var system = $( ".custom-system-size" ).val();
			var shoesize = $(".custom-shoesize option:selected").val();
			// var geography = $('input[name=confirm-geoloaction]:checked').val();
			var geography = 'ROW';

			// console.log('confirm_entered');
			// console.log('confirm_gender',gender);
			// console.log('confirm_system',system);
			// console.log('confirm_shoesize',shoesize);
			// console.log('confirm_geography',geography);

			if(gender == 'M'){
				$(".fms-bata-gender").val('male');
			}else if(gender == 'W'){
				$(".fms-bata-gender").val('female');
			}else{
				$(".fms-bata-gender").val('kid');
			}
			$("[name=gender]").val(gender);
			$("#gender_"+gender+"_confirm").prop('checked',true);

			$("[name=Geography]").val(geography);
			$("[name=SizeSystem]").val(system);
			$(".shoesize").val(shoesize);
			$(".back-button").show();
			if($("#fms-user-ins-page1").css('display') == 'block'){
                  $(".back-button").show();
            }
            var foot_type =  $("#current_foot_type").val();
            if(foot_type == 'right'){
        		$(".fms-take-instruction").trigger("click");
            }else{
            	$(".start-left-foot").trigger('click');
            }
			
		});
		$(document).on('click','.reset-confirm',function(){
			// $("#current_screen").val('');
			// $("[name=gender]").val(customgender);
			// $("[name=Geography]").val(customgeography);
			// $("[name=SizeSystem]").val(customsystemSize);
			// $(".shoesize").val(customshoesize);
			// $(".back-button").show();
			// if($("#fms-user-ins-page1").css('display') == 'block'){
   				// $(".back-button").show();
   			//}
			// $(".fms-take-instruction").trigger("click");
			var user_type = $("#user_type").val();
			if(user_type == 'new_user'){
				var custShoe = $("#custom-shoesize-new").val();
				$(".back-button").show();
				$(".back-btn").hide();
				$('.back-ins-button').hide();
				$('.back-ins-button2').hide();
				$('.back-ins-button').hide();
				$('.back-ins-button-left').hide();
				$('.back-ins-button-left2').hide();
				$('.back-ins-button-left3').hide();
				$(".fms-section-container section").hide();
				$('#data-section-updated').show();
			}else{
				if (typeof fms.getFootMeasurementFromLiveServer != "undefined") {
					fms.getFootMeasurementFromLiveServer( "autogettingrelutfromliveserver" );
				}
			}

		});
		$(document).on("click", ".fms-cancel", function () {
			//if (typeof fms.showError != "undefined") {
				//fms.showError("Cancelled by user.");
			//}
			$(".fms-result-error").css('display','none');
			var user_type = $("#user_type").val();
			if(user_type == 'new_user'){
				var custShoe = $("#custom-shoesize-new").val();
				$(".back-button").show();
				$(".back-btn").hide();
				$('.back-ins-button').hide();
				$('.back-ins-button2').hide();
				$('.back-ins-button').hide();
				$('.back-ins-button-left').hide();
				$('.back-ins-button-left2').hide();
				$('.back-ins-button-left3').hide();
				$(".fms-section-container section").hide();
				$('#data-section-updated').show();
			}else{
				if (typeof fms.getFootMeasurementFromLiveServer != "undefined") {
					fms.getFootMeasurementFromLiveServer( "autogettingrelutfromliveserver" );
				}
			}
			

		});

		$(document).on('click','.back-button-camera',function(){
			var foot_type = $("[name=foot_type]").val();
			$("#camera-section").hide();
			if(foot_type == 1){
				$("#fms-user-instruction-left").show();
				$("#fms-user-instruction-left #fms-user-ins-left-page1").hide();
				$("#fms-user-instruction-left #fms-user-ins-left-page2").hide();
				$("#fms-user-instruction-left #fms-user-ins-left-page3").show();
			}else{
				$("#fms-user-instruction").show();
				$("#fms-user-instruction #fms-user-ins-page1").hide();
				$("#fms-user-instruction #fms-user-ins-page2").hide();
				$("#fms-user-instruction #fms-user-ins-page3").show();
			}

		});

		$(document).on("click",".update-warning-btn",function() {
			$("#fms-result").show();
			$("#fms-result .fms-result-error").show();
			$("#fms-result .fms-result-wrapper").hide();

			
			var image = $("#paw_warning_image").val();
			var html = '<div class="response-error">Please make sure the heel & paper are touching the wall.</div>';
			$( ".fms-result-error .fms-error-msg" ).html( html );
			var message = '<div class="warning-msg-title" style="color:#438e03;">Paper is away from the wall.</div>';
			$( ".fms-result-error .fms-error-remark" ).html( "We have measured your foot but we recommend a retake for better accuracy as:"+message );
			$( ".fms-result-error .fms-err-code" ).text('');

			// $(".fms-result-error .fms-error-img img" ).attr( "src",image);
			$( ".fms-result-error" ).show();
			if( $( "[name=foot_type]" ).val() == 0){
				$(".fms-left-photo").hide();
				$(".fms-retake-photo").show();
				$(".fms-left-photo-error").hide();
				$(".fms-retake-photo-error").show();

				

				
			}else{
				$(".fms-left-photo").show();
				$(".fms-left-photo-error").show();

				$(".fms-retake-photo").hide();
				$(".fms-retake-photo-error").hide();

			}
			$( ".fms-result-error" ).show();

		});

		
		$( document ).on( 'keyup', '.fms-cate-search-container input', function(){
			fms.categotyAll();
		});
		
		window.onbeforeunload = function(e){
			console.log("here");
			// if(typeof gapi != "undefined" || typeof gapi.auth2 != "undefined" || typeof gapi != undefined || typeof gapi.auth2 != undefined) {
			// 	gapi.auth2.getAuthInstance().signOut();
			// }
		};
		
		$(document).on("click", "#fms-help-user-btn", function() {
			if ($("#fms-help-user-phone").val() != "") {
				$("div.fms-result-help-box > div.form-box").hide();
				$("div.fms-result-help-box > div.ack-box").show();
			} else {
				alert("Please enter your number.!");
			}
		});
		
		
		/* pre value */
		var now 	= new Date(),
		    dd 		= now.getDate() + "",
		    mm 		= ( now.getMonth() + 1 ) + "", 
		    yyyy 	= now.getFullYear()+"",
		    hr  	= now.getHours()+"",
		    mn  	= now.getHours()+"";
		
		if( dd < 10)  {
		    dd = '0'+dd;
		} 

		if( mm < 10 ) {
		    mm = '0'+mm;
		} 
		
		hr = hr.length == 1 ? "0" + hr : hr;
		mn = mn.length == 1 ? "0" + mn : mn;
		//$( ".fms-user-email" ).val( "tester-"+ yyyy + mm + dd +"-"+ hr + "" +  mn +"@fmas.com" );
		
		//$( ".fms-shoesize" ).val( "9" );
		
		var outlineImg_height = document.getElementsByClassName( "fms-result-container" )[0].offsetHeight - 55;
		//$( "#fms-result-ball-girth" ).css( "top", ( outlineImg_height / 3 ) );
		//$( "#fms-result-instep" ).css( "top", ( outlineImg_height / 2 ) );
		//fms.setHeightForSections();

		var deviceinf = deviceModule.init();
		//alert(deviceinf);
		if( typeof deviceinf.browser != 'undefined' && typeof deviceinf.browser.name == 'string' ){
			if( deviceinf.browser.name.toLocaleLowerCase() == "safari" ){
				$( ".fms-camera-flow-ios" ).show();
			} else {
				$( ".fms-camera-flow-android" ).show();
			}
		}

	}
	
});

function permission () {
	console.log("inside permission function");
    if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
        // (optional) Do something before API request prompt.
        DeviceMotionEvent.requestPermission()
            .then( response => {
            // (optional) Do something after API prompt dismissed.
            if ( response == "granted" ) {
                window.addEventListener( "devicemotion", (e) => {
                    // do something for 'e' here.
                })
            }
        })
            .catch( console.error )
    } else {
        console.log( "DeviceMotionEvent is not defined" );
    }
}

var findmeashow = function(){
	
	var self 			= this;
	this.captureVar 	= { pitch : 0, roll : 0, yaw : 0 },
	this.mob_x 			= $( "#mob-x" );
	this.mob_y 			= $( "#mob-y" );
	this.mob_z 			= $( "#mob-z" );
	this.noteUser		= $( "#note-to-user" );
	this.rightFrame 	= $( ".fms-video-frame" );
	this.videoContainer = $( ".video-with-frame-container" );
	this.isSinglePaper  = true;
	
	this.arrow_left 	= $( ".fms-camera-left" );
	this.arrow_right 	= $( ".fms-camera-right" );
	this.arrow_top 		= $( ".fms-camera-top" );
	this.arrow_bottom 	= $( ".fms-camera-bottom" );
	this.isTimerRunning = false;
	this.isFromWidget   = false;
	this.fm_counter		= $( ".fms_counter" );
	
	this.pitch = { min : -30, max : 30 };
	this.roll  = { min : -30, max : 30 };
	
	this.resultIsError = false;
	
	this.cateParentIdList = [];
	
	this.camera 	= new takePickture( this, $( "#video_steam" ), $( "#img_elem" ), $( "#canvas_capture" ) );
	
	this.ajax 		= new ajax_req( this );
	this.error_codes 	= new error_codes( this );
	
	this.imageBaseToSend = "";
	
	this.categoryList = [];
	
	this.allCateList = [];
	
	/**
	 * Get shop recommendation category list
	 */
	this.getCateList = function( _parent_id ){
		self.noteUserF( '<div class="loader"></div> Loading please wait...', "active" );
		var data = { is_category_page : true, url : find_cate_url+'catalog_products?'+fms_cate_key+'&category_display=[id,name,id_parent]&category_filter[id_parent]=['+_parent_id+']' };
		var formData = new FormData();
		for( var i in data ){
			formData.append( i, data[i] );
		}
		this.cateParentId = _parent_id;
		this.ajax.ping( "get_catelog", formData, "POST", $( "[name=requestUrl]" ).val() );
	};
	
	this.categotyAll = function(){
		if( $( '.fms-cate-search-container input' ).val().trim() != '' ){
			self.noteUserF( '<div class="loader"></div> Loading please wait...', "active" );
			if( this.allCateList.length == 0 ){
				var data = { is_category_page : true, url : find_cate_url+'catalog_products?'+fms_cate_key+'&category_display=[id,name,id_parent]' };
				var formData = new FormData();
				for( var i in data ){
					formData.append( i, data[i] );
				}
				this.ajax.ping( "get_all_catelog", formData, "POST", $( "[name=requestUrl]" ).val() );
			} else {
				this.ajaxReponse( 'get_all_catelog', this.allCateList );
			}
		} else {
			fms.getCateList( 2 );
		}
	};

	this.showPichAndRole = function () {
		// if (typeof window["ondeviceorientation"] == "undefined") {
		// 	alert("Not supported by your browser.");
		// 	return false;
		// } else {
		window.addEventListener('deviceorientation', function (e) {
			if (self.camera.isVideoOpen) {
				self.captureVar = {
					pitch: e.beta,
					roll: e.gamma,
					yaw: e.alpha
				};

				if ((self.captureVar.pitch >= self.pitch.min && self.captureVar.pitch <= self.pitch.max)) {
					self.mob_x.removeClass("error").addClass("active");
				} else {
					self.mob_x.removeClass("active").addClass("error");
				}
				if ((self.captureVar.roll >= self.roll.min && self.captureVar.roll <= self.roll.max)) {
					self.mob_y.removeClass("error").addClass("active");
				} else {
					self.mob_y.removeClass("active").addClass("error");
				}
				// var geoValue = (typeof ($("input[name=Geography]:checked").val()) != "undefined") ? $("input[name=Geography]:checked").val() : $("input[name=Geography]").val();
				var geoValue = 'ROW';

                var customepaperT = fms.getPaperType( $( ".fms-SizeSystem" ).val(),  geoValue, $( ".fms-shoesize" ).val() );

				//right foot

					if ((self.captureVar.pitch >= self.pitch.min && self.captureVar.pitch <= self.pitch.max) && (self.captureVar.roll >= self.roll.min && self.captureVar.roll <= self.roll.max)) {
					if (self.isSinglePaper) {
						$('.fms-video-frame').removeClass('fms-double-frame-video');
						if(customepaperT == 1){
							//Geo location Us for single paper right
							self.rightFrame.attr("src", "https://shoesizefinder.bata.in/api/assets/img/outline-right-letter.png");
						}
						if(customepaperT == 0){
							self.rightFrame.attr("src", "https://shoesizefinder.bata.in/api/assets/img/outline-right.png");
						}
					} else {
						$('.fms-video-frame').addClass('fms-double-frame-video');

						if(customepaperT == 4){
							//Geo location Us for double paper right
							self.rightFrame.attr("src", "https://shoesizefinder.bata.in/api/assets/img/outline-right-double-letter.png");
						}
						if(customepaperT == 3){
							self.rightFrame.attr("src", "https://shoesizefinder.bata.in/api/assets/img/outline-right-double.png");
						}
					}
				} else {
					if (self.isSinglePaper) {
						$('.fms-video-frame').removeClass('fms-double-frame-video');

						if(customepaperT == 1){
							//Geo location Us for single paper right grey
							self.rightFrame.attr("src", "https://shoesizefinder.bata.in/api/assets/img/outline-right-grey-letter.png");
						}
						if(customepaperT == 0){
							self.rightFrame.attr("src", "https://shoesizefinder.bata.in/api/assets/img/outline-right-grey.png");
						}
					} else {
						$('.fms-video-frame').addClass('fms-double-frame-video');

						if(customepaperT == 4){
							//Geo location Us for double paper right grey
							self.rightFrame.attr("src", "https://shoesizefinder.bata.in/api/assets/img/outline-right-double-grey-letter.png");
						}
						if(customepaperT == 3){
							self.rightFrame.attr("src", "https://shoesizefinder.bata.in/api/assets/img/outline-right-double-grey.png");
						}

					}
				}

				//left foot
				if( ( self.captureVar.pitch >= self.pitch.min && self.captureVar.pitch <= self.pitch.max )  && ( self.captureVar.roll >= self.roll.min && self.captureVar.roll <= self.roll.max ) ){
						if( self.isSinglePaper ){
						  $('.fms-video-frame').removeClass('fms-double-frame-video');

							if($( "[name=foot_type]" ).val() == 1){
								if(customepaperT == 1){
									//Geo location Us for the single paper left
									self.rightFrame.attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-left.png" );
								}
								if(customepaperT == 0){
									self.rightFrame.attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-left.png" );
								}
								
							}else{
								if(customepaperT == 1){
									//Geo location Us for the single paper right
								 		self.rightFrame.attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-right-letter.png" );
								}
								if(customepaperT == 0){
									self.rightFrame.attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-right.png" );
								}
							}
							
						} else {
							$('.fms-video-frame').addClass('fms-double-frame-video');

							if($( "[name=foot_type]" ).val() == 1){
								if(customepaperT == 4){
									//Geo location Us for the double paper left
									self.rightFrame.attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-left-double-letter.png" );
								}
								if(customepaperT == 3){
									self.rightFrame.attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-left-double.png" );
								}
							}else{
								if(customepaperT == 4){
									//Geo location Us for the double paper right
									self.rightFrame.attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-right-double-letter.png" );
								}
								if(customepaperT == 3){
									self.rightFrame.attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-right-double.png" );
								}
							}						
						}
					} else {
						if( self.isSinglePaper ){
							$('.fms-video-frame').removeClass('fms-double-frame-video');

							if($( "[name=foot_type]" ).val() == 1){
								if(customepaperT == 1){
									//Geo location Us for the double paper left grey
									self.rightFrame.attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-left-grey-letter.png" );
								}
								if(customepaperT == 0){
									self.rightFrame.attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-left-grey.png" );
								}
								
							}else{
								if(customepaperT == 1){
									//Geo location Us for the single paper right grey
									self.rightFrame.attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-right-grey-letter.png" );
								}
								if(customepaperT == 0){
									self.rightFrame.attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-right-grey.png" );
								}
							}
							
						} else {
						   $('.fms-video-frame').addClass('fms-double-frame-video');

							if($( "[name=foot_type]" ).val() == 1){
								if(customepaperT == 4){
									//Geo location Us for the double paper left grey
									self.rightFrame.attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-left-double-grey-letter.png" );
								}
								if(customepaperT == 3){
									self.rightFrame.attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-left-double-grey.png" );
								}
							}else{
								if(customepaperT == 4){
									//Geo location Us for the double paper right grey
									self.rightFrame.attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-right-double-grey-letter.png" );
								}
								if(customepaperT == 3){
									self.rightFrame.attr( "src", "https://shoesizefinder.bata.in/api/assets/img/outline-right-double-grey.png" );
								}
							}
							
						}
					}
				
				// move right
				if (self.captureVar.roll < self.roll.min) {
					self.arrow_right.show();
				} else {
					self.arrow_right.hide();
				}
				// move left
				if (self.captureVar.roll > self.roll.max) {
					self.arrow_left.show();
				} else {
					self.arrow_left.hide();
				}
				// move top
				// if (self.captureVar.pitch > self.pitch.max) {
				// 	self.arrow_top.show();
				// } else {
				// 	self.arrow_top.hide();
				// }
				// // move bottom
				// if (self.captureVar.pitch < self.roll.min) {
				// 	self.arrow_bottom.show();
				// } else {
				// 	self.arrow_bottom.hide();
				// }

				if (self.captureVar.pitch > self.pitch.max || self.captureVar.pitch < self.roll.min) {
				// if (self.captureVar.pitch > self.roll.max) {
					// self.arrow_top.show();
					self.arrow_bottom.show();
				} else {
					// self.arrow_top.hide();
					self.arrow_bottom.hide();
				}
				if (e.beta != null) {
					self.mob_x.text((e.beta).toFixed(1));
					self.mob_y.text((e.gamma).toFixed(1));
					self.mob_z.text(Math.round(e.alpha));
				}
			}
		});
		return true;
		// }
	};
	/**
	 * Capturing photo from browser streaming
	 * Checked with is oriantation is true or false
	 */
	this.capture = function () {
		if ( /* !self.isTimerRunning && */
			(self.captureVar.pitch >= self.pitch.min && self.captureVar.pitch <= self.pitch.max) &&
			(self.captureVar.roll >= self.roll.min && self.captureVar.roll <= self.roll.max)) {
			self.isTimerRunning = true;
			/* self.fm_counter.html( 3 );
			self.fm_counter.fadeIn();
			var $counter = 3000,
				dec		 = 3;
			var interval = setInterval( function(){
					$counter = $counter - 1000;
					self.fm_counter.hide();
					dec = dec - 1;
					self.fm_counter.html( dec );
					self.fm_counter.fadeIn();
					if( $counter == 0 ){
						self.isTimerRunning = false;
						clearInterval( interval );
						self.fm_counter.hide(); */
			if ((self.captureVar.pitch >= self.pitch.min && self.captureVar.pitch <= self.pitch.max) && (self.captureVar.roll >= self.roll.min && self.captureVar.roll <= self.roll.max)) {
				// "blob" or "canvas"
				self.camera.capture("blob");
			} else {
				if (typeof navigator.vibrate != "undefined") {
					navigator.vibrate([400]);
				}
				self.noteUserF('Please keep correct position.', "error");
			}
			/*	}
	 }, 1000 ); */
		} else {
			if (typeof navigator.vibrate != "undefined") {
				navigator.vibrate([400]);
			}
			self.noteUserF('Please keep correct position.', "error");
		}
	};
	/**
	 * Trigger capture
	 */
	this.capturedImage = function (_base) {
		self.imageBaseToSend = self.camera.baseData;
		self.videoContainer.hide();
		$(".camera_buttons").fadeIn();
		//alert("sri");
		if($( "[name=foot_type]" ).val() == 0){
			$(".camera_buttons .start-left-foot").hide();
			$(".camera_buttons .fms-retake-photo").show();
		}else{
			$(".camera_buttons .start-left-foot").show();
			$(".camera_buttons .fms-retake-photo").hide();			
		}
	};
	/**
	 * User data is availability check
	 */
	this.user = function () {
		self.noteUserF('<div class="loader"></div> Please wait, trying to access phone camera.', "active");
		var formData = new FormData();
		var data = {
			"createuser": true,
			"email": "adminappc@findmeashoe.com",
			"username": $(".fms-user-email").val(),
			"gender": $(".fms-gender").val()? $(".fms-gender").val() : $( "[name=gender]" ).val(),
			"age": $(".fms-age").val()? $(".fms-age").val() : $( "[name=age]" ).val(),
			"length": 0,
			"width": 0
		};
		for (var key in data) {
			formData.append(key, data[key]);
		}
		//alert($("[name=requestUrl]").val())
		setTimeout(function () {
			self.ajax.ping("get_user", formData, "POST", $("[name=requestUrl]").val());
		}, 400);
	}
	/*
	 * Send image data to image processing server
	 */
	this.sendData = function () {
		//$( "[name=username]" ).val( $( ".fms-user-email" ).val().replace( /[^\w\s]/gi, '' ) + "_" + Date.now() );
		$("[name=username]").val($(".fms-user-email").val());
		var formData = new FormData($("form#sent_to_api")[0]);
		formData.append('topView', this.imageBaseToSend.substr(this.imageBaseToSend.indexOf(',') + 1));
		//alert(JSON.stringify(formData))
		self.noteUserF('<div class="loader"></div> Image is being uploaded.', "active", false);
		setTimeout(function () {
			self.ajax.ping("sendimagedata", formData, "POST", $("[name=requestUrl]").val());
		}, 400);
	}
	this.getFootMeasurementFromLiveServer = function (_action) {

		var form_data = new FormData(),
			items = {
				"get_details": "not null",
				"user_mail": $(".fms-user-email").val()
			};
		//console.log('items',items);
		for (var key in items) {
			form_data.append(key, items[key]);
		}
		//console.log('form_data',form_data);
		self.ajax.ping(_action, form_data, "POST", $("[name=requestUrl]").val());
	}
	// Response for ahjax request
	this.ajaxReponse = function (_action, _data) {
		//console.log('_action',_action);
		
		//alert(_data);
		if (_action == "get_user") {
			self.fm_counter.html(3);
			if (typeof _data.success != "undefined" && (_data.success.indexOf("added successfully") != -1 || _data.success.indexOf("already exists") != -1)) {
				this.camera.kickCamera();
			}
		} else if (_action == "sendimagedata") {
			this.noteUser.removeClass('show');
			_data = typeof _data == "string" ? JSON.parse(_data) : _data;
            // var foot_type = $("name=[foot_type]").val();
            // alert(foot_type);
         	//console.log('_data',_data);
           	var paw_warning = _data.Diagnostic_Dict['PAW-Warning'].pred;
     		$("#paw_warning").val(paw_warning);
     		$("#paw_warning_image").val(_data.Dbg_Img);
     		if(paw_warning != '' && paw_warning == 'True'){
     			$(".update-warning-btn").css('display','block');
     		}else{
     			$(".update-warning-btn").css('display','none');
     		}
          	var cust_papertype = '';
            if (this.isSinglePaper) {
            	cust_papertype = 'single';
            }else{
            	cust_papertype = 'double';
            }
        	var details = self.error_codes.fetchErrorCodes(_data.status,_data.subcode,cust_papertype);
        	
        	if(details.status == 'success'){
        		//console.log('entered_in_success');
        		self.noteUserF('<div class="loader"></div> Server is processing your image.', "active", false);
				setTimeout(function () {
					self.getFootMeasurementFromLiveServer("gettingrelutfromliveserver");
				}, 400);
        	}else{
        		//console.log('entered_in_error');
        		  self.showResult({
		                msg: details.errorMsg,
		                remark: details.remark,
		                err_code: _data.status,
		                err_img: details.err_img,
		                subcode: _data.subcode,
		                DebugImg: _data.Dbg_Img
		            }, true);
        	}

        //*********** Old error messages code start	

		   //          if (_data.status == "ERR_000" || _data.status == "ERR_100" || _data.status == "ERR_101" || _data.status == "ERR_102" || _data.status == "ERR_103" || _data.status == "ERR_200" || _data.status == "ERR_201" || _data.status == "ERR_202" || _data.status == "ERR_203") {
					// 	self.noteUserF('<div class="loader"></div> Server is processing your image.', "active", false);
					// 	setTimeout(function () {
					// 		self.getFootMeasurementFromLiveServer("gettingrelutfromliveserver");
					// 	}, 400);
					// } else {
					// 	var errorMsg = "", 
					// 		remark = "",
					// 		err_img = "";
		   //              if (_data.status == "ERR_115" || _data.status == "ERR_215") {
		   //                  if (this.isSinglePaper) {
		   //                      errorMsg += 'Sorry, the bottom paper corners are not visibile. Please retake keeping camera below the waist and with good lighting. ';
		   //                      err_img = "ERROR13";
		   //                      remark = "Below paper bottom corners missing ";
		   //                  } else {
		   //                      errorMsg += 'Sorry, below paper the bottom paper corners are not visibile. Please retake keeping camera below the waist and with good lighting. ';
		   //                      err_img = "ERROR14";
		   //                      remark = "Paper bottom corners missing ";
		   //                  }
		   //              } else if (_data.status == "ERR_116" || _data.status == "ERR_216") {
		   //                  if (this.isSinglePaper) {
		   //                          errorMsg += 'We expected one vertical paper & you have two horizontal papers. Please match the paper arrangement to the green outline shown on the camera screen.';
		   //                          err_img = "ERROR13";
		   //                          remark = "Paper not correct  ";
		   //                  } else {
		   //                          errorMsg += 'We expected two horizontal papers but you seem to have one vertical paper. Please match the paper arrangement to the green outline shown on the camera screen.';
		   //                          err_img = "ERROR14";
		   //                          remark = "Papers not arranged well ";
		   //                  }
		   //              } else if (_data.status == "ERR_117" || _data.status == "ERR_217") {
		   //                  if (this.isSinglePaper) {
		   //                          errorMsg += 'We expected one vertical  paper . Please match the paper position to the green outline shown on the camera screen.';
		   //                          err_img = "ERROR13";
		   //                          remark = "Paper not correct  ";
		   //                  } else {
		   //                          errorMsg += 'We expected two horizontal papers. Please match the paper arrangement to the green outline shown on the camera screen.';
		   //                          err_img = "ERROR14";
		   //                          remark = "Papers not arranged well ";
		   //                  }
		   //              } else if (_data.status == "ERR_124" || _data.status == "ERR_224") {
		   //                  if (this.isSinglePaper) {
		   //                      errorMsg += 'We get the confusion, we are currently trying to measure your right foot. Please retake with your right foot ';
		   //                      } else {
		   //                      errorMsg += 'We get the confusion, we are currently trying to measure your right foot. Please retake with your right foot ';
		   //                  }
		   //                  err_img = "ERROR16";
		   //                  remark = "Please retake with right foot ";	
		   //              } else if (_data.status == "ERR_125" || _data.status == "ERR_225") {
		   //                  if (this.isSinglePaper) {
		   //                      errorMsg += 'We get the confusion, we are currently trying to measure your left foot. Please retake with your left foot ';
		   //                      } else {
		   //                      errorMsg += 'We get the confusion, we are currently trying to measure your right  foot. Please retake with your left foot ';
		   //                  }
		   //                  err_img = "ERROR16";
		   //                  remark = "Please retake with left  foot ";					
		   //              } else if (_data.status == "ERR_126" || _data.status == "ERR_226") {
		   //                  if (this.isSinglePaper) {
		   //                      errorMsg += 'We cant measure, if we don’t see your foot. Please keep the foot on the paper center & retake. ';
		   //                      } else {
		   //                      errorMsg += 'We cant measure, if we don’t see your foot. Please keep the foot on the paper center & retake. ';
		   //                  }
		   //                  err_img = "ERROR16";
		   //                  remark = "Your foot is not in the picture ";
		   //              } else if (_data.status == "ERR_127" || _data.status == "ERR_227") {
		   //                  if (this.isSinglePaper) {
		   //                      errorMsg += 'Please keep the foot straight on the paper center & retake. ';
		   //                      } else {
		   //                      errorMsg += 'Please keep the foot straight on the paper center & retake. ';
		   //                  }
		   //                  err_img = "ERROR11";
		   //                  remark = "Your foot is not visible clearly. ";		
		   //              } else if (_data.status == "ERR_118" || _data.status == "ERR_218") {
		   //                  if (this.isSinglePaper) {
		   //                      errorMsg += 'Sorry, but we need a  paper to measure your foot! Please retake using a clean standard paper on a slightly darker floor.  ';
		   //                      } else {
		   //                      errorMsg += 'Sorry, but we need a  paper to measure your foot! Please retake using a clean standard paper on a slightly darker floor.  ';
		   //                  }
		   //                  err_img = "ERROR9";
					// 		remark = "No Paper found :( ";	
					// 	} else if (_data.status == "ERR_119" || _data.status == "ERR_219") {
		   //                  if (this.isSinglePaper) {
		   //                      errorMsg += 'Paper edge is not touching the wall, please align it carefully. Currently, there is a gap between the paper &  wall.';
		   //                      } else {
		   //                      errorMsg += 'Paper edge is not touching the wall, please align it carefully. Currently, there is a gap between the paper &  wall.';
		   //                  }
		   //                  err_img = "ERROR10";
		   //                  remark = "Paper needs to align to the wall";		
		   //              } else if (_data.status == "ERR_130" || _data.status == "ERR_230") {
		   //                  if (this.isSinglePaper) {
		   //                      errorMsg += 'Sorry, we need a closer look! Please hold the phone just below your waist and click the picture ';
		   //                  } else {
		   //                      errorMsg += 'Sorry, we need a closer look! Please hold the phone just below your waist and click the picture ';
		   //                  }
		   //                  err_img = "ERROR6";
		   //                  remark = "Camera too far";
		   //              } else if (_data.status == "ERR_111" || _data.status == "ERR_211") {
		   //                  if (this.isSinglePaper) {
		   //                      errorMsg += 'Oops, looks like your pants are covering part of the foot. Please rollup the pants and retake the picture';
		   //                  } else {
		   //                      errorMsg += 'Oops, looks like your pants are covering part of the foot. Please rollup the pants and retake the picture';
		   //                  }
		   //                  err_img = "ERROR16";
		   //                  remark = "Foot covered with clothing";
		   //              } else if (_data.status == "ERR_113" || _data.status == "ERR_213") {
		   //                  if (this.isSinglePaper) {
		   //                      errorMsg += 'Oops, top left corner of the paper seems folded or has a low contrast background. Please retake with a fresh paper in a contrasting floor';
		   //                  } else {
		   //                      errorMsg += 'Oops, top left corner of the paper seems folded or has a low contrast background. Please retake with a fresh paper in a contrasting floor';
		   //                  }
		   //                  err_img = "ERROR10";
		   //                  remark = "Top Left corner of paper not good";
		   //              } else if (_data.status == "ERR_114" || _data.status == "ERR_214") {
		   //                  if (this.isSinglePaper) {
		   //                      errorMsg += 'Oops, top right corner of the paper seems folded or has a low contrast background. Please retake with a fresh paper in a contrasting floor';
		   //                  } else {
		   //                      errorMsg += 'Oops, top right corner of the paper seems folded or has a low contrast background. Please retake with a fresh paper in a contrasting floor';
		   //                  }
		   //                  err_img = "ERROR10";
		   //                  remark = "Top right corner of paper not good";
		   //              } else if ( _data.status == "ERR_132" || _data.status == "ERR_232") {
		   //                  if (this.isSinglePaper) {
		   //                      errorMsg += 'Sorry, we don’t like photos in landscape mode.  Please retake holding the phone in the portrait mode';
		   //                  } else {
		   //                      errorMsg += 'Sorry, we don’t like photos in landscape mode.  Please retake holding the phone in the portrait mode';
		   //                  }
		   //                  err_img = "ERROR5";
		   //                  remark = "Picture taken in landscape mode";
		   //              } else if (_data.status == "ERR_112" || _data.status == "ERR_212" ) {
		   //                  if (this.isSinglePaper) {
		   //                      errorMsg += 'Sorry, we couldn’t find the paper top edge. Please place  a clean paper on a contrast background with good lighting';
		   //                  } else {
		   //                      errorMsg += 'Oops, Looks like the top paper edge got cut :(  Please  retake the picture to ensure that the paper edges are visible';
		   //                  }
		   //                  err_img = "ERROR10";
		   //                  remark = "Paper edge missing ";
		   //              } else if (_data.status == "ERR_231" || _data.status == "ERR_131" || _data.status == "ERR_120" || _data.status == "ERR_220" || _data.status == "ERR_121" || _data.status == "ERR_221" ) {
		   //                  if (this.isSinglePaper) {
		   //                      errorMsg += 'Oops, looks like your hand shook, the photo was a bit blurry. Please retake in a well lit place.';
		   //                  } else {
		   //                      errorMsg += 'Oops, looks like your hand shook, the photo was a bit blurry. Please retake in a well lit place.';
		   //                  }
		   //                  err_img = "ERROR11";
		   //                  remark = "Big toe not found";
		   //              } else if (_data.status == "ERR_122" || _data.status == "ERR_222" ) {
		   //                  if (this.isSinglePaper) {
		   //                      errorMsg += 'Oops, Looks like your hand shook. Please retake the picture';
		   //                  } else {
		   //                      errorMsg += 'Oops, Looks like your hand shook. Please retake the picture';
		   //                  }
		   //                  err_img = "ERROR5";
		   //                  remark = "Left ball point not found";
		   //              } else if (__data.status == "ERR_123" || _data.status == "ERR_223") {
		   //                  if (this.isSinglePaper) {
		   //                      errorMsg += 'Oops, Looks like your hand shook. Please retake the picture';
		   //                  } else {
		   //                      errorMsg += 'Oops, Looks like your hand shook. Please retake the picture';
		   //                  }
		   //                  err_img = "ERROR5";
		   //                  remark = "Right ball point not found";
		   //              } else if (_data.status == "ERR_999") {
		   //                  if (this.isSinglePaper) {
		   //                      errorMsg += 'Sorry, sometimes our  systems act up. Please be nice & give it another shot! ';
		   //                  } else {
		   //                      errorMsg += 'Sorry, sometimes our  systems act up. Please be nice & give it another shot! ';
		   //                  }
		   //                  err_img = "ERROR15";
		   //                  remark = "Photo couldn’t be processed ";
		   //              } else if (_data.status == "ERR_CN1") {
		   //                  if (this.isSinglePaper) {
		   //                      errorMsg += 'Oops, something went wrong. Please re-take the picture';
		   //                  } else {
		   //                      errorMsg += 'Oops, something went wrong. Please re-take the picture';
		   //                  }
		   //                  err_img = "ERROR1";
		   //                  remark = "Server did not receive the images";
		   //              } else if (_data.status == "ERR_DB1") {
		   //                  if (this.isSinglePaper) {
		   //                      errorMsg += 'Sorry, sometimes our  systems act up. Please be nice & give it another shot!';
		   //                  } else {
		   //                      errorMsg += 'Sorry, sometimes our  systems act up. Please be nice & give it another shot!';
		   //                  }
		   //                  err_img = "ERROR15";
		   //                  remark = "User does not exist in Database";
		   //              } else if (_data.status == "ERR_DB2") {
		   //                  if (this.isSinglePaper) {
		   //                      errorMsg += 'Sorry, sometimes our  systems act up. Please be nice & give it another shot!';
		   //                  } else {
		   //                      errorMsg += 'Sorry, sometimes our  systems act up. Please be nice & give it another shot!';
		   //                  }
		   //                  err_img = "ERROR15";
		   //                  remark = "Database Write Failed!";
		   //              } else if (_data.status == "ERR_DB3") {
		   //                  if (this.isSinglePaper) {
		   //                      errorMsg += 'Sorry, sometimes our  systems act up. Please be nice & give it another shot!';
		   //                  } else {
		   //                      errorMsg += 'Sorry, sometimes our  systems act up. Please be nice & give it another shot!';
		   //                  }
		   //                  err_img = "ERROR15";
		   //                  remark = "Database Write Failed!";
		   //              } else if (_data.status == "ERR_DJ1") {
		   //                  if (this.isSinglePaper) {
		   //                      errorMsg += 'Sorry, sometimes our  systems act up. Please be nice & give it another shot!';
		   //                  } else {
		   //                      errorMsg += 'Sorry, sometimes our  systems act up. Please be nice & give it another shot!';
		   //                  }
		   //                  err_img = "ERROR15";
		   //                  remark = "Please provide email & username to register";
		   //              } else {
		   //                  errorMsg += 'Sorry, sometimes our  systems act up. Please be nice & give it another shot!';
		   //                  err_img = 'ERROR2';
		   //                  remark = "Opp ! That didn't work out";
		   //                  if (_data.status == false || _data.status == "false") {
		   //                      _data.status = 'ERROR141';
		   //                  }
		   //                  if (typeof _data.subcode == 'undefined') {
		   //                      _data.subcode = '10';
		   //                  }
		   //              }   
		   //              self.showResult({
		   //                  msg: errorMsg,
		   //                  remark: remark,
		   //                  err_code: _data.status,
		   //                  err_img: err_img,
		   //                  subcode: _data.subcode
		   //              }, true);

        //********** Old error messages ends

        
		} else if (_action == "gettingrelutfromliveserver") {
			_data = typeof _data == "string" ? JSON.parse(_data) : _data;
			self.noteUser.fadeOut();
			self.showResult(_data);
		} else if (_action == "autogettingrelutfromliveserver") {
			//console.log('login_data',_data);
			$("#user_type").val('new_user');
			var email_u = $("#user_email_custom").val();
			if (_data.status == "error") {
				//console.log('dd1');
				var formGeo = $("#request_geo").val();
				var formShoesize = $("#form-shoesize").val(),
				formSystem = $("#form-systemsize").val(),
				formGender = $("#form-gender").val();
				var user_type = $("#user_type").val();
				// if(formGeo == '' || formGender == '' || formSystem == '' || formShoesize == ''){
						//if(email_u == ''){
							//console.log('dd4');

							$(".fms-section-container section").hide();
							$('#data-section').show();
						// }else{
						// 	$(".fms-take-instruction").trigger("click");
						// }
						//console.log('dd5');

				// }else{
					//console.log('not_in_error');
					//console.log('dd6');
					//$(".fms-take-instruction").trigger("click");
				// }
				//$(".fms-section-container section").hide();
				//$('#data-section').show();
			} else {
				$("#user_type").val('old_user');
				//console.log('old_user');
				// var formGeo = $("#request_geo").val();
				// var formShoesize = $("#form-shoesize").val(),
				// formSystem = $("#form-systemsize").val(),
				// formGender = $("#form-gender").val();
				// console.log('formGeo',formGeo);
				// console.log('formShoesize',formShoesize);
				// console.log('formGender',formGender);

				// if(formGeo == '' || formGender == '' || formSystem == '' || formShoesize == ''){
				// 		$(".fms-section-container section").hide();
				// 		$('#data-section').show();
				// }else{
					if (typeof _data.data != "undefined" &&
						typeof _data.data.right != "undefined" &&
						typeof _data.data.right.L1 != "undefined" &&
						_data.data.right.L1 != "" &&
						_data.data.right.L1 != 0) {
						//$('.back-ins-button').hide();	
						//$(".back-button").css("visibility", "visible");
						//console.log('show_results_condition');
						self.showResult(_data);
						//console.log('dd8');

					} else {
						//console.log('dd3');
						$(".fms-section-container section").hide();
						$('#data-section').show();
					}
				//}
				//console.log('dd2');
				
			}
			$(".customer-logo .fms-cus-name").text("Welcome " + $( ".fms-first-and-last-name" ).val() + "!");
			$(".fms-powered-by .fms-logout").show();
		} else if (_action == 'get_catelog') {
			_data = typeof _data == "string" ? JSON.parse(_data) : _data;
			if (typeof _data.categories == "object" && _data.categories.length != 0) {
				this.categoryList = _data.categories;
				this.cateParentIdList.push(this.categoryList[0].id_parent);
				this.createCatelogPage(this.categoryList);
			} else {
				for (var i = 0; i < this.categoryList.length; i++) {
					if (this.cateParentId == this.categoryList[i].id) {
						if (typeof this.categoryList[i] == "object" && this.categoryList[i]["products"].length != 0) {
							this.fms_product_gen(this.categoryList[i]["products"]);
						} else {
							fms.noteUserF('Product not found.', "error");
						}
						break;
					}
				}
			}
			$(".fms-section-container section").hide();
			$('#fms-catelog').show();
            if($('#fms-result').css('display') == 'none'){
				//console.log('hide2');
				$(".back-button").css('display','block');
			}
			if($('#fms-result').css('display') == 'block'){
				//console.log('show2');
				$(".back-button").css('display','none');
				
			}
		} else if (_action == "set_user_login") {
			self.getFootMeasurementFromLiveServer("autogettingrelutfromliveserver");
		} else if (_action == "get_all_catelog") {
			_data = typeof _data == "string" ? JSON.parse(_data) : _data;
			this.allCateList = typeof _data.categories == 'undefined' ? _data : _data.categories;
			this.categoryList = [];
			for (var i = 0; i < this.allCateList.length; i++) {
				if (this.allCateList[i].name.toLocaleLowerCase().indexOf($('.fms-cate-search-container input').val().toLocaleLowerCase()) == 0) {
					this.categoryList.push(this.allCateList[i]);
				}
			}
			this.createCatelogPage(this.categoryList);
		}
		//else if(_action == "autogettingrelutfromliveserverExisting"){
			//console.log('test');
		// 	if( typeof _data.data.right != "undefined" ){
		// 		var indiaSize = _data.data.right.indSize;
		// 		if(indiaSize >= 20){
		// 			 $('.fms-shoesize option[value=20]').attr('selected','selected');
		// 		}else{
		// 			$('.fms-shoesize option[value='+indiaSize+']').attr('selected','selected');
		// 		}
		// 	}
		//}
	}
	this.createCatelogPage = function (fms_cat) {
		var is_available = false;
		var cat = fms_cat;
		var html = '<div class="fms-catelog-wrapper">';
		for (var i = 0; i < cat.length; i++) {
			if (i == 0) {
				if (fms.catereserveParentId.indexOf(cat[i].id_parent) == -1) {
					fms.catereserveParentId.push(cat[i].id_parent);
				}
			}
			is_available = true;
			html += '<div class="fms-list" data-id="' + cat[i].id + '"><div class="fms-list-wrapper ' +cat[i].name +'">';
			html += '<span class="fms-cat-image-container"><img alt="' + cat[i].name + '" src="http://steves-shoes.com/api/images/categories/' + cat[i].id + '?' + fms_cate_key + '"></span>';
			html += '<span class="fms-cate-title">' + cat[i].name + '</span>';
			html += '</div></div>';
		}
		html += '</div>';
		if (is_available) {
			$('.fms-cate-search-container').show();
			$('.fms-category-html-wrap').html(html);
				

		}
	};
	this.fms_product_gen = function (_product_data) {
		var is_available = false,
			html = "";
		for (var i = 0; i < _product_data.length; i++) {
			if (i == 0) {
				if (fms.catereserveParentId.indexOf(_product_data[i].id_parent) == -1) {
					fms.catereserveParentId.push(_product_data[i].id_parent);
				}
			}
			is_available = true;
			html += '<div class="fms-prod-list" data-id="' + _product_data[i].id + '"><div class="fms-list-wrapper">';
			html += '<div class="fms-cat-image-container"><img src="' + _product_data[i].images[0].img_path + "?" + fms_cate_key + '"></div>';
			html += '<div class="fms-product-right"><p class="fms-prod-title">' + _product_data[i].name + '</p>';
			html += '<p class="fms-cate-price" >$' + parseFloat(_product_data[i].price).toFixed(2) + '</p>';
			html += '<p class="fms-cate-recomentation" id="fms-widget' + _product_data[i].id + '"></p>';
			html += '</div></div></div>';
		}
		if (is_available) {
			$('.fms-cate-search-container').hide();
			$('.fms-category-html-wrap').html(html);
			this.callRecomentation();
		} else {
			fms.noteUserF('Not found.', "error");
		}
	}
	this.callRecomentation = function () {
		var size_container = $('.fms-category-html-wrap div.fms-prod-list .fms-cate-recomentation:not(.recm-added):first'),
			cus_email = $(".fms-user-email").val(),
			gender = $(".fms-gender").val()? $(".fms-gender").val() : $( "[name=gender]" ).val();
		size_container.addClass("recm-added");
		var container_parent = size_container.closest('div.fms-prod-list'),
			data = {
				prod_id: container_parent.attr("data-id"),
				cus_email: cus_email,
				prod_name: container_parent.find(".fms-prod-title").text(),
				parent_elem: size_container.attr("id"),
				gender: gender
			};
		if ($("#fmas-main-container").closest('#dummy-size-container').length == 0 &&
			$("#fmas-main-container").next().is('.fmas-recommended-star-rating-text')) {
			return false;
		}
		var fitTxt = $("#fmas-main-container").find('.fmas-recommended-star-rating-text');
		$("#fmas-main-container").after(fitTxt);
		if (data.parent_elem != undefined && data.parent_elem != "") {
			$("#fmas-main-container").removeAttr("id");
			this.fmsRecomCallBack(data);
		}
	}
	this.showVideo = function () {
		$(".fms-section-container section").hide();
		$(".fms-section-container section#camera-section").fadeIn();
		$(".fms-section-container section#camera-section .fms-review-image").hide();
		$(".fms-section-container section#camera-section #video_steam").show();
		if ($("input[name=Geography]:checked").val() != "") { }
		// var geoValue = (typeof ($("input[name=Geography]:checked").val()) != "undefined") ? $("input[name=Geography]:checked").val() : $("input[name=Geography]").val();
		var geoValue = 'ROW';
		var paperT = this.getPaperType($(".fms-SizeSystem").val(), geoValue, $(".shoesize").val());
		this.isSinglePaper = paperT == "3" || paperT == "4" ? false : true;
		//console.log('paperT',paperT);
		if (this.isSinglePaper) {
			$('.fms-video-frame').removeClass('fms-double-frame-video');

			if($( "[name=foot_type]" ).val() == 0){	
				//alert('dd');
			  	if(paperT == 0){
			  		self.rightFrame.attr("src", "https://shoesizefinder.bata.in/api/assets/img/outline-right.png");
			  	}
			  	if(paperT == 1){
			  		//Geo Location US for single paper Right foot
	  				self.rightFrame.attr("src", "https://shoesizefinder.bata.in/api/assets/img/outline-right-letter.png");
			  	}
			}
			if($( "[name=foot_type]" ).val() == 1){
				if(paperT == 0){
			  		self.rightFrame.attr("src", "https://shoesizefinder.bata.in/api/assets/img/outline-left.png");
			  	}
			  	if(paperT == 1){
			  		//Geo Location US for single paper Right foot
	  				self.rightFrame.attr("src", "https://shoesizefinder.bata.in/api/assets/img/outline-left.png");
			  	}
			}	
		} else {
			$('.fms-video-frame').addClass('fms-double-frame-video');
			
			$(".custom-bottom").text('bottom');
			if($( "[name=foot_type]" ).val() == 0){	
				if(paperT == 4){
					//Geo Location is US for  double paper right foot
					this.rightFrame.attr("src", "https://shoesizefinder.bata.in/api/assets/img/outline-right-double-letter.png");
				}
				if(paperT == 3){
					this.rightFrame.attr("src", "https://shoesizefinder.bata.in/api/assets/img/outline-right-double.png");
				}	
					
			}else{	
				if(paperT == 4){	
					//Geo location is US for Double paper left foot
					this.rightFrame.attr("src", "https://shoesizefinder.bata.in/api/assets/img/outline-left-double-letter.png");		
				}	
				if(paperT == 3){		
					this.rightFrame.attr("src", "https://shoesizefinder.bata.in/api/assets/img/outline-left-double.png");		
				}		
			}
		}
		this.rightFrame.show();
		this.videoContainer.show();
		var video_elem = $(".fms-section-container section#camera-section #video_steam")[0];
	}
	this.showError = function (_message) {
		$(".fms-section-container section").hide();
		//$(  ".fms-section-container section#fms-error .fms-error-message" ).text( _message );
		$(".fms-section-container section#fms-camera-enable-flow").fadeIn();
	}
	this.showInstruction = function (_type,geoValue) {
		var api_paper_type = $("#right_paper_type").val();	
        // if(api_paper_type != ''){	
        // 	_type = api_paper_type;	
        // }else{	
        // 	_type = _type;	
        // }
        _type = "0";
		$(".fms-section-container section").hide();
		$(".grab-foot-type").text('right');
		if (_type == "1" || _type == "0") {
			$("#fms-user-ins-page1 .fms-instruction-img").attr("src", "https://shoesizefinder.bata.in/api/assets/img/single-paper-grab-1.png");
			$("#fms-user-ins-page1 .fms-instruction-list-first").show();
			$("#fms-user-ins-page1 .fms-instruction-list-sec").hide();
			$(".sheets-text").text('sheet');
			$(".grab-one-text").text('a');

		} else {
			$("#fms-user-ins-page1 .fms-instruction-img").attr("src", "https://shoesizefinder.bata.in/api/assets/img/double-paper-grab-1.png");
			$("#fms-user-ins-page1 .fms-instruction-list-first").hide();
			$("#fms-user-ins-page1 .fms-instruction-list-sec").show();
			$(".sheets-text").text('sheets');
			$(".grab-one-text").text('2');

		}
		if (geoValue == "US") {
			$("#show-paper-size").text('8.5" x 11"');
		} else if (geoValue == "ROW") {
			$("#show-paper-size").text('A4');
		}
		
		$(".fms-section-container section#fms-user-instruction").show();
		//$('.back-ins-button').hide();
		//$(".back-button").css("visibility", "visible");
	}
	this.showInstruction_2 = function (_type, geoValue) {
		var api_paper_type = $("#right_paper_type").val();	
        // if(api_paper_type != ''){	
        // 	_type = api_paper_type;	
        // }else{	
        // 	_type = _type;	
        // }
        _type = "0";
		$(".fms-section-container section").hide();
		$(".grab-foot-type").text('right');

		if (_type == "1" || _type == "0") {
			$(".fms-instruction-img").attr("src", "https://shoesizefinder.bata.in/api/assets/img/singlepaper_image_jun.png");
			$(".fms-instruction-list-first").show();
			$(".fms-instruction-list-sec").hide();
			$("#paper_count").text('one');
			$("#paper_count_s").text('paper');
		} else {
			$(".fms-instruction-img").attr("src", "https://shoesizefinder.bata.in/api/assets/img/doublepaper_image_jun.png");
			$(".fms-instruction-list-first").hide();
			$(".fms-instruction-list-sec").show();
			$("#paper_count").text('two');
			$("#paper_count_s").text('papers');
		}
		if (geoValue == "US") {
			$("#show-paper-size").text('8.5" x 11"');
		} else if (geoValue == "ROW") {
			$("#show-paper-size").text('A4');
		}
		$(".fms-section-container section#fms-user-instruction").fadeIn();
		//$('.back-ins-button').hide();
		//$(".back-button").css("visibility", "visible");
	}
	
	// left flow instructions page code
	this.showInstruction_left = function( _type,geoValue ){
		var api_paper_type = $("#left_paper_type").val();	
        // if(api_paper_type != ''){	
        // 	_type = api_paper_type;	
        // }else{	
        // 	_type = _type;	
        // }
        _type = "0";
		$( ".fms-section-container section" ).hide();
		$(".grab-foot-type").text('left');

		if( _type == "1" || _type == "0" ){
			$( "#fms-user-ins-left-page1 .fms-instruction-img" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/single-paper-grab-1.png" );
			$( "#fms-user-ins-left-page1 .fms-instruction-list-first" ).show();
			$( "#fms-user-ins-left-page1 .fms-instruction-list-sec" ).hide();
			$(".sheets-text").text('sheet');
			$(".grab-one-text").text('a');


		} else {
			$( "#fms-user-ins-left-page1 .fms-instruction-img" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/double-paper-grab-1.png" );
			$( "#fms-user-ins-left-page1 .fms-instruction-list-first" ).hide();
			$( "#fms-user-ins-left-page1 .fms-instruction-list-sec" ).show();
			$(".sheets-text").text('sheets');
			$(".grab-one-text").text('2');


		}
        if (geoValue == "US") {
			$("#show-paper-size").text('8.5" x 11"');
		} else if (geoValue == "ROW") {
			$("#show-paper-size").text('A4');
		}
		$(  ".fms-section-container section#fms-user-instruction-left" ).fadeIn();
		//$('.back-ins-button').hide();
		//$( ".back-button" ).css( "visibility", "visible" );
	}
	
	
	this.showInstruction_left_2 = function( _type,geoValue ){
		var api_paper_type = $("#left_paper_type").val();	
        // if(api_paper_type != ''){	
        // 	_type = api_paper_type;	
        // }else{	
        // 	_type = _type;	
        // }
        _type = "0";
		$( ".fms-section-container section" ).hide();
		$(".grab-foot-type").text('left');

		if( _type == "1" || _type == "0" ){
			$( ".fms-instruction-img" ).attr( "src","https://shoesizefinder.bata.in/api/assets/img/singlepaper_image_left_jun.png" );
			$( ".fms-instruction-list-first" ).show();
			$( ".fms-instruction-list-sec" ).hide();
			$( "#paper_count_left" ).text('one');
			$( "#paper_count_s_left" ).text('paper');
		} else {
			$( ".fms-instruction-img" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/doublepaper_image_left_jun.png" );
			$( ".fms-instruction-list-first" ).hide();
			$( ".fms-instruction-list-sec" ).show();
			$( "#paper_count_left" ).text('two');
			$( "#paper_count_s_left" ).text('papers');
		}
		
		if (geoValue == "US") {
			$("#show-paper-size-left").text('8.5" x 11"');
		} else if (geoValue == "ROW") {
			$("#show-paper-size-left").text('A4');
		}

		$(  ".fms-section-container section#fms-user-instruction-left" ).fadeIn();
		//$('.back-ins-button').hide();
		//$( ".back-button" ).css( "visibility", "visible" );
	}
	
	this.setHeightForSections = function (is_first) {
		is_first = typeof is_first != "undefined" && is_first ? 10 : 0;
		var sections = $(".fms-section-container section");
		for (var i = 0; i < sections.length; i++) {
			$(sections[i]).height($(window).outerHeight() - $("div.customer-logo").outerHeight() - $(".fms-logo-container").outerHeight() - is_first);
		}
	}

	this.fetchShoesizeTable =  function(api_length,api_gender){
		//var api_len_cm =  parseFloat(api_length).toFixed(2) / parseFloat(10) ;
		var api_len_mm =  Math.floor(api_length); 
		//console.log(api_len_mm);
		var table_shoesize = 0;
		$(".csv_sizes").each(function(){
			var maxDataLen = Math.floor($(this).attr('data-length-max'));
			var minDataLen = Math.floor($(this).attr('data-length-min'));
			var gender     = $(this).attr('data-gender');
			if(api_gender == gender){
				if(api_len_mm >= minDataLen && api_len_mm <= maxDataLen){
					table_shoesize  = $(this).attr('data-size');
				}
			}

		})
		//console.log("table_shoesize",table_shoesize);
		if(table_shoesize == 0){
			table_shoesize = $("#csv_len1").attr('data-size');
		}
		return table_shoesize;
	}

	this.fetchShoesizeTableWidth =  function(api_response,api_gender){
		var foot_text = '';
		var width_text = '';
		$(".csv_width").each(function(){
			var csv_response = $(this).attr('data-response');
			var csv_foot_display = $(this).attr('data-display');
			var csv_women = $(this).attr('data-women');
			var csv_men = $(this).attr('data-men');
			if(csv_response == api_response){
			   foot_text = csv_foot_display;
				if(api_gender == 'W'){
					width_text = csv_women;
				}else{
					width_text = csv_men;
				}
			}

		})
		return {'foot_text':foot_text,'width_text':width_text}
	}
	
	this.showResult = function( _obj, _err ){
		//console.log('_obj',_obj);
		_err = typeof _err == "undefined" || _obj.status == "error" ? false : _err;
		$('.back-btn').hide();
		$('.back-ins-button').hide();
		$('.back-ins-button2').hide();
		$('.back-ins-button-left').hide();
		$('.back-ins-button-left2').hide();
		$('.back-ins-button-left3').hide();
		$('.back-button').hide();
		$( ".fms-section-container section" ).hide();
		$( ".fms-result-wrapper, .fms-result-error" ).hide();
		//alert(JSON.stringify(_err));
		//alert(JSON.stringify(_obj));
       // _err = true;
		if( _err ){
			$("#fms-result").show();
			
			var html = '<div class="response-error">'+ _obj.msg +'</div>';
			$( ".fms-result-error .fms-error-msg" ).html( html );
			$( ".fms-result-error .fms-error-remark" ).html( "<i>"+_obj.remark+"</i>" );
			// $( ".fms-result-error .fms-error-img img" ).attr( "src", "https://shoesizefinder.bata.in/api/assets/img/error_code/" + _obj.err_img + ".png" );
			$( ".fms-result-error .fms-error-img img" ).attr( "src", _obj.DebugImg );
			$( ".fms-result-error  .fms-err-code" ).text( _obj.err_code + ' - ' + _obj.subcode );
			$( ".fms-result-error" ).show();
			$("div.fms-result-help-box > div.form-box").show();
			$("div.fms-result-help-box > div.ack-box").hide();
			if( $( "[name=foot_type]" ).val() == 0){
				$(".fms-left-photo").hide();
				$(".fms-left-photo-error").hide();

				$(".fms-retake-photo").show();
				$(".fms-retake-photo-error").show();

			}else{
				$(".fms-left-photo").show();
				$(".fms-left-photo-error").show();

				$(".fms-retake-photo").hide();
				$(".fms-retake-photo-error").hide();

			}
			
		} else {
			var html = "";
			//console.log('api_response',_obj);
			if( _obj.status == "success" ){
				var geol = $( ".fms-geoloc:checked" ).val();
				
				var right = { size : "", length : "", width : "", type : "", angle : "" },
					left = { size : "", length : "", width : "", type : "", angle : "" };
				var shoesize_value_len_right = 0;
				var shoesize_value_len_left = 0;
				var shoesize_csv_width_right = 0;
				var shoesize_csv_width_left = 0;
				var gender_right = "";
				var gender_left = "";
				var gender_text_right = "";
				var gender_text_left = "";
				var age_text_left = "25 years old";	
				var age_text_right = "25 years old";	
                	
                console.log('gender_right',_obj.data.right.gender);	
                console.log('gender_left',_obj.data.left.gender);	
                //other details get info Api work starts 
                console.log('_obj',_obj);
                console.log('obj_age',_obj.data.other_details.data.right.age);
				if( _obj.data.other_details.status == "success" ){
					console.log('ddd');
					if( typeof _obj.data.other_details.data.right.error_code != "undefined" ){
					console.log('ddd1');

						$("#other_details_right").val('not_empty');
						$("#other_geo_right").val(_obj.data.other_details.data.right.geo);
						$("#other_gender_right").val(_obj.data.other_details.data.right.gender);
						$("#other_paper_type_right").val(_obj.data.other_details.data.right.paper_type);
						$("#other_paw_right").val(_obj.data.other_details.data.right.paw);
						$("#other_debug_image_right").val(_obj.data.other_details.data.right.debug_image_url);

						if( $("[name='foot_type']").val()  == 0){
							$("[name='Geography']").val(_obj.data.other_details.data.right.geo);
							$("[name='gender']").val(_obj.data.other_details.data.right.gender);
						}
						if( $("[name='foot_type']").val()  == 1){
							if( typeof _obj.data.other_details.data.left.error_code != "undefined" ){
								$("[name='Geography']").val(_obj.data.other_details.data.left.geo);
								$("[name='gender']").val(_obj.data.other_details.data.left.gender);
							}else{
								$("[name='Geography']").val(_obj.data.other_details.data.right.geo);
								$("[name='gender']").val(_obj.data.other_details.data.right.gender);
							}
						}
						console.log('valu_pppp',$("#other_paw_right").val());
						if($("#other_paw_right").val() == "true") {
							console.log('truuee');
			     			// $(".update-warning-btn").css('display','block');
			     			$("#paw_warning_image").val(_obj.data.other_details.data.right.debug_image_url);
			     		}else{
			     			// $(".update-warning-btn").css('display','none');
			     		} 
			     		age_text_right = _obj.data.other_details.data.right.age + " years old";

					}
				
					if( typeof _obj.data.other_details.data.left.error_code != "undefined" ){
						$("#other_details_left").val('not_empty');
						$("#other_geo_left").val(_obj.data.other_details.data.left.geo);
						$("#other_gender_left").val(_obj.data.other_details.data.left.gender);
						$("#other_paper_type_left").val(_obj.data.other_details.data.left.paper_type);
						$("#other_paw_left").val(_obj.data.other_details.data.left.paw);
						$("#other_debug_image_left").val(_obj.data.other_details.data.left.debug_image_url);

						if( $("[name='foot_type']").val()  == 0){
							$("[name='Geography']").val(_obj.data.other_details.data.right.geo);
							$("[name='gender']").val(_obj.data.other_details.data.right.gender);
						}
						if( $("[name='foot_type']").val()  == 1){
							$("[name='Geography']").val(_obj.data.other_details.data.left.geo);
							$("[name='gender']").val(_obj.data.other_details.data.left.gender);
						}
						if($("#other_paw_left").val() == "true") {
			     			// $(".update-warning-btn").css('display','block');
			     			$("#paw_warning_image").val(_obj.data.other_details.data.right.debug_image_url);
			     			
			     		}else{
			     			// $(".update-warning-btn").css('display','none');
			     		} 
			     		age_text_left = _obj.data.other_details.data.left.age + " years old";

					}



				}

				//Other details get info Api work ends


				//console.log('gender_right',_obj.data.right.gender);
				//console.log('gender_left',_obj.data.left.gender);



				//var is_right_foot = false;
				if( typeof _obj.data.right != "undefined" ){
					gender_text_right  = _obj.data.right.gender;
					$("[name=gender]").val(_obj.data.right.gender);
					if( typeof _obj.data.right.usSize != "undefined" ){
						right.size +=  '  US:'+ _obj.data.right.usSize;
					
						if( typeof _obj.data.right.W1_text != "undefined" ){
							right.size +=  " " + _obj.data.right.W1_text;
						}
						
						$("#api_shoe_size_us").val(_obj.data.right.usSize);
					}
					if( typeof _obj.data.right.euSize != "undefined" ){
						right.size +=  ' | EU:'+ _obj.data.right.euSize;
						
						if( typeof _obj.data.right.W1_text != "undefined" ){
							right.size +=  " " + _obj.data.right.W1_text;


						}
						$("#api_shoe_size_eu").val(_obj.data.right.euSize);
					}
					if( typeof _obj.data.right.ukSize != "undefined" ){
						right.size +=  '  | UK:'+ _obj.data.right.ukSize;
						if( typeof _obj.data.right.W1_text != "undefined" ){
							right.size +=  " " + _obj.data.right.W1_text;
						}
						$("#api_shoe_size_uk").val(_obj.data.right.ukSize);
					}

					if( typeof _obj.data.right.W1_text != "undefined" ){
							right.size +=  " " + _obj.data.right.W1_text;
							var api_gender = _obj.data.right.gender;
							var width_table = this.fetchShoesizeTableWidth(_obj.data.right.W1_text,api_gender);
							shoesize_csv_width_right =  width_table.width_text;

					}
					
					if( typeof _obj.data.right.L1 != "undefined" && !isNaN( _obj.data.right.L1  ) ){
						//right.length = parseInt( _obj.data.right.L1 );
						right.length  = Math.round(parseFloat( _obj.data.right.L1).toFixed(2));
						//fetching length from tables 
						var api_gender = _obj.data.right.gender;
						gender_right   = _obj.data.right.gender;
						shoesize_value_len_right = this.fetchShoesizeTable(_obj.data.right.L1,api_gender);
						//new api's script starts 	
							$(".right_L1").val(right.length);	
						//new api's script ends
					}
					
					if( typeof _obj.data.right.W1 != "undefined" && !isNaN( _obj.data.right.W1 ) ){
						//right.width = parseInt( _obj.data.right.W1 );
						right.width  = Math.round(parseFloat(_obj.data.right.W1).toFixed(2));
						//new api's script starts 	
							$(".right_W1").val(right.width);	
						//new api's script ends
					}

					//new api's script starts 	
					if( typeof _obj.data.right.L2 != "undefined" && !isNaN( _obj.data.right.L2  ) ){	
						var l2  = Math.round(parseFloat( _obj.data.right.L2).toFixed(2));	
							$(".right_L2").val(l2);	
					}	
					if( typeof _obj.data.right.L4 != "undefined" && !isNaN( _obj.data.right.L4  ) ){	
						var L4  = Math.round(parseFloat( _obj.data.right.L4).toFixed(2));	
							$(".right_L4").val(L4);	
					}	
					if( typeof _obj.data.right.A24 != "undefined" && !isNaN( _obj.data.right.A24  ) ){	
						var A24  = Math.round(parseFloat( _obj.data.right.A24).toFixed(2));	
							$(".right_A24").val(A24);	
					}	
					if( typeof _obj.data.right.A0 != "undefined" && !isNaN( _obj.data.right.A0  ) ){	
						var A0  = Math.round(parseFloat( _obj.data.right.A0).toFixed(2));	
							$(".right_A0").val(A0);	
					}	
					//new api's script ends 
					
					if( typeof _obj.data.right.toe_shape_text != "undefined" ){
						right.type =  _obj.data.right.toe_shape_text;
					}
					
					if( typeof _obj.data.right.toe_angle_text != "undefined" ){
						right.angle =  _obj.data.right.toe_angle_text;
					}
					
					right.toebox = "";
					
					if( typeof _obj.data.right.toe_angle_text != "undefined" && _obj.data.right.toe_angle_text.trim() != "" ){
						right.toebox +=  _obj.data.right.toe_angle_text;
					}
					
					if( typeof _obj.data.right.toe_shape_text != "undefined" && _obj.data.right.toe_shape_text.trim() != "" ){
						if( right.toebox != "" ){
							right.toebox += " - ";
						}
						right.toebox +=  _obj.data.right.toe_shape_text;
					}
					
				   	$("#api_gender").val(_obj.data.right.gender);

					if ( _obj.data.right.gender = "M") {
					   if ( _obj.data.right.W1_text == "A" || _obj.data.right.W1_text == "B" ) {
						   	right.ball_girth ="small"
						   	right.instep_girth = "small"
					   } else if ( _obj.data.right.W1_text ==  "C" || _obj.data.right.W1_text == "D" ){
						   right.ball_girth ="normal"
							   right.instep_girth = "normal"
					   } else {
						   right.ball_girth="big"
							   right.instep_girth = "big"
					   }

					} else if( _obj.data.right.gender = "W" ){
					   if ( _obj.data.right.W1_text == "A" ) {
							   right.ball_girth ="small"
								   right.instep_girth = "small"
					   } else if ( _obj.data.right.W1_text == "B" || _obj.data.right.W1_text == "C" ) {
							   right.ball_girth="normal"
								   right.instep_girth = "normal"
					   } else {
						   right.ball_girth ="big"
						   right.instep_girth = "big"
					   }
				    }
				}
				
				if( typeof _obj.data.left != "undefined" ){
					if( typeof _obj.data.left.usSize != "undefined" ){
						left.size +=  '  US:'+ _obj.data.left.usSize;
					
						if( typeof _obj.data.left.W1_text != "undefined" ){
							left.size +=  " " + _obj.data.left.W1_text;
						}
					}
					if( typeof _obj.data.left.euSize != "undefined" ){
						left.size +=  ' | EU:'+ _obj.data.left.euSize;
						
						if( typeof _obj.data.left.W1_text != "undefined" ){
							left.size +=  " " + _obj.data.left.W1_text;
						}
					}
						
					if( typeof _obj.data.left.ukSize != "undefined" ){
						left.size +=  '| UK:'+ _obj.data.left.ukSize;
						if( typeof _obj.data.left.W1_text != "undefined" ){
							left.size +=  " " + _obj.data.left.W1_text;
						}
					}
						
						
					if( typeof _obj.data.right.L1 != "undefined" && !isNaN( _obj.data.left.L1  ) ){
						//console.log( _obj.data.left.L1 );
						//left.length = parseInt( _obj.data.left.L1 );
						left.length  = Math.round(parseFloat(  _obj.data.left.L1).toFixed(2));
						$("#left_foot_len").val(left.length);
						//console.log('left_gen',_obj.data.left.gender);
						gender_left = _obj.data.left.gender;

						//fetching length from tables 
						var api_gender = _obj.data.left.gender;
						shoesize_value_len_left = this.fetchShoesizeTable(_obj.data.left.L1,api_gender);

						gender_text_left = _obj.data.left.gender;	
						//new api's script starts 	
							$(".left_L1").val(left.length);	
						//new api's script ends
						
					}
						
					if( typeof _obj.data.left.W1 != "undefined" && !isNaN( _obj.data.left.W1 ) ){
						//left.width = parseInt( _obj.data.left.W1 );
						left.width  = Math.round(parseFloat(_obj.data.left.W1).toFixed(2));
						//new api's script starts 	
							$(".left_W1").val(left.width);	
						//new api's script ends
					}

					//new api's script starts 	
					if( typeof _obj.data.left.L2 != "undefined" && !isNaN( _obj.data.left.L2  ) ){	
						var l2  = Math.round(parseFloat( _obj.data.left.L2).toFixed(2));	
							$(".left_L2").val(l2);	
					}	
					if( typeof _obj.data.left.L4 != "undefined" && !isNaN( _obj.data.left.L4  ) ){	
						var L4  = Math.round(parseFloat( _obj.data.left.L4).toFixed(2));	
							$(".left_L4").val(L4);	
					}	
					if( typeof _obj.data.left.A24 != "undefined" && !isNaN( _obj.data.left.A24  ) ){	
						var A24  = Math.round(parseFloat( _obj.data.left.A24).toFixed(2));	
							$(".left_A24").val(A24);	
					}	
					if( typeof _obj.data.left.A0 != "undefined" && !isNaN( _obj.data.left.A0  ) ){	
						var A0  = Math.round(parseFloat( _obj.data.left.A0).toFixed(2));	
							$(".left_A0").val(A0);	
					}	
					//new api's script ends 
					
					if( typeof _obj.data.left.toe_shape_text != "undefined" ){
						left.type =  _obj.data.left.toe_shape_text;
					}
					
					if( typeof _obj.data.left.toe_angle_text != "undefined" ){
						left.angle =  _obj.data.left.toe_angle_text;
					}
					
					left.toebox = "";
					
					if( typeof _obj.data.left.toe_angle_text != "undefined" && _obj.data.left.toe_angle_text.trim() != "" ){
						left.toebox +=  _obj.data.left.toe_angle_text;
					}
				
					if( typeof _obj.data.left.toe_shape_text != "undefined" && _obj.data.left.toe_shape_text.trim() != "" ){
						if( left.toebox != "" ){
							left.toebox += " - ";
						}
						left.toebox +=  _obj.data.left.toe_shape_text;
					}
				 
				
					if ( _obj.data.left.gender = "M") {
					   if ( _obj.data.left.W1_text == "A" || _obj.data.left.W1_text == "B" ) {
						   	left.ball_girth ="small"
						   	left.instep_girth = "small"
					   } else if ( _obj.data.left.W1_text ==  "C" || _obj.data.left.W1_text == "D" ){
							left.ball_girth ="normal"
							left.instep_girth = "normal"
					   } else {
						    left.ball_girth="big"
							left.instep_girth = "big"
					   }
					} else if( _obj.data.left.gender = "W" ){
					   if ( _obj.data.left.W1_text == "A" ) {
								left.ball_girth ="small"
							left.instep_girth = "small"
					   } else if ( _obj.data.left.W1_text == "B" || _obj.data.left.W1_text == "C" ) {
							left.ball_girth="normal"
							left.instep_girth = "normal"
					   } else {
						   left.ball_girth ="big"
						   left.instep_girth = "big"
					   }
				    }
				    if(typeof _obj.data.left.W1_text != "undefined" ){
					    var api_gender = _obj.data.left.gender;
						var width_table = this.fetchShoesizeTableWidth(_obj.data.left.W1_text,api_gender);
						shoesize_csv_width_left = width_table.width_text;
					}
				}
				//alert($( "[name=foot_type]" ).val())
				//console.log('gender_right_var',gender_text_right);
				//console.log('gender_left_var',gender_text_left);
					
				if($( "[name=foot_type]" ).val() == 0){
					var api_gender_text = 'male';
					if(gender_text_right == 'M'){
						api_gender_text = 'male';
					}else if(gender_text_right == 'W'){
						api_gender_text = 'female';
					}else{
						api_gender_text = 'kid';
					}
					$(".fms-bata-gender").text(api_gender_text);
					$(".fms-bata-age").text(age_text_right);
					
					$(".gender-and-age-text").css('display','block');
					$(".camera_buttons .start-left-foot").hide();
					$(".camera_buttons .fms-retake-photo").show();
					$( ".fms-result-foot-info-left" ).hide();
					$( ".fms-result-foot-top-info" ).show();
					$( ".fms-result-foot-info" ).show();
					$(".fms-foot-type").text('Right foot');
					$(".fms-bata-size").text(shoesize_value_len_right);
 					$('.custom-shoesize option[value='+shoesize_value_len_right+']').attr('selected','selected');

					$(".fms-bata-size-text").html('Bata size:');
					
					//$(".fms-bata-gender").text('('+gender_right+')');

					if(gender_right == 'B' || gender_right == 'G'){
						$(".fms-with-text").text('');
						$(".fms-bata-width").text('');
					}else{
						$(".fms-with-text").text('Width:');
						$(".fms-bata-width").text(shoesize_csv_width_right);

					}

					$( ".fms-result-foot-outline-left" ).hide();
					$( ".fms-result-foot-outline-right" ).show();
					$( "#fms-right-result-btns" ).show();
					$( "#fms-left-result-btns" ).hide();
					$( ".fms-result-foot-info" ).css( "text-align", "left" );
					$( "span.fms-foot-size" ).text( right.size );
					$( "#fms-foot-length" ).text( right.length + 'mm' );
					$( "#fms-foot-width" ).text( right.width + 'mm' );
					$( "#fms-result-toebox span" ).text( right.toebox );
					$( "#fms-result-ball-girth span" ).text( right.ball_girth );
					$( "#fms-result-instep span" ).text( right.instep_girth );
					if( (right.size) && (left.size )){
					$(".fms-left-photo").hide();
					$(".fms-retake-left-photo").show();
					$(".fms-view-left-btn").show();
					}else{
						$(".fms-left-photo").show();
						$(".fms-view-left-btn").hide();
					}
					$(".fms-retake-photo").css({
						'background-color':'#ed1c24',
						'color':'#fff',
					});
					$("#user_type").val('old_user');

					// ****bata style starts
						$(".profile-info").css('display','block');
						$(".foot-profile-img").css('display','flex');		           
						$(".left-foot-no-data-div").html(' ');
					    //$(".three-foot-report-button").css('display','block');	
						$(".no-left-foot-buttons").css('display','none');
						var other_paw_r = $("#other_paw_right").val();
						if(other_paw_r == "" || other_paw_r == 'false'){
						console.log('other_paw_r',other_paw_r);

							$(".update-warning-btn").css('display','none');
						}else{
							$(".update-warning-btn").css('display','block');

						}
						var other_details_right = $("#other_details_right").val();
						var other_debug_image_right = $("#other_debug_image_right").val();
						if(other_paw_r == "true"){
							console.log('other_paw_r_1',other_paw_r);

							$(".image-preview-error-image").attr('src',"");

							if(other_debug_image_right != ""){
								$(".image-preview-error-image").attr('src',other_debug_image_right);
							}
						}

					// ****bata style ends
					$(".foot-report-image").attr('src','https://shoesizefinder.bata.in/api/assets/img/Rightfoot_Wiremesh.png');
				} else {
					var api_gender_text_left = 'male';
					if(gender_text_left == 'M'){
						api_gender_text_left = 'male';
					}else if(gender_text_left == 'W'){
						api_gender_text_left = 'female';
					}else{
						api_gender_text_left = 'kid';
					}
					$(".fms-bata-gender").text(api_gender_text_left);
					$(".fms-bata-age").text(age_text_left);

					var other_paw = $("#other_paw_left").val();

					if(other_paw == "" || other_paw == 'false'){
						$(".update-warning-btn").css('display','none');
					}else{
							$(".update-warning-btn").css('display','block');

					}
					var other_details_left = $("#other_details_left").val();
						var other_debug_image_left = $("#other_debug_image_left").val();
						if(other_paw == "true"){
							$(".image-preview-error-image").attr('src',"");

							if(other_debug_image_left != ""){
								$(".image-preview-error-image").attr('src',other_debug_image_left);
							}
						}

					//$(".gender-and-age-text").css('display','none');
					//alert(JSON.stringify(left))
					$( ".fms-result-foot-info-left" ).hide();
					$( ".fms-result-foot-top-info" ).show();
					$(".camera_buttons .start-left-foot").show();
					$(".camera_buttons .fms-retake-photo").hide();
					$( ".fms-result-foot-info" ).show();
					$(".fms-foot-type").text('Left foot');
					var len = $("#left_foot_len").val();
					// if(len == 0 || len != ''){
					// 	$(".fms-bata-size").text('0');
					// 	$(".fms-bata-width").text('0');
					// }else{
						$(".fms-bata-size").text(shoesize_value_len_left);
 						$('.custom-shoesize option[value='+shoesize_value_len_left+']').attr('selected','selected');

						//$(".fms-bata-width").text(shoesize_csv_width_left);
						$("#bata_size").val(shoesize_value_len_left);
						$(".fms-bata-size-text").html('Bata size:');
						$("#bata_gender").val(gender_left);
						//$(".fms-bata-gender").text('('+gender_left+')');
					// }
					if(gender_right == 'B' || gender_right == 'G'){
						$(".fms-with-text").text('');
						$(".fms-bata-width").text('');
						$("#bata_width").val('');
					}else{
						$(".fms-with-text").text('Width:');
						$(".fms-bata-width").text(shoesize_csv_width_left);
						$("#bata_width").val(shoesize_csv_width_left);

					}
					$( ".fms-result-foot-outline-left" ).show();
					$( ".fms-result-foot-outline-right" ).hide();
					$( "#fms-left-result-btns" ).show();
					$( "#fms-right-result-btns" ).hide();
					$( ".fms-result-foot-info" ).css( "text-align", "right" );
					$( "span.fms-foot-size" ).text( left.size );
					$( "#fms-foot-length" ).text( left.length + 'mm' );
					$( "#fms-foot-width" ).text( left.width + 'mm' );
					$( "#fms-result-toebox span" ).text( left.toebox );
					$( "#fms-result-ball-girth span" ).text( left.ball_girth );
					$( "#fms-result-instep span" ).text( left.instep_girth );
					
					if( (right.size) && (left.size )){
					$(".fms-retake-left-photo").show();
					$(".fms-left-photo").hide();
					$(".fms-view-right-btn").show();
					$(".fms-view-left-btn").hide();
					}else{
						$(".fms-left-photo").show();
						$(".fms-view-right-btn").hide();
					}
					$(".start-left-foot").hide();
					if(!left.length && !left.width){						
						$(".fms-left-photo").trigger("click");
					}

					$(".fms-retake-left-photo").css({
						'background-color':'#ed1c24',
						'color':'#fff',
					});
					$(".foot-report-image").attr('src','https://shoesizefinder.bata.in/api/assets/img/Leftfoot_Wiremesh.png');

					var left_foot_len = $("#left_foot_len").val();
					if(left_foot_len == 0){
						$(".fms-left-photo").hide();
						$(".fms-result-foot-top-info").hide();
						$(".start-left-foot").show();
						$(".fms-retake-left-photo").hide();
						$(".fms-result-foot-info").hide();
						$(".fms-retake-left-photo").hide();
						$(".custom-shoesize-length-right").hide();
						$(".fms-bata-size").text(' ');
						$//(".fms-bata-size-text").html('<span style="font-size:21px">No data here :(</span>');

						// ****Bata style starts 
						var html = `<div class="measure-feet-txt">
								             <p>You haven’t measured your left foot yet. </p>
								           </div>
								           <div class="know-info">
								             <h5>Did you know?</h5>
								             <p>Many people have different measurements for each foot. Measure both feet to get your exact shoe size. </p>
								           </div>`;
						$(".profile-info").css('display','none');
						$(".foot-profile-img").css('display','none');		           
						$(".left-foot-no-data-div").html(html);
						// ***Bata style ends


						//$(".fms-bata-width").text('0');
						//$(".fms-bata-gender").text(' ');
						var bata_gender = $(".bata_gender").val();
						if(bata_gender == "B" || bata_gender == "G" || bata_gender == ""){
							$(".fms-bata-width").text('');
							$(".fms-with-text").text('');
						}else{
							$(".fms-bata-width").text($(".bata_width").val());
							$(".fms-with-text").text('Width:');
							$(".fms-bata-size-text").html('Bata Size:');
						}	
						$(".start-left-foot").css({
							'background-color':'#ed1c24',
							'color':"#fff",
						});		
						//$(".three-foot-report-button").css('display','none');	
						$(".no-left-foot-buttons").css('display','block');
                        $(".gender-and-age-text").css('display','none');
					}else{
                        $(".gender-and-age-text").css('display','block');
						$(".fms-result-foot-top-info").show();
						$(".start-left-foot").hide();
						$(".fms-retake-left-photo").show();
						$(".fms-result-foot-info").show();
						$(".fms-retake-left-photo").show();
						$(".custom-shoesize-length-right").show();
						var bata_gender = $(".bata_gender").val();

						if(bata_gender == "B" || bata_gender == "G"){
							$(".fms-bata-width").text('');
							$(".fms-with-text").text('');
						}else{
							$(".fms-bata-width").text($(".bata_width").val());
							$(".fms-with-text").text('Width:');
						}				
						$(".fms-bata-size").text($(".bata_size").val());
						//$(".fms-bata-gender").text($(".bata_gender").val());

						// ****bata style starts
							$(".profile-info").css('display','block');
							$(".foot-profile-img").css('display','flex');		           
							$(".left-foot-no-data-div").html(' ');
						    //$(".three-foot-report-button").css('display','block');	
							$(".no-left-foot-buttons").css('display','none');


						// ****bata style ends

					}




				}
				
				
				/*html += '<li><span></span><span>Right</span><span>Left</span></li>';
				html += '<li><span>Foot Size</span><span>'+ right.size +'</span><span>'+ left.size +'</span></li>';
				html += '<li><span>Foot Length</span><span>'+ right.length +'</span><span>'+ left.length +'</span></li>';
				html += '<li><span>Foot Width</span><span>'+ right.width +'</span><span>'+ left.width +'</span></li>';
				html += '<li><span>Toebox Type</span><span>'+ right.type +'</span><span>'+ left.type +'</span></li>';
				html += '<li><span>Toe Angles</span><span>'+ right.angle +'</span><span>'+ left.angle +'</span></li>';*/
				// if($(".fms-result-wrapper").css('display')  == 'none'){
				// 	$("#fms-result .three-foot-report-button").css('display','none');
				// 	$("#fms-result .retake-btns-area").css('display','none');
				// }else{
				// 	$("#fms-result .three-foot-report-button").css('display','block');
				// 	$("#fms-result .retake-btns-area").css('display','block');
				// }
				
				
				$( ".fms-result-wrapper" ).show();
				
				
			} else {
				this.showResult( { "remarks" : "Somthing went wrong please try again." } );
			}
		}
		
		
		
		$(  ".fms-section-container section#fms-result" ).fadeIn();
		$(  ".fms-section-container section#fms-result" ).addClass( "init-active" );
		
		if ( _err ){
			$( ".fms-done-measurements" ).hide(); 
		} else {
			$( ".fms-done-measurements" ).show(); 
		}
	}
	this.noteUserF = function( _msg, _cls, _hide ){
		_cls = _cls + ' show';
		this.noteUser.removeClass( "active error" ).addClass( _cls ).show().html( _msg );
		_hide = typeof _hide == "undefined" ? true : _hide;
		if( _hide ){
			setTimeout( function(){
				self.noteUser.removeClass( 'show' );
			}, 1500 );
		}
	}
	
	
	this.beforePing= function( _action ){
		
	};
	
	this.enableFullScreen = function() {
		var elem = document.body;
		if ( elem.requestFullscreen ) {
			elem.requestFullscreen();
		} else if ( elem.mozRequestFullScreen ) { /* Firefox */
			elem.mozRequestFullScreen();
		} else if ( elem.webkitRequestFullscreen ) { /* Chrome, Safari & Opera */
			elem.webkitRequestFullscreen();
		} else if ( elem.msRequestFullscreen ) { /* IE/Edge */
			elem.msRequestFullscreen();
		}
	}
	
	this.sizeOption = function( _type ){
		var start = 0, end = 0, html = "";
		if( _type == "UK" || _type == "US" ){
			start = 1;
			end   = 20;
		} else {
			start = 15;
			end   = 60;
		}
		
		for( var i = start; i <= end; i++  ){
			html += '<option value="'+i+'">'+i+'</option>';
		}
		
		return html;
	};

	this.fbcheckLoginState = function() {
		FB.login(function(response) {
			  if( response.status == "connected" && 
				  typeof response.authResponse != "undefined" &&
				  typeof response.authResponse.userID != "undefined" ){
				  self.fbGetUserInfo( response.authResponse.userID );
			  }
		  }, {scope: 'email'});
	};
	
	this.fbGetUserInfo = function( _uid ){
		FB.api(
		    "/"+_uid+"/?fields=id,name,email,gender",
		    function (response) {
		      if ( response && !response.error ) {
		        self.fbUserInfo( response );
		      }
		    }
		);
	};
	
	$(document).on('keyup','#signin_email',function(){
		var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
		var value = $(this).val();
		if(value != ''){
			$("#signupEmailError").text(' ');
			if (testEmail.test(value)){
				$("#signupEmailError").text(' ');
			}else{
				// Do whatever if it fails.
				$("#signupEmailError").text('Please enter valid email format.');

			}
		}else{
			$("#signupEmailError").text('Please fill the email first.');
		}
	});
	this.fmsLogin = function (_data) {
		var signin_email= $('#signin_email').val();
		if(signin_email != ''){
			var email_name   = signin_email.substring(0, signin_email.lastIndexOf("@"));
		var _data = {'name' : 'Findmeashoe', 'email': signin_email, 'login_provider' : 'google'};
		log_in_provider = _data.login_provider;
		$("#user_email_custom").val(signin_email);
		self.ajax.ping("set_user_login", {
			fms_is_loged_in: true,
			login_email: _data.email,
			login_name: _data.email,
			login_provider: _data.login_provider
		}, "POST", $("[name=requestUrl]").val());
		fms.noteUserF('<i class="fa fa-cog fa-spin fa-3x fa-fw"></i> Give us moment, we are retrieving your data...', "active");
			email_name = email_name.slice(0, 9)+'..';
			//console.log(email_name,'em');
			$(".fms-first-and-last-name").val(email_name);
			$(".camera-user-name").text(email_name);
			$(".fms-user-email").val(_data.email);
		var user_type = $("#user_type").val();
		if(user_type == 'new_user'){
		}
		//fms.setHeightForSections();
		}else{
			$("#signupEmailError").text('Please fill the email first.');
		}
	}
	
	this.fbUserInfo = function( _response ){
		self.fmsLogin( { name : _response.name, email : _response.email, login_provider : "fb" } );
	}
	
	this.googleOnSignIn = function( googleUser ) {
		  var profile = googleUser.getBasicProfile();
		  self.fmsLogin( { name : profile.getName(), email : profile.getEmail(), login_provider : "google" } );
	};
	
	// this.getPaperType = function( SizeSystem, Geo, Size ){
	// 	var PaperType = null;
 //        if ( SizeSystem == "UK" && Geo == "ROW" ) {
 //            if ( Size >= 12 ) {
 //                PaperType = "3";
 //            } else {
 //                PaperType = "0";
 //            }
 //        } else if( SizeSystem  == "EU" && Geo  == "ROW" ) {
 //            if ( Size >= 46 ) {
 //                PaperType= "3";
 //            } else {
 //                PaperType = "0";
 //            }
 //        } else if( SizeSystem  == "US" && Geo  == "ROW" ) {
 //            if ( Size >= 13 ) {
 //                PaperType= "3";
 //            } else {
 //                PaperType = "0";
 //            }
 //        } else if( SizeSystem == "US" && Geo == "US" ) {
 //            if ( Size >= 11 ) {
 //                PaperType = "4";
 //            } else {
 //                PaperType = "1";
 //            }
 //        } else if( SizeSystem == "UK" && Geo == "US" ) {
 //            if ( Size >= 10 ) {
 //                PaperType = "4";
 //            } else {
 //                PaperType = "1";
 //            }
 //        } else if( SizeSystem  ==  "EU" && Geo  ==  "US" ) {
 //            if ( Size >= 44 ) {
 //                PaperType = "4";
 //            } else {
 //                PaperType = "1";
 //            }
 //        }
        
 //        return PaperType;
	// }

	this.updateShoeSizeVal = function(left="") {	
		if(left == '') {	
			var gender_val = $("[name=gender]").val();	
		} else {	
			var gender_val = $("[name=confirm-gender]:checked").val();	
		}	
		var size_system_val = $(".fms-SizeSystem").val();	
		if(left == "") {	
			var size_check_val = $(".confirm-shoesize:checked").val();	
		} else {	
			var size_check_val = $(".confirm-shoesize-left:checked").val();	
		}	
		// console.log(gender_val,size_system_val,size_check_val);	
		var Geo = "ROW";	
		if( gender_val == 'M') {		
			if (size_system_val == "UK" && Geo == "ROW") {	
				if(size_check_val == 'yes') {	
					$(".shoesize").val(13);	
					$('.change-sheet-multiple').html('sheets');	
				} else {	
					$(".shoesize").val(9);	
					$('.change-sheet-multiple').html('sheet');	
				}	
			// } else if (size_system_val == "EU" && Geo == "ROW") {	
			// 	if(size_check_val == 'yes') {	
			// 		$(".shoesize").val(47);	
			// 	} else {	
			// 		$(".shoesize").val(9);	
			// 	}	
			// } else if (size_system_val == "US" && Geo == "ROW") {	
			// 	if(size_check_val == 'yes') {	
			// 		$(".shoesize").val(16);	
			// 	} else {	
			// 		$(".shoesize").val(9);	
			// 	}	
			}	
		} else if(gender_val == 'W') {	
			if (size_system_val == "UK" && Geo == "ROW") {	
				if(size_check_val == 'yes') {	
					$(".shoesize").val(13);	
					$('.change-sheet-multiple').html('sheets');	
				} else {	
					$(".shoesize").val(9);	
					$('.change-sheet-multiple').html('sheet');	
				}	
			// } else if (size_system_val == "EU" && Geo == "ROW") {	
			// 	if(size_check_val == 'yes') {	
			// 		$(".shoesize").val(47);	
			// 	} else {	
			// 		$(".shoesize").val(9);	
			// 	}	
			// } else if (size_system_val == "US" && Geo == "ROW") {	
			// 	if(size_check_val == 'yes') {	
			// 		$(".shoesize").val(16);	
			// 	} else {	
			// 		$(".shoesize").val(9);	
			// 	}	
			}	
		} else {	
			if (size_system_val == "UK" && Geo == "ROW") {	
				if(size_check_val == 'yes') {	
					$(".shoesize").val(13);	
					$('.change-sheet-multiple').html('sheet');	
				} else {	
					$(".shoesize").val(9);	
					$('.change-sheet-multiple').html('sheet');	
				}	
			// } else if (size_system_val == "EU" && Geo == "ROW") {	
			// 	if(size_check_val == 'yes') {	
			// 		$(".shoesize").val(47);	
			// 	} else {	
			// 		$(".shoesize").val(9);	
			// 	}	
			// } else if (size_system_val == "US" && Geo == "ROW") {	
			// 	if(size_check_val == 'yes') {	
			// 		$(".shoesize").val(16);	
			// 	} else {	
			// 		$(".shoesize").val(9);	
			// 	}	
			}	
		}	
	}

	this.getPaperType = function (SizeSystem, Geo, Size) {
		//alert(SizeSystem+" "+Geo+" "+Size);
		var PaperType = null;
		var gender = $("[name=gender]").val();
		var foot_type = $('[name="foot_type"]').val();
		//console.log('g',gender);
		// if (SizeSystem == "UK" && Geo == "ROW") {
		// 	if (Size >= 12) {
		// 		PaperType = "3";
		// 	} else {
		// 		PaperType = "0";
		// 	}
		// } else if (SizeSystem == "EU" && Geo == "ROW") {
		// 	if (Size >= 46) {
		// 		PaperType = "3";
		// 	} else {
		// 		PaperType = "0";
		// 	}
		// } else if (SizeSystem == "US" && Geo == "ROW") {
		// 	if (Size >= 13) {
		// 		PaperType = "3";
		// 	} else {
		// 		PaperType = "0";
		// 	}
		// } else if (SizeSystem == "US" && Geo == "US") {
		// 	if (Size >= 11) {
		// 		PaperType = "4";
		// 	} else {
		// 		PaperType = "1";
		// 	}
		// } else if (SizeSystem == "UK" && Geo == "US") {
		// 	if (Size >= 10) {
		// 		PaperType = "4";
		// 	} else {
		// 		PaperType = "1";
		// 	}
		// } else if (SizeSystem == "EU" && Geo == "US") {
		// 	if (Size >= 44) {
		// 		PaperType = "4";
		// 	} else {
		// 		PaperType = "1";
		// 	}
		// }
		var user_status = $("#user_type").val();
		var other_right = $("#other_details_right").val();
		var other_left = $("#other_details_left").val();
		var right_set_paper = $("#other_paper_type_right").val();
		var left_set_paper = $("#other_paper_type_left").val();
		var foot_type = $('[name="foot_type"]').val();
		var confirm_screen_status = $("#confirm_screen_status").val();
		if(user_status == "new_user" || confirm_screen_status == "yes"){
			if( gender == 'M'){	
				if (SizeSystem == "US" && Geo == "US") {
					if (Size >= 11) {
						PaperType = "4";
					} else {
						PaperType = "1";
					}
				} else if (SizeSystem == "UK" && Geo == "US") {
					if (Size >= 10) {
						PaperType = "4";
					} else {
						PaperType = "1";
					}
				} else if (SizeSystem == "EU" && Geo == "US") {
					if (Size >= 44) {
						PaperType = "4";
					} else {
						PaperType = "1";
					}
				}else if (SizeSystem == "UK" && Geo == "ROW") {
						if (Size >= 12) {
							PaperType = "3";
						} else {
							PaperType = "0";
						}
				} else if (SizeSystem == "EU" && Geo == "ROW") {
					if (Size >= 46) {
						PaperType = "3";
					} else {
						PaperType = "0";
					}
				} else if (SizeSystem == "US" && Geo == "ROW") {
					if (Size >= 15) {
						PaperType = "3";
					} else {
						PaperType = "0";
					}
				}
			}else if(gender == 'W'){
				if (SizeSystem == "US" && Geo == "US") {
					if (Size >= 12) {
						PaperType = "4";
					} else {
						PaperType = "1";
					}
				} else if (SizeSystem == "UK" && Geo == "US") {
					if (Size >= 10) {
						PaperType = "4";
					} else {
						PaperType = "1";
					}
				} else if (SizeSystem == "EU" && Geo == "US") {
					if (Size >= 44) {
						PaperType = "4";
					} else {
						PaperType = "1";
					}
				}else if (SizeSystem == "UK" && Geo == "ROW") {
						if (Size >= 12) {
							PaperType = "3";
						} else {
							PaperType = "0";
						}
				} else if (SizeSystem == "EU" && Geo == "ROW") {
					if (Size >= 46) {
						PaperType = "3";
					} else {
						PaperType = "0";
					}
				} else if (SizeSystem == "US" && Geo == "ROW") {
					if (Size >= 15) {
						PaperType = "3";
					} else {
						PaperType = "0";
					}
				}
			}else{
				if (SizeSystem == "US" && Geo == "US") {
					if (Size >= 11) {
						PaperType = "1";
					} else {
						PaperType = "1";
					}
				} else if (SizeSystem == "UK" && Geo == "US") {
					if (Size >= 10) {
						PaperType = "1";
					} else {
						PaperType = "1";
					}
				} else if (SizeSystem == "EU" && Geo == "US") {
					if (Size >= 44) {
						PaperType = "1";
					} else {
						PaperType = "1";
					}
				}else if (SizeSystem == "UK" && Geo == "ROW") {
						if (Size >= 12) {
							PaperType = "0";
						} else {
							PaperType = "0";
						}
				} else if (SizeSystem == "EU" && Geo == "ROW") {
					if (Size >= 46) {
						PaperType = "0";
					} else {
						PaperType = "0";
					}
				} else if (SizeSystem == "US" && Geo == "ROW") {
					if (Size >= 15) {
						PaperType = "0";
					} else {
						PaperType = "0";
					}
				}
			}
		}else{
			if(other_right == 'not_empty' && other_left == "empty"){
				PaperType = right_set_paper;
			}else if(other_right == 'not_empty' && other_left == "not_empty"){
				if(foot_type == 0){
					PaperType = right_set_paper;
				}else{
					PaperType = left_set_paper;
				}
			}else if(other_right == 'empty' && other_left == "empty"){
				//if no set api for user
					if( gender == 'M'){	
						if (SizeSystem == "US" && Geo == "US") {
							if (Size >= 11) {
								PaperType = "4";
							} else {
								PaperType = "1";
							}
						} else if (SizeSystem == "UK" && Geo == "US") {
							if (Size >= 10) {
								PaperType = "4";
							} else {
								PaperType = "1";
							}
						} else if (SizeSystem == "EU" && Geo == "US") {
							if (Size >= 44) {
								PaperType = "4";
							} else {
								PaperType = "1";
							}
						}else if (SizeSystem == "UK" && Geo == "ROW") {
								if (Size >= 12) {
									PaperType = "3";
								} else {
									PaperType = "0";
								}
						} else if (SizeSystem == "EU" && Geo == "ROW") {
							if (Size >= 46) {
								PaperType = "3";
							} else {
								PaperType = "0";
							}
						} else if (SizeSystem == "US" && Geo == "ROW") {
							if (Size >= 15) {
								PaperType = "3";
							} else {
								PaperType = "0";
							}
						}
					}else if(gender == 'W'){
						if (SizeSystem == "US" && Geo == "US") {
							if (Size >= 12) {
								PaperType = "4";
							} else {
								PaperType = "1";
							}
						} else if (SizeSystem == "UK" && Geo == "US") {
							if (Size >= 10) {
								PaperType = "4";
							} else {
								PaperType = "1";
							}
						} else if (SizeSystem == "EU" && Geo == "US") {
							if (Size >= 44) {
								PaperType = "4";
							} else {
								PaperType = "1";
							}
						}else if (SizeSystem == "UK" && Geo == "ROW") {
								if (Size >= 12) {
									PaperType = "3";
								} else {
									PaperType = "0";
								}
						} else if (SizeSystem == "EU" && Geo == "ROW") {
							if (Size >= 46) {
								PaperType = "3";
							} else {
								PaperType = "0";
							}
						} else if (SizeSystem == "US" && Geo == "ROW") {
							if (Size >= 15) {
								PaperType = "3";
							} else {
								PaperType = "0";
							}
						}
					}else{
						if (SizeSystem == "US" && Geo == "US") {
							if (Size >= 11) {
								PaperType = "1";
							} else {
								PaperType = "1";
							}
						} else if (SizeSystem == "UK" && Geo == "US") {
							if (Size >= 10) {
								PaperType = "1";
							} else {
								PaperType = "1";
							}
						} else if (SizeSystem == "EU" && Geo == "US") {
							if (Size >= 44) {
								PaperType = "1";
							} else {
								PaperType = "1";
							}
						}else if (SizeSystem == "UK" && Geo == "ROW") {
								if (Size >= 12) {
									PaperType = "0";
								} else {
									PaperType = "0";
								}
						} else if (SizeSystem == "EU" && Geo == "ROW") {
							if (Size >= 46) {
								PaperType = "0";
							} else {
								PaperType = "0";
							}
						} else if (SizeSystem == "US" && Geo == "ROW") {
							if (Size >= 15) {
								PaperType = "0";
							} else {
								PaperType = "0";
							}
						}
					}


			}
		}

		


		return PaperType;
	}
	this.widgetSizeStand = function(){
		var uk_list = [ 138, 68,139 ];
		if( uk_list.indexOf( parseInt( fms.cateParentId ) ) != -1 ){
			return 'eu';
		}
		return 'US';
	}
	
	this.fmsRecomCallBack = function( _data ){
			if (typeof(FmasUW) !== "undefined") {
				FmasUW.MainController.initWidget({
					parent: _data.parent_elem, /* Optional! Default is
				'fmas-parent'. This would be div ID, where the widget button should be
				visible */
					orgId: '37', /* Specified by FMAS */
					name: _data.prod_name, /* HTML escaped product
				name */
					skuId: _data.prod_id, /* Product id on
				retailer site, to be configured in FMAS */
					sizeStandard: fms.widgetSizeStand(), /* Optional! Default
				is 'US'. Format in which the output size is expected. Possible values: eu,
				us, uk, ind */
					customerEmailId: _data.cus_email, /*
				Customer's email-id to be registed in FMAS, null for not-logged-in user */
					gender: _data.gender, /* Customer's gender. Default is
				NULL. Possible values: M, W */
					isEnvironmentMobileApp: false, /* Optional! Default
				is FALSE */
					urls: {
						redirectUrlLoginPage:
							'', /* Optional! Passing this value
				will enable the feature */
					},
					sendInvite: {
						enable: true, /* Optional! Default is FALSE
						 */
						url: null, /* Optional! Default is NULL.
				Passing this value will enable the feature. Must accept user email in end
				of the URL */
						authKey:
							'', /* Optional! Default is
				NULL. Will be in action in absense of url. Specified by FMAS, in case
				emails to be sent via FMAS */
							method: 'GET', /* Optional! Default is GET */
							sendOnLoad: false, /* Optional! Default is
				FALSE */
							leftBlockText: '', /* Optional! Default is given as value */
					},
					config: {
						noFitCeilingFitQualityScore: 0, /* Optional!
				Default is given as value */
						bottomOfScaleFitQualityScore: 0, /* Optional!
				Default is given as value */
                        apiHostingEnvironment: 'custom',
                        widgetHostingAssetsPath: 'assets-g-20190228',
                        widgetHostingCodePath: 'assets-g-20190228/web',
						footProfile: {
							enable: true, /* Optional! Default is
				FALSE */
						},
						widthInfo: {
							targetFootwear: {
								enable: true, /* Optional!
				Default is TRUE */
							},
						},
					},
					callback: fms.callbackFunctionOnFmasWidgetInit,
				}); /* end: FmasUW.MainController.initWidget */
			} /* end: if (typeof(FmasUW) !== "undefined") */
		}
		
		this.callbackFunctionOnFmasWidgetInit = function( res ) {
			fms.callRecomentation();
		}
}
