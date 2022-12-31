const apiUrl = 'http://localhost:3000/api/products';
let productList = '';

fetchData();

/**
 * On attend l'appel à l'API
 * On attend la réponse en JSON dans 'data'
 * On appel la fonction 'makeHtmlList' avec 'data' en argument
 */
async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    makeHtmlList(data);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Pour chaque produits présent dans 'data', on ajoute une string HTML dans 'productList'
 * On insert dans l'ID 'items' la string productList
 */
function makeHtmlList(param) {
  for (const product of param) {
    productList +=
      '<a href="./pages/product.html?id=' +
      product._id +
      '"><article><img src="' +
      product.imageUrl +
      '" alt="' +
      product.altTxt +
      '"><h3 class="productName">' +
      product.name +
      '</h3><p class="productDescription">' +
      product.description +
      '</p></article></a>';
  }

  document.getElementById('items').innerHTML = productList;
}

console.log(localStorage)