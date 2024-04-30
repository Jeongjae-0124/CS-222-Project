<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$conn = mysqli_connect("localhost", "root", "", "uiucmarketplace_data");
if ($conn === false) {
    die("ERROR: Could Not Connect" . mysqli_connect_error());
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Handle GET requests to fetch comments
        if (isset($_GET['offer_id']) && is_numeric($_GET['offer_id'])) {
            $offer_id = $_GET['offer_id'];

            // Prepare SQL statement to fetch comments for a specific offer
            $stmt = $conn->prepare("SELECT * FROM comments WHERE offer_id = ?");
            $stmt->bind_param("i", $offer_id);

            // Execute the prepared statement
            if ($stmt->execute()) {
                // Fetch comments
                $result = $stmt->get_result();
                $comments = [];
                while ($row = $result->fetch_assoc()) {
                    $comments[] = [
                        'id' => $row['id'],
                        'offer_id' => $row['offer_id'],
                        'user_id' => $row['user_id'],
                        'text' => $row['message'], // Change 'text' to 'message' to match table column
                        'timestamp' => $row['timestamp']
                    ];
                }

                // Return comments as JSON response
                http_response_code(200); // OK
                echo json_encode(["comments" => $comments]);
            } else {
                // Failed to fetch comments
                http_response_code(500); // Internal Server Error
                echo json_encode(["error" => "Failed to fetch comments"]);
            }

            // Close statement and database connection
            $stmt->close();
            $conn->close();
        } else {
            // Invalid offer_id parameter
            http_response_code(400); // Bad Request
            echo json_encode(["error" => "Invalid offer_id parameter"]);
        }
        break;

    case 'POST':
        // Handle POST requests to submit comments
        // Ensure that the request body contains required parameters (offer_id, user_id, text)
        if (isset($_POST['offer_id'], $_POST['user_id'], $_POST['text'])) {
            $offer_id = $_POST['offer_id'];
            $user_id = $_POST['user_id'];
            $text = $_POST['text'];

            // Prepare SQL statement to insert a new comment
            $stmt = $conn->prepare("INSERT INTO comments (offer_id, user_id, message) VALUES (?, ?, ?)"); // Change 'text' to 'message' to match table column
            $stmt->bind_param("iis", $offer_id, $user_id, $text);

            // Execute the prepared statement
            if ($stmt->execute()) {
                // Comment inserted successfully
                http_response_code(201); // Created
                echo json_encode(["success" => true, "comment" => [
                    'id' => $stmt->insert_id,
                    'offer_id' => $offer_id,
                    'user_id' => $user_id,
                    'text' => $text,
                    'timestamp' => date('Y-m-d H:i:s') // Current timestamp
                ]]);
            } else {
                // Failed to insert comment
                http_response_code(500); // Internal Server Error
                echo json_encode(["error" => "Failed to add comment"]);
            }

            // Close statement and database connection
            $stmt->close();
            $conn->close();
        } else {
            // Missing required parameters
            http_response_code(400); // Bad Request
            echo json_encode(["error" => "Missing parameters"]);
        }
        break;

    default:
        // Handle unsupported HTTP methods
        http_response_code(405); // Method Not Allowed
        echo json_encode(["error" => "Unsupported HTTP method"]);
        break;
}
?>
