
function createBoard () {
    boardwrapper = document.getElementById("gameboard");
    board = document.createElement("table");
    boardwrapper.appendChild(board);
    for(i=0; i < 5; i++) {
	row = document.createElement("tr");
	board.appendChild(row);
	for(j=0; j < 5; j++) {
	    row.appendChild(newTileNode(""));
	}
    }
}

function newTileNode (text) {
    tile = document.createElement("td");
    tile.appendChild(document.createTextNode(text));
    tile.className = "gametile";
    tile.onclick = TileOnClick;
    return tile;
}

function TileOnClick () {
    window.alert("It works!");
}
