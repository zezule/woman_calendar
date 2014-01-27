<?php

require_once(APPPATH . 'libraries/Renderable.php');

class View implements Renderable {
	
	const VIEW_FOLDER = 'views';
	
	private $CI = null;
	private $_view_path = null;
	private $_view_vars = null;
	
	private function get_full_path($view_path){
		return APPPATH . self::VIEW_FOLDER . DIRECTORY_SEPARATOR . $view_path . '.php';
	}
	
	public function __construct($view_path, $view_vars = array())
	{
		if (false === file_exists($this->get_full_path($view_path))){
			show_404();
		}
		$this->_view_path =  $view_path;
		$this->_view_vars =  $view_vars;
		$this->CI = &get_instance();
	}
	
	public function render() {
		$this->CI->load->view($this->_view_path, $this->_view_vars);
	}
	
	public function get_content() {
		return $this->CI->load->view($this->_view_path, $this->_view_vars, true);
	}
	
}

