
default_desc = "";

var textList = [
//    ["Student falls asleep", "At least 5 seconds with eyes closed"],
    ["Audience member obviously asleep", default_desc],
    ["Audience member eating/drinking excessively loudly", default_desc],
//    ["Luciano raises his hand", default_desc],
//    ["Rick claims he already solved the problem or discovered new physics", default_desc],
//    ["Speaker makes a joke & no one laughs", default_desc],
    ["<i>''...if you make this simple model...''</i>", default_desc],
    ["<i>''I would like to thank the organizers for having me here...''</i>", default_desc],
    ["Audience member:<br><i>''This might be a very technical question, but...''</i>", default_desc],
    ["Phone rings and owner can't turn it off", default_desc],
    ["<i>''Thank you for a very nice presentation''</i>, then tears holes in it", default_desc],
    ["Every speaker in session is male and over 50",default_desc],
    ["<i>''I have one very simple/quick question...''</i>",default_desc],
    ["<i>''Isn't it really just constant-temperature?''</i>",default_desc],
    ["Possible violation of Brink-Axel explained away",default_desc],
    ["All speakers in a session are female = INSTANT WIN",default_desc],
    ["Speaker references a talk yet to happen",default_desc],
    ["Data normalization doesn't make sense",default_desc],
    ["Isoscalar & Isovector are used but not defined",default_desc],
    ["Gamma-Strength & Photon-Strength are used interchangeably",default_desc],
    ["Speaker doesn't look once at audience after title slide",default_desc],
    ["Speaker changes slide when trying to use laser pointer",default_desc],
    ["Dates on slides are clearly from prior year's workshop",default_desc],    
    ["Axes have no units",default_desc],
    ["Axes have confusing labels",default_desc],
    ["<i>''Thank you for this <i><b>interesting</b></i> talk''</i>",default_desc],
    ["Audience member gets defensive",default_desc],
    ["Audience member has no actual question",default_desc],
    ["Obviously old version of speaker's slides",default_desc],
    ["Audience member having audible conversation",default_desc],
    [">2x as many slides as minutes",default_desc],
    ["Speaker asks audience not to be disappointed",default_desc],
    ["<i>''...not so simple...''</i>",default_desc],
    ["Comic Sans text",default_desc],
    ["All red & blue text",default_desc],
    ["Speaker did not consider audience when making slides",default_desc],
    ["Spaghetti plots",default_desc],
    ["Deliberately snarky comments",default_desc],
    ["Illegibly tiny fonts",default_desc],
    ["Obvious low-res screenshot of figure",default_desc],
    ["Repeated use of <i>''um...''</i>",default_desc],
    ["Speaker wastes 5 minutes explaining outline",default_desc],
    ["Laptop/technical malfunction",default_desc],
    ["Blatant typo",default_desc],
    ["Audience member is making their own slides",default_desc],
    ["&Delta;E vs. E plot that doesn't actually show anything",default_desc],
    ["<i>''Beyond the scope of this work''</i>",default_desc],
    ["Audience member is writing a paper",default_desc],
//    ["",default_desc],
//    ["",default_desc],
//    ["Grad student eats weird food","Up to interpretation. Anything that doesn't seem like a common food to bring to a talk"],
//    ["Professor is inappropriately amused", "This includes turning around and smirking at the nearest grad student"],
//    ["Two professors whisper",default_desc],
    ["Somebody actually asks a great question",default_desc],
    ["Speaker reinforces how old they are",default_desc],
//    ["Professor is visibly enraged or confused",default_desc],
//    ["Undergrads do homework in the back","Or doing anything on a laptop really"],
    ["Speaker promises they are <i>''almost done''</i>",default_desc],
    ["<i>''I have just a few more slides...''</i>",default_desc],
//    ["Colloquium runs over time", "Must go over one hour, including Q&A"],
//    ["Professor strokes beard",default_desc],
    ["Speaker insults others in their field", "Indirect or implied insult is allowed"],
//    ["Speaker nails tough question", "If you don't understand the question, it counts as tough"],
//    ["Speaker makes joke...silence",default_desc],
//    ["Reference to the standard model",default_desc],
//    ["Reference to the LHC",default_desc],
//    ["Reference to dark matter/energy",default_desc],
//    ["Reference to quantum gravity", default_desc],
//    ["Reference to the CMB", "Cosmic Microwave Background"],
    ["<i>\"___ would fundamentally change our understanding of ___\"</i>","Any comment that implies some groundbreaking idea would challenge a well-established concept in physics"], 
    ["Cringe-worthy pop culture reference",default_desc],
    ["Speaker goes back at least 4 slides", "\"As we saw in the previous slide...\" *click* *click* *click*"],
    ["Quote by famous physicist", "If you know who they are, it counts"], 
//    ["Stolen theory credited to actual source", "Credit where credit is due."],
    ["Speaker claims talk is \"introductory level\"", "Sure it is"],
    ["Audience member nods vigorously", "How have they not sprained their neck?"],
//    ["Unlabeled or indecipherable graph", "Indecipherable could mean either way too much or way too little information"],
//    ["Undergrad asks question in second half","More than 30 minutes in"],
    ["Image of famous physicist",default_desc],
//    ["Professor leaves early","Leaving and coming back doesn't count"],
    ["Question preceded by long-winded backstory", "\"So, when I was working on (insert topic) at (insert prestegious university), we found that...\""],
//    ["Professor is skeptical","Must express skepticism, usually in a question."],
    ["5 or more equations on one slide", "Paul: Just Stop"],
//    ["8 or more variables in one equation", "Makes perfect sense"],
];


var freeList = [
    ["Luciano raises his hand"],
    ["Rick claims he already solved the problem or discovered new physics"],
    ["Speaker makes a joke & no one laughs"],
//    [" "]
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
    myText = randomizeList(freeList);
    for(i=0; i<5; i++) {
	for(j=0; j<5; j++) {
	    if (!(i === 2 && j === 2)){
		tileList[i][j].changeText(shuffledtext[i*5+j]);
	    }
	    else{
//	     myText = randomizeList(textList);
//	     myText = ["Free:",""]+ randomizeList(freeList)
//		tileList[i][j].changeText(["Free: "+"rrrg"]);
		tileList[i][j].changeText(["<b>Free:</b><br> "+myText[0]]);
//		tileList[i][j].changeText(concat(["Free:"],myText[0]));
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
	if (text[0] == "Comic Sans text") {
//	this.node.innerHTML = '<font face = "Comic Sans MS" size =" 5"><b>Comic Sans text</b></font>';	
//	this.node.innerHTML = '<font family = "myCustomFont2" size =" 5"><b>Comic Sans text</b></font>';
//	this.node.innerHTML = '<font family = "cursive" size =" 5">Comic Sans Neue text</font>';
	this.node.innerHTML = '<font  size =" 5"><b>Comic Sans text</b></font>';
//	this.node.style.fontFamily = "arial";
	this.node.style.fontFamily = "Comic Sans MS";
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	  // some code..
	  this.node.style.fontFamily = "Chalkboard SE" ,"Comic Sans MS",  "Comic Sans MS", "Chalkboard SE" , "ComicNeue", "cursive", "Comic Sans MS";
	  }
	}
	else if (text[0] == "Illegibly tiny fonts") {
	this.node.innerHTML = '<font size =" -5"><sub><sup>Illegibly tiny fonts</sup></sub></font>';
	}
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
