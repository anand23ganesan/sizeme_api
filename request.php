<?php 

/**
 * @author : Find me a shoe 
 * Target  : sending curl request to image server and user server
 */

// To check if user or size request
if( isset( $_REQUEST ) &&  isset( $_REQUEST['topView'] ) ){
    try{
        $info =  $_REQUEST['topView'];
        // un used for future
        // $target = file_get_contents( 'image_text/TV.txt' );
        // move_uploaded_file( $_FILES['topView']['tmp_name'], $target );
        $geo_location_state = "";
        if(!empty($_REQUEST['geo_location_state'])){
            $geo_location_state = $_REQUEST['geo_location_state'];
        }
        $geo_location_city = "";
        if(!empty($_REQUEST['geo_location_city'])){
            $geo_location_city = $_REQUEST['geo_location_city'];
        }
        $geo_location_town = "";
        if(!empty($_REQUEST['geo_location_town'])){
            $geo_location_town = $_REQUEST['geo_location_town'];
        }
        $data = array(
            "email" => "",
            "device" => "",
            "gender" => "",
            "age" => 0,
            "username" => "",
            "appVersion" => "",
            "user_email" => "",
            "paper_type" => 0,
            "foot_type" => 0,
            "orgID" => 0,
            "tag" => "",
            "geo_location_state" => $geo_location_state,
            "geo_location_city" => $geo_location_city,
            "geo_location_town" => $geo_location_town,
            "channel_id" => 1
        );
        
        // Add data into data from form data
        foreach( $data as $key => $val ){
            if( isset( $_REQUEST[$key] ) ){
                $data[$key] = $_REQUEST[$key];
            }
        }
        
        $ch = curl_init();

    
        
        // Production Server 
        //curl_setopt( $ch, CURLOPT_URL, "http://applite.findmeashoe.com/FootMeasure_AL" );
        
        // Development Server 
        curl_setopt( $ch, CURLOPT_URL, "http://applite-dev2.findmeashoe.com/FootMeasure_AL" );

        
        $headers = array();
        
        $headers[] = "Cache-Control:no-cache";
        
        $headers[] = "Content-Type:multipart/form-data;";
        
        curl_setopt( $ch, CURLOPT_HTTPHEADER, $headers );
        
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
        
        curl_setopt( $ch, CURLOPT_POST, 1 );
        
        // push file into curl post un userd for future use
        //$file =  new CURLFile( $target, "text/plain", "TV.txt" );
        
        $data["topView"] = $info;
        
        curl_setopt( $ch, CURLOPT_POSTFIELDS, $data );
        // Send curl post
        $result = curl_exec( $ch );
        
        if ( curl_errno( $ch ) ) {
            echo 'Error:' . curl_error( $ch );
            die();
        }

       //set api starts 
            $decoded_result = json_decode($result,true);
            $error_code = $decoded_result['status'];
            // echo '<pre>';
            // print_r($decoded_result);

            if($error_code == "ERR_100" || $error_code == "ERR_101" ||  $error_code == "ERR_102" || $error_code == "ERR_103" ||  $error_code == "ERR_104" || $error_code == "ERR_167"){

                $paw_status =  false;
                if($decoded_result['Diagnostic_Dict']['PAW-Warning']['pred']){
                    $paw_status_decode = $decoded_result['Diagnostic_Dict']['PAW-Warning']['pred'];

                }
                if(!empty($paw_status_decode) && $paw_status_decode == "True"){
                    $paw_status = true;
                }

                // echo $paw_status;


                $paw_image_link = $decoded_result['Dbg_Img'];
                $sub_code_result = $decoded_result['subcode'];

                if($data['foot_type'] == 0){
                    $foot_type  = 'right';
                }else{
                    $foot_type  = 'left';
                }
                // echo "string";
                // echo $_POST[$foot_type]['L1'];
                // if(!empty($_POST[$foot_type]['L1'])){
                //      $footlength = $_POST[$foot_type]['L1'];
                // }else{
                //     $footlength = "232";
                // }
                // echo 'string';
                // $_POST[$foot_type]['W1'];
                // if(!empty($_POST[$foot_type]['W1'])){
                //     $footwidth = $_POST[$foot_type]['W1'];
                // }else{
                //     $footwidth = "98";
                // }
                $footlength_api = $decoded_result['FootLength'];
                $footwidth_api = $decoded_result['FootWidth'];
                $foot_l = trim($footlength_api, 'mm');
                $foot_w  = trim($footwidth_api, 'mm');
                $footlength = floatval($foot_l);
                $footwidth = floatval($foot_w);


                $error_code = str_ireplace("ERR_"," ",$decoded_result['status']);
                //if($_POST['paper_type'] == 0){
                    //$paper_type = 1;
                //}else{
                    $paper_type = $_POST['paper_type'];
                //}
                $data_set_app['channel_id'] = 1;
                $data_set_app['is_scanned_by_someone'] = true;
                $data_set_app['gender'] = $data['gender'];
                $data_set_app['age'] = $data['age'];
                $data_set_app['foot_position'] = $foot_type;
                $data_set_app['paper_type'] = $paper_type;
                $data_set_app['geo'] = $_POST['Geography'];
                $data_set_app['error_code'] = $error_code;
                // $data_set_app['sub_code'] = $decoded_result['subcode'];
                $data_set_app['sub_code'] = $sub_code_result;
                $data_set_app['debug_image_url'] = $decoded_result['Dbg_Img'];
                // $data_set_app['measurements']['L1'] = $_POST[$foot_type]['L1'];
                $data_set_app['measurements']['L1'] = $footlength;
                // $data_set_app['measurements']['W1'] = $_POST[$foot_type]['W1'];
                $data_set_app['measurements']['W1'] = $footwidth;
                $data_set_app['measurements']['L2'] = $_POST[$foot_type]['L2'];
                $data_set_app['measurements']['L4'] = $_POST[$foot_type]['L4'];
                $data_set_app['measurements']['A24'] = $_POST[$foot_type]['A24'];
                $data_set_app['measurements']['A0'] = $_POST[$foot_type]['A0'];
                $data_set_app['geo_state'] = $geo_location_state;
                $data_set_app['paw'] = $paw_status;
                //$data_set_app['measurements']['paw_debug_image'] = $paw_image_link;      

                $send_data_set = json_encode($data_set_app);
                // echo "string";
                // echo $send_data_set;
                $ch_set = curl_init();
                // Development Server 
                curl_setopt( $ch_set, CURLOPT_URL, "http://backend.fr.findmeashoe.com/services/set-app-user-info/".$data['user_email']."/37" );
                $headers_set = array();
                $headers_set[] = "Cache-Control:no-cache";
                $headers_set[] = "Content-Type:multipart/form-data;";
                curl_setopt( $ch_set, CURLOPT_HTTPHEADER, $headers );
                curl_setopt( $ch_set, CURLOPT_RETURNTRANSFER, 1 );
                curl_setopt( $ch_set, CURLOPT_POST, 1 );
                curl_setopt( $ch_set, CURLOPT_POSTFIELDS, $send_data_set );
                $result_set = curl_exec( $ch_set );
                if ( curl_errno( $ch_set ) ) {
                    echo 'Error:' . curl_error( $ch_set );
                    die();
                }
                curl_close ( $ch_set );

                $ch_get = curl_init();
                curl_setopt( $ch_get, CURLOPT_URL, "http://backend.fr.findmeashoe.com/services/get-app-user-info/" . $data['user_email'] . "/37");
                curl_setopt( $ch_get, CURLOPT_RETURNTRANSFER, 1 );
                // Send curl post
                $result_get = curl_exec( $ch_get );
                if ( curl_errno( $ch_get ) ) {
                    echo 'Error:' . curl_error( $ch_get );
                    die();
                }
                $decoded_result['other_details'] = $result_get;

            }
            $result = json_encode($decoded_result);
            // echo "set_api";
            // echo $result_set;
            // echo '<pre>';
            // echo "sended data";
            // print_r($data_set_app);

            // echo '<pre>';
            // echo "get_api";
            // print_r(json_decode($result_get));


            // echo 'foot_measure _result';
            // echo $result;


            // die;
            // echo "string";
            // echo $result;
            // echo $result_set;
            // die;
            
        //set api  ends
        
        // return the result
        echo $result;
        
        error_log(  $result );
        
        curl_close ( $ch );
        
        
    } catch( Exception $e ){
        echo json_encode( $e );
    }
    
    
    
} else if( isset( $_REQUEST['createuser'] ) ) {
    
    try {
        
        $data = array(
            "email" => "",
            "username" => "",
            "gender" => "M",
            "age"   => 0,
            "length" => 0,
            "width" => 0,
        );
        
        // Add data into data from form data
        foreach( $data as $key => $val ){
            if( isset( $_REQUEST[$key] ) ){
                $data[$key] = $_REQUEST[$key];
            }
        }
        
        $ch = curl_init();
        
        // Production Server
        //curl_setopt( $ch, CURLOPT_URL, "http://applite.findmeashoe.com/addusersfamily" );
        
        // Development Server
        curl_setopt( $ch, CURLOPT_URL, "http://applite-dev2.findmeashoe.com/addusersfamily" );
        
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
        
        curl_setopt( $ch, CURLOPT_POST, 1 );
        
        curl_setopt( $ch, CURLOPT_POSTFIELDS, $data );
        // Send curl post
        $result = curl_exec( $ch );
        
        if ( curl_errno( $ch ) ) {
            echo 'Error:' . curl_error( $ch );
            die();
        }
        // return the result
        echo $result;
       
        curl_close ($ch);
        
    } catch( Exception $e ){
        echo json_encode( $e );
    }
    
    
} else if( isset( $_REQUEST['get_details'] ) && isset( $_REQUEST['user_mail'] ) ) {
    
    $user_mail = $_REQUEST[ 'user_mail' ];
    error_log(  $user_mail );
    try {
        
        $ch = curl_init();
        
        curl_setopt( $ch, CURLOPT_URL, "http://live.findmeashoe.com/services/get-customer-measurement/" . $user_mail . "/both" );
        
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
        // Send curl post
        $result = curl_exec( $ch );
        
        if ( curl_errno( $ch ) ) {
            echo 'Error:' . curl_error( $ch );
            die();
        }

        // New API's starts 

        $ch_get = curl_init();
        curl_setopt( $ch_get, CURLOPT_URL, "http://backend.fr.findmeashoe.com/services/get-app-user-info/" . $user_mail . "/37");
        curl_setopt( $ch_get, CURLOPT_RETURNTRANSFER, 1 );
        // Send curl post
        $result_get = curl_exec( $ch_get );
        if ( curl_errno( $ch_get ) ) {
            echo 'Error:' . curl_error( $ch_get );
            die();
        }

        $result_decode = json_decode($result,true);
        $result_get_decode = json_decode($result_get,true);
        $result_decode['data']['other_details'] = $result_get_decode;
        $final_array = json_encode($result_decode);
        // New API's ends 
        
        // return the result
        // echo $result;
        echo $final_array;
        curl_close ( $ch );
        curl_close ( $ch_get );
        
    } catch( Exception $e ){
        
        echo json_encode( $e );
        
    }
    
} else if( isset( $_REQUEST['is_user_signed_in'] ) ){
    session_start();
    $_SESSION["fms_is_loged_in"] = $_REQUEST['is_user_signed_in'];
    $_SESSION["login_email"] = $_REQUEST['login_email'];
    $_SESSION["login_name"] = $_REQUEST['login_name'];
    $_SESSION["login_provider"] = $_REQUEST['login_provider'];
} else if( isset( $_REQUEST['sign_out'] ) && $_REQUEST['sign_out'] ){
    session_start();
    session_unset();
    session_destroy(); 
} else if( isset( $_REQUEST['is_category_page'] ) ) {  
    $ch = curl_init();
    $url = $_REQUEST['url'];
    
    curl_setopt( $ch, CURLOPT_URL,  $url );
    
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
    // Send curl post
    $result = curl_exec( $ch );
    
    if ( curl_errno( $ch ) ) {
        echo 'Error:' . curl_error( $ch );
        die();
    }
    
    // return the result
    echo $result;
    curl_close ( $ch );
} else {
    echo json_encode( array( "status" => false, "msg" => "can't able to get the image" ) );
}

?>
