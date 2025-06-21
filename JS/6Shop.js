//menu toggle for mobile
const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');
menuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
});

 // Store original values
        const originalTotal = 62.93;
        let currentDiscount = 0; // 10% discount
        let promoApplied = true; // Start with promo applied
        let selectedCard = 'amret'; // Default selected card
        
        // DOM elements
        const promoCodeInput = document.getElementById('promoCode');
        const applyBtn = document.getElementById('applyBtn');
        const itemTotalEl = document.getElementById('itemTotal');
        const promoDiscountEl = document.getElementById('promoDiscount');
        const finalTotalEl = document.getElementById('finalTotal');
        const confirmBtn = document.getElementById('confirmBtn');
        const orderNowBtn = document.getElementById('orderNowBtn');
        const cardOptions = document.querySelectorAll('.card-option');
        
        // Card selection functionality
        cardOptions.forEach(card => {
            card.addEventListener('click', function() {
                // Remove selected class and hide dots from all cards
                cardOptions.forEach(c => {
                    c.classList.remove('selected');
                    const dot = c.querySelector('.selection-dot');
                    dot.classList.add('hidden');
                    dot.classList.remove('flex');
                });
                
                // Add selected class and show dot for clicked card
                this.classList.add('selected');
                const selectedDot = this.querySelector('.selection-dot');
                selectedDot.classList.remove('hidden');
                selectedDot.classList.add('flex');
                
                // Update selected card
                selectedCard = this.dataset.card;
                console.log('Selected payment method:', selectedCard);
            });
        });
        
        // Update total calculation
        function updateTotal() {
            const discountAmount = originalTotal * currentDiscount;
            const finalAmount = originalTotal - discountAmount;
            
            itemTotalEl.textContent = `$${originalTotal.toFixed(2)}`;
            promoDiscountEl.textContent = promoApplied ? `${(currentDiscount * 100).toFixed(0)}%` : '0%';
            finalTotalEl.textContent = `$${finalAmount.toFixed(2)}`;
        }
        
        // Apply promo code
        applyBtn.addEventListener('click', function() {
            const code = promoCodeInput.value.trim().toUpperCase();
            
            if (code === 'SAVE10' || code === 'BOOK10') {
                currentDiscount = 0.10;
                promoApplied = true;
                showCustomAlert('Promo code applied! 10% discount activated.', 'success');
            } else if (code === 'SAVE20' || code === 'BOOK20') {
                currentDiscount = 0.20;
                promoApplied = true;
                showCustomAlert('Promo code applied! 20% discount activated.', 'success');
        
            } else {
                showCustomAlert('Invalid promo code. Please try again.', 'error');
                return;
            }
            
            updateTotal();
            promoCodeInput.value = '';
        });
        
        // Confirm button functionality
        confirmBtn.addEventListener('click', function() {
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const address = document.getElementById('address').value;
            const phone = document.getElementById('phone').value;
            
            if (!firstName || !lastName || !address || !phone) {
               showCustomAlert('Please fill in all required fields.', 'warning');
                return;
            }
            
            console.log('Form Data:', {
                firstName,
                lastName,
                address,
                phone,
                paymentMethod: selectedCard
            });
            
            showCustomAlert(`Information confirmed! Payment method: ${selectedCard.toUpperCase()}.`, 'info');
            
        });
        
        // Order Now button functionality
        orderNowBtn.addEventListener('click', function() {
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const address = document.getElementById('address').value;
            const phone = document.getElementById('phone').value;
            
            if (!firstName || !lastName || !address || !phone) {
               showCustomAlert('Please fill in all required fields.', 'warning');
                return;
            }
            
            const finalAmount = finalTotalEl.textContent;
            
            showCustomAlert(`Order confirmed! Thank you ${firstName} ${lastName}. Your total is ${finalAmount}.`, 'success');
            setTimeout(() => {
                window.location.href = '/HTML/1Home_Page.html'; // Replace '/' with your homepage path if needed
                    }, 3000);
            });
        
        // Enter key support for promo code
        promoCodeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyBtn.click();
            }
        });
        
        // Initialize the display
        updateTotal();

 function showCustomAlert(message, type = 'info') {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');

    // Reset and apply type class
    alertBox.className = 'hidden fixed top-5 right-5 text-white px-4 py-3 rounded shadow-lg z-50 flex justify-between items-center min-w-[250px] max-w-xs';
    alertBox.classList.add(type, 'show');

    alertMessage.textContent = message;
    alertBox.classList.remove('hidden');

    // Auto-hide after 3 seconds
    setTimeout(() => {
      closeCustomAlert();
    }, 3000);
  }

  function closeCustomAlert() {
    const alertBox = document.getElementById('custom-alert');
    alertBox.classList.remove('show');
  } 