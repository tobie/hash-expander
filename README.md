Hash Expander
=============

Hash expander turns short Git SHA-1s into their longer counterpart.
Might be useful for other things, too.

Usage
-----

```js
var hashes = [
    "eb99c3097f97ec7b4e36458fdcc8892b01caa118",
    "c29b26c4f8e5aa69d8c168dbb63f190758cc2983",
    "6c49956d2686abee298d56b46cec0c4e95b535be",
    "6c3f685f17c3531a78647fe97650fcd08d30149b",
    "b3cda2c4ca3efe3340dc0b676cb3404d27b830af",
    "74e8963bbea1c9a076b6e76897f509b57e227d39",
    "fab1eda19d2af1685438bbb3fefa4e25f7d7db94",
    "33d99e7e7c1e2984cca3584058d6f4607b36070e",
    "d8207b83fdbb93f157706c1aad22e7ad006ea55d",
    // …
]
var expand = require("hash-expander")(hashes);
expand("eb99");    // "eb99c3097f97ec7b4e36458fdcc8892b01caa118"
expand("c29b26c"); // "c29b26c4f8e5aa69d8c168dbb63f190758cc2983"
// etc.
```

Know issues
-----------

Currently only handles ASCII input and hashes.

License
-------

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)