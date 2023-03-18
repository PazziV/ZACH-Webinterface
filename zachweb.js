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

const piece = {
        none: 0,
        PAWN: 1,   
        BISHOP: 2,     
        KNIGHT: 3,     
        ROOK: 4,       
        QUEEN: 5,
        KING: 6
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

let possibleMoves = [-1];

let selectedPiece = -1;

const hostname = "http://" + location.hostname;

//-------------------------Socket--------------------------
//const socket = new WebSocket("ws://192.168.100.232:9002"); // bei Handy Hotspot
const socket = new WebSocket("ws://192.168.8.106:9002"); // Huawei Cube

socket.onopen = function(e)
{
    console.log("[open] Connection established");
};

socket.onmessage = function(event) 
{
    let message = event.data;
    console.log("[message] Data received from server: " + message);
    
    msgArray = message.split(" ");

    switch(msgArray[0])
    {
        case command.RESET:
            updateBoard();
            break;
        case command.SYNC:
            updateBoard();
            break;
        case command.GETMOVES:
            showMoves();
            break;
        case command.MOVE: 
            break;
    }
};
  
socket.onclose = function(event) 
{
    if (event.wasClean) 
    {
      alert("[close] Connection closed cleanly, code=" + event.code + "reason=" + event.reason);
    } 
    else 
    {
      alert("[close] Connection died");
    }
    console.log("[close]Connection closed");
};
  
socket.onerror = function(error) 
{
    alert("[ERROR]");
};

//---------------------------------------------------------

function syncBoard()
{
    console.log("[Sync] Sending: " + command.SYNC);
    socket.send(command.SYNC);
}

function onResetClick()
{
    console.log("[Reset] Sending: " + command.RESET);
    socket.send(command.RESET);
}

function fieldClick(id)
{
    if(possibleMoves != -1 && possibleMoves.includes(id))
    {
        console.log("[Move] Sending: " + command.MOVE + " " + id2pos(selectedPiece) + " " + id2pos(id));
        socket.send(command.MOVE + " " + id2pos(selectedPiece) + " " + id2pos(id));

        document.getElementById(id + "img").src = document.getElementById(selectedPiece + "img").src;
        document.getElementById(selectedPiece + "img").src = hostname + "/images/blank.png";
    }
    else
    {
        if(document.getElementById(id + "img").src.endsWith("images/blank.png") == false)
        {
            selectedPiece = id
            console.log("[Show Moves] Sending: " + command.GETMOVES + " " + id2pos(id));
            socket.send(command.GETMOVES + " " + id2pos(id));
        }
    }

    if(possibleMoves != -1)
    {
        for(i = 0; i < possibleMoves.length; i++)    // reset field backgrounds
        {
            let field = document.getElementById(playField[possibleMoves[i]]);
            field.style.backgroundColor = "#00000000";
        }

        possibleMoves = -1
    }
}

function updateBoard()
{
    for(i = 1; i < msgArray.length; i++)
    {
        if(msgArray[i][0] == color.BLACK)
        {
            switch(msgArray[i][1])
            {
                case piece.PAWN:
                    document.getElementById(playField[i-1] + "img").src = hostname + "/images/black_pawn.png";
                    break;
                case piece.BISHOP:
                    document.getElementById(playField[i-1] + "img").src = hostname + "/images/black_bishop.png";
                    break;
                case piece.KNIGHT:
                    document.getElementById(playField[i-1] + "img").src = hostname + "/images/black_knight.png";
                    break;
                case piece.ROOK:
                    document.getElementById(playField[i-1] + "img").src = hostname + "/images/black_rook.png";
                    break;
                case piece.QUEEN:
                    document.getElementById(playField[i-1] + "img").src = hostname + "/images/black_queen.png";
                    break;
                case piece.KING:
                    document.getElementById(playField[i-1] + "img").src = hostname + "/images/black_king.png";
                    break;
            }
        }
        else if(msgArray[i][0] == color.WHITE)
        {
            switch(msgArray[i][1])
            {
                case piece.PAWN:
                    document.getElementById(playField[i-1] + "img").src = hostname + "/images/white_pawn.png";
                    break;
                case piece.BISHOP:
                    document.getElementById(playField[i-1] + "img").src = hostname + "/images/white_bishop.png";
                    break;
                case piece.KNIGHT:
                    document.getElementById(playField[i-1] + "img").src = hostname + "/images/white_knight.png";
                    break;
                case piece.ROOK:
                    document.getElementById(playField[i-1] + "img").src = hostname + "/images/white_rook.png";
                    break;
                case piece.QUEEN:
                    document.getElementById(playField[i-1] + "img").src = hostname + "/images/white_queen.png";
                    break;
                case piece.KING:
                    document.getElementById(playField[i-1] + "img").src = hostname + "/images/white_king.png";
                    break;
            }
        }
        else
            document.getElementById(playField[i-1] + "img").src = hostname + "/images/blank.png";
    }
}

function showMoves()
{
    for(i = 1; i < msgArray.length; i++)
        possibleMoves[i-1] = msgArray[i];

    for(i = 0; i < possibleMoves.length; i++)    // set color of potential destinations
    {
        let field = document.getElementById(playField[possibleMoves[i]]);
        field.style.backgroundColor = "#ff000080";
    }
}

function id2pos(aId)
{
    for(i = 0; i < playField.length; i++)
    {
        if(playField[i] == aId)
            return i;
    }
}