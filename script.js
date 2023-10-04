let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;

function updateScore() {
    document.getElementById("score-value").textContent = score;
}

function saveScore() {
    localStorage.setItem("score", score);
}

async function checkPokemon() {
    const name = document.getElementById("name").value.toLowerCase();
    const number = document.getElementById("number").value.toLowerCase();

    try {
        const response = await fetch('pokedex.json');
        const data = await response.json();

        const isPokemonRegistered = data.some(entry => entry.name.toLowerCase() === name && entry.number.toLowerCase() === number);

        if (isPokemonRegistered) {
            showErrorPopup("Dieses Pokémon wurde bereits registriert.");
        } else {
        
            const pokemon = data.find(entry => entry.name.toLowerCase() === name && entry.number.toLowerCase() === number);

            if (pokemon) {
                score += pokemon.points;
                updateScore();
                saveScore();
                document.getElementById("result").textContent = `Correct! ${name} is in the Pokédex. You earned ${pokemon.points} points.`;
            } else {
                document.getElementById("result").textContent = `Incorrect! ${name} with number ${number} is not in the Pokédex.`;
            }
        
        }

    } catch (error) {
        console.error("Error:", error);
    }

    document.getElementById("name").value = "";
    document.getElementById("number").value= "";
}

function showErrorPopup(message) {
    const errorPopup = document.getElementById("errorPopup");
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = message;
    errorPopup.style.display = "flex";
}

function closeErrorPopup() {
    const errorPopup = document.getElementById("errorPopup");
    errorPopup.style.display = "none";
}

// Initialisiere den Punktestand beim Laden der Seite
window.onload = function() {
    updateScore();
};
