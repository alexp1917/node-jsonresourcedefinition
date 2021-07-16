# JSONResourceDefinition

JSON Resource Definition (JRD) class

This library provides a helper class for dealing with JRD formatted data as
defined in [rfc 6415][1], as being a JSON representation of an XML format
called [Extensible Resource Descriptor (ERD)][2].

This library does not implement any XML related functionality at this point.

# Examples

```js
var JSONResourceDefinition = require('jsonresourcedefinition');

var rd = new JSONResourceDefinition({
  links: [
    {
      rel: 'https://valid.com/url',
      value: 'abc1',
    },
  ],
});

var value = rd.getLink('https://valid.com/url'); // abc1

rd = new JSONResourceDefinition({
  links: [
    {
      rel: 'https://valid.com/url',
      value: 'abc1',
    },
    {
      rel: 'https://valid.com/url',
      value: 'abc2',
    },
  ],
});

var value = rd.getLinks('https://valid.com/url'); // ['abc1', 'abc2', ]

try {
  value = rd.getLink('https://valid.com/url');
} catch (e) {
  console.log(e.code) // 'E_JRD_Q_MULTIPLE'
}

try {
  value = rd.getLink('https://valid.com/different-and-missing-url');
} catch (e) {
  console.log(e.code) // 'E_JRD_Q_MISSING'
}
```

[1]: https://datatracker.ietf.org/doc/html/rfc6415#appendix-A
[2]: http://docs.oasis-open.org/xri/xrd/v1.0/xrd-1.0.html
