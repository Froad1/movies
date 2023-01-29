const baseUrl = 'https://6387e991d94a7e50408faf43.mockapi.io/api/v1/id_movie';

password()
function password(){
    const btnValide = document.querySelector(".btnvalide");
    const inputPass = document.querySelector(".pass");
    const inputLogin = document.querySelector(".login");
    document.querySelector(".btnvalide").addEventListener("click", async function(){
        if (inputLogin.value == ''){
            console.log("no login")
            return
        }
        else if(inputPass.value == ''){
            console.log("no pass")
            return
        }
        const login = await fetch('../database.json', {
            headers:{
                "Content-Type": "application/json"
            }
        })
        const loginData = await login.json();
        for(let i=0;i<loginData.length;i++){
            if(loginData[i].login == inputLogin.value){
                if (loginData[i].pass == inputPass.value){
                    get(loginData[i].url);
                    btnValide.classList.add("noneDisplay");
                    inputLogin.classList.add("noneDisplay");
                    inputPass.classList.add("noneDisplay");
                    return
                }
            }
        }
    })
}

//Отримання
async function get(data){
    setTimeout(1500)
    const getList = await fetch(data, {
        headers:{
            "Content-Type": "application/json"
        }
    })
    const response = await getList.json()
    show(response)
}
//Показ
function show(data){
    const ratingh = document.querySelector('.ratingg');
    document.querySelector('.ratingg').innerHTML = "";
    console.log("show")
    data.forEach(rate =>{
        const ratin = document.createElement("div");
        ratin.classList.add("films");
        ratin.innerHTML = `
        <div class="film_card">
            <img src="${rate.img}" alt="Error" width="200px">
            <p class="rate_text">${rate.id_movie} = ${rate.rating}/10
            <span class="change_rate-span"><img src="edit.svg" alt="Error" class="change_rate" onclick="rateChangeShow(${rate.id})"></span></p>
            <img src="close.svg" alt="Error" class="rate_delete noneDisplay" onclick="del(${rate.id})">
            <input type="text" class="change_rate-inpt${rate.id} noneDisplay">
            <button class="change_rate-butt${rate.id} noneDisplay" onclick="rateChange(${rate.id})">Змінити</button>
        </div>
        `

        ratingh.appendChild(ratin);
    })

}

const inputElement = document.querySelector(".name")
const inputElementRate = document.querySelector(".name_rating")
function getInpt(){

    const data = {id_movie: inputElement.value,rating: inputElementRate.value}
    post()
    async function post(){
        const getList = await fetch(baseUrl, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const response = await getList.json()
        console.log(response)
        get()
    }
    
}
const rateDelete = document.querySelector(".rate_delete");
function del(data){
    if(confirm("Ви впевнені що хочете видалити?")){
        post()
    };
    async function post(){
        const getList = await fetch(baseUrl + '/'+ data, {
            method: "DELETE",
        })
        get()
    }
}

function rateChangeShow(data){
    document.querySelector(".change_rate-inpt" + data).classList.remove("noneDisplay")
    document.querySelector(".change_rate-butt" + data).classList.remove("noneDisplay")
    window.addEventListener("keydown", (e) => {
        if (e.keyCode === 27) {
            document.querySelector(".change_rate-inpt" + data).classList.add("noneDisplay")
            document.querySelector(".change_rate-butt" + data).classList.add("noneDisplay")
        }
      })
}

function rateChange(data){
    const changeInput = document.querySelector(".change_rate-inpt" + data)
    const data1 = {rating: changeInput.value}
    put()
    async function put(){
        const getList = await fetch(baseUrl + "/" + data, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data1)
        })
        get()
    }
}

document.querySelector(".update").onclick = function updateRate(){
    get()
}