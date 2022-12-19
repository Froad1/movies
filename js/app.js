const API_KEY = "?api_key=8560de707b2b84c834c2ee8ac9368365";

const ratingUrl = 'https://6387e991d94a7e50408faf43.mockapi.io/api/v1/id_movie';
const searchUrl = "https://api.themoviedb.org/3/search/multi?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk";
const imageUrl = "https://image.tmdb.org/t/p/w500"; 
const popularMovies = "https://api.themoviedb.org/3/movie/popular?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk&page=1";
const topRated = "https://api.themoviedb.org/3/movie/top_rated?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk"
const trendingMovie ="https://api.themoviedb.org/3/trending/tv/week?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk";
const movieInfo = "https://api.themoviedb.org/3/movie/";
const tvInfo = "https://api.themoviedb.org/3/tv/";
const popularTv= "https://api.themoviedb.org/3/tv/popular?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk&page=1"
const hdrezka = "https://rezka.ag/search/?do=search&subaction=search&q=";
const backgroundUrl = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces";

const buttonElement = document.querySelector(".header_content-search");
const inputElement = document.querySelector(".header_content-input");
const moviesSearcheble = document.querySelector(".movies_searcheble");

document.querySelector(".main_text-popular").classList.add("text-show");
document.querySelector(".main_text-top").classList.add("text-show");
fetchMainMovies(popularMovies, topRated, popularTv);

//ОТРИМАННЯ ДАННИХ ПРО ФІЛЬМ
async function fetchMainMovies(pop, top, trend){
    const fetchPop = await fetch(pop, {
        headers:{
            "Content-Type": "application/json"
        }
    })
    const fetchPopData = await fetchPop.json();

    const fetchTop = await fetch(top, {
        headers:{
            "Content-Type": "application/json"
        }
    })
    const fetchTopData = await fetchTop.json();

    const fetchTrend = await fetch(trend, {
        headers:{
            "Content-Type": "application/json"
        }
    })
    const fetchTrendData = await fetchTrend.json();
    

    const testfetch1 = fetchPopData.results.concat(fetchTrendData.results)
    testfetch1.sort(()=>Math.random()-0.5)

    showMainMovies(fetchPopData, testfetch1, fetchTrendData)
}

//ПОКАЗ ФІЛЬМІВ НА ГОЛОВНІЙ СТОРІНЦІ
function showMainMovies(pop, top, trend){
    const moviesElPop = document.querySelector(".movies_popular");
    const moviesElTop = document.querySelector(".movies_top");
    
    document.querySelector(".movies_popular").innerHTML = "";
    document.querySelector(".movies_top").innerHTML = "";

    const btsScroll = document.querySelector(".btn-scroll");
        btsScroll.onclick = function(){
            console.log(moviesElPop.clientWidth)
            moviesElPop.scrollBy(moviesElPop.clientWidth - 180,0);
    }

    pop.results.forEach(movie => {
        const movieElPop = document.createElement("div");
        movieElPop.classList.add("movie");
        movieElPop.innerHTML = `
        <div class="movies_posters">
            ${movie.poster_path ? `<img src="${imageUrl}${movie.poster_path}" class="movie_poster" alt="${movie.original_title}"/>`: ''}
        </div>
        <div class="movie__cover--darkened"></div>
        <div class="movie_info">
            <div class="info-title">${movie_or_tv()}</div>
            <div class="info-genre"></div>
        </div>
        `

        function movie_or_tv(){
            if(movie.media_type == "tv"){
                return `${movie.name}`
            }
            else{
                return `${movie.title}`
            }
        };

        movieElPop.addEventListener("click", () => {
            if(movie.media_type === "tv"){
                openModal(movie.id, tvInfo)
            }
            else{
                openModal(movie.id, movieInfo)
            }
        })
        moviesElPop.appendChild(movieElPop);

    });

    top.forEach(movieTop => {
        const movieElTop = document.createElement("div");
        movieElTop.classList.add("movie");
        movieElTop.innerHTML = `
        <div class="movies_posters">
            ${movieTop.poster_path ? `<img src="${imageUrl}${movieTop.poster_path}" class="movie_poster" alt="${movieTop.original_title}"/>`: ''}
        </div>
        <div class="movie__cover--darkened"></div>
        <div class="movie_info">
            <div class="info-title">${movie_or_tv()}</div>
            <div class="info-genre"></div>
        </div>
        `
        function movie_or_tv(){
            if(typeof movieTop.title === "undefined"){
                return `${movieTop.name}`
            }
            else{
                return `${movieTop.title}`
            }
        };

        movieElTop.addEventListener("click", () => {
            if(typeof movieTop.title === "undefined"){
                openModal(movieTop.id, tvInfo)
            }
            else{
                openModal(movieTop.id, movieInfo)
            }
        })
        moviesElTop.appendChild(movieElTop);

    });

}

const form = document.querySelector("form");
const inpt = document.querySelector(".header_content-input");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (inputElement.value) {
      buttonOnClick();
      inputElement.value = "";
    }
  });

function buttonOnClick(event){
    closeModal();
    document.querySelector(".main_text-popular").classList.remove("text-show");
    document.querySelector(".main_text-top").classList.remove("text-show");
    document.querySelector(".movies_popular").innerHTML = "";
    document.querySelector(".movies_top").innerHTML = "";

    const new_searchURL = searchUrl + "&query=" + inputElement.value;

    getSearchebleMovies(new_searchURL);
    
    async function getSearchebleMovies(data){
        const resp = await fetch(new_searchURL, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        const respData = await resp.json();
        showSearchebleMovies(respData);
    }
}
//ПОКАЗ ФІЛЬМІВ В ПОШУКУ
function showSearchebleMovies(data){
    const moviesEl = document.querySelector(".movies_searcheble");
    
    document.querySelector(".main_text-results").classList.add("text-show");
    document.querySelector(".movies_searcheble").classList.add("text-show");
    document.querySelector(".movies_popular").classList.remove("text-show");
    document.querySelector(".movies_top").classList.add("text-show");
    document.querySelector(".movies_searcheble").innerHTML = "";


    data.results.forEach(movie => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
        <div class="movie__cover-inner">
            ${movie.poster_path ? `<img src="${imageUrl}${movie.poster_path}" class="movie_poster" alt="${movie.original_title}"/>`: ''}
        </div>
        <div class="movie__cover--darkened"></div>
        <div class="movie-info">
            <div class="movie_title">${movie_or_tv()}</div>
            <div class="movie_genre"></div>
        </div>
        `
        function movie_or_tv(){
            if(movie.media_type === "tv"){
                return `${movie.name}`
            }
            else{
                return `${movie.title}`
            }
        };

        movieEl.addEventListener("click", () => {
            if(movie.media_type === "tv"){
                openModal(movie.id, tvInfo)
                console.log("tv")
            }
            else{
                openModal(movie.id, movieInfo)
                console.log("movie")
            }
        })
        moviesEl.appendChild(movieEl);

    });
}


//MODAL

const modalEl = document.querySelector(".modal");

async function openModal(id , movie_or_tv){
    function mov_or_tv_name(){
        if(typeof respData.title === "undefined"){
            return `${respData.name}`
        }
        else{
            return `${respData.title}`
        
        }
    };
    const resp = await fetch(movie_or_tv + id + API_KEY + "&language=uk", {
        headers: {
            "Content-Type": "application/json",
        }
    });
    const respData = await resp.json();

    modalEl.classList.add("modal-show");
    modalEl.style.setProperty("--background_poster", `url(${backgroundUrl +respData.backdrop_path})`);

    modalEl.innerHTML = `
    <div class="modalbg">
    <div class="modal_card">
        <div class="modal_movie-posters">
            <img src="${imageUrl}${respData.poster_path}" alt="" class="modal_movie-poster">
        </div>
        <div class="modal_movie">
            <h2>
                <span class="movie-title">${mov_or_tv_name()}</span>
            </h2>
            <ul class="modal_movie-info">
                <div class="loader"></div>
                <li class="info-genre"><span> ${respData.genres.map((el) => `${el.name}`)} </span></li>
                <li class="info-desc">${respData.overview}</li>
                <li class="info-rate">${respData.vote_average}</li>
            </ul>
            <form>
                <input type="text" class="input_rating">
            </form>
            <button class="send_rating-button" placeholder="Оцінка">Оцінити</button>
        </div>

        <button type="button" class="modal_button-close">Закрити</button>
    </div>
    </div>
    `
    document.querySelector(".modalbg").style.setProperty("--background_poster", `url(${backgroundUrl +respData.backdrop_path})`);
    const btnClose = document.querySelector(".modal_button-close");
    btnClose.addEventListener("click", () => closeModal());

    const sendRatingButton = document.querySelector('.send_rating-button');
    sendRatingButton.addEventListener('submit', (e) =>{
        e.preventDefault();
        ratingPOST()
    })
    sendRatingButton.onclick = function ratingPOST(){
        const input_rating = document.querySelector(".input_rating")
        const data = {id_movie: mov_or_tv_name() ,rating: input_rating.value,img: imageUrl + respData.poster_path}
        input_rating.value = "";

        post();
        async function post(){
            const rating = await fetch(ratingUrl, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const response = await rating.json()
        }
    }
};

function closeModal() {
    modalEl.classList.remove("modal-show");
  }
  
window.addEventListener("click", (e) => {
    if (e.target === modalEl) {
      closeModal();
    }
  })
  
window.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
      closeModal();
    }
  })