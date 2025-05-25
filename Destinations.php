<?php

$listings = [
    [
        'id' => 1,
        'title' => 'California Surfing Safari',
        'description' => 'Summertime in Southern California, what could be better? Let us know what you\'re looking for and we\'ll find it and take you there. Do you want big, fast waves or gentle rollers? Do you prefer a slamming beach break or a long, peeling point break?
                          California\'s got it all so sign up now before summer\'s gone. You\'ll stay at the centrally located Newport Bonita in Newport Beach. From there you can strike out to Trestles, Malibu, Salt Creek, The Wedge, San Onofire, and a dozen
                          secret spots. Or, you can just walk out to the local beach breaks.',
        'features' => ['airfare', 'lodging', 'food', 'local guide'],
        'location' => 'Southern California',
        'price' => 960,
        'image' => 'assets/images/california-surfing-safari.jpeg',
        'duration' => '5 nights',
        'experience' => ['surfing'],
    ],
    [
        'id' => 2,
        'title' => 'New Zealand\'s Upper Hut',
        'description' => 'The Karapoti Trail, home to the Trek Karapoti Classic, twists around the Akatarawa Range and delivers 31 miles of technical single track and challenging fire road climbs. During the ride, there are several vistas to soothe those eyes while you reward your burning legs by taking a quick breather.
                          Upper Hutt is New Zealand\'s mountain biking hub. If you\'re looking for a group ride, stop by Mountain Trails bike shop. Or if you want a number plate on your handlebar, the Trek Karapoti Classic is scheduled for March 4, 2001.',
        'features' => ['airfare', 'lodging', 'food', 'local guide'],
        'location' => 'New Zealand',
        'price' => 1490,
        'image' => 'assets/images/new-zealand-upper-hut.jpeg',
        'duration' => '3 days',
        'experience' => ['biking'],
    ],
    [
        'id' => 3,
        'title' => 'Devils Tower Getaway',
        'description' => 'Wyoming\'s climbing Mecca, Devil\'s Tower, stands at 865 feet and offers the beginner or the expert climber 200 fun and challenging routes. (In fact, a 6-year-old boy conquered the Tower in 1994.) The array of cracks in the walls allows you to use your imagination as you test your climbing skills.
                          President Teddy Roosevelt named Devil\'s Tower the first national monument in 1906. Today, the park hosts approximately 450,000 visitors annually; 5,000 of those visitors are climbers. But beware, environmentalists are trying to limit that number so treat the park with respect.',
        'features' => ['airfare', 'lodging', 'food', 'local guide'],
        'location' => 'Wyoming, US',
        'price' => 740,
        'image' => 'assets/images/devils-tower-getaway.jpeg',
        'duration' => '5 days',
        'experience' => ['climbing'],
    ],
];

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Featured Destinations</title>
    <link rel="stylesheet" href="z-styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>

<body>
    <header>
        <nav>
            <div class="logo">
                <a href="index.php" class="logo">
                    <img src="images/compass-logo.png" alt="Compass Logo" class="logo-image">
                </a>
            </div>
            <div class="menu-toggle">
                <i class="fas fa-bars"></i>
            </div>
            <ul class="nav-links">
                <li><a href="index.php">Home</a></li>
                <li><a href="TripPlanner.php">Trip Planner</a></li>
                <li><a href="Destinations.php" class="active">Destinations</a></li>
                <li><a href="Travelog.php">Travel Logs</a></li>
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
            <video class="hero-image" autoplay muted loop playsinline aria-label="Destinations background video">
                <source src="/compass/images/Tripplanner.mp4" type="video/mp4">
            </video>
            <div class="hero-content">
                <h1>Featured Destinations</h1>
                <p>Compass works hard to bring you the best possible trips for your rugged lifestyle. Here you'll find our latest travel packages suited for the adventurous spirit.</p>
            </div>
        </section>
    </header>

    <div class="container flex">
        <aside class="filters">
            <!-- Budget Range -->
            <section class="filter-section range-group">
                <h3>Budget ($)</h3>
                <div class="relative">
                    <input type="range" id="budgetRange" min="700" max="2000" step="200" value="1900">
                    <span id="budgetValue">$1,900</span>
                </div>
                <div class="range-labels">
                    <span class="min">$700</span>
                    <span class="max">$2,000</span>
                </div>
            </section>

            <!-- Duration Selection -->
            <section class="filter-section duration-group">
                <h3>Duration</h3>
                <div class="duration-buttons">
                    <button type="button" class="duration-btn active" data-value="0">All / None</button>
                    <button type="button" class="duration-btn" data-value="3">3 days</button>
                    <button type="button" class="duration-btn" data-value="5">5 days</button>
                    <button type="button" class="duration-btn" data-value="5n">5 nights</button>
                </div>
            </section>

            <!-- Experience Type -->
            <section class="filter-section experience-group">
                <h3>Experience</h3>
                <label>
                    <input type="checkbox" id="allNoneCheckbox" class="inclusion" value="all">
                    All/None
                </label>
                <label>
                    <input type="checkbox" class="filter" value="surfing">
                    Surfing
                </label>
                <label>
                    <input type="checkbox" class="filter" value="biking">
                    Biking
                </label>
                <label>
                    <input type="checkbox" class="filter" value="climbing">
                    Climbing
                </label>
            </section>

            <!-- Destination Dropdown -->
            <section class="filter-section destination-group">
                <h3>Destination</h3>
                <select id="destinationSelect">
                    <option value="">Any</option>
                    <option value="new-zealand">New Zealand</option>
                    <option value="california">California</option>
                    <option value="devils-tower">United States</option>
                </select>
            </section>

            <!-- Inclusions -->
            <section class="filter-section inclusions-group">
                <h3>Inclusions</h3>
                <label>
                    <input type="checkbox" id="inclAll" class="inclusion" value="all">
                    All/None
                </label>
                <label>
                    <input type="checkbox" class="inclusion" value="airfare">
                    Airfare
                </label>
                <label>
                    <input type="checkbox" class="inclusion" value="food">
                    Food
                </label>
                <label>
                    <input type="checkbox" class="inclusion" value="lodging">
                    Lodging
                </label>
                <label>
                    <input type="checkbox" class="inclusion" value="guide">
                    Local guide
                </label>
            </section>

        </aside>

        <main class="listing-area-wrapper">
            <div class="controls">
                <div id="resultCount">Total destinations: <?= count($listings) ?></div>
                <div class="controls sort-and-view">
                    <!-- Sorter -->
                    <div class="sorter flex">
                        <label for="sortSelect">Sort by:</label>

                        <select id="sortSelect">
                            <option value="default">Our top picks</option>
                            <option vale="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="duration-asc">Duration: Short to Long</option>
                            <option value="duration-desc">Duration: Long to Short</option>
                        </select>
                    </div>
                    <!-- View Switcher -->
                    <div class="view-switcher">
                        <button type="button" class="view-btn active" data-view="list" aria-label="List view">
                            <!-- List icon (3 lines) -->
                            <svg width="16" height="16" viewBox="0 0 16 16">
                                <rect y="2" width="16" height="2" fill="currentColor" />
                                <rect y="7" width="16" height="2" fill="currentColor" />
                                <rect y="12" width="16" height="2" fill="currentColor" />
                            </svg>
                        </button>
                        <button type="button" class="view-btn" data-view="grid" aria-label="Grid view">
                            <!-- Grid icon (2×2) -->
                            <svg width="16" height="16" viewBox="0 0 16 16">
                                <rect x="1" y="1" width="6" height="6" fill="currentColor" />
                                <rect x="9" y="1" width="6" height="6" fill="currentColor" />
                                <rect x="1" y="9" width="6" height="6" fill="currentColor" />
                                <rect x="9" y="9" width="6" height="6" fill="currentColor" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="listing-area" id="listingArea">
                <?php foreach ($listings as $item): ?>
                    <?php $features = $item['features']; ?>
                    <div class="listing-card"
                        data-price="<?= $item['price'] ?>"
                        data-experience="<?= implode(',', $item['experience']) ?>"
                        data-duration="<?= htmlspecialchars($item['duration']) ?>">
                        <img class="listing-img" src="<?= $item['image'] ?>" alt="<?= htmlspecialchars($item['title']) ?>">
                        <div class="listing-contents">
                            <div class="listing-header">
                                <h4><?= htmlspecialchars($item['title']) ?></h4>
                                <p class="listing-price">$<?= number_format($item['price']) ?></p>
                            </div>
                            <p class="gray listing-subdetails"><?= htmlspecialchars($item['location']) ?>, <?= htmlspecialchars($item['duration']) ?></p>
                            <?php $features ?>
                            <?php if (!empty($features)): ?>
                                <div class="listing-pills">
                                    <?php foreach ($features as $feature): ?>
                                        <span class="pill pill-<?php echo strtolower(str_replace(' ', '-', $feature)); ?>">
                                            <img src="assets/icons/<?php echo strtolower(str_replace(' ', '-', $feature)); ?>.svg" alt="" aria-hidden="true" class="pill-icon">
                                            <?php echo htmlspecialchars($feature); ?>
                                        </span>
                                    <?php endforeach; ?>
                                </div>
                            <?php endif; ?>

                            <p class="listing-description"><?= htmlspecialchars($item['description']) ?></p>

                            <a class="custom-btn" aria-label="More details">
                                More details →
                                <span></span><span></span><span></span><span></span>
                            </a>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </main>
    </div>

    <div class="sticky-circle">
        <div class="plus">Devs</div>
        <div class="image-grid">
            <img src="/compass/images/Jude.png" alt="Image 1">
            <img src="/compass/images/Ruy.jpg" alt="Image 2">
            <img src="/compass/images/Funclara.jpg" alt="Image 3">
            <img src="/compass/images/Faron.jpg" alt="Image 4">
        </div>
    </div>

    <script src="destinations-script.js"></script>
    <!-- <script src="global-search.js"></script> -->
    <footer>
    <div class="footer-container">
        <div class="footer-column">
            <div class="logo">
                <a href="index.php" class="logo">
                    <img src="images/compass-logo.png" alt="Compass Logo" class="logo-image">
                </a>
            </div>
            <div class="social-icons">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-pinterest"></i></a>
            </div>
        </div>
        <div class="footer-column">
            <h4>Quick Links</h4>
            <ul>
                <li><a href="CompassHome.php">Home</a></li>
                <li><a href="Tripplanner.php">Trip Planner</a></li>
                <li><a href="Destinations.php">Destinations</a></li>
                <li><a href="Travelog.php">Travel Logs</a></li>
            </ul>
        </div>
        <div class="footer-column">
            <h4>Popular Destinations</h4>
            <ul>
                <li><a href="destinations.php?id=1">Bali, Indonesia</a></li>
                <li><a href="destinations.php?id=2">Santorini, Greece</a></li>
                <li><a href="destinations.php?id=3">Kyoto, Japan</a></li>
                <li><a href="destinations.php?id=4">Paris, France</a></li>
                <li><a href="destinations.php?id=5">Machu Picchu, Peru</a></li>
            </ul>
        </div>
        <div class="footer-column">
            <h4>Contact Us</h4>
            <ul class="contact-info">
                <li><i class="fas fa-map-marker-alt"></i> Rizal Technological University</li>
                <li><i class="fas fa-phone"></i> +6399999999</li>
                <li><i class="fas fa-envelope"></i> @rtu.edu.ph</li>
            </ul>
        </div>
    </div>
    <div class="footer-bottom">
        <p>Your trusted partner for unforgettable travel experiences around the world.</p>
    </div>
</footer>