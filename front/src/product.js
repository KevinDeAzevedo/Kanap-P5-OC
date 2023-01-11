let colorList = '<option value="">--SVP, choisissez une couleur --</option>';
let selectedColor = '';
let selectedQuantity = 0;

// Récupération de la chaine de requete dans l'URL
const queryString = window.location.search;

// Extraction de l'ID avec le constructeur URLSearchParams
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');

gettingProduct();

// Récupération des données du produit de la page dans L'API backend
async function gettingProduct() {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${productId}`);
    const data = await response.json();
    makeHtmlProductInfo(data);
  } catch (error) {
    console.error(error);
  }
}

/**
 * 
 * @param {Object} dataParam Le produit avec son image, alt, nom, prix, description, couleur
 */
function makeHtmlProductInfo(dataParam) {
  document.querySelector('.item__img').innerHTML =
    '<img src="' + dataParam.imageUrl + '" alt="' + dataParam.altTxt + '">';
  document.getElementById('title').textContent = dataParam.name;
  document.getElementById('price').textContent = dataParam.price;
  document.getElementById('description').textContent = dataParam.description;
  for (const color of dataParam.colors) {
    colorList += '<option value="' + color + '">' + color + '</option>';
  }
  document.getElementById('colors').innerHTML = colorList;
}

// Evenement bouton Ajouter au Panier
document.getElementById('addToCart').addEventListener('click', function () {
  // Conditionner les valeurs des inputs
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

// Evenement input couleur
document.getElementById('colors').addEventListener('input', function (event) {
  selectedColor = event.target.value;
});

// Evenement input quantité
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


