const url = "https://library.softly.uz/api/app/books?size=100&page=1&order=DESC"

async function getBooks(url) {
    try {
        let res = await fetch(url)
        if (!res.ok) {
            throw new Error(`ERROR: ${res.status}`);
        }
        let data = await res.json()
        console.log("DATA ARRIVED", data)
        let MainWrapper = document.querySelector(".products_wrapper")
        MainWrapper.innerHTML = ""
        console.log(data.items)
        data.items.forEach(book => {
            let newDiv = document.createElement("div")
            newDiv.classList.add("card_wrapper")
           let check = "BO'SH"
            if(book.stocks.busy){
                 check = "BAND"
            }
            newDiv.innerHTML = `
                <img src="${book.image}" alt="Image not found>
                <p style="font-size:10px"><b>${book.name}</b></p>
                <p style="font-size:20px"><b>${book.author.name}</b></p>
                <button>${check}</button>`
            MainWrapper.appendChild(newDiv)

            const optionsEl = document.querySelector(".texts_row")
             const buttonAllEl = document.querySelector(".all")
             const buttonBusyEl = document.querySelector(".busy")
              const buttonFreeEl = document.querySelector(".free")
            optionsEl.addEventListener("click", (event)=>{
                if(event.target.classList.contains("all")){
                    buttonAllEl.style.backgroundColor="dodgerblue"
                    buttonAllEl.style.color="white"
                }
                else if(event.target.classList.contains("busy")){
                     buttonBusyEl.style.backgroundColor="dodgerblue"
                    buttonBusyEl.style.color="white"
                }
                else if(event.target.classList.contains("free")){
                     buttonFreeEl.style.backgroundColor="dodgerblue"
                    buttonFreeEl.style.color="white"
                }
            })     
        });
    } catch (error) {
        console.log(error.message)
        return null
    }
}
getBooks(url)