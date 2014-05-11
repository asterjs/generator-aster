/* global describe, it */

'use strict';

var assert = require('assert');

describe('aster generator', function () {
	it('can be imported', function () {
		var app = require('../app');
		assert(app !== undefined);
	});
});
