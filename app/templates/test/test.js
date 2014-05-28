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

	// simulating sequence of file subsequences
	Rx.Observable.return(Rx.Observable.fromArray(input))
	// applying transformation to each file sequence
	.map(<%= varName %>({
	  stringOption: 'value'
	}))
	// checking against array of expected results iteratively
	.zip(expected, assert.deepEqual)
	// subscribing to check results
	.subscribe(function () {}, done, done);
});

