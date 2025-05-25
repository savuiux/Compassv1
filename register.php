<?php
session_start();

$use_slider = true;
$use_fa = true;

// Database connection
$conn = new mysqli("localhost", "root", "", "compass");
if ($conn->connect_error) {
    $error_message = "Database connection failed.";
}

// Process form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($email) || empty($password)) {
        $error_message = "All fields are required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error_message = "Invalid email format.";
    } elseif (strlen($password) < 6) {
        $error_message = "Password must be at least 6 characters long.";
    } else {
        $checkEmail = $conn->prepare("SELECT email FROM users WHERE email = ?");
        $checkEmail->bind_param("s", $email);
        $checkEmail->execute();
        $checkEmail->store_result();
        if ($checkEmail->num_rows > 0) {
            $checkEmail->close();
            $error_message = "Email is already registered.";
        } else {
            $checkEmail->close();

            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $insert = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
            $insert->bind_param("sss", $username, $email, $hashedPassword);
            $insert->execute();
            $insert->close();

            session_unset();
            session_destroy();

            // Set success message
            $success_message = "Your account has been created successfully. You’ll be redirected to the login page in <strong>5 seconds</strong>... <br><a href='login.php?register=success' class='text-decoration-none'>Click here if you're not redirected</a>";
        }
    }
}
?>

<?php include 'includes/header.php'; ?>

<?php if (isset($success_message)): ?>
    <meta http-equiv="refresh" content="5;url=login.php?register=success">
<?php endif; ?>

<link rel="stylesheet" href="styles.css">

<div class="container-fluid p-0 vh-100 d-flex align-items-center">
    <div class="vh-100 d-flex align-items-center overflow-hidden">
        <div class="d-flex w-100 h-100 gap-6 position-relative">
            <div class="ps-5 w-40 flex-shrink-0 d-flex flex-column justify-content-center align-items-center h-100 cloud-edge">
                <img class="w-25 mb-1" src="assets/images/compass-logo.png" alt="Compass Logo">
                <div class="login-content d-flex flex-column gy-3 mb-0">
                    <h1 class="display-6 fw-bold m-0 text-dark mb-1">Register to compass</h1>
                    <p class="small mt-0 text-center text-gray small">
                        Sign up to get all features and exclusive contents.
                    </p>
                </div>
                <?php if (!isset($success_message)): ?>
                    <?php include 'includes/templates/register_form.php'; ?>
                    <div class="small w-75 mt-3 text-center pb-4 z-5">
                        Already have an account?
                        <a href="login.php" class="text-decoration-underline">Login</a>
                    </div>
                <?php endif; ?>
                <!-- Popup for Alerts -->
                <div id="popup" class="popup" style="display: <?php echo (isset($error_message) || isset($success_message)) ? 'flex' : 'none'; ?>" onclick="closePopup(event)">
                    <div class="popup-content">
                        <button class="close-btn" onclick="closePopup(event)">×</button>
                        <div class="popup-body">
                            <h2 class="font-header <?php echo isset($success_message) ? 'text-success' : 'text-danger'; ?>">
                                <?php echo isset($success_message) ? 'Registration Successful' : 'Registration Error'; ?>
                            </h2>
                            <p class="font-body <?php echo isset($success_message) ? 'text-graphite' : 'text-danger'; ?>">
                                <?php echo isset($success_message) ? $success_message : htmlspecialchars($error_message); ?>
                            </p>
                            <?php if (isset($success_message)): ?>
                                <button class="popup-button" onclick="window.location.href='login.php'">Go to Login</button>
                            <?php else: ?>
                                <button class="popup-button" onclick="closePopup(event)">Try Again</button>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
            <?php if ($use_slider && !is_mobile()): ?>
                <?php include 'includes/templates/slider.php' ?>
            <?php endif; ?>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>

<?php
// Helper function to detect mobile devices
function is_mobile()
{
    return preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $_SERVER["HTTP_USER_AGENT"]);
}

if (isset($conn)) {
    $conn->close();
}
?>