
var textList = [
    "t1", "t2", "t3", "t4", "t5",
    "t6", "t7", "t8", "t9", "t10",
    "t11", "t12", "t13", "t14", "t15",
    "t16", "t17", "t18", "t19", "t20",
    "t21", "t22", "t23", "t24", "t25"
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
	    tileobj = function (node) {
		return {
		    isOn: false,
		    tagid: node.id,
		    toggleOn: function(){
			if (this.isOn === false) {
			    this.isOn = true;
			    node.style.background = "red";
			} else {
			    this.isOn = false;
			    node.style.background = "initial";
			}
		    },
		    changeText: function(text){
			node.innerHTML = text;
		    }
		};
	    }(newtile);
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
