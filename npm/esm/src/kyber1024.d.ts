import { KyberBase } from "./kyberBase.js";
/**
 * Represents the Kyber1024 class.
 *
 * Kyber1024 is a subclass of KyberBase and implements specific methods for the Kyber-1024 parameter set.
 *
 * @example
 *
 * ```ts
 * // import { Kyber1024 } from "crystals-kyber-js"; // Node.js
 * import { Kyber1024 } from "http://deno.land/x/crystals_kyber/mod.ts"; // Deno
 *
 * const recipient = new Kyber1024();
 * const [pkR, skR] = await recipient.generateKeyPair();

 * const sender = new Kyber1024();
 * const [ct, ssS] = await sender.encap(pkR);

 * const ssR = await recipient.decap(ct, skR);
 * // ssS === ssR
 * ```
 */
export declare class Kyber1024 extends KyberBase {
    protected _k: number;
    protected _du: number;
    protected _dv: number;
    protected _eta1: number;
    protected _eta2: number;
    /**
     * Constructs a new instance of the Kyber1024 class.
     */
    constructor();
    /**
     * Lossily compresses and serializes a vector of polynomials.
     *
     * @param u - The vector of polynomials to compress.
     * @returns The compressed and serialized data as a Uint8Array.
     */
    protected _compressU(r: Uint8Array, u: Array<Array<number>>): Uint8Array;
    /**
     * Lossily compresses and serializes a polynomial.
     *
     * @param r - The output buffer to store the compressed data.
     * @param v - The polynomial to compress.
     * @returns The compressed and serialized data as a Uint8Array.
     */
    protected _compressV(r: Uint8Array, v: Array<number>): Uint8Array;
    /**
     * Deserializes and decompresses a vector of polynomials.
     * This is the approximate inverse of the `_compressU` method.
     * Since compression is lossy, the decompressed data may not match the original vector of polynomials.
     *
     * @param a - The compressed and serialized data as a Uint8Array.
     * @returns The decompressed vector of polynomials.
     */
    protected _decompressU(a: Uint8Array): Array<Array<number>>;
    /**
     * Decompresses a given polynomial, representing the approximate inverse of
     * compress2, in Uint8Array into an array of numbers.
     *
     * Note that compression is lossy, and thus decompression will not match the
     * original input.
     *
     * @param a - The Uint8Array to decompress.
     * @returns An array of numbers obtained from the decompression process.
     */
    protected _decompressV(a: Uint8Array): Array<number>;
}
