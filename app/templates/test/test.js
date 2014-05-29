/* global describe, it */

'use strict';

var assert = require('assert'),
	Rx = require('rx'),
	<%= varName %> = require('..');

it('test', function (done) {
	var input = [{
			type: 'File',
			program: {
				type: 'Program',
				body: [/* put statements here */]
			},
			loc: {
				source: 'file.js'
			}
		}],
		expected = [{
			type: 'File',
			program: {
				type: 'Program',
				body: [/* put output statements here */]
			},
			loc: {
				source: 'file.js'
			}
		}];

	// simulating file sequence and applying transformation
	<%= varName %>({
	  stringOption: 'value'
	})(Rx.Observable.fromArray(input))
	// checking against array of expected results iteratively
	.zip(expected, assert.deepEqual)
	// subscribing to check results
	.subscribe(function () {}, done, done);
});

