var async = require('async');

var counter = 0;

// whilst(condition, fn, callback)
// Whilst will execute the function fn while condition function return true, it will
// call callback when the job is done or if any error occurs.


async.whilst(
	function testCondition() { return counter < 5; },
	function increaseCounter(callback) {
		counter++;
		console.log('counter is now', counter);

		// Simulate ajax/processing
		// callback must be called once this function has completed, 
		// it takes an optional error argument

		setTimeout(callback, 1000);

		// so if there's an error, you do callback(err) and it will immediately end.
		// setTimeout(callback('err'), 1000); 如果运行这个，就会直接结束。
		// 因为我传 err 给了 callback。所以直接跑下面的 condition 了
	},
	function callback(err) {
		if(err) {
			console.log(err);
			return;
		}

		console.log('Job complete');
	}
);