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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../_dnt.shims.js", "@noble/hashes/sha3"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.byteopsLoad32 = exports.byteopsLoad24 = exports.prf = exports.loadCrypto = exports.constantTimeCompare = exports.uint32 = exports.int32 = exports.uint16 = exports.int16 = exports.byte = void 0;
    const dntShim = __importStar(require("../_dnt.shims.js"));
    // @ts-ignore: for "npm:"
    const sha3_1 = require("@noble/hashes/sha3");
    function byte(n) {
        return n % 256;
    }
    exports.byte = byte;
    function int16(n) {
        const end = -32768;
        const start = 32767;
        if (n >= end && n <= start) {
            return n;
        }
        if (n < end) {
            n = n + 32769;
            n = n % 65536;
            return start + n;
        }
        // if (n > start) {
        n = n - 32768;
        n = n % 65536;
        return end + n;
    }
    exports.int16 = int16;
    function uint16(n) {
        return n % 65536;
    }
    exports.uint16 = uint16;
    function int32(n) {
        const end = -2147483648;
        const start = 2147483647;
        if (n >= end && n <= start) {
            return n;
        }
        if (n < end) {
            n = n + 2147483649;
            n = n % 4294967296;
            return start + n;
        }
        // if (n > start) {
        n = n - 2147483648;
        n = n % 4294967296;
        return end + n;
    }
    exports.int32 = int32;
    // any bit operations to be done in uint32 must have >>> 0
    // javascript calculates bitwise in SIGNED 32 bit so you need to convert
    function uint32(n) {
        return n % 4294967296;
    }
    exports.uint32 = uint32;
    // compares two arrays and returns 1 if they are the same or 0 if not
    function constantTimeCompare(x, y) {
        // check array lengths
        if (x.length != y.length) {
            return 0;
        }
        const v = new Uint8Array([0]);
        for (let i = 0; i < x.length; i++) {
            v[0] |= x[i] ^ y[i];
        }
        // constantTimeByteEq
        const z = new Uint8Array([0]);
        z[0] = ~(v[0] ^ z[0]);
        z[0] &= z[0] >> 4;
        z[0] &= z[0] >> 2;
        z[0] &= z[0] >> 1;
        return z[0];
    }
    exports.constantTimeCompare = constantTimeCompare;
    async function loadCrypto() {
        if (dntShim.dntGlobalThis !== undefined && globalThis.crypto !== undefined) {
            // Browsers, Node.js >= v19, Cloudflare Workers, Bun, etc.
            return globalThis.crypto;
        }
        // Node.js <= v18
        try {
            // @ts-ignore: to ignore "crypto"
            const { webcrypto } = await (__syncRequire ? Promise.resolve().then(() => __importStar(require("crypto"))) : new Promise((resolve_1, reject_1) => { require(["crypto"], resolve_1, reject_1); }).then(__importStar)); // node:crypto
            return webcrypto;
        }
        catch (_e) {
            throw new Error("failed to load Crypto");
        }
    }
    exports.loadCrypto = loadCrypto;
    // prf provides a pseudo-random function (PRF) which returns
    // a byte array of length `l`, using the provided key and nonce
    // to instantiate the PRF's underlying hash function.
    function prf(len, seed, nonce) {
        return sha3_1.shake256.create({ dkLen: len }).update(seed).update(new Uint8Array([nonce])).digest();
    }
    exports.prf = prf;
    // byteopsLoad24 returns a 32-bit unsigned integer loaded from byte x.
    function byteopsLoad24(x) {
        let r = uint32(x[0]);
        r |= uint32(x[1]) << 8;
        r |= uint32(x[2]) << 16;
        return r;
    }
    exports.byteopsLoad24 = byteopsLoad24;
    // byteopsLoad32 returns a 32-bit unsigned integer loaded from byte x.
    function byteopsLoad32(x) {
        let r = uint32(x[0]);
        r |= uint32(x[1]) << 8;
        r |= uint32(x[2]) << 16;
        r |= uint32(x[3]) << 24;
        return uint32(r);
    }
    exports.byteopsLoad32 = byteopsLoad32;
});
