// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navCenter = document.querySelector('.nav-content-center');

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navCenter.classList.toggle('active');
    const isOpen = navCenter.classList.contains('active');
    menuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navCenter.contains(e.target) && !menuBtn.contains(e.target) && navCenter.classList.contains('active')) {
        navCenter.classList.remove('active');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navCenter.classList.remove('active');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Project image slider functionality
document.querySelectorAll('.project-card').forEach(project => {
    const slider = project.querySelector('.image-slider');
    const images = slider.querySelectorAll('img');
    const prevBtn = project.querySelector('.prev');
    const nextBtn = project.querySelector('.next');
    const dots = project.querySelectorAll('.dot');
    let currentIndex = 0;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlider();
    });

    // Add dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });
});

// Image modal functionality
const modal = document.createElement('div');
modal.className = 'image-modal';
modal.innerHTML = `
    <span class="close-modal">&times;</span>
    <img class="modal-content" id="modal-image">
    <div class="modal-nav">
        <button class="modal-prev"><i class="fas fa-chevron-left"></i></button>
        <button class="modal-next"><i class="fas fa-chevron-right"></i></button>
    </div>
`;
document.body.appendChild(modal);

const modalImg = modal.querySelector('.modal-content');
const closeModal = modal.querySelector('.close-modal');
const modalPrev = modal.querySelector('.modal-prev');
const modalNext = modal.querySelector('.modal-next');

let currentProject = null;
let currentImageIndex = 0;

// Add click event to all project images
document.querySelectorAll('.project-card').forEach(project => {
    const images = project.querySelectorAll('.image-slider img');
    images.forEach((img, index) => {
        img.addEventListener('click', function() {
            currentProject = project;
            currentImageIndex = index;
            openModalWithImage(this.src);
        });
    });
});

function openModalWithImage(src) {
    modal.classList.add('show');
    modalImg.src = src;
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Navigate to previous image
modalPrev.addEventListener('click', function() {
    if (!currentProject) return;
    const images = currentProject.querySelectorAll('.image-slider img');
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentImageIndex].src;
});

// Navigate to next image
modalNext.addEventListener('click', function() {
    if (!currentProject) return;
    const images = currentProject.querySelectorAll('.image-slider img');
    currentImageIndex = (currentImageIndex + 1) % images.length;
    modalImg.src = images[currentImageIndex].src;
});

// Close modal when clicking the close button or outside the image
closeModal.addEventListener('click', closeImageModal);
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeImageModal();
    }
});

// Close modal with escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeImageModal();
    }
    // Add left/right arrow key navigation
    if (modal.classList.contains('show')) {
        if (e.key === 'ArrowLeft') {
            modalPrev.click();
        } else if (e.key === 'ArrowRight') {
            modalNext.click();
        }
    }
});

function closeImageModal() {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
    currentProject = null;
}

// Image Modal
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImg');
const closeImageModalBtn = document.getElementsByClassName('modal-close')[0];
const prevImageModalBtn = document.getElementsByClassName('modal-prev')[0];
const nextImageModalBtn = document.getElementsByClassName('modal-next')[0];
let currentImageModalIndex = 0;
let allImagesModal = [];

function openImageModalFunction(card) {
    imageModal.style.display = 'block';
    modalImage.src = card.querySelector('img').src;
    
    // Get all course cards
    allImagesModal = Array.from(document.querySelectorAll('.course-card img'));
    currentImageModalIndex = allImagesModal.findIndex(img => img.src === modalImage.src);
}

function closeImageModalFunction() {
    imageModal.style.display = 'none';
}

function showPrevImageModal() {
    currentImageModalIndex = (currentImageModalIndex - 1 + allImagesModal.length) % allImagesModal.length;
    modalImage.src = allImagesModal[currentImageModalIndex].src;
}

function showNextImageModal() {
    currentImageModalIndex = (currentImageModalIndex + 1) % allImagesModal.length;
    modalImage.src = allImagesModal[currentImageModalIndex].src;
}

// Event Listeners
closeImageModalBtn.onclick = closeImageModalFunction;
prevImageModalBtn.onclick = showPrevImageModal;
nextImageModalBtn.onclick = showNextImageModal;

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target === imageModal) {
        closeImageModalFunction();
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (imageModal.style.display === 'block') {
        if (e.key === 'ArrowLeft') showPrevImageModal();
        if (e.key === 'ArrowRight') showNextImageModal();
        if (e.key === 'Escape') closeImageModalFunction();
    }
});

// Scroll Animation
const sections = document.querySelectorAll('.section');

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Add hover effects to skill cards
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});
