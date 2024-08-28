/**
 * @author: Paranjothi G
 * version: 1.0
 * 
 **/
	var ajax_req = function( _c ){
			var self  = this;
			this.param = {};
			this.ajaxFlg = false;	
			this.action = "";
			this.cont = _c;
			// Ajax request start
			this.ping = function( _action, _param, _method, _url, _is_fms ){
				if( this.ajaxFlg == undefined ){
					return;
				}
				this.action = _action;
				_method = typeof _method == "undefined" ? "POST" : _method;
				_is_fms = typeof _is_fms == 'undefined' ? true : _is_fms;
				// Check already any ajax request processing
				if( !this.ajaxFlg ){
					this.ajaxFlg = true;
					_param = {
						url: _url,
						type: _method,
						data: _param,
						
						dataType: "json",
						
						beforeSend: function(){
							if( typeof self.cont.beforePing != "undefined" ){
								self.cont.beforePing( self.action, _param );
							}
						},
						success: function ( data, status, xhr ) {   // success callback function
							self.ajaxFlg = false;
							if( typeof data != 'undefined' ){
								self.cont.ajaxReponse( self.action, data );
							} else {
								self.cont.ajaxReponse( self.action, { status : false, msg : "Something went wrong please try again." } );
							}
					    },
					    
					    error: function ( jqXhr, textStatus, errorMessage ) { // error callback 
					    	self.ajaxFlg = false;
					    	if( typeof self.cont.ajaxReponse != "undefined" ){
					    		self.cont.ajaxReponse( self.action, { status : false, msg : errorMessage } );
							}
					    },
					     
					    complete : function(){
					    	self.ajaxFlg = false;
					    }
					}
					
					if( _is_fms ){
						
						_param_2 = { ContentType : "multipart/form-data;", async : true, cache : false, crossDomain : true, contentType : false, processData : false, timeout : 250000, headers : {
				              "cache-control": "no-cache"
				        } };
				        jQuery.extend( _param, _param_2 );
					}
					
					$.ajax( _param );
				} else {
					
				}
			};
			
			
		};
	
	