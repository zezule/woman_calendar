<?php

class User_model extends CI_Model {

	const DB_TABLE = 'users';
	const ID_COL = 'id';
	const EMAIL_COL = 'email';
	const PASSWORD_COL = 'password';

	public function __construct()
	{
		$this->load->database();
		parent::__construct();
	}

	public function get_user_id(User $user)
	{
		$this->db->select(self::ID_COL);
		$this->db->from(self::DB_TABLE);
		$this->db->where(array(
			self::EMAIL_COL => $user->get_email(),
			self::PASSWORD_COL => $user->get_password()
		));
		$this->db->limit(1);
		$query = $this->db->get();
		$id = $query->result_array();
		return (empty($id) === true) ? null : (int)$id[0][self::ID_COL];
	}

}
