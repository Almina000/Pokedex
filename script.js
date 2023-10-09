let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
let pokemonArray = localStorage.getItem("pokemonArray") ? JSON.parse(localStorage.getItem("pokemonArray")) : [];
closeResetConfirmationPopup()

function updateScore() {
    document.getElementById("score-value").textContent = score;
    errorPopup.style.display = "none";
    registeredPopup.style.display = "none";
}

function saveScore() {
    localStorage.setItem("score", score);
}

function savePokemonArray() {
    localStorage.setItem("pokemonArray", JSON.stringify(pokemonArray));
}

async function checkPokemon() {
    const name = document.getElementById("name").value.trim().toLowerCase();
    const number = document.getElementById("number").value.trim().toLowerCase();

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
                updateScore();
                saveScore();
                showRegisteredPopup(`${name.charAt(0).toUpperCase() + name.slice(1)} wurde registriert.<br>Du bekommst ${pokemon.points} Punkte.`, name, number);
                pokemonArray.push({ name: name, number: number });
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

    errorMessage.innerHTML = message;
    registeredPopup.style.display = "flex";

    if (name.toLowerCase() === 'mew' && number.toLowerCase() === '72') {
        // Wenn der Name 'mew' und die Nummer '72' sind, zeige das Mew-Bild an
        var bildElement = document.createElement("img");

        // Den Quellpfad des Bildes setzen
        bildElement.src = "mew.jpeg";
        bildElement.alt = "Bild";
        bildElement.height = 300;

        // Das Bild-Element zum Body des Dokuments hinzufügen
        registeredPopup.appendChild(bildElement);

       
    } else if (name.toLowerCase() === 'lapras' && number.toLowerCase() === '578'){
        // Wenn der Name 'mew' und die Nummer '72' sind, zeige das Mew-Bild an
        var bildElement = document.createElement("img");

        // Den Quellpfad des Bildes setzen
        bildElement.src = "lapras.jpg";
        bildElement.alt = "Bild";
        bildElement.height = 300;

        // Das Bild-Element zum Body des Dokuments hinzufügen
        registeredPopup.appendChild(bildElement);

    } else {
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

function resetScore() {
    score = 0;
    pokemonArray = []; 
    updateScore();
    saveScore();
    savePokemonArray(); 
    closeResetConfirmationPopup();
}

function closeResetConfirmationPopup() {
    const resetConfirmationPopup = document.getElementById("resetConfirmationPopup");
    resetConfirmationPopup.style.display = "none";
}
