<?php

require_once(APPPATH . 'libraries/REST_Controller.php');
require_once(APPPATH . 'libraries/AJAX_Response.php');

class Login extends REST_Controller {
	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('user_model');
		$this->load->library('session');
	}

	public function index_get()
	{
		$this->load->library('StandardLayout');
		
	  $layout = new StandardLayout();
		$layout->set_subtitle('Login Page');
		$layout->add_js('login_page');
		$layout->set_body(new View('login_page/index'));
		$layout->render();
	}
	
	public function signout_post()
	{
		$this->session->sess_destroy();
		$this->response(AJAX_Response::success());
	}
	
	public function signin_post()
	{
		$this->load->library('User');
		
		$user = new User();
		$user->set_password($this->post('password'));
		$user->set_email($this->post('email'));
		$user->set_id($this->user_model->get_user_id($user));
		
		if ( null === $user->get_id()){
			$this->response(AJAX_Response::error('User does not exist'));
		}
		$this->session->set_userdata('user_id', (int)$user->get_id());
		$this->response(AJAX_Response::success());
	}

}
