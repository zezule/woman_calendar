<?php

require_once(APPPATH . 'libraries/Renderable.php');
require_once(APPPATH . 'libraries/View.php');

class Layout implements Renderable {

	private $_page_title = null;
	private $_page_subtitle = null;
	
	private $_header = null;
	private $_body = null;
	private $_footer = null;
	
	public function set_title($title){
		$this->_page_title = $title;
	}
	public function set_subtitle($subtitle){
		$this->_page_subtitle = $subtitle;
	}
	
	public function set_header(Renderable $header){
		$this->_header = $header;
	}
	public function set_footer(Renderable $footer){
		$this->_footer = $footer;
	}
	public function set_body(Renderable $body){
		$this->_body = $body;
	}
	
	public function render() 
	{
		echo $this->get_content();	
	}
	
	public function get_content(){
		$vars = array(
		  'title' => $this->_page_title,
			'subtitle' => $this->_page_subtitle, 
			'header' => $this->_header->get_content(),
			'footer' => $this->_footer->get_content(),
			'body'	 => $this->_body->get_content()
		);
		$CI = &get_instance();
		return $CI->load->view('layout', $vars, true);
	}
}
