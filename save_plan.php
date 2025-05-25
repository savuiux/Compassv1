<?php
// Database configuration
$host = 'localhost';
$dbname = 'compass';
$username = 'root';
$password = '';

// Create PDO connection
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Handle POST request to save trip plan
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    
    try {
        // Get form data
        $city = $_POST['city'] ?? '';
        $country = $_POST['country'] ?? '';
        $activity = $_POST['activity'] ?? '';
        
        // Get information checkboxes (convert to boolean)
        $transportation = isset($_POST['info']) && in_array('Transportation', $_POST['info']) ? 1 : 0;
        $health = isset($_POST['info']) && in_array('Health', $_POST['info']) ? 1 : 0;
        $weather = isset($_POST['info']) && in_array('Weather', $_POST['info']) ? 1 : 0;
        $gear = isset($_POST['info']) && in_array('Gear', $_POST['info']) ? 1 : 0;
        $political_info = isset($_POST['info']) && in_array('Political Info', $_POST['info']) ? 1 : 0;
        $activity_specific = isset($_POST['info']) && in_array('Activity Specific', $_POST['info']) ? 1 : 0;
        
        // Validate required fields
        if (empty($city) || empty($country) || empty($activity)) {
            throw new Exception('Missing required fields');
        }
        
        // Insert into database
        $sql = "INSERT INTO trip_plans (city, country, activity, transportation, health, weather, gear, political_info, activity_specific) 
                VALUES (:city, :country, :activity, :transportation, :health, :weather, :gear, :political_info, :activity_specific)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':city' => $city,
            ':country' => $country,
            ':activity' => $activity,
            ':transportation' => $transportation,
            ':health' => $health,
            ':weather' => $weather,
            ':gear' => $gear,
            ':political_info' => $political_info,
            ':activity_specific' => $activity_specific
        ]);
        
        $planId = $pdo->lastInsertId();
        
        echo json_encode([
            'success' => true,
            'message' => 'Trip plan saved successfully!',
            'plan_id' => $planId
        ]);
        
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Error saving trip plan: ' . $e->getMessage()
        ]);
    }
    exit;
}

// Handle GET request to retrieve saved plans
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json');
    
    try {
        $sql = "SELECT * FROM trip_plans ORDER BY created_at DESC LIMIT 50";
        $stmt = $pdo->query($sql);
        $plans = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'plans' => $plans
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error retrieving plans: ' . $e->getMessage()
        ]);
    }
    exit;
}
?>