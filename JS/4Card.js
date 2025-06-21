        // Cart data
        let cartItems = [];
        let selectedBookIds = []; // Track multiple selected books
        
        // Different book cover images
       const bookImages = [
    "/PHOTO/1My Heavenly Favorite.webp",
    "/PHOTO/2That's All I Know.jpg",
    "/PHOTO/6The Lilac People.jpg",
    "/PHOTO/13Origin Stories.webp",
    "/PHOTO/18Lawless.jpg",
    "/PHOTO/14Little Mercy.jpg",
    "/PHOTO/15That's a Great Question, I'd Love to Tell You.webp"
];  
        const names = [
            "My Heavenly Favourite",
            "That's All I Know",
            "The Lilac People",
            "Origin Stories",
            "Lawless",
            "Little Mercy",
            "That's a Great Question, I'd Love to Tell You"
        ];
        const authors = [
            "Laura Barnett",
            "Sokhom Panha",
            "Yi Sokha",
            "Thou Liaheng",
            "Yi Monirom",
            "Lionel Messi",
            "Laura Barnett"
        ];
 
        
        // Initialize cart with 7 different items
        function initializeCart() {
            for (let i = 1; i <= 7; i++) {
                cartItems.push({
                    id: i,
                    title: names[i - 1], // Use different names for each book
                    type: "A Novel",
                    author: authors[i - 1], // Use different authors for each book
                    price: 8.99,
                    quantity: 1,
                    image: bookImages[i - 1] // Use different image for each book
                });
            }
            renderCart();
            updateTotals();
            updateSelectionCount();
        }
        
        // Select/deselect book function
        function selectBook(bookId) {
            const index = selectedBookIds.indexOf(bookId);
            if (index > -1) {
                // Book is already selected, remove it (undo selection)
                selectedBookIds.splice(index, 1);
            } else {
                // Book is not selected, add it
                selectedBookIds.push(bookId);
            }
            renderCart(); // Re-render to update visual selection
            updateSelectionCount();
        }
        
        // Update selection count display
        function updateSelectionCount() {
            const selectionCount = document.getElementById('selection-count');
            if (selectionCount) {
                selectionCount.textContent = `${selectedBookIds.length} selected`;
            }
        }
        
        // Validate selection and proceed
        function validateAndProceed(action) {
            if (selectedBookIds.length === 0) {
                showErrorModal();
                return;
            }
            
            // If items are selected, proceed based on action
            if (action === 'rent') {
                // You can replace this with actual navigation
                window.location.href = '5Rent.html';
            } else if (action === 'buy') {
                // You can replace this with actual navigation
                window.location.href = '6Shop.html';
            }
        }
        
        // Show error modal
        function showErrorModal() {
            const modal = document.getElementById('error-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            // Add animation
            const modalContent = modal.querySelector('div > div');
            modalContent.style.transform = 'scale(0.8)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modalContent.style.transform = 'scale(1)';
                modalContent.style.opacity = '1';
                modalContent.style.transition = 'all 0.3s ease-out';
            }, 10);
        }
        
        // Close error modal
        function closeErrorModal() {
            const modal = document.getElementById('error-modal');
            const modalContent = modal.querySelector('div > div');
            
            modalContent.style.transform = 'scale(0.8)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }, 200);
        }
        
        // Close modal when clicking outside
        document.getElementById('error-modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeErrorModal();
            }
        });
        
        // Render cart items
        function renderCart() {
            const cartContainer = document.getElementById('cart-items');
            cartContainer.innerHTML = '';
            
            cartItems.forEach((item) => {
                const isSelected = selectedBookIds.includes(item.id);
                const itemElement = document.createElement('div');
                itemElement.className = 'border-b border-gray-100 last:border-b-0';
                
                itemElement.innerHTML = `
                    <!-- Mobile Layout -->
                    <div class="lg:hidden p-4 hover:bg-gray-50 cursor-pointer relative transition-all duration-300 ${isSelected ? 'bg-blue-50 border-2 border-blue-300 rounded-lg shadow-md' : ''}" onclick="selectBook(${item.id})">
                        ${isSelected ? '<div class="absolute top-2 right-2 z-10"><i class="fas fa-check-circle text-blue-500 text-xl"></i></div>' : ''}
                        <div class="flex items-start gap-4 mb-4">
                            <div class="relative">
                                <img src="${item.image}" alt="${item.title}" class="w-16 h-20 object-cover rounded shadow-sm flex-shrink-0 ${isSelected ? 'ring-2 ring-blue-400' : ''}">
                            </div>
                            <div class="flex-1 min-w-0">
                                <h3 class="font-medium text-gray-800 text-base mb-1 ${isSelected ? 'text-blue-800' : ''}">${item.title}</h3>
                                <p class="text-sm text-gray-600 mb-1">${item.type}</p>
                                <p class="text-sm">
                                    <a href="#" class="text-blue-600   hover:text-blue-800">${item.author}</a>
                                    <span class="text-gray-600"> (Author)</span>
                                </p>
                            </div>
                            <button onclick="event.stopPropagation(); removeItem(${item.id})" class="text-red-500 hover:text-red-700 p-2 flex-shrink-0">
                                <i class="fas fa-trash text-lg"></i>
                            </button>
                        </div>
                        <div class="flex justify-between items-center pt-2">
                            <div class="flex items-center gap-2">
                                <label class="text-sm text-gray-600 font-medium">Qty:</label>
                                <input type="number" min="1" value="${item.quantity}" 
                                       onchange="updateQuantity(${item.id}, this.value)" onclick="event.stopPropagation()"
                                       class="w-12 text-center px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-orange-500">
                            </div>
                            <div class="text-lg font-medium text-gray-800">$${item.price.toFixed(2)}</div>
                        </div>
                    </div>
                    
                    <!-- Desktop Layout -->
                    <div class="hidden lg:flex items-center px-8 py-6 hover:bg-gray-50 cursor-pointer relative transition-all duration-300 ${isSelected ? 'bg-blue-50 border-2 border-blue-300 rounded-lg shadow-md' : ''}" onclick="selectBook(${item.id})">
                        ${isSelected ? '<div class="absolute top-4 right-4 z-10"><i class="fas fa-check-circle text-blue-500 text-2xl"></i></div>' : ''}
                        <div class="w-32 flex-shrink-0">
                            <img src="${item.image}" alt="${item.title}" class="w-[162px] h-[241px] object-cover rounded shadow-sm mx-auto ${isSelected ? 'ring-2 ring-blue-400' : ''}">
                        </div>
                        <div class="flex-1 ml-6 md:mb-[178px]">
                            <h3 class="font-medium text-gray-800 text-lg mb-1 ${isSelected ? 'text-blue-800' : ''}">${item.title}</h3>
                            <p class="text-base text-gray-600 mb-1">${item.type}</p>
                            <p class="text-base">
                                <a href="#" class="text-blue-600  hover:text-blue-800">${item.author}</a>
                                <span class="text-gray-600"> (Author)</span>
                            </p>
                        </div>
                        <div class="w-24 text-center">
                            <input type="number" min="1" value="${item.quantity}" 
                                   onchange="updateQuantity(${item.id}, this.value)" onclick="event.stopPropagation()"
                                   class="w-12 text-center px-2 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 text-base">
                        </div>
                        <div class="w-24 text-center">
                            <span class="font-medium text-gray-800 text-lg">$${item.price.toFixed(2)}</span>
                        </div>
                        <div class="w-16 text-center">
                            <button onclick="event.stopPropagation(); removeItem(${item.id})" class="text-red-500 hover:text-red-700 p-2">
                                <i class="fas fa-trash text-lg"></i>
                            </button>
                        </div>
                    </div>
                `;
                
                cartContainer.appendChild(itemElement);
            });
        }
        
        // Update item quantity
        function updateQuantity(itemId, newQuantity) {
            const quantity = parseInt(newQuantity);
            if (quantity < 1) return;
            
            const item = cartItems.find(item => item.id === itemId);
            if (item) {
                item.quantity = quantity;
                updateTotals();
            }
        }
        
        // Remove item from cart
        function removeItem(itemId) {
            cartItems = cartItems.filter(item => item.id !== itemId);
            // Remove from selection if the item was selected
            const index = selectedBookIds.indexOf(itemId);
            if (index > -1) {
                selectedBookIds.splice(index, 1);
            }
            renderCart();
            updateTotals();
            updateSelectionCount();
        }
        
        // Update totals
        function updateTotals() {
            const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            document.getElementById('total-quantity').textContent = totalQuantity;
            document.getElementById('total-price').textContent = totalPrice.toFixed(2);
            if (document.getElementById('cart-badge')) {
                document.getElementById('cart-badge').textContent = totalQuantity;
            }
        }
        
        // Initialize the cart when the page loads
        initializeCart();