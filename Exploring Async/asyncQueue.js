var async = require('async');
var _ = require('lodash');

// Generate an array of 10 random tasks
var tasksList = _.times(10, _.uniqueId.bind(null, 'task_'));

var tasksQueue = async.queue(function (task, callback) {
	console.log('Performing task: ' + task.name);
	console.log('Waiting to be processed:', tasksQueue.length());
	console.log('-----------------------------------');

	// Simulate intersive processing
	setTimeout(function () {
		// if you want to pass an error object here, it will be caught in the task handler
		// callback('something went wrong');
		callback();
	}, 1000);
}, 1); // Here is the key of Queue. Once you run a task , here define the number of task run currently.

// When all is processed, drain is called
tasksQueue.drain = function () {
	console.log('all items have been processed.');
};

_.each(tasksList, function (task) {
	tasksQueue.push( {name: task}, function (err) {
		if (err) {
			console.log(err);
		}
	});
});

// Puts a task in front of the queue
tasksQueue.unshift( {name: 'Most important task'}, function (err) {
	if (err) {
		console.log(err);
	}
});

// queue(worker, [concurrency])

// Creates a queue object with the specified concurrency. Tasks added to the queue are processed in parallel (up to the concurrency limit). If all workers are in progress, the task is queued until one becomes available. Once a worker completes a task, that task's callback is called.

// Arguments

// worker(task, callback) - An asynchronous function for processing a queued task, which must call its callback(err) argument when finished, with an optional error as an argument. If you want to handle errors from an individual task, pass a callback to q.push().
// concurrency - An integer for determining how many worker functions should be run in parallel. If omitted, the concurrency defaults to 1. If the concurrency is 0, an error is thrown.
// Queue objects

// The queue object returned by this function has the following properties and methods:

// length() - a function returning the number of items waiting to be processed.
// started - a function returning whether or not any items have been pushed and processed by the queue
// running() - a function returning the number of items currently being processed.
// workersList() - a function returning the array of items currently being processed.
// idle() - a function returning false if there are items waiting or being processed, or true if not.
// concurrency - an integer for determining how many worker functions should be run in parallel. This property can be changed after a queue is created to alter the concurrency on-the-fly.
// push(task, [callback]) - add a new task to the queue. Calls callback once the worker has finished processing the task. Instead of a single task, a tasks array can be submitted. The respective callback is used for every task in the list.
// unshift(task, [callback]) - add a new task to the front of the queue.
// saturated - a callback that is called when the number of running workers hits the concurrency limit, and further tasks will be queued.
// unsaturated - a callback that is called when the number of running workers is less than the concurrency & buffer limits, and further tasks will not be queued.
// buffer A minimum threshold buffer in order to say that the queue is unsaturated.
// empty - a callback that is called when the last item from the queue is given to a worker.
// drain - a callback that is called when the last item from the queue has returned from the worker.
// paused - a boolean for determining whether the queue is in a paused state
// pause() - a function that pauses the processing of tasks until resume() is called.
// resume() - a function that resumes the processing of queued tasks when the queue is paused.
// kill() - a function that removes the drain callback and empties remaining tasks from the queue forcing it to go idle.