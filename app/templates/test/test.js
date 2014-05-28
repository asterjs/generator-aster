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

	<%= varName %>(Rx.Observable.fromArray(input))
	.zip(expected, assert.deepEqual)
	.subscribe(function () {}, done, done);
});

