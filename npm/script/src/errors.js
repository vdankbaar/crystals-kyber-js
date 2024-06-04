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
    exports.KyberError = void 0;
    /**
     * The base error class of kyber-ts.
     */
    class KyberError extends Error {
        constructor(e) {
            let message;
            if (e instanceof Error) {
                message = e.message;
            }
            else if (typeof e === "string") {
                message = e;
            }
            else {
                message = "";
            }
            super(message);
            this.name = this.constructor.name;
        }
    }
    exports.KyberError = KyberError;
});
