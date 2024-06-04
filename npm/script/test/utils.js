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
    exports.hexToDec = exports.bytesToHex = exports.hexToBytes = exports.testVectorPath = void 0;
    const isDeno = () => typeof Deno !== "undefined";
    function testVectorPath() {
        if (isDeno()) {
            return "./test/vectors";
        }
        return "../../test/vectors";
    }
    exports.testVectorPath = testVectorPath;
    function hexToBytes(v) {
        if (v.length === 0) {
            return new Uint8Array([]);
        }
        const res = v.match(/[\da-f]{2}/gi);
        if (res == null) {
            throw new Error("Not hex string.");
        }
        return new Uint8Array(res.map(function (h) {
            return parseInt(h, 16);
        }));
    }
    exports.hexToBytes = hexToBytes;
    function bytesToHex(v) {
        return [...v].map((x) => x.toString(16).padStart(2, "0")).join("");
    }
    exports.bytesToHex = bytesToHex;
    function hexToDec(hexString) {
        return parseInt(hexString, 16);
    }
    exports.hexToDec = hexToDec;
});
