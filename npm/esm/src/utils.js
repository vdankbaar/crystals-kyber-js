import * as dntShim from "../_dnt.shims.js";
// @ts-ignore: for "npm:"
import { shake256 } from "@noble/hashes/sha3";
export function byte(n) {
    return n % 256;
}
export function int16(n) {
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
export function uint16(n) {
    return n % 65536;
}
export function int32(n) {
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
// any bit operations to be done in uint32 must have >>> 0
// javascript calculates bitwise in SIGNED 32 bit so you need to convert
export function uint32(n) {
    return n % 4294967296;
}
// compares two arrays and returns 1 if they are the same or 0 if not
export function constantTimeCompare(x, y) {
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
export async function loadCrypto() {
    if (dntShim.dntGlobalThis !== undefined && globalThis.crypto !== undefined) {
        // Browsers, Node.js >= v19, Cloudflare Workers, Bun, etc.
        return globalThis.crypto;
    }
    // Node.js <= v18
    try {
        // @ts-ignore: to ignore "crypto"
        const { webcrypto } = await import("crypto"); // node:crypto
        return webcrypto;
    }
    catch (_e) {
        throw new Error("failed to load Crypto");
    }
}
// prf provides a pseudo-random function (PRF) which returns
// a byte array of length `l`, using the provided key and nonce
// to instantiate the PRF's underlying hash function.
export function prf(len, seed, nonce) {
    return shake256.create({ dkLen: len }).update(seed).update(new Uint8Array([nonce])).digest();
}
// byteopsLoad24 returns a 32-bit unsigned integer loaded from byte x.
export function byteopsLoad24(x) {
    let r = uint32(x[0]);
    r |= uint32(x[1]) << 8;
    r |= uint32(x[2]) << 16;
    return r;
}
// byteopsLoad32 returns a 32-bit unsigned integer loaded from byte x.
export function byteopsLoad32(x) {
    let r = uint32(x[0]);
    r |= uint32(x[1]) << 8;
    r |= uint32(x[2]) << 16;
    r |= uint32(x[3]) << 24;
    return uint32(r);
}
