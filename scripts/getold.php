<?php
$mapindex = $_GET['dailyindex'];
$mapsdirectory='../maps/html/';
$maps=scandir($mapsdirectory);
$response=array("latestdailynum" => $mapindex, "latestdaily" => file_get_contents($mapsdirectory.$maps[$mapindex]));
echo json_encode($response);
?>
