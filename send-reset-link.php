<?php
$use_slider = true;
$use_fa = true;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Default message
$success_message = "";
$error_message = "";
$alertClass = "alert-info";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email'])) {
    $email = trim($_POST['email']);

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error_message = "Invalid email format.";
        $alertClass = "alert-danger";
    } else {
        $conn = new mysqli("localhost", "root", "", "compass");
        if ($conn->connect_error) {
            $error_message = "Database connection failed.";
            $alertClass = "alert-danger";
        } else {
            $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $userResult = $stmt->get_result();

            if ($userResult->num_rows > 0) {
                $token = bin2hex(random_bytes(32));
                $expires = date("Y-m-d H:i:s", strtotime("+30 minutes"));

                $del = $conn->prepare("DELETE FROM password_resets WHERE email = ?");
                $del->bind_param("s", $email);
                $del->execute();
                $del->close();

                $insert = $conn->prepare("INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)");
                $insert->bind_param("sss", $email, $token, $expires);
                $insert->execute();
                $insert->close();

                $phpmailer = new PHPMailer(true);

                try {
                    $phpmailer->isSMTP();
                    $phpmailer->Host = 'smtp.gmail.com';
                    $phpmailer->SMTPAuth = true;
                    $phpmailer->Port = 587;
                    $phpmailer->Username = 'lesterjudeag@gmail.com';
                    $phpmailer->Password = 'koisvnwnkqjbkxpn';

                    $phpmailer->setFrom('lesterjudeag@gmail.com', 'Compass');
                    $phpmailer->addAddress($email);
                    $phpmailer->isHTML(true);
                    $phpmailer->Subject = 'Reset Your Password';

                    $resetLink = "http://localhost/compass/reset-password.php?token=$token";
                    $phpmailer->Body = "
                        <h2>Password Reset Request</h2>
                        <p>We received a request to reset your password.</p>
                        <p>Click the link below to reset your password. This link is valid for 30 minutes:</p>
                        <p><a href='$resetLink'>$resetLink</a></p>
                        <p>If you did not request this, please ignore this message.</p>
                    ";

                    if ($phpmailer->send()) {
                        $success_message = "We've sent a reset link. Check your Email.";
                        $alertClass = "alert-success";
                    } else {
                        $error_message = "Email failed to send: " . $phpmailer->ErrorInfo;
                        $alertClass = "alert-danger";
                    }
                } catch (Exception $e) {
                    $error_message = "PHPMailer Exception: " . $phpmailer->ErrorInfo;
                    $alertClass = "alert-danger";
                }
            } else {
                $error_message = "Username or Email not match";
                $alertClass = "alert-danger";
            }

            $stmt->close();
            $conn->close();
        }
    }
} else {
    $error_message = "Invalid request.";
    $alertClass = "alert-danger";
}
?>

<?php include('includes/header.php'); ?>

<link rel="stylesheet" href="styles.css">

<div class="container-fluid p-0 vh-100 d-flex align-items-center">
    <div class="vh-100 d-flex align-items-center overflow-hidden">
        <div class="d-flex w-100 h-100 gap-6 position-relative">
            <div class="ps-5 w-40 flex-shrink-0 d-flex flex-column justify-content-center align-items-center h-100 cloud-edge">
                <img class="w-50" src="assets/images/compass-logo.png">
                <!-- Popup for Alerts -->
                <div id="popup" class="popup" style="display: <?php echo (isset($error_message) && $error_message !== '' || isset($success_message) && $success_message !== '') ? 'flex' : 'none'; ?>" onclick="closePopup(event)">
                    <div class="popup-content">
                        <button class="close-btn" onclick="closePopup(event)">×</button>
                        <div class="popup-body">
                            <h2 class="font-header <?php echo isset($success_message) && $success_message !== '' ? 'text-success' : 'text-danger'; ?>">
                                <?php echo isset($success_message) && $success_message !== '' ? 'Reset Link Sent' : 'Error'; ?>
                            </h2>
                            <p class="font-body <?php echo isset($success_message) && $success_message !== '' ? 'text-graphite' : 'text-danger'; ?>">
                                <?php echo isset($success_message) && $success_message !== '' ? $success_message : htmlspecialchars($error_message); ?>
                            </p>
                            <?php if (isset($success_message) && $success_message !== ''): ?>
                                <button class="popup-button" onclick="window.location.href='login.php'">Go to Login</button>
                            <?php else: ?>
                                <button class="popup-button" onclick="window.location.href='forgot_password.php'">Try Again</button>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
                <div class="small w-75 mt-3 text-center pb-4 z-5">
                    Go back to
                    <a href="login.php" class="text-decoration-none">Login</a>
                </div>
            </div>
            <?php include('includes/templates/slider.php') ?>
        </div>
    </div>
</div>

<?php include('includes/footer.php'); ?>