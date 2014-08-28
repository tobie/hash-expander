"use strict";

module.exports = function(hashes) {
    _validateHashes(hashes);
    var length = hashes[0].length;
    var trie = _buildTrie(hashes);
    
    return function(hash) {
        if (hash.length > length) {
            throw new Error("Input is too long.");
        }
        
        var chars = hash.split(""),
            obj = trie,
            c;
        
        while (c = chars.shift()) {
            var type = typeof obj[c];
            if (type === "undefined") { return null; } // None
            if (type === "string") { return obj[c]; } // Found it!
            obj = obj[c];
        }
        throw new Error("Input is ambiguous (it is too short).");
    }
};

function _validateHashes(hashes) {
    var length = hashes[0].length;
    hashes.forEach(function(h) {
        if (h.length !== length) {
            throw new TypeError("Items must all be of the same length.");
        }
    });
}

function _buildTrie(hashes) {
    var output = {};
    hashes.forEach(function(h) {
        var chars = h.split(""),
            obj = output,
            c,
            i = 0;
        while (c = chars[i]) {
            var value = obj[c];
            var type = typeof value;
            switch (type) {
                case "undefined":
                    obj[c] = h; // Done!
                    return;
                case "object":
                    obj = obj[c];
                    i++;
                    break;
                case "string":
                    if (value === h) { // Handle dups.
                        return;
                    }
                    obj[c] = {};
                    var nextC = value.charAt(i + 1);
                    obj[c][nextC] = value;
                    obj = obj[c];
                    i++;
                    break;
            }
        }
    });
    return output;
}