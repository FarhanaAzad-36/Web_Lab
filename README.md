# Pokémon API Card

## Project
A simple Pokémon search application using the public PokeAPI.

## API Endpoint
https://pokeapi.co/api/v2/pokemon/{name}

The `{name}` part is replaced with the Pokémon name entered by the user.

## API Fields Used
- `name` - Pokémon name
- `id` - Pokémon ID
- `sprites.other.official-artwork.front_default` - official artwork
- `types` - Pokémon types
- `height` - height
- `weight` - weight
- `stats` - all six base stats
- `abilities` - abilities

## Main JavaScript Concepts
- `fetch()`
- `async` / `await`
- `response.ok`
- `response.json()`
- DOM manipulation
- Loading and error handling

## Files
- `index.html`
- `style.css`
- `script.js`

## How to Run
Open `index.html` in a browser with an internet connection.
Search for a Pokémon such as Pikachu, Charizard, Bulbasaur, or Aipom.
