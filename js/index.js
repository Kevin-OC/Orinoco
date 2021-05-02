// Déclaration variable et séléction
let nodeMainHTML = document.querySelector('.main');

// Fonction Fetch allant chercher les infos
function getData() {
    fetch('http://localhost:3000/api/furniture')        // <- ici on va chercher les data sur le localhost
    .then((res) => res.json())                          // <- on parse les données json
    .then((data) => {                                   // <- notre code à exécuter
        for (let i = 0; i < data.length; i++) {         // <- lancement de notre boucle
        let name = data[i].name;                        // déclaration de toutes les variables nécessaires à afficher et attribution de leur valeur dynamiquement
        let imageUrl = data[i].imageUrl;
        let description = data[i].description;      
        let price = data[i].price / 100;
        let id = data[i]._id;        
        
        let article =                                   // <- variable où l'on écrit le modèle HTML
        `<article class="main__article">
            <img class="main__article__img selectorIMG" src="${imageUrl}" alt="meuble en chêne">
            <div class="main__article__text">
                <h3 class="selectorTitle">${name}</h3>
                <h4>Description du produit:</h4>
                <p class="selectorDescription">${description}</p>
                <a href="produit.html?id=${id}">Cliquez ici pour plus de détails</a>
                <div class="main__article__prix selectorPrice">${price}</div>
            </div> 
        </article>`

        nodeMainHTML.innerHTML += article;              // <- intégration au HTML
        }
    })
    .catch((err) => {                                  // <- au cas où ça se passe mal on affiche l'erreur en console
        alert(err);
    })
}
// Appel de la fonction getData
getData();