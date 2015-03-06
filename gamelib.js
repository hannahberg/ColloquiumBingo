
default_desc = "";

var textList = [
    ["Student falls asleep", "At least 5 seconds with eyes closed"],
    ["Professor falls asleep", "At least 5 seconds with eyes closed"],
    ["Grad student eats weird food","Up to interpretation. Anything that doesn't seem like a common food to bring to a talk"],
    ["Professor is inappropriately amused", "This includes turning around and smirking at the nearest grad student"],
    ["Two professors whisper",default_desc],
    ["Professor asks great question",default_desc],
    ["Professor reinforces how old they are",default_desc],
    ["Professor is visibly enraged or confused",default_desc],
    ["Undergrads do homework in the back","Or doing anything on a laptop really"],
    ["Colloquium runs over time", "Must go over one hour, including Q&A"],
    ["Professor strokes beard",default_desc],
    ["Speaker insults others in their field", "Indirect or implied insult is allowed"],
    ["Speaker nails tough question", "If you don't understand the question, it counts as tough"],
    ["Speaker makes joke...silence",default_desc],
    ["Reference to the standard model",default_desc],
    ["Reference to the LHC",default_desc],
    ["Reference to dark matter/energy",default_desc],
    ["Reference to quantum gravity", default_desc],
    ["Reference to the CMB", "Cosmic Microwave Background"],
    ["\"___ would fundamentally change our understanding of ___\"","Any comment that implies some groundbreaking idea would challenge a well-established concept in physics"], 
    ["Pop culture reference",default_desc],
    ["Speaker goes back at least 4 slides", "\"As we saw in the previous slide...\" *click* *click* *click*"],
    ["Quote by famous physicist", "If you know who they are, it counts"], 
    ["Stolen theory credited to actual source", "Credit where credit is due."],
    ["Speaker claims talk is \"introductory level\"", "Sure it is"],
    ["Professor nods vigorously", "How have they not sprained their neck?"],
    ["Unlabeled or indecipherable graph", "Indecipherable could mean either way too much or way too little information"],
    ["Undergrad asks question in second half","More than 30 minutes in"],
    ["Image of famous physicist",default_desc],
    ["Professor leaves early","Leaving and coming back doesn't count"],
    ["Question preceded by long-winded backstory", "\"So, when I was working on (insert topic) at (insert prestegious university), we found that...\""],
    ["Professor is skeptical","Must express skepticism, usually in a question."],
    ["5 or more equations on one slide", "Just stop"],
    ["8 or more variables in one equation", "Makes perfect sense"],
];

/* Retired Options
    ["Phys 13 students \"encouraged\" to attend",default_desc]
    ["Train rattles colloquium room",default_desc],
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
	    tileobj = new Tile(i, j);
	    tileList[i][j] = tileobj;
	    row.appendChild(tileobj.node);
	}
    }
}

function resetBoard() {
    shuffledtext = randomizeList(textList);
    for(i=0; i<5; i++) {
	for(j=0; j<5; j++) {
	    if (!(i === 2 && j === 2)){
		tileList[i][j].changeText(shuffledtext[i*5+j]);
	    }
	    if(tileList[i][j].isOn) {
		tileList[i][j].toggleOn();
	    }
	}
    }
}

function Tile (i, j) {
    this.node = document.createElement("td");
    this.node.appendChild(document.createTextNode(""));
    this.node.className = "gametile";
    this.node.id = "tile"+i+j;

    this.isOn = false;
    this.description = default_desc;

    this.toggleOn = function(){
	if (this.isOn === false) {
	    this.isOn = true;
	    this.node.style.background = "red";
	    if (checkWin(i, j)) {
		window.alert("BINGO!");
	    };
	} else {
	    this.isOn = false;
	    this.node.style.background = "white";
	}
    };

    this.changeText = function(text){
	this.node.innerHTML = text[0];
	this.description = text[1];
    };

    this.node.onclick = function(obj){
	return function(){ obj.toggleOn() };
    }(this);
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
