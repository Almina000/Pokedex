let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
let indexScore = localStorage.getItem("indexScore") ? parseInt(localStorage.getItem("indexScore")) : 0;
let pokemonArray = localStorage.getItem("pokemonArray") ? JSON.parse(localStorage.getItem("pokemonArray")) : [];
let counter = localStorage.getItem("counter") ? parseInt(localStorage.getItem("counter")) : 0;

closeResetConfirmationPopup()
closeIndexPopup()
closeZonePopup()
setColor()

function updateScore() {
    document.getElementById("score-value").textContent = indexScore;
    document.getElementById("score-value-index").textContent = score;
    errorPopup.style.display = "none";
    registeredPopup.style.display = "none";
}

function saveScore() {
    localStorage.setItem("score", score);
    localStorage.setItem("indexScore", indexScore);

}

function savePokemonArray() {
    localStorage.setItem("pokemonArray", JSON.stringify(pokemonArray));
}

async function checkPokemon() {
    const name = document.getElementById("name").value.trim().toLowerCase();
    const number = document.getElementById("number").value.trim().toLowerCase();

    document.getElementById("result").textContent = "";

    const isAlreadyRegistered = pokemonArray.some(entry => entry.name.toLowerCase() === name && entry.number.toLowerCase() === number);

    if (isAlreadyRegistered) {
        showErrorPopup("Dieses Pokémon wurde bereits registriert.");
    } else {
        try {
            const response = await fetch('pokedex.json');
            const data = await response.json();

            const isPokemonRegistered = data.some(entry => entry.name.toLowerCase() === name && entry.number.toLowerCase() === number);

            if (isPokemonRegistered) {
                const pokemon = data.find(entry => entry.name.toLowerCase() === name && entry.number.toLowerCase() === number);
                score += pokemon.points;
                indexScore += pokemon.points;
                updateScore();
                saveScore();
                showRegisteredPopup(`${name.charAt(0).toUpperCase() + name.slice(1)} wurde registriert.<br>Du bekommst ${pokemon.points} Punkte.`, name, number);
                /*pokemonArray.push({ name: name, number: number });*/
                pokemonArray.push({ name: name, number: number, points: pokemon.points });
                savePokemonArray();
            } else {
                document.getElementById("result").textContent = `${name.charAt(0).toUpperCase() + name.slice(1)} und/oder ${number} ist falsch.`;
            }
        } catch (error) {
            console.error("Error:", error);
        }

        
    }
    document.getElementById("name").value = "";
    document.getElementById("number").value = "";

}

function showErrorPopup(message) {
    const errorPopup = document.getElementById("errorPopup");
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = message;
    errorPopup.style.display = "flex";
}

function showRegisteredPopup(message, name, number) {
    const registeredPopup = document.getElementById("registeredPopup");
    const errorMessage = document.getElementById("registeredMessage");
    

    const images = registeredPopup.querySelectorAll("img");
    images.forEach(image => image.remove());
    const videos = registeredPopup.querySelectorAll("video");
    videos.forEach(video => video.remove());


    if (name.toLowerCase() === 'mew' && number.toLowerCase() === '683') {

        errorMessage.innerHTML = message;
        registeredPopup.style.display = "flex";
        // Wenn der Name 'mew' und die Nummer '683' sind, zeige das Mew-Bild an
        var bildElement = document.createElement("img");

        // Den Quellpfad des Bildes setzen
        bildElement.src = "mew.jpeg";
        bildElement.alt = "Bild";
        bildElement.height = 300;

        // Das Bild-Element zum Body des Dokuments hinzufügen
        registeredPopup.appendChild(bildElement);

       
    } else if (name.toLowerCase() === 'lapras' && number.toLowerCase() === '578'){
        
        errorMessage.innerHTML = message;
        registeredPopup.style.display = "flex";

        var bildElement = document.createElement("img");

        // Den Quellpfad des Bildes setzen
        bildElement.src = "lapras.jpg";
        bildElement.alt = "Bild";
        bildElement.height = 300;

        // Das Bild-Element zum Body des Dokuments hinzufügen
        registeredPopup.appendChild(bildElement);

    } else if (name.toLowerCase() === 'xxx' && number.toLowerCase() === '999'){
        errorMessage.innerHTML = "Herzlichen Glückwunsch!<br><br>Du hast die finale Herausforderung gewonnen<br>und bekommst 50 Punkte.";
        registeredPopup.style.display = "flex";

        const video = document.createElement("video");
        video.id = "video";
        video.width = 400;
        video.height = 300;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.controls = false;

        const source = document.createElement("source");
        source.src = "victory.mp4";
        source.type = "video/mp4";
  
        // Videoquelle zum Video-Element hinzufügen
        video.appendChild(source);
  
        // Video-Element zum Popup hinzufügen (falls es noch nicht vorhanden ist)
        if (!document.getElementById("video")) {
        registeredPopup.appendChild(video);
        }

    } else {

        errorMessage.innerHTML = message;
        registeredPopup.style.display = "flex";
        // Erstelle das Video-Element
        const video = document.createElement("video");
        video.id = "video";
        video.width = 400;
        video.height = 300;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.controls = false;
  
        const source = document.createElement("source");
        source.src = "catch.mp4";
        source.type = "video/mp4";
  
        // Videoquelle zum Video-Element hinzufügen
        video.appendChild(source);
  
        // Video-Element zum Popup hinzufügen (falls es noch nicht vorhanden ist)
        if (!document.getElementById("video")) {
        registeredPopup.appendChild(video);
        }

    }
    
      

    
    
}



function closeErrorPopup() {
    const errorPopup = document.getElementById("errorPopup");
    errorPopup.style.display = "none";
}

function closeRegisteredPopup() {
    const registeredPopup = document.getElementById("registeredPopup");
    registeredPopup.style.display = "none";
}

window.onload = function() {
    updateScore();
    
};

document.addEventListener("DOMContentLoaded", function () {
    const navBar = document.querySelector("nav"),
        overlay = document.querySelector(".overlay");

    document.body.addEventListener("click", function (event) {
        const target = event.target;
        if (target.classList.contains("menu-icon")) {
            navBar.classList.toggle("open");
            overlay.classList.toggle("open");
        } else if (navBar.classList.contains("open") && !target.closest(".sidebar")) {
            navBar.classList.remove("open");
            overlay.classList.remove("open");
        }
    });

    overlay.addEventListener("click", () => {
        navBar.classList.remove("open");
        overlay.classList.remove("open");
    });

});


function showResetConfirmationPopup() {
    const navBar = document.querySelector("nav");
    const overlay = document.querySelector(".overlay");

    navBar.classList.remove("open");
    overlay.classList.remove("open");

    const resetConfirmationPopup = document.getElementById("resetConfirmationPopup");
    resetConfirmationPopup.style.display = "flex";
 
}

function showZonePopup() {
    const navBar = document.querySelector("nav");
    const overlay = document.querySelector(".overlay");

    navBar.classList.remove("open");
    overlay.classList.remove("open");

    const zoneConfirmationPopup = document.getElementById("zonePopup");
    zoneConfirmationPopup.style.display = "flex";
 
}

function showIndexPopup() {
    const navBar = document.querySelector("nav");
    const overlay = document.querySelector(".overlay");

    navBar.classList.remove("open");
    overlay.classList.remove("open");

    const indexPopup = document.getElementById("indexPopup");
    indexPopup.style.display = "flex";

    // Rufe die Funktion auf, um die Pokémon-Liste zu generieren
    fillPokemonTable();
 
}

function resetScore() {
    counter = 0;
    localStorage.setItem("counter", counter);
    document.getElementById("score-value").style.backgroundColor = "#abf7d7b2";
    score = 0;
    indexScore = 0;
    pokemonArray = []; 
    updateScore();
    saveScore();
    savePokemonArray(); 
    closeResetConfirmationPopup();
}

function setColor(){

    if (counter == 1 ){
        document.getElementById("score-value").style.backgroundColor = "rgb(153, 236, 253)";
    }
    else if (counter == 2){
        document.getElementById("score-value").style.backgroundColor = "rgb(250, 253, 153)";
    }
    else if (counter == 3){
        document.getElementById("score-value").style.backgroundColor = "rgb(253, 153, 220)";
    }
    else if (counter == 4){
        document.getElementById("score-value").style.backgroundColor = "rgb(213, 153, 253)";
    }
    else if (counter == 5){
        document.getElementById("score-value").style.backgroundColor = "#dedede";
    }
    else if (counter == 6){
        document.getElementById("score-value").style.backgroundColor = "rgb(253, 233, 153)";
    }
    else if (counter == 7){
        document.getElementById("score-value").style.backgroundColor = "rgb(253, 153, 153)";
    }

}

function changeScore() {
    

    if (counter == 0 ){
        document.getElementById("score-value").style.backgroundColor = "rgb(153, 236, 253)";
    }
    else if (counter == 1){
        document.getElementById("score-value").style.backgroundColor = "rgb(250, 253, 153)";
    }
    else if (counter == 2){
        document.getElementById("score-value").style.backgroundColor = "rgb(253, 153, 220)";
    }
    else if (counter == 3){
        document.getElementById("score-value").style.backgroundColor = "rgb(213, 153, 253)";
    }
    else if (counter == 4){
        document.getElementById("score-value").style.backgroundColor = "#dedede";
    }
    else if (counter == 5){
        document.getElementById("score-value").style.backgroundColor = "rgb(253, 233, 153)";
    }
    else if (counter == 6){
        document.getElementById("score-value").style.backgroundColor = "rgb(253, 153, 153)";
    }

    counter ++;
    localStorage.setItem("counter", counter);
    indexScore = 0;
    updateScore();
    saveScore(); 
    closeZonePopup();
}

function closeResetConfirmationPopup() {
    const resetConfirmationPopup = document.getElementById("resetConfirmationPopup");
    resetConfirmationPopup.style.display = "none";
}

function closeIndexPopup() {
    const indexPopup = document.getElementById("indexPopup");
    indexPopup.style.display = "none";
}

function closeZonePopup() {
    const indexPopup = document.getElementById("zonePopup");
    indexPopup.style.display = "none";
}

/* Index */
function fillPokemonTable() {
    const tableBody = document.querySelector('#pokemonTable tbody');
    tableBody.innerHTML = ''; // Leere die Tabelle zuerst

    for (let i = 0; i < pokemonArray.length; i++) {
        const capitalizedName = pokemonArray[i].name.charAt(0).toUpperCase() + pokemonArray[i].name.slice(1);
        const row = `<tr>
                        <td>#${i + 1}</td>
                        <td>${capitalizedName}</td>
                        <td>${pokemonArray[i].number}</td>
                        <td>${pokemonArray[i].points}</td>
                    </tr>`;
        tableBody.innerHTML += row;
    }
}
