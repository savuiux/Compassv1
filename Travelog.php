<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Travelog</title>
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
                <li><a href="Destinations.php">Destinations</a></li>
                <li><a href="Travelog.php" class="active">Travel Logs</a></li>
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
            <video class="hero-image" autoplay muted loop playsinline aria-label="Travel logs background video">
                <source src="/images/journal.mp4" type="video/mp4">
            </video>
            <div class="hero-content">
                <h1>Adventure Journals</h1>
                <p>Real stories from extreme adventurers around the world. Get inspired by their journeys, challenges, and triumphs in some of the most remote and thrilling destinations on Earth.</p>
            </div>
        </section>
    </header>

    <section class="travelog-intro">
        <div class="section-title">
            <h2>Adventure Stories</h2>
            <p>Authentic experiences from fellow thrill-seekers</p>
        </div>
        <div class="travelog-actions">
            <button id="create-log" class="btn"><i class="fas fa-plus"></i> Create Your Log</button>
            <div class="travelog-search">
                <input type="text" id="search-logs" placeholder="Search travel logs...">
                <button id="search-button"><i class="fas fa-search"></i></button>
            </div>
            <div class="travelog-filter">
                <select id="log-filter">
                    <option value="all">All Categories</option>
                    <option value="surfing">Surfing</option>
                    <option value="climbing">Climbing</option>
                    <option value="hiking">Hiking</option>
                    <option value="diving">Diving</option>
                    <option value="skiing">Skiing</option>
                </select>
            </div>
        </div>
    </section>

    <section class="featured-logs">
        <div class="section-title">
            <h2>Featured Journals</h2>
        </div>
        <div class="featured-logs-slider">
            <div class="featured-log">
                <div class="featured-log-img" style="background-image: url('/assets/images/everest-log.jpg');"></div>
                <div class="featured-log-content">
                    <div class="log-badge">Mountaineering</div>
                    <h3>Summit Day: My Everest Journey</h3>
                    <p class="log-excerpt">After two months on the mountain, the day finally arrived. The weather window opened, and at 2 AM, we began our push from Camp 4 to the summit...</p>
                    <div class="log-meta">
                        <div class="log-author">
                            <img src="/assets/images/author1.jpg" alt="Alex Honnold" class="author-img">
                            <span>Alex Honnold</span>
                        </div>
                        <div class="log-date">May 15, 2023</div>
                    </div>
                    <a href="#" class="btn">Read Full Story</a>
                </div>
            </div>
        </div>
    </section>

    <section class="travelog-grid">
        <div class="logs-container">
            <div class="log-card" data-category="surfing">
                <div class="log-card-img" style="background-image: url('/assets/images/surf-log.jpg');"></div>
                <div class="log-card-content">
                    <div class="log-badge">Surfing</div>
                    <h3>Chasing the Perfect Wave in Teahupo'o</h3>
                    <p class="log-excerpt">The wave at Teahupo'o is unlike anything I've ever surfed. It's not just the size, but the way it breaks over a shallow reef...</p>
                    <div class="log-meta">
                        <div class="log-author">
                            <img src="/assets/images/author2.jpg" alt="Kelly Slater" class="author-img">
                            <span>Kelly Slater</span>
                        </div>
                        <div class="log-date">June 3, 2023</div>
                    </div>
                    <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <div class="log-card" data-category="climbing">
                <div class="log-card-img" style="background-image: url('/assets/images/climb-log.jpg');"></div>
                <div class="log-card-content">
                    <div class="log-badge">Climbing</div>
                    <h3>Free Soloing El Capitan: A Mental Journey</h3>
                    <p class="log-excerpt">The physical challenge of climbing 3,000 feet without ropes is immense, but the mental battle is where the real challenge lies...</p>
                    <div class="log-meta">
                        <div class="log-author">
                            <img src="/assets/images/author3.jpg" alt="Lynn Hill" class="author-img">
                            <span>Lynn Hill</span>
                        </div>
                        <div class="log-date">April 12, 2023</div>
                    </div>
                    <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <div class="log-card" data-category="diving">
                <div class="log-card-img" style="background-image: url('/assets/images/dive-log.jpg');"></div>
                <div class="log-card-content">
                    <div class="log-badge">Diving</div>
                    <h3>Into the Blue Hole: Diving Belize's Underwater Sinkhole</h3>
                    <p class="log-excerpt">Descending into the Great Blue Hole is like entering another world. The crystal clear waters suddenly turn deep blue...</p>
                    <div class="log-meta">
                        <div class="log-author">
                            <img src="/assets/images/author4.jpg" alt="Jacques Cousteau" class="author-img">
                            <span>Jacques Cousteau</span>
                        </div>
                        <div class="log-date">July 22, 2023</div>
                    </div>
                    <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <div class="log-card" data-category="hiking">
                <div class="log-card-img" style="background-image: url('/assets/images/hike-log.jpg');"></div>
                <div class="log-card-content">
                    <div class="log-badge">Hiking</div>
                    <h3>Thru-Hiking the Appalachian Trail: 2,190 Miles of Solitude</h3>
                    <p class="log-excerpt">Six months, fourteen states, and countless blisters later, I finally reached the summit of Mount Katahdin...</p>
                    <div class="log-meta">
                        <div class="log-author">
                            <img src="/assets/images/author5.jpg" alt="Cheryl Strayed" class="author-img">
                            <span>Cheryl Strayed</span>
                        </div>
                        <div class="log-date">August 5, 2023</div>
                    </div>
                    <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <div class="log-card" data-category="skiing">
                <div class="log-card-img" style="background-image: url('/assets/images/ski-log.jpg');"></div>
                <div class="log-card-content">
                    <div class="log-badge">Skiing</div>
                    <h3>Heli-Skiing in Alaska: Powder Paradise</h3>
                    <p class="log-excerpt">The helicopter dropped us on a ridge with 360-degree views of untouched powder fields. No lift lines, no tracks, just pure wilderness...</p>
                    <div class="log-meta">
                        <div class="log-author">
                            <img src="/assets/images/author6.jpg" alt="Lindsey Vonn" class="author-img">
                            <span>Lindsey Vonn</span>
                        </div>
                        <div class="log-date">March 18, 2023</div>
                    </div>
                    <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <div class="log-card" data-category="climbing">
                <div class="log-card-img" style="background-image: url('/assets/images/ice-log.jpg');"></div>
                <div class="log-card-content">
                    <div class="log-badge">Ice Climbing</div>
                    <h3>Frozen Waterfalls: Ice Climbing in Norway</h3>
                    <p class="log-excerpt">The sound of ice axes striking solid ice echoed through the frozen valley. Each swing and kick required perfect precision...</p>
                    <div class="log-meta">
                        <div class="log-author">
                            <img src="/assets/images/author7.jpg" alt="Conrad Anker" class="author-img">
                            <span>Conrad Anker</span>
                        </div>
                        <div class="log-date">February 9, 2023</div>
                    </div>
                    <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
        <div class="pagination">
            <button class="pagination-btn" disabled><i class="fas fa-chevron-left"></i></button>
            <button class="pagination-btn active">1</button>
            <button class="pagination-btn">2</button>
            <button class="pagination-btn">3</button>
            <button class="pagination-btn"><i class="fas fa-chevron-right"></i></button>
        </div>
    </section>

    <section class="community-section">
        <div class="section-title">
            <h2>Join Our Adventure Community</h2>
            <p>Connect with fellow adventurers, share your stories, and get inspired</p>
        </div>
        <div class="community-features">
            <div class="community-feature">
                <div class="community-icon">
                    <i class="fas fa-users"></i>
                </div>
                <h3>Connect</h3>
                <p>Find adventure partners and make lifelong friendships with like-minded thrill-seekers.</p>
            </div>
            <div class="community-feature">
                <div class="community-icon">
                    <i class="fas fa-share-alt"></i>
                </div>
                <h3>Share</h3>
                <p>Document your journeys and inspire others with your unique adventure stories.</p>
            </div>
            <div class="community-feature">
                <div class="community-icon">
                    <i class="fas fa-lightbulb"></i>
                </div>
                <h3>Learn</h3>
                <p>Gain insights from experienced adventurers and improve your skills.</p>
            </div>
        </div>
        <div class="community-cta">
            <a href="#" class="btn">Join Community</a>
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

    <?php include('footer.php'); ?>

    <script src="z-script.js"></script>
    <script src="travelog.js"></script>
    <script src="global-search.js"></script>
</body>

</html>
