// vars describing the table size
var nc = 0;
var nr = 0;

// when dictating, the position of the "cursor"
var readHeadRow = 0;
var readHeadCol = 0;


function generate(){ // user presses "generate table", table is generated with the 
    nr = document.getElementById("nRows").value;
    nc = document.getElementById("nCols").value;

    var tableText = "<tr style='color:blue;'>";
    for(let c = 0; c < nc; c++){
        tableText += `<th> ${String.fromCharCode(65 + c)} </th>`;
    }
    tableText += "</tr>";
    for(let r = 1; r <= nr; r++){
        tableText += "<tr>";
        for(let c = 0; c < nc; c++){
            tableText += `<td id = "b${r}-${c}" onmouseover="mousedOver(${r}, ${c})" onmouseout="mousedOut(${r}, ${c})"> O</td> `; 
        }
        tableText += "</tr>\n";
    }
    console.log(tableText);
    document.getElementById("mainTable").innerHTML = tableText;

}

function mousedOver(u, v){
    console.log(u, v);
    document.getElementById(`b${u}-${v}`).style.color = "red";

}
function mousedOut(u,v){
    document.getElementById(`b${u}-${v}`).style.color = "black";
}