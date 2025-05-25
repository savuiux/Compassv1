document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    document.addEventListener("click", (event) => {
      const isClickInsideNav = navLinks.contains(event.target);
      const isClickOnToggle = menuToggle.contains(event.target);

      if (
        !isClickInsideNav &&
        !isClickOnToggle &&
        navLinks.classList.contains("active")
      ) {
        navLinks.classList.remove("active");
      }
    });
  }

  const destinationCards = document.querySelectorAll(".destination-card");
  destinationCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      this.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.2)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
    });
  });

  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      alert("Thank you for subscribing to our newsletter!");
      emailInput.value = "";
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Scroll animations
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".feature, .destination-card, .section-title"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  document
    .querySelectorAll(".feature, .destination-card, .section-title")
    .forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();

  const stickyCircle = document.querySelector(".sticky-circle");
  if (stickyCircle) {
    stickyCircle.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-btn");
  const form = document.querySelector("#flight-search-form");

  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      tabs.forEach((t) => {
        t.classList.remove("active");
        t.parentElement.classList.remove("active");
      });
      tab.classList.add("active");
      tab.parentElement.classList.add("active");

      if (tab.dataset.tab === "multi-city") {
        console.log("Multi-City tab selected");
      }
    });
  });

  const fromInput = document.querySelector("#from");
  const toInput = document.querySelector("#to");
  const fromDropdown = document.querySelector("#from-dropdown");
  const toDropdown = document.querySelector("#to-dropdown");

  function toggleDropdown(dropdown) {
    if (dropdown) {
      dropdown.classList.toggle("show");
    }
  }

  function closeAllDropdowns() {
    document
      .querySelectorAll(
        ".dropdown-menu, .calendar-container, .passenger-dropdown"
      )
      .forEach((menu) => menu.classList.remove("show"));
  }

  function positionIndicator() {
    const { min, max, value } = budgetRange;
    const val = Number(value);
    const percent = (val - Number(min)) / (Number(max) - Number(min));

    const { width: sliderWidth } = budgetRange.getBoundingClientRect();
    const thumbSize = 20;
    const offset = percent * (sliderWidth - thumbSize) + thumbSize / 2;

    budgetValue.style.left = `${offset}px`;
    budgetValue.textContent = `$${val.toLocaleString("en-US")}`;
  }

  budgetRange.addEventListener("input", () => {
    positionIndicator();
    applyFilters();
  });

  window.addEventListener("resize", positionIndicator);

  if (fromInput && fromDropdown) {
    fromInput.addEventListener("click", () => {
      closeAllDropdowns();
      toggleDropdown(fromDropdown);
    });
  }

  if (toInput && toDropdown) {
    toInput.addEventListener("click", () => {
      closeAllDropdowns();
      toggleDropdown(toDropdown);
    });
  }

  if (fromDropdown) {
    fromDropdown.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", () => {
        if (fromInput) {
          fromInput.value = item.dataset.value;
        }
        toggleDropdown(fromDropdown);
      });
    });
  }

  if (toDropdown) {
    toDropdown.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", () => {
        if (toInput) {
          toInput.value = item.dataset.value;
        }
        toggleDropdown(toDropdown);
      });
    });
  }

  const departInput = document.querySelector("#depart");
  const calendarContainer = document.querySelector("#calendar");
  const calendarGrid = document.querySelector("#calendar-grid");
  const monthYear = document.querySelector("#month-year");
  const prevMonth = document.querySelector("#prev-month");
  const nextMonth = document.querySelector("#next-month");

  const currentDate = new Date("2025-05-23");
  let selectedDate = null;

  function renderCalendar() {
    if (!calendarGrid) return;

    calendarGrid.innerHTML = "";
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date("2025-05-23");
    today.setHours(0, 0, 0, 0);

    if (monthYear) {
      monthYear.textContent = `${currentDate.toLocaleString("default", {
        month: "long",
      })} ${year}`;
    }

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    days.forEach((day) => {
      const dayHeader = document.createElement("div");
      dayHeader.textContent = day;
      dayHeader.classList.add("header");
      calendarGrid.appendChild(dayHeader);
    });

    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement("div");
      calendarGrid.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayCell = document.createElement("div");
      dayCell.textContent = day;
      if (date < today) {
        dayCell.classList.add("disabled");
      } else {
        dayCell.addEventListener("click", () => {
          selectedDate = date;
          if (departInput) {
            departInput.value = date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
          }
          calendarGrid
            .querySelectorAll("div")
            .forEach((cell) => cell.classList.remove("selected"));
          dayCell.classList.add("selected");
          if (calendarContainer) {
            toggleDropdown(calendarContainer);
          }
        });
      }
      calendarGrid.appendChild(dayCell);
    }
  }

  if (departInput && calendarContainer) {
    departInput.addEventListener("click", () => {
      closeAllDropdowns();
      toggleDropdown(calendarContainer);
      renderCalendar();
    });
  }

  if (prevMonth) {
    prevMonth.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });
  }

  if (nextMonth) {
    nextMonth.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });
  }

  const passengerInput = document.querySelector("#passengers");
  const passengerDropdown = document.querySelector("#passenger-dropdown");

  if (passengerInput && passengerDropdown) {
    passengerInput.addEventListener("click", () => {
      closeAllDropdowns();
      toggleDropdown(passengerDropdown);
    });

    passengerDropdown.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", () => {
        passengerInput.value = item.textContent;
        toggleDropdown(passengerDropdown);
      });
    });
  }

  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".input-with-icon") &&
      !e.target.closest(".calendar-container")
    ) {
      closeAllDropdowns();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const difficultySlider = document.getElementById("difficulty");
  const difficultyValue = document.getElementById("difficulty-value");

  if (difficultySlider && difficultyValue) {
    difficultySlider.addEventListener("input", function () {
      difficultyValue.textContent = this.value;
    });
  }

  const addToPlanButtons = document.querySelectorAll(".add-to-plan-btn");
  const timelineEmpty = document.querySelector(".timeline-empty");
  const timelineItems = document.querySelector(".timeline-items");
  const savePlanButton = document.getElementById("save-plan");
  const sharePlanButton = document.getElementById("share-plan");

  const planItems = [];

  addToPlanButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const adventureCard = this.closest(".adventure-card");
      if (!adventureCard) return;

      const adventureTitle =
        adventureCard.querySelector("h4")?.textContent || "Unknown Adventure";
      const adventureDuration =
        adventureCard.querySelector(".adventure-meta span:first-child")
          ?.textContent || "Unknown Duration";
      const adventureImg =
        adventureCard.querySelector(".adventure-img")?.style.backgroundImage ||
        "";

      const planItem = {
        title: adventureTitle,
        duration: adventureDuration,
        image: adventureImg,
      };

      planItems.push(planItem);

      if (timelineEmpty && timelineItems) {
        timelineEmpty.style.display = "none";
        timelineItems.style.display = "block";

        const timelineItem = document.createElement("div");
        timelineItem.classList.add("timeline-item");

        timelineItem.innerHTML = `
                    <div class="timeline-item-img" style="background-image: ${adventureImg}"></div>
                    <div class="timeline-item-content">
                        <h4>${adventureTitle}</h4>
                        <p>${adventureDuration}</p>
                        <button class="remove-item-btn"><i class="fas fa-times"></i></button>
                    </div>
                `;

        timelineItems.appendChild(timelineItem);

        if (savePlanButton && sharePlanButton) {
          savePlanButton.disabled = false;
          sharePlanButton.disabled = false;
        }

        const removeButton = timelineItem.querySelector(".remove-item-btn");
        removeButton.addEventListener("click", () => {
          timelineItems.removeChild(timelineItem);

          const index = planItems.indexOf(planItem);
          if (index > -1) {
            planItems.splice(index, 1);
          }

          if (planItems.length === 0) {
            timelineEmpty.style.display = "block";
            timelineItems.style.display = "none";

            if (savePlanButton && sharePlanButton) {
              savePlanButton.disabled = true;
              sharePlanButton.disabled = true;
            }
          }
        });
      }
    });
  });

  const applyFiltersButton = document.getElementById("apply-filters");

  if (applyFiltersButton) {
    applyFiltersButton.addEventListener("click", () => {
      const adventureType =
        document.getElementById("adventure-type")?.value || "all";
      const difficulty = document.getElementById("difficulty")?.value || "3";
      const duration = document.getElementById("duration")?.value || "all";
      const budget = document.getElementById("budget")?.value || "all";

      alert(
        `Filters applied: Type: ${adventureType}, Difficulty: ${difficulty}, Duration: ${duration}, Budget: ${budget}`
      );
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (typeof L === "undefined") {
    console.error("Leaflet library not loaded");
    return;
  }

  const worldMapElement = document.getElementById("worldMap");
  if (!worldMapElement) {
    console.error("worldMap element not found");
    return;
  }

  const mapLayers = {
    street: {
      name: "Street",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "© OpenStreetMap contributors",
    },
    terrain: {
      name: "Terrain",
      url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      attribution: "© OpenTopoMap contributors",
      fallback: "https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png",
    },
    topographic: {
      name: "Topographic",
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      attribution: "© Esri",
    },
    satellite: {
      name: "Satellite",
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: "© Esri",
    },
    dark: {
      name: "Dark",
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      attribution: "© CartoDB",
    },
  };

  const map = L.map("worldMap", {
    center: [20, 0],
    zoom: 2,
    minZoom: 2,
    maxZoom: 18,
    worldCopyJump: true,

    maxBounds: [
      [-85, -180],
      [85, 180],
    ],
    maxBoundsViscosity: 0.8,
  });

  map.setMaxBounds([
    [-85, -180],
    [85, 180],
  ]);

  let currentLayer = "street";
  let currentTileLayer = null;

  function switchMapLayer(layerKey) {
    if (currentTileLayer) {
      map.removeLayer(currentTileLayer);
    }

    const layer = mapLayers[layerKey];
    currentTileLayer = L.tileLayer(layer.url, {
      attribution: layer.attribution,
      noWrap: false,
      errorTileUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
    }).addTo(map);

    currentTileLayer.on("tileerror", (error) => {
      console.warn(`Failed to load ${layerKey} tiles:`, error);

      if (layerKey === "terrain" && layer.fallback) {
        console.log("Trying fallback terrain tiles...");
        map.removeLayer(currentTileLayer);
        currentTileLayer = L.tileLayer(layer.fallback, {
          attribution: "© OpenStreetMap contributors, © Wikimedia Maps",
          noWrap: false,
        }).addTo(map);
      }
    });

    currentLayer = layerKey;

    document.querySelectorAll(".layer-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    const activeBtn = document.querySelector(`[data-layer="${layerKey}"]`);
    if (activeBtn) {
      activeBtn.classList.add("active");
    }
  }

  switchMapLayer("street");

  function createLayerSwitcher() {
    const layerControl = L.control({ position: "topright" });

    layerControl.onAdd = (map) => {
      const div = L.DomUtil.create("div", "layer-switcher");
      div.innerHTML = `
                <div class="bg-white rounded-lg shadow-lg p-3 min-w-[200px]">
                    <div class="text-sm font-semibold text-gray-700 mb-2 text-center">Map Style</div>
                    <div class="grid grid-cols-2 gap-2">
                        ${Object.entries(mapLayers)
                          .map(
                            ([key, layer]) =>
                              `<button class="layer-btn px-3 py-2 text-xs font-medium rounded border transition-all ${
                                key === "street"
                                  ? "bg-blue-500 text-white border-blue-500"
                                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                              }" data-layer="${key}">${layer.name}</button>`
                          )
                          .join("")}
                    </div>
                </div>
            `;

      L.DomEvent.disableClickPropagation(div);
      L.DomEvent.disableScrollPropagation(div);

      return div;
    };

    layerControl.addTo(map);

    setTimeout(() => {
      document.querySelectorAll(".layer-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const layerKey = e.target.getAttribute("data-layer");
          switchMapLayer(layerKey);

          document.querySelectorAll(".layer-btn").forEach((b) => {
            b.className =
              "layer-btn px-3 py-2 text-xs font-medium rounded border transition-all bg-white text-gray-700 border-gray-300 hover:bg-gray-50";
          });
          e.target.className =
            "layer-btn px-3 py-2 text-xs font-medium rounded border transition-all bg-blue-500 text-white border-blue-500";
        });
      });
    }, 100);
  }

  createLayerSwitcher();

  const adventureData = [
    {
      id: 1,
      name: "Lake Tahoe",
      lat: 39.0968,
      lng: -120.0324,
      activity: "skiing",
      difficulty: 3,
      duration: "3-7 days",
      price: "$200-400/day",
      country: "California/Nevada, USA",
      region: "north-america",
      description:
        "Year-round outdoor hub with world-class skiing at Heavenly and Squaw Valley, plus hiking, biking, and water sports.",
      bestSeason: "Year-round",
      groupSize: "2-12 people",
      category: "mountain",
    },
    {
      id: 2,
      name: "Moab",
      lat: 38.5733,
      lng: -109.5498,
      activity: "mountain-biking",
      difficulty: 4,
      duration: "3-5 days",
      price: "$150-300/day",
      country: "Utah, USA",
      region: "north-america",
      description:
        "World-famous for the Slickrock Trail and incredible red rock landscapes in Arches and Canyonlands.",
      bestSeason: "Spring/Fall",
      groupSize: "2-8 people",
      category: "desert",
    },
    {
      id: 3,
      name: "Santa Cruz",
      lat: 36.9741,
      lng: -122.0308,
      activity: "surfing",
      difficulty: 2,
      duration: "2-5 days",
      price: "$100-250/day",
      country: "California, USA",
      region: "north-america",
      description:
        "Premier surf destination with Steamer Lane, plus nearby Santa Cruz Mountains for hiking and biking.",
      bestSeason: "Year-round",
      groupSize: "2-6 people",
      category: "water",
    },
    {
      id: 4,
      name: "Jackson Hole",
      lat: 43.4799,
      lng: -110.7624,
      activity: "skiing",
      difficulty: 4,
      duration: "4-7 days",
      price: "$300-600/day",
      country: "Wyoming, USA",
      region: "north-america",
      description:
        "Legendary ski resort with challenging terrain, plus Grand Teton adventures in summer.",
      bestSeason: "Winter/Summer",
      groupSize: "2-10 people",
      category: "mountain",
    },
    {
      id: 5,
      name: "Islamorada",
      lat: 24.9242,
      lng: -80.6278,
      activity: "fishing",
      difficulty: 2,
      duration: "3-5 days",
      price: "$200-500/day",
      country: "Florida Keys, USA",
      region: "north-america",
      description:
        "Sportfishing capital of the world, famous for bonefish, tarpon, and permit fishing.",
      bestSeason: "Year-round",
      groupSize: "2-6 people",
      category: "water",
    },
    {
      id: 6,
      name: "Yosemite National Park",
      lat: 37.8651,
      lng: -119.5383,
      activity: "hiking",
      difficulty: 4,
      duration: "3-7 days",
      price: "$100-200/day",
      country: "California, USA",
      region: "north-america",
      description:
        "Iconic trails like Half Dome and Yosemite Falls make this a prime destination for outdoor enthusiasts.",
      bestSeason: "May-October",
      groupSize: "2-8 people",
      category: "mountain",
    },

    {
      id: 7,
      name: "Banff",
      lat: 51.4968,
      lng: -115.9281,
      activity: "skiing",
      difficulty: 3,
      duration: "4-7 days",
      price: "$250-450/day",
      country: "Alberta, Canada",
      region: "north-america",
      description:
        "Stunning Canadian Rockies with world-class skiing at Lake Louise and incredible summer activities.",
      bestSeason: "Year-round",
      groupSize: "2-12 people",
      category: "mountain",
    },
    {
      id: 8,
      name: "Whistler",
      lat: 50.1163,
      lng: -122.9574,
      activity: "mountain-biking",
      difficulty: 4,
      duration: "3-7 days",
      price: "$200-400/day",
      country: "British Columbia, Canada",
      region: "north-america",
      description:
        "Home to the world's best bike park and Olympic-caliber skiing.",
      bestSeason: "Year-round",
      groupSize: "2-8 people",
      category: "mountain",
    },
    {
      id: 9,
      name: "Tofino",
      lat: 49.1533,
      lng: -125.9063,
      activity: "surfing",
      difficulty: 3,
      duration: "3-5 days",
      price: "$150-300/day",
      country: "British Columbia, Canada",
      region: "north-america",
      description:
        "Pacific coast surfing paradise with pristine beaches and temperate rainforest.",
      bestSeason: "Year-round",
      groupSize: "2-8 people",
      category: "water",
    },

    {
      id: 10,
      name: "Pacuare River",
      lat: 9.7489,
      lng: -83.7534,
      activity: "kayaking",
      difficulty: 3,
      duration: "4-7 days",
      price: "$100-200/day",
      country: "Costa Rica",
      region: "north-america",
      description:
        "World-class whitewater rafting through pristine rainforest with incredible biodiversity.",
      bestSeason: "December-April",
      groupSize: "4-12 people",
      category: "jungle",
    },
    {
      id: 11,
      name: "Cozumel",
      lat: 20.423,
      lng: -86.9223,
      activity: "fishing",
      difficulty: 2,
      duration: "3-5 days",
      price: "$150-350/day",
      country: "Mexico",
      region: "north-america",
      description:
        "World-renowned for deep-sea fishing, especially marlin and sailfish.",
      bestSeason: "Year-round",
      groupSize: "2-8 people",
      category: "water",
    },

    {
      id: 12,
      name: "Patagonia",
      lat: -50.9423,
      lng: -73.4068,
      activity: "hiking",
      difficulty: 4,
      duration: "7-14 days",
      price: "$200-400/day",
      country: "Chile/Argentina",
      region: "south-america",
      description:
        "Epic hiking in Torres del Paine, world-class fishing, and pristine wilderness.",
      bestSeason: "December-March",
      groupSize: "4-12 people",
      category: "mountain",
    },
    {
      id: 13,
      name: "Bariloche",
      lat: -41.1335,
      lng: -71.3103,
      activity: "skiing",
      difficulty: 3,
      duration: "5-10 days",
      price: "$150-300/day",
      country: "Argentina",
      region: "south-america",
      description:
        "Andean adventure hub with excellent skiing, lakes, and mountain activities.",
      bestSeason: "Year-round",
      groupSize: "2-10 people",
      category: "mountain",
    },
    {
      id: 14,
      name: "Huayhuash",
      lat: -10.2722,
      lng: -76.9067,
      activity: "hiking",
      difficulty: 5,
      duration: "10-14 days",
      price: "$100-200/day",
      country: "Peru",
      region: "south-america",
      description:
        "One of the world's most spectacular trekking circuits through the Cordillera Huayhuash.",
      bestSeason: "May-September",
      groupSize: "4-8 people",
      category: "mountain",
    },
    {
      id: 15,
      name: "Ilha Grande",
      lat: -23.134,
      lng: -44.1687,
      activity: "surfing",
      difficulty: 2,
      duration: "4-7 days",
      price: "$80-150/day",
      country: "Brazil",
      region: "south-america",
      description:
        "Pristine beaches with excellent surfing at Lopes Mendes and Atlantic rainforest hiking.",
      bestSeason: "April-October",
      groupSize: "2-8 people",
      category: "water",
    },

    {
      id: 16,
      name: "Chamonix",
      lat: 45.9237,
      lng: 6.8694,
      activity: "skiing",
      difficulty: 4,
      duration: "4-7 days",
      price: "$300-500/day",
      country: "France",
      region: "europe",
      description:
        "Birthplace of extreme skiing with legendary off-piste terrain and Mont Blanc hiking.",
      bestSeason: "Winter/Summer",
      groupSize: "2-8 people",
      category: "mountain",
    },
    {
      id: 17,
      name: "Dolomites",
      lat: 46.4102,
      lng: 11.844,
      activity: "hiking",
      difficulty: 3,
      duration: "5-10 days",
      price: "$200-400/day",
      country: "Italy",
      region: "europe",
      description:
        "UNESCO World Heritage site with spectacular alpine hiking and via ferrata routes.",
      bestSeason: "June-September",
      groupSize: "2-10 people",
      category: "mountain",
    },
    {
      id: 18,
      name: "Zermatt",
      lat: 46.0207,
      lng: 7.7491,
      activity: "skiing",
      difficulty: 4,
      duration: "4-7 days",
      price: "$400-700/day",
      country: "Switzerland",
      region: "europe",
      description:
        "Iconic Matterhorn views with world-class skiing and alpine hiking.",
      bestSeason: "Year-round",
      groupSize: "2-8 people",
      category: "mountain",
    },
    {
      id: 19,
      name: "Innsbruck",
      lat: 47.2692,
      lng: 11.4041,
      activity: "skiing",
      difficulty: 3,
      duration: "4-7 days",
      price: "$200-400/day",
      country: "Austria",
      region: "europe",
      description:
        "Alpine capital with Nordkette skiing and extensive mountain biking trails.",
      bestSeason: "Year-round",
      groupSize: "2-10 people",
      category: "mountain",
    },
    {
      id: 20,
      name: "Interlaken",
      lat: 46.6863,
      lng: 7.8632,
      activity: "kayaking",
      difficulty: 2,
      duration: "3-7 days",
      price: "$200-350/day",
      country: "Switzerland",
      region: "europe",
      description:
        "Adventure hub between lakes Thun and Brienz with incredible alpine activities.",
      bestSeason: "May-October",
      groupSize: "2-12 people",
      category: "mountain",
    },
    {
      id: 21,
      name: "Lake District",
      lat: 54.4609,
      lng: -3.0886,
      activity: "hiking",
      difficulty: 2,
      duration: "3-7 days",
      price: "$100-200/day",
      country: "England, UK",
      region: "europe",
      description:
        "England's largest national park with Scafell Pike and beautiful lake kayaking.",
      bestSeason: "May-September",
      groupSize: "2-12 people",
      category: "mountain",
    },
    {
      id: 22,
      name: "Madeira",
      lat: 32.7607,
      lng: -16.9595,
      activity: "hiking",
      difficulty: 3,
      duration: "5-7 days",
      price: "$150-250/day",
      country: "Portugal",
      region: "europe",
      description:
        "Levada trail hiking paradise with year-round perfect weather and great surfing.",
      bestSeason: "Year-round",
      groupSize: "2-10 people",
      category: "water",
    },

    {
      id: 23,
      name: "Cape Town",
      lat: -33.9249,
      lng: 18.4241,
      activity: "surfing",
      difficulty: 3,
      duration: "5-10 days",
      price: "$100-200/day",
      country: "South Africa",
      region: "africa",
      description:
        "Table Mountain hiking, world-class surfing at Muizenberg, and incredible scenery.",
      bestSeason: "October-April",
      groupSize: "2-8 people",
      category: "water",
    },
    {
      id: 24,
      name: "Drakensberg",
      lat: -28.7282,
      lng: 29.2772,
      activity: "hiking",
      difficulty: 4,
      duration: "5-10 days",
      price: "$80-150/day",
      country: "South Africa",
      region: "africa",
      description:
        "Dramatic mountain hiking with the Amphitheatre and ancient San rock art.",
      bestSeason: "April-September",
      groupSize: "4-10 people",
      category: "mountain",
    },
    {
      id: 25,
      name: "Seychelles",
      lat: -4.6796,
      lng: 55.492,
      activity: "fishing",
      difficulty: 2,
      duration: "5-7 days",
      price: "$300-600/day",
      country: "Seychelles",
      region: "africa",
      description:
        "World-class deep-sea fishing for tuna, marlin, and sailfish in pristine waters.",
      bestSeason: "Year-round",
      groupSize: "2-8 people",
      category: "water",
    },

    {
      id: 26,
      name: "Hokkaido",
      lat: 43.2203,
      lng: 142.8635,
      activity: "skiing",
      difficulty: 3,
      duration: "5-10 days",
      price: "$250-450/day",
      country: "Japan",
      region: "asia",
      description:
        "World's best powder snow at Niseko with incredible seafood and hot springs.",
      bestSeason: "December-March",
      groupSize: "2-10 people",
      category: "mountain",
    },
    {
      id: 27,
      name: "Bali",
      lat: -8.4095,
      lng: 115.1889,
      activity: "surfing",
      difficulty: 2,
      duration: "5-10 days",
      price: "$50-150/day",
      country: "Indonesia",
      region: "asia",
      description:
        "Legendary surf breaks like Uluwatu, plus volcano hiking and cultural experiences.",
      bestSeason: "April-October",
      groupSize: "2-8 people",
      category: "water",
    },
    {
      id: 28,
      name: "Kerala Backwaters",
      lat: 9.4981,
      lng: 76.3388,
      activity: "kayaking",
      difficulty: 1,
      duration: "3-7 days",
      price: "$30-80/day",
      country: "India",
      region: "asia",
      description:
        "Serene backwater kayaking through coconut groves and traditional villages.",
      bestSeason: "October-March",
      groupSize: "2-12 people",
      category: "water",
    },
    {
      id: 29,
      name: "Himalayas",
      lat: 28.3949,
      lng: 84.124,
      activity: "hiking",
      difficulty: 5,
      duration: "14-21 days",
      price: "$100-250/day",
      country: "Nepal",
      region: "asia",
      description:
        "Ultimate trekking destination with Everest Base Camp and Annapurna circuits.",
      bestSeason: "March-May, September-November",
      groupSize: "4-12 people",
      category: "mountain",
    },

    {
      id: 30,
      name: "Queenstown",
      lat: -45.0312,
      lng: 168.6626,
      activity: "mountain-biking",
      difficulty: 3,
      duration: "5-10 days",
      price: "$200-400/day",
      country: "New Zealand",
      region: "oceania",
      description:
        "Adventure capital with world-class bike park, skiing, and bungee jumping.",
      bestSeason: "Year-round",
      groupSize: "2-8 people",
      category: "mountain",
    },
    {
      id: 31,
      name: "Tasmania",
      lat: -41.4545,
      lng: 145.9707,
      activity: "hiking",
      difficulty: 4,
      duration: "7-14 days",
      price: "$150-300/day",
      country: "Australia",
      region: "oceania",
      description:
        "Pristine wilderness with the Overland Track and incredible biodiversity.",
      bestSeason: "December-March",
      groupSize: "4-10 people",
      category: "mountain",
    },
    {
      id: 32,
      name: "Gold Coast",
      lat: -28.0167,
      lng: 153.4,
      activity: "surfing",
      difficulty: 2,
      duration: "3-7 days",
      price: "$100-200/day",
      country: "Australia",
      region: "oceania",
      description:
        "Consistent surf breaks and hinterland hiking in subtropical paradise.",
      bestSeason: "Year-round",
      groupSize: "2-8 people",
      category: "water",
    },
  ];

  const activityColors = {
    surfing: "#3b82f6",
    kayaking: "#4ecdc4",
    skiing: "#45b7d1",
    hiking: "#96ceb4",
    "mountain-biking": "#feca57",
    fishing: "#ff9ff3",
    diving: "#4ecdc4",
    climbing: "#96ceb4",
    paragliding: "#45b7d1",
    camping: "#96ceb4",
  };

  function createCustomIcon(category, activity) {
    const color = activityColors[activity] || "#6b7280";

    const iconHtml = `
            <div style="
                background-color: ${color};
                width: 30px;
                height: 30px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 14px;
                font-weight: bold;
            ">
                ${getActivityIcon(activity)}
            </div>
        `;

    return L.divIcon({
      html: iconHtml,
      className: "custom-marker",
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15],
    });
  }

  function getActivityIcon(activity) {
    const icons = {
      hiking: "🥾",
      diving: "🤿",
      climbing: "🧗",
      surfing: "🏄",
      skiing: "⛷️",
      kayaking: "🛶",
      paragliding: "🪂",
      camping: "⛺",
      "mountain-biking": "🚵",
      fishing: "🎣",
    };
    return icons[activity] || "📍";
  }

  function createPopupContent(adventure) {
    return `
            <div class="custom-popup">
                <div class="popup-header">${adventure.name}</div>
                <div class="popup-details">${adventure.description}</div>
                <div class="popup-meta">
                    <span><strong>Country:</strong> ${adventure.country}</span>
                    <span><strong>Duration:</strong> ${adventure.duration}</span>
                </div>
                <div class="popup-meta">
                    <span><strong>Difficulty:</strong> Level ${adventure.difficulty}</span>
                    <span><strong>Price:</strong> ${adventure.price}</span>
                </div>
                <div class="popup-meta">
                    <span><strong>Best Season:</strong> ${adventure.bestSeason}</span>
                    <span><strong>Group Size:</strong> ${adventure.groupSize}</span>
                </div>
                <button class="popup-btn" onclick="addToItinerary(${adventure.id})">
                    Add to Itinerary
                </button>
            </div>
        `;
  }

  let allMarkers = [];
  function addMarkersToMap(data) {
    allMarkers.forEach((marker) => map.removeLayer(marker));
    allMarkers = [];

    data.forEach((adventure) => {
      const icon = createCustomIcon(adventure.category, adventure.activity);
      const marker = L.marker([adventure.lat, adventure.lng], { icon: icon })
        .bindPopup(createPopupContent(adventure))
        .addTo(map);

      marker.adventureData = adventure;
      allMarkers.push(marker);

      marker.on("click", () => {
        map.setView([adventure.lat, adventure.lng], 6);
      });
    });
  }

  function filterMarkers() {
    const activityFilter = document.getElementById("activityFilter");
    const regionFilter = document.getElementById("regionFilter");

    if (!activityFilter || !regionFilter) return;

    const activityValue = activityFilter.value;
    const regionValue = regionFilter.value;

    let visibleCount = 0;

    allMarkers.forEach((marker) => {
      const adventure = marker.adventureData;
      let showMarker = true;

      if (activityValue !== "all" && adventure.activity !== activityValue) {
        showMarker = false;
      }

      if (regionValue !== "all" && adventure.region !== regionValue) {
        showMarker = false;
      }

      if (showMarker) {
        marker.addTo(map);
        visibleCount++;
      } else {
        map.removeLayer(marker);
      }
    });

    console.log(`Showing ${visibleCount} of ${allMarkers.length} destinations`);

    const filterStatus = document.querySelector(".filter-status");
    if (filterStatus) {
      filterStatus.textContent = `Showing ${visibleCount} of ${allMarkers.length} destinations`;
    }
  }

  window.addToItinerary = (adventureId) => {
    const adventure = adventureData.find((a) => a.id === adventureId);
    if (adventure) {
      console.log("Adding to itinerary:", adventure);

      const timelineEmpty = document.querySelector(".timeline-empty");
      const timelineItems = document.querySelector(".timeline-items");
      const savePlanButton = document.getElementById("save-plan");
      const sharePlanButton = document.getElementById("share-plan");

      if (timelineEmpty && timelineItems) {
        timelineEmpty.style.display = "none";
        timelineItems.style.display = "block";

        const timelineItem = document.createElement("div");
        timelineItem.classList.add("timeline-item");

        timelineItem.innerHTML = `
                    <div class="timeline-item-img" style="background-image: url('/placeholder.svg?height=60&width=80');"></div>
                    <div class="timeline-item-content">
                        <h4>${adventure.name}</h4>
                        <p>${adventure.duration} - ${adventure.country}</p>
                        <button class="remove-item-btn"><i class="fas fa-times"></i></button>
                    </div>
                `;

        timelineItems.appendChild(timelineItem);

        if (savePlanButton && sharePlanButton) {
          savePlanButton.disabled = false;
          sharePlanButton.disabled = false;
        }

        const removeButton = timelineItem.querySelector(".remove-item-btn");
        removeButton.addEventListener("click", () => {
          timelineItems.removeChild(timelineItem);

          if (timelineItems.children.length === 0) {
            timelineEmpty.style.display = "block";
            timelineItems.style.display = "none";

            if (savePlanButton && sharePlanButton) {
              savePlanButton.disabled = true;
              sharePlanButton.disabled = true;
            }
          }
        });
      }

      alert(`${adventure.name} added to your itinerary!`);
    }
  };

  const activityFilter = document.getElementById("activityFilter");
  const regionFilter = document.getElementById("regionFilter");

  if (activityFilter) {
    activityFilter.addEventListener("change", filterMarkers);
  }
  if (regionFilter) {
    regionFilter.addEventListener("change", filterMarkers);
  }

  addMarkersToMap(adventureData);

  document.addEventListener("keydown", (e) => {
    if (e.key === "r" || e.key === "R") {
      map.setView([20, 0], 2);
    }

    if (e.key === "f" || e.key === "F") {
      const activityFilter = document.getElementById("activityFilter");
      if (activityFilter) {
        activityFilter.focus();
      }
    }

    const layerKeys = Object.keys(mapLayers);
    const keyNumber = Number.parseInt(e.key);
    if (keyNumber >= 1 && keyNumber <= layerKeys.length) {
      switchMapLayer(layerKeys[keyNumber - 1]);
    }
  });

  console.log(
    "Enhanced interactive world map initialized with",
    adventureData.length,
    "world-class adventure destinations with working activity and region filters"
  );
});

document.addEventListener("DOMContentLoaded", () => {
  const storyItems = document.querySelectorAll(".story-item");
  const storyModalOverlay = document.querySelector(".story-modal-overlay");
  const storyModal = document.querySelector(".story-modal");
  const storyContent = document.querySelector(".story-content");
  const storyProgress = document.querySelector(".story-progress");
  const storyClose = document.querySelector(".story-close");
  const storyPrevBtn = document.querySelector(".story-nav-btn.story-prev");
  const storyNextBtn = document.querySelector(".story-nav-btn.story-next");
  const storyPauseBtn = document.querySelector(".story-pause");
  const storyMuteBtn = document.querySelector(".story-mute");
  const storyLikeBtn = document.querySelector(".story-like");

  const storiesWrapper = document.querySelector(".stories-wrapper");
  const storiesPrevBtn = document.querySelector(".stories-nav.stories-prev");
  const storiesNextBtn = document.querySelector(".stories-nav.stories-next");

  const stories = [
    {
      id: 1,
      title: "Hiking",
      image: "images/hiking-story.jpg",
      caption:
        "Explore breathtaking trails in the Rocky Mountains with our expert guides.",
    },
    {
      id: 2,
      title: "Surfing",
      image: "images/surfing-story.jpg",
      caption:
        "Catch the perfect wave with our surfing lessons for all skill levels.",
    },
    {
      id: 3,
      title: "Climbing",
      image: "images/climbing-story.jpg",
      caption:
        "Challenge yourself with rock climbing experiences from beginner to expert level.",
    },
    {
      id: 4,
      title: "Kayaking",
      image: "images/kayaking-story.jpg",
      caption:
        "Paddle through crystal clear waters and discover hidden coves and beaches.",
    },
    {
      id: 5,
      title: "Skiing",
      image: "images/Skiing-story.jpg",
      caption:
        "Experience the thrill of skiing down pristine slopes in world-class resorts.",
    },
    {
      id: 6,
      title: "Diving",
      image: "images/Diving-story.jpg",
      caption:
        "Dive into vibrant coral reefs and swim alongside magnificent marine life.",
    },
  ];

  let currentStoryIndex = 0;
  let storyTimeout;
  let isPaused = false;
  let isMuted = false;
  const storyDuration = 5000;

  if (storiesPrevBtn && storiesNextBtn && storiesWrapper) {
    storiesPrevBtn.addEventListener("click", () => {
      storiesWrapper.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    });

    storiesNextBtn.addEventListener("click", () => {
      storiesWrapper.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    });
  }

  storyItems.forEach((item) => {
    item.addEventListener("click", function () {
      const storyId = Number.parseInt(this.getAttribute("data-story-id"));
      openStoryModal(storyId);
    });
  });

  if (storyClose) {
    storyClose.addEventListener("click", closeStoryModal);
  }

  if (storyModalOverlay) {
    storyModalOverlay.addEventListener("click", (e) => {
      if (e.target === storyModalOverlay) {
        closeStoryModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      storyModalOverlay &&
      storyModalOverlay.classList.contains("active")
    ) {
      closeStoryModal();
    }
  });

  if (storyPrevBtn && storyNextBtn) {
    storyPrevBtn.addEventListener("click", showPreviousStory);
    storyNextBtn.addEventListener("click", showNextStory);
  }

  if (storyPauseBtn) {
    storyPauseBtn.addEventListener("click", function () {
      if (isPaused) {
        resumeStory();
        this.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        pauseStory();
        this.innerHTML = '<i class="fas fa-play"></i>';
      }
      isPaused = !isPaused;
    });
  }

  if (storyMuteBtn) {
    storyMuteBtn.addEventListener("click", function () {
      if (isMuted) {
        this.innerHTML = '<i class="fas fa-volume-up"></i>';
      } else {
        this.innerHTML = '<i class="fas fa-volume-mute"></i>';
      }
      isMuted = !isMuted;
    });
  }

  if (storyLikeBtn) {
    storyLikeBtn.addEventListener("click", function () {
      if (this.classList.contains("liked")) {
        this.innerHTML = '<i class="far fa-heart"></i>';
        this.classList.remove("liked");
      } else {
        this.innerHTML = '<i class="fas fa-heart" style="color: #ed4956;"></i>';
        this.classList.add("liked");
      }
    });
  }

  let touchStartX = 0;
  let touchEndX = 0;

  if (storyModal) {
    storyModal.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
      pauseStory();
    });

    storyModal.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      resumeStory();
    });

    storyModal.addEventListener("mousedown", () => {
      pauseStory();
    });

    storyModal.addEventListener("mouseup", () => {
      resumeStory();
    });
  }

  function handleSwipe() {
    const swipeThreshold = 30;
    if (touchEndX < touchStartX - swipeThreshold) {
      showNextStory();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      showPreviousStory();
    }
  }

  function openStoryModal(storyId) {
    currentStoryIndex = stories.findIndex((story) => story.id === storyId);

    if (currentStoryIndex === -1) {
      currentStoryIndex = 0;
    }

    createProgressBars();
    createStorySlides();

    if (storyModalOverlay) {
      storyModalOverlay.classList.add("active");
    }
    document.body.style.overflow = "hidden";

    showStory(currentStoryIndex);
  }

  function closeStoryModal() {
    if (storyModalOverlay) {
      storyModalOverlay.classList.remove("active");
    }
    document.body.style.overflow = "";
    clearTimeout(storyTimeout);

    if (storyPauseBtn) {
      storyPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      isPaused = false;
    }

    if (storyProgress) {
      storyProgress.innerHTML = "";
    }
    if (storyContent) {
      storyContent.innerHTML = "";
    }
  }

  function createProgressBars() {
    if (!storyProgress) return;

    storyProgress.innerHTML = "";

    stories.forEach((_, index) => {
      const progressBar = document.createElement("div");
      progressBar.classList.add("story-progress-bar");

      const progressBarFill = document.createElement("div");
      progressBarFill.classList.add("story-progress-bar-fill");

      progressBar.appendChild(progressBarFill);
      storyProgress.appendChild(progressBar);
    });
  }

  function createStorySlides() {
    if (!storyContent) return;

    storyContent.innerHTML = "";

    stories.forEach((story) => {
      const storySlide = document.createElement("div");
      storySlide.classList.add("story-slide");
      storySlide.setAttribute("data-story-id", story.id);
      storySlide.style.backgroundImage = `url(${story.image})`;

      if (story.caption) {
        const storyCaption = document.createElement("div");
        storyCaption.classList.add("story-caption");
        storyCaption.textContent = story.caption;
        storySlide.appendChild(storyCaption);
      }

      storyContent.appendChild(storySlide);
    });
  }

  function showStory(index) {
    const storySlides = document.querySelectorAll(".story-slide");
    storySlides.forEach((slide) => {
      slide.classList.remove("active");
    });

    if (storySlides[index]) {
      storySlides[index].classList.add("active");
    }

    const progressBars = document.querySelectorAll(".story-progress-bar-fill");
    progressBars.forEach((bar, i) => {
      if (i < index) {
        bar.style.width = "100%";
      } else if (i > index) {
        bar.style.width = "0";
      } else {
        bar.style.width = "0";
        startProgress(bar);
      }
    });
  }

  // Start progress animation
  function startProgress(progressBar) {
    clearTimeout(storyTimeout);

    let progress = 0;
    const interval = 50;
    const increment = (interval / storyDuration) * 100;

    function updateProgress() {
      if (!isPaused) {
        progress += increment;
        progressBar.style.width = `${progress}%`;

        if (progress >= 100) {
          clearTimeout(storyTimeout);
          showNextStory();
        } else {
          storyTimeout = setTimeout(updateProgress, interval);
        }
      } else {
        storyTimeout = setTimeout(updateProgress, interval);
      }
    }

    storyTimeout = setTimeout(updateProgress, interval);
  }

  // Show next story
  function showNextStory() {
    clearTimeout(storyTimeout);
    currentStoryIndex++;

    if (currentStoryIndex >= stories.length) {
      closeStoryModal();
      return;
    }

    showStory(currentStoryIndex);
  }

  function showPreviousStory() {
    clearTimeout(storyTimeout);
    currentStoryIndex--;

    if (currentStoryIndex < 0) {
      currentStoryIndex = 0;
    }

    showStory(currentStoryIndex);
  }

  function pauseStory() {
    isPaused = true;
  }

  function resumeStory() {
    isPaused = false;
  }

  function updateNavVisibility() {
    if (!storiesWrapper || !storiesPrevBtn || !storiesNextBtn) return;

    if (storiesWrapper.scrollLeft <= 10) {
      storiesPrevBtn.style.opacity = "0";
      storiesPrevBtn.style.pointerEvents = "none";
    } else {
      storiesPrevBtn.style.opacity = "1";
      storiesPrevBtn.style.pointerEvents = "auto";
    }

    if (
      storiesWrapper.scrollLeft + storiesWrapper.clientWidth >=
      storiesWrapper.scrollWidth - 10
    ) {
      storiesNextBtn.style.opacity = "0";
      storiesNextBtn.style.pointerEvents = "none";
    } else {
      storiesNextBtn.style.opacity = "1";
      storiesNextBtn.style.pointerEvents = "auto";
    }
  }

  if (storiesWrapper) {
    storiesWrapper.addEventListener("scroll", updateNavVisibility);
    updateNavVisibility();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  function saveAdventureToLocalStorage(data) {
    const localAdventures = JSON.parse(
      localStorage.getItem("localAdventures") || "[]"
    );

    const newAdventure = {
      ...data,
      id: "local_" + Date.now(),
      date: new Date().toISOString(),
    };

    localAdventures.push(newAdventure);
    localStorage.setItem("localAdventures", JSON.stringify(localAdventures));

    return newAdventure;
  }

  function loadAdventuresFromLocalStorage() {
    return JSON.parse(localStorage.getItem("localAdventures") || "[]");
  }

  function deleteAdventureFromLocalStorage(id) {
    let localAdventures = JSON.parse(
      localStorage.getItem("localAdventures") || "[]"
    );
    localAdventures = localAdventures.filter((adv) => adv.id !== id);
    localStorage.setItem("localAdventures", JSON.stringify(localAdventures));
  }

  function addAdventureToList(adventure) {
    console.log("Adventure added to list:", adventure);
  }

  window.saveAdventureToLocalStorage = saveAdventureToLocalStorage;
  window.loadAdventuresFromLocalStorage = loadAdventuresFromLocalStorage;
  window.deleteAdventureFromLocalStorage = deleteAdventureFromLocalStorage;
  window.addAdventureToList = addAdventureToList;
});
document.addEventListener("DOMContentLoaded", () => {
  // Existing code for navigation, map, etc...

  const form = document.querySelector(".trip-planner-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const city = document.getElementById("city").value;
      const country = document.getElementById("country").value;
      const activities = Array.from(
        document.querySelectorAll('input[name="activity"]:checked')
      ).map((cb) => cb.value);
      const infoTypes = Array.from(
        document.querySelectorAll('input[name="info"]:checked')
      ).map((cb) => cb.value);

      console.log("Form Submitted:", {
        city,
        country,
        activities,
        infoTypes,
      });
      alert("Trip details submitted! Check console for details.");
      form.reset();
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("travelForm");
  const submitBtn = document.getElementById("submitBtn");
  const successMessage = document.getElementById("successMessage");

  const inputs = form.querySelectorAll("input[required]");
  inputs.forEach((input) => {
    input.addEventListener("blur", validateField);
    input.addEventListener("input", clearError);
  });

  function validateField(e) {
    const field = e.target;
    const formGroup = field.closest(".form-group");
    const errorMessage = formGroup
      ? formGroup.querySelector(".error-message")
      : null;

    if (!field.value.trim()) {
      if (formGroup) formGroup.classList.add("invalid");
      if (errorMessage) errorMessage.style.display = "block";
      return false;
    } else {
      if (formGroup) formGroup.classList.remove("invalid");
      if (errorMessage) errorMessage.style.display = "none";
      return true;
    }
  }

  function clearError(e) {
    const field = e.target;
    const formGroup = field.closest(".form-group");
    const errorMessage = formGroup
      ? formGroup.querySelector(".error-message")
      : null;

    if (field.value.trim()) {
      if (formGroup) formGroup.classList.remove("invalid");
      if (errorMessage) errorMessage.style.display = "none";
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    const textInputs = form.querySelectorAll('input[type="text"][required]');
    textInputs.forEach((input) => {
      if (!validateField({ target: input })) {
        isValid = false;
      }
    });

    const activitySelected = form.querySelector(
      'input[name="activity"]:checked'
    );
    const activityError = document.getElementById("activity-error");
    if (!activitySelected) {
      activityError.style.display = "block";
      isValid = false;
    } else {
      activityError.style.display = "none";
    }

    // Validate information checkboxes
    const informationSelected = form.querySelectorAll(
      'input[name="information"]:checked'
    );
    const informationError = document.getElementById("information-error");
    if (informationSelected.length === 0) {
      informationError.style.display = "block";
      isValid = false;
    } else {
      informationError.style.display = "none";
    }

    if (isValid) {
      submitBtn.classList.add("loading");
      submitBtn.textContent = "Processing...";
      form.classList.add("loading");

      const formData = new FormData(form);
      const data = {
        destination: {
          city: formData.get("city"),
          country: formData.get("country"),
        },
        activity: formData.get("activity"),
        information: formData.getAll("information"),
      };

      setTimeout(() => {
        console.log("Form submitted with data:", data);

        successMessage.style.display = "block";

        form.reset();

        submitBtn.classList.remove("loading");
        submitBtn.textContent = "Plan My Adventure";
        form.classList.remove("loading");

        setTimeout(() => {
          successMessage.style.display = "none";
        }, 5000);

        document.querySelector(".form-container").scrollIntoView({
          behavior: "smooth",
        });
      }, 2000);
    }
  });

  const radioInputs = form.querySelectorAll('input[type="radio"]');
  radioInputs.forEach((radio) => {
    radio.addEventListener("change", function () {
      const groupName = this.name;
      const otherRadios = form.querySelectorAll(`input[name="${groupName}"]`);
      otherRadios.forEach((otherRadio) => {
        if (otherRadio !== this) {
          otherRadio.closest(".activity-option").classList.remove("selected");
        }
      });

      this.closest(".activity-option").classList.add("selected");
    });
  });

  const clickableElements = form.querySelectorAll(
    'input[type="radio"], input[type="checkbox"], .submit-btn'
  );
  clickableElements.forEach((element) => {
    element.addEventListener("click", function () {
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "";
      }, 100);
    });
  });
});

const cityCountryMapping = {
  "south-lake-tahoe": "usa-california-nevada",
  moab: "usa-utah",
  "santa-cruz": "usa-california-surf",
  jackson: "usa-wyoming",
  islamorada: "usa-florida-keys",
  mariposa: "usa-california-yosemite",
  banff: "canada-alberta",
  whistler: "canada-british-columbia",
  tofino: "canada-british-columbia-surf",
  "pacuare-river": "costa-rica",
  cozumel: "mexico",
  "el-chalten": "chile-argentina",
  "san-carlos-de-bariloche": "argentina",
  huaraz: "peru",
  "angra-dos-reis": "brazil",
  "chamonix-mont-blanc": "france",
  "cortina-dampezzo": "italy",
  zermatt: "switzerland",
  innsbruck: "austria",
  interlaken: "switzerland-lakes",
  keswick: "england-uk",
  funchal: "portugal",
  "cape-town": "south-africa",
  underberg: "south-africa-drakensberg",
  "victoria-mahe": "seychelles",
  niseko: "japan",
  denpasar: "indonesia",
  alappuzha: "india",
  kathmandu: "nepal",
  queenstown: "new-zealand",
  hobart: "australia-tasmania",
  "gold-coast": "australia-queensland",
};

const locationActivities = {
  "south-lake-tahoe": ["Skiing", "Hiking", "Mountain Biking"],
  moab: ["Mountain Biking", "Hiking"],
  "santa-cruz": ["Surfing", "Hiking"],
  jackson: ["Skiing", "Hiking"],
  islamorada: ["Fishing"],
  mariposa: ["Hiking"],
  banff: ["Skiing", "Hiking", "Mountain Biking"],
  whistler: ["Skiing", "Mountain Biking"],
  tofino: ["Surfing", "Kayaking"],
  "pacuare-river": ["Kayaking"],
  cozumel: ["Fishing"],
  "el-chalten": ["Hiking"],
  "san-carlos-de-bariloche": ["Skiing", "Hiking"],
  huaraz: ["Hiking"],
  "angra-dos-reis": ["Surfing", "Kayaking"],
  "chamonix-mont-blanc": ["Skiing", "Hiking"],
  "cortina-dampezzo": ["Skiing", "Hiking"],
  zermatt: ["Skiing", "Hiking"],
  innsbruck: ["Skiing", "Mountain Biking"],
  interlaken: ["Kayaking", "Hiking"],
  keswick: ["Hiking"],
  funchal: ["Hiking", "Surfing"],
  "cape-town": ["Surfing", "Hiking"],
  underberg: ["Hiking"],
  "victoria-mahe": ["Fishing"],
  niseko: ["Skiing"],
  denpasar: ["Surfing"],
  alappuzha: ["Kayaking"],
  kathmandu: ["Hiking"],
  queenstown: ["Mountain Biking", "Skiing", "Hiking"],
  hobart: ["Hiking"],
  "gold-coast": ["Surfing"],
};

function updateCountryFromCity(selectedCity) {
  console.log("Updating country for city:", selectedCity);
  const countrySelect = document.getElementById("country");
  const countryMapping = cityCountryMapping[selectedCity];

  console.log("Country mapping found:", countryMapping);

  if (countryMapping && countrySelect) {
    const countryOptions = countrySelect.querySelectorAll("option");
    let found = false;

    countryOptions.forEach((option) => {
      if (option.value === countryMapping) {
        countrySelect.value = option.value;
        found = true;
        console.log("Country updated to:", option.value);

        countrySelect.style.backgroundColor = "#e8f5e8";
        countrySelect.style.transition = "background-color 0.3s ease";
        setTimeout(() => {
          countrySelect.style.backgroundColor = "";
        }, 1000);
      }
    });

    if (!found) {
      console.warn("Country option not found for mapping:", countryMapping);
    }
  } else {
    console.warn("Country select not found or no mapping available");
  }
}

function updateActivitiesFromCity(selectedCity) {
  console.log("Updating activities for city:", selectedCity);
  const availableActivities = locationActivities[selectedCity] || [];
  console.log("Available activities:", availableActivities);

  const activityOptions = document.querySelectorAll(".activity-option");
  console.log("Found activity options:", activityOptions.length);

  activityOptions.forEach((option) => {
    const input = option.querySelector('input[type="radio"]');
    const label = option.querySelector(".activity-label");

    if (input && label) {
      const activityValue = input.value;
      console.log("Checking activity:", activityValue);

      if (availableActivities.includes(activityValue)) {
        console.log("Activity available:", activityValue);

        input.disabled = false;
        option.style.opacity = "1";
        option.style.pointerEvents = "auto";
        label.style.backgroundColor = "#f0f8ff";
        label.style.borderColor = "#993503";
        label.style.transition = "all 0.3s ease";

        if (!label.querySelector(".available-indicator")) {
          const indicator = document.createElement("span");
          indicator.className = "available-indicator";
          indicator.innerHTML = " ✓";
          indicator.style.color = "#993503";
          indicator.style.fontWeight = "bold";
          indicator.style.marginLeft = "5px";
          label.appendChild(indicator);
        }
      } else {
        console.log("Activity not available:", activityValue);

        input.disabled = true;
        input.checked = false;
        option.style.opacity = "0.5";
        option.style.pointerEvents = "none";
        label.style.backgroundColor = "#f5f5f5";
        label.style.borderColor = "#ddd";
        label.style.transition = "all 0.3s ease";

        const indicator = label.querySelector(".available-indicator");
        if (indicator) {
          indicator.remove();
        }
      }
    }
  });

  showActivityMessage(selectedCity, availableActivities);
}

function showActivityMessage(city, activities) {
  console.log("Showing activity message for:", city, activities);

  const existingMessage = document.querySelector(
    ".activity-availability-message"
  );
  if (existingMessage) {
    existingMessage.remove();
  }

  if (activities.length > 0) {
    const activitySection = document.querySelector(".activity-grid");
    if (activitySection && activitySection.parentElement) {
      const message = document.createElement("div");
      message.className = "activity-availability-message";
      message.style.cssText = `
        background: linear-gradient(135deg, #fdcb66 0%, #993503 100%);
        color: white;
        padding: 12px 20px;
        border-radius: 10px;
        margin: 10px 0;
        font-size: 0.9rem;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        animation: slideIn 0.5s ease-out;
        text-align: center;
        font-weight: 500;
      `;

      const cityName =
        document.querySelector(`#city option[value="${city}"]`)?.textContent ||
        city;
      const activityNames = activities.join(", ");

      message.innerHTML = `
        <strong>🎯 Available in ${cityName}:</strong> ${activityNames}
      `;

      activitySection.parentElement.insertBefore(message, activitySection);
      console.log("Activity message added");
    } else {
      console.warn("Activity section not found");
    }
  }
}

function resetActivities() {
  console.log("Resetting activities");
  const activityOptions = document.querySelectorAll(".activity-option");

  activityOptions.forEach((option) => {
    const input = option.querySelector('input[type="radio"]');
    const label = option.querySelector(".activity-label");

    if (input && label) {
      input.disabled = false;
      input.checked = false;
      option.style.opacity = "1";
      option.style.pointerEvents = "auto";
      label.style.backgroundColor = "";
      label.style.borderColor = "";

      const indicator = label.querySelector(".available-indicator");
      if (indicator) {
        indicator.remove();
      }
    }
  });

  const existingMessage = document.querySelector(
    ".activity-availability-message"
  );
  if (existingMessage) {
    existingMessage.remove();
  }
}

function initializeAutoSelection() {
  console.log("Initializing auto-selection functionality...");

  const citySelect = document.getElementById("city");
  const countrySelect = document.getElementById("country");

  console.log("City select found:", !!citySelect);
  console.log("Country select found:", !!countrySelect);

  if (citySelect) {
    citySelect.addEventListener("change", function () {
      const selectedCity = this.value;
      console.log("City changed to:", selectedCity);

      if (selectedCity) {
        updateCountryFromCity(selectedCity);

        updateActivitiesFromCity(selectedCity);

        this.style.backgroundColor = "#e8f5e8";
        this.style.transition = "background-color 0.3s ease";
        setTimeout(() => {
          this.style.backgroundColor = "";
        }, 1000);
      } else {
        console.log("No city selected, resetting...");

        if (countrySelect) {
          countrySelect.value = "";
        }
        resetActivities();
      }
    });

    console.log("City change listener added");
  } else {
    console.error("City select element not found!");
  }

  if (countrySelect) {
    countrySelect.addEventListener("change", function () {
      const selectedCountry = this.value;
      console.log("Country changed to:", selectedCountry);

      if (selectedCountry) {
        const matchingCities = Object.entries(cityCountryMapping)
          .filter(([city, country]) => country === selectedCountry)
          .map(([city]) => city);

        console.log("Matching cities:", matchingCities);

        if (matchingCities.length === 1 && citySelect) {
          citySelect.value = matchingCities[0];
          updateActivitiesFromCity(matchingCities[0]);
          console.log("Auto-selected city:", matchingCities[0]);
        }
      }
    });

    console.log("Country change listener added");
  } else {
    console.error("Country select element not found!");
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeAutoSelection);
} else {
  initializeAutoSelection();
}

setTimeout(() => {
  if (document.getElementById("city") && document.getElementById("country")) {
    console.log("Elements found after delay, reinitializing if needed...");

    const citySelect = document.getElementById("city");
    if (
      citySelect &&
      !citySelect.hasAttribute("data-auto-selection-initialized")
    ) {
      citySelect.setAttribute("data-auto-selection-initialized", "true");
      initializeAutoSelection();
    }
  }
}, 1000);

console.log("Auto-selection script loaded");

document.addEventListener("DOMContentLoaded", function () {
  console.log("Loading enhanced trip planner with activity selection...");

  setTimeout(() => {
    const submitBtn = document.querySelector(".submit-btn");
    const timelineEmpty = document.querySelector(".timeline-empty");
    const timelineItems = document.querySelector(".timeline-items");
    const successMessage = document.querySelector(".success-message");

    console.log("Elements found:", {
      submitBtn: !!submitBtn,
      timelineEmpty: !!timelineEmpty,
      timelineItems: !!timelineItems,
      successMessage: !!successMessage,
    });

    initializeActivitySelection();

    if (submitBtn) {
      const newSubmitBtn = submitBtn.cloneNode(true);
      submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);

      newSubmitBtn.addEventListener("click", function (e) {
        e.preventDefault();
        console.log("Submit button clicked");

        const formData = collectFormData();
        console.log("Collected form data:", formData);

        if (validateFormData(formData)) {
          displayInCurrentPlan(formData);

          showSuccessMessage();
        }
      });
    } else {
      console.error("Submit button not found");
    }
    function initializeActivitySelection() {
      const activityOptions = document.querySelectorAll(".activity-option");

      activityOptions.forEach((option) => {
        const input = option.querySelector("input");
        const label = option.querySelector("label");

        option.addEventListener("click", function () {
          activityOptions.forEach((otherOption) => {
            const otherInput = otherOption.querySelector("input");
            const otherLabel = otherOption.querySelector("label");

            if (otherInput !== input) {
              otherLabel.style.backgroundColor = "";
              otherLabel.style.borderColor = "";
              otherLabel.style.color = "";
              otherLabel.style.transform = "";
              otherLabel.style.boxShadow = "";
              otherLabel.style.fontWeight = "";
            }
          });

          if (input.checked) {
            input.checked = true;

            label.style.backgroundColor = "#fdcb66";
            label.style.borderColor = "#993503";
            label.style.color = "#993503";
            label.style.transform = "scale(1.05)";
            label.style.boxShadow = "0 5px 15px rgba(253, 203, 102, 0.4)";
            label.style.transition = "all 0.3s ease";
            label.style.fontWeight = "bold";
          } else {
            label.style.backgroundColor = "";
            label.style.borderColor = "";
            label.style.color = "";
            label.style.transform = "";
            label.style.boxShadow = "";
            label.style.fontWeight = "";
          }
        });

        option.addEventListener("mouseenter", function () {
          if (!input.disabled && !input.checked) {
            label.style.backgroundColor = "#fff8e7";
            label.style.borderColor = "#fdcb66";
            label.style.transform = "scale(1.02)";
            label.style.transition = "all 0.2s ease";
          }
        });

        option.addEventListener("mouseleave", function () {
          if (!input.disabled && !input.checked) {
            label.style.backgroundColor = "#f0f8ff";
            label.style.borderColor = "#993503";
            label.style.transform = "scale(1)";
          }
        });
      });
    }

    document.addEventListener("DOMContentLoaded", function () {
      initializeActivitySelection();
    });

    function collectFormData() {
      const citySelect = document.getElementById("city");
      const countrySelect = document.getElementById("country");
      const selectedActivity = document.querySelector(
        'input[name="activity"]:checked'
      );
      const selectedInfo = document.querySelectorAll(
        'input[name="info"]:checked'
      );

      console.log("Form elements:", {
        citySelect: !!citySelect,
        countrySelect: !!countrySelect,
        selectedActivity: !!selectedActivity,
        selectedInfoCount: selectedInfo.length,
      });

      const cityText =
        citySelect && citySelect.selectedIndex > 0
          ? citySelect.options[citySelect.selectedIndex].text
          : "";
      const countryText =
        countrySelect && countrySelect.selectedIndex > 0
          ? countrySelect.options[countrySelect.selectedIndex].text
          : "";

      return {
        city: citySelect?.value || "",
        cityText: cityText,
        country: countrySelect?.value || "",
        countryText: countryText,
        activity: selectedActivity?.value || "",
        information: Array.from(selectedInfo).map((checkbox) => checkbox.value),
        timestamp: new Date().toLocaleString(),
      };
    }

    function validateFormData(data) {
      let isValid = true;
      const errors = [];

      if (!data.city) {
        errors.push("Please select a city");
        highlightError("city");
        isValid = false;
      }

      if (!data.country) {
        errors.push("Please select a country");
        highlightError("country");
        isValid = false;
      }

      if (!data.activity) {
        errors.push("Please select an activity");
        showActivityError();
        isValid = false;
      }

      if (data.information.length === 0) {
        errors.push("Please select at least one information type");
        showInfoError();
        isValid = false;
      }

      if (!isValid) {
        alert("Please complete all required fields:\n" + errors.join("\n"));
      }

      return isValid;
    }

    function displayInCurrentPlan(data) {
      console.log("Displaying in current plan:", data);

      if (timelineEmpty) {
        timelineEmpty.style.display = "none";
      }

      if (timelineItems) {
        timelineItems.style.display = "block";

        timelineItems.innerHTML = "";

        const planItem = createPlanItem(data);
        timelineItems.appendChild(planItem);
      }

      enablePlanActions();
    }

    function createPlanItem(data) {
      const planItem = document.createElement("div");
      planItem.classList.add("timeline-item");
      planItem.style.cssText = `
                background: linear-gradient(135deg, #fdcb66 0%, #993503 100%);
                color: white;
                border-radius: 15px;
                padding: 20px;
                margin-bottom: 15px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                animation: slideInUp 0.5s ease-out;
            `;

      const activityIcon = getActivityIcon(data.activity);

      planItem.innerHTML = `
                <div style="display: flex; align-items: flex-start; gap: 15px;">
                    <div style="font-size: 2rem; flex-shrink: 0;">
                        ${activityIcon}
                    </div>
                    <div style="flex: 1;">
                        <h4 style="margin: 0 0 10px 0; font-size: 1.2rem; color: white;">
                            ${data.activity} Adventure
                        </h4>
                        <div style="margin-bottom: 8px;">
                            <strong>📍 Destination:</strong> ${
                              data.cityText || data.city
                            }
                        </div>
                        <div style="margin-bottom: 8px;">
                            <strong>🌍 Region:</strong> ${
                              data.countryText || data.country
                            }
                        </div>
                        <div style="margin-bottom: 8px;">
                            <strong>📋 Information Requested:</strong>
                            <div style="margin-top: 5px;">
                                ${data.information
                                  .map(
                                    (info) => `
                                    <span style="
                                        display: inline-block;
                                        background: rgba(255,255,255,0.2);
                                        padding: 3px 8px;
                                        border-radius: 12px;
                                        font-size: 0.8rem;
                                        margin: 2px;
                                    ">${info}</span>
                                `
                                  )
                                  .join("")}
                            </div>
                        </div>
                        <div style="font-size: 0.8rem; opacity: 0.8; margin-top: 10px;">
                            📅 Planned: ${data.timestamp}
                        </div>
                    </div>
                    <button class="remove-item-btn" style="
                        background: rgba(255,255,255,0.2);
                        border: none;
                        color: white;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        cursor: pointer;
                        font-size: 1rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: background 0.3s ease;
                    " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
                       onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                        ×
                    </button>
                </div>
            `;

      const removeBtn = planItem.querySelector(".remove-item-btn");
      removeBtn.addEventListener("click", function () {
        planItem.remove();

        if (timelineItems && timelineItems.children.length === 0) {
          if (timelineEmpty) {
            timelineEmpty.style.display = "block";
          }
          timelineItems.style.display = "none";
          disablePlanActions();
        }
      });

      return planItem;
    }

    function getActivityIcon(activity) {
      const icons = {
        Hiking: "🥾",
        "Mountain Biking": "🚵",
        Kayaking: "🛶",
        Skiing: "⛷️",
        Fishing: "🎣",
        Surfing: "🏄",
      };
      return icons[activity] || "🎯";
    }

    function enablePlanActions() {
      const planActions = document.querySelectorAll(".plan-actions .btn");
      planActions.forEach((btn) => {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
      });
    }

    function disablePlanActions() {
      const planActions = document.querySelectorAll(".plan-actions .btn");
      planActions.forEach((btn) => {
        btn.disabled = true;
        btn.style.opacity = "0.5";
        btn.style.cursor = "not-allowed";
      });
    }

    function showSuccessMessage() {
      if (successMessage) {
        successMessage.style.display = "block";
        successMessage.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-check-circle" style="color: #28a745; font-size: 1.2rem;"></i>
                        <span>Your adventure plan has been created successfully!</span>
                    </div>
                `;

        setTimeout(() => {
          if (successMessage) {
            successMessage.style.display = "none";
          }
        }, 10000);
      }
    }

    function highlightError(fieldId) {
      const field = document.getElementById(fieldId);
      if (field) {
        field.style.borderColor = "#dc3545";
        field.style.backgroundColor = "#fff5f5";

        setTimeout(() => {
          field.style.borderColor = "";
          field.style.backgroundColor = "";
        }, 3000);
      }
    }

    function showActivityError() {
      const activitySection = document.querySelector(".activity-grid");
      if (activitySection) {
        activitySection.style.border = "2px solid #dc3545";
        activitySection.style.borderRadius = "10px";
        activitySection.style.padding = "10px";

        setTimeout(() => {
          activitySection.style.border = "";
          activitySection.style.padding = "";
        }, 3000);
      }
    }

    function showInfoError() {
      const infoSection = document.querySelector(".info-grid");
      if (infoSection) {
        infoSection.style.border = "2px solid #dc3545";
        infoSection.style.borderRadius = "10px";
        infoSection.style.padding = "10px";

        setTimeout(() => {
          infoSection.style.border = "";
          infoSection.style.padding = "";
        }, 3000);
      }
    }

    disablePlanActions();

    const savePlanBtn = document.querySelector(
      ".plan-actions .btn:first-child"
    );
    if (savePlanBtn) {
      savePlanBtn.addEventListener("click", function () {
        if (!this.disabled) {
          const planItems = document.querySelectorAll(".timeline-item");
          const planData = [];

          planItems.forEach((item) => {
            const title =
              item.querySelector("h4")?.textContent || "Adventure Plan";
            planData.push({ title, html: item.outerHTML });
          });

          localStorage.setItem("adventurePlan", JSON.stringify(planData));
          alert("Your adventure plan has been saved successfully!");
        }
      });
    }

    const sharePlanBtn = document.querySelector(
      ".plan-actions .btn:last-child"
    );
    if (sharePlanBtn) {
      sharePlanBtn.addEventListener("click", function () {
        if (!this.disabled) {
          const planItems = document.querySelectorAll(".timeline-item");
          let shareText = "Check out my adventure plan:\n\n";

          planItems.forEach((item, index) => {
            const title =
              item.querySelector("h4")?.textContent || "Adventure Plan";
            shareText += `${index + 1}. ${title}\n`;
          });

          shareText += "\nPlanned with Compass Adventure Planner!";

          navigator.clipboard
            .writeText(shareText)
            .then(() => {
              alert(
                "Adventure plan copied to clipboard! You can now share it."
              );
            })
            .catch(() => {
              const textArea = document.createElement("textarea");
              textArea.value = shareText;
              document.body.appendChild(textArea);
              textArea.select();
              document.execCommand("copy");
              document.body.removeChild(textArea);
              alert(
                "Adventure plan copied to clipboard! You can now share it."
              );
            });
        }
      });
    }

    console.log(
      "Enhanced trip planner functionality with activity selection loaded successfully!"
    );
  }, 1000);
});

const style = document.createElement("style");
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .activity-option {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .activity-option:hover .activity-label {
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("adventure-form");
  const savePlanBtn = document.getElementById("save-plan");
  const successMessage = document.querySelector(".success-message");

  function checkFormValidity() {
    const city = document.getElementById("city").value;
    const country = document.getElementById("country").value;
    const activity = document.querySelector('input[name="activity"]:checked');

    if (city && country && activity) {
      savePlanBtn.disabled = false;
    } else {
      savePlanBtn.disabled = true;
    }
  }

  document.getElementById("city").addEventListener("change", checkFormValidity);
  document
    .getElementById("country")
    .addEventListener("change", checkFormValidity);
  document.querySelectorAll('input[name="activity"]').forEach((radio) => {
    radio.addEventListener("change", checkFormValidity);
  });

  savePlanBtn.addEventListener("click", function (e) {
    e.preventDefault();
    saveTripPlan();
  });

  async function saveTripPlan() {
    try {
      savePlanBtn.textContent = "Saving...";
      savePlanBtn.disabled = true;

      const formData = new FormData();
      formData.append("city", document.getElementById("city").value);
      formData.append("country", document.getElementById("country").value);

      const selectedActivity = document.querySelector(
        'input[name="activity"]:checked'
      );
      if (selectedActivity) {
        formData.append("activity", selectedActivity.value);
      }

      const infoCheckboxes = document.querySelectorAll(
        'input[name="info"]:checked'
      );
      infoCheckboxes.forEach((checkbox) => {
        formData.append("info[]", checkbox.value);
      });

      const response = await fetch("save_plan.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        successMessage.style.display = "block";
        successMessage.textContent = result.message;

        updatePlanDisplay();

        setTimeout(() => {
          successMessage.style.display = "none";
        }, 3000);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert("Error saving plan: " + error.message);
    } finally {
      savePlanBtn.textContent = "Save Plan";
      checkFormValidity();
    }
  }

  function updatePlanDisplay() {
    const timelineEmpty = document.querySelector(".timeline-empty");
    const timelineItems = document.querySelector(".timeline-items");

    timelineEmpty.style.display = "none";

    timelineItems.style.display = "block";

    const city = document.getElementById("city").value;
    const country = document.getElementById("country").value;
    const activity = document.querySelector(
      'input[name="activity"]:checked'
    )?.value;
    const infoTypes = Array.from(
      document.querySelectorAll('input[name="info"]:checked')
    ).map((cb) => cb.value);

    const planItem = document.createElement("div");
    planItem.className = "timeline-item";
    planItem.innerHTML = `
            <div class="timeline-content">
                <h4>${activity} in ${city}</h4>
                <p><strong>Location:</strong> ${country}</p>
                <p><strong>Information Requested:</strong> ${
                  infoTypes.join(", ") || "None"
                }</p>
                <p><strong>Saved:</strong> ${new Date().toLocaleString()}</p>
            </div>
        `;

    timelineItems.appendChild(planItem);

    document.getElementById("share-plan").disabled = false;
  }

  loadSavedPlans();

  async function loadSavedPlans() {
    try {
      const response = await fetch("save_plan.php", {
        method: "GET",
      });

      const result = await response.json();

      if (result.success && result.plans.length > 0) {
        const timelineEmpty = document.querySelector(".timeline-empty");
        const timelineItems = document.querySelector(".timeline-items");

        timelineEmpty.style.display = "none";
        timelineItems.style.display = "block";

        timelineItems.innerHTML = "";

        result.plans.forEach((plan) => {
          const infoTypes = [];
          if (plan.transportation) infoTypes.push("Transportation");
          if (plan.health) infoTypes.push("Health");
          if (plan.weather) infoTypes.push("Weather");
          if (plan.gear) infoTypes.push("Gear");
          if (plan.political_info) infoTypes.push("Political Info");
          if (plan.activity_specific) infoTypes.push("Activity Specific");

          const planItem = document.createElement("div");
          planItem.className = "timeline-item";
          planItem.innerHTML = `
                        <div class="timeline-content">
                            <h4>${plan.activity} in ${plan.city}</h4>
                            <p><strong>Location:</strong> ${plan.country}</p>
                            <p><strong>Information Requested:</strong> ${
                              infoTypes.join(", ") || "None"
                            }</p>
                            <p><strong>Saved:</strong> ${new Date(
                              plan.created_at
                            ).toLocaleString()}</p>
                        </div>
                    `;

          timelineItems.appendChild(planItem);
        });

        document.getElementById("share-plan").disabled = false;
      }
    } catch (error) {
      console.error("Error loading saved plans:", error);
    }
  }
});
// Global Search Functionality
class GlobalSearch {
  constructor() {
    this.searchInput = document.getElementById("globalSearch");
    this.searchBtn = document.getElementById("searchBtn");
    this.searchResults = document.getElementById("searchResults");
    this.isSearching = false;
    this.searchTimeout = null;

    // Search data - this would typically come from a database
    this.searchData = this.initializeSearchData();

    this.init();
  }

  init() {
    if (!this.searchInput || !this.searchBtn || !this.searchResults) {
      console.warn("Search elements not found");
      return;
    }

    // Event listeners
    this.searchInput.addEventListener("input", (e) =>
      this.handleSearchInput(e)
    );
    this.searchInput.addEventListener("focus", () => this.handleSearchFocus());
    this.searchInput.addEventListener("blur", (e) => this.handleSearchBlur(e));
    this.searchBtn.addEventListener("click", () => this.handleSearchClick());

    // Keyboard navigation
    this.searchInput.addEventListener("keydown", (e) =>
      this.handleKeyNavigation(e)
    );

    // Close search results when clicking outside
    document.addEventListener("click", (e) => this.handleOutsideClick(e));
  }

  initializeSearchData() {
    return [
      // Home Page Content
      {
        id: "home-welcome",
        title: "Welcome to Compass",
        description:
          "Over 1500 extreme adventures from surfing 40 foot waves to fishing for piranha in the amazon",
        page: "CompassHome.php",
        category: "home",
        icon: "fas fa-home",
        keywords: [
          "welcome",
          "compass",
          "adventures",
          "extreme",
          "surfing",
          "fishing",
          "amazon",
        ],
      },
      {
        id: "home-fly-fishing",
        title: "Fly Fishing in the Rocky Mountains",
        description:
          "You'll get a seasoned guide and lots of dehydrated ravioli. 7 Days adventure with 4.9 rating.",
        page: "CompassHome.php",
        category: "adventure",
        icon: "fas fa-fish",
        keywords: [
          "fly fishing",
          "rocky mountains",
          "guide",
          "ravioli",
          "7 days",
          "fishing",
        ],
      },
      {
        id: "home-rapids",
        title: "Level 5 Rapids",
        description:
          "Put your helmet on and grab your wetsuit. It's time to conquer Siberia. 5 Days adventure.",
        page: "CompassHome.php",
        category: "adventure",
        icon: "fas fa-water",
        keywords: [
          "rapids",
          "level 5",
          "helmet",
          "wetsuit",
          "siberia",
          "rafting",
          "whitewater",
        ],
      },
      {
        id: "home-kayaking",
        title: "Puget Sound Kayaking",
        description:
          "One week of ocean kayaking in the Puget Sound. 6 Days adventure with 4.7 rating.",
        page: "CompassHome.php",
        category: "adventure",
        icon: "fas fa-ship",
        keywords: ["kayaking", "puget sound", "ocean", "week", "water sports"],
      },
      {
        id: "home-yosemite",
        title: "Yosemite National Park",
        description:
          "Experts only. Scale El Capitan and Half Dome. Bring your own gear, we provide food and training video.",
        page: "CompassHome.php",
        category: "climbing",
        icon: "fas fa-mountain",
        keywords: [
          "yosemite",
          "el capitan",
          "half dome",
          "climbing",
          "experts",
          "gear",
          "national park",
        ],
      },

      // Destinations Page Content
      {
        id: "dest-teahupoo",
        title: "Teahupo'o, Tahiti",
        description:
          "Home to some of the heaviest waves on the planet, this legendary surf spot is not for the faint-hearted.",
        page: "Destinations.php",
        category: "surfing",
        icon: "fas fa-water",
        keywords: [
          "teahupoo",
          "tahiti",
          "surfing",
          "waves",
          "heavy waves",
          "french polynesia",
          "legendary",
        ],
      },
      {
        id: "dest-everest",
        title: "Mount Everest",
        description:
          "The ultimate mountaineering challenge, standing at 29,032 feet above sea level.",
        page: "Destinations.php",
        category: "climbing",
        icon: "fas fa-mountain",
        keywords: [
          "mount everest",
          "everest",
          "mountaineering",
          "29032 feet",
          "nepal",
          "tibet",
          "climbing",
        ],
      },
      {
        id: "dest-alaska",
        title: "Chugach Mountains, Alaska",
        description:
          "Experience helicopter-accessed backcountry skiing with untracked powder and steep descents.",
        page: "Destinations.php",
        category: "skiing",
        icon: "fas fa-skiing",
        keywords: [
          "chugach",
          "alaska",
          "heli-skiing",
          "helicopter",
          "backcountry",
          "powder",
          "skiing",
        ],
      },
      {
        id: "dest-kilimanjaro",
        title: "Mount Kilimanjaro",
        description:
          "Africa's highest peak offers a challenging trek through five distinct climate zones.",
        page: "Destinations.php",
        category: "hiking",
        icon: "fas fa-hiking",
        keywords: [
          "kilimanjaro",
          "africa",
          "highest peak",
          "trek",
          "climate zones",
          "tanzania",
          "hiking",
        ],
      },
      {
        id: "dest-patagonia",
        title: "Torres del Paine",
        description:
          "Dramatic granite peaks, massive glaciers, and pristine lakes make this premier trekking destination.",
        page: "Destinations.php",
        category: "hiking",
        icon: "fas fa-mountain",
        keywords: [
          "torres del paine",
          "patagonia",
          "granite peaks",
          "glaciers",
          "lakes",
          "trekking",
          "chile",
        ],
      },
      {
        id: "dest-barrier-reef",
        title: "Great Barrier Reef",
        description:
          "World's largest coral reef system offers unparalleled diving experiences with incredible marine biodiversity.",
        page: "Destinations.php",
        category: "diving",
        icon: "fas fa-fish",
        keywords: [
          "great barrier reef",
          "coral reef",
          "diving",
          "marine",
          "biodiversity",
          "australia",
        ],
      },
      {
        id: "dest-dolomites",
        title: "The Dolomites",
        description:
          "Jagged limestone peaks offer some of Europe's most spectacular rock climbing routes.",
        page: "Destinations.php",
        category: "climbing",
        icon: "fas fa-mountain",
        keywords: [
          "dolomites",
          "limestone",
          "rock climbing",
          "europe",
          "italy",
          "climbing routes",
        ],
      },
      {
        id: "dest-yosemite-dest",
        title: "Yosemite National Park",
        description:
          "Home to El Capitan and Half Dome, this is a mecca for rock climbers from around the world.",
        page: "Destinations.php",
        category: "climbing",
        icon: "fas fa-mountain",
        keywords: [
          "yosemite",
          "el capitan",
          "half dome",
          "rock climbing",
          "mecca",
          "usa",
          "national park",
        ],
      },

      // Travel Logs Content
      {
        id: "log-everest-summit",
        title: "Summit Day: My Everest Journey",
        description:
          "After two months on the mountain, the day finally arrived. Weather window opened at 2 AM for summit push.",
        page: "Travelog.php",
        category: "mountaineering",
        icon: "fas fa-book",
        keywords: [
          "summit",
          "everest",
          "journey",
          "mountaineering",
          "alex honnold",
          "camp 4",
          "weather window",
        ],
      },
      {
        id: "log-teahupoo-surf",
        title: "Chasing the Perfect Wave in Teahupo'o",
        description:
          "The wave at Teahupo'o is unlike anything I've surfed. It's not just the size, but how it breaks over shallow reef.",
        page: "Travelog.php",
        category: "surfing",
        icon: "fas fa-water",
        keywords: [
          "perfect wave",
          "teahupoo",
          "surfing",
          "kelly slater",
          "reef",
          "wave breaking",
        ],
      },
      {
        id: "log-el-capitan",
        title: "Free Soloing El Capitan: A Mental Journey",
        description:
          "Physical challenge of climbing 3,000 feet without ropes is immense, but mental battle is the real challenge.",
        page: "Travelog.php",
        category: "climbing",
        icon: "fas fa-mountain",
        keywords: [
          "free solo",
          "el capitan",
          "mental journey",
          "lynn hill",
          "3000 feet",
          "no ropes",
          "climbing",
        ],
      },
      {
        id: "log-blue-hole",
        title: "Into the Blue Hole: Diving Belize's Underwater Sinkhole",
        description:
          "Descending into the Great Blue Hole is like entering another world. Crystal clear waters turn deep blue.",
        page: "Travelog.php",
        category: "diving",
        icon: "fas fa-water",
        keywords: [
          "blue hole",
          "belize",
          "diving",
          "sinkhole",
          "jacques cousteau",
          "crystal clear",
          "underwater",
        ],
      },
      {
        id: "log-appalachian",
        title: "Thru-Hiking the Appalachian Trail: 2,190 Miles of Solitude",
        description:
          "Six months, fourteen states, and countless blisters later, reached the summit of Mount Katahdin.",
        page: "Travelog.php",
        category: "hiking",
        icon: "fas fa-hiking",
        keywords: [
          "appalachian trail",
          "thru-hiking",
          "2190 miles",
          "solitude",
          "cheryl strayed",
          "katahdin",
          "hiking",
        ],
      },
      {
        id: "log-alaska-skiing",
        title: "Heli-Skiing in Alaska: Powder Paradise",
        description:
          "Helicopter dropped us on ridge with 360-degree views of untouched powder fields. No lift lines, pure wilderness.",
        page: "Travelog.php",
        category: "skiing",
        icon: "fas fa-skiing",
        keywords: [
          "heli-skiing",
          "alaska",
          "powder",
          "paradise",
          "lindsey vonn",
          "helicopter",
          "wilderness",
        ],
      },
      {
        id: "log-ice-climbing",
        title: "Frozen Waterfalls: Ice Climbing in Norway",
        description:
          "Sound of ice axes striking solid ice echoed through frozen valley. Each swing required perfect precision.",
        page: "Travelog.php",
        category: "climbing",
        icon: "fas fa-icicles",
        keywords: [
          "ice climbing",
          "norway",
          "frozen waterfalls",
          "conrad anker",
          "ice axes",
          "precision",
        ],
      },

      // Trip Planner Content
      {
        id: "planner-main",
        title: "Adventure Trip Planner",
        description:
          "Plan your perfect adventure with our interactive map and expert recommendations. Select regions and activities.",
        page: "TripPlanner.php",
        category: "planning",
        icon: "fas fa-map",
        keywords: [
          "trip planner",
          "adventure planning",
          "interactive map",
          "recommendations",
          "activities",
        ],
      },
      {
        id: "planner-activities",
        title: "Adventure Activities",
        description:
          "Choose from hiking, mountain biking, kayaking, skiing, fishing, and surfing adventures worldwide.",
        page: "TripPlanner.php",
        category: "activities",
        icon: "fas fa-list",
        keywords: [
          "activities",
          "hiking",
          "mountain biking",
          "kayaking",
          "skiing",
          "fishing",
          "surfing",
        ],
      },

      // General Features
      {
        id: "feature-destinations",
        title: "Handpicked Destinations",
        description:
          "We carefully select the most breathtaking and authentic destinations around the world.",
        page: "CompassHome.php",
        category: "features",
        icon: "fas fa-map-marked-alt",
        keywords: [
          "handpicked",
          "destinations",
          "breathtaking",
          "authentic",
          "worldwide",
        ],
      },
      {
        id: "feature-price",
        title: "Best Price Guarantee",
        description:
          "We promise the best rates and will match any lower price you find elsewhere.",
        page: "CompassHome.php",
        category: "features",
        icon: "fas fa-dollar-sign",
        keywords: [
          "best price",
          "guarantee",
          "rates",
          "price match",
          "lower price",
        ],
      },
      {
        id: "feature-support",
        title: "24/7 Support",
        description:
          "Our dedicated team is available around the clock to assist with any questions or issues.",
        page: "CompassHome.php",
        category: "features",
        icon: "fas fa-headset",
        keywords: [
          "24/7 support",
          "dedicated team",
          "around the clock",
          "assistance",
          "questions",
        ],
      },
      {
        id: "feature-security",
        title: "Secure Booking",
        description:
          "Your payments and personal information are always protected with our secure system.",
        page: "CompassHome.php",
        category: "features",
        icon: "fas fa-shield-alt",
        keywords: [
          "secure booking",
          "payments",
          "personal information",
          "protected",
          "secure system",
        ],
      },
    ];
  }

  handleSearchInput(e) {
    const query = e.target.value.trim();

    // Clear previous timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // Debounce search
    this.searchTimeout = setTimeout(() => {
      if (query.length >= 2) {
        this.performSearch(query);
      } else {
        this.hideResults();
      }
    }, 300);
  }

  handleSearchFocus() {
    const query = this.searchInput.value.trim();
    if (query.length >= 2) {
      this.showResults();
    }
  }

  handleSearchBlur(e) {
    // Delay hiding to allow clicking on results
    setTimeout(() => {
      if (!this.searchResults.contains(document.activeElement)) {
        this.hideResults();
      }
    }, 200);
  }

  handleSearchClick() {
    const query = this.searchInput.value.trim();
    if (query.length >= 2) {
      this.performSearch(query);
    }
  }

  handleKeyNavigation(e) {
    const results = this.searchResults.querySelectorAll(".search-result-item");
    const currentActive = this.searchResults.querySelector(
      ".search-result-item.active"
    );

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (currentActive) {
          currentActive.classList.remove("active");
          const next = currentActive.nextElementSibling;
          if (next) {
            next.classList.add("active");
            next.scrollIntoView({ block: "nearest" });
          } else if (results.length > 0) {
            results[0].classList.add("active");
            results[0].scrollIntoView({ block: "nearest" });
          }
        } else if (results.length > 0) {
          results[0].classList.add("active");
        }
        break;

      case "ArrowUp":
        e.preventDefault();
        if (currentActive) {
          currentActive.classList.remove("active");
          const prev = currentActive.previousElementSibling;
          if (prev) {
            prev.classList.add("active");
            prev.scrollIntoView({ block: "nearest" });
          } else if (results.length > 0) {
            results[results.length - 1].classList.add("active");
            results[results.length - 1].scrollIntoView({ block: "nearest" });
          }
        } else if (results.length > 0) {
          results[results.length - 1].classList.add("active");
        }
        break;

      case "Enter":
        e.preventDefault();
        if (currentActive) {
          currentActive.click();
        } else if (results.length > 0) {
          results[0].click();
        }
        break;

      case "Escape":
        this.hideResults();
        this.searchInput.blur();
        break;
    }
  }

  handleOutsideClick(e) {
    if (!e.target.closest(".nav-search")) {
      this.hideResults();
    }
  }

  performSearch(query) {
    this.showLoading();

    // Simulate API delay
    setTimeout(() => {
      const results = this.searchInData(query);
      this.displayResults(results, query);
    }, 200);
  }

  searchInData(query) {
    const searchTerms = query
      .toLowerCase()
      .split(" ")
      .filter((term) => term.length > 0);

    return this.searchData
      .filter((item) => {
        const searchableText = [item.title, item.description, ...item.keywords]
          .join(" ")
          .toLowerCase();

        return searchTerms.some((term) => searchableText.includes(term));
      })
      .sort((a, b) => {
        // Sort by relevance (title matches first, then description, then keywords)
        const aTitle = a.title.toLowerCase().includes(query.toLowerCase())
          ? 3
          : 0;
        const aDesc = a.description.toLowerCase().includes(query.toLowerCase())
          ? 2
          : 0;
        const aKeywords = a.keywords.some((k) =>
          k.toLowerCase().includes(query.toLowerCase())
        )
          ? 1
          : 0;

        const bTitle = b.title.toLowerCase().includes(query.toLowerCase())
          ? 3
          : 0;
        const bDesc = b.description.toLowerCase().includes(query.toLowerCase())
          ? 2
          : 0;
        const bKeywords = b.keywords.some((k) =>
          k.toLowerCase().includes(query.toLowerCase())
        )
          ? 1
          : 0;

        return bTitle + bDesc + bKeywords - (aTitle + aDesc + aKeywords);
      })
      .slice(0, 8); // Limit to 8 results
  }

  displayResults(results, query) {
    if (results.length === 0) {
      this.showNoResults(query);
      return;
    }

    const resultsHTML = results
      .map((result) => this.createResultHTML(result, query))
      .join("");

    this.searchResults.innerHTML = resultsHTML;
    this.showResults();

    // Add click handlers
    this.searchResults
      .querySelectorAll(".search-result-item")
      .forEach((item) => {
        item.addEventListener("click", () => {
          const page = item.dataset.page;
          const id = item.dataset.id;
          this.navigateToResult(page, id);
        });

        item.addEventListener("mouseenter", () => {
          this.searchResults
            .querySelectorAll(".search-result-item")
            .forEach((i) => i.classList.remove("active"));
          item.classList.add("active");
        });
      });
  }

  createResultHTML(result, query) {
    const highlightedTitle = this.highlightText(result.title, query);
    const highlightedDescription = this.highlightText(
      result.description,
      query
    );

    return `
            <div class="search-result-item" data-page="${
              result.page
            }" data-id="${result.id}">
                <div class="search-result-icon">
                    <i class="${result.icon}"></i>
                </div>
                <div class="search-result-content">
                    <div class="search-result-title">${highlightedTitle}</div>
                    <div class="search-result-description">${highlightedDescription}</div>
                    <div class="search-result-meta">
                        <span class="search-result-badge">${
                          result.category
                        }</span>
                        <span><i class="fas fa-file-alt"></i> ${this.getPageName(
                          result.page
                        )}</span>
                    </div>
                </div>
            </div>
        `;
  }

  highlightText(text, query) {
    const searchTerms = query
      .toLowerCase()
      .split(" ")
      .filter((term) => term.length > 0);
    let highlightedText = text;

    searchTerms.forEach((term) => {
      const regex = new RegExp(`(${this.escapeRegex(term)})`, "gi");
      highlightedText = highlightedText.replace(
        regex,
        '<span class="search-highlight">$1</span>'
      );
    });

    return highlightedText;
  }

  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  getPageName(page) {
    const pageNames = {
      "CompassHome.php": "Home",
      "Destinations.php": "Destinations",
      "Travelog.php": "Travel Logs",
      "TripPlanner.php": "Trip Planner",
    };
    return pageNames[page] || page;
  }

  showLoading() {
    this.searchResults.innerHTML = `
            <div class="search-loading">
                <i class="fas fa-spinner"></i>
                <p>Searching adventures...</p>
            </div>
        `;
    this.showResults();
  }

  showNoResults(query) {
    this.searchResults.innerHTML = `
            <div class="search-no-results">
                <i class="fas fa-search"></i>
                <p>No adventures found for "${query}"</p>
                <small>Try searching for destinations, activities, or adventure types</small>
            </div>
        `;
    this.showResults();
  }

  showResults() {
    this.searchResults.classList.add("show");
  }

  hideResults() {
    this.searchResults.classList.remove("show");
  }

  navigateToResult(page, id) {
    this.hideResults();

    this.searchInput.value = "";

    if (window.location.pathname.includes(page)) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });

        element.style.backgroundColor = "rgba(253, 203, 102, 0.3)";
        setTimeout(() => {
          element.style.backgroundColor = "";
        }, 2000);
      }
    } else {
      window.location.href = `${page}#${id}`;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new GlobalSearch();
  // Show/hide filters sidebar on mobile
  const filterBtn = document.createElement("button");
  filterBtn.id = "filterToggle";
  filterBtn.className = "filter-toggle-btn";
  filterBtn.textContent = "Filters ☰";
  const aside = document.querySelector(".filters");
  aside.parentNode.insertBefore(filterBtn, aside);

  filterBtn.addEventListener("click", () => {
    const isOpen = aside.classList.toggle("open");
    filterBtn.setAttribute("aria-expanded", isOpen);
  });
});

const searchStyles = `
<link rel="stylesheet" href="search-styles.css">
`;

if (!document.querySelector('link[href="search-styles.css"]')) {
  document.head.insertAdjacentHTML("beforeend", searchStyles);
}