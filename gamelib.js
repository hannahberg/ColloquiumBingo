
default_desc = "";

var textList = [
    ["Student falls asleep", "At least 5 seconds with eyes closed"],
    ["Professor falls asleep", "At least 5 seconds with eyes closed"],
    ["Grad student eats weird food","Up to interpretation. Anything that doesn't seem like a common food to bring to a talk"],
    ["Atherton is inappropriately amused", "This includes turning around and smirking at the nearest grad student"],
    ["Beauchaminn and Staii whisper",default_desc],
    ["Tobin asks great question",default_desc],
    ["Lang reinforces how old he is",default_desc],
    ["Train rattles colloquium room",default_desc],
    ["Sliwa is visibly enraged or confused",default_desc],
    ["Undergrads do homework in the back","Or doing anything on a laptop really"],
    ["Colloquium runs over time", "Must go over one hour, including Q&A"],
    ["Olum strokes beard",default_desc],
    ["Speaker nails tough question", "If you don't understand the question, it counts as tough"],
    ["Speaker makes joke...silence",default_desc],
    ["Reference to the standard model",default_desc],
    ["Reference to the LHC",default_desc],
    ["Reference to dark matter/energy",default_desc],
    ["\"___ would fundamentally change our understanding of ___\"","Any comment that implies some groundbreaking idea would challenge a well-established concept in physics"], 
    ["Pop culture reference",default_desc],
    ["Speaker goes back at least 4 slides", "\"As we saw in the previous slide...\" *click* *click* *click*"],
    ["Quote by famous physicst", "If you know who they are, it counts"], 
    ["Stolen theory credited to actual source", "Credit where credit is due. Isn't that right, Mr. Edison?"],
    ["Speaker claims talk is \"introductory level\"", "Sure it is"],
    ["Atherton nods vigorously", "Doesn't he get tired?"],
    ["Unlabeled or indecipherable graph", "Indecipherable could mean either way too much or way too little information"],
    ["Undergrad asks question in second half","More than 30 minutes in"],
    ["Image of famous physicist",default_desc],
    ["Professor leaves early","Leaving and coming back doesn't count"],
    ["Cebe asks a question",default_desc],
    ["Sliwa laughs/smiles/makes a joke",default_desc],
    ["Question preceded by long-winded backstory", "\"So, when I was working on (insert topic) at (insert prestegious university), we found that...\""],
    ["Beauchemin is skeptical","Must be expressed verbally"],
    ["5 or more equations on one slide", "Just stop"],
    ["8 or more variables in one equation", "Makes perfect sense"],
    ["Kenneth Lang variety hour", "Anything odd"],
];

/* Retired Options
    ["Phys 13 students \"encouraged\" to attend",""]

*/

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
		    description: default_desc,
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
			node.innerHTML = text[0];
			this.description = text[1];
		    }
		};
	    }(newtile, i, j);
	    newtile.onclick = function(tobj) {
		return tobj.toggleOn;
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

function writeTiles(element) {
    tilelist = document.createElement("ul");
    tilelist.id = "tilelist";
    tilelist.appendChild(document.createTextNode(""));
    for (i=0; i < textList.length; i++) {
	tile = document.createElement("li");
	tile.className = "tileinfo";

	tilename = document.createElement("span");
	tilename.appendChild(document.createTextNode(
	    '"' + textList[i][0] + '" '
	));
	tilename.className = "tilename";

	tiledesc = document.createElement("span");
	tiledesc.appendChild(document.createTextNode(
	    textList[i][1]
	));
	tiledesc.className = "tiledesc";

	tile.appendChild(tilename);
	tile.appendChild(tiledesc);
	tilelist.appendChild(tile);
    }
    element.appendChild(tilelist);
}
