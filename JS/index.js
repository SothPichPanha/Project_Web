
//menu toggle for mobile
const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');
menuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
});

// Add to cart functionality
        // Description toggle
const descriptionToggle = document.getElementById('description-toggle');
const descriptionContent = document.getElementById('description-content');
const descriptionIcon = document.getElementById('description-icon');

descriptionToggle.addEventListener('click', () => {
    descriptionContent.classList.toggle('hidden');
    descriptionIcon.classList.toggle('fa-chevron-up');
    descriptionIcon.classList.toggle('fa-chevron-down');
});

        // Product details toggle
const detailsToggle = document.getElementById('details-toggle');
const detailsContent = document.getElementById('details-content');
const detailsIcon = document.getElementById('details-icon');

detailsToggle.addEventListener('click', () => {
    detailsContent.classList.toggle('hidden');
    detailsIcon.classList.toggle('fa-chevron-up');
    detailsIcon.classList.toggle('fa-chevron-down');
});

// Smooth horizontal scrolling for bestsellers on mobile
const bestSellersContainer = document.getElementById('bestsellers-container');
let isScrolling = false;

bestSellersContainer.addEventListener('wheel', (e) => {
            if (window.innerWidth < 768) {
                e.preventDefault();
                bestSellersContainer.scrollLeft += e.deltaY;
            }
        });
