<?php
$comicindex = $_GET['comicindex'];
$comicsdirectory='../comics/';
$comics=scandir($comicsdirectory);
$htmllatest='<img src="comics/'.$comics[$comicindex].'" class="img-thumbnail img-responsive" \>';
$response=array("requestedcomicindex" => $comicindex, "requestedcomic" => $htmllatest);
echo json_encode($response);
?>
