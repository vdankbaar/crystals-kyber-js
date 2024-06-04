(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./assertion_error.js", "../fmt/colors.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assertIsError = void 0;
    // Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
    const assertion_error_js_1 = require("./assertion_error.js");
    const colors_js_1 = require("../fmt/colors.js");
    /**
     * Make an assertion that `error` is an `Error`.
     * If not then an error will be thrown.
     * An error class and a string that should be included in the
     * error message can also be asserted.
     *
     * @example
     * ```ts
     * import { assertIsError } from "https://deno.land/std@$STD_VERSION/assert/assert_is_error.ts";
     *
     * assertIsError(null); // Throws
     * assertIsError(new RangeError("Out of range")); // Doesn't throw
     * assertIsError(new RangeError("Out of range"), SyntaxError); // Throws
     * assertIsError(new RangeError("Out of range"), SyntaxError, "Out of range"); // Doesn't throw
     * assertIsError(new RangeError("Out of range"), SyntaxError, "Within range"); // Throws
     * ```
     */
    function assertIsError(error, 
    // deno-lint-ignore no-explicit-any
    ErrorClass, msgMatches, msg) {
        const msgSuffix = msg ? `: ${msg}` : ".";
        if (!(error instanceof Error)) {
            throw new assertion_error_js_1.AssertionError(`Expected "error" to be an Error object${msgSuffix}}`);
        }
        if (ErrorClass && !(error instanceof ErrorClass)) {
            msg = `Expected error to be instance of "${ErrorClass.name}", but was "${typeof error === "object" ? error?.constructor?.name : "[not an object]"}"${msgSuffix}`;
            throw new assertion_error_js_1.AssertionError(msg);
        }
        let msgCheck;
        if (typeof msgMatches === "string") {
            msgCheck = (0, colors_js_1.stripAnsiCode)(error.message).includes((0, colors_js_1.stripAnsiCode)(msgMatches));
        }
        if (msgMatches instanceof RegExp) {
            msgCheck = msgMatches.test((0, colors_js_1.stripAnsiCode)(error.message));
        }
        if (msgMatches && !msgCheck) {
            msg = `Expected error message to include ${msgMatches instanceof RegExp
                ? msgMatches.toString()
                : JSON.stringify(msgMatches)}, but got ${error instanceof Error
                ? JSON.stringify(error.message)
                : '"[not an Error]"' // TODO(kt3k): show more useful information
            }${msgSuffix}`;
            throw new assertion_error_js_1.AssertionError(msg);
        }
    }
    exports.assertIsError = assertIsError;
});
