console.log('--- Reservas.js cargado ---')

// VAR GLOBAL
BACKEND_URL = 'http://127.0.0.1:8000/bar/api/v1'

///// GET PRODUCTOS Y CARGA EN TABLA
async function cargarReservasTabla(){
    console.log("Ha entrado en la func cargarReservasTabla")
    try {
        const response = await fetch(BACKEND_URL + '/reservas');
        const data = await response.json();

        // Acceder a los datos
        const reservas = data;
        console.log("Data...", data);
        ///



        // Convertir fechas a objetos Date
        reservas.forEach(objeto => {
            objeto.fecha = new Date(objeto.date);
        });
                
        // Ordenar la lista por fecha
        reservas.sort((a, b) => b.fecha - a.fecha);


        ///

        const $tabla = $(".table");

        $.each(reservas, function(index, reserva){
            const $fila = $("<tr>");
            $fila.append("<td>" + reserva.code + "</td>");
            $fila.append("<td>" + reserva.table_code + "</td>");
            $fila.append("<td>" + reserva.date + "</td>");
            $fila.append("<td>" + reserva.num_people + "</td>");
            $fila.append("<td>" + reserva.note + "</td>");
            $fila.append('<td id="img-edit"> <img id="i-edit" class="icon-cell" src="/img/lapiz.png" width="15" height="15" /></td>')
            $fila.append('<td id="img-delete"> <img id="i-delete" class="icon-cell" src="/img/basura.png" width="15" height="15" /></td>')

            $tabla.append($fila)
        });
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

// Carga el formulario con los datos (para editar)
async function cargarDatosFormularioReserva(codigo_elemento){
    try {
        const response = await fetch('http://127.0.0.1:8000/bar/api/v1/reserva/' + codigo_elemento);
        const data = await response.json();

        console.log("Data desde func async...", data);

        mostrarForm();
        $(".campo-codigo").css("display", "block");
        //$("#form-container form").css("height", "550px");
        $(".title-form").text("Modificar Reserva");
        $("#boton-guardar-form").css("display", "none");
        $("#boton-actualizar-form").css("display", "block");


        // Seleccionar los campos del formulario
        const codigoInput = document.getElementById('codigo-reserva');
        const mesaCodigoInput = document.getElementById('mesa-cod-reserv');
        const fechaInput = document.getElementById('fecha-reserva');
        const nComensalesInput = document.getElementById('n-comensales');
        const notaInput = document.getElementById('nota-reserva');


        // Asignar los valores de las variables a los campos del formulario
        codigoInput.value = data.code;
        mesaCodigoInput.value = data.table_code;
        fechaInput.value = data.date;
        nComensalesInput.value = data.num_people;
        notaInput.value = data.note;


    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

// Envía datos del formulario al backend
function crearReserva(formData){
    console.log("Ha entrado en la func enviarDatosForm, el valor de formData es " + formData);
    console.log(formData.nombre);


    // Define el cuerpo de la solicitud con el parámetro "nombre"
    const bodyData = new URLSearchParams();
    bodyData.append('mesa_cod', parseInt(formData.mesa_codigo));
    bodyData.append('fecha', formData.fecha);
    bodyData.append('num_comensales', parseInt(formData.n_comensales));
    bodyData.append('nota', formData.nota);


    // Configura las opciones de la solicitud
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: bodyData // Pasamos el cuerpo de la solicitud
    };

    fetch('http://127.0.0.1:8000/bar/api/v1/nuevareserva', requestOptions)
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

// Actualiza una reserva en la db 
function updateReserva(formData){
    console.log("Ha entrado en la func enviarDatosForm, el valor de formData es " + formData);
    console.log(formData.mesa_codigo);
    console.log(formData.fecha);


    // cuerpo de la solicitud como JSON
    const bodyData = {
        'code': formData.codigo,
        'table_code': formData.mesa_codigo,
        'date': formData.fecha,
        'num_people': formData.n_comensales,
        'note': formData.nota
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

    fetch('http://127.0.0.1:8000/bar/api/v1/actualizarreserva/' + formData.codigo, requestOptions)
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

// Elimina una reserva (delete)
function borrarReserva(cod_reserva){
    console.log("Ha entrado en la func borrarReserva");

    const requestOptions = {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        },
    };

    fetch('http://127.0.0.1:8000/bar/api/v1/delete_reserva?cod_reserva=' + cod_reserva, requestOptions)
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