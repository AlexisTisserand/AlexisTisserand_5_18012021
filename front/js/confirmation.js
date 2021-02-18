let contact = localStorage.getItem('contact')
let cartCost = localStorage.getItem('totalCost')
cartCost = parseInt(cartCost)
let orderId = localStorage.getItem('orderId')
contact = JSON.parse(contact)
console.log(contact);

let results = document.getElementById('results')

results.innerHTML += 

`
<div class="summary summary-container">
    <div class="summary ">
        <h3 id="title-summary">Récapitulatif de commande</h3>
        <h4 id="title-thanks">Orinoco vous remercie de votre commande !</h4>
        
    </div>
    <div class="summary summary-div">
        <h3 id="subtitle-summary">Bon de commande : </h3>
        <h4 class="datas">Contact : <span class="datas">${contact.firstName}</span> <span class="datas">${contact.lastName}</span></h4>
        <h4 class="datas">Email : <span class="datas">${contact.email}</span>
        <h4 class="datas">Adresse de livraison : <span class="datas">${contact.address}</span>, <span class="datas">${contact.city}</span></h4>
        <h4 class="datas">Numéro de commande : <span class="datas">${orderId}</span></h4>
        <h4 class="datas">Montant total de votre commande : <span class="datas">${(cartCost / 100) + ".00€"}</span></h4>
    </div>
    
  </div>

  <a href="index.html"> <button onclick="deleteItems()" class="show-cart" type="button">Retour à l'accueil</button></a>

`