var async = require('async');

// A complex function ht insert entries to database

var addEntryToDB = function (id, callback) {
	// Pass something to first param if it errors out
	callback(null, {
		entryId: id,
		name: 'username' + id
	});
}

// times(n, iterator, [callback])
async.times(5, function(n, next) {
	addEntryToDB(n, function(err, entry) {
		// To simulate error, uncomment the following 3 lines
		// if (n === 3) {
		// 	err = 'something bad happened';
		// }
		next(err, entry);
	});
}, function (err, entries) {
	if (err) {
		console.log(err);
	}
	// Success, print out entries
	console.log(entries);
});

times(n, iteratee, [callback])

Calls the iteratee function n times, and accumulates results in the same manner you would use with map.

Arguments

n - The number of times to run the function.
iteratee - The function to call n times.
callback - see map
Example

// Pretend this is some complicated async factory
var createUser = function(id, callback) {
  callback(null, {
    id: 'user' + id
  })
}
// generate 5 users
async.times(5, function(n, next){
    createUser(n, function(err, user) {
      next(err, user)
    })
}, function(err, users) {
  // we should now have 5 users
});