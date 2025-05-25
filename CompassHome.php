<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Compass Homepage</title>
    <link rel="stylesheet" href="z-styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>

<body>
    <header>
        <nav>
            <div class="logo">
                <a href="CompassHome.php" class="logo">
                    <img src="images/compass-logo.png" alt="Compass Logo" class="logo-image">
                </a>
            </div>
            <div class="menu-toggle">
                <i class="fas fa-bars"></i>
            </div>
            <ul class="nav-links">
                <li><a href="CompassHome.php" class="active">Home</a></li>
                <li><a href="Tripplanner.php">Trip Planner</a></li>
                <li><a href="Destinations.php">Destinations</a></li>
                <li><a href="Travel Logs.php">Travel Logs</a></li>
                <li class="nav-search">
                    <div class="search-container">
                        <input type="text" id="globalSearch" placeholder="Search adventures, destinations..." class="search-input">
                        <button type="button" id="searchBtn" class="search-btn-nav">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                    <div id="searchResults" class="search-results"></div>
                </li>
                <li><a href="logout.php">Logout »</a></li>
            </ul>
        </nav>
        <section class="hero" id="home">
            <video class="hero-image" autoplay muted loop playsinline aria-label="Compass adventure background video">
                <source src="/compass/images/compasshome.mp4" type="video/mp4">
            </video>
            <div class="hero-content">
                <h1>Welcome to Compass</h1>
                <p>currently we have over 1500 extreme adventures for you to drool over. From surfing 40 foot waves in the middle of the ocean to fishing for piranha in the amazon, we've got it all. so take your pick:</p>
                <div class="flight-search-container">
                    <div class="flight-search-tabs">
                        <ul class="nav-links2">
                            <li class="active"><a href="#" class="tab-btn active" data-tab="one-way">One-way</a></li>
                            <li><a href="#" class="tab-btn" data-tab="round-trip">Round-Trip</a></li>
                        </ul>
                    </div>
                    <form class="flight-search-form" id="flight-search-form">
                        <div class="form-group">
                            <label for="from">From</label>
                            <div class="input-with-icon">
                                <i class="fas fa-plane-departure"></i>
                                <input type="text" id="from" placeholder="Manila" readonly>
                                <ul class="dropdown-menu" id="from-dropdown">
                                    <li data-value="Manila, Philippines">Manila, Philippines</li>
                                    <li data-value="Cebu, Philippines">Cebu, Philippines</li>
                                    <li data-value="Davao, Philippines">Davao, Philippines</li>
                                    <li data-value="Bohol, Philippines">Bohol, Philippines</li>
                                    <li data-value="Palawan, Philippines">Palawan, Philippines</li>
                                </ul>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="to">To</label>
                            <div class="input-with-icon">
                                <i class="fas fa-plane-arrival"></i>
                                <input type="text" id="to" placeholder="Select Destination" readonly>
                                <ul class="dropdown-menu" id="to-dropdown">
                                    <li data-value="Tokyo, Japan">Tokyo, Japan</li>
                                    <li data-value="Bangkok, Thailand">Bangkok, Thailand</li>
                                    <li data-value="Singapore">Singapore</li>
                                    <li data-value="Sydney, Australia">Sydney, Australia</li>
                                    <li data-value="New York, USA">New York, USA</li>
                                </ul>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="depart">Depart</label>
                            <div class="input-with-icon">
                                <i class="fas fa-calendar-alt"></i>
                                <input type="text" id="depart" placeholder="Select Date" readonly>
                                <div class="calendar-container" id="calendar">
                                    <div class="calendar-header">
                                        <button type="button" id="prev-month">&lt;</button>
                                        <span id="month-year"></span>
                                        <button type="button" id="next-month">&gt;</button>
                                    </div>
                                    <div class="calendar-grid" id="calendar-grid">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="passengers">Passengers</label>
                            <div class="input-with-icon">
                                <i class="fas fa-users"></i>
                                <input type="text" id="passengers" placeholder="1 Passenger" readonly>
                                <ul class="passenger-dropdown" id="passenger-dropdown">
                                    <li data-value="1">1</li>
                                    <li data-value="2">2</li>
                                    <li data-value="3">3</li>
                            </div>
                        </div>
                        <div class="form-group search-button-group">
                            <label>&nbsp;</label>
                            <button type="submit" class="search-btn">Search Adventure</button>
                        </div>
                    </form>
                </div>
    </header>

    <!-- Stories Section -->
    <section class="stories-section">
        <div class="stories-container">
            <!-- Stories Row -->
            <div class="stories-wrapper">
                <!-- Story Items -->
                <div class="story-item" data-story-id="1">
                    <div class="story-circle">
                        <img src="images/hiking-icon.jpg" alt="Hiking Adventure">
                    </div>
                    <p class="story-title">Hiking</p>
                </div>

                <div class="story-item" data-story-id="2">
                    <div class="story-circle">
                        <img src="images/surfing-icon.jpg" alt="Surfing Adventure">
                    </div>
                    <p class="story-title">Surfing</p>
                </div>

                <div class="story-item" data-story-id="3">
                    <div class="story-circle">
                        <img src="images/climbing-icon.jpg" alt="Climbing Adventure">
                    </div>
                    <p class="story-title">Climbing</p>
                </div>

                <div class="story-item" data-story-id="4">
                    <div class="story-circle">
                        <img src="images/kayaking-icon.jpg" alt="Kayaking Adventure">
                    </div>
                    <p class="story-title">Kayaking</p>
                </div>

                <div class="story-item" data-story-id="5">
                    <div class="story-circle">
                        <img src="images/skiing-icon.jpg" alt="Skiing Adventure">
                    </div>
                    <p class="story-title">Skiing</p>
                </div>

                <div class="story-item" data-story-id="6">
                    <div class="story-circle">
                        <img src="images/diving-icon.jpg" alt="Diving Adventure">
                    </div>
                    <p class="story-title">Diving</p>
                </div>

                <!-- Navigation Arrows -->
                <button class="stories-nav stories-prev">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="stories-nav stories-next">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>

            <!-- Story Modal (Hidden by default) -->
            <div class="story-modal-overlay">
                <div class="story-modal">
                    <!-- Story Header -->
                    <div class="story-header">
                        <div class="story-progress">
                            <!-- Progress bars will be added dynamically -->
                        </div>
                        <div class="story-user">
                            <div class="story-user-pic">
                                <img src="images/Jude.png" alt="Compass">
                            </div>
                            <div class="story-user-info">
                                <span class="story-username">compass_adventures</span>
                                <span class="story-time">1h</span>
                            </div>
                        </div>
                        <div class="story-actions">
                            <button class="story-action-btn story-mute">
                                <i class="fas fa-volume-up"></i>
                            </button>
                            <button class="story-action-btn story-pause">
                                <i class="fas fa-pause"></i>
                            </button>
                            <button class="story-action-btn story-more">
                                <i class="fas fa-ellipsis-h"></i>
                            </button>
                        </div>
                        <button class="story-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <!-- Story Content -->
                    <div class="story-content">
                        <!-- Story slides will be added dynamically -->
                    </div>

                    <!-- Story Navigation -->
                    <button class="story-nav-btn story-prev">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="story-nav-btn story-next">
                        <i class="fas fa-chevron-right"></i>
                    </button>

                    <!-- Story Footer -->
                    <div class="story-footer">
                        <div class="story-reply">
                            <input type="text" placeholder="Reply to compass_adventures...">
                            <button class="story-send">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                        <button class="story-like">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
    </section>

    <section class="featured-destinations">
        <div class="section-title">
            <h2>Learn More About</h2>
        </div>
        <div class="destinations-container">
            <div class="destination-card">
                <div class="destination-img" style="background-image: url('/assets/images/pexels-1.jpeg');">
                </div>
                <div class="destination-info">
                    <h3>Fly Fishing in the Rocky Mountains</h3>
                    <p>You'll get a seasoned guide and lots of dehydrated ravioli.</p>
                    <div class="destination-meta">
                        <span><i class="fas fa-calendar-alt"></i> 7 Days</span>
                        <span><i class="fas fa-star"></i> 4.9</span>
                    </div>
                </div>
            </div>
            <div class="destination-card">
                <div class="destination-img" style="background-image: url('/assets/images/pexels-3.jpg');">
                </div>
                <div class="destination-info">
                    <h3>Level 5 Rapids</h3>
                    <p>Put your helmet on and grab your wetsuit. It's time to conquer Siberia.</p>
                    <div class="destination-meta">
                        <span><i class="fas fa-calendar-alt"></i> 5 Days</span>
                        <span><i class="fas fa-star"></i> 4.9</span>
                    </div>
                </div>
            </div>
            <div class="destination-card">
                <div class="destination-img" style="background-image: url('/assets/images/pexels-4.jpg');">
                </div>
                <div class="destination-info">
                    <h3>Puget Sound Kayaking</h3>
                    <p>One week of ocean kayaking in the Puget Sound.</p>
                    <div class="destination-meta">
                        <span><i class="fas fa-calendar-alt"></i> 6 Days</span>
                        <span><i class="fas fa-star"></i> 4.7</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="testimonial">
        <div class="section-title">
            <h2>Feature Destinations</h2>
        </div>
        <div class="destinations-container">
            <div class="testimonial">
                <div class="testimonial-content">
                    <div class="testimonial-img" style="background-image: url('/compass/images/yosemite.jpg');"></div>
                    <h3>Yosemite</h3>
                    <p>Experts only. Sign up now to scale El Capitan and Half Dome. Bring your own gear, We'll provide food and a one hour video on scaling these amazing rocks.</p>
                    <a href="#" class="btn">More Details</a>
                </div>
            </div>
        </div>
    </section>

    <div class="sticky-circle">
        <div class="plus">Devs</div>
        <div class="image-grid">
            <img src="/compass/images/Jude.png" alt="Image 1">
            <img src="/compass/images/Ruy.jpg" alt="Image 2">
            <img src="/compass/images/Funclara.jpg" alt="Image 3">
            <img src="/compass/images/Faron.jpg" alt="Image 4">
        </div>
    </div>
    <section class="why-choose-us">
        <div class="section-title">
            <h2>Why Choose Us</h2>
            <p>We make your travel experience unforgettable</p>
        </div>
        <div class="features-container">
            <div class="feature">
                <div class="feature-icon">
                    <i class="fas fa-map-marked-alt"></i>
                </div>
                <h3>Handpicked Destinations</h3>
                <p>We carefully select the most breathtaking and authentic destinations around the world.</p>
            </div>
            <div class="feature">
                <div class="feature-icon">
                    <i class="fas fa-dollar-sign"></i>
                </div>
                <h3>Best Price Guarantee</h3>
                <p>We promise the best rates and will match any lower price you find elsewhere.</p>
            </div>
            <div class="feature">
                <div class="feature-icon">
                    <i class="fas fa-headset"></i>
                </div>
                <h3>24/7 Support</h3>
                <p>Our dedicated team is available around the clock to assist with any questions or issues.</p>
            </div>
            <div class="feature">
                <div class="feature-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <h3>Secure Booking</h3>
                <p>Your payments and personal information are always protected with our secure system.</p>
            </div>
        </div>
    </section>
    <?php include('footer.php'); ?>
    <script src="z-script.js"></script>
    <script src="global-search.js"></script>
</body>

</html>
