/**
 * This implementation is based on https://github.com/antontutoveanu/crystals-kyber-javascript,
 * which was deveploped under the MIT licence below:
 * https://github.com/antontutoveanu/crystals-kyber-javascript/blob/main/LICENSE
 */
import { N } from "./consts.js";
import { KyberBase } from "./kyberBase.js";
/**
 * Represents the Kyber768 class, which extends the KyberBase class.
 *
 * Kyber768 is a specific implementation of the Kyber key encapsulation mechanism.
 *
 * @remarks
 *
 * This class extends the KyberBase class and provides specific implementation for Kyber768.
 *
 * @example
 *
 * ```ts
 * // import { Kyber768 } from "crystals-kyber-js"; // Node.js
 * import { Kyber768 } from "http://deno.land/x/crystals_kyber/mod.ts"; // Deno
 *
 * const recipient = new Kyber768();
 * const [pkR, skR] = await recipient.generateKeyPair();
 *
 * const sender = new Kyber768();
 * const [ct, ssS] = await sender.encap(pkR);
 *
 * const ssR = await recipient.decap(ct, skR);
 * // ssS === ssR
 * ```
 */
export class Kyber768 extends KyberBase {
    constructor() {
        super();
        Object.defineProperty(this, "_k", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 3
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
            value: 2
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
}
