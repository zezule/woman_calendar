<?php

class Main extends CI_Controller {

	public function message($to = 'World')
	{ //php index.php main message -- CLI
		if (true === $this->input->is_cli_request()){
			echo "Hello {$to}!".PHP_EOL;
		}
	}
	
	public function index()
	{
	  $sections = array(
			'config'  => TRUE,
			'queries' => TRUE
    );

		$this->output->set_profiler_sections($sections);
		$this->output->enable_profiler(true);
		
		if ( ! file_exists('application/views/main_page/index.php')){
			show_404();
		}
		$this->load->view('main_page/index', array());
	}
	
}