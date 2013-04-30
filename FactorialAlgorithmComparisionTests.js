// Test of several factorial methods  

//Applicative Order Y Combinator
var factorial = (function callRecursively(factorialFunction) {
	return (function (f) {
		return f(f); 
	}(function (f) {
		return factorialFunction(function (x) {
			return f(f)(x);
		});
	}));
})(function (_factorial) {
	return function (n) { return n <= 2 ? n : n * _factorial(n - 1); };
});

// Memoization method (saved results make subsequent calls faster)
var facts = [];
function memoizationFactorial(n) {
	if (n==0 || n==1) {
		return 1;
	}
	if(facts[n]>0) {
		return facts[n];
	} else {
		return facts[n] = memoizationFactorial(n-1)*n;
	}
}

// Fast iterative method (no recursion)
function iterativeFactorial(n){
    var result = 1;
    for (var i = 2; i <= n; i++) {
		result = result * i;
	}   
    return result;
}

// Recursive factorial (slower but still better than Y Combinator)
function recursiveFactorial(n) {
    if (n === 0) { return 1; }
    else { return n * recursiveFactorial( n - 1 ); }
}

// The first 100 factorials
var vals = [1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600, 6227020800, 87178291200, 1307674368000, 20922789888000, 355687428096000, 6402373705728000, 121645100408832000, 2432902008176640000, 51090942171709440000, 1.1240007277776077e+21, 2.585201673888498e+22, 6.204484017332394e+23, 1.5511210043330986e+25, 4.0329146112660565e+26, 1.0888869450418352e+28, 3.0488834461171384e+29, 8.841761993739701e+30, 2.6525285981219103e+32, 8.222838654177922e+33, 2.631308369336935e+35, 8.683317618811886e+36, 2.9523279903960412e+38, 1.0333147966386144e+40, 3.719933267899012e+41, 1.3763753091226343e+43, 5.23022617466601e+44, 2.0397882081197442e+46, 8.159152832478977e+47, 3.3452526613163803e+49, 1.4050061177528798e+51, 6.041526306337383e+52, 2.6582715747884485e+54, 1.1962222086548019e+56, 5.5026221598120885e+57, 2.5862324151116818e+59, 1.2413915592536073e+61, 6.082818640342675e+62, 3.0414093201713376e+64, 1.5511187532873822e+66, 8.065817517094388e+67, 4.2748832840600255e+69, 2.308436973392414e+71, 1.2696403353658276e+73, 7.109985878048635e+74, 4.052691950487722e+76, 2.350561331282879e+78, 1.3868311854568986e+80, 8.320987112741392e+81, 5.075802138772248e+83, 3.146997326038794e+85, 1.98260831540444e+87, 1.2688693218588417e+89, 8.247650592082472e+90, 5.443449390774431e+92, 3.647111091818868e+94, 2.4800355424368305e+96, 1.711224524281413e+98, 1.197857166996989e+100, 8.504785885678622e+101, 6.123445837688608e+103, 4.4701154615126834e+105, 3.3078854415193856e+107, 2.480914081139539e+109, 1.8854947016660498e+111, 1.4518309202828584e+113, 1.1324281178206295e+115, 8.946182130782973e+116, 7.156945704626378e+118, 5.797126020747366e+120, 4.75364333701284e+122, 3.945523969720657e+124, 3.314240134565352e+126, 2.8171041143805494e+128, 2.4227095383672724e+130, 2.107757298379527e+132, 1.8548264225739836e+134, 1.6507955160908452e+136, 1.4857159644817607e+138, 1.3520015276784023e+140, 1.24384140546413e+142, 1.1567725070816409e+144, 1.0873661566567424e+146, 1.0329978488239052e+148, 9.916779348709491e+149, 9.619275968248206e+151, 9.426890448883242e+153, 9.33262154439441e+155, 9.33262154439441e+157];


// Test each function in an array exactly calls number of times
// Time each test and log results to the console
function test(funs, calls) {
	var results = [];
	
	function testloop(fn) {
		for(x in vals) {
			var num = parseInt(x,10) + 1;
			if(fn[1](num)+"" != vals[x]+"") {
				console.log("Error: " + fn[0] + "(" + num + ") !== " + vals[x]);
			}
		}
		return true;
	}
	for(fn in funs) {
		var t1 = Date.now();
		for(var i = 0; i < calls; i++) {
			testloop(funs[fn]);
		}
		var t2 = Date.now();
		results.push([(t2 - t1), funs[fn][0] + " : " + (t2 - t1) + "ms"]);
		
	}
	results.sort(function(a,b){ return a[0]-b[0]; });
	console.log("");
	console.log("TEST " + calls + "x:");
	console.log("FUNCTION               RUNTIME");
	for(r in results) {
		console.log(results[r][1]);
	}
};
// Set up function array for pretty console.logging 
var farray = [
	["Math.factorial      ", factorial1],
	["IterativeFactorial  ", iterativeFactorial],
	["RecursiveFactorial  ", recursiveFactorial],
	["MemoizationFactorial", memoizationFactorial]	
]
// 1 test is not informative enough so lets try 10 calls, and just to see how each scales, we'll also do a 100x test.
test(farray, 1);
test(farray, 10);
test(farray, 100);
