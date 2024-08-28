
  var error_codes = function( _c ){
	  /* */
	  var self 				= this;
	
	  
	 
	this.fetchErrorCodes	   = function(error_code,sub_code,papertype){
		console.log('error-codes');
		var return_status = '';
		var errorMsg = "",
			remark = "",
            err_img = "";
		$(".csv_errors").each(function(){
			var status = $(this).attr('data-status');
			var code = $(this).attr('data-code');
			var csv_sub_code = $(this).attr('data-subcode');
			var numString = csv_sub_code.toString();
    		var csv_code_two = numString.padStart(2, "0");

			var csv_papertype = $(this).attr('data-paper');
			code = "ERR_"+code;
			if(code == error_code){
					console.log('code',code);
					console.log('error_code',error_code);
				if(status == 'success'){
					return_status = 'success';
				}else{
					return_status = 'error';
					console.log('csv_code_two',csv_code_two);
					console.log('sub_code',sub_code);	
					if(csv_code_two == sub_code){
						console.log('papertype',papertype);
						console.log('csv_papertype',csv_papertype);		
						if(papertype == csv_papertype){	
							console.log('csv_sub_code',csv_sub_code);
							console.log('sub_code',sub_code);
							errorMsg = $(this).attr('data-error-msg');
							remark =  $(this).attr('data-remarks');
							err_img =  $(this).attr('data-img');
						}else if(csv_papertype == 'both'){
							errorMsg = $(this).attr('data-error-msg');
							remark =  $(this).attr('data-remarks');
							err_img =  $(this).attr('data-img');
						}else{
							errorMsg = $(this).attr('data-error-msg');
							remark =  $(this).attr('data-remarks');
							err_img =  $(this).attr('data-img');
						}
					}
				}
			}
		});
		if(return_status == 'success'){
			return {'status':return_status}
		}else{	
			var err = errorMsg.replace(/-/g, ' ');
			var re = remark.replace(/-/g, ' ');

			return {'status':return_status,'errorMsg':err,'remark':re,'err_img':err_img,'error_code':error_code};
		}

	};
	

	

	  
  }
  