<?php

require(APPPATH . 'libraries/REST_Controller.php');
require(APPPATH . 'libraries/AJAX_Response.php');

class Period extends REST_Controller {

	const DISPLAYED_YEARS = 3;
	private function load_resources()
	{
		$this->load->model('period_model');
		$this->load->helper('date_validator');
		$this->load->helper('i18n_codes');
		$this->load->helper('array');
		$this->load->helper('date');
	}

	public function __construct()
	{
		parent::__construct();
		$this->load_resources();
	}
	
	public function entry_post()
	{	
	  $validator = DateValidator::instance();
		$form_data = json_decode($this->post('model'), true);	
		$end_timestamp = element('end_date', $form_data, null);
		$start_date = $validator->is_valid(element('start_date', $form_data));
		
		if ($start_date === false) {
			$this->response(AJAX_Response::error());
		}
		 
		if (null === $end_timestamp){
			$this->period_model->add_start_date(Period_model::USER_ID, $start_date);
		} else {
			$end_date = $validator->is_valid($end_timestamp);
			if ($end_date !== false) {
				$this->period_model->add_period_row(Period_model::USER_ID, $start_date, $end_date);
			}
		}
		
		$this->response(AJAX_Response::success());
	}
	
	public function entry_delete($entry_id) {
		$this->period_model->delete(Period_model::USER_ID, $entry_id);
		$this->response(AJAX_Response::success());
	}
	
	public function read_get()
	{
		$since = new DateTime();
		$data = $this->period_model->retrieve(Period_model::USER_ID, $since->sub(new DateInterval('P'.self::DISPLAYED_YEARS.'Y')));
		$this->response($data);
	}

}
