/**
 * CINÉVIA - Logique JavaScript
 * Projet de manipulation du DOM et stockage local
 */

// 1. DONNÉES SIMULÉES (La source de vérité)
const filmsData = [
    {
        id: 2,
        titre: "The Dark Knight",
        categorie: "Action",
        description: "Batman affronte le Joker, un criminel maléfique qui sème le chaos à Gotham City.",
        note: "9.0/10",
        image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    },
    {
        id: 3,
        titre: "John Wick",
        categorie: "Action",
        description: "Un ancien tueur à gages sort de sa retraite pour traquer les gangsters qui ont tout pris de lui.",
        note: "7.4/10",
        image: "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_FMjpg_UX1000_.jpg",
    },
    {
        id: 4,
        titre: "Mad Max: Fury Road",
        categorie: "Action",
        description: "Dans un monde post-apocalyptique, Max s'associe à Furiosa pour échapper à un tyran.",
        note: "8.1/10",
        image : "Mad Max.webp"
    },
    {
        id: 5,
        titre: "Gladiator",
        categorie: "Action",
        description: "Un général romain déchu cherche vengeance contre l'empereur corrompu qui a assassiné sa famille.",
        note: "8.5/10",
        image: "M4.webp"
    },
    {
        id: 6,
        titre: "Avengers: Endgame",
        categorie: "Action",
        description: "Les Avengers restants doivent trouver un moyen de ramener leurs alliés vaincus pour un affrontement final contre Thanos.",
        note: "8.4/10",
        image: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
    },
    {
        id: 7,
        titre: "Joker",
        categorie: "Drame",
        description: "Arthur Fleck, un homme méprisé par la société, bascule dans la folie et devient le Joker.",
        note: "8.4/10",
        image: "jk.webp"
    },
    {
        id: 9,
        titre: "Spider-Man: No Way Home",
        categorie: "Action",
        description: "Peter Parker doit faire face aux conséquences de son identité révélée au monde entier.",
        note: "8.2/10",
        image: "spider.jpg"
    },
    {
        id: 11,
        titre: "The Hangover",
        categorie: "Comédie",
        description: "Trois amis se réveillent d'un enterrement de vie de garçon à Las Vegas sans aucun souvenir de la nuit précédente et le futur marié a disparu.",
        note: "7.7/10",
        image: "m5c.jpg"
    }
]

// 2. ÉTAT DE L'APPLICATION
let favoris = JSON.parse(localStorage.getItem('cinevia_favoris')) || [];
let currentCategory = 'Tous';
let currentPage = 'accueil'; // 'accueil' ou 'favoris'

// 3. FONCTIONS D'AFFICHAGE (Manipulation du DOM)

/**
 * Affiche les films dans la grille en fonction des filtres
 */
function displayMovies() {
    const grid = document.getElementById('movie-grid');
    grid.innerHTML = ''; // On vide pour ré-afficher

    const searchStr = document.getElementById('searchInput').value.toLowerCase();

    // Filtrage complexe : Categorie + Recherche + Page (Accueil/Favoris)
    const filteredFilms = filmsData.filter(film => {
        const matchesCategory = currentCategory === 'Tous' || film.categorie === currentCategory;
        const matchesSearch = film.titre.toLowerCase().includes(searchStr);
        const matchesPage = currentPage === 'accueil' || favoris.includes(film.id);
        
        return matchesCategory && matchesSearch && matchesPage;
    });

    if (filteredFilms.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 50px;">Aucun film ne correspond à votre recherche.</p>`;
        return;
    }

    // Création dynamique des cartes
    filteredFilms.forEach(film => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${film.image}" alt="${film.titre}" referrerPolicy="no-referrer">
            <div class="movie-info">
                <h3>${film.titre}</h3>
                <span class="category-tag">${film.categorie.toLowerCase()}</span>
                <button class="btn-details" onclick="ouvrirModale(${film.id})">Voir détails</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

/**
 * Change la page active (Accueil / Favoris)
 */
function afficherPage(page) {
    currentPage = page;
    const title = document.getElementById('page-title');
    const favTitle = document.getElementById('favoris-title');
    const hero = document.getElementById('hero-section');
    const filters = document.getElementById('filter-container');

    if (page === 'favoris') {
        title.style.display = 'none';
        favTitle.style.display = 'block';
        hero.style.display = 'none';
        filters.style.display = 'none';
    } else {
        title.style.display = 'block';
        favTitle.style.display = 'none';
        hero.style.display = 'block';
        filters.style.display = 'flex';
        title.innerText = "Films populaires";
    }
    displayMovies();
}

/**
 * Filtre les films par catégorie au clic sur les boutons
 */
function filtrerParCategorie(cat, btn) {
    currentCategory = cat;
    
    // UI : Mettre à jour l'état visuel des boutons
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    displayMovies();
}

/**
 * Filtre les films lors de la saisie dans la barre de recherche
 */
function rechercherFilm() {
    displayMovies();
}

// 4. GESTION DE LA MODALE

function ouvrirModale(id) {
    const film = filmsData.find(f => f.id === id);
    if (!film) return;

    const modal = document.getElementById('movieModal');
    const detailsContainer = document.getElementById('modal-details');
    const isFav = favoris.includes(film.id);

    detailsContainer.innerHTML = `
        <div class="modal-body">
            <img src="${film.image}" alt="${film.titre}" class="modal-img" referrerPolicy="no-referrer">
            <div class="modal-text">
                <h2>${film.titre}</h2>
                <p><strong>Catégorie :</strong> ${film.categorie}</p>
                <p><strong>Note :</strong> ${film.note}</p>
                <p>${film.description}</p>
                <button class="btn-fav ${isFav ? 'active' : ''}" onclick="toggleFavori(${film.id}, this)">
                    <i class="${isFav ? 'fas' : 'far'} fa-star"></i> 
                    ${isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                </button>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

function fermerModale() {
    document.getElementById('movieModal').style.display = 'none';
}

// 5. GESTION DES FAVORIS (LocalStorage)

function toggleFavori(id, btn) {
    const index = favoris.indexOf(id);

    if (index === -1) {
        // Ajouter
        favoris.push(id);
        btn.innerHTML = '<i class="fas fa-star"></i> Retirer des favoris';
        btn.classList.add('active');
    } else {
        // Retirer
        favoris.splice(index, 1);
        btn.innerHTML = '<i class="far fa-star"></i> Ajouter aux favoris';
        btn.classList.remove('active');
    }

    // Sauvegarder
    localStorage.setItem('cinevia_favoris', JSON.stringify(favoris));
    
    // Mettre à jour la grille en arrière-plan (surtout si on est sur la page favoris)
    displayMovies();
}

// Fermer la modale si on clique en dehors
window.onclick = function(event) {
    const modal = document.getElementById('movieModal');
    if (event.target == modal) {
        fermerModale();
    }
}

// LANCEMENT INITIAL
document.addEventListener('DOMContentLoaded', () => {
    displayMovies();
});