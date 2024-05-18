console.log('--- Pedidos.js cargado ---')

// VAR GLOBAL
BACKEND_URL = 'http://127.0.0.1:8000/bar/api/v1'

///// GET PEDIDOS Y CARGA EN TABLA
async function cargarPedidosTabla(){
    console.log("Ha entrado en la func cargarPedidosTabla")
    try {
        const response = await fetch(BACKEND_URL + '/pedidos');
        const data = await response.json();

        // Acceder a los datos
        const pedidos = data;
        console.log("Data...", data);
        ///

        const $tabla = $(".table");

        let $filas = $tabla.find("tr");
    
        $filas.each(function(){
            $(this).find("td").remove();
        });

        $.each(pedidos, function(index, pedido){

            const productos = pedido.productos;
            console.log("NEW PEDIDO");

            console.log("productos", productos);

            let cadena_productos = "";
            for (let i = 0; i < productos.length; i++){
                for(let clave in productos[i]){
                    cadena_productos = cadena_productos + "|" + clave + ":" + productos[i][clave] + "|"
                }
            }
            console.log("CADENA_CONCEPTO...", cadena_productos)





            const $fila = $("<tr>");
            $fila.append("<td>" + pedido.cod_pedido + "</td>");
            $fila.append("<td>" + pedido.cod_mesa + "</td>");
            $fila.append("<td>" + cadena_productos + "</td>");
            $fila.append('<td id="img-edit"> <img id="i-edit" class="icon-cell" src="/img/lapiz.png" width="15" height="15" /></td>')
            $fila.append('<td id="img-delete"> <img id="i-delete" class="icon-cell" src="/img/basura.png" width="15" height="15" /></td>')

            $tabla.append($fila)
        });
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

// Carga el formulario con los datos (para editar)
async function cargarDatosFormularioPedido(codigo_elemento){
    try {
        const response = await fetch('http://127.0.0.1:8000/bar/api/v1/pedido/' + codigo_elemento);
        const data = await response.json();

        console.log("Data desde func async...", data);

        mostrarForm();
        $(".campo-codigo").css("display", "block");
        $(".campo-productos-pedido").css("display", "block");
        $("#form-container form").css("height", "330px");
        $(".title-form").text("Modificar Pedido");
        $("#boton-guardar-form").css("display", "none");
        $("#boton-actualizar-form").css("display", "none");
        $("#botones-pedido").css("display", "block");


        // Seleccionar los campos del formulario
        const codigoInput = document.getElementById('codigo-pedido');
        const codMesaInput = document.getElementById('cod_mesa_pedido');



        // Asignar los valores de las variables a los campos del formulario
        codigoInput.value = data[0].cod_pedido;
        codMesaInput.value = data[0].cod_mesa;



    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

//Hace petición para agregar producto al pedido
function addProductoPedido(formData){

    console.log("Ha entrado en la func addProductoPedido, el valor de formData es " + formData);
    console.log(formData.cod_pedido);
    console.log(formData.cod_producto);
    console.log(formData.cantidad);


    // cuerpo de la solicitud
    const bodyData = new URLSearchParams();
    bodyData.append('cod_producto', parseInt(formData.cod_producto));
    bodyData.append('cantidad', parseInt(formData.cantidad));

    console.log(bodyData);

    // opciones de la solicitud
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: bodyData // Pasamos el cuerpo de la solicitud
    };

    fetch('http://127.0.0.1:8000/bar/api/v1/add_productos_pedido/' + formData.cod_pedido, requestOptions)
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

    $("#form-container").css("display", "none");

}

// Hace petición para eliminar producto del pedido
function delProductoPedido(formData){

    console.log("Ha entrado en la func delProductoPedido, el valor de formData es " + formData);
    console.log(formData.cod_pedido);
    console.log(formData.cod_producto);
    console.log(formData.cantidad);


    // cuerpo de la solicitud
    const bodyData = new URLSearchParams();
    bodyData.append('cod_producto', parseInt(formData.cod_producto));
    bodyData.append('cantidad', parseInt(formData.cantidad));

    console.log(bodyData);

    // opciones de la solicitud
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: bodyData // Pasamos el cuerpo de la solicitud
    };

    fetch('http://127.0.0.1:8000/bar/api/v1/delete_productos_pedido/' + formData.cod_pedido, requestOptions)
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

    $("#form-container").css("display", "none");

}


// Envía datos del formulario al backend
function crearPedido(formData){
    console.log("Ha entrado en la func enviarDatosFormPEDIDOS, el valor del CODE formData es " + formData.mesa_cod);

    console.log("El cod de la mesa del pedido es ", formData.mesa_cod);
    // Define el cuerpo de la solicitud
    const bodyData = new URLSearchParams();
    bodyData.append('mesa_cod', parseInt(formData.mesa_cod));

    // Configura las opciones de la solicitud
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: bodyData // Pasamos el cuerpo de la solicitud
    };

    fetch('http://127.0.0.1:8000/bar/api/v1/nuevopedido', requestOptions)
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
/*
// Actualiza un pedido en la db NO VALIDA
function updatePedido(formData){
    console.log("Ha entrado en la func enviarDatosForm, el valor de formData es " + formData);
    console.log(formData.codigo);
    console.log(formData.nombre);
    console.log(formData.precio);


    // cuerpo de la solicitud como JSON
    const bodyData = {
        'code': formData.codigo,
        'name': formData.nombre,
        'price': formData.precio,
        'iva': formData.iva,
        'stock': formData.stock
    };

    console.log(bodyData);

    // opciones de la solicitud
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData) // Pasamos el cuerpo de la solicitud
    };

    fetch('http://127.0.0.1:8000/bar/api/v1/actualizarproducto/' + formData.codigo, requestOptions)
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

    $("#form-container").css("display", "none");

}
*/

// Elimina un producto (delete)
function borrarPedido(cod_pedido){
    console.log("Ha entrado en la func borrarProducto");

    const requestOptions = {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        },
    };

    fetch('http://127.0.0.1:8000/bar/api/v1/delete_pedido?cod_pedido=' + cod_pedido, requestOptions)
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