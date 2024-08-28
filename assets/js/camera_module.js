/**
 * @author: Find me a shoe
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
		var deviceinfo = deviceModule.init();
		// console.log(deviceinfo);
		// console.log(deviceinfo.os.name, deviceinfo.os.version);
		// alert(deviceinfo.os.name); alert(deviceinfo.os.version);
		var supports = navigator.mediaDevices.getSupportedConstraints();
		if(!supports["width"] || !supports["height"]) {
			self.context.showError( "Your browser not accepting full hd image capture." );
		}
		const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;

		if (SUPPORTS_MEDIA_DEVICES) {
	  
		    navigator.mediaDevices.enumerateDevices().then(devices => {
		  
		    const cameras = devices.filter((device) => device.kind === 'videoinput');

			    if (cameras.length === 0) {
			     self.context.showError( "Your browser not accepting camera feature." );
			    }
			    const camera = cameras[cameras.length - 1];
				// set video contrain
				if( this.getMobileOperatingSystem() != "iOS" && this.getMobileOperatingSystem() != "Windows" ){
					console.log("3");
					// this.constraints 		= {   video: { facingMode: "environment",
					// 	width: { min: 1024, ideal: 1280, max: 1920 },
					// 	height: { min: 776, ideal: 720, max: 1080 },
					// 	flash: true,
					// 	deviceId: camera.deviceId,
					// },
					// fillLightMode: "auto"
					// };
					this.constraints = {
						video: {
							video:{},
							deviceId: camera.deviceId,
							facingMode: { exact: "environment" },
							height: {ideal: 1080},
							width: {ideal: 1920},
							flash: true
						}
					}
				} else {

					if(deviceinfo.os.version >= 14) {
						this.constraints = {
							video: {
								facingMode: { exact: "environment" },
								width: { min: 1280,  max: 1280 },
								height: { min: 960, max: 960 },
								// This configuration has image processing problems
								//width: { min: 480, max: 480 },
	    						//height: { min: 330, max: 330},
								flash: true
							},
							fillLightMode: "auto"
						};
					} else {
						this.constraints = {   
							video: { 
								facingMode: { exact: "environment" },
								// This configuration works but needs testing
								//width: { min: 320, ideal: 1280, max: 1280 },
								//height: { min: 240, ideal: 960, max: 1280 },
								width: { min: 320, ideal: 640, max: 1280 },
								height: { min: 240, ideal: 480, max: 1280 },
								flash: true
							},
							fillLightMode: "auto"
						};
					}
					// console.log("screen.width: ",screen.width, "screen.height: ",screen.height, "window.height: ", window.height, "window.width: ",window.width);
					// this.constraints = {
					// 	video: {
					// 		facingMode: { exact: "environment" },
					// 		width: { min: 480, max: 480 },
    	// 					height: { min: 330, max: 330},
					// 		flash: true
					// 	},
					// 	fillLightMode: "auto"
					// };
				}
				// open camera video streaming 
				if( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {					
					navigator.mediaDevices.getUserMedia( this.constraints ).then( _stream =>  {
						// console.log("stream: ",_stream);
						// alert(_stream.active);
						self.isVideoOpen = true;
						self.livestream = _stream;
						self.video.srcObject = self.livestream;
						self.video.play();
						// console.log("self.video: ",self.video);
						self.streamTrack = self.livestream.getVideoTracks()[0];
						// console.log("self.streamTrack: ",self.streamTrack);
						self.imageCapture = new ImageCapture( self.streamTrack );
						// console.log("self.imageCapture: ",self.imageCapture);
						self.context.showVideo();
						// init flash
						self.enableTourch();
						// alert("camera enabled");




					 // 	$.alert({
						//     title: '',
						//     content: '<ul class="alert-ul"><li>Please loosely match the rectangle outline to the paper edges.</li><li>Make sure your foot is in focus & well lit.</li><li></li></ul>',
						//     icon: false,
						//     animation: 'scale',
						//     closeAnimation: 'scale',
						//     buttons: {
						//         okay: {
						//             text: 'Close',
						//             btnClass: 'grey-alert-button'
						//         }
						//     }
						// });

						$.alert({
						    title: '',
						    content: '<ol class="alert-ul"><li>Make sure your foot is within the red outline.</li><li>Loosely align the red rectangle outline to the A4 sheet corners.</li><li>Keep the camera focused on your foot.</li></ul>',
						    icon: false,
						    animation: 'scale',
						    closeAnimation: 'scale',
						    buttons: {
						        okay: {
		                            text: '<img src="assets/images/camera-icon.png" class="camera-btn-custom">Click now',
		                            btnClass: 'red-btn'
		                        }
						    }
						});

						
					}).catch( error => { 
						self.context.showError( "Your browser not accepting camera feature." );
					} );
				}
		 	});
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

	this.disableTourch = function(){
		if( typeof self.streamTrack.getCapabilities != "undefined" ){
			var cab = self.streamTrack.getCapabilities();
			this.imageWidth = cab.width.max > 1920 ? 1920 : cab.width.max;
			this.imageHeight = cab.height.max > 1080 ? 1080 : cab.height.max;
		}
		
		self.imageCapture.getPhotoCapabilities().then(() => {
			if( typeof self.streamTrack.applyConstraints != "undefined" ){
				self.streamTrack.applyConstraints( {
					advanced: [ { torch : false },
						 { width: self.imageWidth, height: self.imageHeight }
					]
				});
			}
			self.imageCapture.setOptions({
		        fillLightMode: "off", 
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

		// disable flash
		//alert("Using Canvas -- Disabling Torch !!")
		self.disableTourch();
		
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

				  // disable flash
				  //alert("Using Blob -- Disabling Torch !!")
				  //self.disableTourch();
				  
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
		
		$("#current_page").val('preview_screen');
		//$("#for_rotate_check").val('normal');
		// After injecting image url into image element show it 
		this.imgElem.parent().show();
	  	//alert("After capturing -- Disabling Torch !!")
  		//self.disableTourch();

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
