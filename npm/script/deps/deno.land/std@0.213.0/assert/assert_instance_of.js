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
    exports.assertInstanceOf = void 0;
    // Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
    const assertion_error_js_1 = require("./assertion_error.js");
    /**
     * Make an assertion that `obj` is an instance of `type`.
     * If not then throw.
     *
     * @example
     * ```ts
     * import { assertInstanceOf } from "https://deno.land/std@$STD_VERSION/assert/assert_instance_of.ts";
     *
     * assertInstanceOf(new Date(), Date); // Doesn't throw
     * assertInstanceOf(new Date(), Number); // Throws
     * ```
     */
    function assertInstanceOf(actual, expectedType, msg = "") {
        if (actual instanceof expectedType)
            return;
        const msgSuffix = msg ? `: ${msg}` : ".";
        const expectedTypeStr = expectedType.name;
        let actualTypeStr = "";
        if (actual === null) {
            actualTypeStr = "null";
        }
        else if (actual === undefined) {
            actualTypeStr = "undefined";
        }
        else if (typeof actual === "object") {
            actualTypeStr = actual.constructor?.name ?? "Object";
        }
        else {
            actualTypeStr = typeof actual;
        }
        if (expectedTypeStr === actualTypeStr) {
            msg =
                `Expected object to be an instance of "${expectedTypeStr}"${msgSuffix}`;
        }
        else if (actualTypeStr === "function") {
            msg =
                `Expected object to be an instance of "${expectedTypeStr}" but was not an instanced object${msgSuffix}`;
        }
        else {
            msg =
                `Expected object to be an instance of "${expectedTypeStr}" but was "${actualTypeStr}"${msgSuffix}`;
        }
        throw new assertion_error_js_1.AssertionError(msg);
    }
    exports.assertInstanceOf = assertInstanceOf;
});
