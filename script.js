const movies = [
  {
    id: 1,
    title: "Interstellar",
    genre: "Drame",
    img: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    desc: "Un groupe d'explorateurs voyage à travers un trou de ver dans l'espace pour assurer la survie de l'humanité."
  },
  {
    id: 2,
    title: "Mad Max: Fury Road",
    genre: "Action",
    img: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
    desc: "Dans un monde post-apocalyptique, Max s'allie à Furiosa pour fuir un tyran à travers le désert."
  },
  {
    id: 3,
    title: "The Grand Budapest Hotel",
    genre: "Comédie",
    img: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
    desc: "Les aventures du légendaire concierge d'un célèbre hôtel européen dans les années 30."
  },
  {
    id: 4,
    title: "The Dark Knight",
    genre: "Action",
    img: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    desc: "Batman affronte le Joker, un criminel chaotique qui veut plonger Gotham dans l'anarchie."
  },
  {
    id: 5,
    title: "Parasite",
    genre: "Drame",
    img: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    desc: "Une famille pauvre s'infiltre progressivement dans la vie d'une famille très aisée de Séoul."
  },
  {
    id: 6,
    title: "Superbad",
    genre: "Comédie",
    img: "https://image.tmdb.org/t/p/w500/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg",
    desc: "Deux lycéens maladroits tentent de profiter de leur dernière soirée avant la fac."
  },
  {
    id: 7,
    title: "John Wick",
    genre: "Action",
    img: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
    desc: "Un ancien tueur à gages sort de sa retraite pour venger la mort de son chien."
  },
  {
    id: 8,
    title: "The Shawshank Redemption",
    genre: "Drame",
    img: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    desc: "Un banquier condamné à tort noue une amitié profonde avec un autre détenu en prison."
  }
];

let favorites = JSON.parse(localStorage.getItem('cinevia-favs') || '[]');
let currentGenre = 'all';
let currentMovie = null;
function renderMovies() {
  const grid = document.getElementById('moviesGrid');
  grid.innerHTML = '';
  const filtered = currentGenre === 'all'
    ? movies
    : movies.filter(m => m.genre === currentGenre);

  filtered.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <img src="${movie.img}" alt="${movie.title}" />
      <div class="movie-card-info">
        <h3>${movie.title}</h3>
        <span class="badge">${movie.genre}</span>
      </div>
    `;
    card.addEventListener('click', () => openModal(movie));
    grid.appendChild(card);
  });
}

function renderFavorites() {
  const grid = document.getElementById('favoritesGrid');
  const emptyMsg = document.getElementById('emptyMsg');
  grid.innerHTML = '';

  if (favorites.length === 0) {
    grid.appendChild(emptyMsg || createEmptyMsg());
    return;
  }

  favorites.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <img src="${movie.img}" alt="${movie.title}" />
      <div class="movie-card-info">
        <h3>${movie.title}</h3>
        <span class="badge">${movie.genre}</span>
      </div>
    `;
    card.addEventListener('click', () => openModal(movie));
    grid.appendChild(card);
  });
}

function createEmptyMsg() {
  const p = document.createElement('p');
  p.className = 'empty-msg';
  p.id = 'emptyMsg';
  p.textContent = 'Aucun favori pour l\'instant.';
  return p;
}

function openModal(movie) {
  currentMovie = movie;
  document.getElementById('modalImg').src = movie.img;
  document.getElementById('modalTitle').textContent = movie.title;
  document.getElementById('modalGenre').textContent = movie.genre;
  document.getElementById('modalDesc').textContent = movie.desc;

  const isFav = favorites.some(f => f.id === movie.id);
  const favBtn = document.getElementById('modalFavBtn');
  favBtn.textContent = isFav ? 'Retirer des favoris' : 'Ajouter aux favoris';
  favBtn.classList.toggle('fav-active', isFav);

  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  currentMovie = null;
}

function toggleFavorite() {
  if (!currentMovie) return;

  const index = favorites.findIndex(f => f.id === currentMovie.id);

  if (index === -1) {
    favorites.push(currentMovie);
  } else {
    favorites.splice(index, 1);
  }
  localStorage.setItem('cinevia-favs', JSON.stringify(favorites));
  const isFav = favorites.some(f => f.id === currentMovie.id);
  const favBtn = document.getElementById('modalFavBtn');
  favBtn.textContent = isFav ? 'Retirer des favoris' : 'Ajouter aux favoris';
  favBtn.classList.toggle('fav-active', isFav);
  renderFavorites();
}
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    currentGenre = btn.dataset.genre;
    renderMovies();
  });
});

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal();
});
document.getElementById('modalFavBtn').addEventListener('click', toggleFavorite);
renderMovies();
renderFavorites();
