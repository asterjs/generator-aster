# <%= pkgName %>
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

> <%= name %> with aster.

## Usage

First, install `<%= pkgName %>` as a development dependency:

```shell
npm install --save-dev <%= pkgName %>
```

Then, add it to your build script:

```javascript
var <%= varName %> = require('<%= pkgName %>');

aster
    .src('src/**/*.js')
    .then(<%= varName %>({
        from: /^p_(.*)$/,
        to: '$1'
    }))
    .then(aster.dest('dist'));
```

## API

### <%= varName %>(options)

#### options.from
Type: `RegExp`

Pattern for identifiers you want to rename.

#### options.to
Type: `String` | `Function`

Replacement for given identifier patterns.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/<%= pkgName %>
[npm-image]: https://badge.fury.io/js/<%= pkgName %>.png

[travis-url]: http://travis-ci.org/<%= slug %>
[travis-image]: https://secure.travis-ci.org/<%= slug %>.png?branch=master
