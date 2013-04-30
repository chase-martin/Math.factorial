// A (very slow) factorial algorithm
// Uses an Adaptive Order Y Combinator pattern (http://en.wikipedia.org/wiki/Y_combinator)
// Adapted from Douglas Crockfords "The Little JavaScripter": http://javascript.crockford.com/little.html
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
