// Main JavaScript for CarRental website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Initialize date pickers if any
    const dateInputs = document.querySelectorAll('input[type="datetime-local"]');
    if (dateInputs.length > 0) {
        // Set min dates to today
        const today = new Date().toISOString().split('T')[0];
        dateInputs.forEach(input => {
            if (!input.min) {
                input.min = today + 'T00:00';
            }
        });
    }
    
    // Format currency inputs
    const priceElements = document.querySelectorAll('.price-format');
    priceElements.forEach(el => {
        const value = parseFloat(el.textContent);
        if (!isNaN(value)) {
            el.textContent = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(value);
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle booking form calculations
    const bookingForm = document.querySelector('#booking-form');
    if (bookingForm) {
        const pickupDateInput = bookingForm.querySelector('#id_pickup_date');
        const dropoffDateInput = bookingForm.querySelector('#id_dropoff_date');
        const dailyRateElem = document.querySelector('#daily-rate');
        const totalCostElem = document.querySelector('#total-cost');
        
        const calculateTotalCost = () => {
            if (pickupDateInput && dropoffDateInput && dailyRateElem && totalCostElem) {
                const pickupDate = new Date(pickupDateInput.value);
                const dropoffDate = new Date(dropoffDateInput.value);
                
                if (!isNaN(pickupDate.getTime()) && !isNaN(dropoffDate.getTime())) {
                    // Calculate days difference
                    const timeDiff = dropoffDate - pickupDate;
                    let days = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    days = Math.max(1, days); // Minimum 1 day
                    
                    // Get daily rate
                    const dailyRate = parseFloat(dailyRateElem.dataset.rate || dailyRateElem.textContent);
                    
                    if (!isNaN(dailyRate)) {
                        // Calculate total cost
                        const totalCost = dailyRate * days;
                        totalCostElem.textContent = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                        }).format(totalCost);
                    }
                }
            }
        };
        
        // Calculate on date change
        if (pickupDateInput && dropoffDateInput) {
            pickupDateInput.addEventListener('change', calculateTotalCost);
            dropoffDateInput.addEventListener('change', calculateTotalCost);
        }
    }
    
    // Initialize star rating system
    const ratingInputs = document.querySelectorAll('.rating-input');
    if (ratingInputs.length > 0) {
        ratingInputs.forEach(input => {
            const stars = input.querySelectorAll('.star');
            stars.forEach((star, index) => {
                star.addEventListener('click', () => {
                    // Set hidden input value
                    const ratingValue = input.querySelector('input[type="hidden"]');
                    if (ratingValue) {
                        ratingValue.value = index + 1;
                    }
                    
                    // Update stars display
                    stars.forEach((s, i) => {
                        if (i <= index) {
                            s.classList.add('text-yellow-500');
                            s.classList.remove('text-gray-300');
                        } else {
                            s.classList.add('text-gray-300');
                            s.classList.remove('text-yellow-500');
                        }
                    });
                });
            });
        });
    }
});