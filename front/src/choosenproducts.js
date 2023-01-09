// Obtenir les infos des produits situés dans le caddy et ajouter les données manquantes
mergeProduct();

async function mergeProduct() {
  let allCart = getCart();
  try {
    for (let product of allCart) {
      const response = await fetch(`${apiUrl}/${product._id}`);
      const data = await response.json();
      product.price = data.price;
      product.name = data.name;
      product.imageUrl = data.imageUrl;
      product.altTxt = data.altTxt;

    }
  } catch (error) {
    console.error(error);
  }
  makeHtmlCartList(allCart);
  // Calcul du total
  calculTotal(allCart)
}

// Rendu en HTML des produits du panier
function makeHtmlCartList(param) {
  let cartList = '';
  for (const product of param) {
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
      product.price +
      ' €</p></div><div class="cart__item__content__settings"><div class="cart__item__content__settings__quantity"><p>Qté : </p><input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="' +
      product.quantity +
      '"></div><div class="cart__item__content__settings__delete"><p class="deleteItem" ">Supprimer</p></div></div></div></article>';
  }
  document.getElementById('cart__items').innerHTML = cartList;
  makeDeleteButtons()
  makeQteInputs()
}

// Boutons de suppression dynamiques
function makeDeleteButtons(){
  const articles = document.querySelectorAll('article')
  for (let article of articles){
    const id = article.dataset.id
    const color = article.dataset.color
    const button = article.querySelector('.deleteItem')
    button.addEventListener('click', function() {
      removeProduct(id, color)
      article.remove()
      mergeProduct()
  });
  }
}

// Inputs quantités dynamiques
function makeQteInputs(){
  const articles = document.querySelectorAll('article')
  for (let article of articles){
    const id = article.dataset.id
    const color = article.dataset.color
    article.querySelector('.itemQuantity').addEventListener('change', function (event) {
      let newQuantity = event.target.value * 1;
      if (newQuantity > 100 || newQuantity < 0){
        article.querySelector('.itemQuantity').style.color = "red"
        alert('Quantité invalide')
      } else {
        changeQuantity(id, color, newQuantity)
        mergeProduct()
      }
    });
  }
}

// Calcul du total
function calculTotal(allCartParam){
  let totalPrice = 0;
  let totalProducts = 0;
  for (let product of allCartParam){
    totalPrice += product.price * product.quantity
    totalProducts += product.quantity
  }
  document.querySelector('#totalQuantity').textContent = totalProducts
  document.querySelector('#totalPrice').textContent = totalPrice
}

//Formulaire
document.querySelector('#firstName').addEventListener('input', function(event) {
  firstName = event.target.value;  
});
document.querySelector('#lastName').addEventListener('input', function(event) {
  lastName = event.target.value;  
});
document.querySelector('#address').addEventListener('input', function(event) {
  address = event.target.value;  
});
document.querySelector('#city').addEventListener('input', function(event) {
  city = event.target.value;  
});
document.querySelector('#email').addEventListener('input', function(event) {
  email = event.target.value;  
});

class contact {
  constructor(firstName, lastName, address, city, email){
    this.firstName = firstName
    this.lastName = lastName
    this.address = address
    this.city = city
    this.email = email
  }
}

class order {
  constructor(contact, productsIds){
    this.contact = contact
    this.products = productsIds
  }
}

document.querySelector('#order').addEventListener('click', function(event){
  if(validateEmail(email)){
    // On envoie
    const contactObject = new contact(firstName, lastName, address, city, email)
    let productsIds = []
    createArrayProducts(productsIds)
    const orderObjects = new order(contactObject, productsIds)
    console.log(JSON.stringify(orderObjects))
  } else {
    alert("Email invalide");
    // On ne fait rien
  }
})

// Obtention des id du panier et les ajouter au tableau products
function createArrayProducts(idParam){
  let allCart = getCart();
  for (let product of allCart){
    idParam.push(product._id)
  }
}

// Validation de l'email avec Regex
function validateEmail(emailParam){
  var emailReg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
  return emailReg.test(emailParam);
}
