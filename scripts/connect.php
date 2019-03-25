<?php
	$connection = mysqli_connect('localhost', 'root', '', 'test');
	if (!$connection)
	{
		die('Not Connected: ' . mysqli_connect_error());
	}
?>