<?php

class DateValidator { //implements Validator -- is_valid -- for future
	
	private $date = null;
  static $instance = null;
	
	public static function instance() {
		if (self::$instance === null){
			self::$instance = new self();
			self::$instance->init();
		}
		return self::$instance;
	}
	private function init()
	{
		$this->date = new DateTime();
		$this->date->setTimezone(new DateTimeZone('UTC'));
	}
	
	public function is_valid($timestamp){
		$date = clone $this->date;
		try {
			$date->setTimestamp($timestamp);
		} catch (Exception $e) {
			return false;
		}
		return $date;
	}
	
	private function __clone(){}
	private function __construct(){}
	
}
