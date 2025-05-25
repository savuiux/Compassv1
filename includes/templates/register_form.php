<form class="small form-container needs-validation w-75" novalidate aria-label="Register form" action="register.php" method="post">
    <div class="mb-2">
        <label for="username" class="small form-label text-gray">
            Username
        </label>
        <input type="text" class="small form-control" id="username" name="username" aria-required="true" placeholder="Username" required />
        <div class="invalid-feedback">
            Please enter your username.
        </div>
    </div>
    <div class="mb-2">
        <label for="email" class="small form-label text-gray">
            Email address
        </label>
        <input type="email" class="small form-control" id="email" name="email" aria-required="true" placeholder="Email" required />
        <div class="invalid-feedback">
            Please enter a valid email address.
        </div>
    </div>
    <div class="mb-2 position-relative">
        <label for="password" class="small form-label text-gray">
            Password
        </label>
        <input type="password" class="small form-control" id="password" name="password" aria-required="true" placeholder="••••••••" required />
        <button type="button"
            class="btn position-absolute top-70 end-1 translate-middle-y me-2 p-0 border-0 bg-transparent"
            onclick="togglePasswordVisibility('password', 'eye-icon')"
            aria-label="Toggle password visibility">
            <i class="fa-solid fa-eye-slash" id="eye-icon"></i>
        </button>
        <div class="invalid-feedback">
            Please enter your password.
        </div>
        <div class="password-strength-container">
            <div class="password-strength-label" id="password-strength-label">Password strength: Weak</div>
            <div class="password-strength-bar-container">
                <div class="password-strength-bar" id="password-strength-bar"></div>
            </div>
        </div>
    </div>
    <button type="submit" class="small mt-5 custom-btn w-100" aria-label="Submit register form">
        Register
        <span></span><span></span><span></span><span></span>
    </button>
</form>