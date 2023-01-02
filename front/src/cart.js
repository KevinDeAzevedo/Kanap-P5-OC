let monPanier = [
  {
    "_id": "1234",
    "color": "green",
    "quantity": 2,
  },
  {
    "_id": "415b7cacb65d43b2b5c1ff70f3393ad1",
    "color": "red",
    "quantity": 1,
  },
  {
    "_id": "415b7cacb65d43b2b5c1ff70f3393ad3",
    "color": "yellow",
    "quantity": 1,
  },
];

const idProduit = '1234';
const colorProduit = 'green';
const qteProduit = 1;

/*
Si ID du produit === à ID dans le tableau && COLOR du produit === à COLOR dans le talbeau
  Alors incrémenter QUANTITY du produit 
  Sinon ajouter lobjet entier dans le tableau
Sauvegarder 
*/

addProduct()

function addProduct() {
  for (pdt of monPanier){
    if (idProduit === pdt._id && colorProduit == pdt.color){
      pdt.quantity += qteProduit
      console.log('found!')
      return
    } else {
      console.log('not found...')
      monPanier.push({"_id": idProduit, "color": colorProduit, "quantity":qteProduit})
      return 
    }
  }
}

console.log(monPanier)