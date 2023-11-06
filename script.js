document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "ac288045";

    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");

    searchForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value;
        const apiEndpoint = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;

        try {
            const response = await fetch(apiEndpoint);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            displaySearchResults(data.Search);
        } catch (error) {
            console.error("Hubo un problema con la solicitud:", error);
            console.error("Estado de respuesta:", response.status);
            console.error("Texto de estado de respuesta:", response.statusText);
        }
    });

    function displaySearchResults(results) {
        if (results && results.length > 0) {
            searchResults.innerHTML = "";
            results.forEach((result) => {
                const resultElement = document.createElement("div");
                resultElement.classList.add("result-item");
                resultElement.innerHTML = `
                    <h2>${result.Title}</h2>
                    <p>Año: ${result.Year}</p>
                `;
                searchResults.appendChild(resultElement);
            });
        } else {
            searchResults.innerHTML = "No se encontraron resultados.";
        }
    }
});