// Création d'une class Api et création de la fonction fetchEndPoint() qui lance une requête fetch() avec des promesses
// si la récupération de l'Api est réussie (Response.ok == true) alors la requête fetch() renvoie response.json()
// si la récupération de l'Api retourne une TypeError, alors le navigateur ouvre la page error.html (erreur 404)
class Api {
    fetchEndPoint(url) {
        return fetch(url)
        .then(response => {
            if(!response.ok) {
                throw Error(response.statusText);
                
            }
            return response.json();
        })
        .catch(err => {
            console.log(err);
            window.location = "/error.html"; 
        });
    }
}

export const api = new Api; 

