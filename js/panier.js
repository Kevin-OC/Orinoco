// déclaration des variables globales
let panier;
let mainHTML = document.querySelector('main');

// Vérification de l'existance du paner
if ("monPanier" in localStorage) {
    panier = JSON.parse(localStorage.getItem('monPanier'));
    createTemplate();
} else {
    document.querySelector('#panier-vide').style.display = "block";
}

// La fonction permettant d'afficher tous les articles présents dans le panier
function createTemplate() {
    let template = document.createElement('div');
    template.className = "template";
    
    // Parcours de l'array
    for (let i = 0; i < panier.length; i++) {
        let img = panier[i].img;
        let name = panier[i].name;
        let price = panier[i].price;
        let quantity = panier[i].quantity;
        let varnish = panier[i].varnish;
        
        // destructuration

        // Création du template avec les valeurs correspondantes
        let article =
            `<article>
                <div>
                <h3>${name}</h3>
                    <img class="article__img" src=${img} alt=${name}>
                </div>
                <div>
                    <p>Vernis : <span>${varnish}</span></p>
                    <p>Quantité : <span class="articleQuantity">${quantity}</p>
                    <p>Prix : <span class="articlePrice">${price * quantity}</span>€</p>
                </div>
                <div>
                    <button onclick="deleteFunction(${i})">
                        <i class="far fa-trash-alt"></i>
                    </button>
                </div>
            </article>`;

        template.innerHTML += article;
    }
    // Insertion au HTML + appel fonction prix total
    mainHTML.appendChild(template);
    totalPrice();
}

function totalPrice() {
    let priceDiv = document.createElement('div');
    priceDiv.className = "priceDiv";
    let priceArray = document.querySelectorAll('.articlePrice');
    let sum = 0;
    priceArray.forEach(i => {
       i = Number(i.textContent);
       sum += i;
    });
    priceDiv.innerHTML = `Le prix total du panier est : <span class="totalPrice">${sum}</span>€`;
    mainHTML.appendChild(priceDiv);
}

// Enlever un article du panier
deleteFunction = (i) => {
    panier.splice(i, 1);
    localStorage.setItem('monPanier', JSON.stringify(panier));
    
    // Si le panier est vide on clear le localStorage
    if (panier.length < 1) {
        localStorage.removeItem('monPanier');
    }

    // Rafraîchissement de la page
    window.location.reload();
};


// Event type submit
document.querySelector('form').addEventListener('submit', (e) => {
    // On bloque le comportement par défaut du navigateur
    e.preventDefault();

    // Je crée mon objet data qui prend les data du formulaire + un tableau products
    let data = {
        contact : {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            city: document.getElementById('city').value,
            address: document.getElementById('address').value,
            email: document.getElementById('email').value
        },
        products : []
    }
    
    // Si le panier est vide on stop la commande
    if (!panier) {
        alert("la commande ne peut pas être passée car le panier est vide");
        return
    }

    // On fait rentrer dans data.products les id des articles autant de fois que la quantity est demandée
    panier.forEach(elt => {
        for (let i = 0; i < elt.quantity; i++) {
            data.products.push(elt.id);    
        }
    })

    fetch('http://localhost:3000/api/furniture/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('confirmation', JSON.stringify(data));
        localStorage.removeItem('monPanier');
        window.open("confirmation.html");
    })
    .catch((error) => {
        console.error(error);
    });
})