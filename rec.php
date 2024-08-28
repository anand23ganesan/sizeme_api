<?php 

if( isset( $_POST ) ){
    echo json_encode( $_POST ) ."----rec";
    error_log( json_encode( $_FILES ) );
    
    
    
    $info = pathinfo($_FILES['topView']['name']);
    $ext = $info['extension']; // get the extension of the file
    $newname = "TV.".$ext;
    
    $target =  $newname;
    move_uploaded_file( $_FILES['topView']['tmp_name'], $target);
}
?>