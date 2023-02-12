$.getScript('../static/calculator/matrix.js', function(){});

var selection = document.getElementById("degree");
var degree = 1
var table = document.getElementById("Coordinates");
var table_answer = document.getElementById("answer")

function select() {
    var new_degree = parseInt(selection.selectedOptions[0].value);

    if(new_degree == 1)
        table_answer.innerHTML = '<tr><th>Results: y = mx + b </th></tr>'
    else if(new_degree == 2)
        table_answer.innerHTML = '<tr><th>Results: y = Ax<sup>2</sup> + Bx + C </th></tr>'
    
    //Removing row
    for(let i = 0; i < degree; i++) {
        //var row = document.getElementById("tr" + (i+1));
        table.innerHTML = "<tr><th></th><th>Coordinates</th></tr>"
    }

    //Adding row
    for(let i = 0; i < (new_degree + 1); i++) { 
        table.innerHTML = table.innerHTML + '<tr id = "tr' + (i+1) + '"><td>Coord ' + (i+1) + '</td><td>(<div id = "x' + (i+1) + '" contenteditable = "true" class = "input" placeholder="x"></div><div id = "y' + (i+1) + '" contenteditable = "true" class = "input" placeholder="y"></div>)</td></tr>';
    }
    
    degree = new_degree;
}


function myfunction() {   
    
    var arr_x = []
    var arr_y = []
    for(let i = 0; i < degree+1; i++) {
        arr_x[i] = document.getElementById("x" + (i+1)).innerHTML; 
        arr_y[i] = document.getElementById("y" + (i+1)).innerHTML; 
    }
    
    array_a = []
    temp_row = []
    for(let row = 0; row < degree+1; row++) {
        temp_row = []
        for(let col = degree; col > 0; col--) {
            temp_row.push(power(arr_x[row], col));
        }
        temp_row.push(1);

        array_a.push(perfectCopy(temp_row));
    }
    matrixA = new Matrix(array_a)


    array_y = []
    for(let row = 0; row < degree+1; row++) {
        temp_row = []
        
        temp_row.push(arr_y[row]);

        array_y.push(perfectCopy(temp_row));
    }

    matrixY = new Matrix(array_y);
    console.log(matrixY)
    
    matrixAInv = new Matrix(inverse(matrixA).rows)
    matrixAInvY = new Matrix(matrix_multiplication(matrixY, matrixAInv))
    answer = matrixAInvY.rows;

    if(degree == 1)
        table_answer.innerHTML = '<tr><th>Results: y = mx + b </th></tr>'
    else if(degree == 2)
        table_answer.innerHTML = '<tr><th>Results: y = Ax<sup>2</sup> + Bx + C </th></tr>'
    
    if(degree == 1) {
        table_answer.innerHTML = table_answer.innerHTML + '<tr><td><p>m = ' + Math.round(answer[0]*1000)/1000 + '</p></td></tr>'
        table_answer.innerHTML = table_answer.innerHTML + '<tr><td><p>b = ' + Math.round(answer[1]*1000)/1000 + '</p></td></tr>'
    }
    else {
        let letter = "A"
        for(let i = 0; i <= degree; i++) {
            table_answer.innerHTML = table_answer.innerHTML + '<tr><td><p>' + letter + ' = ' + Math.round(answer[i]*1000)/1000 + '</p></td></tr>'
            var number_value = letter.charCodeAt(0)
            letter = String.fromCharCode(number_value+1)
        
        }
        
    }
    
    // table_answer.innerHTML = table_answer.innerHTML + '<tr><td><p>b = ' + answer[degree] + '</p></td></tr>';
}  
