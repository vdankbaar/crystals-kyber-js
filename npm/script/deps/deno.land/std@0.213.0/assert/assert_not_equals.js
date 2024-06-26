(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./equal.js", "./assertion_error.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assertNotEquals = void 0;
    // Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
    const equal_js_1 = require("./equal.js");
    const assertion_error_js_1 = require("./assertion_error.js");
    /**
     * Make an assertion that `actual` and `expected` are not equal, deeply.
     * If not then throw.
     *
     * Type parameter can be specified to ensure values under comparison have the same type.
     *
     * @example
     * ```ts
     * import { assertNotEquals } from "https://deno.land/std@$STD_VERSION/assert/assert_not_equals.ts";
     *
     * assertNotEquals(1, 2); // Doesn't throw
     * assertNotEquals(1, 1); // Throws
     * ```
     */
    function assertNotEquals(actual, expected, msg) {
        if (!(0, equal_js_1.equal)(actual, expected)) {
            return;
        }
        let actualString;
        let expectedString;
        try {
            actualString = String(actual);
        }
        catch {
            actualString = "[Cannot display]";
        }
        try {
            expectedString = String(expected);
        }
        catch {
            expectedString = "[Cannot display]";
        }
        const msgSuffix = msg ? `: ${msg}` : ".";
        throw new assertion_error_js_1.AssertionError(`Expected actual: ${actualString} not to be: ${expectedString}${msgSuffix}`);
    }
    exports.assertNotEquals = assertNotEquals;
});
