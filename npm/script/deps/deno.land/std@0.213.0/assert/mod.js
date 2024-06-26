// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./assert_almost_equals.js", "./assert_array_includes.js", "./assert_equals.js", "./assert_exists.js", "./assert_false.js", "./assert_greater_or_equal.js", "./assert_greater.js", "./assert_instance_of.js", "./assert_is_error.js", "./assert_less_or_equal.js", "./assert_less.js", "./assert_match.js", "./assert_not_equals.js", "./assert_not_instance_of.js", "./assert_not_match.js", "./assert_not_strict_equals.js", "./assert_object_match.js", "./assert_rejects.js", "./assert_strict_equals.js", "./assert_string_includes.js", "./assert_throws.js", "./assert.js", "./assertion_error.js", "./equal.js", "./fail.js", "./unimplemented.js", "./unreachable.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /** A library of assertion functions.
     * If the assertion is false an `AssertionError` will be thrown which will
     * result in pretty-printed diff of failing assertion.
     *
     * This module is browser compatible, but do not rely on good formatting of
     * values for AssertionError messages in browsers.
     *
     * @module
     */
    __exportStar(require("./assert_almost_equals.js"), exports);
    __exportStar(require("./assert_array_includes.js"), exports);
    __exportStar(require("./assert_equals.js"), exports);
    __exportStar(require("./assert_exists.js"), exports);
    __exportStar(require("./assert_false.js"), exports);
    __exportStar(require("./assert_greater_or_equal.js"), exports);
    __exportStar(require("./assert_greater.js"), exports);
    __exportStar(require("./assert_instance_of.js"), exports);
    __exportStar(require("./assert_is_error.js"), exports);
    __exportStar(require("./assert_less_or_equal.js"), exports);
    __exportStar(require("./assert_less.js"), exports);
    __exportStar(require("./assert_match.js"), exports);
    __exportStar(require("./assert_not_equals.js"), exports);
    __exportStar(require("./assert_not_instance_of.js"), exports);
    __exportStar(require("./assert_not_match.js"), exports);
    __exportStar(require("./assert_not_strict_equals.js"), exports);
    __exportStar(require("./assert_object_match.js"), exports);
    __exportStar(require("./assert_rejects.js"), exports);
    __exportStar(require("./assert_strict_equals.js"), exports);
    __exportStar(require("./assert_string_includes.js"), exports);
    __exportStar(require("./assert_throws.js"), exports);
    __exportStar(require("./assert.js"), exports);
    __exportStar(require("./assertion_error.js"), exports);
    __exportStar(require("./equal.js"), exports);
    __exportStar(require("./fail.js"), exports);
    __exportStar(require("./unimplemented.js"), exports);
    __exportStar(require("./unreachable.js"), exports);
});
