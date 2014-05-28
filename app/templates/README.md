# <%= pkgName %>
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

> <%= description %>

## Usage

First, install `<%= pkgName %>` as a development dependency:

```shell
npm install --save-dev <%= pkgName %>
```

Then, add it to your build script:

```javascript
var aster = require('aster');
var <%= varName %> = require('<%= pkgName %>');

aster.src('src/**/*.js')
.map(<%= varName %>({
  stringOption: 'value'
}))
.map(aster.dest('dist'))
.subscribe(
  function (file) { console.log('%s processed successfully.', file.loc.source) },
  function (err) { console.error('Error: %s', err) },
  function () { console.log('Completed.') }
);
```

## API

### <%= varName %>(options)

#### options.stringOption
Type: `String`

Some string option.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/<%= pkgName %>
[npm-image]: https://badge.fury.io/js/<%= pkgName %>.png

[travis-url]: http://travis-ci.org/<%= slug %>
[travis-image]: https://secure.travis-ci.org/<%= slug %>.png?branch=master
