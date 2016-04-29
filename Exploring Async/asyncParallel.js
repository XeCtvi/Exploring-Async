var async = require('async');

// var stack = [];

// var functionOne = function (callback) {
// 	// perform actions
// 	// callback(null, 'First Function Result');
// 	callback('Error', null); // 如果运行该行，就会console Error的数组。
// }

// var functionTwo = function (callback) {
// 	// perform actions
// 	callback(null, 'Second Function Result');
// }

// var functionThird = function (callback) {
// 	// perform actions
// 	callback(null, 'Third Function Result');
// }

// stack.push(functionOne);
// stack.push(functionTwo);
// stack.push(functionThird);

// async.parallel(stack, function(err, result) {
// 	console.log(result);
// });

// The Object Condition 

var stack = {};

stack.getUsername = function(callback) {
	var userName = 'Bob';
	callback(null, userName);
}
stack.getAge = function(callback) {
	var userAge = 23;
	callback(null, userAge);
}
stack.getGender = function(callback) {
	var gender = 'Male';
	callback(null, gender);
}

async.parallel(stack, function(err, result) {
	if(err) {
		console.err(err);
		return;
	}

	console.log(result);
});


// parallel(tasks, [callback])

// Run the tasks collection of functions in parallel, without waiting until the previous function has completed. If any of the functions pass an error to its callback, the main callback is immediately called with the value of the error. Once the tasks have completed, the results are passed to the final callback as an array.

// Note: parallel is about kicking-off I/O tasks in parallel, not about parallel execution of code. If your tasks do not use any timers or perform any I/O, they will actually be executed in series. Any synchronous setup sections for each task will happen one after the other. JavaScript remains single-threaded.

// It is also possible to use an object instead of an array. Each property will be run as a function and the results will be passed to the final callback as an object instead of an array. This can be a more readable way of handling results from parallel.

// Arguments

// tasks - A collection containing functions to run. Each function is passed a callback(err, result) which it must call on completion with an error err (which can be null) and an optional result value.
// callback(err, results) - An optional callback to run once all the functions have completed successfully. This function gets a results array (or object) containing all the result arguments passed to the task callbacks.