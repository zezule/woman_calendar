<?php
class AJAX_Response {
		
	public static function success($response = null){
		return array('STATUS' => 'ok', 'DATA' => $response);
	}
	
	public static function error($error_msg){
		return array('STATUS' => 'error', 'MSG' => $error_msg);
	}
	
}
