(() => {
  document.addEventListener("DOMContentLoaded", () => {
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

    // ——— HOOK UP BUDGET SLIDER ———
    const budgetRange = document.getElementById("budgetRange");
    if (budgetRange) {
      budgetRange.addEventListener("input", () => {
        positionIndicator();
        filterRightPanel();
      });
      window.addEventListener("resize", positionIndicator);
    }

    // ——— HOOK UP DURATION BUTTONS ———
    const durationButtons = document.querySelectorAll(".duration-btn");
    durationButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        durationButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        filterRightPanel();
      });
    });

    const expChecks = document.querySelectorAll(
      '.experience-group input.filter[type="checkbox"]'
    );
    expChecks.forEach((cb) => cb.addEventListener("change", filterRightPanel));

    const allNoneCheckbox = document.getElementById("allNoneCheckbox"); // Add ID for All/None checkbox
    if (allNoneCheckbox) {
      allNoneCheckbox.addEventListener("change", () => {
        // Toggle the "All/None" checkboxes
        const checked = allNoneCheckbox.checked;
        document
          .querySelectorAll('.experience-group input.filter[type="checkbox"]')
          .forEach((cb) => {
            cb.checked = checked;
          });

        filterRightPanel(); // Re-filter the items
      });
    }

    function filterRightPanel() {
      // Budget Value
      const budgetVal = parseInt(budgetRange.value, 10);

      // Get active duration filter
      const durBtn = document.querySelector(".duration-btn.active");
      const durValue = durBtn ? durBtn.dataset.value : "0";

      // Collect active experience filters
      const activeExps = Array.from(
        document.querySelectorAll(
          '.experience-group input.filter[type="checkbox"]:checked'
        )
      ).map((cb) => cb.value);

      let count = 0;

      // Iterate over listing cards and apply filters
      document.querySelectorAll(".listing-card").forEach((card) => {
        // — BUDGET TEST —
        const price = parseInt(card.dataset.price, 10);
        let show = price <= budgetVal;

        // — DURATION TEST —
        if (show && durValue !== "0") {
          const durText = card.dataset.duration.toLowerCase(); // "5 nights" or "3 days"
          if (durValue.endsWith("n")) {
            const n = durValue.slice(0, -1); // Remove "n"
            show = durText.includes(`${n} night`);
          } else {
            show = durText.includes(`${durValue} day`);
          }
        }

        // — EXPERIENCE TEST —
        if (show && activeExps.length) {
          const cardExps = (card.dataset.experience || "")
            .split(",")
            .map((s) => s.trim());
          show = activeExps.some((exp) => cardExps.includes(exp));
        }

        // — APPLY & COUNT —
        card.style.display = show ? "" : "none";
        if (show) count++;
      });

      // — UPDATE TOTAL —
      const resultCount = document.getElementById("resultCount");
      if (resultCount) {
        resultCount.textContent = `Total destinations: ${count}`;
      }
    }

    function setupDurationButtons() {
      const durationBtns = document.querySelectorAll(".duration-btn");
      durationBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          // clear all…
          durationBtns.forEach((b) => b.classList.remove("active"));
          // …then mark the one that was clicked
          btn.classList.add("active");
          // re‐run your filter
          filterRightPanel();
        });
      });
    }

    // …inside your DOMContentLoaded, after filterRightPanel() is in scope:
    setupDurationButtons();

    // ——— INITIALIZE FILTERS ———
    filterRightPanel();
    // Show/hide filters sidebar on mobile
    const filterBtn = document.createElement("button");
    filterBtn.id = "filterToggle";
    filterBtn.className = "filter-toggle-btn";
    filterBtn.textContent = "Filters ☰";
    const aside = document.querySelector(".filters");

    if (aside) aside.parentNode.insertBefore(filterBtn, aside);

    filterBtn.addEventListener("click", () => {
      const isOpen = aside.classList.toggle("open");
      positionIndicator();
      filterBtn.setAttribute("aria-expanded", isOpen);
    });

    filterRightPanel();

    if (budgetRange) {
      budgetRange.addEventListener("input", () => {
        positionIndicator();
        filterRightPanel();
      });
    }

    window.addEventListener("resize", positionIndicator);
  });
})();