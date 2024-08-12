// vars describing the table size
var nc = 0;
var nr = 0;

// when dictating, the position of the "cursor"
var readHeadRow = 1;
var readHeadCol = 0;

var state = "readPaused"; // {readPlaying, readPaused, edit}
// under read: the play button starts/stops playing, tapping on a cell moves the read head and pause
// under write: the play button does nothing, tapping changes something

var writeColor = "purple";

var time = 600; // delay between speech
var playerID = null;
var speaker = new SpeechSynthesisUtterance();


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
            tableText += 
            `<td id="b${r}-${c}" 
                onmouseover="mousedOver(${r}, ${c})" 
                onmouseout="mousedOut(${r}, ${c})" 
                onclick="onTap(${r}, ${c})"
                ontouchstart="onTap(${r}, ${c})"> O </td> `; // theoretically for mobile, maybe not needed
        }
        tableText += "</tr>\n";
    }
    //console.log(tableText);
    document.getElementById("mainTable").innerHTML = tableText;
}

function mousedOver(u, v){
    //console.log(u, v);
    //document.getElementById(`b${u}-${v}`).style.borderColor = "black";

}
function mousedOut(u,v){
    //document.getElementById(`b${u}-${v}`).style.borderColor = "white";
}


function onTap(u,v){
    console.log(`userclick on ${u}, ${v}`);

    if(state == "readPaused" || state == "readPlaying"){
        state = "readPaused";
        document.getElementById(`b${readHeadRow}-${readHeadCol}`).style.borderColor = "white";
    }

    readHeadRow = u;
    readHeadCol = v;

    if(state == "readPaused" || state == "readPlaying"){
        document.getElementById(`b${u}-${v}`).style.borderColor = "black";
        state = "readPaused";

    }
    else{ // state = "edit"
        document.getElementById(`b${u}-${v}`).style.color = writeColor;
    }
}

function pushedPlayPause(){
    if(state == "readPaused"){
        state = "readPlaying";
    }
    else{
        state = "readPaused";
        clearInterval(playerID);
        playerID = null;
    }

    if(state == "readPlaying"){
        //announce();
        playerID = setInterval(announce, time);
    }

}

function pushedChangeState(){
    if(state == "edit") state = "readPaused";
    else                state = "edit";
}

function announce(){
    
    console.log(`Speaking ${readHeadRow}, ${readHeadCol}`);

    speaker.text = document.getElementById(`b${readHeadRow}-${readHeadCol}`).innerText;
    window.speechSynthesis.speak(speaker);


    document.getElementById(`b${readHeadRow}-${readHeadCol}`).style.borderColor = "white";
    
    readHeadCol += 1;
    if(readHeadCol >= nc){
        readHeadCol = 0;
        readHeadRow += 1;
        if(readHeadRow > nr) readHeadRow = 1;
    }
    document.getElementById(`b${readHeadRow}-${readHeadCol}`).style.borderColor = "black";

    //setTimeout(announce, time);
}