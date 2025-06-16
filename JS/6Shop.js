     // Store original values
        const originalTotal = 62.93;
        let currentDiscount = 0.10; // 10% discount
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
                alert('Promo code applied! 10% discount activated.');
            } else if (code === 'SAVE20' || code === 'BOOK20') {
                currentDiscount = 0.20;
                promoApplied = true;
                alert('Promo code applied! 20% discount activated.');
            } else if (code === '') {
                currentDiscount = 0.10;
                promoApplied = true;
                alert('Default 10% discount applied!');
            } else {
                alert('Invalid promo code. Please try again.');
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
                alert('Please fill in all required fields.');
                return;
            }
            
            console.log('Form Data:', {
                firstName,
                lastName,
                address,
                phone,
                paymentMethod: selectedCard
            });
            
            alert(`Information confirmed! Payment method: ${selectedCard.toUpperCase()}. You can now proceed with your order.`);
        });
        
        // Order Now button functionality
        orderNowBtn.addEventListener('click', function() {
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const address = document.getElementById('address').value;
            const phone = document.getElementById('phone').value;
            
            if (!firstName || !lastName || !address || !phone) {
                alert('Please fill in all required information before placing your order.');
                return;
            }
            
            const finalAmount = finalTotalEl.textContent;
            alert(`Order confirmed! Thank you ${firstName} ${lastName}. Your total is ${finalAmount}. Payment method: ${selectedCard.toUpperCase()}. We'll ship your books to: ${address}`);
        });
        
        // Enter key support for promo code
        promoCodeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyBtn.click();
            }
        });
        
        // Initialize the display
        updateTotal();