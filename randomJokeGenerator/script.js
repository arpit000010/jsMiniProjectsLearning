document.addEventListener("DOMContentLoaded", () => {

    let jokeButton = document.getElementById("btn");
    let jokeSetup = document.getElementById("joke-setUp");
    let jokePunchline = document.getElementById("joke-punchLine");

    jokeButton.addEventListener("click", async ()=>{
        try{
            const contentData = await getData();
            displayJoke(contentData);
        } catch(error){
            console.error("Error fetching joke:", error);
        }
    })



    async function getData(){
    const url = "https://official-joke-api.appspot.com/jokes/random";
    const response = await fetch(url);
    if(!response.ok){
        throw new Error("Failed to fetch joke");
    }
    const data = await response.json();
    console.log(data);
    return data;
}

function displayJoke(data) {
    jokeSetup.textContent = data.setup;
    jokePunchline.textContent = data.punchline;
}
});


