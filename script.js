const movies = [
    { id: 0, title: "Spider-Man", cat: "Action", img: "https://picsum.photos/300/400?random=1", desc: "L'histoire de Peter Parker." },
    { id: 1, title: "Joker", cat: "Drame", img: "https://picsum.photos/300/400?random=2", desc: "La naissance d'un méchant." },
    { id: 2, title: "Lion King", cat: "Animation", img: "https://picsum.photos/300/400?random=3", desc: "L'aventure de Simba." },
    { id: 3, title: "Titanic", cat: "Drame", img: "https://picsum.photos/300/400?random=4", desc: "Une histoire d'amour en mer." },
    { id: 4, title: "Avengers", cat: "Action", img: "https://picsum.photos/300/400?random=5", desc: "Les héros sauvent le monde." }
];

let favs = [];
let currentId = null;

function display(data, id) {
    const grid = document.getElementById(id);
    grid.innerHTML = "";
    data.forEach(m => {
        grid.innerHTML += `
            <div class="card">
                <img src="${m.img}" referrerpolicy="no-referrer">
                <h3>${m.title}</h3>
                <button onclick="openM(${m.id})">Détails</button>
            </div>
        `;
    });
}

function searchMovie() {
    const val = document.getElementById('search').value.toLowerCase();
    const filtered = movies.filter(m => m.title.toLowerCase().includes(val));
    display(filtered, 'grid');
}

function filterCat(c) {
    const filtered = c === "Tous" ? movies : movies.filter(m => m.cat === c);
    display(filtered, 'grid');
}

function openM(id) {
    const m = movies.find(x => x.id === id);
    currentId = id;
    document.getElementById('m-title').innerText = m.title;
    document.getElementById('m-desc').innerText = m.desc;
    document.getElementById('m-img').src = m.img;
    
    const btn = document.getElementById('m-btn');
    btn.innerText = favs.includes(id) ? "Retirer des favoris" : "Ajouter aux favoris";
    
    document.getElementById('modal').style.display = "flex";
}

function closeModal() {
    document.getElementById('modal').style.display = "none";
}

function toggleFav() {
    const idx = favs.indexOf(currentId);
    if (idx === -1) {
        favs.push(currentId);
    } else {
        favs.splice(idx, 1);
    }
    openM(currentId);
    if (!document.getElementById('fav-page').classList.contains('hidden')) {
        showPage('favs');
    }
}

function showPage(p) {
    if (p === 'home') {
        document.getElementById('home-page').classList.remove('hidden');
        document.getElementById('fav-page').classList.add('hidden');
        display(movies, 'grid');
    } else {
        document.getElementById('home-page').classList.add('hidden');
        document.getElementById('fav-page').classList.remove('hidden');
        const list = movies.filter(m => favs.includes(m.id));
        display(list, 'fav-grid');
    }
}

display(movies, 'grid');