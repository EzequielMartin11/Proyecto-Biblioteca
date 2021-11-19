//const { selectors } = require("sizzle");

// Variables globales
var oBiblioteca = new Biblioteca();

// Resgistro de eventos
document.querySelector("#mnuAltaArticulo").addEventListener("click", gestionFormularios);
document.querySelector("#mnuAltaUsuario").addEventListener("click", gestionFormularios);
document.querySelector("#mnuAltaPrestamo").addEventListener("click", gestionFormularios);
document.querySelector("#mnuListados").addEventListener("click", gestionFormularios);
document.querySelector("#btAceptarPrestamo").addEventListener("click", aceptarAltaPrestamo, false);
document.querySelector("#btDevolverPrestamo").addEventListener("click", aceptarDevolucion, false);
document.querySelector("#btUsuario").addEventListener("click", aceptarAltaUsuario, false);
document.querySelector("#btArticulos").addEventListener("click", aceptarAltaArticulo, false);
document.querySelector("#btListaUsuarios").addEventListener("click", obtenerLstadoUsuarios, false);
document.querySelector("#btListarArticulos").addEventListener("click", obtenerListadoArticulos, false);
//document.querySelector("#btListarLibros").addEventListener("click", obtenerListadoLibros, false);
document.querySelector("#btListarPorTipo").addEventListener("click", obtenerListadoPorTipo, false);
document.querySelector("#btListarPrestamos").addEventListener("click", obtenerListadoPrestamos, false);




// Gestion de formulario
function gestionFormularios(oEvento) {
    let oE = oEvento || window.event;

    if (oE.target.id == 'mnuAltaArticulo') {
        frmAltaArticulo.style.display = "block";
        frmAltaUsuario.style.display = "none";
        frmAltaPrestamo.style.display = "none";
        frmListados.style.display = "none";
    }
    if (oE.target.id == 'mnuAltaUsuario') {
        frmAltaUsuario.style.display = "block";
        frmAltaPrestamo.style.display = "none";
        frmAltaArticulo.style.display = "none";
        frmListados.style.display = "none";
    }
    if (oE.target.id == 'mnuAltaPrestamo') {
        // ocultarFormularios();

        frmAltaPrestamo.style.display = "block";
        frmAltaUsuario.style.display = "none";
        frmAltaArticulo.style.display = "none";
        frmListados.style.display = "none";

        let selecl1 = document.getElementById("lstLibros1");
        selecl1.innerHTML = '<option id="valor0" value="Ninguno" selected="selected">Ninguno</option>';
        let selecl2 = document.getElementById("lstLibros2");
        selecl2.innerHTML = '<option id="valor0" value="Ninguno" selected="selected">Ninguno</option>';
        let selecdvd1 = document.getElementById("lstDVD1");
        selecdvd1.innerHTML = '<option id="valor0" value="Ninguno" selected="selected">Ninguno</option>';
        let selecdvd2 = document.getElementById("lstDVD2");
        selecdvd2.innerHTML = '<option id="valor0" value="Ninguno" selected="selected">Ninguno</option>';

        for (let articuloindef of oBiblioteca.articulos) {
            if (articuloindef instanceof Libro) {
                
                selecl1.innerHTML += "<option value='" + articuloindef.idArticulo + "' > " + articuloindef.titulo + "</option > ";
                selecl2.innerHTML += "<option value='" + articuloindef.idArticulo + "' > " + articuloindef.titulo + "</option > ";
            }
            if (articuloindef instanceof DVD) {
                
                selecdvd1.innerHTML += "<option value='" + articuloindef.idArticulo + "' > " + articuloindef.titulo + "</option > ";
                selecdvd2.innerHTML += "<option value='" + articuloindef.idArticulo + "' > " + articuloindef.titulo + "</option > ";
            }
        }

        let input = document.getElementById("iFechaInicio");
        let now = new Date();

        let dia = now.getDate();
        let mes = now.getMonth() +1;

        let hoy = now.getFullYear() + "/" + mes + "/" + dia;

        input.value = hoy;
        return input;

        
    }
    if (oE.target.id == 'mnuListados') {
        frmAltaPrestamo.style.display = "none";
        frmAltaUsuario.style.display = "none";
        frmAltaArticulo.style.display = "none";
        frmListados.style.display = "block";
    }
    
   

    
}

function aceptarAltaPrestamo() {

    if (validarAltaPrestamo()) {
        // Construir un objeto prestamo
        let idPrestamo = parseInt(frmAltaPrestamo.idPrestamo.value.trim());
        let oArticulo = [];
        
        if (parseInt(frmAltaPrestamo.lstLibros1.value.trim()) != -1) {
            oArticulo.push(oBiblioteca.buscarArticuloPorId(parseInt(frmAltaPrestamo.lstLibros1.value.trim())));
        }
        
        if (parseInt(frmAltaPrestamo.lstLibros2.value.trim()) != -1) {
            oArticulo.push(oBiblioteca.buscarArticuloPorId(parseInt(frmAltaPrestamo.lstLibros2.value.trim())));
        }

        if (parseInt(frmAltaPrestamo.lstDVD1.value.trim()) != -1) {
            oArticulo.push(oBiblioteca.buscarArticuloPorId(parseInt(frmAltaPrestamo.lstDVD1.value.trim())));
        }
        if (parseInt(frmAltaPrestamo.lstDVD2.value.trim()) != -1) {
            oArticulo.push(oBiblioteca.buscarArticuloPorId(parseInt(frmAltaPrestamo.lstDVD2.value.trim())));
        }

        // Usuario
        let idUsuario = parseInt(frmAltaPrestamo.idUsuario.value.trim());

        let oUsuario = oBiblioteca.buscarUsuario(idUsuario);

        // Fechas 
        let dtFechaInicio = new Date(frmPrestamo.txtFechaInicio.value);
        let dtFechaFin = new Date(frmPrestamo.txtFechaInicio.value);

        // Construyo el objeto
        let oPrestamo = new Prestamo(idPrestamo, oArticulos, oUsuario, dtFechaInicio, dtFechaFin);

        // Llamar al método de Biblioteca --> altaPrestamo

        sResultado = oBiblioteca.altaPrestamo(oPrestamo);

    }

}

function validarAltaPrestamo() {
    let idPrestamo = parseInt(frmAltaPrestamo.idPrestamo.value.trim());
    let usuario = frmAltaPrestamo.idUsuario.value.trim();
    let articulos = [];
    let libro1 = frmAltaPrestamo.lstLibros1.value.trim();
    let libro2 = frmAltaPrestamo.lstLibros2.value.trim();
    let DVD1 = frmAltaPrestamo.lstDVD1.value.trim();
    let DVD2 = frmAltaPrestamo.lstDVD2.value.trim();
    let fechaInicio = new Date(frmAltaPrestamo.iFechaInicio.value.trim());
    let fechaFin = new Date(frmAltaPrestamo.iFechaFin.value.trim());
    let oPrestamo;
    

    if ((isNaN(idPrestamo) || fechaInicio.length == 0 || fechaFin.length == 0 || usuario.length == 0) || (libro1 == "Ninguno" && libro2 == "Ninguno" && DVD1 == "Ninguno" && DVD2 == "Ninguno")) {
            alert("Faltan datos por rellenar");
        
    }
    else {
   if(oBiblioteca.existeUsuario(usuario)){
            oPrestamo = new Prestamo(idPrestamo, usuario, fechaInicio, fechaFin);
            alert(oBiblioteca.altaPrestamo(oPrestamo)); 
            
        }
        else{
            alert('Usuario no registrado');
        }
       
 
    }
}

//aceptar Devolucion
function aceptarDevolucion() {
    let idPrestamo = parseInt(frmAltaPrestamo.idPrestamo.value.trim());
    let usuario = frmAltaPrestamo.idUsuario.value.trim();
    let articulos = [];
    let libro1 = frmAltaPrestamo.lstLibros1.value.trim();
    let libro2 = frmAltaPrestamo.lstLibros2.value.trim();
    let DVD1 = frmAltaPrestamo.lstDVD1.value.trim();
    let DVD2 = frmAltaPrestamo.lstDVD2.value.trim();
    let fechaInicio = frmAltaPrestamo.iFechaInicio.value.trim();
    let fechaFin = frmAltaPrestamo.iFechaFin.value.trim();
    let oPrestamo;

    if ((isNaN(idPrestamo) || fechaInicio.length == 0 || fechaFin.length == 0 || usuario.length == 0) || (libro1 == "Ninguno" && libro2 == "Ninguno" && DVD1 == "Ninguno" && DVD2 == "Ninguno")) {
        alert("Faltan datos por rellenar");

    }
    else {
        if (oBiblioteca.existeUsuario(usuario)) {
            oPrestamo = new Prestamo(idPrestamo, usuario, fechaInicio, fechaFin);
            alert(oBiblioteca.devolucionPrestamo(oPrestamo));

        }
        else {
            alert('Usuario no registrado');
        }


    }
}


// aceptarAltaUsuario
function aceptarAltaUsuario() {
    let idUsuario = parseInt(frmAltaUsuario.sidUsuario.value.trim());
    let nombre = frmAltaUsuario.snombreUsuario.value.trim();
    let apellidos = frmAltaUsuario.sApellido.value.trim();
    let telefono = parseInt(frmAltaUsuario.iTelefono.value.trim());
    let oUsuario;

    if (isNaN(idUsuario) || isNaN(telefono) || nombre.length == 0 || apellidos.length == 0) {
        alert("Faltan datos por rellenar");
    } else {
        oUsuario = new Usuario(idUsuario, nombre, apellidos, telefono);
        alert(oBiblioteca.altaUsuario(oUsuario));
    }

}
// aceptarAltaArticulo
function aceptarAltaArticulo() {
    let idArticulo = parseInt(frmAltaArticulo.idArticulo.value.trim());
    let titulo = frmAltaArticulo.ititulo.value.trim();
    let autor = frmAltaArticulo.iAutor.value.trim();
    let paginas = parseInt(frmAltaArticulo.iPaginas.value.trim());
    let fechaestreno = frmAltaArticulo.iFechaEstreno.value.trim();
    let oArticulo;
    if (document.querySelector("#rbTipoArticulo-0").checked) {
        if (isNaN(idArticulo) || isNaN(paginas) || titulo.length == 0 || autor.length == 0) {
            alert("Faltan datos por rellenar");
        }
        else {
            oArticulo = new Libro(idArticulo, titulo, autor, paginas);
            alert(oBiblioteca.altaArticulo(oArticulo));
        }

    }
    else {
        if (isNaN(idArticulo) || fechaestreno.length==0) {
            alert("Faltan datos por rellenar");
        }
        else {

            let subtitulada = document.querySelector("#rbSubtitulada-0").checked;
            oArticulo = new DVD(idArticulo, titulo, fechaestreno, subtitulada);

            alert(oBiblioteca.altaArticulo(oArticulo));

        }
    }
}

function obtenerLstadoUsuarios(){
    document.getElementById("listadoUsuarios").innerHTML = oBiblioteca.listadoUsuarios();
}

function obtenerListadoArticulos(){
    document.getElementById("listadoArticulos").innerHTML = oBiblioteca.listadoArticulos();
}

function obtenerListadoPorTipo(){
    document.getElementById("mostrarPorTipo").innerHTML = oBiblioteca.listadoTipoArticulo();
    
}

function obtenerListadoPrestamos(){
    document.getElementById("listadoPrestamos").innerHTML = oBiblioteca.listadoPrestamos();
    
}


