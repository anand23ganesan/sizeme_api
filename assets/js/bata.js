$(document).ready(function(){

	$(".selected-form-age").on('change',function(){
		var value = $(this).val();
		$(".request-form-age").val(value);
		$(".fms-age").val(value);

	});

	$(".selected-shoesize").on('click',function(){
		var value = $(this).val();
		$(".request-systemsize").val(value);
		$(".fms-SizeSystem").val(value);
	});

	$(".go-back-second").on('click',function(){
		$("#fms-user-ins-page2").hide();
		$("#fms-user-ins-page1").show();
		$("#fms-user-ins-page3").hide();
	});
	$(".go-back-third").on('click',function(){
		$("#fms-user-ins-page2").show();
		$("#fms-user-ins-page1").hide();
		$("#fms-user-ins-page3").hide();
	});

	$(".go-back-second-left").on('click',function(){
		$("#fms-user-ins-left-page2").hide();
		$("#fms-user-ins-left-page1").show();
		$("#fms-user-ins-left-page3").hide();
	});
	$(".go-back-third-left").on('click',function(){
		$("#fms-user-ins-left-page2").show();
		$("#fms-user-ins-left-page1").hide();
		$("#fms-user-ins-left-page3").hide();
	});

	$(".bata-close-application").on('click',function(){
		 window.location.href = 'https://www.bata.in/';
	})

	$(".selected-shoesize-confirm").on('click',function(){
		var value = $(this).val();
		$(".custom-system-size").val(value);

	})

	$(".gender-select").on('click',function(){
		var value = $(this).val();
		$(".custom-gender-input").val(value);
	});

	// API scripts  

	$(document).on('change','.fms-shoesize',function(){
		var val = $(this).val();
		$(".shoesize").val(val);

	});

});
