const baseUrl = 'https://6387e991d94a7e50408faf43.mockapi.io/api/v1/id_movie';
get()
async function get(){
    setTimeout(1500)
    const getList = await fetch(baseUrl, {
        headers:{
            "Content-Type": "application/json"
        }
    })
    const response = await getList.json()
    const pass = document.querySelector(".pass")
    pass.addEventListener('submit', (e) =>{
        e.preventDefault();
        passValide()
    })
    
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
        if(pass.value === "12333"){
            show(response)
            btnValide.classList.add("noneDisplay")
            inputPass.classList.add("noneDisplay")
            document.querySelector(".delete_on").classList.remove("noneDisplay")
            return true
        }
        else{
            console.log("Error")
            return false
        }
    }
}

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
            <p>${rate.id_movie} = ${rate.rating}/10</p>
            <img src="close.svg" alt="Error" class="rate_delete" onclick="del(${rate.id})">
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

function showDelete(){
    console.log("OK")
    document.querySelector(".rate_delete").classList.add("noneDisplay")
}