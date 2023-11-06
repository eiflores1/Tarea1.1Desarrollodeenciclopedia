document.addEventListener("DOMContentLoaded", () => {
    // Clave de la API de OMDB
    const apiKey = "ac288045";
    
    // Obtiene elementos HTML por su ID
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");
    
    // Función para manejar la búsqueda cuando se envía el formulario
    searchForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value;
        const apiEndpoint = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;
        
        try {
            const response = await fetch(apiEndpoint);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            displaySearchResults(data.Search);
        } catch (error) {
            console.error("Hubo un problema con la solicitud:", error);
        }
    });
    
    // Función para mostrar los resultados de la búsqueda
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
                resultElement.addEventListener("click", () => {
                    // Implementa la lógica para mostrar detalles de la película
                });
                searchResults.appendChild(resultElement);
            });
        } else {
            searchResults.innerHTML = "No se encontraron resultados.";
        }
    }
});
