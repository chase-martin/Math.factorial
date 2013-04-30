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
