// Récupération de la chaine de requete dans l'URL
const queryString = window.location.search;

// Extraction de Order ID avec le constructeur URLSearchParams
const urlParams = new URLSearchParams(queryString);

document.querySelector('#orderId').textContent = urlParams.get('order-id')