document.addEventListener('DOMContentLoaded', () => {
    // Initialize Bootstrap Carousel
    const myCarousel = document.querySelector('#carouselExampleRide');
    if (myCarousel) {
        new bootstrap.Carousel(myCarousel, {
            interval: 3000,
            ride: 'carousel',
        });
    }

    // Scroll-to-Top Button Logic
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Feature Item Scroll Animation
    const featureItems = document.querySelectorAll('.feature-item');
    window.addEventListener('scroll', () => {
        const triggerBottom = window.innerHeight * 0.8;
        featureItems.forEach((item) => {
            if (item.getBoundingClientRect().top < triggerBottom) {
                item.classList.add('scroll-in');
            }
        });
    });

    // New Arrivals Scroll Animation
    const productCardsScroll = document.querySelectorAll('.product-card');
    window.addEventListener('scroll', () => {
        const triggerBottom = window.innerHeight * 0.8;
        productCardsScroll.forEach((card) => {
            if (card.getBoundingClientRect().top < triggerBottom) {
                card.classList.add('active');
            }
        });
    });

    // Filter Logic
    const filterButton = document.getElementById('filter-button');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const categories = document.getElementById('categories');
    const sortOptions = document.getElementById('sort-options');
    const productCards = document.querySelectorAll('.product-card');
    const productContainer = document.getElementById('product-container');

    if (priceRange && priceValue) {
        priceRange.addEventListener('input', () => {
            priceValue.textContent = `₹${priceRange.value}`;
        });
    }

    if (filterButton && productCards) {
        filterButton.addEventListener('click', () => {
            const selectedPrice = parseInt(priceRange.value, 10);
            const selectedCategories = Array.from(categories.selectedOptions).map((opt) => opt.value);
            const selectedSortOption = sortOptions.value;

            let sortedCards = Array.from(productCards);

            // Filter products
            sortedCards = sortedCards.filter((card) => {
                const productPrice = parseInt(card.getAttribute('data-price'), 10);
                const productCategory = card.getAttribute('data-category');

                return (
                    productPrice <= selectedPrice &&
                    (selectedCategories.includes(productCategory) || selectedCategories.length === 0)
                );
            });

            // Sort products
            sortedCards.sort((a, b) => {
                const titleA = a.querySelector('.card-title a').textContent.toUpperCase();
                const titleB = b.querySelector('.card-title a').textContent.toUpperCase();
                const ratingA = parseFloat(a.getAttribute('data-rating'));
                const ratingB = parseFloat(b.getAttribute('data-rating'));
                const priceA = parseInt(a.getAttribute('data-price'), 10);
                const priceB = parseInt(b.getAttribute('data-price'), 10);

                switch (selectedSortOption) {
                    case 'a-to-z':
                        return titleA.localeCompare(titleB);
                    case 'most-rated':
                        return ratingB - ratingA;
                    case 'price-low-to-high':
                        return priceA - priceB;
                    case 'price-high-to-low':
                        return priceB - priceA;
                    default:
                        return 0;
                }
            });

            // Clear the container
            productContainer.innerHTML = '';

            // Append sorted and filtered cards
            sortedCards.forEach((card) => {
                productContainer.appendChild(card);
            });

            // Debugging logs
            console.log('Selected Price:', selectedPrice);
            console.log('Selected Categories:', selectedCategories);
            console.log('Selected Sort Option:', selectedSortOption);
            console.log('Sorted Cards:', sortedCards);
        });
    }
});
//form validations
$(document).ready(function() {
    $("#form").submit(function(e) {
      e.preventDefault(); 
  
      // Get values
      var name = $("#name").val().trim();
      var email = $("#email").val().trim();
      var msg = $("#msg").val().trim();
  
      // Reset the errors
      $(".error").remove();
  
      var isValidForm = true;
  
      // Validate Conditions here
      if (name.length < 1) {
        $('#name').after('<span class="error">This field is required</span>');
        isValidForm = false;
      } else {
        // Name format validation (only letters and spaces)
        var namePattern = /^[a-zA-Z\s]+$/;
        if (!namePattern.test(name)) {
          $('#name').after('<span class="error">Enter a valid name (letters and spaces only)</span>');
          isValidForm = false;
        }
      }
  
      if (email.length < 1) {
        $('#email').after('<span class="error">This field is required</span>');
        isValidForm = false;
      } else {
        // Email format validation
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
          $('#email').after('<span class="error">Enter a valid email</span>');
          isValidForm = false;
        }
      }
  
      if (msg.length < 1) {
        $('#msg').after('<span class="error">This field is required</span>');
        isValidForm = false;
      }
  
      if (isValidForm) {
        alert('Form submitted successfully!');
      }
  
      return isValidForm;
    });
  });