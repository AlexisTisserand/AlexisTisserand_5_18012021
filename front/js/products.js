//Récupérer l'URL et l'ID produit

const urlActuelle = window.location.href;
const productUrl = new URL(urlActuelle);
const productId = productUrl.searchParams.get("id");
//console.log(productId); //Affiche l'ID de l'url du produit sur lequel j'ai cliqué

import {api} from "./api.js";

//fetch
function displayProduct() {
    api.fetchEndPoint(`http://localhost:3000/api/teddies/${productId}`)
        .then(productDatas => {
            try {
                const productName = document.getElementById('productName');
                const productImage = document.getElementById('productImage');
                const productDescription = document.getElementById('productDescription');
                const productColors = document.getElementById('productColors');
                const productPrice = document.getElementById('productPrice');
                const productId = document.getElementById('productId')

            
             

                //MISE EN PLACE SELECT COLOR
                const selectColor = document.createElement('select');
                selectColor.setAttribute("id", "selectColor");
                productColors.appendChild(selectColor);

                const askColor = document.createElement('option')
                askColor.setAttribute("value", "choice")
                selectColor.appendChild(askColor)
                askColor.innerHTML = "Choisissez une couleur"

                for(let i = 0; i < productDatas.colors.length; i++) {
            
                    let choiceColor = document.createElement('option');
                    choiceColor.setAttribute("value", productDatas.colors[i]);
                    selectColor.appendChild(choiceColor);
                    choiceColor.innerHTML = productDatas.colors[i];
                }

                productName.innerHTML = productDatas.name
                productImage.src = productDatas.imageUrl;
                productPrice.innerText = `${(productDatas.price) / 100 + ".00€"}`; 
                productDescription.innerText = productDatas.description; 
                productId.innerHTML = productDatas._id;

                console.log(productColors);
                
            }

            catch {

                
            }
        })
        .catch((err => console.log('Erreur ' + err)));
}

displayProduct()
