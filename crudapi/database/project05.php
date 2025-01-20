<?php

include("../config.php");
$table = "CREATE TABLE products(
id int(6) AUTO_INCREMENT COMMENT 'รหัสสินค้า',
name varchar(100) COMMENT 'ชื่อสินค้า',
price varchar(100) COMMENT 'ราคาสินค้า',
image varchar(100) COMMENT 'รูปภาพ',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'วันที่เพิ่มสินค้า',
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'วันที่แก้ไขสินค้า',
PRIMARY KEY (id) )";

    if ($conn->query($table) === TRUE) {
        echo "Successfully";
    }else{
        echo "ERROR: ". $conn->error;
    }

    $conn->close();
?>