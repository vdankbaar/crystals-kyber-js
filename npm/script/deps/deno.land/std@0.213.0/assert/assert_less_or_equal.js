(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_format.js", "./assertion_error.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assertLessOrEqual = void 0;
    // Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
    const _format_js_1 = require("./_format.js");
    const assertion_error_js_1 = require("./assertion_error.js");
    /**
     * Make an assertion that `actual` is less than or equal to `expected`.
     * If not then throw.
     *
     * @example
     * ```ts
     * import { assertLessOrEqual } from "https://deno.land/std@$STD_VERSION/assert/assert_less_or_equal.ts";
     *
     * assertLessOrEqual(1, 2); // Doesn't throw
     * assertLessOrEqual(1, 1); // Doesn't throw
     * assertLessOrEqual(1, 0); // Throws
     * ```
     */
    function assertLessOrEqual(actual, expected, msg) {
        if (actual <= expected)
            return;
        const actualString = (0, _format_js_1.format)(actual);
        const expectedString = (0, _format_js_1.format)(expected);
        throw new assertion_error_js_1.AssertionError(msg ?? `Expect ${actualString} <= ${expectedString}`);
    }
    exports.assertLessOrEqual = assertLessOrEqual;
});
