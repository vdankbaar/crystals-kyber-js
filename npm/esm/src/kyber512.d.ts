import { KyberBase } from "./kyberBase.js";
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
export declare class Kyber512 extends KyberBase {
    protected _k: number;
    protected _du: number;
    protected _dv: number;
    protected _eta1: number;
    protected _eta2: number;
    /**
     * Constructs a new instance of the Kyber512 class.
     */
    constructor();
}
