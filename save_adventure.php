<?php
header('Content-Type: application/json');

// Database connection configuration
$host = '127.0.0.1';
$dbname = 'compass';
$username = 'root'; // Update with your database username
$password = ''; // Update with your database password

try {
    // Create a PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if the request is POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Get form data from JSON input
        $data = json_decode(file_get_contents('php://input'), true);

        $city = $data['city'] ?? '';
        $country = $data['country'] ?? '';
        $activity = $data['activity'] ?? '';
        $information = json_encode($data['information'] ?? []); // Convert array to JSON string

        // Validate required fields
        if (empty($city) || empty($country) || empty($activity) || empty($information)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
            exit;
        }

        // Prepare and execute the SQL query
        $stmt = $pdo->prepare("
            INSERT INTO adventure_plans (city, country, activity, information, created_at)
            VALUES (:city, :country, :activity, :information, NOW())
        ");
        $stmt->execute([
            ':city' => $city,
            ':country' => $country,
            ':activity' => $activity,
            ':information' => $information
        ]);

        // Return success response
        http_response_code(200);
        echo json_encode([
            'status' => 'success',
            'message' => 'Adventure plan saved successfully!',
            'data' => [
                'city' => $city,
                'country' => $country,
                'activity' => $activity,
                'information' => $data['information'],
                'created_at' => date('Y-m-d H:i:s')
            ]
        ]);
    } else {
        http_response_code(405);
        echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Server error: ' . $e->getMessage()]);
}
?>