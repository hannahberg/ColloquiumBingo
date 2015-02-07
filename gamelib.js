
var textList = [
    "Student falls asleep",
    "Professor falls asleep",
    "Grad student eats weird food",
    "Atherton is inappropriately amused",
    "Beauchaminn and Staii whisper",
    "Tobin asks great question",
    "Kenneth Lang variety hour",
    "Lang reinforces how old he is",
    "Train rattles colloquium room",
    "Sliwa is visibly enraged or confused",
    "Undergrads do homework in the back",
    "Phys 13 students \"encouraged\" to attend",
    "Colloquium goes over",
    "Olum strokes beard",
    "Speaker nails tough question",
    "Speaker makes joke...silence",
    "Reference to the standard model",
    "Reference to the LHC",
    "\"___ would fundamentally change our understanding of ___\"", 
    "Pop culture reference",
    "Speaker goes back more than 3 slides",
    "Quote by famous physicst", 
    "Stolen theory credited to actual source",
    "Speaker claims talk is \"introductory level\"",
    ""
];

var tileList=[[],[],[],[],[]];

function randomizeList(list) {
    arrcpy = list.concat();
    for (i=0; i < list.length; i++) {
	rind = Math.floor(Math.random()*arrcpy.length);
	console.log(rind);
	tmp = arrcpy[rind];
	arrcpy[rind] = arrcpy[i];
	arrcpy[i] = tmp;
    }
    return arrcpy;
}

function createBoard () {
    boardwrapper = document.getElementById("gameboard");
    board = document.createElement("table");
    boardwrapper.appendChild(board);

    for(i=0; i < 5; i++) {
	row = document.createElement("tr");
	board.appendChild(row);
	for(j=0; j < 5; j++) {
	    newtile = newTileNode(i, j);
	    row.appendChild(newtile);
	    tileobj = function (node, ni, nj) {
		return {
		    isOn: false,
		    tagid: node.id,
		    toggleOn: function(){
			if (this.isOn === false) {
			    this.isOn = true;
			    node.style.background = "red";
			    if (checkWin(ni, nj)) {
				window.alert("BINGO!");
			    };
			} else {
			    this.isOn = false;
			    node.style.background = "initial";
			}
		    },
		    changeText: function(text){
			node.innerHTML = text;
		    }
		};
	    }(newtile, i, j);
	    newtile.onclick = function(tobj) {
		return function(){ tobj.toggleOn() };
	    }(tileobj);
	    tileList[i][j] = tileobj;	    
	}
    }
}

function resetBoard() {
    shuffledtext = randomizeList(textList);
    for(i=0; i<5; i++) {
	for(j=0; j<5; j++) {
	    tileList[i][j].changeText(shuffledtext[i*5+j]);
	    if(tileList[i][j].isOn) {
		tileList[i][j].toggleOn();
	    }
	}
    }
}

function newTileNode (i, j) {
    tile = document.createElement("td");
    tile.appendChild(document.createTextNode(""));
    tile.className = "gametile";
    tile.id = "tile"+i+j;
    return tile;
}

function checkWin(ni, nj) {
    function chk(idir, jdir, i, j) {
	if (i < 0 || i > 4 ||
	    j < 0 || j > 4) {
	    return 0;
	}
	if (tileList[i][j].isOn) {
	    return 1 + chk(idir, jdir, i+idir, j+jdir);
	}
	else {
	    return 0
	}
    }

    if (chk(1,0,ni,nj) + chk(-1,0,ni,nj) - 1 === 5) {
	return true;
    }
    if (chk(0,1,ni,nj) + chk(0,-1,ni,nj) - 1 === 5) {
	return true;
    }
    if (chk(1,1,ni,nj) + chk(-1,-1,ni,nj) - 1 === 5) {
	return true;
    }
    if (chk(1,-1,ni,nj) + chk(-1,1,ni,nj) - 1 === 5) {
	return true;
    }
    return false;
}
