<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trip Planner</title>
    <link rel="stylesheet" href="z-styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
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
                <li><a href="CompassHome.php">Home</a></li>
                <li><a href="Tripplanner.php" class="active">Trip Planner</a></li>
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
            <video class="hero-image" autoplay muted loop playsinline aria-label="Adventure planning background video">
                <source src="/compass/images/Tripplanner.mp4" type="video/mp4">
            </video>
            <div class="hero-content">
                <h1>Trip Planner</h1>
            </div>
        </section>
    </header>

    <section class="trip-planner-section">
        <div class="section-title">
            <h2>Adventure Planner</h2>
            <p>Either Select a region on the map or type it into the fields below:</p>
            
        </div>

        <div class="world-map-container">
            <div class="map-controls">
                <div class="map-filter">
                    <label for="activityFilter">Filter by Activity:</label>
                    <select id="activityFilter">
                        <option value="all">All Activities</option>
                        <option value="hiking">Hiking</option>
                        <option value="mountain-biking">Mountain Biking</option>
                        <option value="kayaking">Kayaking</option>
                        <option value="skiing">Skiing</option>
                        <option value="fishing">Fishing</option>
                        <option value="surfing">Surfing</option>
                    </select>
                </div>

                <div class="map-filter">
                    <label for="regionFilter">Filter by Region:</label>
                    <select id="regionFilter">
                        <option value="all">All Regions</option>
                        <option value="north-america">North America</option>
                        <option value="south-america">South America</option>
                        <option value="europe">Europe</option>
                        <option value="asia">Asia</option>
                        <option value="africa">Africa</option>
                        <option value="oceania">Oceania</option>
                    </select>
                </div>

                <div class="map-legend">
                    <div class="legend-item">
                        <div class="legend-color" style="background-color: #3b82f6;"></div>
                        <span>Surfing</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background-color: #4ecdc4;"></div>
                        <span>Kayaking</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background-color: #45b7d1;"></div>
                        <span>Skiing</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background-color: #96ceb4;"></div>
                        <span>Hiking</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background-color: #feca57;"></div>
                        <span>Mountain Biking</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background-color: #ff9ff3;"></div>
                        <span>Fishing</span>
                    </div>
                </div>
            </div>
            <div id="worldMap"></div>
        </div>
    </section>

    <div class="planner-main">
        <div class="form-and-plan-container">
            <div class="form-container">
                <form id="adventure-form">
                    <div class="form-section">
                        <h3 class="section-title">Destination</h3>
                        <div class="form-group">
                            <h4>City or Closest Major City <span class="required">*</span></h4>
                            <p>Either select a region on the map above or type it into the fields below:</p>
                            
                            <select id="city" name="city" required>
                                <option value="">Select a city</option>
                                <option value="south-lake-tahoe">South Lake Tahoe</option>
                                <option value="moab">Moab</option>
                                <option value="santa-cruz">Santa Cruz</option>
                                <option value="jackson">Jackson</option>
                                <option value="islamorada">Islamorada</option>
                                <option value="mariposa">Mariposa</option>
                                <option value="banff">Banff</option>
                                <option value="whistler">Whistler</option>
                                <option value="tofino">Tofino</option>
                                <option value="pacuare-river">Pacuare River</option>
                                <option value="cozumel">Cozumel</option>
                                <option value="el-chalten">El Chaltén (Argentina) / Puerto Natales (Chile)</option>
                                <option value="san-carlos-de-bariloche">San Carlos de Bariloche</option>
                                <option value="huaraz">Huaraz</option>
                                <option value="angra-dos-reis">Angra dos Reis</option>
                                <option value="chamonix-mont-blanc">Chamonix-Mont-Blanc</option>
                                <option value="cortina-dampezzo">Cortina d'Ampezzo</option>
                                <option value="zermatt">Zermatt</option>
                                <option value="innsbruck">Innsbruck</option>
                                <option value="interlaken">Interlaken</option>
                                <option value="keswick">Keswick</option>
                                <option value="funchal">Funchal</option>
                                <option value="cape-town">Cape Town</option>
                                <option value="underberg">Underberg</option>
                                <option value="victoria-mahe">Victoria (Mahé)</option>
                                <option value="niseko">Niseko</option>
                                <option value="denpasar">Denpasar</option>
                                <option value="alappuzha">Alappuzha (Alleppey)</option>
                                <option value="kathmandu">Kathmandu</option>
                                <option value="queenstown">Queenstown</option>
                                <option value="hobart">Hobart</option>
                                <option value="gold-coast">Gold Coast</option>
                            </select>

                            <select id="country" name="country" required>
                                <option value="">Select a country</option>
                                <option value="usa-california-nevada">USA (California/Nevada) / North America</option>
                                <option value="usa-utah">USA (Utah) / North America</option>
                                <option value="usa-california-surf">USA (California) / North America</option>
                                <option value="usa-wyoming">USA (Wyoming) / North America</option>
                                <option value="usa-florida-keys">USA (Florida Keys) / North America</option>
                                <option value="usa-california-yosemite">USA (California) / North America</option>
                                <option value="canada-alberta">Canada (Alberta) / North America</option>
                                <option value="canada-british-columbia">Canada (British Columbia) / North America</option>
                                <option value="canada-british-columbia-surf">Canada (British Columbia) / North America</option>
                                <option value="costa-rica">Costa Rica / North America</option>
                                <option value="mexico">Mexico / North America</option>
                                <option value="chile-argentina">Chile/Argentina / South America</option>
                                <option value="argentina">Argentina / South America</option>
                                <option value="peru">Peru / South America</option>
                                <option value="brazil">Brazil / South America</option>
                                <option value="france">France / Europe</option>
                                <option value="italy">Italy / Europe</option>
                                <option value="switzerland">Switzerland / Europe</option>
                                <option value="austria">Austria / Europe</option>
                                <option value="switzerland-lakes">Switzerland / Europe</option>
                                <option value="england-uk">England, UK / Europe</option>
                                <option value="portugal">Portugal / Europe</option>
                                <option value="south-africa">South Africa / Africa</option>
                                <option value="south-africa-drakensberg">South Africa / Africa</option>
                                <option value="seychelles">Seychelles / Africa</option>
                                <option value="japan">Japan / Asia</option>
                                <option value="indonesia">Indonesia / Asia</option>
                                <option value="india">India / Asia</option>
                                <option value="nepal">Nepal / Asia</option>
                                <option value="new-zealand">New Zealand / Oceania</option>
                                <option value="australia-tasmania">Australia / Oceania</option>
                                <option value="australia-queensland">Australia / Oceania</option>
                            </select>
                            <div class="error-message">Please select a country or region</div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3 class="section-title">Activity</h3>
                        <p>Tell us what kinds of things you will be doing there:</p>
                        <div class="activity-grid">
                            <div class="activity-option">
                                <input type="radio" id="hiking" name="activity" value="Hiking">
                                <label for="hiking" class="activity-label">Hiking</label>
                            </div>
                            <div class="activity-option">
                                <input type="radio" id="mountain-biking" name="activity" value="Mountain Biking">
                                <label for="mountain-biking" class="activity-label">Mountain Biking</label>
                            </div>
                            <div class="activity-option">
                                <input type="radio" id="kayaking" name="activity" value="Kayaking">
                                <label for="kayaking" class="activity-label">Kayaking</label>
                            </div>
                            <div class="activity-option">
                                <input type="radio" id="skiing" name="activity" value="Skiing">
                                <label for="skiing" class="activity-label">Skiing</label>
                            </div>
                            <div class="activity-option">
                                <input type="radio" id="fishing" name="activity" value="Fishing">
                                <label for="fishing" class="activity-label">Fishing</label>
                            </div>
                            <div class="activity-option">
                                <input type="radio" id="surfing" name="activity" value="Surfing">
                                <label for="surfing" class="activity-label">Surfing</label>
                            </div>
                        </div>
                        <div class="error-message" id="activity-error">Please select an activity</div>
                    </div>

                    <div class="form-section">
                        <h3 class="section-title">Information</h3>
                        <p>What kind of information do you want about this trip?</p>
                        <div class="info-grid">
                            <div class="checkbox-option">
                                <input type="checkbox" id="transportation" name="info" value="Transportation">
                                <label for="transportation" class="checkbox-label">Transportation</label>
                            </div>
                            <div class="checkbox-option">
                                <input type="checkbox" id="health" name="info" value="Health">
                                <label for="health" class="checkbox-label">Health</label>
                            </div>
                            <div class="checkbox-option">
                                <input type="checkbox" id="weather" name="info" value="Weather">
                                <label for="weather" class="checkbox-label">Weather</label>
                            </div>
                            <div class="checkbox-option">
                                <input type="checkbox" id="gear" name="info" value="Gear">
                                <label for="gear" class="checkbox-label">Gear</label>
                            </div>
                            <div class="checkbox-option">
                                <input type="checkbox" id="political" name="info" value="Political Info">
                                <label for="political" class="checkbox-label">Political Info</label>
                            </div>
                            <div class="checkbox-option">
                                <input type="checkbox" id="activity-specific" name="info" value="Activity Specific">
                                <label for="activity-specific" class="checkbox-label">Activity Specific</label>
                            </div>
                        </div>
                        <div class="error-message" id="information-error">Please select at least one information type</div>
                    </div>

                    <button type="submit" class="submit-btn">Plan My Adventure</button>
                </form>
                <div class="success-message" style="display: none;">Your travel plan request has been submitted successfully! We'll get back to you with detailed information soon.</div>
            </div>

            <div class="current-plan">
                <h3>Your Adventure Plan</h3>
                <div class="timeline-empty">
                    <i class="fas fa-route"></i>
                    <p>Your adventure plan is empty. Add experiences from the list above to start building your itinerary.</p>
                </div>
                <div class="timeline-items" style="display: none;">
                    
                </div>
                <div class="plan-actions">
                    <button class="btn" id="save-plan" disabled>Save Plan</button>
                    <button class="btn" id="share-plan" disabled>Share Plan</button>
                </div>
            </div>
        </div>
    </div>

    <section class="why-choose-us">
        <div class="section-title">
            <h2>Why Plan With Compass</h2>
            <p>We make your adventure planning seamless and exciting</p>
        </div>
        <div class="features-container">
            <div class="feature">
                <div class="feature-icon">
                    <i class="fas fa-route"></i>
                </div>
                <h3>Expert Itineraries</h3>
                <p>Our adventure specialists craft perfect itineraries based on your preferences and skill level.</p>
            </div>
            <div class="feature">
                <div class="feature-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <h3>Safety First</h3>
                <p>All our adventures include comprehensive safety briefings and equipment from trusted providers.</p>
            </div>
            <div class="feature">
                <div class="feature-icon">
                    <i class="fas fa-medal"></i>
                </div>
                <h3>Certified Guides</h3>
                <p>Experience adventures with internationally certified guides who know the terrain intimately.</p>
            </div>
            <div class="feature">
                <div class="feature-icon">
                    <i class="fas fa-hand-holding-heart"></i>
                </div>
                <h3>Sustainable Tourism</h3>
                <p>We partner with eco-conscious operators who respect local environments and communities.</p>
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

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script src="z-script.js"></script>
    <?php include('footer.php'); ?>
</body>

</html>
