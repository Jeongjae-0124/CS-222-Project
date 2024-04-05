<?php

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$sql = "SELECT" FROM offers";
$stmt = $conn->prepare($sql);
$stmt ->execute();
$offers = $stmt ->fetchAll(PDO::FETCH_ASSOC);
echo jsonencode($offers);

