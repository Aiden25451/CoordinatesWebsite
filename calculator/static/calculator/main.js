//document.getElementById("title").innerHTML = "JavaScript!";

// $(document).ready(function(){
//     $("h1").click(function(){
//         alert(5)
//     });
//     $("select").click(function(){
//         console.log(document.getElementById("degree").innerHTML)
//     });
//   });

var selection = document.getElementById("degree");
var degree = 1
var table = document.getElementById("Coordinates");
function select() {
    var new_degree = parseInt(selection.selectedOptions[0].value);

    //Adding One
    // var table = document.getElementById("Coordinates");
    // table.innerHTML = table.innerHTML + '<tr id = "tr3"><td>Coord 3</td><td>(<div id = "x3" contenteditable = "true" class = "input">x</div><div id = "y3" contenteditable = "true" class = "input">y</div>)</td></tr>';

    //Removing One
    for(let i = 0; i < degree; i++) {
        //var row = document.getElementById("tr" + (i+1));
        table.innerHTML = "<tr><th></th><th>Coordinates</th></tr>"
    }

    for(let i = 0; i < (new_degree + 1); i++) { 
        table.innerHTML = table.innerHTML + '<tr id = "tr' + (i+1) + '"><td>Coord ' + (i+1) + '</td><td>(<div id = "x' + (i+1) + '" contenteditable = "true" class = "input" placeholder="x"></div><div id = "y' + (i+1) + '" contenteditable = "true" class = "input" placeholder="y"></div>)</td></tr>';
    }
    
    degree = new_degree;
}

class Matrix {
    constructor(matrix) {
        this.row_count = matrix.length;
        this.col_count = matrix[0].length;
        this.rows = matrix;
        this.columns = [];
        this.set_columns(matrix);
    }
    
    set_columns(matrix) {
        for(let col = 0; col < this.col_count; col++) {
            let temp_col = []
            for(let row = 0; row < this.row_count; row++) {
                // print(matrix[row]);
                temp_col.push(matrix[row][col])
            }
            this.columns.push(temp_col)
        }
    }
       
    transpose() { 
        let temp_col = perfectCopy(this.columns)
        let temp_col_count = this.col_count
        this.columns = perfectCopyDouble(this.rows)
        this.col_count = this.row_count
        this.rows = temp_col
        this.row_count = temp_col_count
    }
}

function perfectCopy(arr) {
    let temp = []

    for(let i = 0; i < arr.length; i++) {
        temp[i] = arr[i];
    }

    return temp;
}

function perfectCopyDouble(arr) {
    let temp = []
    let temp_row = []
    
    for(let row = 0; row < arr.length; row++) {
        for(let col = 0; col < arr[0].length; col++) {
            temp_row.push(arr[row][col]);
            
        }
        temp.push(perfectCopy(temp_row))
        temp_row = [];
    }

    

    return temp;
}

function matrix_multiplication(matrix1, matrix2) {
    // console.log("Dis is matrix 1: {} \nand this is matrix 2: {}".format(matrix1, matrix2))
    if (matrix1.row_count != matrix2.col_count) {
        console.log("This wont work")
        return
    }

    total = []

    for(let row = 0; row < matrix2.row_count; row++) {
        new_row = []
        for(let col = 0; col < matrix1.col_count; col++) {
            // print("THIS DE ROW: {} \nand DIs ded Column: {}".format(row, col))
            new_row.push(vector_multiplication(matrix2.rows[row], matrix1.columns[col]))
        }
        total.push(perfectCopy(new_row))
    }

    return total
}


function vector_multiplication(vector1, vector2) {
    let value = 0
    
    for(let x = 0; x < vector1.length; x++) {
        value += vector1[x] * vector2[x]
    }    

    return value
}


function remove_column_and_row(rows, kill_row, kill_col) {
result = []
for(let row = 0; row < rows.length; row++) {
    if (row != kill_row) {
        temp = []
        for(let col = 0; col < rows.length; col++) {
            if(col != kill_col) {
                temp.push(rows[row][col])
            }
        }
        result.push(perfectCopy(temp))
    }    
}
return result
}


function determinant(matrix, matrix_size){
result = 0
length = matrix.row_count
total = []

for(let x = 0; x < length; x++) {
total.push(1)
}

if (matrix_size == 2){
cofactor_matrix = [[matrix.rows[1][1], -matrix.rows[1][0]],
                   [-matrix.rows[0][1], matrix.rows[0][0]]]
return cofactor_matrix
}

if (length == matrix_size){
cofactor_matrix = []

for(let y = 0; y < matrix.col_count; y++) {
    cofactor_row = []

    for(let x = 0; x < matrix.col_count; x++){
        // #Peeerfecto Copy
        temp_rows = perfectCopyDouble(matrix.rows)
        z = 1
        if ((x % 2 == 0 && y % 2 == 1) || (x % 2 == 1 && y % 2 == 0))
        z = -1

        cofactor_value = z * determinant(
        new Matrix(remove_column_and_row(temp_rows, y, x)), matrix_size)

        cofactor_row.push(cofactor_value)
       
        // # total[x] *= matrix.rows[y][x] * cofactor_value
    }
    cofactor_matrix.push(perfectCopy(cofactor_row))
    length -= 1
}
  

return cofactor_matrix

}

else if (length > 2) {
for(let x = 0; x < matrix.col_count; x++) {
//   #Peeerfecto Copy
  temp_rows = perfectCopyDouble(matrix.rows)
  z = 1
  if (x % 2 == 1)
    z = -1

  cofactor_value = z * determinant(
    new Matrix(remove_column_and_row(temp_rows, 0, x)), matrix_size)

  total[x] *= matrix.rows[0][x] * cofactor_value
}

length -= 1
}

if (matrix.row_count == 2) {
result = (matrix.rows[0][0] * matrix.rows[1][1] -
          matrix.rows[0][1] * matrix.rows[1][0])
// #print(result)
return result
}

length += 1
for(let x = 0; x < total; x++) 
result += x

return result
}

function inverse(matrix) {
    inverse_array = new Matrix(determinant(new Matrix(perfectCopyDouble(matrix.rows)), matrix.col_count))
    det = 0

    for(let x = 0; x < matrix.rows[0].length; x++) {
        det += matrix.rows[0][x] * inverse_array.rows[0][x]
    }
    inverse_array.transpose()
    
    //   #print(inverse_array)
    for(let row = 0; row < inverse_array.row_count; row++) {
        for(let col = 0; col < inverse_array.col_count; col++) {
            inverse_array.rows[row][col] *= (1 / det)
        }
    }
    //   #print(inverse_array)

    return inverse_array
}

function power(x, y) {
    result = x;
    for(let i = 1; i < y; i++) {
        result *= x;
    }
    
    return result
}

var table_answer = document.getElementById("answer")
function myfunction() {   
    
    var arr_x = []
    var arr_y = []
    for(let i = 0; i < degree+1; i++) {
        arr_x[i] = document.getElementById("x" + (i+1)).innerHTML; 
        arr_y[i] = document.getElementById("y" + (i+1)).innerHTML; 
    }
    
    // matrixA = new Matrix([
    // [arr_x[0], 1], 
    // [arr_x[1], 1]])

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

    // matrixAt1 = new Matrix(perfectCopyDouble(matrixA.rows))
    // matrixAt1.transpose()
    // matrixAt2 = new Matrix(perfectCopyDouble(matrixAt1.rows))
    
    // matrixAt1A = new Matrix(matrix_multiplication(matrixA, matrixAt1))
    // matrixAt1AInv = new Matrix(inverse(matrixAt1A).rows)
        
    // matrixAt2Y = new Matrix(matrix_multiplication(matrixY, matrixAt2))
    
    // answer = matrix_multiplication(matrixAt2Y, matrixAt1AInv)

    matrixAInv = new Matrix(inverse(matrixA).rows)
    matrixAInvY = new Matrix(matrix_multiplication(matrixY, matrixAInv))
    answer = matrixAInvY.rows;


    table_answer.innerHTML = '<tr><th>Results: y = mx + b </th></tr>'
    for(let i = 0; i < degree; i++) {
        table_answer.innerHTML = table_answer.innerHTML + '<tr><td><p>m' + (i+1) + ' = ' + answer[i] + '</p></td></tr>'
    }
    table_answer.innerHTML = table_answer.innerHTML + '<tr><td><p>b = ' + answer[degree] + '</p></td></tr>';
    
    // matrixAt = new Matrix(perfectCopyDouble(matrixA.rows));
    // matrixAt.transpose();
    // matrixA2 = new Matrix(perfectCopyDouble(matrixA.rows));

    // matrixAt1A = new Matrix(matrix_multiplication(matrixA2, matrixAt))
    // console.log(displayMatrix(matrixAt1A))
    // matrixAt1ACof = new Matrix(determinant(new Matrix(perfectCopyDouble(matrixAt1A.rows)), matrixAt1A.col_count))
    // matrixAt1AInv = new Matrix(inverse(matrixAt1A).rows)

    // function displayMatrix(Matrix) {
    //     let text = ""

    //     for(let row = 0; row < Matrix.row_count; row++) {
    //         for(let col = 0; col < Matrix.col_count; col++) {
    //             text += Matrix.rows[row][col] + " " 
    //         }
    //         text += "\n"
    //     }

    //     return text;
        
    // }    
    
}  
