<?php
$comicsdirectory='../comics/';
$comics=scandir($comicsdirectory);
$numcomics=count($comics);
$latestcomic=$numcomics - 1;
$htmllatest='<img src="comics/'.$comics[$latestcomic].'" class="img-thumbnail img-responsive" \>';
$response=array("latestcomicnum" => $latestcomic, "latestcomic" => $htmllatest);
echo json_encode($response);
?>
