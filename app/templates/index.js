'use strict';

var aster = require('aster');

module.exports = function (options) {
	// perform options-dependent initialization here so it could be reused later
	// (refers to merging with default options, creating helper objects etc.)
	if (!(options.from instanceof RegExp)) {
		throw new TypeError('options.from should be a regular expression.');
	}

	if (typeof options.to !== 'string' && !(options.to instanceof Function)) {
		throw new TypeError('options.to should be a string or a function.');
	}

	return function (asts) {
		// process array of AST promise-trees and return processed one
		return aster.map(asts, function (ast) {
			return aster.traverse(ast, function (node) {
				if (node.type === 'Identifier') {
					node.name = node.name.replace(options.from, options.to);
				}
			});
		});
	};
};