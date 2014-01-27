<?php

class Singleton {
	
	private static $instance = null; 
	
	public static function get_instance() {
		if (self::$instance === null) {
			self::$instance = new static();
		}
		return self::$instance;
	}
	
	private function __construct()
	{
	}
	
	private function __clone() 
	{	
	}
	
}