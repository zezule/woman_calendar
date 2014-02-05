<?php

class Main extends CI_Controller {

	public function index()
	{
		$this->load->library('StandardLayout');
		$this->load->library('session');
		$session_uid = $this->session->userdata('user_id');
		if (false === (bool)$session_uid){
			show_error('You are not logged in', 403);
			//powinien byc redirect do strony logowania
		}
		$this->display_main_page();
	}

	private function display_main_page()
	{
		$layout = new StandardLayout();
		$layout->set_subtitle('Main Page');
		$layout->add_js('main_page');
		$layout->set_body(new View('main_page/index'));
		$layout->render();
	}

}
