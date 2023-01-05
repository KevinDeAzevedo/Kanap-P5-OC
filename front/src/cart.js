const apiUrl = 'http://localhost:3000/api/products/';

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

// Obtenir les infos des produits situés dans le caddy
gettingProduct()

async function gettingProduct() {
  let allCart = getCart()
  console.log(allCart)
  try {
    for (let product of allCart){
      const response = await fetch(`${apiUrl}${product._id}`);
      const data = await response.json();
      product.price = data.price
      product.name = data.name
      product.imageUrl = data.imageUrl
      product.altTxt = data.altTxt
    }
  } catch (error) {
    console.error(error);
  }
}
