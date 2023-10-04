// Inicializamos la fecha actual en la fecha de hoy
var fechaActual = new Date();
var horarios=[];
var citasPorFechaHora = {};

// Función para retroceder una semana en la agenda
function retrocederSemana() {
    fechaActual.setDate(fechaActual.getDate() - 7);
    cargarAgenda();
}

// Función para avanzar una semana en la agenda
function avanzarSemana() {
    fechaActual.setDate(fechaActual.getDate() + 7);
    cargarAgenda();
}

function cargarAgenda() {
  
  
    var horarios = [
                      {
                        inicio: "12:00",
                        fin: "12:30"
                      },
                      {
                        inicio: "12:30",
                        fin: "13:00"
                      },
                      {
                        inicio: "13:00",
                        fin: "13:30"
                      },
                      {
                        inicio: "13:30",
                        fin: "14:00"
                      },
                      {
                        inicio: "14:00",
                        fin: "14:30"
                      },
                      {
                        inicio: "14:30",
                        fin: "15:00"
                      },
                      {
                        inicio: "15:00",
                        fin: "15:30"
                      },
                      {
                        inicio: "18:00",
                        fin: "18:30"
                      },
                      {
                        inicio: "18:30",
                        fin: "19:00"
                      },
                      {
                        inicio: "19:00",
                        fin: "19:30"
                      },
                      {
                        inicio: "19:30",
                        fin: "20:00"
                      },
                      {
                        inicio: "20:00",
                        fin: "20:30"
                      },
                      {
                        inicio: "20:30",
                        fin: "21:00"
                      },
                    ];
         



      function mostrarAgenda() {
        // Obtenemos el primer día de la semana (lunes)
        var primerDiaSemana = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() - fechaActual.getDay() + 1);
      
        // Creamos la tabla de la agenda de citas
        var tabla = document.createElement('table');
        tabla.style.width = '100%';
      
        // Creamos la fila de encabezado de la tabla
        var encabezado = tabla.insertRow();
        encabezado.insertCell().innerHTML = 'Hora';
        for (var j = 0; j < 6; j++) {
          var fechaCelda = new Date(primerDiaSemana.getFullYear(), primerDiaSemana.getMonth(), primerDiaSemana.getDate() + j);
          encabezado.insertCell().innerHTML = fechaCelda.getDate() + '/' + (fechaCelda.getMonth() + 1) + '/' + fechaCelda.getFullYear();
        }
      
        // Creamos las filas de la tabla
        for (var i = 0; i < horarios.length; i++) {
          var horaInicio = horarios[i].inicio;
          var horaFin = horarios[i].fin;
          var fila = tabla.insertRow();
          fila.insertCell().innerHTML = horaInicio + ' - ' + horaFin;
          for (var j = 0; j < 6; j++) {
            var fechaCelda = new Date(primerDiaSemana.getFullYear(), primerDiaSemana.getMonth(), primerDiaSemana.getDate() + j);
            var citas = getCitas(fechaCelda, horaInicio);
            var celda = document.createElement('div');
            celda.className = citas.length > 0 ? 'cita ocupada' : 'cita vacio';
            if (citas.length > 0) {
              for (var k = 0; k < citas.length; k++) {
                var enlace = document.createElement('a');
                enlace.innerHTML = citas[k].nombre;
                celda.appendChild(enlace);
              }
            }
            fila.insertCell().appendChild(celda);
          }
        }
      
        // Mostramos la tabla en la página
        document.getElementById('agenda-citasPrincipal').appendChild(tabla);
      }




    //Funcion para mostrar la agenda de Citas
    /*function mostrarAgenda() {
      
  
    // Obtenemos el primer día de la semana (lunes)
    var primerDiaSemana = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() -
    fechaActual.getDay() + 1);
      
     
  
    // Creamos la tabla de la agenda de citas
    var tabla = '<table style="width:100% " >' +
      '<tr>' +
      '<th style="width:100px">Hora</th>' +
      '<th>Lunes<br>' + primerDiaSemana.getDate() + '/' + (primerDiaSemana.getMonth() + 1) + '/' + primerDiaSemana
        .getFullYear() + '</th>' +
      '<th>Martes<br>' + (primerDiaSemana.getDate() + 1) + '/' + (primerDiaSemana.getMonth() + 1) + '/' +
      primerDiaSemana.getFullYear() + '</th>' +
      '<th>Miércoles<br>' + (primerDiaSemana.getDate() + 2) + '/' + (primerDiaSemana.getMonth() + 1) + '/' +
      primerDiaSemana.getFullYear() + '</th>' +
      '<th>Jueves<br>' + (primerDiaSemana.getDate() + 3) + '/' + (primerDiaSemana.getMonth() + 1) + '/' +
      primerDiaSemana.getFullYear() + '</th>' +
      '<th>Viernes<br>' + (primerDiaSemana.getDate() + 4) + '/' + (primerDiaSemana.getMonth() + 1) + '/' +
      primerDiaSemana.getFullYear() + '</th>' +
      '<th>Sabado<br>' + (primerDiaSemana.getDate() + 5) + '/' + (primerDiaSemana.getMonth() + 1) + '/' +
      primerDiaSemana.getFullYear() + '</th>' +
      '</tr>';
    // Recorremos los horarios disponibles para las citas
    for (var i = 0; i < horarios.length; i++) {
      // Obtenemos la hora de inicio y fin del horario
      var horaInicio = horarios[i].inicio;
      var horaFin = horarios[i].fin;
      // Creamos una fila para el horario
      tabla += '<tr>' +
        '<td>' + horaInicio + ' - ' + horaFin + '</td>';
      // Recorremos los días de la semana
      for (var j = 0; j < 6; j++) {
        // Obtenemos la fecha de la celda
        var fechaCelda = new Date(primerDiaSemana.getFullYear(), primerDiaSemana.getMonth(), primerDiaSemana
          .getDate() + j);
        // Obtenemos las citas para la fecha y hora actual
        
        var citas = getCitas(fechaCelda, horaInicio);
        // Creamos la celda para la cita
  
        //console.log("estamos aqui");
        var celda = '';
       //console.log("Citas - linea 234 atrapa", citas);
  
        if (citas.length > 0) {
          //console.log("entra");
          for (var k = 0; k < citas.length; k++) {
            celda += '<div class="cita ocupada"><a>Ocupado</a></div>';
          }
        } else {
          celda = '<div class="cita vacio"></div>';
        }
        // Agregamos la celda a la fila
        tabla += '<td>' + celda + '</td>';
      }
      // Cerramos la fila del horario
      tabla += '</tr>';
    }
    // Cerramos la tabla de la agenda de citas
    tabla += '</table>';
    // Mostramos la tabla en la página
    document.getElementById('agenda-citasPrincipal').innerHTML = tabla;
  
  }*/

  //   return citasPorFechaHora[clave];
  // }
  function mostrarCargando() {
    var cargando = document.createElement('div');
    cargando.innerHTML = 'Cargando...';
    document.body.appendChild(cargando);
  }
  
  function ocultarCargando() {
    var cargando = document.querySelector('div.cargando');
    if (cargando) {
      document.body.removeChild(cargando);
    }
  }
  
  function getCitas(fecha, hora) {
    // mostrarCargando();
    return new Promise(function(resolve, reject) {
      var citas = [];
      var fechaCita = new Date(fecha);
      var anio = fechaCita.getFullYear();
      var mes = fechaCita.getMonth() + 1;
  
      if (mes < 10) {
        mes = "0" + mes;
      }
  
      var dia = fechaCita.getDate();
      var fechaMysl = anio + '-' + mes + '-' + dia;
  
      var horaCita = hora;
  
      var cadObj = '{"fechaMysl":"' + fechaMysl + '","horaCita":"' + horaCita + '"}';
  
      $.ajax({
        async: true,
        url: "paginaFunciones/funcionesPrincipal.php",
        method: "POST",
        data: {
          'funcion': 1,
          'fechaMysl': fechaMysl,
          'horaCita': horaCita
        },
        dataType: 'json',
        success: function(respuesta) {
          citas.push({
            nombre: respuesta["nombre"],
            indice: respuesta["indice"]
          });
          // ocultarCargando();
          resolve(citas);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          ocultarCargando();
          reject(errorThrown);
        }
      });
    });
  }
  
  
    mostrarAgenda();
  
  }