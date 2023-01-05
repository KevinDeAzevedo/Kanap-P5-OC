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