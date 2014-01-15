<?php

class Main extends CI_Controller {

	public function index()
	{
		if ( ! file_exists('application/views/main_page/index.php')){
			show_404();
		}
		$this->load->view('main_page/index', array());
	}
	
}