<?php
  require('connect.php');
//$file = '../pages/store.html';
//echo file_get_contents($file);
$query = "SELECT * FROM items";
if ($result = $connection->query($query)) {
  /* Note, that we can't execute any functions which interact with the
     server until result set was closed. All calls will return an
     'out of sync' error */
     while($row = $result->fetch_array(MYSQLI_ASSOC)) {
             $items[] = $row;
     }
     echo json_encode($items);
    $result->close();
  }
  $connection->close();
?>
