// cargo is useful if you want to separate your task or functions
// to a particular number amount of time to execute

var async = require('async');
var _ = require('lodash');

// Generate an array of 10 random tasks;

/*
[
	'task_1',
	'task_2',
	.
	.
	.
	'task_10'
]
*/

var tasksList = _.times(10, _.uniqueId.bind(null, 'task_'));

// Create a cargo object with payload 3
// carge(worker, [payload])

var tasksCargo = async.cargo(function (tasks, callback) {
	for(var i=0; i < tasks.length; i++) {
		console.log('working on ' + tasks[i].name);
	}

	callback();
	// Something goes wrong, this will pass error to the task function and it will error out.
	// callback('broke');
},3);

// Push tasks to tasksList

_.each(tasksList, function (task) {
	tasksCargo.push( {name: task}, function (err) {
		// Something went wrong
		if (err) {
			console.log(err);
			return;
		}

		// All good here
		console.log('Task' + task + ' is done');
	});
});

cargo(worker, [payload])

Creates a cargo object with the specified payload. Tasks added to the cargo will be processed altogether (up to the payload limit). If the worker is in progress, the task is queued until it becomes available. Once the worker has completed some tasks, each callback of those tasks is called. Check out these animations for how cargo and queue work.

While queue passes only one task to one of a group of workers at a time, cargo passes an array of tasks to a single worker, repeating when the worker is finished.