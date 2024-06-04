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
    exports.assertExists = void 0;
    // Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
    const assertion_error_js_1 = require("./assertion_error.js");
    /**
     * Make an assertion that actual is not null or undefined.
     * If not then throw.
     *
     * @example
     * ```ts
     * import { assertExists } from "https://deno.land/std@$STD_VERSION/assert/assert_exists.ts";
     *
     * assertExists("something"); // Doesn't throw
     * assertExists(undefined); // Throws
     * ```
     */
    function assertExists(actual, msg) {
        if (actual === undefined || actual === null) {
            const msgSuffix = msg ? `: ${msg}` : ".";
            msg =
                `Expected actual: "${actual}" to not be null or undefined${msgSuffix}`;
            throw new assertion_error_js_1.AssertionError(msg);
        }
    }
    exports.assertExists = assertExists;
});
