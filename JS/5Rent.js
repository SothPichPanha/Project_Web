  // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                mobileMenuButton.classList.toggle('hamburger-active');
            });
        }

        // Form handling
        const rentForm = document.getElementById('rent-form');
        const startDateInput = document.getElementById('start-date');
        const endDateInput = document.getElementById('end-date');
        const errorMessage = document.getElementById('error-message');
        const successModal = document.getElementById('success-modal');
        const closeModalButton = document.getElementById('close-modal');
        const successMessage = document.getElementById('success-message');

        // Set default dates (today and tomorrow)
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        startDateInput.value = today.toISOString().split('T')[0];
        endDateInput.value = tomorrow.toISOString().split('T')[0];

        // Set minimum dates
        startDateInput.min = today.toISOString().split('T')[0];
        endDateInput.min = today.toISOString().split('T')[0];

        // Update end date minimum when start date changes
        startDateInput.addEventListener('change', () => {
            const startDate = new Date(startDateInput.value);
            const nextDay = new Date(startDate);
            nextDay.setDate(nextDay.getDate() + 1);
            
            endDateInput.min = nextDay.toISOString().split('T')[0];
            
            // If end date is before new minimum, update it
            if (endDateInput.value && new Date(endDateInput.value) <= startDate) {
                endDateInput.value = nextDay.toISOString().split('T')[0];
            }
            
            hideError();
        });

        // Hide error when end date changes
        endDateInput.addEventListener('change', hideError);

        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.classList.remove('hidden');
        }

        function hideError() {
            errorMessage.classList.add('hidden');
        }

        function validateDates() {
            const startDate = new Date(startDateInput.value);
            const endDate = new Date(endDateInput.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (!startDateInput.value || !endDateInput.value) {
                showError('Please select both start and end dates.');
                return false;
            }

            if (startDate < today) {
                showError('Start date cannot be in the past.');
                return false;
            }

            if (endDate <= startDate) {
                showError('End date must be after the start date.');
                return false;
            }

            const daysDifference = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
            if (daysDifference > 30) {
                showError('Rental period cannot exceed 30 days.');
                return false;
            }

            return true;
        }

        function generateNumericCode(length = 6) {
            let code = '';
            for (let i = 0; i < length; i++) {
                const digit = Math.floor(Math.random() * 10);
                code += digit;
            }
            return code;
        }

        function showSuccessModal(startDate, endDate, duration, code) {
            const message = 
                `Start Date: ${new Date(startDate).toLocaleDateString()}<br>` +
                `End Date: ${new Date(endDate).toLocaleDateString()}<br>` +
                `Duration: ${duration} day${duration > 1 ? 's' : ''}<br>` +
                `Rental Code: <strong>${code}</strong>`;
            
            successMessage.innerHTML = message;
            successModal.classList.remove('hidden');
            successModal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        }

        function hideSuccessModal() {
            successModal.classList.add('hidden');
            successModal.classList.remove('flex');
            document.body.style.overflow = 'auto';
        }

        // Close modal event listeners
        closeModalButton.addEventListener('click', hideSuccessModal);

        // Close modal when clicking outside
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                hideSuccessModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !successModal.classList.contains('hidden')) {
                hideSuccessModal();
            }
        });

        // Form submission
        rentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validateDates()) {
                const startDate = startDateInput.value;
                const endDate = endDateInput.value;
                const daysDifference = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
                const myCode = generateNumericCode();
                
                showSuccessModal(startDate, endDate, daysDifference, myCode);
                console.log(`Rental request submitted:\nStart Date: ${startDate}\nEnd Date: ${endDate}\nDuration: ${daysDifference} day(s)\nCode: ${myCode}`);
            }
        });