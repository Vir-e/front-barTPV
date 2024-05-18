console.log("--- Utils cargado ---")

// new code
function cambiarTituloyColumnasSeccion(seccion){
    console.log("He entrado en cambiar titulo y columnas")
    
    
    let $tabla = $(".table");
    let $filas = $tabla.find("tr");

    $filas.each(function(){
        $(this).find("td").remove();
        $(this).find("th").remove();
    });

    let columnas = []
    if (seccion == SeccionesType.MESAS){
        console.log("La seccion es..." + seccion)
        $(".mesas-content > .title-section > div").text("Mesas");

        // new code
        $("#form-mesas").css("display", "block");
        $("#form-pedidos").css("display", "none");
        $("#form-productos").css("display", "none");
        $("#form-reservas").css("display", "none");
        $("#form-facturas").css("display", "none");

        $("#form-container form").css("height", "190px");

        //
        columnas = [
            {nomcolumn: "Codigo", clase: "column"},
            {nomcolumn: "Nombre", clase: "column"},
            {nomcolumn: "Estado", clase: "column"},
            {nomcolumn: "", clase: "column-img"},
            {nomcolumn: "", clase: "column-img"},
        ]
    }
    else if (seccion == SeccionesType.PRODUCTOS){
        console.log("La seccion es..." + seccion)
        $(".mesas-content > .title-section > div").text("Productos");
        // new code
        $("#form-mesas").css("display", "none");
        $("#form-reservas").css("display", "none");
        $("#form-pedidos").css("display", "none");
        $("#form-facturas").css("display", "none");
        $("#form-productos").css("display", "block");
        $("#form-container form").css("height", "300px");
        //
        columnas = [
            {nomcolumn: "Codigo", clase: "column"},
            {nomcolumn: "Nombre", clase: "column"},
            {nomcolumn: "Precio", clase: "column"},
            {nomcolumn: "Iva", clase: "column"},
            {nomcolumn: "Stock", clase: "column"},
            {nomcolumn: "", clase: "column-img"},
            {nomcolumn: "", clase: "column-img"},
        ]
    }
    else if (seccion == SeccionesType.RESERVAS){
        console.log("La seccion es..." + seccion)
        $(".mesas-content > .title-section > div").text("Reservas");

        $("#form-mesas").css("display", "none");
        $("#form-productos").css("display", "none");
        $("#form-pedidos").css("display", "none");
        $("#form-facturas").css("display", "none");
        $("#form-reservas").css("display", "block");

        columnas = [
            {nomcolumn: "Codigo", clase: "column"},
            {nomcolumn: "Codigo mesa", clase: "column"},
            {nomcolumn: "Fecha", clase: "column"},
            {nomcolumn: "Num.comensales", clase: "column"},
            {nomcolumn: "Nota", clase: "column"},
            {nomcolumn: "", clase: "column-img"},
            {nomcolumn: "", clase: "column-img"},
        ]
    }
    else if (seccion == SeccionesType.PEDIDOS){
        console.log("La seccion es..." + seccion)
        $(".mesas-content > .title-section > div").text("Pedidos");
        $("#form-mesas").css("display", "none");
        $("#form-productos").css("display", "none");
        $("#form-reservas").css("display", "none");
        $("#form-facturas").css("display", "none");
        $("#form-pedidos").css("display", "block");


        columnas = [
            {nomcolumn: "Codigo", clase: "column"},
            {nomcolumn: "Codigo mesa", clase: "column"},
            {nomcolumn: "Productos", clase: "column"},
            {nomcolumn: "", clase: "column-img"},
            {nomcolumn: "", clase: "column-img"},
        ]
    }
    else if (seccion == SeccionesType.FACTURAS){
        console.log("La seccion es..." + seccion)
        $(".mesas-content > .title-section > div").text("Facturas");
        $("#form-mesas").css("display", "none");
        $("#form-productos").css("display", "none");
        $("#form-reservas").css("display", "none");
        $("#form-pedidos").css("display", "none");
        $("#form-facturas").css("display", "block");

        columnas = [
            {nomcolumn: "Codigo", clase: "column"},
            {nomcolumn: "Codigo mesa", clase: "column"},
            {nomcolumn: "Importe bruto", clase: "column"},
            {nomcolumn: "Iva aplic.", clase: "column"},
            {nomcolumn: "Importe neto", clase: "column"},
            {nomcolumn: "Fecha", clase: "column"},
            {nomcolumn: "Concepto", clase: "column"},
            {nomcolumn: "", clase: "column-img"},
            {nomcolumn: "", clase: "column-img"},
        ]
    }

    console.log("Columnas...", columnas)
    
    columnas.forEach(function(columna){
        console.log("Entro en el foreach columna")
        var $columna = $( "<th>" ).addClass( columna.clase ).text( columna.nomcolumn );
        $filas.eq(0).append( $columna );
      });
    


}


// Carga el formulario vacío
function mostrarForm(){
    $("#form-container").css("display", "block");
    $(".campo-codigo").css("display", "none");
}
  
// Funcionalidad del buscador
function buscarFila(cadena_buscador){
    var listaMesas = [];

    $("table tbody tr").each(function(){
        $(this).removeClass("fila-coincidente"); // quitar la clase de todas las filas
    });

    $("table tbody tr").each(function(){
        var mesa = $(this).find("td:eq(1)").text();// capturamos el valor de la columna con indice1 para cada fila

        if(mesa.trim().toLowerCase() == cadena_buscador.trim().toLowerCase()){
            listaMesas.push(mesa);
            $(this).addClass("fila-coincidente"); // agregar clase a la fila coincidente
            return false;
        } else if (mesa.toLowerCase().includes(cadena_buscador.toLowerCase())){// comprobamos la coincidencia entre el valor del buscador y cada uno de los elem de la tabla
            listaMesas.push(mesa);
            $(this).addClass("fila-coincidente");
        }

    });

    console.log(listaMesas);
}

// Enumerado secciones
const SeccionesType = {
    MESAS: 'Mesas',
    PRODUCTOS: 'Productos',
    RESERVAS: 'Reservas',
    PEDIDOS: 'Pedidos',
    FACTURAS: 'Facturas'
}

// Variable Global
API_ENTIDAD = {
    consultarTabla: cargarMesasTabla,
    consultarElemento: cargarDatosFormularioMesa,
    crear: crearMesa,
    actualizar: updateMesa,
    borrar: borrarMesa
}
// Window.API_ENTIDAD = {} // con objeto window

// TODO Manejador cambio pestaña
function cambiarSeccion(seccion) {
    //$(".home-content>div").css('display', 'none') // descomentar para replicar html
    // Cambio contenido
    //$(`.${seccion}-content`).css('display', 'block'); // descomentar para replicar html
    cambiarTituloyColumnasSeccion(seccion)

    // Cambio la api de la entidad
    API_ENTIDAD = cargarApi(seccion)
    // Me traigo la tabla
    console.log('----API cambio pestaña', API_ENTIDAD)

    API_ENTIDAD.consultarTabla()

}

function cargarApi(seccion) {
    if (seccion === SeccionesType.MESAS) {
        console.log("Ha entrado en cargarAPi - Mesas")
        return {
            consultarTabla: cargarMesasTabla,
            consultarElemento: cargarDatosFormularioMesa,
            crear: crearMesa,
            actualizar: updateMesa,
            borrar: borrarMesa
        }
    } else if (seccion === SeccionesType.PRODUCTOS) {
        console.log("Ha entrado en cargarAPi - Productos")
        return {
            consultarTabla: cargarProductosTabla,
            consultarElemento: cargarDatosFormularioProducto,
            crear: crearProducto,
            actualizar: updateProducto,
            borrar: borrarProducto
        } 
    } else if (seccion === SeccionesType.RESERVAS) {
        console.log("Ha entrado en cargarAPi - Reservas")
        return {
            consultarTabla: cargarReservasTabla,
            consultarElemento: cargarDatosFormularioReserva,
            crear: crearReserva,
            actualizar: updateReserva,
            borrar: borrarReserva
        } 
    } else if (seccion === SeccionesType.PEDIDOS) {
        console.log("Ha entrado en cargarAPi - Pedidos")
        return {
            consultarTabla: cargarPedidosTabla,
            consultarElemento: cargarDatosFormularioPedido,
            crear: crearPedido,
            actualizar: null,
            borrar: borrarPedido
        } 
    }
    else if (seccion === SeccionesType.FACTURAS) {
        console.log("Ha entrado en cargarAPi - Facturas")
        return {
            consultarTabla: cargarFacturasTabla,
            consultarElemento: cargarDatosFormularioPedido,
            crear: crearFactura,
            actualizar: null,
            borrar: borrarFactura
        } 
    }
    return {};
}