$(document).ready(function () {
  //localStorage.removeItem('bienvenidaMostrada');  
  // Alerta de bienvenida que aparece solo una vez
  if (!localStorage.getItem('bienvenidaMostrada')) {
    console.log('Mostrando alerta de bienvenida');
    alert('¡Bienvenido a CinePlus!');
    localStorage.setItem('bienvenidaMostrada', 'true');
  }

  let generos = [];
  const spinnerHtml = `
      <div class="col-12 text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="mt-3">Cargando películas...</p>
      </div>
    `;

    const mensaje_error = `
      <div class="col-12">
        <div class="alert alert-danger text-center" role="alert">
          No se pudo cargar la lista de películas. Intenta nuevamente más tarde.
        </div>
      </div>
    `;

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
            let nombresGeneros = peli.generos
              .map((id) => {
                let genero = generos.find((g) => g.id === id);
                return genero ? genero.nombre : "Desconocido";
              })
              .join(", ");

            // Verificar si la película está en estreno
            let fechaActual = new Date();
            let fechaEstreno = new Date(peli.estreno);
            let esEstreno = fechaActual < fechaEstreno;
            let precioMostrar = esEstreno
              ? peli.precios.estreno
              : peli.precios.normal;
            let etiquetaPrecio = esEstreno ? "Precio estreno" : "Precio normal";

            // Truncar sinopsis a máximo 20 palabras
            let palabrasSinopsis = peli.sinopsis.split(' ');
            let sinopsisTruncada = palabrasSinopsis.length > 20 ? palabrasSinopsis.slice(0, 20).join(' ') + '...' : peli.sinopsis;

            html += `
                <div class="col-md-4">
                  <div class="card h-100 shadow" style="display: none;">
                    <img src="img/${peli.imagen}" class="card-img-top" alt="${peli.titulo}">
                    <div class="card-body">
                      <h5 class="card-title">${peli.titulo}</h5>
                      <p class="card-text"><strong>Género:</strong> ${nombresGeneros}</p>
                      <p class="card-text">${sinopsisTruncada}</p>
                      <p class="card-text"><strong>Estreno:</strong> ${peli.estreno}</p>
                      <p class="card-text"><strong>${etiquetaPrecio}:</strong> $${precioMostrar}</p>
                      <button type="button" class="btn btn-outline-secondary me-2 ver-trailer-btn" data-trailer="${peli.trailer}" data-title="${peli.titulo}">Ver tráiler</button>
                      <a href="pages/detalle.html?id=${peli.id}" class="btn btn-primary">Ver más</a>
                    </div>
                  </div>
                </div>`;
          });
          setTimeout(() => {
            if (html) {
              $("#lista-peliculas").html(html);
              // Aplicar animación fadeIn a cada tarjeta con retraso escalonado
              $("#lista-peliculas .card").each(function(index) {
                $(this).delay(index * 200).fadeIn(500);
              });
            } else {
              $("#lista-peliculas").html(mensaje_error);
            }
          }, 5000); // Mostrar peliculas después de 5000ms
          $("#lista-peliculas").html(spinnerHtml);
        },
        error: function (xhr, status, error) {
          console.error("Error al cargar las películas:", error);
          $("#lista-peliculas").html(mensaje_error);
        },
      });
    },
    error: function (xhr, status, error) {
      console.error("Error al cargar los géneros:", error);
      console.error("Status:", xhr.status);
      console.error("Response:", xhr.responseText);
    },
  });

    $(document).on("click", ".ver-trailer-btn", function () {
      const trailerUrl = obtenerEmbedUrl($(this).data("trailer"));
      const titulo = $(this).data("title");
      $("#modal-trailer-title").text(`Tráiler: ${titulo}`);
      $("#modal-trailer-video").attr("src", trailerUrl);
      const modalElement = document.getElementById("modal-trailer");
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    });

    $("#modal-trailer").on("hidden.bs.modal", function () {
      $("#modal-trailer-video").attr("src", "");
    });

    function obtenerEmbedUrl(url) {
      if (typeof url !== "string") {
        return url;
      }
      if (url.includes("youtube.com/watch?v=")) {
        return url.replace("watch?v=", "embed/");
      }
      if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1].split(/[?&]/)[0];
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return url;
    }
  });
