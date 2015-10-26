<?php
	//Conect to db	
	$servername = '';
	$username = '';
	$password = '';
	$conn = new mysqli($servername, $username, $password);
	mysqli_select_db($conn, 'pru_je5_stream');

	if ($conn->connect_error) {
		die('Error: ' . $conn->connect_error);
	} else {
		if($_POST['img'] != 'data:,' && $_POST['img'] != '') {
			//Save latest capture in img field and all captures in rec
			$sql = "UPDATE `streaming` SET `img` = '".$_POST['img']."', `rec` = CONCAT('".$_POST['img']."', `rec`) WHERE ID = 1";
			if ($conn->query($sql) === TRUE) {
				echo 'New image inserted';
			} else {
				echo 'Error: ' . $sql . ' ' . $conn->error;
			}
		}
	}
	$conn->close();
?>
	