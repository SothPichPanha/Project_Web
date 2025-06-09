// Shopping cart functionality

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateTotals();
});

// Remove item from cart
function removeItem(button) {
    const cartItem = button.closest('.cart-item');
    const itemDivider = cartItem.nextElementSibling;

    // Add fade out animation
    cartItem.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    cartItem.style.opacity = '0';
    cartItem.style.transform = 'translateX(-100%)';

    // Remove item and divider after animation
    setTimeout(() => {
        cartItem.remove();
        if (itemDivider && itemDivider.querySelector('svg')) {
            itemDivider.remove();
        }
        updateTotals();
    }, 300);
}

// Update total quantity and price
function updateTotals() {
    const cartItems = document.querySelectorAll('.cart-item');
    let totalQuantity = 0;
    let totalPrice = 0;

    cartItems.forEach(item => {
        const quantityElement = item.querySelector('.quantity-display');
        const priceElement = item.querySelector('.item-price');

        if (quantityElement && priceElement) {
            const quantity = parseInt(quantityElement.textContent.trim()) || 0;
            const price = parseFloat(priceElement.dataset.price) || 0;

            totalQuantity += quantity;
            totalPrice += price * quantity;
        }
    });

    // Update display
    const totalQuantityElement = document.getElementById('total-quantity');
    const totalPriceElement = document.getElementById('total-price');

    if (totalQuantityElement) {
        totalQuantityElement.textContent = totalQuantity;
    }

    if (totalPriceElement) {
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Show empty cart message if no items
    if (totalQuantity === 0) {
        showEmptyCartMessage();
    }
}

// Show empty cart message
function showEmptyCartMessage() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = `
        <div class="text-center py-20">
            <div class="text-4xl text-gray-400 mb-4">🛒</div>
            <div class="text-2xl text-gray-600 mb-2">Your cart is empty</div>
            <div class="text-lg text-gray-500">Add some books to get started!</div>
        </div>
    `;
}

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('input[type="text"]');

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });

        // Add search icon click functionality
        const searchIcon = searchInput.parentElement.querySelector('svg');
        if (searchIcon) {
            searchIcon.addEventListener('click', function() {
                performSearch(searchInput.value);
            });
        }
    }
});

// Perform search (placeholder function)
function performSearch(query) {
    if (query.trim()) {
        console.log('Searching for:', query);
        // Here you would implement actual search functionality
        alert(`Searching for: ${query}`);
    }
}

// Add click handlers for action buttons
document.addEventListener('DOMContentLoaded', function() {
    const rentButton = document.querySelector('button:contains("Rent")');
    const buyButton = document.querySelector('button:contains("Buy")');

    // Get buttons by their text content
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.textContent.trim() === 'Rent') {
            button.addEventListener('click', function() {
                handleRent();
            });
        } else if (button.textContent.trim() === 'Buy') {
            button.addEventListener('click', function() {
                handleBuy();
            });
        }
    });
});

// Handle rent action
function handleRent() {
    const totalQuantity = document.getElementById('total-quantity').textContent;
    const totalPrice = document.getElementById('total-price').textContent;

    if (parseInt(totalQuantity) > 0) {
        alert(`Proceeding to rent ${totalQuantity} items for ${totalPrice}`);
        // Here you would implement actual rent functionality
    } else {
        alert('Your cart is empty. Add some books to rent!');
    }
}

// Handle buy action
function handleBuy() {
    const totalQuantity = document.getElementById('total-quantity').textContent;
    const totalPrice = document.getElementById('total-price').textContent;

    if (parseInt(totalQuantity) > 0) {
        alert(`Proceeding to buy ${totalQuantity} items for ${totalPrice}`);
        // Here you would implement actual buy functionality
    } else {
        alert('Your cart is empty. Add some books to buy!');
    }
}

// Add mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add mobile menu button if needed
    const header = document.querySelector('.bg-orange-200');

    // Add responsive behavior for mobile
    function handleResize() {
        const isMobile = window.innerWidth < 640;
        const navLinks = document.querySelector('.max-sm\\:hidden');

        if (isMobile && navLinks) {
            // Mobile-specific adjustments can be added here
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on load
});

// Smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to any anchor links
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
