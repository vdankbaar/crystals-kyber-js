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
    exports.unreachable = void 0;
    // Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
    const assertion_error_js_1 = require("./assertion_error.js");
    /**
     * Use this to assert unreachable code.
     *
     * @example
     * ```ts
     * import { unreachable } from "https://deno.land/std@$STD_VERSION/assert/unreachable.ts";
     *
     * unreachable(); // Throws
     * ```
     */
    function unreachable() {
        throw new assertion_error_js_1.AssertionError("unreachable");
    }
    exports.unreachable = unreachable;
});
