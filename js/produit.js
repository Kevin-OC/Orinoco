// Déclaration des variables
const parsedUrl = new URL(window.location.href);
const id = parsedUrl.searchParams.get("id");
const form = document.getElementById('myForm');
const submitBtn = document.getElementById('submitBtn');
const unitPrice = document.querySelector('.produit__price');
const displayPrice = document.querySelector('.produit__total');

// Notre fonction getData qui récupère et affiche l'article
function getData(id) {
    fetch('http://localhost:3000/api/furniture/' + id) // On va chercher grâce à l'id notre article
    .then((res) => res.json()) // Ici on parse le format JSON
    .then((data) => {
    
        let name = data.name; // déclaration des variables depuis l'objet data qui contient toutes les infos nécessaires
        let imageUrl = data.imageUrl;
        let description = data.description;
        let price = data.price / 100;
        let varnish = data.varnish;
        
        document.querySelector('.produit__name').innerHTML = name; // on réinjecte nos données au HTML dynamiquement
        document.querySelector('.produit__img').src = imageUrl;
        document.querySelector('.produit__description').innerHTML = description;
        document.querySelector('.produit__price').innerHTML = price;
        for (myChoice in varnish) { // itération utilisant "for in" pour ajouter (+=) tous les choix de vernis existant sur cette article
            document.querySelector('.produit__choice').innerHTML += `<option value="${varnish[myChoice]}">${varnish[myChoice]}</option>`;
        }
    })
}
getData(id); // <- appel de la fonction avec l'id de l'URL en paramètre

// On indique dynamiquement le prix total de la commande prix à l'unité * quantité
function totalPrice(quantity) {
    let result = quantity * unitPrice.innerHTML;
    displayPrice.innerHTML = result;
}

// Initialisation de la variable panier
let panier;
// Si localStorage contient déjà un panier alors 'panier' vaut son contenu, sinon 'panier' est vide
if ("monPanier" in localStorage) {
    panier = JSON.parse(localStorage.getItem('monPanier'));
} else {
    panier = [];
}

function addPanier(e) {

    // On bloque l'action par défaut du navigateur
    e.preventDefault();

    // Création de notre objet
    let commande = {
        id,
        name : document.querySelector('.produit__name').textContent,
        img : document.querySelector('.produit__img').src,
        quantity : Number(document.querySelector('#inputNumber').value),
        price : Number(document.querySelector('.produit__price').textContent),
        varnish : document.querySelector('.produit__choice').value
    }

    // Vérification que la commande possède au moins un article sinon on sort de la fonction
    if (!commande.quantity > 0) {
        alert("vous devez choisir au moins un article pour passe la commande !")
        return;
    }

    // Véfication sur les répétitions
    for (let i = 0; i < panier.length; i++) {
        if (commande.varnish == panier[i].varnish && commande.id == panier[i].id) {
            commande.quantity += Number(panier[i].quantity);
            panier.splice(i,1);
        }
    }

    // On rentre ça dans le panier + reset des valeurs
    panier.push(commande);
    form.reset();
    displayPrice.innerHTML = 0;
    
    // On place le panier dans le localStorage
    localStorage.setItem('monPanier', JSON.stringify(panier));

}
// l'eventListener déclencheur
submitBtn.addEventListener('click', addPanier);