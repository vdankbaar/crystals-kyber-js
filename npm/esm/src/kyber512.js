/**
 * This implementation is based on https://github.com/antontutoveanu/crystals-kyber-javascript,
 * which was deveploped under the MIT licence below:
 * https://github.com/antontutoveanu/crystals-kyber-javascript/blob/main/LICENSE
 */
import { N } from "./consts.js";
import { KyberBase } from "./kyberBase.js";
import { byteopsLoad24, int16, prf } from "./utils.js";
/**
 * Represents the Kyber512 class.
 *
 * This class extends the KyberBase class and provides specific implementation for Kyber512.
 *
 * @remarks
 *
 * Kyber512 is a specific implementation of the Kyber key encapsulation mechanism.
 *
 * @example
 *
 * ```ts
 * // import { Kyber512 } from "crystals-kyber-js"; // Node.js
 * import { Kyber512 } from "http://deno.land/x/crystals_kyber/mod.ts"; // Deno
 *
 * const recipient = new Kyber512();
 * const [pkR, skR] = await recipient.generateKeyPair();
 *
 * const sender = new Kyber512();
 * const [ct, ssS] = await sender.encap(pkR);
 *
 * const ssR = await recipient.decap(ct, skR);
 * // ssS === ssR
 * ```
 */
export class Kyber512 extends KyberBase {
    /**
     * Constructs a new instance of the Kyber512 class.
     */
    constructor() {
        super();
        Object.defineProperty(this, "_k", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 2
        });
        Object.defineProperty(this, "_du", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 10
        });
        Object.defineProperty(this, "_dv", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 4
        });
        Object.defineProperty(this, "_eta1", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 3
        });
        Object.defineProperty(this, "_eta2", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 2
        });
        this._skSize = 12 * this._k * N / 8;
        this._pkSize = this._skSize + 32;
        this._compressedUSize = this._k * this._du * N / 8;
        this._compressedVSize = this._dv * N / 8;
    }
    /**
     * Samples a vector of polynomials from a seed.
     * @internal
     * @param sigma - The seed.
     * @param offset - The offset.
     * @param size - The size.
     * @returns The sampled vector of polynomials.
     */
    _sampleNoise1(sigma, offset, size) {
        const r = new Array(size);
        for (let i = 0; i < size; i++) {
            r[i] = byteopsCbd(prf(this._eta1 * N / 4, sigma, offset), this._eta1);
            offset++;
        }
        return r;
    }
}
/**
 * Performs the byte operations for the Cbd function.
 *
 * @param buf - The input buffer.
 * @param eta - The value of eta.
 * @returns An array of numbers representing the result of the byte operations.
 */
function byteopsCbd(buf, eta) {
    let t, d;
    let a, b;
    const r = new Array(384).fill(0);
    for (let i = 0; i < N / 4; i++) {
        t = byteopsLoad24(buf.subarray(3 * i, buf.length));
        d = t & 0x00249249;
        d = d + ((t >> 1) & 0x00249249);
        d = d + ((t >> 2) & 0x00249249);
        for (let j = 0; j < 4; j++) {
            a = int16((d >> (6 * j + 0)) & 0x7);
            b = int16((d >> (6 * j + eta)) & 0x7);
            r[4 * i + j] = a - b;
        }
    }
    return r;
}
