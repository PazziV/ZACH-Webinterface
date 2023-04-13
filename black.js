//------------------------Variables------------------------
const command = {
    RESET: 0,
    SYNC: 1,
    GETMOVES: 2,
    MOVE: 3,
    CALIBRATE: 4
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

const playField = ["A1","B1","C1","D1","E1","F1","G1","H1",
					"A2","B2","C2","D2","E2","F2","G2","H2",
					"A3","B3","C3","D3","E3","F3","G3","H3",
					"A4","B4","C4","D4","E4","F4","G4","H4",
					"A5","B5","C5","D5","E5","F5","G5","H5",
					"A6","B6","C6","D6","E6","F6","G6","H6",
					"A7","B7","C7","D7","E7","F7","G7","H7",
					"A8","B8","C8","D8","E8","F8","G8","H8"];

let possibleMoves = [-1];

let selectedPiece = -1;

//-------------------------Socket--------------------------
const socket = new WebSocket("ws://" + location.hostname + ":9002");

socket.onopen = function(e)
{
    console.log("[open] Connection established");
    syncBoard();
};

socket.onmessage = function(event) 
{
    let message = event.data;
    console.log("[message] Data received from server: " + message);
        
    msgArray = message.split(" ");

    switch(parseInt(msgArray[0]))
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
        case command.CALIBRATE:
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
    if(possibleMoves.includes(String(id2pos(id))))
    {
        console.log("[Move] Sending: " + command.MOVE + " " + id2pos(selectedPiece) + " " + id2pos(id));
        socket.send(command.MOVE + " " + id2pos(selectedPiece) + " " + id2pos(id));

        document.getElementById(id + "img").textContent = document.getElementById(selectedPiece + "img").textContent;
        document.getElementById(selectedPiece + "img").textContent = " ";
    }
    else
    {
        if(document.getElementById(id + "img").textContent != " ")
        {
            selectedPiece = id
            console.log("[Show Moves] Sending: " + command.GETMOVES + " " + id2pos(id));
            socket.send(command.GETMOVES + " " + id2pos(id));
        }
    }

    if(possibleMoves != [-1])
    {
        for(i = 0; i < possibleMoves.length; i++)    // reset field backgrounds
        {
            let field = document.getElementById(playField[possibleMoves[i]] + "img");
            field.style.backgroundColor = "#00000000";
        }

        possibleMoves = [-1];
    }
}

function updateBoard()
{
    for(i = 1; i < msgArray.length; i++)
    {
        if(parseInt(msgArray[i][0]) == color.BLACK)
        {
            switch(parseInt(msgArray[i][1]))
            {
                case piece.PAWN:
                    document.getElementById(playField[i-1] + "img").innerHTML = "&#9823;";
                    break;
                case piece.BISHOP:
                    document.getElementById(playField[i-1] + "img").innerHTML = "&#9821;";
                    break;
                case piece.KNIGHT:
                    document.getElementById(playField[i-1] + "img").innerHTML = "&#9822;";
                    break;
                case piece.ROOK:
                    document.getElementById(playField[i-1] + "img").innerHTML = "&#9820;";
                    break;
                case piece.QUEEN:
                    document.getElementById(playField[i-1] + "img").innerHTML = "&#9819;";
                    break;
                case piece.KING:
                    document.getElementById(playField[i-1] + "img").innerHTML = "&#9818;";
                    break;
            }
        }
        else if(parseInt(msgArray[i][0]) == color.WHITE)
        {
            switch(parseInt(msgArray[i][1]))
            {
                case piece.PAWN:
                    document.getElementById(playField[i-1] + "img").innerHTML = "&#9817;";
                    break;
                case piece.BISHOP:
                    document.getElementById(playField[i-1] + "img").innerHTML = "&#9815;";
                    break;
                case piece.KNIGHT:
                    document.getElementById(playField[i-1] + "img").innerHTML = "&#9816;";
                    break;
                case piece.ROOK:
                    document.getElementById(playField[i-1] + "img").innerHTML = "&#9814;";
                    break;
                case piece.QUEEN:
                    document.getElementById(playField[i-1] + "img").innerHTML = "&#9813;";
                    break;
                case piece.KING:
                    document.getElementById(playField[i-1] + "img").innerHTML = "&#9812;";
                    break;
            }
        }
        else
            document.getElementById(playField[i-1] + "img").textContent = " ";
    }
}

function showMoves()
{
    for(i = 1; i < msgArray.length; i++)
        possibleMoves[i-1] = msgArray[i];

    for(i = 0; i < possibleMoves.length; i++)    // set color of potential destinations
    {
        let field = document.getElementById(playField[possibleMoves[i]] + "img");
        field.style.backgroundColor = "#ff000080";
    }
}

function calibrateMagnet()
{
    console.log("[CALIBRATE] Sending: " + command.CALIBRATE);
    socket.send(command.CALIBRATE);
}

function id2pos(aId)
{
    for(i = 0; i < playField.length; i++)
    {
        if(playField[i] == aId)
            return i;
    }
}
