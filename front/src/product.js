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
    const response = await fetch(`${apiUrl}/${productId}`);
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
  if (selectedColor == ''){
    alert('couleur non sélectionnée')
  } else if (selectedQuantity <= 0) {
    alert('quantité trop faible')
  } else if (selectedQuantity > 100){
    alert('quantité trop grande, pas plus de 100 !')
  } else if (selectedQuantity > 0 && selectedColor != ''){
    addProduct()
    if (window.confirm("Aller voir le panier ?")) {
      window.open("cart.html");
    }
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

// Ajout du produit en cours au panier
function addProduct() {
  const shoppingBag = getCart()
  const foundProduct = shoppingBag.find(item => item._id === productId && item.color === selectedColor)
  if (foundProduct != undefined){
    foundProduct.quantity += selectedQuantity
  } else {
    shoppingBag.push({"_id": productId, "color": selectedColor, "quantity":selectedQuantity})
  }
  saveCart(shoppingBag)
}


