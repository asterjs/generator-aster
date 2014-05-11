/* global describe, it */

'use strict';

var assert = require('assert'),
	aster = require('aster'),
	parse = require('esprima').parse,
	renameIds = require('..');

describe('Initialization', function () {
	// Put initialization-safety tests here if needed

	it('checks options.from', function () {
		assert.throws(renameIds.bind(null, {to: ''}));
		assert.throws(renameIds.bind(null, {from: '', to: ''}));
	});

	it('checks options.to', function () {
		assert.throws(renameIds.bind(null, {from: /^_/}));
		assert.throws(renameIds.bind(null, {from: /^_/, to: 10}));
	});
});

describe('Transformation', function () {
	// Put transformation tests here

	it('renames with given string pattern', function () {
		var renamePrivates = renameIds({
			from: /^p_(.*)$/,
			to: '$1'
		});

		return renamePrivates([parse('this.p_privateMethod(this.p_privateVariable + this.publicOption);')])
			.then(aster.wait) // required as you want to compare resolved tree
			.then(function (asts) {
				assert.deepEqual(asts, [parse('this.privateMethod(this.privateVariable + this.publicOption);')]);
			});
	});

	it('renames with given function', function () {
		var map = {},
			autoIncrement = 0,
			manglePrivates = renameIds({
				from: /^p_(.*)$/,
				to: function (name) {
					return map[name] || (map[name] = '$' + autoIncrement++);
				}
			});

		return manglePrivates([parse('this.p_privateMethod(this.p_privateVariable + this.publicOption);')])
			.then(aster.wait) // required as you want to compare resolved tree
			.then(function (asts) {
				assert.deepEqual(asts, [parse('this.$0(this.$1 + this.publicOption);')]);
			});
	});
});