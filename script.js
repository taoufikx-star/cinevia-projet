// 1. Données simulées
const movies = [
    { id: 1, title: "Inception", category: "Action", image: "https://picsum.photos/seed/inc/400/600", desc: "Dom Cobb est un voleur expérimenté dans l'art périlleux de l'extraction, sa spécialité consiste à voler des secrets précieux." },
    { id: 2, title: "The Hangover", category: "Comédie", image: "https://picsum.photos/seed/hang/400/600", desc: "Trois amis se réveillent après un enterrement de vie de garçon à Las Vegas, sans aucun souvenir de la nuit précédente." },
    { id: 3, title: "Interstellar", category: "Drame", image: "https://picsum.photos/seed/int/400/600", desc: "Alors que la Terre se meurt, une équipe d'astronautes franchit un trou de ver pour trouver une nouvelle planète." },
    { id: 4, title: "The Dark Knight", category: "Action", image: "https://picsum.photos/seed/bat/400/600", desc: "Batman entreprend de démanteler les organisations criminelles de Gotham, mais il se heurte au Joker." },
    { id: 5, title: "Intouchables", category: "Comédie", image: "https://picsum.photos/seed/intouch/400/600", desc: "À la suite d'un accident de parapente, Philippe, riche aristocrate, engage comme aide à domicile Driss." },
    { id: 6, title: "Gladiator", category: "Drame", image: "https://picsum.photos/seed/glad/400/600", desc: "Le général romain Maximus est trahi par Commode, le fils de l'empereur Marc Aurèle." }
];

let favorites = JSON.parse(localStorage.getItem('cinevia_favs')) || [];
let currentCategory = 'All';

// 2. Éléments du DOM
const movieGrid = document.getElementById('movieGrid');
const favoritesGrid = document.getElementById('favoritesGrid');
const searchInput = document.getElementById('searchInput');
const movieModal = document.getElementById('movieModal');

// 3. Affichage des films
function displayMovies(moviesToDisplay, container) {
    container.innerHTML = '';
    
    if (moviesToDisplay.length === 0) {
        container.innerHTML = '<p style="padding: 20px;">Aucun film trouvé.</p>';
        return;
    }

    moviesToDisplay.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}" referrerPolicy="no-referrer">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <button class="btn-details" onclick="openModal(${movie.id})">Voir détails</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// 4. Filtrage par catégorie
function filterByCategory(category, btn) {
    currentCategory = category;
    
    // UI: Update active button
    document.querySelectorAll('.filters .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filtered = category === 'All' ? movies : movies.filter(m => m.category === category);
    displayMovies(filtered, movieGrid);
}

// 5. Recherche dynamique
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = movies.filter(m => 
        m.title.toLowerCase().includes(term) && 
        (currentCategory === 'All' || m.category === currentCategory)
    );
    displayMovies(filtered, movieGrid);
});

// 6. Gestion de la Modale
function openModal(id) {
    const movie = movies.find(m => m.id === id);
    if (!movie) return;

    document.getElementById('modalTitle').textContent = movie.title;
    document.getElementById('modalCategory').textContent = movie.category;
    document.getElementById('modalDesc').textContent = movie.desc;
    document.getElementById('modalImg').src = movie.image;

    const favBtn = document.getElementById('favBtn');
    updateFavBtnUI(id);
    
    favBtn.onclick = () => toggleFavorite(id);
    
    movieModal.style.display = 'flex';
}

function closeModal() {
    movieModal.style.display = 'none';
}

// 7. Gestion des Favoris
function toggleFavorite(id) {
    const index = favorites.indexOf(id);
    if (index === -1) {
        favorites.push(id);
    } else {
        favorites.splice(index, 1);
    }
    
    localStorage.setItem('cinevia_favs', JSON.stringify(favorites));
    updateFavBtnUI(id);
    displayMovies(movies.filter(m => favorites.includes(m.id)), favoritesGrid);
}

function updateFavBtnUI(id) {
    const favBtn = document.getElementById('favBtn');
    if (favorites.includes(id)) {
        favBtn.textContent = 'Retirer des favoris';
        favBtn.classList.add('is-fav');
    } else {
        favBtn.textContent = 'Ajouter aux favoris';
        favBtn.classList.remove('is-fav');
    }
}

// 8. Navigation entre pages
function showPage(page) {
    if (page === 'home') {
        document.getElementById('home-page').classList.remove('hidden');
        document.getElementById('favorites-page').classList.add('hidden');
    } else {
        document.getElementById('home-page').classList.add('hidden');
        document.getElementById('favorites-page').classList.remove('hidden');
        displayMovies(movies.filter(m => favorites.includes(m.id)), favoritesGrid);
    }
}

// Initialisation
window.onload = () => {
    displayMovies(movies, movieGrid);
};
