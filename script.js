// --- Données simulées ---
const films = [
    {
        id: 1,
        titre: "Inception",
        description: "Dom Cobb est un voleur expérimenté, le meilleur dans l'art périlleux de l'extraction : sa spécialité consiste à voler les secrets les plus précieux d'un individu, enfouis au plus profond de son subconscient, pendant qu'il rêve.",
        categorie: "Science-Fiction",
        image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80"
    },
    {
        id: 2,
        titre: "The Dark Knight",
        description: "Batman entreprend de démanteler les organisations criminelles qui infestent Gotham. Mais il se heurte bientôt à un nouveau génie du crime qui répand la terreur et le chaos dans la ville : le Joker.",
        categorie: "Action",
        image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80"
    },
    {
        id: 3,
        titre: "Interstellar",
        description: "Alors que la Terre meurt, une équipe d'astronautes franchit un trou de ver apparu près de Saturne et conduisant à une autre galaxie, afin d'explorer un nouveau système stellaire dans l'espoir de trouver une planète habitable.",
        categorie: "Science-Fiction",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80"
    },
    {
        id: 4,
        titre: "Parasite",
        description: "Toute la famille de Ki-taek est au chômage, et s'intéresse fortement au train de vie de la richissime famille Park. Un jour, leur fils réussit à se faire recommander pour donner des cours particuliers d'anglais chez les Park.",
        categorie: "Drame",
        image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800&q=80"
    },
    {
        id: 5,
        titre: "The Grand Budapest Hotel",
        description: "Le film retrace les aventures de Gustave H, l'homme aux clés d'or d'un célèbre hôtel européen de l'entre-deux-guerres et du garçon d'étage Zero Moustafa, son allié le plus fidèle.",
        categorie: "Comédie",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80"
    },
    {
        id: 6,
        titre: "Spider-Man: Across the Spider-Verse",
        description: "Après avoir retrouvé Gwen Stacy, Miles Morales, l'araignée sympa du quartier de Brooklyn, est catapulté à travers le Multivers, où il rencontre une équipe de Spider-Héros chargée d'en protéger l'existence même.",
        categorie: "Animation",
        image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&q=80"
    },
    {
        id: 7,
        titre: "Le Loup de Wall Street",
        description: "L'ascension fulgurante de Jordan Belfort, un courtier en bourse de New York qui a fait fortune en vendant des actions frauduleuses, et sa chute brutale dans la drogue, la débauche et les mains du FBI.",
        categorie: "Comédie",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80"
    },
    {
        id: 8,
        titre: "Gladiator",
        description: "Le général romain Maximus est trahi par Commode, le fils de l'empereur Marc Aurèle, qui assassine son père et s'empare du trône. Maximus devient un esclave gladiateur et cherche à venger sa famille.",
        categorie: "Action",
        image: "https://images.unsplash.com/photo-1599733594230-6b823276abcc?w=800&q=80"
    }
];

// --- État de l'application ---
let currentPage = 'home'; // 'home' ou 'favorites'
let currentCategory = 'Tous';
let searchQuery = '';
let favorites = JSON.parse(localStorage.getItem('cinevia_favs')) || [];

// --- Sélections DOM ---
const moviesGrid = document.getElementById('movies-grid');
const categoryFilters = document.getElementById('category-filters');
const searchInput = document.getElementById('search-input');
const pageTitle = document.getElementById('page-title');
const movieModal = document.getElementById('movie-modal');
const modalBody = document.getElementById('modal-body');

// --- Initialisation ---
function init() {
    renderFilters();
    renderMovies();
    
    // Événement recherche
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderMovies();
    });

    // Fermer la modale en cliquant à l'extérieur
    window.onclick = (event) => {
        if (event.target == movieModal) {
            closeModal();
        }
    };
}

// --- Navigation ---
function navigateTo(page) {
    currentPage = page;
    
    // Mise à jour UI navbar
    document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
    document.getElementById(`link-${page}`).classList.add('active');
    
    // Titre et filtres
    if (page === 'home') {
        pageTitle.innerText = "Tous les films";
        categoryFilters.style.display = 'flex';
    } else {
        pageTitle.innerText = "Mes Favoris";
        categoryFilters.style.display = 'none';
    }
    
    renderMovies();
}

// --- Filtres ---
function renderFilters() {
    const categories = ['Tous', ...new Set(films.map(f => f.categorie))];
    categoryFilters.innerHTML = categories.map(cat => `
        <button class="filter-btn ${currentCategory === cat ? 'active' : ''}" 
                onclick="setCategory('${cat}')">
            ${cat}
        </button>
    `).join('');
}

function setCategory(cat) {
    currentCategory = cat;
    renderFilters();
    renderMovies();
}

// --- Affichage des films ---
function renderMovies() {
    let filteredFilms = films;

    // Filtrer par page (favoris)
    if (currentPage === 'favorites') {
        filteredFilms = films.filter(f => favorites.includes(f.id));
    }

    // Filtrer par catégorie (uniquement sur accueil)
    if (currentPage === 'home' && currentCategory !== 'Tous') {
        filteredFilms = filteredFilms.filter(f => f.categorie === currentCategory);
    }

    // Filtrer par recherche
    if (searchQuery) {
        filteredFilms = filteredFilms.filter(f => f.titre.toLowerCase().includes(searchQuery));
    }

    if (filteredFilms.length === 0) {
        moviesGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #b3b3b3; margin-top: 2rem;">Aucun film trouvé.</p>`;
        return;
    }

    moviesGrid.innerHTML = filteredFilms.map(film => {
        const isFav = favorites.includes(film.id);
        return `
            <div class="movie-card" onclick="openModal(${film.id})">
                <div class="img-container">
                    <img src="${film.image}" alt="${film.titre}" class="movie-img">
                    ${isFav ? '<i class="fas fa-heart fav-badge"></i>' : ''}
                </div>
                <div class="movie-info">
                    <span class="movie-category">${film.categorie}</span>
                    <h3>${film.titre}</h3>
                    <div class="card-actions">
                        <button class="btn-view">Voir détails</button>
                        ${currentPage === 'favorites' ? 
                            `<button class="btn-remove" onclick="event.stopPropagation(); toggleFavorite(${film.id})">
                                <i class="fas fa-trash"></i>
                             </button>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// --- Modale ---
function openModal(id) {
    const film = films.find(f => f.id === id);
    const isFav = favorites.includes(film.id);
    
    modalBody.innerHTML = `
        <img src="${film.image}" alt="${film.titre}" class="modal-img">
        <div class="modal-details">
            <h2>${film.titre}</h2>
            <span class="category">${film.categorie}</span>
            <p class="desc">${film.description}</p>
            <button class="btn-fav ${isFav ? 'is-fav' : ''}" onclick="toggleFavorite(${film.id})">
                ${isFav ? '<i class="fas fa-trash"></i> Retirer des favoris' : '<i class="fas fa-heart"></i> Ajouter aux favoris'}
            </button>
        </div>
    `;
    
    movieModal.style.display = "block";
    document.body.style.overflow = "hidden"; // Empêche le scroll du body
}

function closeModal() {
    movieModal.style.display = "none";
    document.body.style.overflow = "auto";
}

// --- Favoris ---
function toggleFavorite(id) {
    const index = favorites.indexOf(id);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(id);
    }
    
    // Sauvegarde
    localStorage.setItem('cinevia_favs', JSON.stringify(favorites));
    
    // Mise à jour UI
    renderMovies();
    
    // Si on est dans la modale, on rafraîchit le bouton
    const film = films.find(f => f.id === id);
    const isFav = favorites.includes(id);
    const btn = document.querySelector('.btn-fav');
    if (btn) {
        btn.classList.toggle('is-fav', isFav);
        btn.innerHTML = isFav ? 
            '<i class="fas fa-trash"></i> Retirer des favoris' : 
            '<i class="fas fa-heart"></i> Ajouter aux favoris';
    }
}

// Lancement
init();
