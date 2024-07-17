// vars describing the table size
var nc = 0;
var nr = 0;

// when dictating, the position of the "cursor"
var readHeadRow = 0;
var readHeadCol = 0;


function generate(){ // user presses "generate table", table is generated with the 
    nr = document.getElementById("nRows").value;
    nc = document.getElementById("nCols").value;

    var tableText = "";
    for(let r = 0; r < nr; r++){
        tableText += "<tr>";
        for(let c = 0; c < nc; c++){
            tableText += "<td>O</td> "; 
        }
        tableText += "</tr>\n";
    }
    console.log(tableText);
    document.getElementById("mainTable").innerHTML = tableText;

}