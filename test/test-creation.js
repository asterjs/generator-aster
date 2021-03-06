/* global describe, beforeEach, it */

'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;

describe('aster generator', function () {
	beforeEach(function (done) {
		helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
			if (err) {
				return done(err);
			}

			this.app = helpers.createGenerator('aster:app', [
				'../../app'
			]);

			done();
		}.bind(this));
	});

	it('creates expected files', function (done) {
		var expected = [
			// add files you expect to exist here.
			'.editorconfig',
			'.jshintrc',
			'.travis.yml',
			'package.json',
			'.gitattributes',
			'.gitignore',
			'index.js',
			'LICENSE',
			'README.md',
			'test/test.js'
		];

		this.app.userInfo = function () {
			this.owner = this.author = {
				'name': 'John Doe',
				'email': 'john@doe.com',
				'login': 'johndoe',
				'html_url': 'https://github.com/johndoe'
			};
		};

		helpers.mockPrompt(this.app, {
			name: 'do smth',
			description: 'Does something with aster.',
			ownerLogin: 'johndoe'
		});

		this.app.options['skip-install'] = true;

		this.app.run({}, function () {
			helpers.assertFiles(expected);
			done();
		});
	});
});
