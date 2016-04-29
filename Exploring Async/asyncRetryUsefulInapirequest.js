var async = require('async');

// Async example for Sign Up flow

async.auto({

	get_username: function (callback) {
		console.log('in get_username');

		// async code to get some data
		callback(null, 'Xec');
	},
	connect_to_db: function (callback) {
		console.log('in connect_to_db');
		var connected = true; // set this to false here to simulate DB failure

		// Check connection
		if (connected) {
			callback(null, connected);
		} else {
			callback('Error connecting to DB', null);
		}
	},
	check_if_user_exist: ['get_username', 'connect_to_db', function(callback, results) {
		console.log('in check_if_user_exist', JSON.stringify(results));

		// check if user exists in db...
		var userExist = false;

		if (userExist) {
			callback('User already exists in db', null);
		} else {
			setTimeout(function () {
				callback(null, userExist);
			}, 1000);
		}
	}],

	sign_up: ['check_if_user_exist', function(callback, results) {
		console.log('in sign_up', JSON.stringify(results));

		var username = results.get_username;
		var isDBConnected = results.connect_to_db;
		var userExists = results.check_if_user_exist;
		// console.log(username, isDBConnected, userExists);

		if (username && isDBConnected && !userExists) {
			callback(null, { 'status' : '200', 'msg' : 'Successfully signed up user'});
		} else {
			callback('Error signing up user', null);
		}
	}],
	// retry([ opts = (times: 5, interval: 0) | 5], task, [callback])
	// if you pass a number as first param, it will default times to that number, and interval to 0
	persis_to_db: ['sign_up', async.retry({times: 3, interval: 3000}, function(callback, results) {
		console.log('trying to persist to db');
		// Success: passing null to first parameter will singal a success attempt.
		// callback(null, 'Successfully persisted to DB');

		// Failure: If API to DB failed for some reason, pass an error message to callback's first argument, and it will retry.
		callback('failed to presist to db', null);
	})]
}, function (err, results) {
	console.log('Error = ' , err);
	console.log('Results = ', results);
});