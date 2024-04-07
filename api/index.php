<?php
error_reporting(E_ALL);
ini_set('display_errors',1);
header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$conn= mysqli_connect("localhost","root", "", "uiucmarketplace_data");
if($conn===false)
{
  die("ERROR: Could Not Connect".mysqli_connect_error());
}

$method = $_SERVER['REQUEST_METHOD'];

// echo "test----".$method; die;
switch($method)
{
   case "GET": 
    $sql = "SELECT * FROM offers";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $offers = [];
        while ($row = $result->fetch_assoc()) {
            $offers[] = [
                'id' => $row['id'], // Include the ID in the response
                'title' => $row['title'],
                'description' => $row['description'],
                'price' => $row['price'],
                'contact' => $row['contact'],
            ];
        }
        echo json_encode(['success' => true, 'offers' => $offers]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No offers found']);
    }
    case "POST":
      if(isset($_FILES['pfile']))
          {     
            $title= $_POST['title'];
            $description= $_POST['description'];
            $price=$_POST['price'];
            $contact =  $_POST['contact'];
            $pfile = $_FILES['pfile']['name'];
            $pfile_temp= $_FILES['pfile']['tmp_name'];
            $destination= $_SERVER['DOCUMENT_ROOT'].'/react/images'."/".$pfile;
            $result= mysqli_query($conn,"INSERT INTO offers (title, description, price, contact,pfile)
            VALUES ('$title', '$description', '$price', '$contact','$pfile')");
          if($result)
          { 
            move_uploaded_file($pfile_temp, $destination);
            echo json_encode(["success"=>"Product Inserted Successfully"]);
            return;
          } else{
          echo json_encode(["success"=>"Product Not Inserted!"]);
           return;
          }
          } 
        else{
         echo json_encode(["success"=>"Data not in Correct Format"]);
         return;
        }
        
    break;
         

  
}


