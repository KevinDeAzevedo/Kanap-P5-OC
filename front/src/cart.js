/**
 * Sauvegarder le caddy
 * @param {Array<Object>} cartParam
 */
function saveCart(cartParam) {
  localStorage.setItem('cart', JSON.stringify(cartParam));
}

/**
 * Obtenir le caddy
 * @return {Array} Tableau vide ou contenant des Objets
 */
function getCart() {
  let cart = localStorage.getItem('cart');
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

/**
 * Supprimer un produit du caddy
 * @param {string} idParam Id
 * @param {string} colorParam Couleur
 */
function removeProduct(idParam, colorParam){
  let cart = getCart()
  cart = cart.filter(item => item._id !== idParam || item.color !== colorParam)
  saveCart(cart)
}

/**
 * Changement de quantité d'un produit du caddy
 * @param {string} idParam Id
 * @param {string} colorParam Couleur
 * @param {number} quantityParam Quantité
 */
function changeQuantity(idParam, colorParam, quantityParam){
  let cart = getCart()
  let foundProduct = cart.find(item => item._id == idParam && item.color == colorParam)
  if (foundProduct != undefined){
    foundProduct.quantity = quantityParam
  }
  saveCart(cart)
}

/**
 * Format du prix : 9999 en 9 999
 * @param {number} param 
 * @return {number}
 */
function priceFormat(param){
  const priceFormated = new Intl.NumberFormat().format(param);
  return priceFormated
}

