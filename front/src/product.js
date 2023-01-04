const apiUrl = 'http://localhost:3000/api/products/';
let colorList = '<option value="">--SVP, choisissez une couleur --</option>';
let selectedColor = '';
let selectedQuantity = 0;

// Récupération de la chaine de requete dans l'URL
const queryString = window.location.search;

// Extraction de l'ID avec le constructeur URLSearchParams
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');

gettingProduct();

/**
 * On attend l'appel à l'API en y mettant l'ID extrait de l'URL
 * On attend la réponse en JSON dans 'data'
 * On appel la fonction 'makeHtmlProductInfo' avec 'data' en argument
 */
async function gettingProduct() {
  try {
    const response = await fetch(`${apiUrl}${productId}`);
    const data = await response.json();
    makeHtmlProductInfo(data);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Toutes les classes 'item__img' sont mise dans un tableau 'classImg'
 * On parcourt le tableau 'classImg' en y insérant une balise img
 * Pour chaque ID on y insert du texte
 * On parcourt le tableau de couleurs
 */
function makeHtmlProductInfo(param) {
  document.querySelector('.item__img').innerHTML =
    '<img src="' + param.imageUrl + '" alt="' + param.altTxt + '">';

  document.getElementById('title').textContent = param.name;
  document.getElementById('price').textContent = param.price;
  document.getElementById('description').textContent = param.description;

  for (const color of param.colors) {
    colorList += '<option value="' + color + '">' + color + '</option>';
  }
  document.getElementById('colors').innerHTML = colorList;
}

// evenement bouton
document.getElementById('addToCart').addEventListener('click', function () {
  if (selectedQuantity != 0 && selectedColor != '') {
    addProduct();
  } else {
    return;
  }
});

// evenement input couleur
document.getElementById('colors').addEventListener('input', function (event) {
  selectedColor = event.target.value;
});

// evenement input quantité
document.getElementById('quantity').addEventListener('input', function (event) {
  selectedQuantity = event.target.value * 1;
});

////

/*
Si ID du produit === à ID dans le tableau && COLOR du produit === à COLOR dans le talbeau
  Alors incrémenter QUANTITY du produit 
  Sinon ajouter lobjet entier dans le tableau
Sauvegarder 
*/

// {_id: '055743915a544fde83cfdfc904935ee7', color: 'Green', quantity: 1}


// Ajout du produit en cours au panier
function addProduct() {
  shoppingBag = getCart()
  if (shoppingBag.length == 0){
    console.log('le tableau est vide')
    console.log('et on ajoute le produit actuel')
    shoppingBag.push({"_id": productId, "color": selectedColor, "quantity":selectedQuantity})
    console.log(shoppingBag)
    saveCart(shoppingBag)
    return 
  } else {
    for (product of shoppingBag) {
      if (productId === product._id && selectedColor == product.color) {
        console.log('produit deja existant')
        product.quantity += selectedQuantity
        console.log(shoppingBag)
        saveCart(shoppingBag)
        return
      } else {
        console.log('ajout dun nouveau produit')
        shoppingBag.push({"_id": productId, "color": selectedColor, "quantity":selectedQuantity})
        console.log(shoppingBag)
        saveCart(shoppingBag)
        return
      }
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

