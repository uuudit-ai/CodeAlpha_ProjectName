const images = [{
        src: 'https://i.pinimg.com/736x/90/54/c9/9054c9d1c125fe8d48b457694d325003.jpg',
        category: 'nature'
    },
    {
        src: 'https://i.pinimg.com/736x/3e/ad/36/3ead36c68f4c9516679e2b1ab73dd890.jpg',
        category: 'city'
    },
    {
        src: 'https://i.pinimg.com/1200x/0f/f1/8f/0ff18f2aab4da451870346b8959e591f.jpg',
        category: 'abstract'
    },
    {
        src: 'https://i.pinimg.com/736x/6f/d7/be/6fd7beb79547430c1db8f7e31be00d0d.jpg',
        category: 'nature'
    },
    {
        src: 'https://i.pinimg.com/1200x/6d/d7/fe/6dd7fe3c6aa8d76a98dd7a9a9bd1ced6.jpg',
        category: 'city'
    },
    {
        src: 'https://i.pinimg.com/736x/c2/41/2b/c2412bd884ee89d3e3037cfd5ba20f3b.jpg',
        category: 'abstract'
    },
    {
        src: 'https://i.pinimg.com/736x/1a/80/ef/1a80ef1c57340019c55d8c55f77dee03.jpg',
        category: 'nature'
    },
    {
        src: 'https://i.pinimg.com/1200x/43/30/e7/4330e78c5844cb93aa25ef7cae190275.jpg',
        category: 'city'
    },
    {
        src: 'https://i.pinimg.com/736x/ed/13/23/ed1323c64bd0390a31c954e7849c6a9d.jpg',
        category: 'abstract'
    },
];

const galleryEl = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
let currentImageIndex = 0;
let filteredImages = images; // Tracks the currently displayed images

function displayImages(imagesToDisplay) {
    galleryEl.innerHTML = '';
    imagesToDisplay.forEach((image, index) => {
        const item = document.createElement('div');
        item.classList.add('gallery-item');
        item.dataset.category = image.category;
        item.innerHTML = `<img src="${image.src}" alt="Gallery image ${index + 1}">`;
        item.onclick = () => openLightbox(index);
        galleryEl.appendChild(item);
    });
}

function openLightbox(index) {
    currentImageIndex = index;
    lightbox.style.display = 'block';
    lightboxImg.src = filteredImages[currentImageIndex].src.replace('300/200', '700/500'); // Use larger version for lightbox
}

function closeLightbox() {
    lightbox.style.display = 'none';
}

function changeSlide(direction) {
    currentImageIndex += direction;
    if (currentImageIndex >= filteredImages.length) {
        currentImageIndex = 0;
    }
    if (currentImageIndex < 0) {
        currentImageIndex = filteredImages.length - 1;
    }
    lightboxImg.src = filteredImages[currentImageIndex].src.replace('300/200', '700/500');
}

// Filtering Logic
document.getElementById('filter-buttons').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        const filter = e.target.dataset.filter;
        filteredImages = (filter === 'all') ? images : images.filter(img => img.category === filter);
        displayImages(filteredImages);
    }
});

// Close lightbox when clicking outside the image or on the close button
document.querySelector('.close-btn').onclick = closeLightbox;
lightbox.onclick = (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
};

// Initial display of all images
displayImages(images);
