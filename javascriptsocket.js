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
//---------------------------------------------------------
//-------------------------Socket--------------------------
const socket = new WebSocket('ws://localhost:54321');

socket.onopen = function()
{
	socket.send('Hello there from javascript');
    console.log('opened');
};

socket.onmessage = function(event)
{
	console.log(event.data);
};
/*import net from "net"

const client = new net.Socket();
client.connect({ port: 54321 }, process.argv[2] ?? "localhost", () => {
    client.write(`${process.argv[3]}\r\n`)
  })

client.on(net.connect, () => {
    console.log("Connected");
    client.write("Hello from client");
});

client.on("data", (data) =>{
    console.log('Server says: ${data.toString("utf-8)}');
});*/

//---------------------------------------------------------

function syncBoard()
{
    
}

function onResetClick()
{
    document.body.style.background = 'red';
    socket.send('reset');
    console.log('reset');
}

function showMovesClick()
{
    document.body.style.background = 'green';
}

function movePieceDBClick()
{

}