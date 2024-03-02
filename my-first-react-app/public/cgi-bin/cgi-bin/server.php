<?php

$servername = "localhost:3306"; // Assuming your database is on the same server
$username = "uiucmarketplace_admin";
$password = "Access0131!";
$database = "uiucmarketplace_data";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['registration'])) {
        // Handle user registration
        $username = $conn->real_escape_string($data['username']);
        $email = $conn->real_escape_string($data['email']);
        $password = password_hash($conn->real_escape_string($data['password']), PASSWORD_BCRYPT);

        $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => true, 'message' => 'User registered successfully']);
        } else {
            $error_message = $conn->error;
            echo json_encode(['success' => false, 'message' => 'Error registering user', 'error' => $error_message]);
        }
    } elseif (isset($data['offer'])) {
        // Handle adding or updating offers
        if (isset($data['offer']['id'])) {
            // If an ID is provided, it's an update
            $offerId = $conn->real_escape_string($data['offer']['id']);
            $title = $conn->real_escape_string($data['offer']['title']);
            $description = $conn->real_escape_string($data['offer']['description']);
            $price = $conn->real_escape_string($data['offer']['price']);
            $contact = $conn->real_escape_string($data['offer']['contact']);

            $sql = "UPDATE offers SET title = '$title', description = '$description', price = '$price', contact = '$contact' WHERE id = '$offerId'";

            if ($conn->query($sql) === TRUE) {
                echo json_encode(['success' => true, 'message' => 'Offer updated successfully']);
            } else {
                $error_message = $conn->error;
                echo json_encode(['success' => false, 'message' => 'Error updating offer', 'error' => $error_message]);
            }
        } else {
            // If no ID is provided, it's a new offer
            $title = $conn->real_escape_string($data['offer']['title']);
            $description = $conn->real_escape_string($data['offer']['description']);
            $price = $conn->real_escape_string($data['offer']['price']);
            $contact = $conn->real_escape_string($data['offer']['contact']);

            $sql = "INSERT INTO offers (title, description, price, contact) VALUES ('$title', '$description', '$price', '$contact')";

            if ($conn->query($sql) === TRUE) {
                echo json_encode(['success' => true, 'message' => 'Offer added successfully']);
            } else {
                $error_message = $conn->error;
                echo json_encode(['success' => false, 'message' => 'Error adding offer', 'error' => $error_message]);
            }
        }
    } elseif (isset($data['deleteOffer'])) {
        // Handle deleting offers
        $offerId = $conn->real_escape_string($data['deleteOffer']['id']);

        $sql = "DELETE FROM offers WHERE id = '$offerId'";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => true, 'message' => 'Offer deleted successfully']);
        } else {
            $error_message = $conn->error;
            echo json_encode(['success' => false, 'message' => 'Error deleting offer', 'error' => $error_message]);
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch all offers
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
}

$conn->close();

?>
