/* ==========================================
   ANAS RENT CAR - MAIN APPLICATION LOGIC
   ========================================== */

// --- Fleet Database ---
const carFleet = [
    {
        id: "peugeot-208-grey",
        name: "Peugeot 208 GT-Line - Gris",
        category: "peugeot",
        image: "https://images.unsplash.com/photo-1632245889027-ea2366c4487c?auto=format&fit=crop&w=600&q=80",
        specs: {
            engine: "100 ch",
            transmission: "Automatique",
            fuel: "Diesel",
            seats: "5 Places"
        },
        price: 350,
        rating: "4.9 (124 avis)",
        tag: "Nouveau"
    },
    {
        id: "peugeot-208-black",
        name: "Peugeot 208 GT-Line - Noir",
        category: "peugeot",
        image: "https://images.unsplash.com/photo-1619551731248-2b1355e54af7?auto=format&fit=crop&w=600&q=80",
        specs: {
            engine: "100 ch",
            transmission: "Manuelle",
            fuel: "Diesel",
            seats: "5 Places"
        },
        price: 320,
        rating: "4.8 (85 avis)",
        tag: "Populaire"
    },
    {
        id: "renault-clio-5",
        name: "Renault Clio 5 - Gris Nardo",
        category: "renault",
        image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=600&q=80",
        specs: {
            engine: "85 ch",
            transmission: "Manuelle",
            fuel: "Diesel",
            seats: "5 Places"
        },
        price: 330,
        rating: "4.8 (110 avis)",
        tag: "Confort"
    },
    {
        id: "dacia-logan",
        name: "Dacia Logan - Gris Comète",
        category: "dacia",
        image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=600&q=80",
        specs: {
            engine: "95 ch",
            transmission: "Manuelle",
            fuel: "Diesel",
            seats: "5 Places"
        },
        price: 300,
        rating: "4.7 (96 avis)",
        tag: "Économique"
    },
    {
        id: "dacia-sandero",
        name: "Dacia Sandero Stepway - Gris",
        category: "dacia",
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
        specs: {
            engine: "95 ch",
            transmission: "Manuelle",
            fuel: "Diesel",
            seats: "5 Places"
        },
        price: 300,
        rating: "4.8 (75 avis)",
        tag: "Crossover"
    }
];

// --- App State ---
let selectedCar = null;

// --- DOM Elements ---
document.addEventListener("DOMContentLoaded", () => {
    // Navigation & Mobile Drawer
    const header = document.querySelector(".header");
    const menuToggle = document.getElementById("menu-toggle");
    const mobileNav = document.getElementById("mobile-nav");
    const navLinks = document.querySelectorAll(".nav-link");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    // Catalog & Filtering
    const carsGrid = document.getElementById("cars-grid");
    const tabBtns = document.querySelectorAll(".tab-btn");
    const categoryLinks = document.querySelectorAll(".category-link");

    // Search Forms
    const heroSearchForm = document.getElementById("hero-search-form");
    const pickupDate = document.getElementById("pickup-date");
    const returnDate = document.getElementById("return-date");

    // Booking Modal Elements
    const bookingModal = document.getElementById("booking-modal");
    const modalClose = document.getElementById("modal-close");
    const modalCarName = document.getElementById("modal-car-name");
    const modalCarCategory = document.getElementById("modal-car-category");
    const modalCarImg = document.getElementById("modal-car-img");
    const modalSpecEngine = document.getElementById("modal-spec-engine");
    const modalSpecTrans = document.getElementById("modal-spec-trans");
    const modalSpecFuel = document.getElementById("modal-spec-fuel");
    const modalSpecSeats = document.getElementById("modal-spec-seats");
    const modalDayPrice = document.getElementById("modal-day-price");
    
    // Booking Form inside Modal
    const bookingForm = document.getElementById("booking-form");
    const bookPickupLocation = document.getElementById("book-pickup-location");
    const bookDays = document.getElementById("book-days");
    const bookStartDate = document.getElementById("book-start-date");
    const bookEndDate = document.getElementById("book-end-date");
    
    // Option checkboxes
    const optInsurance = document.getElementById("opt-insurance");
    const optGps = document.getElementById("opt-gps");
    const optBaby = document.getElementById("opt-baby");
    
    // Price breakdown UI
    const summaryDaysCount = document.getElementById("summary-days-count");
    const summaryBasePrice = document.getElementById("summary-base-price");
    const summaryOptionsPrice = document.getElementById("summary-options-price");
    const summaryTotalPrice = document.getElementById("summary-total-price");

    // Success Modal Elements
    const successModal = document.getElementById("success-modal");
    const closeSuccessBtn = document.getElementById("close-success-btn");
    const successClientName = document.getElementById("success-client-name");
    const successCarName = document.getElementById("success-car-name");
    const successDuration = document.getElementById("success-duration");
    const successTotalPrice = document.getElementById("success-total-price");

    // Contact Form
    const contactForm = document.getElementById("contact-form");
    const contactSuccess = document.getElementById("contact-success");

    // ==========================================
    // 1. Navigation & Scroll Effects
    // ==========================================
    
    // Smooth Header Shrink
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.padding = "10px 0";
            header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
        } else {
            header.style.padding = "0";
            header.style.boxShadow = "none";
        }
        highlightActiveSection();
    });

    // Mobile Hamburger Menu Toggle
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        mobileNav.classList.toggle("open");
        
        // Animated bars
        const bars = menuToggle.querySelectorAll(".bar");
        if (menuToggle.classList.contains("active")) {
            bars[0].style.transform = "rotate(45deg) translate(5px, 6px)";
            bars[1].style.opacity = "0";
            bars[2].style.transform = "rotate(-45deg) translate(5px, -6px)";
        } else {
            bars[0].style.transform = "none";
            bars[1].style.opacity = "1";
            bars[2].style.transform = "none";
        }
    });

    // Close Mobile Drawer on Link Click
    [...mobileLinks, ...navLinks].forEach(link => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("active");
            mobileNav.classList.remove("open");
            const bars = menuToggle.querySelectorAll(".bar");
            bars[0].style.transform = "none";
            bars[1].style.opacity = "1";
            bars[2].style.transform = "none";
        });
    });

    // Highlight active link based on scroll
    function highlightActiveSection() {
        const sections = document.querySelectorAll("section");
        let scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    // ==========================================
    // 2. Date Setup & Verification
    // ==========================================
    
    // Set default dates and min limits (Today + Tomorrow)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayStr = today.toISOString().split("T")[0];
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    pickupDate.min = todayStr;
    pickupDate.value = todayStr;
    returnDate.min = tomorrowStr;
    returnDate.value = tomorrowStr;

    bookStartDate.min = todayStr;
    bookEndDate.min = tomorrowStr;

    // Date changes calculation
    pickupDate.addEventListener("change", () => {
        const startSelected = new Date(pickupDate.value);
        const endMin = new Date(startSelected);
        endMin.setDate(endMin.getDate() + 1);
        
        returnDate.min = endMin.toISOString().split("T")[0];
        if (new Date(returnDate.value) <= startSelected) {
            returnDate.value = endMin.toISOString().split("T")[0];
        }
    });

    // Synchronize booking modal dates when changed
    bookStartDate.addEventListener("change", () => {
        const startSelected = new Date(bookStartDate.value);
        const endMin = new Date(startSelected);
        endMin.setDate(endMin.getDate() + 1);
        
        bookEndDate.min = endMin.toISOString().split("T")[0];
        if (new Date(bookEndDate.value) <= startSelected) {
            bookEndDate.value = endMin.toISOString().split("T")[0];
        }
        calculateBookingDaysFromDates();
    });

    bookEndDate.addEventListener("change", () => {
        calculateBookingDaysFromDates();
    });

    // Calculation helper for days count from explicit dates
    function calculateBookingDaysFromDates() {
        const start = new Date(bookStartDate.value);
        const end = new Date(bookEndDate.value);
        if (end > start) {
            const timeDiff = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            bookDays.value = diffDays;
            calculateModalPrice();
        } else {
            bookDays.value = 1;
            calculateModalPrice();
        }
    }

    // ==========================================
    // 3. Catalog Render & Tab Filtering
    // ==========================================

    function renderCars(category = "all") {
        carsGrid.innerHTML = "";
        
        const filteredCars = category === "all" 
            ? carFleet 
            : carFleet.filter(car => car.category === category);
            
        if (filteredCars.length === 0) {
            carsGrid.innerHTML = `<div class="no-cars">Aucun véhicule disponible dans cette catégorie pour le moment.</div>`;
            return;
        }

        filteredCars.forEach((car, index) => {
            const card = document.createElement("div");
            card.className = "car-card";
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            
            // Format category name for human representation
            let categoryName = "";
            switch (car.category) {
                case "peugeot": categoryName = "Peugeot Citadine"; break;
                case "renault": categoryName = "Renault Citadine"; break;
                case "dacia": categoryName = "Dacia Économique"; break;
            }

            card.innerHTML = `
                <div class="car-img-wrapper">
                    <span class="car-tag">${car.tag}</span>
                    <img src="${car.image}" alt="${car.name}" loading="lazy">
                </div>
                <div class="car-details">
                    <h3 class="car-name">${car.name}</h3>
                    <div class="car-rating">
                        <i class="fa-solid fa-star"></i>
                        <span>${car.rating}</span>
                    </div>
                    <div class="car-specs">
                        <div class="spec-item">
                            <i class="fa-solid fa-gauge-high"></i>
                            <span>${car.specs.engine}</span>
                        </div>
                        <div class="spec-item">
                            <i class="fa-solid fa-gears"></i>
                            <span>${car.specs.transmission}</span>
                        </div>
                        <div class="spec-item">
                            <i class="fa-solid fa-gas-pump"></i>
                            <span>${car.specs.fuel}</span>
                        </div>
                        <div class="spec-item">
                            <i class="fa-solid fa-users"></i>
                            <span>${car.specs.seats}</span>
                        </div>
                    </div>
                    <div class="car-price-row">
                        <div class="price-box">
                            <span class="price-label">À partir de</span>
                            <span class="price-amount">${car.price} <span class="currency">DH/j</span></span>
                        </div>
                        <button class="btn btn-gold btn-rent" data-id="${car.id}">
                            <i class="fa-solid fa-calendar-days"></i> Réserver
                        </button>
                    </div>
                </div>
            `;
            
            carsGrid.appendChild(card);
            
            // Staggered reveal effect
            setTimeout(() => {
                card.style.transition = "var(--transition-smooth)";
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, index * 80);
        });

        // Re-attach listeners to booking buttons
        const rentBtns = document.querySelectorAll(".btn-rent");
        rentBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const carId = btn.getAttribute("data-id");
                openBookingModal(carId);
            });
        });
    }

    // Initialize Fleet
    renderCars();

    // Tab Filter Clicks
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const category = btn.getAttribute("data-category");
            
            // Out animation
            carsGrid.style.opacity = "0";
            carsGrid.style.transform = "translateY(10px)";
            carsGrid.style.transition = "opacity 0.2s ease, transform 0.2s ease";
            
            setTimeout(() => {
                renderCars(category);
                carsGrid.style.opacity = "1";
                carsGrid.style.transform = "translateY(0)";
            }, 250);
        });
    });

    // Handle clicks from Footer Categories
    categoryLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const cat = link.getAttribute("data-cat");
            const correspondingTab = document.querySelector(`.tab-btn[data-category="${cat}"]`);
            if (correspondingTab) {
                correspondingTab.click();
            }
        });
    });

    // ==========================================
    // 4. Hero Search Submission
    // ==========================================
    
    heroSearchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const loc = document.getElementById("pickup-location").value;
        const cat = document.getElementById("car-category").value;
        
        // Sync the pickup location to booking modal
        if (loc) {
            bookPickupLocation.value = loc;
        }

        // Setup booking start/end date from hero selections
        bookStartDate.value = pickupDate.value;
        bookEndDate.value = returnDate.value;
        
        // Calculate days from hero form dates
        const start = new Date(pickupDate.value);
        const end = new Date(returnDate.value);
        const timeDiff = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        bookDays.value = diffDays;

        // Apply visual filter in catalog
        const correspondingTab = document.querySelector(`.tab-btn[data-category="${cat === 'all' ? 'all' : cat}"]`);
        if (correspondingTab) {
            correspondingTab.click();
        }

        // Smooth scroll to catalog
        document.getElementById("fleet").scrollIntoView({ behavior: "smooth" });
    });

    // ==========================================
    // 5. Booking Modal Controller
    // ==========================================

    function openBookingModal(carId) {
        selectedCar = carFleet.find(car => car.id === carId);
        if (!selectedCar) return;

        // Set car details inside modal
        modalCarName.innerText = selectedCar.name;
        
        let categoryName = "";
        switch (selectedCar.category) {
            case "peugeot": categoryName = "Peugeot Citadine"; break;
            case "renault": categoryName = "Renault Citadine"; break;
            case "dacia": categoryName = "Dacia Économique"; break;
        }
        
        modalCarCategory.innerText = categoryName;
        modalCarImg.src = selectedCar.image;
        modalCarImg.alt = selectedCar.name;
        
        modalSpecEngine.innerText = selectedCar.specs.engine;
        modalSpecTrans.innerText = selectedCar.specs.transmission;
        modalSpecFuel.innerText = selectedCar.specs.fuel;
        modalSpecSeats.innerText = selectedCar.specs.seats;
        modalDayPrice.innerText = selectedCar.price;

        // Synchronize input dates with current Hero dates if not empty
        if (pickupDate.value) {
            bookStartDate.value = pickupDate.value;
        }
        if (returnDate.value) {
            bookEndDate.value = returnDate.value;
        }

        // Calculate days
        calculateBookingDaysFromDates();

        // Calculate total cost live
        calculateModalPrice();

        // Open modal
        bookingModal.classList.add("open");
        document.body.style.overflow = "hidden"; // disable scroll
    }

    function closeBookingModal() {
        bookingModal.classList.remove("open");
        document.body.style.overflow = ""; // enable scroll
        
        // Reset options
        optInsurance.checked = false;
        optGps.checked = false;
        optBaby.checked = false;
    }

    modalClose.addEventListener("click", closeBookingModal);
    
    // Close modal on outer click
    bookingModal.addEventListener("click", (e) => {
        if (e.target === bookingModal) {
            closeBookingModal();
        }
    });

    // Price Calculator Engine
    function calculateModalPrice() {
        if (!selectedCar) return;

        const numDays = parseInt(bookDays.value) || 1;
        const dailyPrice = selectedCar.price;
        
        // Calculate Base Cost
        const baseCost = dailyPrice * numDays;
        
        // Calculate Options Cost per day
        let optionsDailyCost = 0;
        if (optInsurance.checked) optionsDailyCost += parseInt(optInsurance.value);
        if (optGps.checked) optionsDailyCost += parseInt(optGps.value);
        if (optBaby.checked) optionsDailyCost += parseInt(optBaby.value);
        
        const optionsTotalCost = optionsDailyCost * numDays;
        const grandTotal = baseCost + optionsTotalCost;

        // Format prices with commas or spaces
        const formatPrice = (val) => val.toLocaleString("fr-FR");

        // Sync values to UI
        summaryDaysCount.innerText = numDays;
        summaryBasePrice.innerText = `${formatPrice(baseCost)} DH`;
        summaryOptionsPrice.innerText = `${formatPrice(optionsTotalCost)} DH`;
        summaryTotalPrice.innerText = `${formatPrice(grandTotal)} DH`;
    }

    // Input listeners for real-time calculations
    bookDays.addEventListener("input", () => {
        const days = parseInt(bookDays.value);
        if (days >= 1) {
            // Update endDate based on startDate + days
            const start = new Date(bookStartDate.value);
            const end = new Date(start);
            end.setDate(end.getDate() + days);
            bookEndDate.value = end.toISOString().split("T")[0];
            calculateModalPrice();
        }
    });

    [optInsurance, optGps, optBaby].forEach(checkbox => {
        checkbox.addEventListener("change", calculateModalPrice);
    });

    // ==========================================
    // 6. Booking Confirmation Submit
    // ==========================================

    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const clientNameVal = document.getElementById("client-name").value;
        const clientPhoneVal = document.getElementById("client-phone").value;
        const clientEmailVal = document.getElementById("client-email").value;
        const totalEstimate = summaryTotalPrice.innerText;
        const durationText = `${bookDays.value} ${parseInt(bookDays.value) > 1 ? 'Jours' : 'Jour'}`;

        // Populate Success Modal Fields
        successClientName.innerText = clientNameVal;
        successCarName.innerText = selectedCar.name;
        successDuration.innerText = durationText;
        successTotalPrice.innerText = totalEstimate;

        // Close booking modal and open Success Card
        closeBookingModal();
        successModal.classList.add("open");
        document.body.style.overflow = "hidden"; // disable scroll

        // Reset the booking form inputs
        bookingForm.reset();
    });

    // Close Success Modal
    closeSuccessBtn.addEventListener("click", () => {
        successModal.classList.remove("open");
        document.body.style.overflow = ""; // enable scroll
    });

    successModal.addEventListener("click", (e) => {
        if (e.target === successModal) {
            successModal.classList.remove("open");
            document.body.style.overflow = "";
        }
    });

    // ==========================================
    // 7. Contact Form Handling
    // ==========================================

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Animate submission
        const submitBtn = contactForm.querySelector("button[type='submit']");
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Envoi en cours...`;

        setTimeout(() => {
            // Mimic success response
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            contactForm.reset();
            contactSuccess.classList.remove("hide");
            
            // Fade out alert after 5 seconds
            setTimeout(() => {
                contactSuccess.classList.add("hide");
            }, 6000);
        }, 1500);
    });
});
