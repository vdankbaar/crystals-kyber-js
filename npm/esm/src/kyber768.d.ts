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
export declare class Kyber768 extends KyberBase {
    protected _k: number;
    protected _du: number;
    protected _dv: number;
    protected _eta1: number;
    protected _eta2: number;
    constructor();
}
