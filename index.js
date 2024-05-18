console.log("--- Index cargado ---")
console.log("--- JQUERY inicializado ---", !!$)

// ESTADO GLOBAL
let cod_element_delete = 0;
let seccionSeleccionada = 'mesas'; 

$(document).ready(main);

function main(){
  console.log("DOM cargado")

  registrarEventos();

  //cargarMesasTabla();
  console.log('----API', API_ENTIDAD)
  API_ENTIDAD.consultarTabla()

}