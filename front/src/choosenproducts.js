// Obtenir les infos des produits situés dans le caddy et ajouter les données manquantes
mergeProduct();

async function mergeProduct() {
  let allCart = getCart();
  console.log(allCart);
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
      '"></div><div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p></div></div></div></article>';
  }
  document.getElementById('cart__items').innerHTML = cartList;
}
