import products from './products.js';
import cart from './cart.js'; ///Ecommerce-Project/cart.js for github Pages


let app = document.getElementById('app');
let temporaryContent = document.getElementById('temporaryContent');

// load layout file
const loadTemplate = () => {
    fetch('template.html')
    .then(response => response.text())
    .then(html => {
        app.innerHTML = html;
        let contentTab = document.getElementById('contentTab');
        contentTab.innerHTML = temporaryContent.innerHTML;
        temporaryContent.innerHTML = null;
        cart();
        Carousel();
        initApp();
    })
}

loadTemplate();
const initApp = () => {
     // load list product
     let listProductHTML = document.querySelector('.listProduct');
     listProductHTML.innerHTML = null;
     
     products.forEach(product => {
         let newProduct = document.createElement('div');
         newProduct.classList.add('item');
         newProduct.innerHTML = 
         `<a href="detail.html?id=${product.id}">
             <img src="${product.image}">
         </a>
         <h2>${product.name}</h2>
         <div class="price">$${product.price}</div>
         <button 
             class="addCart" 
             data-id='${product.id}'>
                 Add To Cart
         </button>`;
         listProductHTML.appendChild(newProduct);
    });
}

const Carousel = () => {
    const slidesContainer = document.querySelector('.carousel-slides');
    const itemsToShow = products.slice(0, 3);

    // Create carousel slides
    itemsToShow.forEach(product => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide');
        slide.innerHTML = 
         `<a href="detail.html?id=${product.id}">
             <img src="${product.image}">
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

    document.querySelector('.prev-btn').addEventListener('click', goToPreviousSlide);
    document.querySelector('.next-btn').addEventListener('click', goToNextSlide);

    // Initialize the first slide
    showSlide(currentSlide);
};