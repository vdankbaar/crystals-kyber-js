(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./assertion_error.js", "./_format.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assertNotStrictEquals = void 0;
    // Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
    const assertion_error_js_1 = require("./assertion_error.js");
    const _format_js_1 = require("./_format.js");
    /**
     * Make an assertion that `actual` and `expected` are not strictly equal.
     * If the values are strictly equal then throw.
     *
     * @example
     * ```ts
     * import { assertNotStrictEquals } from "https://deno.land/std@$STD_VERSION/assert/assert_not_strict_equals.ts";
     *
     * assertNotStrictEquals(1, 1); // Doesn't throw
     * assertNotStrictEquals(1, 2); // Throws
     * ```
     */
    function assertNotStrictEquals(actual, expected, msg) {
        if (!Object.is(actual, expected)) {
            return;
        }
        const msgSuffix = msg ? `: ${msg}` : ".";
        throw new assertion_error_js_1.AssertionError(`Expected "actual" to not be strictly equal to: ${(0, _format_js_1.format)(actual)}${msgSuffix}\n`);
    }
    exports.assertNotStrictEquals = assertNotStrictEquals;
});
