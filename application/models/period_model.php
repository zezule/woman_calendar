<?php

class Period_model extends CI_Model {

	const USER_ID = 1; //for now I don't have users;
	const DB_TABLE = 'period';
	const ID_COL = 'id';
	const USER_ID_COL = 'user_id';
	const END_DATE_COL = 'end_date';
	const LENGTH_COL = 'length';
	const START_DATE_COL = 'start_date';

	public function __construct()
	{
		$this->load->database();
		parent::__construct();
	}

	private function period_columns()
	{
		return array(
			self::ID_COL => null,
			self::USER_ID_COL => null,
			self::START_DATE_COL => null,
			self::END_DATE_COL => null,
			self::LENGTH_COL => null
		);
	}
	public function delete($user_id, $entry_id){
		$this->db->delete(self::DB_TABLE, array(self::USER_ID_COL => $user_id, self::ID_COL => $entry_id)); 
	}
	public function retrieve($user_id, DateTime $from)
	{
		//TODO: dopisac warunek o pobranie wszystkiego od konkretniej daty
		$this->db->select("*");
		$this->db->from(self::DB_TABLE);
		$this->db->where(self::START_DATE_COL . '>' , $from->getTimestamp());
		$this->db->order_by(self::START_DATE_COL, "asc");
		$query = $this->db->get();
		return $query->result_array();
	}

	public function add_period_row($user_id, DateTime $start_date, DateTime $end_date)
	{	
		$data = array_merge($this->period_columns(), array(
			self::USER_ID_COL => $user_id,
			self::START_DATE_COL => $start_date->getTimestamp(),
			self::END_DATE_COL => $end_date->getTimestamp(),
			self::LENGTH_COL => $end_date->diff($start_date)->days
		));
		$this->db->insert(self::DB_TABLE, $data);
		return $data;
	}

	public function add_start_date($user_id, DateTime $start_date)
	{
		$data = $this->period_columns();
		$data[self::USER_ID_COL] = $user_id;
		$data[self::START_DATE_COL] = $start_date->getTimestamp();
		$this->db->insert(self::DB_TABLE, $data);
		return $data;
	}

}
