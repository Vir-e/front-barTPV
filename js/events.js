console.log("--- Events cargado ---")

// Var global
seccion = "Mesas"

function registrarEventos() {
  //// SIDEBAR

  // Manejador click en el menu navegador
  $(".item-nav").click(function(element){
    console.log("Hice click ", element.target.innerHTML);
    seccionSeleccionada = element.target.innerHTML;
    seccion = seccionSeleccionada;
    cambiarSeccion(seccionSeleccionada);
  });

  //// Menu Buscador

  // Manejador click en el botón de añadir
  $("img").click(function(element){
    console.log("Hice click ", element.target.id);
    let elementoSeleccionado = element.target.id;
    if (elementoSeleccionado == "img-add"){
      console.log("Entre en 1");
      // Cambia los titulos de los formularios AÑADIR
      $("#form-mesas .title-form").text("Añadir Mesa");
      $("#form-productos .title-form").text("Añadir Producto");
      $("#form-reservas .title-form").text("Añadir Reserva");
      $("#form-pedidos .title-form").text("Añadir Pedidos");
      $("#form-facturas .title-form").text("Añadir Facturas");


      // Pone todos los input text vacíos
      $('form input[type="text"]').val('');

      $("#boton-guardar-form").css("display", "block");
      $("#boton-actualizar-form").css("display", "none");
      mostrarForm();
    }

  });

  // Controlador buscador
  $("#buscador").keyup(function(event){
    //recuperar el valor ingresado en el buscador
    let contenidoBusqueda = $(this).val();
    console.log(contenidoBusqueda);
    if(contenidoBusqueda === ""){
      $("table tbody tr").each(function(){
        $(this).removeClass("fila-coincidente"); // quitar la clase de todas las filas
    });
    }
    if(event.keyCode === 13){
      console.log("ENTER");
      buscarFila(contenidoBusqueda);
    }
  });

  //// TABLA

  // Manejador click en algún elemento de la tabla
  $("table").click(function(element){
    console.log("Hice click ", element.target.innerHTML);
    if($(element.target).is("td")){
      let codigo_fila = $(element.target).closest("tr").find("td:first").text();
      console.log("Código del elemento de la fila: " + codigo_fila);
    }
    let elementoSeleccionado = element.target.innerHTML;
    let idElemento = element.target.id;
    if(idElemento){
      console.log(idElemento);
      if(idElemento == "i-edit"){
        let codigo_fila = $(element.target).closest("tr").find("td:first").text();
        console.log("Código del elemento de la fila: " + codigo_fila);

        // TODO llamada por tab seleccionado 
        API_ENTIDAD.consultarElemento(codigo_fila)
        //cargarDatosFormularioMesa(codigo_fila);

        /*
        let code = datos[0];
        let name = datos[1];
        let state = datos[2];
        console.log("Datos recogidos desde el manejador " + code + name + state)
        */
        
        
      }
      if(idElemento == "i-delete"){
        let codigo_fila = $(element.target).closest("tr").find("td:first").text();
        console.log("Código del elemento de la fila: " + codigo_fila);
        $("#delete-container").css("display","block");
        cod_element_delete = codigo_fila
        console.log("desde evento en boton papelera...", cod_element_delete)
      }

    }
  });


  //// MODALES

  // Cerrar modal al hacer clic fuera de ella
  $(window).click(function(event){
    if (event.target == $("#form-container")[0]) {
      $("#form-container").css("display", "none");
    }
    if (event.target == $("#delete-container")[0]){
      $("#delete-container").css("display", "none");
    }

  });

  $("#boton-aceptar").click(function(){
    console.log("cod_element_delete: ", cod_element_delete)
    // TODO llamada por tab seleccionado 
    if (seccion == SeccionesType.MESAS){
      borrarMesa(cod_element_delete);
    }
    else if (seccion == SeccionesType.PRODUCTOS){
      borrarProducto(cod_element_delete);
    }
    else if (seccion == SeccionesType.RESERVAS){
      borrarReserva(cod_element_delete);
    }
    else if (seccion == SeccionesType.PEDIDOS){
      borrarPedido(cod_element_delete);
    }
    else if (seccion == SeccionesType.FACTURAS){
      borrarFactura(cod_element_delete);
    }
  });

  $("#boton-cancelar").click(function(){
    $("#delete-container").css("display", "none");
  });

  //Controlador del formulario para crear (con submit)
  $('#form-container form').submit(function(event) {
    event.preventDefault();
    if (seccion == SeccionesType.MESAS){
      let formData = {
        nombre: $("#nombre").val()
      };
      console.log("formData --> ", formData);
  
      // TODO llamada por tab seleccionado
      crearMesa(formData);
      $("#form-container").css("display", "none");

      let $tabla = $(".table");
      let $filas = $tabla.find("tr");

      $filas.each(function(){
          $(this).find("td").remove();
          $(this).find("th").remove();
      });
      cargarMesasTabla();

    }
    else if (seccion == SeccionesType.PRODUCTOS){
      let formData = {
        nombre: $("#nombre-producto").val(),
        precio: $("#precio").val(),
        iva: $("#iva").val(),
        stock: $("#stock").val(),
      };
      console.log("formData --> ", formData);
  
      // TODO llamada por tab seleccionado
      crearProducto(formData);
      $("#form-container").css("display", "none");

      let $tabla = $(".table");
      let $filas = $tabla.find("tr");

      $filas.each(function(){
          $(this).find("td").remove();
          $(this).find("th").remove();
      });
      cargarProductosTabla();

    }
    else if (seccion == SeccionesType.RESERVAS){
      let formData = {
        mesa_codigo: $("#mesa-cod-reserv").val(),
        fecha: $("#fecha-reserva").val(),
        n_comensales: $("#n-comensales").val(),
        nota: $("#nota-reserva").val(),
      };
      console.log("formData --> ", formData);
  
      // TODO llamada por tab seleccionado
      crearReserva(formData);
      $("#form-container").css("display", "none");

      let $tabla = $(".table");
      let $filas = $tabla.find("tr");

      $filas.each(function(){
          $(this).find("td").remove();
          $(this).find("th").remove();
      });
      cargarReservasTabla();

    }
    else if (seccion == SeccionesType.PEDIDOS){
      let formData = {
        mesa_cod: $("#cod_mesa_pedido").val(),
      };
      console.log("formData --> ", formData);
  
      // TODO llamada por tab seleccionado
      crearPedido(formData);
      $("#form-container").css("display", "none");

      let $tabla = $(".table");
      let $filas = $tabla.find("tr");

      $filas.each(function(){
          $(this).find("td").remove();
          $(this).find("th").remove();
      });
      cargarPedidosTabla();

    }
    else if (seccion == SeccionesType.FACTURAS){
      let formData = {
        pedido_cod: $("#codigo-pedido-fact").val(),
      };
      console.log("formData --> ", formData);
  
      // TODO llamada por tab seleccionado
      crearFactura(formData);
      $("#form-container").css("display", "none");

      let $tabla = $(".table");
      let $filas = $tabla.find("tr");

      $filas.each(function(){
          $(this).find("td").remove();
          $(this).find("th").remove();
      });
      cargarFacturasTabla();

    }
    
  });

  // Controlador del formulario para actualizar
  $("#boton-actualizar-form").click(function(){
    /*
    const codigo = $('#codigo').val();
    const nombre = $('#nombre').val();
    const estado = $('#estado').val();

    console.log('Código desde controlador:', codigo);
    console.log('Nombre:', nombre);
    console.log('Estado:', estado);
    */

    if (seccion == SeccionesType.MESAS){
    let formData = {
      codigo: $('#codigo').val(),
      nombre: $("#nombre").val(),
      estado: $('#estado').val()
    };
    
    // TODO llamada por tab seleccionado
    updateMesa(formData);
    
    }

    else if (seccion == SeccionesType.PRODUCTOS){
      let formData = {
        codigo: $('#codigo-prod').val(),
        nombre: $("#nombre-producto").val(),
        precio: $('#precio').val(),
        iva: $('#iva').val(),
        stock: $('#stock').val()

      };
      
      updateProducto(formData);
      }

    else if (seccion == SeccionesType.RESERVAS){
      let formData = {
        codigo: $('#codigo-reserva').val(),
        mesa_codigo: $("#mesa-cod-reserv").val(),
        fecha: $('#fecha-reserva').val(),
        n_comensales: $('#n-comensales').val(),
        nota: $('#nota-reserva').val()

      };
      
      updateReserva(formData);
      }

      else if (seccion == SeccionesType.PEDIDOS){
        let formData = { 
          codigo: $('#codigo-pedido').val(),
          mesa_codigo: $("#cod_mesa_pedido").val(),
          fecha: $('#fecha-reserva').val(),
          n_comensales: $('#n-comensales').val(),
          nota: $('#nota-reserva').val()
  
        };
        
        updatePedido(formData);
        }

  });

  // Controlador del formulario para añadir prodcuto al pedido
  $("#boton_add_prod_pedido").click(function(){

    let formData = { 
      cod_pedido: $('#codigo-pedido').val(),
      cod_producto: $("#producto-add-del").val(),
      cantidad: $('#n-prod-add-del').val()
    };

    addProductoPedido(formData);
    cargarPedidosTabla();

  });


  // Controlador del formulario para eliminar prodcuto al pedido
  $("#boton_del_prod_pedido").click(function(){

    let formData = { 
      cod_pedido: $('#codigo-pedido').val(),
      cod_producto: $("#producto-add-del").val(),
      cantidad: $('#n-prod-add-del').val()
    };

    delProductoPedido(formData);
    cargarPedidosTabla();


  });

}