//-------Set width/height depending on screen ratio--------
if(document.documentElement.clientHeight > document.documentElement.clientWidth)
{
    var board = document.getElementsByClassName('chessboard');
    for(i = 0; i < board.length; i++)
    {
        board[i].style.width = '98vw';
        board[i].style.height = '98vw';
    }
} 
else
{
    var board = document.getElementsByClassName('chessboard');
    for(i = 0; i < board.length; i++)
    {
        board[i].style.width = '98vh';
        board[i].style.height = '98vh';
    }
}

//-------------------------Socket--------------------------
var socket = new WebSocket("ws://192.168.111.232:9002");

socket.onopen = function(e) {
    alert("[open] Connection established");
    alert("Sending to server");
    socket.send("My name is John");
};
  
socket.onmessage = function(event) {
    alert(`[message] Data received from server: ${event.data}`);
};
  
socket.onclose = function(event) {
    if (event.wasClean) {
      alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      alert('[close] Connection died');
    }
};
  
socket.onerror = function(error) {
    alert(`[error]`);
};

//---------------------------------------------------------

function syncBoard()
{
    
}

function onResetClick()
{
    document.body.style.background = 'red';
}

function showMovesClick()
{
    document.body.style.background = 'green';
}

function movePieceDBClick()
{

}