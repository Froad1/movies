const API_KEY = "?api_key=8560de707b2b84c834c2ee8ac9368365";

const ratingUrl = 'https://6387e991d94a7e50408faf43.mockapi.io/api/v1/id_movie';
const searchUrl = "https://api.themoviedb.org/3/search/multi?api_key=8560de707b2b84c834c2ee8ac9368365&language=uk";
const imageUrl = "https://image.tmdb.org/t/p/w500";
const imageUrlOrig = "https://image.tmdb.org/t/p/original/" 
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
document.querySelector(".movies_searcheble").style.display = "none";
fetchMainMovies(popularMovies, topRated, popularTv);
//LOGIN

var btnLogin = document.querySelector(".btn_login");
let accRatingUrl

btnLogin.addEventListener("click", ()=>{
    log()
} )

async function log(){
    const auntentificate = document.querySelector(".auntentificate");
    auntentificate.classList.add("show");
    auntentificate.innerHTML = `
        <div class="login_window">
            <form>
                <div class="login_text">Логін</div>
                <input type="text" class="login">
                <div class="pass_text">Пароль</div>
                <input type="text" class="pass">
            </form>
            <button class="auntentificate_submit">Зайти</button>
        </div>
    `
    document.querySelector(".auntentificate_submit").addEventListener("click", async function(){
        if (document.querySelector(".login").value == ''){
            document.querySelector(".login").style.borderColor = "red";
            setTimeout(function(){document.querySelector(".login").style.borderColor = "none"},1000)
            console.log("no login")
            return
        }
        else if(document.querySelector(".pass").value == ''){
            document.querySelector(".pass").style.borderColor = "red";
            setTimeout(function(){document.querySelector(".pass").style.borderColor = "none"},1000)
            console.log("no pass")
            return
        }

        auntentificate.classList.remove("show")
        document.querySelector(".btn_login").style.display = "none";
        const login = await fetch('database.json', {
            headers:{
                "Content-Type": "application/json"
            }
        })
        const loginData = await login.json();
        for(let i=0;i<loginData.length;i++){
            if(loginData[i].login == document.querySelector(".login").value){
                if (loginData[i].pass == document.querySelector(".pass").value){
                    accRatingUrl = loginData[i].url;
                    return
                }
            }
        }
    })
    window.addEventListener("click", (e) => {
        if (e.target === auntentificate) {
            auntentificate.classList.remove("show");
        }
      })
}

//ГОЛОВНИЙ ФІЛЬМ
var basicFilmId = ['100088','76600','315162','119051'];
var i = 0;

var btnChangeBasicMov =  document.querySelector(".change_basic_movie");
displayNextFilm()
function displayNextFilm(){
    let i = 0;
    let intervalId = setInterval(function() {
        i++;
        if(i === basicFilmId.length) i=0;
        fetchBasicMovies(i)
    }, 10000);
}

fetchBasicMovies(i)

async function fetchBasicMovies(i){
    if (basicFilmId[i] == 100088 || basicFilmId[i] == 119051){
        const fetchBasic = await fetch(tvInfo + basicFilmId[i] + API_KEY + "&language=uk", {
            headers:{
                "Content-Type": "application/json"
            }
        })
        const fetchBasicData = await fetchBasic.json();
        showBasicMovies(fetchBasicData);
    }
    else{
        const fetchBasic = await fetch(movieInfo + basicFilmId[i] + API_KEY + "&language=uk", {
            headers:{
                "Content-Type": "application/json"
            }
        })
        const fetchBasicData = await fetchBasic.json();
        showBasicMovies(fetchBasicData);
    }
}

function showBasicMovies(data){
    const basicsEl = document.querySelector(".basic_movie");
    basicsEl.innerHTML= ""
    basicsEl.innerHTML = `
        <div class="basic_poster">
            <div class="blure-box">
                <h1 class="basic_title">${mov_tv()}</h1>
            </div>
        </div>
    `
    setTimeout(function(){
        document.querySelector(".basic_poster").style.opacity = "100%"
    }, 100)
    setTimeout(function(){
        document.querySelector(".basic_poster").style.opacity = "0"
    }, 9000)
    function mov_tv(){
        if(data.id == '100088' || data.id == '119051'){
            return `${data.name}`
        }
        else return `${data.title}`
    }
    document.querySelector(".basic_poster").addEventListener("click", () => {
        if(data.id == '100088'|| data.id == '119051'){
            openModal(data.id, tvInfo)
        }
        else {
            openModal(data.id, movieInfo)
        }
    })

    document.querySelector(".basic_poster").style.setProperty("--basicPoster", `url(${imageUrlOrig + data.backdrop_path})`);

    const colorThief = new ColorThief();
    const img = new Image();
    
    img.addEventListener('load', function() {   
      var clr = colorThief.getColor(img)
      RGBToHSL(...clr)
      document.querySelector(".basic_poster").style.setProperty("--test_color", `${clr}`);
      document.querySelector(".header_content").style.setProperty("--test_color", `${clr}`)
      document.querySelector(".blure-box").style.setProperty("--test_color", `${clr}`);
    });
    let imageURL = imageUrlOrig + data.backdrop_path;
    let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
    
    img.crossOrigin = 'Anonymous';
    img.src = googleProxyURL + encodeURIComponent(imageURL);
}


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
    const moviesElTrend = document.querySelector(".movies_trending");
    
    document.querySelector(".movies_popular").innerHTML = "";
    document.querySelector(".movies_top").innerHTML = "";
    document.querySelector(".movies_trending").innerHTML = "";

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
            <!--  <div class="info-genre"></div> -->
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

    const btsScroll = document.querySelector(".btn-scroll");
    btsScroll.addEventListener('click', () => {
        if(moviesElPop.scrollLeft == "2911"){
            btsScroll.classList.add("noshow")
        }
        const movieWidth = moviesElPop.clientWidth;
        moviesElPop.scrollBy(movieWidth - 0,0);
    })

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

    trend.results.forEach(movieTrend => {
        const movieElTrend = document.createElement("div");
        movieElTrend.classList.add("movie");
        movieElTrend.innerHTML = `
        <div class="movies_posters">
            ${movieTrend.poster_path ? `<img src="${imageUrl}${movieTrend.poster_path}" class="movie_poster" alt="${movieTrend.original_title}"/>`: ''}
        </div>
        <div class="movie__cover--darkened"></div>
        <div class="movie_info">
            <div class="info-title">${movie_or_tv()}</div>
            <div class="info-genre"></div>
        </div>
        `
        function movie_or_tv(){
            if(typeof movieTrend.title === "undefined"){
                return `${movieTrend.name}`
            }
            else{
                return `${movieTrend.title}`
            }
        };

        movieElTrend.addEventListener("click", () => {
            if(typeof movieTrend.title === "undefined"){
                openModal(movieTrend.id, tvInfo)
            }
            else{
                openModal(movieTrend.id, movieInfo)
            }
        })
        moviesElTrend.appendChild(movieElTrend);

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
    document.querySelector(".movies_popular").style.display = "none";
    document.querySelector(".movies_top").style.display = "none";
    document.querySelector(".movies_searcheble").style.display = "flex";
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
    document.querySelector(".movies_trending").style.display = "none";
    document.querySelector(".basic_content").style.display = "none";
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

    function releaseDate(){
        if(typeof respData.release_date === "undefined"){
            return `${respData.first_air_date.substr(0, 4)}`
        }
        else{
            return `${respData.release_date.substr(0, 4)}`
        
        }
    }
    const resp = await fetch(movie_or_tv + id + API_KEY + "&language=uk", {
        headers: {
            "Content-Type": "application/json",
        }
    });
    const respData = await resp.json();

    if(typeof respData.title === "undefined"){
        var mov_or_tv_name = `${respData.name}`
    }
    else{
        var mov_or_tv_name = `${respData.title}`
    
    }

    async function showTrailer(){
        const trailer = await fetch(movie_or_tv + id + API_KEY + "&append_to_response=videos" + "&language=uk", {
            headers: {
                "Content-Type": "application/json",
            }
        });
        const trailerData = await trailer.json();
        if (trailerData.videos.results.length > 0){
            return trailerData.videos.results[0].key
        }
        else {
            return 
        }
    }
    const trailerKey = await showTrailer();
    modalEl.classList.add("modal-show");

    const mockurlGET = `https://6387e991d94a7e50408faf43.mockapi.io/api/v1/id_movie?id_movie=${respData.id}`;
        const getList = await fetch(mockurlGET, {
            headers:{
                "Content-Type": "application/json"
            }
        })
        const response = await getList.json()
        var yourRate
        response.forEach(data =>{
            yourRate = data.rating
        })
    modalEl.innerHTML = `
    <div class="modal_card">
        <div class="modal_header">
            <div class="modal-text">
                <div class="modal_movie-posters">
                    <img src="${imageUrl}${respData.poster_path}" alt="" class="modal_movie-poster">
                </div>
                <h2 class="modal_movie-title">
                    <span class="movie-title">${mov_or_tv_name}</span>
                    <span class="movie-year">(${releaseDate()})</span>
                </h2>
                <!--<p class="movie-genres">${respData.genres.map((el) => `${el.name}`)}</p>-->
                ${respData.overview ? `<p class="movie-desc">Опис</p>
                <p class="info-desc">${respData.overview}</p>` : ''}
                ${respData.vote_average ? `<p class="movie-rate">Оцінка</p>
                <p class="info-rate">${respData.vote_average}</p>` : ''}
                ${yourRate ?`<p class="your-rate-text">Ваша оцінка</p>`: ''}
                ${yourRate ? `<p class="your-rate">${yourRate}</p>`:`
                <input type="text" class="input_rating">
                <button class="send_rating-button" placeholder="Оцінка">Оцінити</button>
                <p class="rating_text-error"></p>`}
                <img src="./images/close.svg" class="modal_button-close"/>
            </div>
        </div>
        ${ trailerKey ? `
        <div class="modal_trailer">
            <iframe src="${ "https://www.youtube.com/embed/" + trailerKey}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="modal_frame_trailer"></iframe>
        </div>`: ''}
    </div>
    `
    console.log(respData.id)
    document.querySelector(".modal_header").style.setProperty("--background_poster", `url(${backgroundUrl +respData.backdrop_path})`);

    const btnClose = document.querySelector(".modal_button-close");
    btnClose.addEventListener("click", () => closeModal());

    const sendRatingButton = document.querySelector('.send_rating-button');

    var ratingTextError = document.querySelector(".rating_text-error");
    if(yourRate == undefined){
    ratingTextError.style.display = "none";
    sendRatingButton.addEventListener('submit', (e) =>{
        e.preventDefault();
        if(accRatingUrl == undefined){
            console.log("not logined")
            ratingTextError.style.display = "flex";
            ratingTextError.innerHTML = "Ви не зайшли в особистий кабінет"
            ratingTextError.addEventListener("click", () =>{
                closeModal()
                log()
            })
        }
        else ratingPOST(accRatingUrl)
        
    })

    sendRatingButton.onclick = function alertpass(){
        if(accRatingUrl == undefined){
            console.log("not logined")
            ratingTextError.style.display = "flex";
            ratingTextError.innerHTML = "Ви не зайшли в особистий кабінет";
            ratingTextError.addEventListener("click", () =>{
                closeModal()
                log()
            })
        }
        else ratingPOST(accRatingUrl)
    }}

    function ratingPOST(url){
        const input_rating = document.querySelector(".input_rating")
        const data = {id_movie: respData.id, name: mov_or_tv_name ,rating: input_rating.value,img: imageUrl + respData.poster_path}
        input_rating.value = "";

        post();
        async function post(){
            const rating = await fetch(url, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const response = await rating.json()
        }
    }

    if(respData.vote_average <= 6){
        document.querySelector(".info-rate").style.color = 'red'
    }
    else if(respData.vote_average > 6 && respData.vote_average < 7.5){
        document.querySelector(".info-rate").style.color = 'yellow'
    }
    else{
        document.querySelector(".info-rate").style.color = 'green'
    }

    //COLOR_PICKER

    const colorThief = new ColorThief();
    const img = new Image();
    
    img.addEventListener('load', function() {   
      var clr = colorThief.getColor(img)
      RGBToHSL(...clr)
      document.querySelector(".modal_header").style.setProperty("--test_color", `${clr}`);
    });
    let imageURL = backgroundUrl +respData.backdrop_path;
    let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
    
    img.crossOrigin = 'Anonymous';
    img.src = googleProxyURL + encodeURIComponent(imageURL);
};

    //RGB TO HSL
    function RGBToHSL(r,g,b) {
        r /= 255;
        g /= 255;
        b /= 255;
        let cmin = Math.min(r,g,b),
            cmax = Math.max(r,g,b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
        if (delta == 0)
        h = 0;
        else if (cmax == r)
        h = ((g - b) / delta) % 6;
        else if (cmax == g)
        h = (b - r) / delta + 2;
        else
        h = (r - g) / delta + 4;

        h = Math.round(h * 60);
        
        if (h < 0)
            h += 360;
        l = (cmax + cmin) / 2;

            s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
                
            s = +(s * 100).toFixed(1);
            l = +(l * 100).toFixed(1);

            document.documentElement.style.setProperty("--light", l)   
      }

function closeModal() {
    modalEl.classList.remove("modal-show");
    modalEl.innerHTML = "";
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
