<?php

 include 'config.php';

 $sql = "SELECT * FROM products ORDER BY created_at DESC";
 $result = $conn -> query ($sql);

 $image = [];
 if ($result -> num_rows > 0) {
    while ($row  = $result -> fetch_assoc()){
        $image[] = $row;
    }
 }

 echo json_encode($image);
 $conn -> close();

?>