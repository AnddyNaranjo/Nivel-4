$(document).ready(function () {
    let generos = [];

    // Cargar géneros primero
    $.ajax({
      url: "data/generos_pelis.json",
      method: "GET",
      dataType: "json",
      success: function (dataGeneros) {
        generos = dataGeneros;

        // Luego cargar películas
        $.ajax({
          url: "data/peliculas.json",
          method: "GET",
          dataType: "json",
          success: function (peliculas) {
            let html = "";
            peliculas.forEach(function (peli) {
              // Mapear IDs de géneros a nombres
              let nombresGeneros = peli.generos.map(id => {
                let genero = generos.find(g => g.id === id);
                return genero ? genero.nombre : "Desconocido";
              }).join(", ");

              // Verificar si la película está en estreno
              let fechaActual = new Date();
              let fechaEstreno = new Date(peli.estreno);
              let esEstreno = fechaActual < fechaEstreno;
              let precioMostrar = esEstreno ? peli.precios.estreno : peli.precios.normal;
              let etiquetaPrecio = esEstreno ? "Precio estreno" : "Precio normal";

              html += `
                <div class="col-md-4">
                  <div class="card h-100 shadow">
                    <img src="img/${peli.imagen}" class="card-img-top" alt="${peli.titulo}">
                    <div class="card-body">
                      <h5 class="card-title">${peli.titulo}</h5>
                      <p class="card-text"><strong>Género:</strong> ${nombresGeneros}</p>
                      <p class="card-text">${peli.sinopsis}</p>
                      <p class="card-text"><strong>Estreno:</strong> ${peli.estreno}</p>
                      <p class="card-text"><strong>${etiquetaPrecio}:</strong> $${precioMostrar}</p>
                      <a href="pages/detalle.html?id=${peli.id}" class="btn btn-primary">Ver más</a>
                    </div>
                  </div>
                </div>`;
            });
            $("#lista-peliculas").html(html);
          },
          error: function (xhr, status, error) {
            console.error("Error al cargar las películas:", error);
            $("#lista-peliculas").html(`
              <div class="col-12">
                <div class="alert alert-danger text-center" role="alert">
                  No se pudo cargar la lista de películas. Intenta nuevamente más tarde.
                </div>
              </div>
            `);
          }
        });
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar los géneros:", error);
        console.error("Status:", xhr.status);
        console.error("Response:", xhr.responseText);
      }
    });
  });
  