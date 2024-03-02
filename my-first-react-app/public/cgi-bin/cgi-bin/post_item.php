<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $itemName = $_POST["item-name"];
    $itemDescription = $_POST["item-description"];
    $itemPrice = $_POST["item-price"];

    // Create an array with posted item data
    $postedItem = [
        'name' => $itemName,
        'description' => $itemDescription,
        'price' => $itemPrice,
    ];

    // Convert the array to JSON
    $jsonPostedItem = json_encode($postedItem);

    // Return the JSON data
    echo $jsonPostedItem;
}
?>
