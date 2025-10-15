const infoDiv = document.querySelector(".pkmn-info");
const form = document.getElementById("search-form");
const input = document.getElementById("input-search-pkmn");
const listView = document.querySelector(".display-list");
const mosaicView = document.querySelector(".display-mosaic");
const radioList = document.getElementById("list-view");
const radioMosaic = document.getElementById("mosaic-view");

form.addEventListener("submit", async e => {
    e.preventDefault();
    const query = input.value.trim().toLowerCase();
    if (!query) return;
    await fetchPokemon(query);
});

document.querySelectorAll(".btn-pkmn-link").forEach(btn => {
    btn.addEventListener("click", async () => {
        const pkmn = btn.dataset.pkmn;
        await fetchPokemon(pkmn);
    });
});

async function fetchPokemon(query) {
    infoDiv.innerHTML = "<p>Loading...</p>";
    infoDiv.style.textAlign = "center";
    try {
        const res = await fetch(`/pokemon/${query}`);
        if (!res.ok) throw new Error();
        const html = await res.text();
        infoDiv.innerHTML = html; // ← Insertamos el partial renderizado
    } catch {
        infoDiv.innerHTML = "<p>Pokémon not found ⚠️</p>";
    }
}

radioList.addEventListener("change", () => {
  listView.classList.remove("hidden");
  mosaicView.classList.add("hidden");
});

radioMosaic.addEventListener("change", () => {
  mosaicView.classList.remove("hidden");
  listView.classList.add("hidden");
});