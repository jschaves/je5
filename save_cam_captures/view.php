<!DOCTYPE html>
<html>
  <head>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
	<script src="http://je5.es/js/plugin-jquery/plugin-jquery-je5-beta.0.2.1.js"></script>
    <title>View captures images db whith "Media capture"</title>
    <meta charset="utf8">
  </head>
  <body>
    <table>
      <tr>
        <td><h1>View captures images db whith "Media capture"</h1></td>
      </tr>
    </table>
    <div id="output"></div>
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
			$consulta = "SELECT * FROM `streaming`";
			if ($resultado = $conn->query($consulta)) {
				echo '	
				<script>
					var array_rec = new Array();';
				$a = 0;
				while($fila = $resultado->fetch_assoc()) {
					$array_rec = explode('data:image/png;base64,', $fila['rec']);
					foreach($array_rec as $dates) {
						if($dates != '') { 
							$ar .= 'array_rec['.$a.'] = \'data:image/png;base64,'.$dates.'\';';
							$a = $a + 1;
						}
					}
				}				
				echo $ar.'
					for(a = array_rec.length - 1; a > -1 ; a--) {
						$(\'#output\').append(\'<img src="\'+array_rec[a]+\'" />\');
					}
						
				</script>';
				$resultado->free();			
			}
			$conn->close();		
		}
	?>
  </body>
</html>