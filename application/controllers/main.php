<?php
require_once(APPPATH . 'libraries/Layout.php');
require_once(APPPATH . 'libraries/View.php');

class Main extends CI_Controller {

	private $layout = null;
	
	public function __construct()
	{
		parent::__construct();
		$this->layout = new Layout();
		$this->layout->set_title('KK');
		$this->layout->set_header(new View('header'));
		$this->layout->set_footer(new View('footer'));
	
	}
	
	public function login() {
		$this->layout->set_subtitle('Login Page');
		$this->layout->set_body(new View('login_page/index'));
		$this->layout->render();
	}
	
	public function index()
	{
		$this->layout->set_subtitle('Main Page');
		$this->layout->set_body(new View('main_page/index'));
		$this->layout->render();
	}
	
}