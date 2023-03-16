// Obtenemos la tabla y los botones
var table = document.getElementById('myTable');
var addRowBtn = document.getElementById('addRowBtn');
var addColumnBtn = document.getElementById('addColumnBtn');

// Inicializamos la tabla con 2 columnas
var numColumns = 1;

// Manejador de eventos para el botón de añadir columna
addColumnBtn.addEventListener('click', function() {
  var playerName = prompt('Introduce el nombre del jugador:');
  
  // Creamos la nueva columna en el encabezado
  var headerRow = table.tHead.rows[0];
  var newHeaderCell = document.createElement('th');
  newHeaderCell.textContent = playerName;
  headerRow.appendChild(newHeaderCell);
  
  // Añadimos una celda a cada fila de la tabla
  var bodyRows = table.tBodies[0].rows;
  for (var i = 0; i < bodyRows.length; i++) {
    var newBodyCell = document.createElement('td');
    newBodyCell.appendChild(document.createElement('input'));
    newBodyCell.firstChild.type = 'number';
    newBodyCell.firstChild.min = '0';
    bodyRows[i].appendChild(newBodyCell);
  }
  
  // Añadimos la celda de total en el pie de la tabla
  var footerRow = table.tFoot.rows[0];
  var newFooterCell = document.createElement('td');
  newFooterCell.textContent = '0';
  footerRow.appendChild(newFooterCell);
  
  // Incrementamos el número de columnas
  numColumns++;
});

// Manejador de eventos para el botón de añadir fila
addRowBtn.addEventListener('click', function() {
  var lastBodyRow = table.tBodies[0].rows[table.tBodies[0].rows.length - 1];
  var holeNumber = parseInt(lastBodyRow.cells[0].textContent) + 1;
  
  // Creamos la nueva fila con el número de hoyo
  var newBodyRow = document.createElement('tr');
  var newHoleCell = document.createElement('td');
  newHoleCell.textContent = holeNumber;
  newBodyRow.appendChild(newHoleCell);
  
  // Añadimos las celdas de cada columna
  for (var i = 0; i < numColumns - 1; i++) {
    var newBodyCell = document.createElement('td');
    newBodyCell.appendChild(document.createElement('input'));
    newBodyCell.firstChild.type = 'number';
    newBodyCell.firstChild.min = '0';
    newBodyRow.appendChild(newBodyCell);
  }
  
  // Añadimos la nueva fila a la tabla
  table.tBodies[0].appendChild(newBodyRow);
});

// Manejador de eventos para calcular los totales
table.addEventListener('input', function(e) {
  if (e.target.nodeName === 'INPUT') {
    var colIndex = e.target.parentNode.cellIndex;
    var total = 0;
    
    // Sumamos los valores de cada celda en la columna
    var bodyRows = table.tBodies[0].rows;
    for (var i = 0; i < bodyRows.length; i++) {
      var cellValue = parseInt(bodyRows[i].cells[colIndex].firstChild.value);
      if (!isNaN(cellValue)) {
        total += cellValue;
      }
    }
    
    // Actualizamos la celda de total en el pie de la tabla
    var footerRow = table.tFoot.rows[0];
    footerRow.cells[colIndex].textContent = total;
  }
});
