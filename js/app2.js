const API_KEY = "8560de707b2b84c834c2ee8ac9368365";

const imageUrl = "https://image.tmdb.org/t/p/w500";
const backgroundUrl = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces";

const buttonElement = document.querySelector(".header_content-search");
const inputElement = document.querySelector(".header_content-input");
const moviesSearcheble = document.querySelector(".movies_searcheble");

document.querySelector(".main_text-popular").classList.add("text-show");
document.querySelector(".main_text-top").classList.add("text-show");
fetchMainMovies("movie/popular?", "movie/top_rated?", "tv/popular?");

//ОТРИМАННЯ ДАННИХ ПРО ФІЛЬМ
async function fetchMainMovies(pop, top, trend) {
    const fetchPop = await fetch(getUrl(pop), {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const fetchPopData = await fetchPop.json();

    const fetchTop = await fetch(getUrl(top), {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const fetchTopData = await fetchTop.json();

    const fetchTrend = await fetch(getUrl(trend), {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const fetchTrendData = await fetchTrend.json();

    const testfetch1 = fetchPopData.results.concat(fetchTopData.results)
    testfetch1.sort(() => Math.random() - 0.5)

    showMainMovies(fetchPopData, testfetch1, fetchTrendData);
}

//ПОКАЗ ФІЛЬМІВ НА ГОЛОВНІЙ СТОРІНЦІ
function showMainMovies(pop, top, trend) {
    const moviesElPop = document.querySelector(".movies_popular");
    const moviesElTop = document.querySelector(".movies_top");
    const moviesElTrend = document.querySelector(".movies_trend");
    const moviesHtmlPop = pop.results.map(movie => {
        return `
        <div class="movie" data-id="${movie.id}"> 
            <img src="${imageUrl + movie.poster_path}" alt="${movie.title}" class="movie_poster"/>
            <div class="movie_description">
                <h3>${movie.title}</h3>
                <p>${movie.release_date.slice(0, 4)}</p>
                <p>${movie.vote_average}</p>
            </div>
        </div>
        `
    }).join('');

    const moviesHtmlTop = top.map(movie => {
        return `
        <div class="movie" data-id="${movie.id}"> 
            <img src="${imageUrl + movie.poster_path}" alt="${movie.title}" class="movie_poster"/>
            <div class="movie_description">
                <h3>${movie.title}</h3>
                <p>${movie.release_date.slice(0, 4)}</p>
                <p>${movie.vote_average}</p>
            </div>
        </div>
        `
    }).join('');

    const moviesHtmlTrend = trend.results.map(tv => {
        return `
        <div class="tv" data-id="${tv.id}"> 
            <img src="${imageUrl + tv.poster_path}" alt="${tv.name}" class="movie_poster"/>
            <div class="movie_description">
                <h3>${tv.name}</h3>
                <p>${tv.first_air_date.slice(0, 4)}</p>
                <p>${tv.vote_average}</p>
            </div>
        </div>
        `
    }).join('');

    moviesElPop.innerHTML = moviesHtmlPop;
    moviesElTop.innerHTML = moviesHtmlTop;
    moviesElTrend.innerHTML = moviesHtmlTrend;
}
// ПОШУК ФІЛЬМІВ/ СЕРЕАЛІВ
async function searchMovies(query) {
    const searchUrl = getUrl(`/search/multi?query=${query}`);
    const fetchSearch = await fetch(searchUrl, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const searchData = await fetchSearch.json();

    const moviesHtml = searchData.results.map(result => {
        if (result.media_type === 'movie') {
            return `
            <div class="movie" data-id="${result.id}">
                <img src="${imageUrl + result.poster_path}" alt="${result.title}" class="movie_poster">
                <div class="movie_description"> 
                    <h3>${result.title}</h3> 
                    <p>${result.release_date.slice(0, 4)}</p>
                    <p>${result.vote_average}</p> 
                </div> 
            </div>`
        } else if (result.media_type === 'tv') {
            return `
            <div class="tv" data-id="${result.id}"> 
                <img src="${imageUrl + result.poster_path}" alt="${result.name}" class="movie_poster"/>
                <div class="tv_description">
                    <h3>${result.name}</h3>
                    <p>${result.first_air_date.slice(0, 4)}</p>
                    <p>${result.vote_average}</p>
                </div>
            </div>
            `
        }
    }).join('');
    moviesSearcheble.innerHTML = moviesHtml;
}
//ОТРИМАННЯ ІНФОРМАЦІЇ ПРО ФІЛЬМ
async function showMovieInfo(id) {
    const movieUrl = getUrl(`/movie/${id}?`);
    const fetchMovie = await fetch(movieUrl, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const movieData = await fetchMovie.json();

    const castUrl = getUrl(`/movie/${id}/credits?`);
    const fetchCast = await fetch(castUrl, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const castData = await fetchCast.json();

    const movieElement = document.querySelector(".movie_info");
    movieElement.innerHTML = `
    <div class="movie_info-poster">
    <img src="${imageUrl + movieData.poster_path}" alt="${movieData.title}">
    </div>
    <div class="movie_info-description">
    <h3>${movieData.title}</h3>
    <p>${movieData.overview}</p>
    <h4>В ролях:</h4>
        <ul class="movie_info-cast">
            ${castData.cast.slice(0, 5).map(actor => `<li>${actor.name}</li>`).join('')}
        </ul>
        <h4>Режиссер:</h4>
        <ul class="movie_info-cast">
            ${castData.crew.filter(name => name.job === 'Director').map(director => `<li>${director.name}</li>`).join('')}
        </ul>
        </div>
  `;
    movieElement.classList.add('show');
    document.querySelector('.overlay').classList.add('show');
}
//ОТРИМАННЯ ІНФОРМАЦІЇ ПРО СЕРІАЛ
async function showTvInfo(id) {
    const tvUrl = getUrl(`/tv/${id}?`);
    const fetchTv = await fetch(tvUrl, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const tvData = await fetchTv.json();

    const castUrl = getUrl(`/tv/${id}/credits?`);
    const fetchCast = await fetch(castUrl, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const castData = await fetchCast.json();

    const tvElement = document.querySelector(".tv_info");
    tvElement.innerHTML = `
    <div class="tv_info-poster"> 
        <img src="${imageUrl + tvData.poster_path}" alt="${tvData.name}" /> 
    </div>
    <div class="tv_info-description">
        <h3>${tvData.name}</h3>
        <p>${tvData.overview}</p>
        <h4>В ролях:</h4>
        <ul class="tv_info-cast"> ${castData.cast.slice(0, 5).map(actor => `<li>${actor.name}</li>`).join('')} </ul>
        <h4>Режиссер:</h4>
        <ul class="tv_info-cast"> ${tvData.created_by .map(creator => `<li>${creator.name}</li>`) .join('')} </ul>
    </div>
    `
    tvElement.classList.add('show');
    document.querySelector('.overlay').classList.add('show');
}

//ЗАКРИТТЯ ІНФОРМАЦІЇ ПРО ФІЛЬМ/СЕРІАЛ
    document.querySelector('.overlay').addEventListener('click', () => {
    document.querySelector('.overlay').classList.remove('show');
    document.querySelector('.movie_info').classList.remove('show');
    document.querySelector('.tv_info').classList.remove('show');
});

//ОБРОБКА ПОШУКУ
buttonElement.addEventListener('click', () => {
    moviesSearcheble.innerHTML = '';
    const query = inputElement.value;
    searchMovies(query);
});

//ПЕРЕХІД НА СТОРІНКУ ПОШУКУ
inputElement.addEventListener('keypress', event => {
    if (event.keyCode === 13) {
        moviesSearcheble.innerHTML = '';
        const query = inputElement.value;
        searchMovies(query);
    }
});

//ПОКАЗ ІНФОРМАЦІЇ ПРО ФІЛЬМ/СЕРІАЛ ПРИ КЛІКУ
document.querySelector('.movies_popular').addEventListener('click', event => {
    if (event.target.classList.contains('movie')) {
        event.preventDefault();
        const id = event.target.dataset.id;
        showMovieInfo(id);
    } 
    else if(event.target.classList.contains('tv')){
        event.preventDefault();
        const id = event.target.dataset.id;
        showTvInfo(id);
    } else console.log("Error")
});

document.querySelector('.movies_trend').addEventListener('click', event => {
    if (event.target.classList.contains('movie')) {
        event.preventDefault();
        const id = event.target.dataset.id;
        showMovieInfo(id);
    } 
    else if(event.target.classList.contains('tv')){
        event.preventDefault();
        const id = event.target.dataset.id;
        showTvInfo(id);
    } else console.log("Error")
});

moviesSearcheble.addEventListener('click', event => {
    if (event.target.classList.contains('movie')) {
        event.preventDefault();
        const id = event.target.dataset.id;
        showMovieInfo(id);
    } 
    else if(event.target.classList.contains('tv')){
        event.preventDefault();
        const id = event.target.dataset.id;
        showTvInfo(id);
    } else console.log("Error")
});

//ФУНКЦІЯ ДЛЯ ФОРМУВАННЯ ПОЛНОГО АДРЕСУ ЗАПИТУ ДО АПІ
function getUrl(path) {
    return `https://api.themoviedb.org/3/${path}&api_key=${API_KEY}&language=uk`;
}