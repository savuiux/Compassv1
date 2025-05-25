<?php
$use_slider = true;
$use_fa = true;

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email'])) {
    $email = trim($_POST['email']);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error_message = "Invalid email format.";
    } else {
        $success_message = "If an account exists for " . htmlspecialchars($email) . ", a reset link will be sent shortly.";
    }
}
?>

<?php include('includes/header.php'); ?>

<link rel="stylesheet" href="styles.css">

<div class="container-fluid p-0 vh-100 d-flex align-items-center">
    <div class="vh-100 d-flex align-items-center overflow-hidden">
        <div class="d-flex w-100 h-100 gap-6 position-relative">
            <div class="ps-5 w-40 flex-shrink-0 d-flex flex-column justify-content-center align-items-center h-100 cloud-edge">
                <img class="w-25 mb-3" src="assets/images/compass-logo.png">
                <div class="login-content d-flex flex-column gy-3 mb-4">
                    <h1 class="small display-6 fw-bold m-0 text-dark text-center">Forgot Password?</h1>
                    <p class="small mt-2 text-center text-gray max-520 small mb-3">
                        Enter your email address. We'll send you a secure link or code, so you can reset your password quickly and safely.
                    </p>
                </div>
                <?php include 'includes/templates/forgot_password_form.php'; ?>
                <!-- Popup for Alerts -->
                <div id="popup" class="popup" style="display: <?php echo (isset($error_message) || isset($success_message)) ? 'flex' : 'none'; ?>" onclick="closePopup(event)">
                    <div class="popup-content">
                        <button class="close-btn" onclick="closePopup(event)">×</button>
                        <div class="popup-body">
                            <h2 class="font-header <?php echo isset($success_message) ? 'text-success' : 'text-danger'; ?>">
                                <?php echo isset($success_message) ? 'Reset Link Sent' : 'Error'; ?>
                            </h2>
                            <p class="font-body <?php echo isset($success_message) ? 'text-graphite' : 'text-danger'; ?>">
                                <?php echo isset($success_message) ? $success_message : htmlspecialchars($error_message); ?>
                            </p>
                            <?php if (isset($success_message)): ?>
                                <button class="small popup-button" onclick="window.location.href='login.php'">Go to Login</button>
                            <?php else: ?>
                                <button class="small popup-button" onclick="closePopup(event)">Try Again</button>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
                <div class="small w-75 mt-3 text-center pb-4 z-5">
                    Go Back to
                    <a href="login.php" class="text-decoration-underline">Login</a>
                </div>
                <div class="small w-75 mt-0 text-center pb-4 z-5">
                    Don't have an account yet?
                    <a href="register.php" class="text-decoration-none">Register</a>
                </div>
            </div>
            <?php include('includes/templates/slider.php') ?>
        </div>
    </div>
</div>

<?php include('includes/footer.php'); ?>