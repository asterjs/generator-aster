'use strict';

module.exports = function (options) {
	// perform options-dependent initialization here so it could be reused later
	// (refers to merging with default options, creating helper objects etc.)
	var stringOption = options.stringOption || 'defaultValue';

	return function (files) {
		// process Rx.Observable of AST nodes passed with wrapper {type: 'File', program: <Program AST node>, loc: {source: <fileName>}};
		// preserve this wrapper as-is unless you are generating new file(s)
		return files.do(function (file) {
			// modify program node of each passed file here
			file.program = file.program;
		});
	}
};
