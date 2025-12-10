document.addEventListener('DOMContentLoaded', function () {
    const grilla = document.getElementById('grilla');
    fetch('https://valenartai12.onrender.com/articulos', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
    }

    )
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Error en la respuesta');
            }
            return resp.json();
        })
        .then(data => {
            data.forEach(articulo => {

                // Agregar todos los elementos dentro del enlace
                let titulo = document.createElement('h2');
                titulo.textContent = articulo.titulo;
                titulo.className = "titulo";
                caja.appendChild(titulo);

                let imagen = document.createElement("img");
                imagen.src = "imagen/" + articulo.imagen;
                imagen.className = 'imagen';
                caja.appendChild(imagen);

                let desc = document.createElement('p');
                desc.textContent = articulo.description;
                desc.className = "description";
                caja.appendChild(desc);

                // Agregar la caja al enlace, y el enlace a la grilla
                grilla.appendChild(caja);
            });
        })
        .catch(error => {
            grilla.innerHTML = 'Error al cargar los datos: ' + error;
            console.error('Error al obtener los datos:', error);
        });
});

