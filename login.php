<?php
session_start();

$use_slider = true;
$use_fa = true;

$conn = new mysqli("localhost", "root", "", "compass");
if ($conn->connect_error) {
    $error_message = "Database connection failed.";
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $remember = isset($_POST['remember']);

    if (!isset($_SESSION['login_attempts'])) {
        $_SESSION['login_attempts'] = 0;
    }

    $lockout_duration = 15 * 60;
    if (isset($_SESSION['lockout_time']) && time() < $_SESSION['lockout_time'] + $lockout_duration) {
        $remaining_time = ceil(($_SESSION['lockout  _time'] + $lockout_duration - time()) / 60);
        $error_message = "Too many failed login attempts. Please try again in $remaining_time minutes.";
    } elseif (empty($email) || empty($password)) {
        $error_message = "Email and password are required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error_message = "Invalid email format.";
    } else {
        $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows === 0) {
            $_SESSION['login_attempts']++;
            if ($_SESSION['login_attempts'] >= 5) {
                $_SESSION['lockout_time'] = time();
                $error_message = "Too many failed login attempts. Account locked for 15 minutes.";
            } else {
                $error_message = "Invalid email or password. " . (5 - $_SESSION['login_attempts']) . " attempts remaining.";
            }
            $stmt->close();
        } else {
            $stmt->bind_result($userId, $username, $hashedPassword);
            $stmt->fetch();

            if (!password_verify($password, $hashedPassword)) {
                $_SESSION['login_attempts']++;
                if ($_SESSION['login_attempts'] >= 5) {
                    $_SESSION['lockout_time'] = time();
                    $error_message = "Too many failed login attempts. Account locked for 15 minutes.";
                } else {
                    $error_message = "Invalid email or password. " . (5 - $_SESSION['login_attempts']) . " attempts remaining.";
                }
                $stmt->close();
            } else {
                $_SESSION['login_attempts'] = 0;
                unset($_SESSION['lockout_time']);

                $_SESSION['user_id'] = $userId;
                $_SESSION['username'] = $username;
                $_SESSION['email'] = $email;

                if ($remember) {
                    $token = bin2hex(random_bytes(32));
                    setcookie('remember_me', $token, time() + (30 * 24 * 60 * 60), '/', '', true, true);
                    $stmt = $conn->prepare("INSERT INTO user_tokens (user_id, token, expires_at) VALUES (?, ?, ?)");
                    $expiresAt = date('Y-m-d H:i:s', time() + (30 * 24 * 60 * 60));
                    $stmt->bind_param("iss", $userId, $token, $expiresAt);
                    $stmt->execute();
                    $stmt->close();
                }

                $stmt->close();
                $conn->close();

                $success_message = "<br><a href='/compass/CompassHome.php'";
            }
        }
    }
}

function is_mobile()
{
    return preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $_SERVER["HTTP_USER_AGENT"]);
}
?>

<?php include('includes/header.php'); ?>

<?php if (isset($success_message)): ?>
    <meta http-equiv="refresh" content="3;url=/compass/CompassHome.php">
<?php endif; ?>

<!-- Including styles.css for popup styling -->
<link rel="stylesheet" href="styles.css">

<!-- Loading Screen -->
<div id="loading-screen">
    <div class="compass-container">
        <div class="compass">
            <div class="compass-inner">
                <div class="compass-arrow"></div>
                <div class="compass-rose">
                    <div class="compass-rose-line north"></div>
                    <div class="compass-rose-line east"></div>
                    <div class="compass-rose-line south"></div>
                    <div class="compass-rose-line west"></div>
                    <div class="compass-label north">N</div>
                    <div class="compass-label east">E</div>
                    <div class="compass-label south">S</div>
                    <div class="compass-label west">W</div>
                </div>
            </div>
        </div>
    </div>
    <div class="loading-text">Loading Compass</div>
    <div class="loading-bar-container">
        <div class="loading-bar"></div>
    </div>
</div>

<!-- Main Content (will be shown after loading) -->
<div id="main-content" style="display: none;">
    <div class="container-fluid p-0 vh-100 d-flex align-items-center">
        <div class="vh-100 d-flex align-items-center overflow-hidden">
            <div class="d-flex w-100 h-100 gap-6 position-relative">
                <div class="ps-5 w-40 flex-shrink-0 d-flex flex-column justify-content-center align-items-center h-100 cloud-edge judeng">
                    <img class="w-25 mb-2" src="assets/images/compass-logo.png" alt="Compass Logo">
                    <div class="login-content d-flex flex-column gy-3 mb-1">
                        <h1 class="display-6 fw-bold m-0 text-dark mb-1">Login to Compass</h1>
                        <p class="text-center text-gray small mb-3">
                            Welcome to Compass! Please enter your details.
                        </p>
                    </div>
                    <?php if (!isset($success_message)): ?>
                        <?php include 'includes/templates/login_form.php'; ?>
                        <div class="small w-75 mt-2 text-center pb-4 z-5">
                            Don't have an account yet?
                            <a href="register.php" class="text-decoration-none register-link">Register</a>
                        </div>
                    <?php endif; ?>
                    <!-- Popup for Alerts -->
                    <div id="popup" class="popup" style="display: <?php echo (isset($error_message) || isset($success_message)) ? 'flex' : 'none'; ?>" onclick="closePopup(event)">
                        <div class="popup-content">
                            <button class="close-btn" onclick="closePopup(event)">×</button>
                            <div class="popup-body">
                                <h2 class="font-header <?php echo isset($success_message) ? 'text-success' : 'text-danger'; ?>">
                                </h2>
                                <p class="font-body <?php echo isset($success_message) ? 'text-graphite' : 'text-danger'; ?>">
                                    <?php echo isset($success_message) ? $success_message : htmlspecialchars($error_message); ?>
                                </p>
                                <?php if (isset($success_message)): ?>
                                    <button class="popup-button" onclick="window.location.href='/compass/CompassHome.php'">Go to Homepage</button>
                                <?php else: ?>
                                    <button class="popup-button" onclick="closePopup(event)">Try Again</button>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                </div>
                <?php if ($use_slider && !is_mobile()): ?>
                    <?php include('includes/templates/slider.php') ?>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>

<?php include('includes/footer.php'); ?>
