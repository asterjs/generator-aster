'use strict';

var util = require('util');
var url = require('url');
var path = require('path');
var yeoman = require('yeoman-generator');
var GitHubApi = require('github');
var exec = require('child_process').exec;

/* jshint -W106 */
var proxy = process.env.http_proxy || process.env.HTTP_PROXY || process.env.https_proxy || process.env.HTTPS_PROXY || null;
/* jshint +W106 */

var githubOptions = {
	version: '3.0.0'
};

if (proxy) {
	proxy = url.parse(proxy);

	githubOptions.proxy = {
		host: proxy.hostname,
		port: proxy.port
	};
}

var github = new GitHubApi(githubOptions);

function githubUserInfo(name, callback) {
	github.user.getFrom({
		user: name
	}, function (err, res) {
		if (err) {
			throw err;
		}

		callback(res);
	});
}

function githubCreateRepo(options, callback) {
	github.repos.create(options, function (err, res) {
		if (err) {
			throw err;
		}

		callback(res);
	});
}

function AsterGenerator(args, options) {//, config) {
	yeoman.generators.Base.apply(this, arguments);
	this.argument('name', {type: String, required: false});

	this.on('end', function () {
		this.installDependencies({ bower: false, skipInstall: options['skip-install'] });
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
}

util.inherits(AsterGenerator, yeoman.generators.Base);

AsterGenerator.prototype.askFor = function askFor() {
	var self = this,
		done = this.async();

	// have Yeoman greet the user.
	console.log(self.yeoman);

	self.prompt([{
		name: 'name',
		message: 'What is short name (i.e. "rename ids") of your plugin?',
		default: self.name
	}], function (props) {
		if (!props.name) {
			throw new Error('Plugin name is required.');
		}

		self.name = self._.humanize(props.name);

		self.prompt([
			{
				name: 'description',
				message: 'Please provide description:',
				default: self.name + ' with aster.'
			},
			{
				name: 'ownerLogin',
				message: 'Would you mind telling me plugin owner\'s (your or organization) login on GitHub?'
			}
		], function (props) {
			if (!props.ownerLogin) {
				throw new Error('Owner\'s login is required.');
			}

			self.description = props.description;
			self.ownerLogin = props.ownerLogin;
			self.pkgName = 'aster-' + self._.slugify(self.name);
			self.varName = self._.camelize(self.name.toLowerCase());

			done();
		});
	});
};

AsterGenerator.prototype.userInfo = function userInfo() {
	var self = this,
		done = this.async();

	githubUserInfo(self.ownerLogin, function (owner) {
		self.owner = owner;
		self.slug = self.owner.login + '/' + self.pkgName;

		if (owner.type === 'Organization') {
			self.prompt([{
				name: 'authorLogin',
				message: 'Ok, it was owning organization, but what is your usename?'
			}], function (props) {
				githubUserInfo(props.authorLogin, function (author) {
					self.author = author;
					shouldCreateRepo();
				});
			});
		} else {
			self.author = self.owner;
			shouldCreateRepo();
		}
	});

	function shouldCreateRepo() {
		self.prompt([{
			name: 'createRepo',
			type: 'confirm',
			message: 'Do you want to create repo ' + self.author.login + '/' + self.pkgName + ' for this plugin?',
			default: false
		}], function (props) {
			if (props.createRepo) {
				self.prompt([{
					name: 'password',
					type: 'password',
					message: 'I need to know your password on GitHub then:'
				}], function (props) {
					github.authenticate({
						type: 'basic',
						username: self.author.login,
						password: props.password
					});

					githubCreateRepo({
						name: self.pkgName,
						description: self.description,
						homepage: 'https://npmjs.org/package/' + self.pkgName,
						has_wiki: false,
						has_downloads: false
					}, function (repo) {
						exec('git clone ' + repo.ssh_url + ' .', function () {
							done();
						});
					});
				});
			} else {
				done();
			}
		});
	}
};

AsterGenerator.prototype.gitfiles = function gitfiles() {
	this.copy('gitattributes', '.gitattributes');
	this.copy('gitignore', '.gitignore');
};

AsterGenerator.prototype.app = function app() {
	this.copy('_package.json', 'package.json');
	this.copy('index.js', 'index.js');
	this.copy('test/mocha.opts', 'test/mocha.opts');
	this.copy('test/test.js', 'test/test.js');
	this.template('LICENSE', 'LICENSE');
	this.copy('README.md', 'README.md');
};

AsterGenerator.prototype.projectfiles = function projectfiles() {
	this.copy('.editorconfig', '.editorconfig');
	this.copy('.jshintrc', '.jshintrc');
	this.copy('.travis.yml', '.travis.yml');
};

module.exports = AsterGenerator;
