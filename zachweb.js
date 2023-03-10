//-------Set width/height depending on screen ratio--------
if(document.documentElement.clientHeight > document.documentElement.clientWidth)
{
    let board = document.getElementsByClassName('chessboard');
    for(i = 0; i < board.length; i++)
    {
        board[i].style.width = '98vw';
        board[i].style.height = '98vw';
    }
} 
else
{
    let board = document.getElementsByClassName('chessboard');
    for(i = 0; i < board.length; i++)
    {
        board[i].style.width = '98vh';
        board[i].style.height = '98vh';
    }
}
//------------------------Variables------------------------
const command = {
    RESET: 0,
    SYNC: 1,
    GETMOVES: 2,
    MOVE: 3
};

const color = {
    BLACK: 0,
    WHITE: 1,
    blank: 2
};

let msgArray;

const playField = ["A8","B8","C8","D8","E8","F8","G8","H8",
                "A7","B7","C7","D7","E7","F7","G7","H7",
                "A6","B6","C6","D6","E6","F6","G6","H6",
                "A5","B5","C5","D5","E5","F5","G5","H5",
                "A4","B4","C4","D4","E4","F4","G4","H4",
                "A3","B3","C3","D3","E3","F3","G3","H3",
                "A2","B2","C2","D2","E2","F2","G2","H2",
                "A1","B1","C1","D1","E1","F1","G1","H1"];

//-------------------------Socket--------------------------
const socket = new WebSocket("ws://192.168.100.232:9002");

socket.onopen = function(e) {
    console.log("[open] Connection established");
    //alert("Sending to server");
    socket.send("My name is John");
};

socket.onmessage = function(event) {
    let message = event.data;
    console.log("[message] Data received from server: " + message);
    
    msgArray = message.split(" ");

    switch(msgArray[0])
    {
        case command.RESET:

            break;
        case command.SYNC:
            
            break;
        case command.GETMOVES:

            break;
        case command.MOVE: 
            movePieceDBClick();
            break;
    }
};
  
socket.onclose = function(event) {
    if (event.wasClean) {
      alert("[close] Connection closed cleanly, code=" + event.code + "reason=" + event.reason);
    } else {
      alert("[close] Connection died");
    }
};
  
socket.onerror = function(error) {
    alert("[ERROR]");
};

//---------------------------------------------------------

function syncBoard()
{
    socket.send("syncBoard");
}

function onResetClick()
{
    socket.send("Reset");
}

function fieldClick()
{
    
    socket.send("Show Moves");

    // let alt = "A2"; let neu = "A3";
    // document.getElementById(neu).src = document.getElementById(alt).src;
    // document.getElementById(alt).src = "";
}