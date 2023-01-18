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
var socket = new WebSocket("ws://192.168.82.232:54321");

// When the connection is open, send some data to the server
socket.onopen = function () {
    socket.send('Ping'); // Send the message 'Ping' to the server
};
    
    // Log errors
socket.onerror = function (error) {
    console.log('WebSocket Error ' + error);
};
    
    // Log messages from the server
socket.onmessage = function (e) {
    console.log('Server: ' + e.data);
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