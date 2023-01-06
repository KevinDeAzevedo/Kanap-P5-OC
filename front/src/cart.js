const apiUrl = 'http://localhost:3000/api/products';

// Sauvegarder le caddy
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Obtenir le caddy
function getCart() {
  let cart = localStorage.getItem('cart');
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

// Supprimer un produit du caddy
function removeProduct(idParam, colorParam){
  let cart = getCart()
  cart = cart.filter(item => item._id !== idParam || item.color !== colorParam)
  console.log(cart)
  saveCart(cart)
}


