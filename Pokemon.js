const API_URL = "https://pokeapi.co/api/v2/pokemon/";

const searchForm = document.getElementById("searchForm");
const pokemonInput = document.getElementById("pokemonInput");
const message = document.getElementById("message");
const pokemonCard = document.getElementById("pokemonCard");

const pokemonName = document.getElementById("pokemonName");
const pokemonId = document.getElementById("pokemonId");
const pokemonImage = document.getElementById("pokemonImage");
const types = document.getElementById("types");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const stats = document.getElementById("stats");
const abilities = document.getElementById("abilities");
const generation = document.getElementById("generation");
const gender = document.getElementById("gender");

async function getPokemon(name) {
    const pokemonNameInput = name.trim().toLowerCase();

    if (!pokemonNameInput) {
        message.textContent = "Please enter a Pokémon name.";
        message.className = "message error";
        return;
    }

    message.textContent = "Loading...";
    message.className = "message loading";
    pokemonCard.style.display = "none";

    try {
        const response = await fetch(API_URL + pokemonNameInput);

        if (!response.ok) {
            throw new Error("Pokémon not found.");
        }

        const data = await response.json();

        showPokemon(data);

        message.textContent = "";
        message.className = "message";

    } catch (error) {
        message.textContent = "Sorry, Pokémon not found. Please try another name.";
        message.className = "message error";
        console.error(error);
    }
}

function showPokemon(data) {
    pokemonCard.style.display = "block";

    pokemonName.textContent = data.name;
    pokemonId.textContent = "#" + String(data.id).padStart(4, "0");

    pokemonImage.src = data.sprites.other["official-artwork"].front_default
        || data.sprites.front_default;
    pokemonImage.alt = data.name;

    height.textContent = (data.height / 10) + " m";
    weight.textContent = (data.weight / 10) + " kg";

    types.innerHTML = "";

    data.types.forEach(function(typeData) {
        const type = document.createElement("span");
        type.className = "type";
        type.textContent = typeData.type.name;
        type.style.background = getTypeColor(typeData.type.name);
        types.appendChild(type);
    });

    pokemonCard.className = "pokemon-card type-" + data.types[0].type.name;

    stats.innerHTML = "";

    data.stats.forEach(function(statData) {
        const stat = document.createElement("div");
        stat.className = "stat";

        stat.innerHTML = `
            <span>${statData.stat.name}</span>
            <strong>${statData.base_stat}</strong>
        `;

        stats.appendChild(stat);
    });

    abilities.innerHTML = "";

    data.abilities.forEach(function(abilityData) {
        const ability = document.createElement("span");
        ability.className = "ability";
        ability.textContent = abilityData.ability.name;
        abilities.appendChild(ability);
    });
}

function getTypeColor(type) {
    const colors = {
        normal: "#a8a77a",
        fire: "#ff7f1e",
        water: "#8fa7dc",
        electric: "#f6d13d",
        grass: "#2eaf28",
        ice: "#96d9d6",
        fighting: "#c22e28",
        poison: "#dc77da",
        ground: "#e2bf65",
        flying: "#a98ff3",
        psychic: "#f95587",
        bug: "#a6b91a",
        rock: "#b6a136",
        ghost: "#735797",
        dragon: "#6f35fc",
        dark: "#705746",
        steel: "#b7b7ce",
        fairy: "#d685ad"
    };

    return colors[type] || "#777";
}

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    getPokemon(pokemonInput.value);
});

const quickButtons = document.querySelectorAll(".quick-btn");

quickButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const name = button.dataset.pokemon;
        pokemonInput.value = name;
        getPokemon(name);
    });
});

getPokemon("pikachu");
