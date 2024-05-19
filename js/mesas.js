console.log('--- Mesas.js cargado ---')

// VAR GLOBAL
BACKEND_URL = 'http://127.0.0.1:8000/bar/api/v1'

///// GET MESAS Y CARGA EN TABLA
async function cargarMesasTabla(){
    try {
        const response = await fetch(BACKEND_URL + '/mesas');
        const data = await response.json();

        // Acceder a los datos
        const mesas = data;
        console.log("Data...", data);
        ///

        const $tabla = $(".table");

    
        //////////
        $.each(mesas, function(index, mesa){
            const $fila = $("<tr>");
            $fila.append("<td>" + mesa.code + "</td>");
            $fila.append("<td>" + mesa.name + "</td>");
            $fila.append("<td>" + mesa.state + "</td>");
            $fila.append('<td id="img-edit"> <img id="i-edit" class="icon-cell" src="/img/lapiz.png" width="15" height="15" /></td>')
            $fila.append('<td id="img-delete"> <img id="i-delete" class="icon-cell" src="/img/basura.png" width="15" height="15" /></td>')

            $tabla.append($fila)
        });
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

// Carga el formulario con los datos (para editar)
async function cargarDatosFormularioMesa(codigo_elemento){
    try {
        const response = await fetch('http://127.0.0.1:8000/bar/api/v1/mesa/' + codigo_elemento);
        const data = await response.json();

        // Accede a los datos específicos que deseas mostrar (por ejemplo, trabajadores)
        //const mesas = data;
        console.log("Data desde func async...", data);

        mostrarForm();
        $(".campo-codigo").css("display", "block");
        $("#form-container form").css("height", "250px");
        $("#form-mesas .title-form").text("Modificar Mesa");
        $("#boton-guardar-form").css("display", "none");
        $("#boton-actualizar-form").css("display", "block");

        // Seleccionar los campos del formulario
        const codigoInput = document.getElementById('codigo');
        const nombreInput = document.getElementById('nombre');
        const estadoInput = document.getElementById('estado');

        // Asignar los valores de las variables a los campos del formulario
        codigoInput.value = data.code;
        nombreInput.value = data.name;
        estadoInput.value = data.state;

    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

// Envía datos del formulario al backend
function crearMesa(formData){
    console.log("Ha entrado en la func enviarDatosForm, el valor de formData es " + formData);
    console.log(formData.nombre);


    // Define el cuerpo de la solicitud con el parámetro "nombre"
    const bodyData = new URLSearchParams();
    bodyData.append('nombre', formData.nombre);

    // Configura las opciones de la solicitud
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: bodyData // Pasamos el cuerpo de la solicitud
    };

    fetch('http://127.0.0.1:8000/bar/api/v1/nuevamesa', requestOptions)
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
function updateMesa(formData){
    console.log("Ha entrado en la func enviarDatosForm, el valor de formData es " + formData);
    console.log(formData.codigo);
    console.log(formData.nombre);
    console.log(formData.estado);


    // cuerpo de la solicitud como JSON
    const bodyData = {
        'code': formData.codigo,
        'name': formData.nombre,
        'state': formData.estado
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

    //console.log("fetch...    " + 'http://127.0.0.1:8000/bar/api/v1/actualizarmesa/' + formData.codigo, requestOptions )
    fetch('http://127.0.0.1:8000/bar/api/v1/actualizarmesa/' + formData.codigo, requestOptions)
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

// Elimina una mesa (delete)
function borrarMesa(cod_mesa){
    console.log("Ha entrado en la func borrarMesa");

    const requestOptions = {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        },
    };

    fetch('http://127.0.0.1:8000/bar/api/v1/delete_mesa?cod_mesa=' + cod_mesa, requestOptions)
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