(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./assert_false.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assertNotInstanceOf = void 0;
    // Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
    const assert_false_js_1 = require("./assert_false.js");
    /**
     * Make an assertion that `obj` is not an instance of `type`.
     * If so, then throw.
     *
     * @example
     * ```ts
     * import { assertNotInstanceOf } from "https://deno.land/std@$STD_VERSION/assert/assert_not_instance_of.ts";
     *
     * assertNotInstanceOf(new Date(), Number); // Doesn't throw
     * assertNotInstanceOf(new Date(), Date); // Throws
     * ```
     */
    function assertNotInstanceOf(actual, 
    // deno-lint-ignore no-explicit-any
    unexpectedType, msg) {
        const msgSuffix = msg ? `: ${msg}` : ".";
        msg =
            `Expected object to not be an instance of "${typeof unexpectedType}"${msgSuffix}`;
        (0, assert_false_js_1.assertFalse)(actual instanceof unexpectedType, msg);
    }
    exports.assertNotInstanceOf = assertNotInstanceOf;
});
