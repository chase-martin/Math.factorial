// A (very slow) factorial algorithm
// Uses an Adaptive Order Y Combinator pattern (http://en.wikipedia.org/wiki/Y_combinator)
// Adapted in part from a Y Combinator example in Douglas Crockfords "The Little JavaScripter"
// See FactorialAlgorithmComparisionTests.js in this repo for more efficient algorithms
// An iterative approach using memoization proved fastest by far in the above tests

Math.factorial = (function callRecursively(factorialFunction) {
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

// Iterative algorithm using memoization
// This algorithm proved the fastest in my testing
// See FactorialAlgorithmComparisionTests.js in this repo
Math.mFactorial = function(n) {
	this.facts = this.facts || [];
	if (n==0 || n==1) {
		return 1;
	}
	if(this.facts[n]>0) {
		return this.facts[n];
	} else {
		return this.facts[n] = memoizationFactorial(n-1)*n;
	}
};
