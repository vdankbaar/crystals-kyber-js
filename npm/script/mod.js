(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./src/errors.js", "./src/kyber512.js", "./src/kyber768.js", "./src/kyber1024.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Kyber1024 = exports.Kyber768 = exports.Kyber512 = exports.KyberError = void 0;
    var errors_js_1 = require("./src/errors.js");
    Object.defineProperty(exports, "KyberError", { enumerable: true, get: function () { return errors_js_1.KyberError; } });
    var kyber512_js_1 = require("./src/kyber512.js");
    Object.defineProperty(exports, "Kyber512", { enumerable: true, get: function () { return kyber512_js_1.Kyber512; } });
    var kyber768_js_1 = require("./src/kyber768.js");
    Object.defineProperty(exports, "Kyber768", { enumerable: true, get: function () { return kyber768_js_1.Kyber768; } });
    var kyber1024_js_1 = require("./src/kyber1024.js");
    Object.defineProperty(exports, "Kyber1024", { enumerable: true, get: function () { return kyber1024_js_1.Kyber1024; } });
});
