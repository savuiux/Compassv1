<form class="form-container needs-validation w-75" novalidate aria-label="Forgot password form" action="send-reset-link.php" method="post">
    <input type="hidden" name="token" value="<?= htmlspecialchars(string: $token) ?>" />
    <div class="mb-2">
        <label for="email" class="small form-label text-gray">
            Email address or Username
        </label>

        <input type="email" class="small form-control" id="email" name="email" aria-required="true" placeholder="Username or Email" required />

        <div class="small invalid-feedback">
            Please enter a valid email address.
        </div>
    </div>

    <button type="submit" class="small custom-btn mt-1 w-100 mb-1" aria-label="Submit login form">
        Start Password Recovery
        <span></span><span></span><span></span><span></span>
    </button>

</form>