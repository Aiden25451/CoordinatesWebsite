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
        // #Copy
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


