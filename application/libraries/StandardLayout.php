<?php

require_once(APPPATH . 'libraries/Layout.php');

final class StandardLayout extends Layout{

	public function __construct()
	{
		$this->set_title('KK');
		$this->set_header(new View('header'));
		$this->set_footer(new View('footer'));
	}
}
