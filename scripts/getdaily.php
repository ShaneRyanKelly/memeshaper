<?php
  $mapsdirectory='../maps/html/';
  $maps=scandir($mapsdirectory);
  $nummaps=count($maps);
  $latestmap=$nummaps - 1;
  $response=array("latestdailynum" => $latestmap, "latestdaily" => file_get_contents($mapsdirectory.$maps[$latestmap]));
  echo json_encode($response);
 ?>
