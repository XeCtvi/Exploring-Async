// help us to manage the control flow of application

var async = require('async');

// Async example for Sign Up flow

async.auto({

	get_username : function (callback) {
		console.log('in get_username');
		// async code to get some data

		callback(null, 'Xec');
	},
	connect_to_db : function (callback) {
		console.log('in connect_to_db');
		var connected = false; // set this to false here to simulate DB failure

		// Check connection
		if (connected) {
			callback(null, connected);
		} else {
			callback('Error connection to DB', null);
		}
	},

	check_if_user_exist: ['get_username', 'connect_to_db', function(callback, results) {
		console.log('in check_if_user_exist', JSON.stringify(results));
		// check if user exists in db...

		var userExists = false;

		if(userExists) {
			callback('User already exists in db', null);
		} else {
			setTimeout(function () {
				callback(null, userExists);
			}, 1000);
		}
	}],
	sign_up: ['check_if_user_exist', function (callback, results) {
		console.log('in sign_up', JSON.stringify(results));

		var username = results.get_username;
		var isDBConnected = results.connect_to_db;
		var userExists = results.check_if_user_exist;
		// console.log(username, isDBConnected, userExists);

		if (username && isDBConnected && userExists) {
			callback (null, { 'status': '200', 'msg': 'Successfully signed up user'});
		} else {
			callback('Error signing up user', null);
		}
	}]
}, function (err, results) {
	console.log('Error = ', err);
	console.log('Results = ', results);
});



async.auto({
    get_data: function(callback){
        console.log('in get_data');
        // async code to get some data
        callback(null, 'data', 'converted to array');
    },
    make_folder: function(callback){
        console.log('in make_folder');
        // async code to create a directory to store a file in
        // this is run at the same time as getting the data
        callback(null, 'folder');
    },
    write_file: ['get_data', 'make_folder', function(results, callback){
        console.log('in write_file', JSON.stringify(results));
        // once there is some data and the directory exists,
        // write the data to a file in the directory
        callback(null, 'filename');
    }],
    email_link: ['write_file', function(results, callback){
        console.log('in email_link', JSON.stringify(results));
        // once the file is written let's email a link to it...
        // results.write_file contains the filename returned by write_file.
        callback(null, {'file':results.write_file, 'email':'user@example.com'});
    }]
}, function(err, results) {
    console.log('err = ', err);
    console.log('results = ', results);
});

auto(tasks, [concurrency], [callback])

Determines the best order for running the functions in tasks, based on their requirements. Each function can optionally depend on other functions being completed first, and each function is run as soon as its requirements are satisfied.

If any of the functions pass an error to their callback, the auto sequence will stop. Further tasks will not execute (so any other functions depending on it will not run), and the main callback is immediately called with the error.

Functions also receive an object containing the results of functions which have completed so far as the first argument, if they have dependencies. If a task function has no dependencies, it will only be passed a callback.