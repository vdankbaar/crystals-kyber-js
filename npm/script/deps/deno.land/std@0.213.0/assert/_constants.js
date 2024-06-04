(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CAN_NOT_DISPLAY = void 0;
    // Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
    exports.CAN_NOT_DISPLAY = "[Cannot display]";
});
