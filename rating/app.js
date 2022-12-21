const baseUrl = 'https://6387e991d94a7e50408faf43.mockapi.io/api/v1/id_movie';

password()
function password(){
    const pass = document.querySelector(".pass")
    pass.addEventListener('submit', passValide)
    
    if(passValide() == true){
        console.log(true)
    }
    else{
        console.log(false)
    }

    const btnValide = document.querySelector(".btnvalide")
    const inputPass = document.querySelector(".pass")
    btnValide.addEventListener('click', passValide)
    function passValide(){
        console.log("123")
        if(pass.value === "12333"){
            get()
            btnValide.classList.add("noneDisplay")
            inputPass.classList.add("noneDisplay")
            document.querySelector(".update").classList.remove("noneDisplay")
            console.log("OK")
            return true
        }
        else if(pass.value === "33321"){
            let account2url = "https://6387e991d94a7e50408faf43.mockapi.io/api/v1/account2";
            get(account2url)
            btnValide.classList.add("noneDisplay")
            inputPass.classList.add("noneDisplay")
            document.querySelector(".update").classList.remove("noneDisplay")
            console.log("OK")
            return true
        }
        else{
            console.log("Error")
            return false
        }
    }
}

//Отримання
async function get(data){
    setTimeout(1500)
    if(data == undefined){
        const getList = await fetch(baseUrl, {
            headers:{
                "Content-Type": "application/json"
            }
        })
        const response = await getList.json()
        show(response)
    }
    else {
        const getList = await fetch(data, {
            headers:{
                "Content-Type": "application/json"
            }
        })
        const response = await getList.json()
        show(response)
    }
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