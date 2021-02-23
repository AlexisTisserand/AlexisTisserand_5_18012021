//Tentative de configuration de l'Api après son hébergement du backend sur herokuapp
//ECHEC
let apiUrl = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
? "http://localhost:3000"
: `https://orinoco-p5-alexis-tisserand.herokuapp.com`