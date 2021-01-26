//*/Générer l'URL de l'API choisie

const PRODUCTSELL = 'teddies'; //Au choix entre "teddies" | "cameras" | "furniture" | 
const APIURL = "http://localhost:3000/api/" + PRODUCTSELL + "/";

//Appeler l'API avec fetch

//En fonction de l'appel de l'api retourner tel ou tel {image, prix, description etc.}

const dataAPI = fetch("http://localhost:3000/api/teddies");

dataAPI.then(async (responseData) => {
    console.log(responseData);

    const response = await responseData.json();
    for(let i = 0; i < response.length; i++) {
        console.log(response[i]);
    }
    

    try {
        //Capture data API
        for (let i = 0; i < response.length; i++) {
            const colors = response[i].colors
            const name = response[i].name
            const description = response[i].description
            const imageUrl = response[i].imageUrl
            const price = response[i].price

            //DOM AFFICHAGE

            const affichage_productColors = document.querySelector('#productColors');
            const affichage_productName = document.querySelector('#productName');
            const affichage_productDescription = document.querySelector('#productDescription');
            const affichage_productUrl = document.querySelector('#productUrl');
            const affichage_productPrice = document.querySelector('#productPrice');

            affichage_productColors.innerHTML = productColors[i]
            affichage_productName.innerHTML = productName[i]
            affichage_productDescription.innerHTML = productDescription[i]
            affichage_productUrl.innerHTML = productUrl[i]
            affichage_productPrice.innerHTML = productPrice[i]
        }


    } catch (err) {
        console.log(err);
    }
})

dataAPI.catch((err) => {
    console.log(err);
});

//DECLARATION DU TABLEAU API 
console.log(colors);