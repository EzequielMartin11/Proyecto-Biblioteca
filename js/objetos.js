"use strict";

//Clase Usuario
class Usuario {
    constructor(idUsuario, nombre, apellidos, telefono) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.telefono = telefono;
    }


    toHTMLRow() {
        let sFila = "<tr>";
        sFila += "<td>" + this.idUsuario + "</td>";
        sFila += "<td>" + this.nombre + "</td>";
        sFila += "<td>" + this.apellidos + "</td>";
        sFila += "<td>" + this.telefono + "</td></tr>";

        return sFila;
    }
}

//Clase Prestamo

class Prestamo {
    constructor(iprestamo, Usuario, dtFechaInicio, dtFechaFin) {
        this.idPrestamo = iprestamo;
        this.articulo = [];
        this.usuario = Usuario
        this.fechaInicio = dtFechaInicio;
        this.fechaFin = dtFechaFin;
    }

    toHTMLRow() {
        let sFila = "<tr>";
        sFila += "<td>" + this.idPrestamo + "</td>";
        sFila += "<td>" + this.articulo + "</td>";
        sFila += "<td>" + this.usuario + "</td>";
        sFila += "<td>" + this.dfechaInicio + "</td>";
        sFila += "<td>" + this.dfechaFin + "</td></tr>";

        return sFila;
    }
}


// Clase Articulos
class Articulo {
    constructor(idArticulo, ititulo) {
        this.idArt = idArticulo;
        this.titulo = ititulo;
    }

    toHTMLRow() {
        let sFila = "<tr>";
        sFila += "<td>" + this.idArt + "</td>";
        sFila += "<td>" + this.titulo + "</td></tr>";

        return sFila;
    }
    buscarArticuloPorId() {

    }
}


// Clase Libro
class Libro extends Articulo {
    constructor(idArticulo, ititulo, iAutor, iPaginas) {
        super(idArticulo, ititulo);
        this.autor = iAutor;
        this.paginas = iPaginas;
    }
    toHTMLRow() {
        let sFila = "<tr>";
        sFila += "<td>" + this.idArt + "</td>";
        sFila += "<td>" + this.titulo + "</td>";
        sFila += "<td>" + this.autor + "</td>";
        sFila += "<td>" + this.paginas + "</td></tr>";

        return sFila;

    }

}

// Clase DVD
class DVD extends Articulo {
    constructor(idArticulo, ititulo, iFechaestreno, iSubtitulada) {
        super(idArticulo, ititulo);
        this.fechaestreno = iFechaestreno;
        this.subtitulada = iSubtitulada;

    }
    toHTMLRow() {
        let sFila = "<tr>";
        sFila += "<td>" + this.idArt + "</td>";
        sFila += "<td>" + this.titulo + "</td>";
        sFila += "<td>" + this.fechaestreno + "</td>";
        sFila += "<td>" + (this.subtitulada ? "SI" : "NO") + "</td></tr>";

        return sFila;
    }
}




// Clase Biblioteca
function Biblioteca() {
    this.usuarios = [];
    this.articulos = [];
    this.prestamos = [];
}


Biblioteca.prototype.optionsLibros = function () {

    let sOptions = '<option value="-1">Ninguno</option>';

    for (let articulo of this.articulos) {
        if (articulo.prestado == false) {
            sOptions += '<option value="' + articulo.idArticulo + '">' + articulo.nombre + '</option>';
        }
    }

    return sOptions;
}

Biblioteca.prototype.optionsDVD = function () {

    let sOptions = '<option value="-1">Ninguno</option>';

    for (let articulo of this.articulos) {
        if (articulo.prestado == false) {
            sOptions += '<option value="' + articulo.idArticulo + '">' + articulo.nombre + '</option>';
        }
    }

    return sOptions;
}


Biblioteca.prototype.altaUsuario = function (oUsuario) {
    if (this.verificaUsuario(oUsuario) == true) {
        this.usuarios.push(oUsuario);
        return 'Usuario dado de alta correctamente';
    }
    else {
        return 'Usuario existente';
    }
}

Biblioteca.prototype.verificaUsuario = function (oUsuario) {

    for (const usuario of this.usuarios) {
        if (usuario.idUsuario == oUsuario.idUsuario) {
            return false;
        }
    }

    return true;
}
Biblioteca.prototype.existeUsuario = function (idUsuario) {
    for (const usuario of this.usuarios) {
        if (usuario.idUsuario == idUsuario) {
            return true;
        }
    }
    return false;
}

Biblioteca.prototype.altaArticulo = function (oArticulo) {
    if (this.verificaArticulo(oArticulo) == true) {
        this.articulos.push(oArticulo);
        return 'Articulo dado de alta correctamente';
    }
    else {
        return 'Articulo existente';
    }
}

Biblioteca.prototype.verificaArticulo = function (oArticulo) {

    for (const articulo of this.articulos) {
        if (articulo.idArt == oArticulo.idArt) {
            return false;
        }
    }
    return true;
}
Biblioteca.prototype.altaPrestamo = function (oPrestamo) {
    if (this.verificaPrestamo(oPrestamo) == true) {
        if (this.verificaUsuarioPrestamo(oPrestamo) == true) {
            this.prestamos.push(oPrestamo);
            return 'Prestamo dado de alta correctamente';
        }
        else {
            return 'Usuario con prestamo en vigor';
        }
    }
    else {
        return 'Prestamo existente';
    }
}
Biblioteca.prototype.devolucionPrestamo = function (oPrestamo) {
    if (this.existePrestamo(oPrestamo) == true) {
        this.prestamos.splice(oPrestamo);
        return 'Prestamo devuelto correctamente';
    }
    else {
        return 'Prestamo no existente';
    }
}
Biblioteca.prototype.existePrestamo = function (oPrestamo) {
    for (const prestamo of this.prestamos) {
        if (prestamo.idPrestamo == oPrestamo.idPrestamo) {
            return true;
        }
    }

    return false;
}
Biblioteca.prototype.verificaPrestamo = function (oPrestamo) {

    for (const prestamo of this.prestamos) {
        if (prestamo.idPrestamo == oPrestamo.idPrestamo) {
                return false;
        }
    }

    return true;
}
Biblioteca.prototype.verificaUsuarioPrestamo = function (oPrestamo) {

    for (const prestamo of this.prestamos) {
        if (prestamo.usuario == oPrestamo.usuario) {
            return false;
        }
    }

    return true;
}

Biblioteca.prototype.listadoUsuarios = function () {
    let tablaUsuarios = "<table border='1'><tr><th>ID Usuario</th><th>Nombre</th><th>Apellidos</th><th>Teléfono</th></tr>";
    for (const usuario of this.usuarios) {
        tablaUsuarios += usuario.toHTMLRow();

    }
    tablaUsuarios += "</table>";
    return tablaUsuarios;
}


Biblioteca.prototype.listadoArticulos = function () {
    let tablaArticulos = "<table border='1'><tr><th>ID Articulo</th><th>titulo</th>";
    for (const articulo of this.articulos) {
        if (articulo instanceof Libro) {
            tablaArticulos += "<tr><td>" + articulo.idArt + "</td><td>" + articulo.titulo + "</td></tr>";
        }
        else {
            tablaArticulos += "<tr><td>" + articulo.idArt + "</td><td>" + articulo.titulo + "</td></tr>";
        }
    }
    tablaArticulos += "</table>";
    return tablaArticulos;
}

Biblioteca.prototype.listadoPrestamos = function () {
    //PARECIDO QUE LOS LISTADOS DEL EJERCICIO DE ARBOLES
}

Biblioteca.prototype.listadoTipoArticulo = function () {
    let tablaLibros = "<table border='1'><tr><th>ID Articulo</th><th>Titulo</th><th>Autor</th><th>Paginas</th></tr>";
    let tablaDVD = "<table border='1'><tr><th>ID Articulo</th><th>Titulo</th><th>Fecha de estreno</th><th>¿Subtitulada?</th></tr>";
    if (document.querySelector("#rdbtListarArticulos-0").checked){
        for (const articulo of this.articulos) {
            if (articulo instanceof Libro) {
                tablaLibros += "<tr><td>" + articulo.idArt + "</td><td>" + articulo.titulo + "</td><td>" + articulo.autor + "</td><td>" + articulo.paginas + "</td></tr>";
            }
        }
        tablaLibros += "</table>";
        return tablaLibros;
    }
    else {
        for (const articulo of this.articulos) {
            if (articulo instanceof DVD) {
                tablaDVD += "<tr><td>" + articulo.idArt + "</td><td>" + articulo.titulo + "</td><td>" + articulo.fechaestreno + "</td><td>" + articulo.subtitulada + "</td></tr>";
            }
        }
    }
    tablaDVD += "</table>";
    return tablaDVD;

}

Biblioteca.prototype.listadoPrestamos=function(){
    let fechaInicio = document.querySelector("#dFechaInicio").value;    
    let fechaFin = new Date(document.querySelector("#dFechaFin").value);
    let tablaPrestamos = "<table border='1'><tr><th>ID Prestamo</th><th>ID Usuario</th><th>Fecha Inicio</th><th>Fecha Fin</th><th>Artículos Prestados</th></tr>";

    for(const prestamo of this.prestamos){
        let fechaPrestamo = new Date(prestamo.fechaInicio);
        
        if((fechaPrestamo>=fechaInicio)&&(fechaPrestamo<=fechaFin))
        {
            tablaPrestamos += prestamo.toHTMLRow();
        }
        tablaPrestamos+="</table>";
        alert('No funciona pero bueno, hay salud que es lo importante');
        return tablaPrestamos;
        

    }
    
    
    
}




