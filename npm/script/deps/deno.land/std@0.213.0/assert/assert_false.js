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
    exports.assertFalse = void 0;
    // Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
    const assertion_error_js_1 = require("./assertion_error.js");
    /**
     * Make an assertion, error will be thrown if `expr` have truthy value.
     *
     * @example
     * ```ts
     * import { assertFalse } from "https://deno.land/std@$STD_VERSION/assert/assert_false.ts";
     *
     * assertFalse(false); // Doesn't throw
     * assertFalse(true); // Throws
     * ```
     */
    function assertFalse(expr, msg = "") {
        if (expr) {
            throw new assertion_error_js_1.AssertionError(msg);
        }
    }
    exports.assertFalse = assertFalse;
});
