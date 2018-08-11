//
function myFunction() {
	control = 0;
	blah = parseInt(document.getElementById("blockSize").value);
	huff(blah, false);
}

function huff(blockSize, repeat) {
	// Read in word
	var input = document.getElementById("myText").value.toLowerCase().replace(/\s/g, "_");
	if (input.length/blockSize < 2) {
		document.getElementById("demo1").innerHTML = "<p>The characters/block must be " + Math.floor(input.length/2) + " or less for the given input.  Please try again.</p>";
		for (y in divs) {
			console.log(y);
			document.getElementById(divs[y]).innerHTML = "<p></p>";
		}
		return;
	} else {
		document.getElementById("demo1").innerHTML = "";
	}
	// count characters for their frequency
	var freq = {};
	var index = 0;
	
	for (var i = 0; i < input.length; i+=blockSize) {
    	var block = input.substring(i, i+blockSize);
    	if (block in freq) {
    		freq[block]++;
    	} else {
    		freq[block] = 1;
    	}
	}
	
	//document.getElementById("demo1").innerHTML = JSON.stringify(freq);
	
	/*testing = new Tree(1);
	testing.add(2, 1, testing.traverseDF);
	testing.add(3, 2, testing.traverseDF);
	testing.add(4, 2, testing.traverseDF);
	testing.add(5, 1, testing.traverseDF);
	testing.add(6, 5, testing.traverseDF);
	testing.print();*/
	var queue = [];
	var filler;
	var blocks = [];
	var numLetters = 0;
	for (z in freq) { 
    	filler = new Node(z + ", " + freq[z]);
    	blocks[numLetters] = z;
    	queue[numLetters] = filler;
    	numLetters++;
	}

	var letters = [];
	for (var i = 0; i < input.length; i++) {
    	var block = input.substring(i, i+1);
    	if (letters.includes(block)) {
    		
    	} else {
    		letters.push(block);
    	}
	}
	var bin = [];
	for (var i = 0; i < letters.length; i++) {
		if (bin[i] == null) {
			bin[i] = i.toString(2)
		}
		if (bin[i].length < Math.ceil(Math.log2(letters.length))) {
			bin[i] = "0" + bin[i];
			i--;
		}
	}
	scale(numLetters + 0);
	printAll(queue, control);
	queue.sort(function(a, b){return parseInt((a.hasOwnProperty("_root") ? a._root : a).data.substring((a.hasOwnProperty("_root") ? a._root : a).data.length - 2, (a.hasOwnProperty("_root") ? a._root : a).data.length)) - parseInt((b.hasOwnProperty("_root") ? b._root : b).data.substring((b.hasOwnProperty("_root") ? b._root : b).data.length - 2, (b.hasOwnProperty("_root") ? b._root : b).data.length))}).reverse();
	if (!repeat) {
		control++;
		printAll(queue, control);
	}
	for (var i = 0; i < numLetters - 1; i++) {
		// Sort the queue
		queue.sort(function(a, b){return parseInt((a.hasOwnProperty("_root") ? a._root : a).data.substring((a.hasOwnProperty("_root") ? a._root : a).data.length - 2, (a.hasOwnProperty("_root") ? a._root : a).data.length)) - parseInt((b.hasOwnProperty("_root") ? b._root : b).data.substring((b.hasOwnProperty("_root") ? b._root : b).data.length - 2, (b.hasOwnProperty("_root") ? b._root : b).data.length))}).reverse();
		
		var x = queue.pop();
		if (x.hasOwnProperty("_root")) {
			x = x._root;
		}
		var y = queue.pop();
		if (y.hasOwnProperty("_root")) {
			y = y._root;
		}
		
		var freqSum = (parseInt(x.data.substring(x.data.length - 2, x.data.length)) + parseInt(y.data.substring(y.data.length - 2, y.data.length)));
		var zData = x.data.substring(0, x.data.length - 2) + y.data.substring(0, y.data.length - 2) + " " + freqSum;
		var tree = new Tree(zData);
		tree.add(x, zData, tree.traverseDF);
		tree.add(y, zData, tree.traverseDF);
		queue.push(tree);
		scale(queue.length)
		if (i < 2 && !repeat) {
			control++;
			printAll(queue, control);
		}
		/*control++;
		printAll(queue, control);*/
	}
	control++;
	printAll(queue, control);
	
	
	var complete = queue.pop();
	complete.encode();
	var someString = "";
	var huffSize = [];
	for (var i = 0; i < blocks.length; i++) {
		var code = complete.find(blocks[i], complete.traverseDF);
    	someString += blocks[i] + ": " + code.encoded + "</br>";
    	//console.log(blocks[i] + ": " + code.encoded);
    	huffSize[i] = code.encoded.length;
	}
	someString += "</br>So the string \"" + input + "\" becomes ";
	var huffEncoded = "";
	for (var i = 0; i < input.length; i+=blockSize) {
		var block = input.substring(i, i+blockSize);
		//console.log(block.length);
		var code = complete.find(block, complete.traverseDF);
		//console.log(code);
    	someString += code.encoded;
    	huffEncoded += code.encoded;
	}
	control++;
	document.getElementById(divs[control]).innerHTML = words[control] + "<p>" + someString + "</p>";
	
	someString = "";
	for (var i = 0; i < letters.length; i++) {
		var code = bin[i];
    	someString += letters[i] + ": " + code + "</br>";
	}
	someString += "</br>So the string \"" + input + "\" would have been ";
	var binEncoded = "";
	for (var i = 0; i < input.length; i++) {
		var q = findIndex(letters, input.substring(i, i+1));
		var code = bin[q];
    	someString += code;
    	binEncoded += code;
	}
	control++;
	document.getElementById(divs[control]).innerHTML = words[control] + Math.ceil(Math.log2(letters.length)) + " bits/character:</p>" + "<p>" + someString + "</p>";
	
	control++;
	var diff = binEncoded.length - huffEncoded.length;
	var perc = Math.ceil(100*(diff/binEncoded.length));
	var bpc = null;
	for(var i = 0; i < blocks.length; i++) {
		bpc += huffSize[i]*freq[blocks[i]];
	}
	console.log(bpc);
	bpc /= Math.ceil(input.length/blockSize);
	console.log(bpc);
	bpc /= blockSize;
	console.log(bpc);
	bpc = Math.round(100*bpc)/100;
	document.getElementById(divs[control]).innerHTML = "<p>The huffman code was " + diff + " characters smaller, meaning it used " + perc + "% less space with " + bpc + " bits/character</p>";
}

function scale(num) {
	xScale = 1250 / (2*(num+1));
}

function printAll(array, index) {
	var scle = 1;
	var prnt = "";
	var maxI = 0;
	var l = 0;
	for (var k = 0; k < array.length; k++) {
		var size = array[k].depth();
		l += Math.pow(scle, size);
		prnt += array[k].print(xScale+xScale*l, 25);
		l += Math.pow(scle, size);
		if (size > maxI) {
			maxI = size;
		}
	}
	//console.log(maxI);
	document.getElementById(divs[control]).innerHTML = words[index] + "<svg width ='1250' height =" + (yScale*(maxI+1)) + " fill = black>" + prnt + "</svg>";
}

//var text1 = "";
//var text2 = "";
var blah;
var xScale = 50;
var yScale = 25;
var divs = ["demo2", "demo3", "demo4", "demo5", "demo6", "demo7", "demo8", "demo9", "demo10", "demo11", "demo12", "demo13", "demo14", "demo15", "demo16", "demo17"];
var words = ["<p>To start, Huffman codes determine the frequency of every character in the string, and makes nodes.  Here, each node is labeled with a character, and it's corresponding frequency.</p>", "<p>Then we order the nodes from highest-to-lowest frequency in a low priority queue.</p>", "<p>Take the 2 nodes with the smallest frequencies, and make them siblings in a tree.  The parent of these 2 nodes has a frequency equal to the sum of both node's frequencies, and replaces it's children in the queue.</p>", "<p>Repeat the previous 2 steps.</p>", "<p>Continue in this pattern until all the nodes are in 1 tree.</p>", "<p>Now using this tree, we can determine the binary values of each character.  Starting from the parent node, follow the branches until your at a leaf.  Keep track of every branch (0 is left, 1 is right) to find the binary representation of each character.</p>", "<p>Compare this to the encoding of ", "block size 2", "tree", "encoding", "bad encoding of "];
var control = 0;

Node.prototype.print = function(x, y) {
	var text1 = "";
	text1 += "<text text-anchor='middle' x=" + x + " y=" + y + ">" + this.data + "</text>";
	return text1;
}

Tree.prototype.find = function(findData, traversal) {
    var blah = "42", 
    	callback = function(node) {
            if (node.data.substring(0, findData.length) == findData && node.children.length == 0) {
                blah = node;
            }
        };
 
    this.contains(callback, traversal);
    
    return blah;
};

Tree.prototype.encode = function() {
	(function recurse(currentNode, j) {
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            recurse(currentNode.children[i], j+i.toString());
        }
        currentNode.encoded = j;
        //console.log("hi " + currentNode.encoded);
    })(this._root, "");
};

Tree.prototype.print = function(x, y) {
	var scl = 2;
	var text1 = "";
	var text2 = "";
	var j = 0x1;
	var size = null;
	var depth = this.depth();
	var callback = function(node) {
            if (node.parent == null) {
            	node.posY = y;
            	node.posX = x;
            } else {
            	node.posY = node.parent.posY + yScale;
            	var foo = Math.pow(scl, (node.posY/25));
            	//console.log(foo);
            	node.posX = node.parent.posX + (20 + 4*(blah - 1))*(j%2 ? -1 : 1)*Math.pow(scl, depth)/foo;
            	
            	text1 += "<line x1=" + node.posX + " y1=" + node.posY + " x2=" + node.parent.posX + " y2=" + node.parent.posY + " style='stroke:rgb(200,200,200);stroke-width:2' />"
            }
            
            /*text2 += "<rect width='50' height='15' x=" + (node.posX - 25) + " y=" + (node.posY - 12) + " style='fill:rgb(0,255,0);stroke-width:3;stroke:rgb(255,255,255)' />";*/
            text2 += "<text text-anchor='middle' x=" + node.posX + " y=" + node.posY + ">" + node.data + "</text>";
            //console.log(node.data);
        };
	/*(function recurse(currentNode) {
        callback(currentNode);
        j++;
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            recurse(currentNode.children[i]);
        }
        j--;
    })(this._root);*/
    var queue = new Queue();
 
    queue.enqueue(this._root);
 
    currentTree = queue.dequeue();
 	size = currentTree.data.length*6;
    while(currentTree){
        for (var i = 0, length = currentTree.children.length; i < length; i++) {
            queue.enqueue(currentTree.children[i]);
            //j++;
        }
        j++;
        
        callback(currentTree);
        currentTree = queue.dequeue();
    }
    return text1 + text2;
};

Tree.prototype.depth = function() {
	var max = 0;
	(function recurse(currentNode, j) {
        // step 2
        j++;
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            recurse(currentNode.children[i], j);
        }
        if (j > max) {
        	max = j;
        }
    })(this._root, 0);
    return max;
};

Node.prototype.depth = function() {
	return 1;
};

/* the following implementation of a Tree was from
https://code.tutsplus.com/articles/data-structures-with-javascript-tree--cms-23393
*/
function Node(data) {
    this.data = data;
    this.encoded = null;
    this.parent = null;
    this.children = [];
    this.posX = null;
    this.posy = null;
}
 
function Tree(data) {
    var node = new Node(data);
    this._root = node;
}
 
Tree.prototype.traverseDF = function(callback) {
 
    // this is a recurse and immediately-invoking function

    (function recurse(currentNode) {
        // step 2
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            // step 3
            recurse(currentNode.children[i]);
        }
 
        // step 4
        callback(currentNode);
 
        // step 1
    })(this._root);
 
};

Tree.prototype.traverseBF = function(callback) {
    var queue = new Queue();
 
    queue.enqueue(this._root);
 
    currentTree = queue.dequeue();
 
    while(currentTree){
        for (var i = 0, length = currentTree.children.length; i < length; i++) {
            queue.enqueue(currentTree.children[i]);
        }
 
        callback(currentTree);
        currentTree = queue.dequeue();
    }
};

Tree.prototype.contains = function(callback, traversal) {
    traversal.call(this, callback);
};
 
Tree.prototype.add = function(child, toData, traversal) {
    //var child = new Node(data),
        parent = null,
        callback = function(node) {
            if (node.data === toData) {
                parent = node;
            }
        };
 
    this.contains(callback, traversal);
 
    if (parent) {
        parent.children.push(child);
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existent parent.');
    }
};
 
Tree.prototype.remove = function(data, fromData, traversal) {
    var tree = this,
        parent = null,
        childToRemove = null,
        index;
 
    var callback = function(node) {
        if (node.data === fromData) {
            parent = node;
        }
    };
 
    this.contains(callback, traversal);
 
    if (parent) {
        index = findIndex(parent.children, data);
 
        if (index === undefined) {
            throw new Error('Node to remove does not exist.');
        } else {
            childToRemove = parent.children.splice(index, 1);
        }
    } else {
        throw new Error('Parent does not exist.');
    }
 
    return childToRemove;
};
 
function findIndex(arr, data) {
    var index;
 
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === data) {
            index = i;
        }
    }
 
    return index;
}

function Queue() {
    this._oldestIndex = 1;
    this._newestIndex = 1;
    this._storage = {};
}
 
Queue.prototype.size = function() {
    return this._newestIndex - this._oldestIndex;
};
 
Queue.prototype.enqueue = function(data) {
    this._storage[this._newestIndex] = data;
    this._newestIndex++;
};
 
/* the following implementation of a Queue was from
https://code.tutsplus.com/articles/data-structures-with-javascript-stack-and-queue--cms-23348
*/
Queue.prototype.dequeue = function() {
    var oldestIndex = this._oldestIndex,
        newestIndex = this._newestIndex,
        deletedData;
 
    if (oldestIndex !== newestIndex) {
        deletedData = this._storage[oldestIndex];
        delete this._storage[oldestIndex];
        this._oldestIndex++;
 
        return deletedData;
    }
};