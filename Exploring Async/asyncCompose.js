// compose the function together !

var async = require('async');

// async.compose(fn1, fn2,...)
// This will make a composition out of the async functions passed in, each function will use the return value of the function that follows.
// So composing a(), b(), c() will produce a(b(c()))

// Adds 5 to num
function addFive (num, callback) {
	callback(null, num + 5);
}

// Multiplies num by 10
function timesTen (num, callback) {
	callback(null, num * 10); // 返回的结果
}

// Compose calculate (addFive(timesTen(5)))

var calculate = async.compose(addFive, timesTen);

calculate (5, function(err, result) {

	console.log(result);
});


// seq calculate (addFive(TimesTen(5)))
var calculate = async.seq(addFive, timesTen);

calculate(5, function(err, result) {

	console.log(result);
});

// compose(fn1, fn2...)

// Creates a function which is a composition of the passed asynchronous functions. Each function consumes the return value of the function that follows. Composing functions f(), g(), and h() would produce the result of f(g(h())), only this version uses callbacks to obtain the return values.

// Each function is executed with the this binding of the composed function.

// Arguments

// functions... - the asynchronous functions to compose