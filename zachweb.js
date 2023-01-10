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
const client = new net.Socket();
client.connect({port: 50900});

client.on("data", (data) =>{
    
})

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