import products from './products.js';
import cart from './cart.js';

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
   // Add event listeners to "Add To Cart" buttons
   const addCartButtons = document.querySelectorAll('.addCart');
   addCartButtons.forEach(button => {
       button.addEventListener('click', () => {
           showPopup();
       });
   });

   // Function to show the popup
   const showPopup = () => {
       const popup = document.getElementById('popup');
       popup.style.display = 'block';

       // Hide popup after 2 seconds
       setTimeout(() => {
           popup.style.display = 'none';
       }, 2000);
   };

   // Add event listener to close button
   const closeButton = document.getElementById('popup-close');
   closeButton.addEventListener('click', () => {
       const popup = document.getElementById('popup');
       popup.style.display = 'none';
   });
}