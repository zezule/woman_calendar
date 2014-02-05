<?php

class User {
	
	private $id;
	private $password;
	private $email;
	
	public function set_id($id){
		$this->id = $id;
	}
	public function set_password($password){
		$this->password = $password;
	}
	public function set_email($email){
		$this->email = $email;
	}
	public function get_id(){
		return $this->id;
	}
	public function get_password(){
		return $this->password;
	}
	public function get_email(){
		return $this->email;
	}
}