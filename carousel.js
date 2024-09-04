import products from "./products.js";

const carousel = () => {
    // Select the container element
    const container = document.querySelector('.container');

    // Create the carousel container elements
    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('carousel-container');

    const carousel = document.createElement('div');
    carousel.classList.add('carousel');

    const slidesContainer = document.createElement('div');
    slidesContainer.classList.add('carousel-slides');

    const prevButton = document.createElement('button');
    prevButton.classList.add('prev-btn');
    prevButton.innerHTML = '&lt;';

    const nextButton = document.createElement('button');
    nextButton.classList.add('next-btn');
    nextButton.innerHTML = '&gt;';

    // Assemble the carousel structure
    carousel.appendChild(slidesContainer);
    carousel.appendChild(prevButton);
    carousel.appendChild(nextButton);
    carouselContainer.appendChild(carousel);

    // Insert the carousel container before the #contentTab div
    const contentTab = document.querySelector('#contentTab');
    container.insertBefore(carouselContainer, contentTab);

    // Create carousel slides
    const itemsToShow = products.slice(0, 3);

    itemsToShow.forEach(product => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide');
        slide.innerHTML = 
         `<a href="detail.html?id=${product.id}">
             <img src="${product.image}" alt="${product.name}">
         </a><div class="productInfo">
         <h2>${product.name}</h2>
         <div class="price">$${product.price}</div>
         <button 
             class="addCart" 
             data-id='${product.id}'>
                 Add To Cart
         </button>
         </div>`;
        slidesContainer.appendChild(slide);
    });

    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;

    function showSlide(index) {
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    }

    function goToNextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function goToPreviousSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    prevButton.addEventListener('click', goToPreviousSlide);
    nextButton.addEventListener('click', goToNextSlide);

    // Initialize the first slide
    showSlide(currentSlide);
};

export default carousel;
