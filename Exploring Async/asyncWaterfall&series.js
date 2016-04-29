var async = require('async');
var GithubApi = require('github');

var github = new GithubApi({
	version: '3.0.0'
});

async.waterfall([
	function getUserAvatar(callback) {
		github.search.users({ q: 'airbnb'}, function (err, res) {
			if (err) {
				callback(err, null); // null -- because we could return nothing
				return; // 在这里 retrun 非常重要。是防止 double call in a callback
			}

			var avatarUrl = res.items[0].avatar_url;
			callback(null, avatarUrl);
		});
	},
	function wrapAvatarInHtml(avatarUrl, callback) {
		var avatarWithHtml = '<img src="' + avatarUrl + '"/>';
		callback(null, avatarWithHtml);
	}
], function (err, result) {
	if (err) {
		console.error(err);
		return;
	}
	console.log(result);
});

// waterfall(tasks, [callback])

// Runs the tasks array of functions in series, each passing their results to the next in the array. However, if any of the tasks pass an error to their own callback, the next function is not executed, and the main callback is immediately called with the error.

// Arguments

// tasks - An array of functions to run, each function is passed a callback(err, result1, result2, ...) it must call on completion. The first argument is an error (which can be null) and any further arguments will be passed as arguments in order to the next task.
// callback(err, [results]) - An optional callback to run once all the functions have completed. This will be passed the results of the last task's callback.

async.series([
	function functionOne(callback) {
		callback(null, 'RESULT OF FUNCTION ONE');
	},
	function functionTwo(callback) {
		callback(null, 'RESULT OF FUNCTION TWO');
	},
	function functionThree(callback) {
		callback(null, 'RESULT OF FUNCTION THREE');
	}
], function(err, result) {
	console.log(result);
});

// series(tasks, [callback])

// Run the functions in the tasks collection in series, each one running once the previous function has completed. If any functions in the series pass an error to its callback, no more functions are run, and callback is immediately called with the value of the error. Otherwise, callback receives an array of results when tasks have completed. (All the functions are executed in series and the consolidated outputs of each function is passed to the final callback. )

// It is also possible to use an object instead of an array. Each property will be run as a function, and the results will be passed to the final callback as an object instead of an array. This can be a more readable way of handling results from series.

// Note that while many implementations preserve the order of object properties, the ECMAScript Language Specification explicitly states that

// The mechanics and order of enumerating the properties is not specified.
// So if you rely on the order in which your series of functions are executed, and want this to work on all platforms, consider using an array.

// Arguments

// tasks - A collection containing functions to run, each function is passed a callback(err, result) it must call on completion with an error err (which can be null) and an optional result value.
// callback(err, results) - An optional callback to run once all the functions have completed. This function gets a results array (or object) containing all the result arguments passed to the task callbacks.

It appears that async.waterfall allows each function to pass its results on to the next function, while async.series passes all results to the final callback. At a higher level, async.waterfall would be for a data pipeline ("given 2, multiply it by 3, add 2, and divide by 17"), while async.series would be for discrete tasks that must be performed in order, but are otherwise separate.

The difference is that async.series(), once the series have finished, will pass all the results to the main callback. async.waterfall() will pass to the main callback only the result of the last function called.

different : http://www.intstrings.com/ramivemula/articles/node-js-async-module-waterfall-and-series/

