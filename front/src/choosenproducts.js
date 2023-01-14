mergeProduct();

// Fusionner les données du LocalStorage et les données du l'API
async function mergeProduct() {
  let allCart = getCart();
  try {
    for (let product of allCart) {
      const response = await fetch(`http://localhost:3000/api/products/${product._id}`);
      const data = await response.json();
      product.price = data.price;
      product.name = data.name;
      product.imageUrl = data.imageUrl;
      product.altTxt = data.altTxt;
      // Forcer quantité à 100 si quantité +100
      formatMaxQuantity(product, allCart)
    }
  } catch (error) {
    console.error(error);
  }
  // Construction de la liste des produits situé dans le panier en HTML
  makeHtmlCartList(allCart);
  // Calcul du prix et quantité total
  calculTotal(allCart);
}

/**
 * Forcer quantité à 100 si quantité +100
 * sinon si
 * Supprimer produit si quantité <= 0
 * @param {Object} productParam 
 * @param {Array<Object>} allCartParam 
 */
function formatMaxQuantity(productParam, allCartParam){
  if (productParam.quantity > 100){
    alert(`Une quantité de ${productParam.quantity} est trop grandes! Max 100 par produit.`)
    productParam.quantity = 100
    saveCart(allCartParam)
  } else if (productParam.quantity <= 0){
    alert(`Une quantité à ${productParam.quantity}, entraine la suppression du produit`)
    removeProduct(productParam._id, productParam.color);
    location.reload()
  }
}

/**
 * Rendu en HTML des produits du panier
 * @param {Array<Object>} cartParam 
 */
function makeHtmlCartList(cartParam) {
  let cartList = '';
  for (const product of cartParam) {
    cartList +=
      '<article class="cart__item" data-id="' +
      product._id +
      '" data-color="' +
      product.color +
      '"><div class="cart__item__img"><img src="' +
      product.imageUrl +
      '" alt=""></div><div class="cart__item__content"><div class="cart__item__content__description"><h2>' +
      product.name +
      '</h2><p>' +
      product.color +
      '</p><p>' +
      priceFormat(product.price)+
      ' €</p></div><div class="cart__item__content__settings"><div class="cart__item__content__settings__quantity"><p>Qté : </p><input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="' +
      product.quantity +
      '"></div><div class="cart__item__content__settings__delete"><p class="deleteItem" ">Supprimer</p></div></div></div></article>';
  }
  document.getElementById('cart__items').innerHTML = cartList;
  // Construction des boutons de suppression
  makeDeleteButtons();
  // Construction des input quantité
  makeQteInputs();
}

// Boutons de suppression dynamiques
function makeDeleteButtons() {
  const articles = document.querySelectorAll('article');
  for (let article of articles) {
    const id = article.dataset.id;
    const color = article.dataset.color;
    const button = article.querySelector('.deleteItem');
    button.addEventListener('click', function () {
      // Suppression du produit
      removeProduct(id, color);
      // Suppression du produit dans l'interface HTML
      article.remove();
      // Fusion du LocalStorage et API
      mergeProduct();
    });
  }
}

// Inputs quantités dynamiques
function makeQteInputs() {
  const articles = document.querySelectorAll('article');
  for (let article of articles) {
    const id = article.dataset.id;
    const color = article.dataset.color;
    article
      .querySelector('.itemQuantity')
      .addEventListener('change', function (event) {
        let newQuantity = event.target.value * 1;
        newQuantity = Math.round(newQuantity) * (Math.sign(newQuantity)) // Formate à un Integer Positif
        if (newQuantity == 0){
          alert(`Une quantité à ${newQuantity}, entraine la suppression du produit`)
          removeProduct(id, color);
        }
        // Modifie la quantité au niveau du caddy de la page
        changeQuantity(id, color, newQuantity);
        // Fusion du LocalStorage et API
        mergeProduct();
      });
  }
}

// Calcul du prix et quantité total
function calculTotal(allCartParam) {
  let totalPrice = 0;
  let totalProducts = 0;
  for (let product of allCartParam) {
    totalPrice += product.price * product.quantity;
    totalProducts += product.quantity;
  }
  // Construction de l'interface HTML
  document.querySelector('#totalQuantity').textContent = totalProducts;
  document.querySelector('#totalPrice').textContent = priceFormat(totalPrice);
}

// Récupération des valeurs input du formulaire
document
  .querySelector('#firstName').addEventListener('input', function (event) {
  firstName = event.target.value;
  });
document.querySelector('#lastName').addEventListener('input', function (event) {
  lastName = event.target.value;
});
document.querySelector('#address').addEventListener('input', function (event) {
  address = event.target.value;
});
document.querySelector('#city').addEventListener('input', function (event) {
  city = event.target.value;
});
document.querySelector('#email').addEventListener('input', function (event) {
  email = event.target.value;
});

// Préparation de l'objet à envoyer à l'API
class order {
  constructor(contactObject, productsIds) {
    this.contact = contactObject;
    this.products = productsIds;
  }
}

// Fonction du bouton 'Commander'
document.querySelector('#order').addEventListener('click', function (event) {
  event.preventDefault()
  if (isCartHasProduct('Veuiller remplir votre panier') && isMaxQuantity() && validateName(firstName, 'Prénom invalide') && validateName(lastName, 'Nom invalide') && validateLocation(address, 'Adresse Invalide') && validateLocation(city, 'Ville Invalide') && validateEmail(email)) {
    // Stocker les valeurs du formulaire dans un objet
    const contactObject = {firstName:`${firstName}`,lastName:`${lastName}`,address:`${address}`,city:`${city}`,email:`${email}`}
    let productsIds = [];
    // Parcourir les produits du panier et les stocker le tableau ci-dessus
    createArrayProducts(productsIds);
    // Création de l'objet order, avec les objets contactObject et productsIds
    const orderObjects = new order(
      contactObject,
      productsIds
    );
    // Envoie de l'objet vers l'API
    sendRequestOrder(orderObjects);
  } else {
    // On ne fait rien
  }
});

/**
 * Stocker les ids du panier
 * @param {Array<string>} idParam 
 */
function createArrayProducts(idParam) {
  let allCart = getCart();
  for (let product of allCart) {
    idParam.push(product._id);
  }
}

/**
 * Fonction pour le Submit : Re-vérifier si tous les produits ont une quantité max de 100
 * Si +100, appeler la fonction Merge qui forcera la quantité à 100
 * @returns {boolean} 
 */
function isMaxQuantity(){
  let allCart = getCart();
  for (let product of allCart){
    if (product.quantity > 100 || product.quantity <= 0){
      mergeProduct()
      return false
    } else {
      return true
    }
  }
}

/**
 * Panier disposant d'un produit : vrai ou faux ?
 * @param {*} alertMessageParam 
 * @returns {boolean}
 */
function isCartHasProduct(alertMessageParam){
  if (getCart().length != 0){
    return true
  } else {
    alert(alertMessageParam)
    return false
  }
}

/**
 * Validation de l'email par Regex
 * @param {string} emailParam 
 * @returns {boolean} 
 */
function validateEmail(emailParam){
  const emailReg = new RegExp(/^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/i) // Format e-mail
  if (emailReg.test(emailParam)){
    return emailReg.test(emailParam);
  } else {
    alert('Email invalide');
    return emailReg.test(emailParam);
  }
}

/**
 * Validation du Prénom et Nom par Regex
 * @param {string} nameParam
 * @param {string} alertMessageParam
 * @returns {boolean} 
 */
function validateName(nameParam, alertMessageParam){
  const nameReg = new RegExp(/^[a-zA-ZÀ-ÿ -]*$/i)
  if (nameReg.test(nameParam)){
    return nameReg.test(nameParam);
  } else {
    alert(alertMessageParam);
    return nameReg.test(nameParam);
  }
}

/**
 * Validation de l'adresse et de la Ville
 * @param {string} locationParam
 * @param {string} alertMessageParam
 * @returns {boolean} 
 */
function validateLocation(locationParam, alertMessageParam){
  const locationReg = new RegExp(/^[a-zA-Z0-9À-ÿ -]*$/i)
  if (locationReg.test(locationParam)){
    return locationReg.test(locationParam);
  } else {
    alert(alertMessageParam);
    return locationReg.test(locationParam);
  }
}

/**
 * Envoi de l'objet 'order' en POST vers l'API
 * @param {Object} objectParam Objet 'order'
 */
async function sendRequestOrder(objectParam){
  let response = await fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(objectParam)
  });
  let result = await response.json();
  // Redirection vers la page confirmation en passant orderId reçu en reponse de l'API
  window.location.href = `./confirmation.html?order-id=${result.orderId}`
}