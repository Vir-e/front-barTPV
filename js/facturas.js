console.log('--- Facturas.js cargado ---')

// VAR GLOBAL
BACKEND_URL = 'http://127.0.0.1:8000/bar/api/v1'

///// GET Y CARGA EN TABLA
async function cargarFacturasTabla(){
    console.log("Ha entrado en la func cargarFacturasTabla")
    try {
        const response = await fetch(BACKEND_URL + '/facturas');
        const data = await response.json();

        // Acceder a los datos
        const facturas = data;
        console.log("Data...", data);
        
        ///new code
        // Convertir fechas a objetos Date
        facturas.forEach(objeto => {
            objeto.fecha = new Date(objeto.date);
        });
                
        // Ordenar la lista por fecha
        facturas.sort((a, b) => b.fecha - a.fecha);


        //////
        

        const $tabla = $(".table");

        $.each(facturas, function(index, factura){
            const concepto0 = factura.concept[0];
            const concepto = factura.concept;
            console.log("NEW FACT");

            console.log("concept[0]", concepto0);
            console.log("concepto", concepto);

            let cadena_concepto = "";
            for (let i = 0; i < concepto.length; i++){
                cadena_concepto = cadena_concepto + "|" + concepto[i].nombre_producto + ":" + concepto[i].cantidad + "|"
            }
            console.log("CADENA_CONCEPTO...", cadena_concepto)

            
            
            const $fila = $("<tr>");
            $fila.append("<td>" + factura.code + "</td>");
            $fila.append("<td>" + factura.code_table + "</td>");
            $fila.append("<td>" + factura.total_gross_amount.toFixed(2) + "</td>");
            $fila.append("<td>" + factura.iva_applied.toFixed(2) + "</td>");
            $fila.append("<td>" + factura.total_invoice.toFixed(2) + "</td>");
            $fila.append("<td>" + factura.date + "</td>");
            $fila.append("<td>" + cadena_concepto + "</td>");
            //$fila.append('<td id="img-edit"> <img id="i-edit" class="icon-cell" src="/img/lapiz.png" width="15" height="15" /></td>')
            $fila.append('<td id="img-delete"> <img id="i-delete" class="icon-cell" src="/img/basura.png" width="15" height="15" /></td>')

            $tabla.append($fila)
        });
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

// Carga el formulario con los datos (para editar)
async function cargarDatosFormularioFactura(codigo_elemento){
    try {
        const response = await fetch('http://127.0.0.1:8000/bar/api/v1/factura/' + codigo_elemento);
        const data = await response.json();

        console.log("Data desde func async...", data);

        mostrarForm();
        $(".campo-codigo").css("display", "block");
        $("#form-container form").css("height", "330px");
        $(".title-form").text("Modificar Producto");
        $("#boton-guardar-form").css("display", "none");
        $("#boton-actualizar-form").css("display", "block");


        // Seleccionar los campos del formulario
        const codigoInput = document.getElementById('codigo-fact');
        const fechaInput = document.getElementById('date-fact');
        const codMesaInput = document.getElementById('cod-mesa-fact');
        const conceptoInput = document.getElementById('concept-fact');
        const brutoInput = document.getElementById('bruto');
        const ivaInput = document.getElementById('iva-fact');
        const totalInput = document.getElementById('total-fact');


        // Asignar los valores de las variables a los campos del formulario
        codigoInput.value = data.code;
        fechaInput.value = data.date;
        codMesaInput.value = data.code_table;
        conceptoInput.value = data.concept;
        brutoInput.value = data.total_gross_amount;
        ivaInput.value = data.iva_applied;
        totalInput.value = data.total_invoice;


    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

// Envía datos del formulario al backend
function crearFactura(formData){
    console.log("Ha entrado en la func CREARFACTURA, el valor de formData es " + formData);

    // Define el cuerpo de la solicitud
    const bodyData = new URLSearchParams();
    bodyData.append('cod_pedido', parseInt(formData.pedido_cod));


    // Configura las opciones de la solicitud
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: bodyData // Pasamos el cuerpo de la solicitud
    };
    console.log("Bodydata...". bodyData);

    fetch('http://127.0.0.1:8000/bar/api/v1/nuevafactura', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta recibida:', data);
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        });

}


// Elimina un producto (delete)
function borrarFactura(cod_factura){
    console.log("Ha entrado en la func borrarFactura");

    const requestOptions = {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        },
    };

    fetch('http://127.0.0.1:8000/bar/api/v1/delete_factura?cod_factura=' + cod_factura, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta recibida:', data);
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        });

}