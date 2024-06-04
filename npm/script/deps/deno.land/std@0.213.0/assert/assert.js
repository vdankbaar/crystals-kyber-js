(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./assertion_error.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assert = void 0;
    // Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
    const assertion_error_js_1 = require("./assertion_error.js");
    /**
     * Make an assertion, error will be thrown if `expr` does not have truthy value.
     *
     * @example
     * ```ts
     * import { assert } from "https://deno.land/std@$STD_VERSION/assert/assert.ts";
     *
     * assert("hello".includes("ello")); // Doesn't throw
     * assert("hello".includes("world")); // Throws
     * ```
     */
    function assert(expr, msg = "") {
        if (!expr) {
            throw new assertion_error_js_1.AssertionError(msg);
        }
    }
    exports.assert = assert;
});
