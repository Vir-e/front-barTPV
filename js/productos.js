console.log('--- Productos.js cargado ---')

// VAR GLOBAL
BACKEND_URL = 'http://127.0.0.1:8000/bar/api/v1'

///// GET PRODUCTOS Y CARGA EN TABLA
async function cargarProductosTabla(){
    console.log("Ha entrado en la func cargarProductosTabla")
    try {
        const response = await fetch(BACKEND_URL + '/productos');
        const data = await response.json();

        // Acceder a los datos
        const productos = data;
        console.log("Data...", data);
        ///

        const $tabla = $(".table");

        $.each(productos, function(index, producto){
            const $fila = $("<tr>");
            $fila.append("<td>" + producto.code + "</td>");
            $fila.append("<td>" + producto.name + "</td>");
            $fila.append("<td>" + producto.price + "</td>");
            $fila.append("<td>" + producto.iva + "</td>");
            $fila.append("<td>" + producto.stock + "</td>");
            $fila.append('<td id="img-edit"> <img id="i-edit" class="icon-cell" src="/img/lapiz.png" width="15" height="15" /></td>')
            $fila.append('<td id="img-delete"> <img id="i-delete" class="icon-cell" src="/img/basura.png" width="15" height="15" /></td>')

            $tabla.append($fila)
        });
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

// Carga el formulario con los datos (para editar)
async function cargarDatosFormularioProducto(codigo_elemento){
    try {
        const response = await fetch('http://127.0.0.1:8000/bar/api/v1/producto/' + codigo_elemento);
        const data = await response.json();

        console.log("Data desde func async...", data);

        mostrarForm();
        $(".campo-codigo").css("display", "block");
        $("#form-container form").css("height", "330px");
        $(".title-form").text("Modificar Producto");
        $("#boton-guardar-form").css("display", "none");
        $("#boton-actualizar-form").css("display", "block");


        // Seleccionar los campos del formulario
        const codigoInput = document.getElementById('codigo-prod');
        const nombreInput = document.getElementById('nombre-producto');
        const precioInput = document.getElementById('precio');
        const ivaInput = document.getElementById('iva');
        const stockInput = document.getElementById('stock');


        // Asignar los valores de las variables a los campos del formulario
        codigoInput.value = data.code;
        nombreInput.value = data.name;
        precioInput.value = data.price;
        ivaInput.value = data.iva;
        stockInput.value = data.stock;


    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

// Envía datos del formulario al backend
function crearProducto(formData){
    console.log("Ha entrado en la func enviarDatosForm, el valor de formData es " + formData);
    console.log(formData.nombre);


    // Define el cuerpo de la solicitud
    const bodyData = new URLSearchParams();
    bodyData.append('nombre', formData.nombre);
    bodyData.append('precio', parseFloat(formData.precio));
    bodyData.append('iva', parseInt(formData.iva));
    bodyData.append('stock', parseInt(formData.stock));


    // Configura las opciones de la solicitud
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: bodyData // Pasamos el cuerpo de la solicitud
    };

    fetch('http://127.0.0.1:8000/bar/api/v1/nuevoproducto', requestOptions)
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

// Actualiza una mesa en la db 
function updateProducto(formData){
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

// Elimina un producto (delete)
function borrarProducto(cod_producto){
    console.log("Ha entrado en la func borrarProducto");

    const requestOptions = {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        },
    };

    fetch('http://127.0.0.1:8000/bar/api/v1/delete_producto?cod_producto=' + cod_producto, requestOptions)
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

        
        let $tabla = $(".table");
        let $filas = $tabla.find("tr");
    
        $filas.each(function(){
            $(this).find("td").remove();
        });
        setTimeout(function() {
            cargarProductosTabla();
        }, 200); // Retardo 
      

}