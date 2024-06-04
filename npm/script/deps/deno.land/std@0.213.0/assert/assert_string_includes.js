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
    exports.assertStringIncludes = void 0;
    // Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
    const assertion_error_js_1 = require("./assertion_error.js");
    /**
     * Make an assertion that actual includes expected. If not
     * then throw.
     *
     * @example
     * ```ts
     * import { assertStringIncludes } from "https://deno.land/std@$STD_VERSION/assert/assert_string_includes.ts";
     *
     * assertStringIncludes("Hello", "ello"); // Doesn't throw
     * assertStringIncludes("Hello", "world"); // Throws
     * ```
     */
    function assertStringIncludes(actual, expected, msg) {
        if (!actual.includes(expected)) {
            const msgSuffix = msg ? `: ${msg}` : ".";
            msg = `Expected actual: "${actual}" to contain: "${expected}"${msgSuffix}`;
            throw new assertion_error_js_1.AssertionError(msg);
        }
    }
    exports.assertStringIncludes = assertStringIncludes;
});
