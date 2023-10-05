let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
let pokemonArray = localStorage.getItem("pokemonArray") ? JSON.parse(localStorage.getItem("pokemonArray")) : [];

function updateScore() {
    document.getElementById("score-value").textContent = score;
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
