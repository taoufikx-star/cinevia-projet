/**
 * CINÉVIA - Logique JavaScript
 * Projet de manipulation du DOM et stockage local
 */

// 1. DONNÉES SIMULÉES (La source de vérité)
const filmsData = [
    {
        id: 1,
        titre: "Inception",
        categorie: "Action",
        description: "Un voleur qui s'approprie les secrets d'autrui à travers leurs rêves doit réaliser l'impossible : l'inception.",
        note: "8.8/10",
        image: "https://image.tmdb.org/t/p/w500/edvBfSjzkYUPzO17noH9f9SJu1y.jpg",
    },
    {
        id: 2,
        titre: "The Dark Knight",
        categorie: "Action",
        description: "Batman affronte le Joker, un criminel maléfique qui sème le chaos à Gotham City.",
        note: "9.0/10",
        image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDp9pSurgS7tHwST1H3.jpg",
    },
    {
        id: 3,
        titre: "John Wick",
        categorie: "Action",
        description: "Un ancien tueur à gages sort de sa retraite pour traquer les gangsters qui ont tout pris de lui.",
        note: "7.4/10",
        image: "https://image.tmdb.org/t/p/w500/fZPSCl9j9FK9T3Sve9S8N_S9N9S.jpg",
    },
    {
        id: 4,
        titre: "Mad Max: Fury Road",
        categorie: "Action",
        description: "Dans un monde post-apocalyptique, Max s'associe à Furiosa pour échapper à un tyran.",
        note: "8.1/10",
        image: "https://image.tmdb.org/t/p/w500/8mc7pS9Y6Y6p8X9v1F8zH6a4L5.jpg",
    },
    {
        id: 5,
        titre: "Gladiator",
        categorie: "Action",
        description: "Un général romain déchu cherche vengeance contre l'empereur corrompu qui a assassiné sa famille.",
        note: "8.5/10",
        image: "https://image.tmdb.org/t/p/w500/ty8h36rjS9StSshST9S9S.jpg",
    },
    {
        id: 6,
        titre: "Avengers: Endgame",
        categorie: "Action",
        description: "Les Avengers restants doivent trouver un moyen de ramener leurs alliés vaincus pour un affrontement final contre Thanos.",
        note: "8.4/10",
        image: "https://image.tmdb.org/t/p/w500/or06vSsbTkaZ_S9S_S9N9S.jpg",
    },
    {
        id: 7,
        titre: "Joker",
        categorie: "Drame",
        description: "Arthur Fleck, un homme méprisé par la société, bascule dans la folie et devient le Joker.",
        note: "8.4/10",
        image: "https://image.tmdb.org/t/p/w500/udDcl7nSotZpS89fs9ST9SST.jpg",
    },
    {
        id: 8,
        titre: "Interstellar",
        categorie: "Action",
        description: "Un groupe d'explorateurs voyage à travers un trou de ver pour sauver l'humanité.",
        note: "8.7/10",
        image: "https://image.tmdb.org/t/p/w500/gEU2QvPB97hwtpw3xmlvQpS9N9S.jpg",
    },
    {
        id: 9,
        titre: "Spider-Man: No Way Home",
        categorie: "Action",
        description: "Peter Parker doit faire face aux conséquences de son identité révélée au monde entier.",
        note: "8.2/10",
        image: "https://image.tmdb.org/t/p/w500/1g0mXp9pSurgS7tHwST1H3.jpg",
    },
    {
        id: 10,
        titre: "Black Panther",
        categorie: "Action",
        description: "T'Challa retourne chez lui au Wakanda pour servir en tant que roi.",
        note: "7.3/10",
        image: "https://image.tmdb.org/t/p/w500/uxzz_S9N9S9S_S9N9S.jpg",
    },
    {
        id: 11,
        titre: "The Hangover",
        categorie: "Comédie",
        description: "Trois amis se réveillent après un enterrement de vie de garçon sans aucun souvenir.",
        note: "7.7/10",
        image: "https://image.tmdb.org/t/p/w500/749tS9N9S9S9S9S.jpg",
    },
    {
        id: 12,
        titre: "Superbad",
        categorie: "Comédie",
        description: "Deux lycéens sont forcés de faire face à l'angoisse de la séparation.",
        note: "7.6/10",
        image: "https://image.tmdb.org/t/p/w500/ekDV_S9N9S9S9S9S.jpg",
    },
    {
        id: 13,
        titre: "Parasite",
        categorie: "Drame",
        description: "Toute la famille de Ki-taek est au chômage et s'intéresse au train de vie de la richissime famille Park.",
        note: "8.5/10",
        image: "https://image.tmdb.org/t/p/w500/7S9pSurgS7tHwST1H3.jpg",
    },
    {
        id: 14,
        titre: "The Godfather",
        categorie: "Drame",
        description: "Le vieillissement du patriarche d'une dynastie du crime organisé transfère le contrôle à son fils réticent.",
        note: "9.2/10",
        image: "https://image.tmdb.org/t/p/w500/3bhkrjS9SurgS7tHwST1H3.jpg",
    },
    {
        id: 15,
        titre: "Pulp Fiction",
        categorie: "Action",
        description: "Les vies de deux tueurs à gages, d'un boxeur, d'un gangster et de sa femme s'entremêlent.",
        note: "8.9/10",
        image: "https://image.tmdb.org/t/p/w500/d5SurgS7tHwST1H3.jpg",
    },
    {
        id: 16,
        titre: "The Shawshank Redemption",
        categorie: "Drame",
        description: "Deux hommes emprisonnés se lient d'amitié au fil des ans, trouvant consolation et rédemption finale.",
        note: "9.3/10",
        image: "https://image.tmdb.org/t/p/w500/lySurgS7tHwST1H3.jpg",
    },
    {
        id: 17,
        titre: "Forrest Gump",
        categorie: "Drame",
        description: "Les présidences de Kennedy et de Johnson, les événements du Vietnam, et d'autres événements historiques.",
        note: "8.8/10",
        image: "https://image.tmdb.org/t/p/w500/arSurgS7tHwST1H3.jpg",
    },
    {
        id: 18,
        titre: "The Matrix",
        categorie: "Action",
        description: "Un pirate informatique apprend par des rebelles mystérieux la vraie nature de sa réalité.",
        note: "8.7/10",
        image: "https://image.tmdb.org/t/p/w500/fT1SurgS7tHwST1H3.jpg",
    },
    {
        id: 19,
        titre: "Fight Club",
        categorie: "Drame",
        description: "Un employé de bureau insomniaque et un savonnier débraillé forment un club de combat clandestin.",
        note: "8.8/10",
        image: "https://image.tmdb.org/t/p/w500/pB9SurgS7tHwST1H3.jpg",
    },
    {
        id: 20,
        titre: "Spirited Away",
        categorie: "Action",
        description: "Au cours du déménagement de sa famille à la campagne, une petite fille de 10 ans erre dans un monde régi par les dieux.",
        note: "8.6/10",
        image: "https://image.tmdb.org/t/p/w500/39pSurgS7tHwST1H3.jpg",
    },
    {
        id: 21,
        titre: "The Lion King",
        categorie: "Comédie",
        description: "Un prince lion héritier est trahi par son oncle Scar et doit regagner son royaume.",
        note: "8.5/10",
        image: "https://image.tmdb.org/t/p/w500/sK1SurgS7tHwST1H3.jpg",
    },
    {
        id: 22,
        titre: "Titanic",
        categorie: "Drame",
        description: "Une aristocrate de dix-sept ans tombe amoureuse d'un artiste gentil mais pauvre à bord du luxueux Titanic.",
        note: "7.9/10",
        image: "https://image.tmdb.org/t/p/w500/9xjSurgS7tHwST1H3.jpg",
    },
    {
        id: 23,
        titre: "Finding Nemo",
        categorie: "Comédie",
        description: "Après que son fils a été capturé dans la Grande Barrière de Corail, un poisson-clon timide part en voyage.",
        note: "8.2/10",
        image: "https://image.tmdb.org/t/p/w500/ggSurgS7tHwST1H3.jpg",
    },
    {
        id: 24,
        titre: "Shrek",
        categorie: "Comédie",
        description: "Un ogre dont la solitude précieuse est soudainement brisée par l'invasion de personnages de contes de fées.",
        note: "7.9/10",
        image: "https://image.tmdb.org/t/p/w500/iSurgS7tHwST1H3.jpg",
    },
    {
        id: 25,
        titre: "Up",
        categorie: "Comédie",
        description: "Carl Fredricksen, un vendeur de ballons de 78 ans, est sur le point de réaliser son rêve de toute une vie.",
        note: "8.3/10",
        image: "https://image.tmdb.org/t/p/w500/vpSurgS7tHwST1H3.jpg",
    },
    {
        id: 26,
        titre: "Toy Story",
        categorie: "Comédie",
        description: "Un chapeau de cowboy en peluche cherche à redevenir le jouet préféré d'Andy.",
        note: "8.3/10",
        image: "https://image.tmdb.org/t/p/w500/uSurgS7tHwST1H3.jpg",
    },
    {
        id: 27,
        titre: "Monsters, Inc.",
        categorie: "Comédie",
        description: "Afin d'alimenter la ville en électricité, les monstres doivent effrayer les enfants.",
        note: "8.1/10",
        image: "https://image.tmdb.org/t/p/w500/wSurgS7tHwST1H3.jpg",
    },
    {
        id: 28,
        titre: "The Incredibles",
        categorie: "Action",
        description: "Une famille de super-héros infiltrés, tout en essayant de vivre une vie de banlieue tranquille.",
        note: "8.0/10",
        image: "https://image.tmdb.org/t/p/w500/xSurgS7tHwST1H3.jpg",
    },
    {
        id: 29,
        titre: "Ratatouille",
        categorie: "Comédie",
        description: "Un rat nommé Rémy rêve de devenir un grand chef français.",
        note: "8.1/10",
        image: "https://image.tmdb.org/t/p/w500/ySurgS7tHwST1H3.jpg",
    },
    {
        id: 30,
        titre: "Wall-E",
        categorie: "Action",
        description: "Dans un futur lointain, un petit robot de nettoyage de déchets embarque par inadvertance dans un voyage spatial.",
        note: "8.4/10",
        image: "https://image.tmdb.org/t/p/w500/zSurgS7tHwST1H3.jpg",
    },
    {
        id: 31,
        titre: "Coco",
        categorie: "Action",
        description: "Le jeune Miguel, passionné de musique, se retrouve par accident dans le monde des morts.",
        note: "8.4/10",
        image: "https://image.tmdb.org/t/p/w500/p6SurgS7tHwST1H3.jpg",
    },
    {
        id: 32,
        titre: "Soul",
        categorie: "Drame",
        description: "Un professeur de musique de collège qui a perdu sa passion pour la musique est transporté hors de son corps.",
        note: "8.0/10",
        image: "https://image.tmdb.org/t/p/w500/hmSurgS7tHwST1H3.jpg",
    },
    {
        id: 33,
        titre: "Luca",
        categorie: "Comédie",
        description: "Sur la Riviera italienne, une amitié improbable mais forte se tisse entre un être humain et un monstre marin.",
        note: "7.9/10",
        image: "https://image.tmdb.org/t/p/w500/jSurgS7tHwST1H3.jpg",
    },
    {
        id: 34,
        titre: "Encanto",
        categorie: "Comédie",
        description: "L'histoire d'une famille extraordinaire, les Madrigal, qui vivent cachés dans les montagnes de Colombie.",
        note: "7.6/10",
        image: "https://image.tmdb.org/t/p/w500/kSurgS7tHwST1H3.jpg",
    },
    {
        id: 35,
        titre: "Turning Red",
        categorie: "Comédie",
        description: "Mei Lee est une jeune fille de treize ans, confiante mais un peu bête, qui se transforme en panda roux géant.",
        note: "7.0/10",
        image: "https://image.tmdb.org/t/p/w500/lSurgS7tHwST1H3.jpg",
    }
];

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
