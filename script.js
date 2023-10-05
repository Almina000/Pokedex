let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
let pokemonArray = localStorage.getItem("pokemonArray") ? JSON.parse(localStorage.getItem("pokemonArray")) : [];

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
    const name = document.getElementById("name").value.toLowerCase();
    const number = document.getElementById("number").value.toLowerCase();

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
                showRegisteredPopup(`${name.charAt(0).toUpperCase() + name.slice(1)} wurde registriert.<br>Du bekommst ${pokemon.points} Punkte.`);
                pokemonArray.push({ name: name, number: number });
                savePokemonArray();
            } else {
                document.getElementById("result").textContent = `${name} und/oder ${number} ist falsch.`;
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

function showRegisteredPopup(message) {
    const registeredPopup = document.getElementById("registeredPopup");
    const errorMessage = document.getElementById("registeredMessage");
    errorMessage.innerHTML = message;

      // Erstelle das Video-Element
    const video = document.createElement("video");
    video.id = "video";
    video.width = 400;
    video.height = 300;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
  
    const source = document.createElement("source");
    source.src = "catch.mp4";
    source.type = "video/mp4";
  
    // Videoquelle zum Video-Element hinzufügen
    video.appendChild(source);
  
    // Video-Element zum Popup hinzufügen (falls es noch nicht vorhanden ist)
    if (!document.getElementById("video")) {
        registeredPopup.appendChild(video);
    }
    registeredPopup.style.display = "flex";
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
