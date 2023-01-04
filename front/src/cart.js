/*

function addProduct() {
  let shoppingBag = getCart();
  console.log(shoppingBag)
  for (product of shoppingBag) {
    if (productId === product._id && selectedColor == product.color) {
      product.quantity += selectedQuantity
      saveCart(shoppingBag)
      return
    } else {
      shoppingBag.push({"_id": productId, "color": selectedColor, "quantity":selectedQuantity})
      saveCart(shoppingBag)
      return
    }
  }
}

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



/////


function addProduct() {
  shoppingBag = []
  if (shoppingBag.length == 0){
    console.log('le tableau est vide')
    console.log('et on ajoute le produit actuel')
    shoppingBag.push({"_id": productId, "color": selectedColor, "quantity":selectedQuantity})
    console.log(shoppingBag)
    return 
  } else {
    for (product of shoppingBag) {
      if (productId === product._id && selectedColor == product.color) {
        console.log('produit deja existant')
        product.quantity += selectedQuantity
        console.log(shoppingBag)
        return
      } else {
        console.log('ajout dun nouveau produit')
        shoppingBag.push({"_id": productId, "color": selectedColor, "quantity":selectedQuantity})
        console.log(shoppingBag)
        return
      }
    }
  }
}

*/