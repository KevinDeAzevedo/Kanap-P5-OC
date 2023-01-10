fetchData();

// Récupération des données dans L'API backend
async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/api/products');
    const data = await response.json();
    makeHtmlList(data)
  } catch (error) {
    console.error(error);
  }
}

/**
 * Construction de la liste des produits en HTML :
 * @param {Object} dataParam Les produits avec leur id, image, alt, nom, description
 */
function makeHtmlList(dataParam) {
  let productList = '';
  for (const product of dataParam) {
    productList +=
      '<a href="./product.html?id=' +
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
