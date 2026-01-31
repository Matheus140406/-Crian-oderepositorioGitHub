const API_KEY = 'SUA_API_KEY_AQUI'; // Pegue sua chave em themoviedb.org
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const movieGrid = document.getElementById('movie-list');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Função para buscar filmes
async function getMovies(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        showMovies(data.results);
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
    }
}

// Renderizar filmes na tela
function showMovies(movies) {
    movieGrid.innerHTML = '';

    movies.forEach(movie => {
        const { title, poster_path, vote_average, release_date } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie-card');

        movieEl.innerHTML = `
            <img src="${poster_path ? IMG_URL + poster_path : 'https://via.placeholder.com/500x750?text=Sem+Foto'}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span>⭐ ${vote_average.toFixed(1)}</span>
                <p style="color: gray; font-size: 0.8rem;">${release_date ? release_date.split('-')[0] : ''}</p>
            </div>
        `;
        movieGrid.appendChild(movieEl);
    });
}

// Evento de pesquisa
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    if (searchTerm && searchTerm !== '') {
        getMovies(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}&language=pt-BR`);
    } else {
        window.location.reload();
    }
});

// Carregar filmes populares ao abrir a página
getMovies(`${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&language=pt-BR`);