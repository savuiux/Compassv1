<?php
$use_slider = true;
$use_fa = true;

session_start();

// Move use statements to the top
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$conn = new mysqli("localhost", "root", "", "compass");
if ($conn->connect_error) {
    $error_message = "Database connection failed.";
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $otpInput = $_POST['otp'] ?? '';
    $password = $_POST['password'] ?? '';
    $confirm = $_POST['confirm_password'] ?? '';

    $email = $_SESSION['reset_email'] ?? null;
    $token = $_SESSION['reset_token'] ?? null;
    $expectedOtp = $_SESSION['reset_otp'] ?? null;
    $otpExpires = $_SESSION['reset_otp_expires'] ?? 0;

    if (!$email || !$token || !$expectedOtp || time() > $otpExpires) {
        $error_message = "Session expired or invalid. Please restart the password reset process.";
    } elseif ($otpInput !== strval($expectedOtp)) {
        $error_message = "Invalid OTP. Please check your code and try again.";
    } elseif (strlen($password) < 6) {
        $error_message = "Password must be at least 6 characters long.";
    } elseif ($password !== $confirm) {
        $error_message = "Passwords do not match.";
    } else {
        // Update password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $update = $conn->prepare("UPDATE users SET password = ? WHERE email = ?");
        $update->bind_param("ss", $hashedPassword, $email);
        $update->execute();

        // Remove token
        $delete = $conn->prepare("DELETE FROM password_resets WHERE email = ?");
        $delete->bind_param("s", $email);
        $delete->execute();

        // Clean up
        session_unset();
        session_destroy();

        $success_message = "Your password has been updated successfully. You’ll be redirected to the login page in <strong>5 seconds</strong>... <br><a href='login.php?reset=success' class='text-decoration-none'>Click here if you’re not redirected</a>";
    }
}

// Token validation (GET)
$token = $_GET['token'] ?? '';
if (!$token && !isset($success_message) && !isset($error_message)) {
    $error_message = "Invalid or missing token.";
} elseif ($token) {
    $stmt = $conn->prepare("SELECT email, expires_at FROM password_resets WHERE token = ?");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        $error_message = "This link is invalid or has already been used.";
    } else {
        $data = $result->fetch_assoc();
        $email = $data['email'];
        $expiresAt = strtotime($data['expires_at']);

        if (time() > $expiresAt) {
            $error_message = "This reset link has expired. Please request a new one.";
        } else {
            // Generate and send OTP
            $otp = rand(100000, 999999);
            $_SESSION['reset_email'] = $email;
            $_SESSION['reset_token'] = $token;
            $_SESSION['reset_otp'] = $otp;
            $_SESSION['reset_otp_expires'] = time() + 300;

            $mail = new PHPMailer(true);
            try {
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com';
                $mail->SMTPAuth = true;
                $mail->Username = 'lesterjudeag@gmail.com';
                $mail->Password = 'koisvnwnkqjbkxpn';
                $mail->SMTPSecure = 'tls';
                $mail->Port = 587;

                $mail->setFrom('lesterjudeag@gmail.com', 'Compass');
                $mail->addAddress($email);
                $mail->isHTML(true);
                $mail->Subject = 'Your Compass OTP Code';
                $mail->Body = "
                    <h2>Your One-Time Code</h2>
                    <p>Use the following 6-digit code to complete your password reset:</p>
                    <h3 style='letter-spacing: 4px;'>$otp</h3>
                    <p>This code will expire in 5 minutes.</p>
                ";
                $mail->send();
            } catch (Exception $e) {
                $error_message = "Failed to send OTP email. Please try again later.";
            }
        }
    }
}
?>

<?php include('includes/header.php'); ?>

<?php if (isset($success_message)): ?>
    <meta http-equiv="refresh" content="5;url=login.php?reset=success">
<?php endif; ?>

<link rel="stylesheet" href="styles.css">

<div class="container-fluid p-0 vh-100 d-flex align-items-center">
    <div class="vh-100 d-flex align-items-center overflow-hidden">
        <div class="d-flex w-100 h-100 gap-6 position-relative">
            <div class="ps-5 w-40 flex-shrink-0 d-flex flex-column justify-content-center align-items-center h-100 cloud-edge">
                <img class="w-25 mb-3" src="assets/images/compass-logo.png" alt="Compass Logo">
                <div class="login-content d-flex flex-column gy-3 mb-4">
                    <h1 class="display-6 fw-bold m-0 text-dark mb-1">Reset Password</h1>
                </div>
                <?php if (!isset($success_message) && !isset($error_message)): ?>
                    <form action="reset-password.php" method="post" class="w-75 needs-validation" novalidate aria-label="Reset password form">
                        <div class="mb-3">
                            <label for="otp" class="small form-label text-gray">6-Digit Code</label>
                            <input type="text" id="otp" name="otp" class="small form-control" required pattern="\d{6}" placeholder="Enter 6-digit code">
                            <div class="invalid-feedback">
                                Please enter a valid 6-digit code.
                            </div>
                        </div>
                        <div class="mb-3 position-relative">
                            <label for="password" class="small form-label text-gray">New Password</label>
                            <input type="password" id="password" name="password" class="small form-control" required placeholder="Enter new password">
                            <button type="button"
                                class="btn position-absolute top-70 end-1 translate-middle-y me-2 p-0 border-0 bg-transparent"
                                onclick="togglePasswordVisibility('password', 'eye-icon')"
                                aria-label="Toggle password visibility">
                                <i class="fa-solid fa-eye-slash" id="eye-icon"></i>
                            </button>
                            <div class="invalid-feedback">
                                Please enter a password.
                            </div>
                            <div class="password-strength-container">
                                <div class="password-strength-label" id="password-strength-label">Password strength: Weak</div>
                                <div class="password-strength-bar-container">
                                    <div class="password-strength-bar" id="password-strength-bar"></div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3 position-relative">
                            <label for="confirm-password" class="small form-label text-gray">Confirm Password</label>
                            <input type="password" id="confirm-password" name="confirm_password" class="small form-control" required placeholder="Confirm new password">
                            <button type="button"
                                class="btn position-absolute top-70 end-1 translate-middle-y me-2 p-0 border-0 bg-transparent"
                                onclick="togglePasswordVisibility('confirm-password', 'confirm-eye-icon')"
                                aria-label="Toggle confirm password visibility">
                                <i class="fa-solid fa-eye-slash" id="confirm-eye-icon"></i>
                            </button>
                            <div class="invalid-feedback">
                                Please confirm your password.
                            </div>
                        </div>
                        <button type="submit" class="small custom-btn mt-2 w-100" aria-label="Reset Password">
                            Reset Password
                            <span></span><span></span><span></span><span></span>
                        </button>
                    </form>
                <?php endif; ?>
                <!-- Popup for Alerts -->
                <div id="popup" class="popup" style="display: <?php echo (isset($error_message) || isset($success_message)) ? 'flex' : 'none'; ?>" onclick="closePopup(event)">
                    <div class="popup-content">
                        <button class="close-btn" onclick="closePopup(event)">×</button>
                        <div class="popup-body">
                            <h2 class="font-header <?php echo isset($success_message) ? 'text-success' : 'text-danger'; ?>">
                                <?php echo isset($success_message) ? 'Password Reset Successful' : 'Error'; ?>
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
                <div class="small w-75 mt-3 text-center pb-4 z-5">
                    Go back to
                    <a href="login.php" class="text-decoration-none">Login</a>
                </div>
            </div>
            <?php if ($use_slider && !is_mobile()): ?>
                <?php include('includes/templates/slider.php'); ?>
            <?php endif; ?>
        </div>
    </div>
</div>

<?php include('includes/footer.php'); ?>

<?php
function is_mobile()
{
    return preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $_SERVER["HTTP_USER_AGENT"]);
}

if (isset($conn)) {
    $conn->close();
}
?>