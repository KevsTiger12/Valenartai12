// importar módulo express
const express = require("express");

// crear un objeto servidor
const servidor = express();

// activar el servidor en el puerto 3000
// método listen: tiene 2 parámetros: un puerto y una función para dar un mensaje
servidor.listen(3000,
    function () {
        console.log("Servidor activo");
    }
);

// Definir que entienda formato json y html 
servidor.use(express.json());
servidor.use(express.urlencoded({ extended: true }));

// para permitir acceso desde otros puertos
const cors = require("cors");
servidor.use(cors());

// Configurar el servidor para servir archivos estáticos
servidor.use(express.static(__dirname));

// importar módulo MySQL2 para poder conectar con base web (aiven)
const mysql = require("mysql2");

// crear la conexión a MySQL
var conexion = mysql.createConnection({
    host: "mysql-3292d213-valenartai12.d.aivencloud.com",
    user: "avnadmin",
    password: "AVNS_Uc5T2GoH46mlhKANgpx",
    database: "valenartai12",   
    port: 10786
});

// avisar si hay error
conexion.connect(
    function (err) {
        if (err)
            console.log(err.message);
        else
            console.log("Conectado!");
    }
);

//ESCRIBIR UN POST PARA CADA REQUERIMIENTO


// responder al post del boton, la URL es /ingresar
// el método POST tiene 2 parámetros: la URL y la función que atiende la solicitud
servidor.post("/ingresar",
    function (req, respuesta) {
        // leer el body completo
        const datos = req.body;

        // leer datos del formulario usando la propiedad "name"
        let username = datos.username;
        let password = datos.password;

        // escribir un query
        const sql = "SELECT * FROM usuario WHERE username=? and password=?;";

        // ejecutar el query con los datos leídos como parámetros
        conexion.query(sql, [username, password],
            function (err, lista) {
                if (err)
                    respuesta.send(err.message);
                else
                    if (lista.length == 1) {
                        respuesta.redirect("/inicio.html");
                    }
                    else {
                        respuesta.send("Usuario o contraseña incorrectos");
                    }
            }
        );
    }
)

servidor.post("/listar",
    function (req, respuesta) {
        // escribir un query
        const sql = "SELECT * FROM *******";

        // ejecutar el query con parámetros
        conexion.query(sql,
            function (err, lista) {
                if (err)
                    respuesta.send(err.message);
                else
                    respuesta.send(lista);
            }
        );
    }
)

servidor.post("/guardar",
    function (req, respuesta) {
        // escribir el query para insertar
        const sql = "insert into usuario (username,Nombre,apellido,email,password) values (?,?,?,?,?)";

        // leer datos del formulario
        let {username, Nombre, apellido, email, password } = req.body;

        // ejecutar el query con esos parámetros
        conexion.query(sql, [username, Nombre, apellido, email, password],
            function (error) {
                if (error)
                    respuesta.send(error.message);
                else
                    respuesta.redirect('/cuenta.html');
            });

    }
)

servidor.get("/articulos",
    function (req, respuesta) {
        const sql = "SELECT * FROM publicacion";

        conexion.query(sql,
            function (err, lista) {
                if (err)
                    respuesta.send(err.message)
                else
                    respuesta.send(lista);
            }
        )
    }
)