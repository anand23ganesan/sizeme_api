/**
 * @author: Paranjothi G
 * 
 */

  var takePickture = function( _context, _video, _img, _canvas ){
	  /* */
	  var self 				= this;
	  /* */
	  this.context			= _context;
	  /* */
	  this.canvasElem 		= _canvas;
	  /* */
	  this.canvas	  		= this.canvasElem[0];
	  /* */
	  this.videoElem  		= _video;
	  /* */
	  this.video 			= this.videoElem[0];
	  /* */
	  this.imgElem    		= _img;
	  /* */
	  this.imageCapture 	= null;
	  /* */
	  this.isVideoOpen 		= false;
	  /* */
	  this.imgaeFile 		= "";
	  /* */
	  this.reader 			= null;
	  /* */
	  this.constraints 		= null;
	 
	  /* */
	  this.streamTrack 		= null;
	  /* */
	  this.livestream 		= null;
	  /* */
	  this.baseData			= "";
	  /* */
	  this.imageWidth		= 1920;
	  /* */
	  this.imageHeight		= 1080;
	  /* */
	  this.tourchAvailable = false;
	  
	 
	this.kickCamera	   = function(){
		
		var supports = navigator.mediaDevices.getSupportedConstraints();
		if(!supports["width"] || !supports["height"]) {
			self.context.showError( "Your browser not accepting full hd image capture." );
		}
		
		// set video contrain
		if( this.getMobileOperatingSystem() != "iOS" && this.getMobileOperatingSystem() != "Windows" ){
			this.constraints 		= {   video: { facingMode: "environment",
				width: { min: 1024, ideal: 1280, max: 1920 },
				height: { min: 776, ideal: 720, max: 1080 },
				flash: true
			},
			fillLightMode: "auto"
			};
		} else {
			
			this.constraints 		= {   video: { facingMode: "environment",
				width: { min: 320, ideal: 640, max: 1280 },
				height: { min: 240, ideal: 480, max: 1280 },
				flash: true
			},
			fillLightMode: "auto"
			};
		}
		
		// open camera video streaming 
		if( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {
			
			navigator.mediaDevices.getUserMedia( this.constraints ).then( _stream =>  {
				
				self.isVideoOpen = true;
				
				self.livestream = _stream;
				
				self.video.srcObject = self.livestream;
				
				self.video.play();
				
				self.streamTrack = self.livestream.getVideoTracks()[0];
				
				self.imageCapture = new ImageCapture( self.streamTrack );

				self.context.showVideo();
				// init flash
				self.enableTourch();
				
				//alert( 'Please make sure the heel and paper are touching the wall edge' );
			 	$.alert({
                    title: '',
                    content: '<ul class="alert-ul"><li>Loosely align the rectangle outline to the paper corners.</li><li>Keep the camera focus on your foot.</li></ul>',
                    icon: false,
                    animation: 'scale',
                    closeAnimation: 'scale',
                    buttons: {
                        okay: {
                            text: '<img src="assets/img/retake.png">Click now',
                            btnClass: 'grey-alert-button'
                        }
                    }
                });
				
			}).catch( error => { 
				self.context.showError( "Your browser not accepting camera feature." );
			} );
		}
		
	};
	
	
	this.enableTourch = function(){
		
		if( typeof self.streamTrack.getCapabilities != "undefined" ){
			var cab = self.streamTrack.getCapabilities();
			this.imageWidth = cab.width.max > 1920 ? 1920 : cab.width.max;
			this.imageHeight = cab.height.max > 1080 ? 1080 : cab.height.max;
		}
		
		self.imageCapture.getPhotoCapabilities().then(() => {
			if( typeof self.streamTrack.applyConstraints != "undefined" ){
				self.streamTrack.applyConstraints( {
					advanced: [ { torch : true },
						 { width: self.imageWidth, height: self.imageHeight }
					]
				});
			}
			self.imageCapture.setOptions({
		        fillLightMode: "auto", 
		        focusMode: "continuous"
		    });
		});
		
		
	}
	  
	// Draw image from video streaming using canvas
	this.drawCanvas = function( _img ) {
		this.canvas.width = 1920;
		this.canvas.height = 1080;
		let ratio  = Math.min( this.canvas.width / _img.width, this.canvas.height / _img.height);
		let x = ( this.canvas.width - _img.width * ratio ) / 2;
		let y = ( this.canvas.height - _img.height * ratio ) / 2;
		this.canvas.getContext( '2d' ).clearRect( 0, 0, this.canvas.width, this.canvas.height );
		this.canvas.getContext( '2d' ).drawImage( _img, 0, 0, _img.width, _img.height, x, y, _img.width * ratio, _img.height * ratio );
		this.imgElem.attr( "src", this.canvas.toDataURL() );
		
		// To stop video sreaming
		  self.video.pause();
		  self.video.removeAttribute( 'src' );
		  self.video.load();
		  // Stop real stream
		  self.streamTrack.stop();
		
		return "";
	}
	
	// Draw imgae from video streaming using blob
	this.drawAsBlob = function( _blob ){
		this.baseData = "";
		this.imgElem.attr( "src",  URL.createObjectURL( _blob ) );
		this.imgaeFile = new File( [ _blob ], "tv.jpg", { type: "image/jpeg", lastModified: Date.now()} );
		this.getFile_Base64( this.imgaeFile ).then(
			  _baseData => {
				  self.baseData = _baseData;
				  // To stop video sreaming
				  self.video.pause();
				  self.video.removeAttribute( 'src' );
				  self.video.load();
				  // Stop real stream
				  self.streamTrack.stop();
				  
				  self.context.capturedImage( self.baseData );
			  }
		);
	} 
	
	// To capture image from video stream by type
	this.capture = function( _type ){
		this.returnData = "";
		this.isVideoOpen = false;
		this.videoElem.hide();
		this.canvasElem.hide();
		
		
		// check the capture image type
		if( _type == "blob" ){
			this.imageCapture.takePhoto( { imageWidth : self.imageWidth, imageHeight : self.imageHeight } ).then( _blob => {
				this.returnData = this.drawAsBlob( _blob );
			});
		} else {
			this.imageCapture.takePhoto( { imageWidth : 1920, imageHeight : 1080 } ) .then( _blob => {
				createImageBitmap( _blob )
			}).then( _imageBitmap => {
				this.returnData = self.drawCanvas( _imageBitmap );
			}).catch( error => alert( error ) );
		}
		
		// After injecting image url into image element show it 
		this.imgElem.parent().show();
		

		return this.returnData;
	}
	
	// Blob into base 64 converter
	this.getFile_Base64 = function( _file ) {
		return new Promise((resolve, reject) => {
			self.reader = new FileReader();
			self.reader.readAsDataURL( _file );
			self.reader.onload = () => resolve( self.reader.result );
			self.reader.onerror = error => reject(error);
		});
	}
	
	
	this.getMobileOperatingSystem = function() {

		var userAgent = navigator.userAgent || navigator.vendor || window.opera;
		// Windows Phone must come first because its UA also contains "Android"
		if (/windows phone/i.test(userAgent)) {
			return "Windows Phone";
		}
		
		if (/windows/i.test(userAgent)) {
			return "Windows";
		}

		if (/android/i.test(userAgent)) {
			return "Android";
		}

		// iOS detection 
		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			return "iOS";
		}
		
		return "unknown";

	};
	
	
	  
  }
  