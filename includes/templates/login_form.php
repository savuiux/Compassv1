<form class="form-container needs-validation w-75" novalidate aria-label="Login form" action="login.php" method="post">
    <div class="mb-1">
        <label for="Username or Email" class="small form-label text-gray">
            Username or Email
        </label>
        <input type="email" class="small form-control" id="email" name="email" aria-required="true" placeholder="Username or Email" required />
        <div class="small invalid-feedback">
            Please enter a valid email address.
        </div>
    </div>
    <div class="mb-1 position-relative">
        <label for="password" class="small form-label text-gray">
            Password
        </label>
        <input type="password" class="small form-control" id="password" name="password" aria-required="true" placeholder="••••••••" required />
        <button type="button"
            class="btn position-absolute top-70 end-1 translate-middle-y me-2 p-0 border-0 bg-transparent"
            onclick="togglePasswordVisibility()" aria-label="Toggle password visibility">
            <i class="small fa-solid fa-eye-slash" id="eye-icon"></i>
        </button>
        <div class="small invalid-feedback">
            Please enter your password.
        </div>
    </div>
    <div class="small mb-3 d-flex justify-content-between align-items-center">
        <div class="small form-check">
        </div>
        <a href="forgot_password.php" class="small text-decoration-none">Forgot password?</a>
    </div>
    <button type="submit" class="small custom-btn w-100" aria-label="Submit login form">
        Login
        <span></span><span></span><span></span><span></span>
    </button>
    <div class="small text-center position-relative my-4 ">
        <hr class="small border border-secondary opacity-25" />
        <span class="small position-absolute top-50 start-50 translate-middle px-3 bg-white text-muted small">
            or continue with
        </span>
    </div>
    <div class="small d-flex flex-column align-items-center gap-2">
        <button type="button" class="small btn btn-outline-dark w-100" onclick="handleGoogleLogin()">
            <i class="small fab fa-google me-1"></i>
            Continue with Google
        </button>
    </div>
</form>