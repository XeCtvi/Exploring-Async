var async = require('async');
var _ = require('lodash');
var $ = require('jquery')(require("jsdom").jsdom().parentWindow);

// Returns top image from Flickr for a tag
function getFlickrImage(tag, callback) {
	var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
	$.getJSON(flickerAPI, {
		tags: tag,
		tagmode: 'any',
		format: 'json'
	})
	.done(function (data) {
		var items = data.items;
		callback(null, items[0].media.m);
	});
}

// List of tags we want to search on Flickr
var tags = [
	'alistar',
	'blitzcrank',
	'catilyn'
];

//=============================BAD===========================
// We want to loop through each tags and get top image from Flickr and push that result to an array call imageList
// but this is done with synchronous loop with async functions mixed within, what's wrong with this ?

var imageList = [];
_.each(tags, function(tag) {
	var image = {};
	image.tag = tag;
	getFlickrImage(tag, function (err, url) { // synchronously call the Flickr API
		if (err) {
			console.error(err);
			return;
		}
		if (url) {
			image.url = url;
			imageList.push(image);
			console.log(image);
		}
	});
});
console.log('Image List: ', imageList);

// Flickr a guest lecturer in which is something that takes time to execute. So in JavaScript they will basically continue executing console.log part for us without waiting for distinct to finish.
// That is why we have an empty array here.

//================================ async.each ==================================
// each(arr, Iterator, [callback])
var imageList = [];
async.each(tags, function(tag, callback) {
	var image = {};
	image.tag = tag;
	getFlickrImage(tag, function(err, url) {
		if (err) {
			callback(err);
			return;
		} // catch this funtion's error
		if (url) {
			image.url = url;
			imageList.push(image);
			callback();
		} // goes again and again until goes to every element of tags
	});
}, function(err) { // then here is a final callback function, this is that the very end when all of this innovation has been done. It will call at the present area just if it passing err here, it will be caught here. If some of iteration fail, then the whole things fail. 
	if (err) {
		console.log('one of the api failed, the whole thing will fail now');
	} else {
		console.log('image List', imageList);
	}
});

// asynchronous request magically always guaranteed by the time you finish you have something printed out in this image
//


//====================================== async.forEachOf ===================
// For object -- look through a list of object
// each(arr, iterator, [callback])

var imageList = [];
var tags = {
	tag_a: 'alistar',
	tag_b: 'blizcrank',
	tag_c: 'caitlyn'
}; // Instead of passing arrays were passed an object. tags will be an object.So we can use async for each of to loop through tags

async.forEachOf(tags, function(value, key, callback) {
	var image = {};
	getFlickrImage(value, function(err, url) {
		if (err) {
			callback(err);
			return;
		}
		if (url) {
			image.tag = value;
			image.url = url;
			imageList.push(image);
			callback();
		}
	});
}, function(err) {
	if (err) {
		console.log('one of the api failed, the whole thing will fail now');
	} else {
		console.log('Image List', imageList);
	}
});

