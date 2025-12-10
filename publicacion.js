document.addEventListener('DOMContentLoaded', function () {
        const grilla = document.getElementById('grilla');
        fetch('http://localhost:3000/articulos')
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Error en la respuesta');
                }
                return resp.json();
            })
            .then(data => {
                data.forEach(articulo => {
                    let caja = document.createElement("div");
                    caja.className = "caja";

                    let titulo = document.createElement('h2');
                    titulo.innerHTML = `${articulo.titulo}`;
                    caja.appendChild(titulo);
                    titulo.className = "titulo";
                    
                    let imagen = document.createElement("img");
                    imagen.src = "imagen/" + `${articulo.imagen}`;
                    imagen.className = 'imagen';
                    caja.appendChild(imagen);

                    let desc = document.createElement('p');
                    desc.innerHTML = `${articulo.descripcion}`;
                    caja.appendChild(desc);
                    desc.className = "descripcion";

                    grilla.appendChild(caja);
                });
            })
            .catch(error => {
                grilla.innerHTML = 'Error al cargar los datos: ' + error;
                console.error('Error al obtener los datos:', error);
            });
    });