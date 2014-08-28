var assert = require("assert"),
    hashExpander = require("../index.js"),
    hash_list = require("./hashes.json");

suite("hashExpander", function() {
    test("finds a hash when one exists", function() {
        assert.strictEqual("foo", hashExpander(["foo", "bar", "baz"])("f"));
        assert.strictEqual("foo", hashExpander(["foo", "bar", "baz"])("fo"));
        assert.strictEqual("foo", hashExpander(["foo", "bar", "baz"])("foo"));
        assert.strictEqual("bar", hashExpander(["foo", "bar", "baz"])("bar"));
        assert.strictEqual("baz", hashExpander(["foo", "bar", "baz"])("baz"));
        assert.strictEqual("2ff05a5e0cb092bf7c5d0ed6e660cfd75fc428a7", hashExpander(hash_list)("2ff"));
        assert.strictEqual("2ff05a5e0cb092bf7c5d0ed6e660cfd75fc428a7", hashExpander(hash_list)("2ff0"));
        assert.strictEqual("2ff05a5e0cb092bf7c5d0ed6e660cfd75fc428a7", hashExpander(hash_list)("2ff05"));
        assert.strictEqual("2ff05a5e0cb092bf7c5d0ed6e660cfd75fc428a7", hashExpander(hash_list)("2ff05a"));
        assert.strictEqual("2ff05a5e0cb092bf7c5d0ed6e660cfd75fc428a7", hashExpander(hash_list)("2ff05a5"));
    });
    
    test("return null when no hash can be found", function() {
        assert.strictEqual(null, hashExpander(["bar", "baz"])("f"));
        assert.strictEqual(null, hashExpander(["bar", "baz"])("fo"));
        assert.strictEqual(null, hashExpander(["bar", "baz"])("foo"));
        assert.strictEqual(null, hashExpander(hash_list)("foo"));
    });
    
    test("throws when results are ambigous", function() {
        assert.throws(function() {
            hashExpander(["bar", "baz"])("b");
        });
        assert.throws(function() {
            hashExpander(["bar", "baz"])("ba");
        });
        assert.throws(function() {
            hashExpander(hash_list)("2f");
        });
        assert.throws(function() {
            hashExpander(hash_list)("2");
        });
    });
    
    test("properly handle duplicates", function() {
        assert.strictEqual("foo", hashExpander(["foo", "foo", "bar", "baz"])("f"));
        assert.strictEqual("foo", hashExpander(["foo", "foo", "bar", "baz"])("foo"));
    });
    
    test("throws when needle is bigger than haystack", function() {
        assert.throws(function() {
            hashExpander(["foo"])("fooo");
        });
    });
    
    test("Reject hashes of different length", function() {
        assert.throws(function() {
            hashExpander(["foo", "longer"]);
        });
    });
});