/**
 * This implementation is based on https://github.com/antontutoveanu/crystals-kyber-javascript,
 * which was deveploped under the MIT licence below:
 * https://github.com/antontutoveanu/crystals-kyber-javascript/blob/main/LICENSE
 */
import { sha3_256, sha3_512, shake128, shake256,
// @ts-ignore: for "npm:"
 } from "@noble/hashes/sha3";
import { N, NTT_ZETAS, NTT_ZETAS_INV, Q, Q_INV } from "./consts.js";
import { KyberError } from "./errors.js";
import { byte, byteopsLoad32, constantTimeCompare, int16, int32, loadCrypto, prf, uint16, uint32, } from "./utils.js";
/**
 * Represents the base class for the Kyber key encapsulation mechanism.
 *
 * This class provides the base implementation for the Kyber key encapsulation mechanism.
 *
 * @remarks
 *
 * This class is not intended to be used directly. Instead, use one of the subclasses:
 *
 * @example
 *
 * ```ts
 * // import { KyberBase } from "crystals-kyber-js"; // Node.js
 * import { KyberBase } from "http://deno.land/x/crystals_kyber/mod.ts"; // Deno
 *
 * class Kyber768 extends KyberBase {
 *   protected _k = 3;
 *   protected _du = 10;
 *   protected _dv = 4;
 *   protected _eta1 = 2;
 *   protected _eta2 = 2;
 *
 *   constructor() {
 *     super();
 *     this._skSize = 12 * this._k * N / 8;
 *     this._pkSize = this._skSize + 32;
 *     this._compressedUSize = this._k * this._du * N / 8;
 *     this._compressedVSize = this._dv * N / 8;
 *   }
 * }
 *
 * const kyber = new Kyber768();
 * ```
 */
export class KyberBase {
    /**
     * Creates a new instance of the KyberBase class.
     */
    constructor() {
        Object.defineProperty(this, "_api", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "_k", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_du", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_dv", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_eta1", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_eta2", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_skSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_pkSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_compressedUSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_compressedVSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_debug_cca_keygen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                skPrime: null,
                pk: null,
                Hpk: null,
                z: null,
            }
        });
        Object.defineProperty(this, "_debug_cpa_keygen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                d: null,
                rho: null,
                sigma: null,
                AHat: null,
                s: null,
                sHat: null,
                e: null,
                eHat: null,
                tHat: null,
                tBytes: null,
                A_S_mult: null,
            }
        });
        Object.defineProperty(this, "_debug_cca_encap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                m: null,
                Hm: null,
                pk: null,
                Hpk: null,
                r: null,
                KBar: null,
                c: null,
                Hc: null,
                K: null,
            }
        });
        Object.defineProperty(this, "_debug_cpa_encrypt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                tHat: null,
                rho: null,
                AHat: null,
                rPrime: null,
                rHat: null,
                e1: null,
                e2: null,
                mPrime: null,
                vHat: null,
                vPrime: null,
                uHat: null,
                uPrime: null,
                u: null,
                v: null,
            }
        });
        Object.defineProperty(this, "_debug_cca_decap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                skPrime: null,
                Hpk: null,
                pk: null,
                z: null,
                mPrime: null,
                KBarPrime: null,
                r: null,
                cPrime: null,
                success: null,
                Hc: null,
                KFail: null,
                KSuccess: null,
            }
        });
        Object.defineProperty(this, "_debug_cpa_decrypt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                sHat: null,
                u: null,
                uHat: null,
                vHat: null,
                vPrime: null,
                v: null,
                mPrime: null,
            }
        });
    }
    /**
     * Generates a keypair [publicKey, privateKey].
     *
     * If an error occurred, throws {@link KyberError}.
     *
     * @returns A kaypair [publicKey, privateKey].
     * @throws {@link KyberError}
     *
     * @example Generates a {@link Kyber768} keypair.
     *
     * ```ts
     * // import { Kyber768 } from "crystals-kyber-js"; // Node.js
     * import { Kyber768 } from "http://deno.land/x/crystals_kyber/mod.ts"; // Deno
     *
     * const kyber = new Kyber768();
     * const [pk, sk] = await kyber.generateKeyPair();
     * ```
     */
    async generateKeyPair() {
        await this._setup();
        try {
            const rnd = new Uint8Array(64);
            this._api.getRandomValues(rnd);
            return this._deriveKeyPair(rnd);
        }
        catch (e) {
            throw new KyberError(e);
        }
    }
    /**
     * Derives a keypair [publicKey, privateKey] deterministically from a 64-octet seed.
     *
     * If an error occurred, throws {@link KyberError}.
     *
     * @param seed A 64-octet seed for the deterministic key generation.
     * @returns A kaypair [publicKey, privateKey].
     * @throws {@link KyberError}
     *
     * @example Derives a {@link Kyber768} keypair deterministically.
     *
     * ```ts
     * // import { Kyber768 } from "crystals-kyber-js"; // Node.js
     * import { Kyber768 } from "http://deno.land/x/crystals_kyber/mod.ts"; // Deno
     *
     * const kyber = new Kyber768();
     * const seed = new Uint8Array(64);
     * globalThis.crypto.getRandomValues(seed);
     * const [pk, sk] = await kyber.deriveKeyPair(seed);
     * ```
     */
    async deriveKeyPair(seed) {
        await this._setup();
        try {
            if (seed.byteLength !== 64) {
                throw new Error("seed must be 64 bytes in length");
            }
            return this._deriveKeyPair(seed);
        }
        catch (e) {
            throw new KyberError(e);
        }
    }
    /**
     * Generates a shared secret from the encapsulated ciphertext and the private key.
     *
     * If an error occurred, throws {@link KyberError}.
     *
     * @param pk A public key.
     * @param seed An optional 32-octet seed for the deterministic shared secret generation.
     * @returns A ciphertext (encapsulated public key) and a shared secret.
     * @throws {@link KyberError}
     *
     * @example The {@link Kyber768} encapsulation.
     *
     * ```ts
     * // import { Kyber768 } from "crystals-kyber-js"; // Node.js
     * import { Kyber768 } from "http://deno.land/x/crystals_kyber/mod.ts"; // Deno
     *
     * const kyber = new Kyber768();
     * const [pk, sk] = await kyber.generateKeyPair();
     * const [ct, ss] = await kyber.encap(pk);
     * ```
     */
    async encap(pk, seed) {
        await this._setup();
        try {
            const rnd = this._getSeed(seed);
            const m = h(rnd);
            const Hpk = h(pk);
            const [kBar, r] = g(m, Hpk);
            const ct = this._encap(pk, m, r);
            const Hct = h(ct);
            const k = kdf(kBar, Hct);
            this._debug_cca_encap.m = structuredClone(rnd);
            this._debug_cca_encap.Hm = structuredClone(m);
            this._debug_cca_encap.pk = structuredClone(pk);
            this._debug_cca_encap.Hpk = structuredClone(Hpk);
            this._debug_cca_encap.r = structuredClone(r);
            this._debug_cca_encap.KBar = structuredClone(kBar);
            this._debug_cca_encap.c = structuredClone(ct);
            this._debug_cca_encap.Hc = structuredClone(Hct);
            this._debug_cca_encap.K = structuredClone(k);
            return [ct, k];
        }
        catch (e) {
            throw new KyberError(e);
        }
    }
    /**
     * Generates a ciphertext for the public key and a shared secret.
     *
     * If an error occurred, throws {@link KyberError}.
     *
     * @param ct A ciphertext generated by {@link encap}.
     * @param sk A private key.
     * @returns A shared secret.
     * @throws {@link KyberError}
     *
     * @example The {@link Kyber768} decapsulation.
     *
     * ```ts
     * // import { Kyber768 } from "crystals-kyber-js"; // Node.js
     * import { Kyber768 } from "http://deno.land/x/crystals_kyber/mod.ts"; // Deno
     *
     * const kyber = new Kyber768();
     * const [pk, sk] = await kyber.generateKeyPair();
     * const [ct, ssS] = await kyber.encap(pk);
     * const ssR = await kyber.decap(ct, sk);
     * // ssS === ssR
     * ```
     */
    async decap(ct, sk) {
        await this._setup();
        try {
            if (ct.byteLength !== this._compressedUSize + this._compressedVSize) {
                throw new Error("Invalid ct size");
            }
            const sk2 = sk.subarray(0, this._skSize);
            this._debug_cca_decap.skPrime = structuredClone(sk2);
            const pk = sk.subarray(this._skSize, this._skSize + this._pkSize);
            this._debug_cca_decap.pk = structuredClone(pk);
            const p = sk.subarray(this._skSize + this._pkSize, this._skSize + this._pkSize + 32);
            this._debug_cca_decap.Hpk = structuredClone(p);
            const z = sk.subarray(this._skSize + this._pkSize + 32, this._skSize + this._pkSize + 64);
            this._debug_cca_decap.z = structuredClone(z);
            const m2 = this._decap(ct, sk2);
            this._debug_cca_decap.mPrime = structuredClone(m2);
            const [kBar2, r2] = g(m2, p);
            this._debug_cca_decap.KBarPrime = structuredClone(kBar2);
            this._debug_cca_decap.r = structuredClone(r2);
            const ct2 = this._encap(pk, m2, r2);
            this._debug_cca_decap.cPrime = structuredClone(ct2);
            const success = constantTimeCompare(ct, ct2) == 1;
            this._debug_cca_decap.success = success;
            const Hc = h(ct);
            this._debug_cca_decap.Hc = structuredClone(Hc);
            this._debug_cca_decap.KFail = kdf(z, Hc);
            this._debug_cca_decap.KSuccess = kdf(kBar2, Hc);
            if (success) {
                return this._debug_cca_decap.KSuccess;
            }
            return this._debug_cca_decap.KFail;
        }
        catch (e) {
            throw new KyberError(e);
        }
    }
    /**
     * Sets up the KyberBase instance by loading the necessary crypto library.
     * If the crypto library is already loaded, this method does nothing.
     * @returns {Promise<void>} A promise that resolves when the setup is complete.
     */
    async _setup() {
        if (this._api !== undefined) {
            return;
        }
        this._api = await loadCrypto();
    }
    /**
     * Returns a Uint8Array seed for cryptographic operations.
     * If no seed is provided, a random seed of length 32 bytes is generated.
     * If a seed is provided, it must be exactly 32 bytes in length.
     *
     * @param seed - Optional seed for cryptographic operations.
     * @returns A Uint8Array seed.
     * @throws Error if the provided seed is not 32 bytes in length.
     */
    _getSeed(seed) {
        if (seed == undefined) {
            const s = new Uint8Array(32);
            this._api.getRandomValues(s);
            return s;
        }
        if (seed.byteLength !== 32) {
            throw new Error("seed must be 32 bytes in length");
        }
        return seed;
    }
    /**
     * Derives a key pair from a given seed.
     *
     * @param seed - The seed used for key derivation.
     * @returns An array containing the public key and secret key.
     */
    _deriveKeyPair(seed) {
        const cpaSeed = seed.subarray(0, 32);
        const z = seed.subarray(32, 64);
        const [pk, skBody] = this._deriveCpaKeyPair(cpaSeed);
        const pkh = h(pk);
        const sk = new Uint8Array(this._skSize + this._pkSize + 64);
        sk.set(skBody, 0);
        sk.set(pk, this._skSize);
        sk.set(pkh, this._skSize + this._pkSize);
        sk.set(z, this._skSize + this._pkSize + 32);
        this._debug_cca_keygen = structuredClone({
            skPrime: skBody,
            pk: pk,
            Hpk: pkh,
            z: z,
        });
        return [pk, sk];
    }
    // indcpaKeyGen generates public and private keys for the CPA-secure
    // public-key encryption scheme underlying Kyber.
    /**
     * Derives a CPA key pair using the provided CPA seed.
     *
     * @param cpaSeed - The CPA seed used for key derivation.
     * @returns An array containing the public key and private key.
     */
    _deriveCpaKeyPair(cpaSeed) {
        const [publicSeed, noiseSeed] = g(cpaSeed);
        const a = this._sampleMatrix(publicSeed, false);
        const s = this._sampleNoise1(noiseSeed, 0, this._k);
        const e = this._sampleNoise1(noiseSeed, this._k, this._k);
        this._debug_cpa_keygen.d = structuredClone(cpaSeed);
        this._debug_cpa_keygen.rho = structuredClone(publicSeed);
        this._debug_cpa_keygen.sigma = structuredClone(noiseSeed);
        this._debug_cpa_keygen.AHat = structuredClone(a);
        this._debug_cpa_keygen.s = structuredClone(s);
        this._debug_cpa_keygen.e = structuredClone(e);
        // perform number theoretic transform on secret s
        for (let i = 0; i < this._k; i++) {
            s[i] = ntt(s[i]);
            s[i] = reduce(s[i]);
            e[i] = ntt(e[i]);
        }
        this._debug_cpa_keygen.sHat = structuredClone(s);
        this._debug_cpa_keygen.eHat = structuredClone(e);
        // KEY COMPUTATION
        // pk = A*s + e
        const pk = new Array(this._k);
        const A_S_mult = new Array(this._k);
        for (let i = 0; i < this._k; i++) {
            A_S_mult[i] = multiply(a[i], s);
            A_S_mult[i] = polyToMont(A_S_mult[i]);
        }
        this._debug_cpa_keygen.A_S_mult = structuredClone(A_S_mult);
        for (let i = 0; i < this._k; i++) {
            pk[i] = add(A_S_mult[i], e[i]);
            pk[i] = reduce(pk[i]);
        }
        this._debug_cpa_keygen.tHat = structuredClone(pk);
        // PUBLIC KEY
        // turn polynomials into byte arrays
        const pubKey = new Uint8Array(this._pkSize);
        for (let i = 0; i < this._k; i++) {
            pubKey.set(polyToBytes(pk[i]), i * 384);
        }
        this._debug_cpa_keygen.tBytes = pubKey.slice(0, this._skSize);
        // append public seed
        pubKey.set(publicSeed, this._skSize);
        // PRIVATE KEY
        // turn polynomials into byte arrays
        const privKey = new Uint8Array(this._skSize);
        for (let i = 0; i < this._k; i++) {
            privKey.set(polyToBytes(s[i]), i * 384);
        }
        return [pubKey, privKey];
    }
    // _encap is the encapsulation function of the CPA-secure
    // public-key encryption scheme underlying Kyber.
    /**
     * Encapsulates a message using the Kyber encryption scheme.
     *
     * @param pk - The public key.
     * @param msg - The message to be encapsulated.
     * @param seed - The seed used for generating random values.
     * @returns The encapsulated message as a Uint8Array.
     */
    _encap(pk, msg, seed) {
        const tHat = new Array(this._k);
        for (let i = 0; i < this._k; i++) {
            tHat[i] = polyFromBytes(pk.subarray(i * 384, (i + 1) * 384));
        }
        const rho = pk.subarray(this._skSize);
        const a = this._sampleMatrix(rho, true);
        const r = this._sampleNoise1(seed, 0, this._k);
        const e1 = this._sampleNoise2(seed, this._k, this._k);
        const e2 = this._sampleNoise2(seed, this._k * 2, 1)[0];
        this._debug_cpa_encrypt.tHat = structuredClone(tHat);
        this._debug_cpa_encrypt.rho = structuredClone(rho);
        this._debug_cpa_encrypt.AHat = structuredClone(a);
        this._debug_cpa_encrypt.rPrime = structuredClone(r);
        this._debug_cpa_encrypt.e1 = structuredClone(e1);
        this._debug_cpa_encrypt.e2 = structuredClone(e2);
        // perform number theoretic transform on random vector r
        for (let i = 0; i < this._k; i++) {
            r[i] = ntt(r[i]);
            r[i] = reduce(r[i]);
        }
        this._debug_cpa_encrypt.rHat = structuredClone(r);
        // u' = A*r
        const u = new Array(this._k);
        for (let i = 0; i < this._k; i++) {
            u[i] = multiply(a[i], r);
        }
        this._debug_cpa_encrypt.uHat = structuredClone(u);
        for (let i = 0; i < this._k; i++) {
            u[i] = nttInverse(u[i]);
        }
        this._debug_cpa_encrypt.uPrime = structuredClone(u);
        // u = u' + e1
        for (let i = 0; i < this._k; i++) {
            u[i] = add(u[i], e1[i]);
            u[i] = reduce(u[i]);
        }
        // v = tHat*r + e2 + m
        const m = polyFromMsg(msg);
        this._debug_cpa_encrypt.mPrime = structuredClone(m);
        let v = multiply(tHat, r);
        this._debug_cpa_encrypt.vHat = structuredClone(v);
        v = nttInverse(v);
        this._debug_cpa_encrypt.vPrime = structuredClone(v);
        v = add(v, e2);
        v = add(v, m);
        v = reduce(v);
        this._debug_cpa_encrypt.u = structuredClone(u);
        this._debug_cpa_encrypt.v = structuredClone(v);
        // compress
        const ret = new Uint8Array(this._compressedUSize + this._compressedVSize);
        this._compressU(ret.subarray(0, this._compressedUSize), u);
        this._compressV(ret.subarray(this._compressedUSize), v);
        return ret;
    }
    // indcpaDecrypt is the decryption function of the CPA-secure
    // public-key encryption scheme underlying Kyber.
    /**
     * Decapsulates the ciphertext using the provided secret key.
     *
     * @param ct - The ciphertext to be decapsulated.
     * @param sk - The secret key used for decapsulation.
     * @returns The decapsulated message as a Uint8Array.
     */
    _decap(ct, sk) {
        // extract ciphertext
        const u = this._decompressU(ct.subarray(0, this._compressedUSize));
        const v = this._decompressV(ct.subarray(this._compressedUSize));
        const privateKeyPolyvec = this._polyvecFromBytes(sk);
        this._debug_cpa_decrypt.sHat = structuredClone(privateKeyPolyvec);
        this._debug_cpa_decrypt.u = structuredClone(u);
        this._debug_cpa_decrypt.v = structuredClone(v);
        for (let i = 0; i < this._k; i++) {
            u[i] = ntt(u[i]);
        }
        this._debug_cpa_decrypt.uHat = structuredClone(u);
        let mp = multiply(privateKeyPolyvec, u);
        this._debug_cpa_decrypt.vHat = structuredClone(mp);
        mp = nttInverse(mp);
        this._debug_cpa_decrypt.vPrime = structuredClone(mp);
        mp = subtract(v, mp);
        mp = reduce(mp);
        this._debug_cpa_decrypt.mPrime = structuredClone(mp);
        return polyToMsg(mp);
    }
    // generateMatrixA deterministically generates a matrix `A` (or the transpose of `A`)
    // from a seed. Entries of the matrix are polynomials that look uniformly random.
    // Performs rejection sampling on the output of an extendable-output function (XOF).
    /**
     * Generates a sample matrix based on the provided seed and transposition flag.
     *
     * @param seed - The seed used for generating the matrix.
     * @param transposed - A flag indicating whether the matrix should be transposed or not.
     * @returns The generated sample matrix.
     */
    _sampleMatrix(seed, transposed) {
        const a = new Array(this._k);
        const transpose = new Uint8Array(2);
        for (let ctr = 0, i = 0; i < this._k; i++) {
            a[i] = new Array(this._k);
            for (let j = 0; j < this._k; j++) {
                // set if transposed matrix or not
                if (transposed) {
                    transpose[0] = i;
                    transpose[1] = j;
                }
                else {
                    transpose[0] = j;
                    transpose[1] = i;
                }
                const output = xof(seed, transpose);
                // run rejection sampling on the output from above
                const result = indcpaRejUniform(output.subarray(0, 504), 504, N);
                a[i][j] = result[0]; // the result here is an NTT-representation
                ctr = result[1]; // keeps track of index of output array from sampling function
                while (ctr < N) { // if the polynomial hasnt been filled yet with mod q entries
                    const outputn = output.subarray(504, 672); // take last 168 bytes of byte array from xof
                    const result1 = indcpaRejUniform(outputn, 168, N - ctr); // run sampling function again
                    const missing = result1[0]; // here is additional mod q polynomial coefficients
                    const ctrn = result1[1]; // how many coefficients were accepted and are in the output
                    // starting at last position of output array from first sampling function until 256 is reached
                    for (let k = ctr; k < N; k++) {
                        a[i][j][k] = missing[k - ctr]; // fill rest of array with the additional coefficients until full
                    }
                    ctr = ctr + ctrn; // update index
                }
            }
        }
        return a;
    }
    /**
     * Generates a 2D array of noise samples.
     *
     * @param sigma - The noise parameter.
     * @param offset - The offset value.
     * @param size - The size of the array.
     * @returns The generated 2D array of noise samples.
     */
    _sampleNoise1(sigma, offset, size) {
        const r = new Array(size);
        for (let i = 0; i < size; i++) {
            r[i] = byteopsCbd(prf(this._eta1 * N / 4, sigma, offset), this._eta1);
            offset++;
        }
        return r;
    }
    /**
     * Generates a 2-dimensional array of noise samples.
     *
     * @param sigma - The noise parameter.
     * @param offset - The offset value.
     * @param size - The size of the array.
     * @returns The generated 2-dimensional array of noise samples.
     */
    _sampleNoise2(sigma, offset, size) {
        const r = new Array(size);
        for (let i = 0; i < size; i++) {
            r[i] = byteopsCbd(prf(this._eta2 * N / 4, sigma, offset), this._eta2);
            offset++;
        }
        return r;
    }
    // polyvecFromBytes deserializes a vector of polynomials.
    /**
     * Converts a Uint8Array to a 2D array of numbers representing a polynomial vector.
     * Each element in the resulting array represents a polynomial.
     * @param a The Uint8Array to convert.
     * @returns The 2D array of numbers representing the polynomial vector.
     */
    _polyvecFromBytes(a) {
        const r = new Array(this._k);
        for (let i = 0; i < this._k; i++) {
            r[i] = polyFromBytes(a.subarray(i * 384, (i + 1) * 384));
        }
        return r;
    }
    // compressU lossily compresses and serializes a vector of polynomials.
    /**
     * Compresses the given array of coefficients into a Uint8Array.
     *
     * @param r - The output Uint8Array.
     * @param u - The array of coefficients.
     * @returns The compressed Uint8Array.
     */
    _compressU(r, u) {
        const t = new Array(4);
        for (let rr = 0, i = 0; i < this._k; i++) {
            for (let j = 0; j < N / 4; j++) {
                for (let k = 0; k < 4; k++) {
                    // parse {0,...,3328} to {0,...,1023}
                    t[k] = (((u[i][4 * j + k] << 10) + Q / 2) / Q) &
                        0b1111111111;
                }
                // converts 4 12-bit coefficients {0,...,3328} to 5 8-bit bytes {0,...,255}
                // 48 bits down to 40 bits per block
                r[rr++] = byte(t[0] >> 0);
                r[rr++] = byte((t[0] >> 8) | (t[1] << 2));
                r[rr++] = byte((t[1] >> 6) | (t[2] << 4));
                r[rr++] = byte((t[2] >> 4) | (t[3] << 6));
                r[rr++] = byte(t[3] >> 2);
            }
        }
        return r;
    }
    // compressV lossily compresses and subsequently serializes a polynomial.
    /**
     * Compresses the given array of numbers into a Uint8Array.
     *
     * @param r - The Uint8Array to store the compressed values.
     * @param v - The array of numbers to compress.
     * @returns The compressed Uint8Array.
     */
    _compressV(r, v) {
        // const r = new Uint8Array(128);
        const t = new Uint8Array(8);
        for (let rr = 0, i = 0; i < N / 8; i++) {
            for (let j = 0; j < 8; j++) {
                t[j] = byte(((v[8 * i + j] << 4) + Q / 2) / Q) & 0b1111;
            }
            r[rr++] = t[0] | (t[1] << 4);
            r[rr++] = t[2] | (t[3] << 4);
            r[rr++] = t[4] | (t[5] << 4);
            r[rr++] = t[6] | (t[7] << 4);
        }
        return r;
    }
    // decompressU de-serializes and decompresses a vector of polynomials and
    // represents the approximate inverse of compress1. Since compression is lossy,
    // the results of decompression will may not match the original vector of polynomials.
    /**
     * Decompresses a Uint8Array into a two-dimensional array of numbers.
     *
     * @param a The Uint8Array to decompress.
     * @returns The decompressed two-dimensional array.
     */
    _decompressU(a) {
        const r = new Array(this._k);
        for (let i = 0; i < this._k; i++) {
            r[i] = new Array(384);
        }
        const t = new Array(4);
        for (let aa = 0, i = 0; i < this._k; i++) {
            for (let j = 0; j < N / 4; j++) {
                t[0] = (uint16(a[aa + 0]) >> 0) | (uint16(a[aa + 1]) << 8);
                t[1] = (uint16(a[aa + 1]) >> 2) | (uint16(a[aa + 2]) << 6);
                t[2] = (uint16(a[aa + 2]) >> 4) | (uint16(a[aa + 3]) << 4);
                t[3] = (uint16(a[aa + 3]) >> 6) | (uint16(a[aa + 4]) << 2);
                aa = aa + 5;
                for (let k = 0; k < 4; k++) {
                    r[i][4 * j + k] = int16((((uint32(t[k] & 0x3FF)) * (uint32(Q))) + 512) >> 10);
                }
            }
        }
        return r;
    }
    // decompressV de-serializes and subsequently decompresses a polynomial,
    // representing the approximate inverse of compress2.
    // Note that compression is lossy, and thus decompression will not match the
    // original input.
    /**
     * Decompresses a Uint8Array into an array of numbers.
     *
     * @param a - The Uint8Array to decompress.
     * @returns An array of numbers.
     */
    _decompressV(a) {
        const r = new Array(384);
        for (let aa = 0, i = 0; i < N / 2; i++, aa++) {
            r[2 * i + 0] = int16(((uint16(a[aa] & 15) * uint16(Q)) + 8) >> 4);
            r[2 * i + 1] = int16(((uint16(a[aa] >> 4) * uint16(Q)) + 8) >> 4);
        }
        return r;
    }
}
/**
 * Computes the hash of the input array `a` and an optional input array `b`.
 * Returns an array containing two Uint8Arrays, representing the first 32 bytes and the next 32 bytes of the hash digest.
 * @param a - The input array to be hashed.
 * @param b - An optional input array to be hashed along with `a`.
 * @returns An array containing two Uint8Arrays representing the hash digest.
 */
function g(a, b) {
    const hash = sha3_512.create().update(a);
    if (b !== undefined) {
        hash.update(b);
    }
    const res = hash.digest();
    return [res.subarray(0, 32), res.subarray(32, 64)];
}
/**
 * Computes the SHA3-256 hash of the given message.
 *
 * @param msg - The input message as a Uint8Array.
 * @returns The computed hash as a Uint8Array.
 */
function h(msg) {
    return sha3_256.create().update(msg).digest();
}
/**
 * Key Derivation Function (KDF) that takes an input array `a` and an optional input array `b`.
 * It uses the SHAKE256 hash function to derive a 32-byte output.
 *
 * @param a - The input array.
 * @param b - The optional input array.
 * @returns The derived key as a Uint8Array.
 */
function kdf(a, b) {
    const hash = shake256.create({ dkLen: 32 }).update(a);
    if (b !== undefined) {
        hash.update(b);
    }
    return hash.digest();
}
/**
 * Computes the extendable-output function (XOF) using the SHAKE128 algorithm.
 *
 * @param seed - The seed value for the XOF.
 * @param transpose - The transpose value for the XOF.
 * @returns The computed XOF value as a Uint8Array.
 */
function xof(seed, transpose) {
    return shake128.create({ dkLen: 672 }).update(seed).update(transpose)
        .digest();
}
// polyToBytes serializes a polynomial into an array of bytes.
/**
 * Converts a polynomial represented by an array of numbers to a Uint8Array.
 * Each coefficient of the polynomial is reduced modulo q.
 *
 * @param a - The array representing the polynomial.
 * @returns The Uint8Array representation of the polynomial.
 */
function polyToBytes(a) {
    let t0 = 0;
    let t1 = 0;
    const r = new Uint8Array(384);
    const a2 = subtractQ(a); // Returns: a - q if a >= q, else a (each coefficient of the polynomial)
    // for 0-127
    for (let i = 0; i < N / 2; i++) {
        // get two coefficient entries in the polynomial
        t0 = uint16(a2[2 * i]);
        t1 = uint16(a2[2 * i + 1]);
        // convert the 2 coefficient into 3 bytes
        r[3 * i + 0] = byte(t0 >> 0); // byte() does mod 256 of the input (output value 0-255)
        r[3 * i + 1] = byte(t0 >> 8) | byte(t1 << 4);
        r[3 * i + 2] = byte(t1 >> 4);
    }
    return r;
}
// polyFromBytes de-serialises an array of bytes into a polynomial,
// and represents the inverse of polyToBytes.
/**
 * Converts a Uint8Array to an array of numbers representing a polynomial.
 * Each element in the array represents a coefficient of the polynomial.
 * The input array `a` should have a length of 384.
 * The function performs bitwise operations to extract the coefficients from the input array.
 * @param a The Uint8Array to convert to a polynomial.
 * @returns An array of numbers representing the polynomial.
 */
export function polyFromBytes(a) {
    const r = new Array(384).fill(0);
    for (let i = 0; i < N / 2; i++) {
        r[2 * i] = int16(((uint16(a[3 * i + 0]) >> 0) | (uint16(a[3 * i + 1]) << 8)) & 0xFFF);
        r[2 * i + 1] = int16(((uint16(a[3 * i + 1]) >> 4) | (uint16(a[3 * i + 2]) << 4)) & 0xFFF);
    }
    return r;
}
// polyToMsg converts a polynomial to a 32-byte message
// and represents the inverse of polyFromMsg.
/**
 * Converts a polynomial to a message represented as a Uint8Array.
 * @param a - The polynomial to convert.
 * @returns The message as a Uint8Array.
 */
function polyToMsg(a) {
    const msg = new Uint8Array(32);
    let t;
    const a2 = subtractQ(a);
    for (let i = 0; i < N / 8; i++) {
        msg[i] = 0;
        for (let j = 0; j < 8; j++) {
            t = (((uint16(a2[8 * i + j]) << 1) + uint16(Q / 2)) /
                uint16(Q)) & 1;
            msg[i] |= byte(t << j);
        }
    }
    return msg;
}
// polyFromMsg converts a 32-byte message to a polynomial.
/**
 * Converts a Uint8Array message to an array of numbers representing a polynomial.
 * Each element in the array is an int16 (0-65535).
 *
 * @param msg - The Uint8Array message to convert.
 * @returns An array of numbers representing the polynomial.
 */
function polyFromMsg(msg) {
    const r = new Array(384).fill(0); // each element is int16 (0-65535)
    let mask; // int16
    for (let i = 0; i < N / 8; i++) {
        for (let j = 0; j < 8; j++) {
            mask = -1 * int16((msg[i] >> j) & 1);
            r[8 * i + j] = mask & int16((Q + 1) / 2);
        }
    }
    return r;
}
// indcpaRejUniform runs rejection sampling on uniform random bytes
// to generate uniform random integers modulo `Q`.
/**
 * Generates an array of random numbers from a given buffer, rejecting values greater than a specified threshold.
 *
 * @param buf - The input buffer containing random bytes.
 * @param bufl - The length of the input buffer.
 * @param len - The desired length of the output array.
 * @returns An array of random numbers and the actual length of the output array.
 */
function indcpaRejUniform(buf, bufl, len) {
    const r = new Array(384).fill(0);
    let ctr = 0;
    let val0, val1; // d1, d2 in kyber documentation
    for (let pos = 0; ctr < len && pos + 3 <= bufl;) {
        // compute d1 and d2
        val0 = (uint16((buf[pos]) >> 0) | (uint16(buf[pos + 1]) << 8)) & 0xFFF;
        val1 = (uint16((buf[pos + 1]) >> 4) | (uint16(buf[pos + 2]) << 4)) & 0xFFF;
        // increment input buffer index by 3
        pos = pos + 3;
        // if d1 is less than 3329
        if (val0 < Q) {
            // assign to d1
            r[ctr] = val0;
            // increment position of output array
            ctr = ctr + 1;
        }
        if (ctr < len && val1 < Q) {
            r[ctr] = val1;
            ctr = ctr + 1;
        }
    }
    return [r, ctr];
}
// byteopsCbd computes a polynomial with coefficients distributed
// according to a centered binomial distribution with parameter PARAMS_ETA,
// given an array of uniformly random bytes.
/**
 * Converts a Uint8Array buffer to an array of numbers using the CBD operation.
 * @param buf - The input Uint8Array buffer.
 * @param eta - The value used in the CBD operation.
 * @returns An array of numbers obtained from the CBD operation.
 */
function byteopsCbd(buf, eta) {
    let t, d;
    let a, b;
    const r = new Array(384).fill(0);
    for (let i = 0; i < N / 8; i++) {
        t = byteopsLoad32(buf.subarray(4 * i, buf.length));
        d = t & 0x55555555;
        d = d + ((t >> 1) & 0x55555555);
        for (let j = 0; j < 8; j++) {
            a = int16((d >> (4 * j + 0)) & 0x3);
            b = int16((d >> (4 * j + eta)) & 0x3);
            r[8 * i + j] = a - b;
        }
    }
    return r;
}
// ntt performs an inplace number-theoretic transform (NTT) in `Rq`.
// The input is in standard order, the output is in bit-reversed order.
/**
 * Performs the Number Theoretic Transform (NTT) on an array of numbers.
 *
 * @param r - The input array of numbers.
 * @returns The transformed array of numbers.
 */
function ntt(r) {
    // 128, 64, 32, 16, 8, 4, 2
    for (let j = 0, k = 1, l = 128; l >= 2; l >>= 1) {
        // 0,
        for (let start = 0; start < 256; start = j + l) {
            const zeta = NTT_ZETAS[k];
            k = k + 1;
            // for each element in the subsections (128, 64, 32, 16, 8, 4, 2) starting at an offset
            for (j = start; j < start + l; j++) {
                // compute the modular multiplication of the zeta and each element in the subsection
                const t = nttFqMul(zeta, r[j + l]); // t is mod q
                // overwrite each element in the subsection as the opposite subsection element minus t
                r[j + l] = r[j] - t;
                // add t back again to the opposite subsection
                r[j] = r[j] + t;
            }
        }
    }
    return r;
}
// nttFqMul performs multiplication followed by Montgomery reduction
// and returns a 16-bit integer congruent to `a*b*R^{-1} mod Q`.
/**
 * Performs an NTT (Number Theoretic Transform) multiplication on two numbers in Fq.
 * @param a The first number.
 * @param b The second number.
 * @returns The result of the NTT multiplication.
 */
function nttFqMul(a, b) {
    return byteopsMontgomeryReduce(a * b);
}
// reduce applies Barrett reduction to all coefficients of a polynomial.
/**
 * Reduces each element in the given array using the barrett function.
 *
 * @param r - The array to be reduced.
 * @returns The reduced array.
 */
function reduce(r) {
    for (let i = 0; i < N; i++) {
        r[i] = barrett(r[i]);
    }
    return r;
}
// barrett computes a Barrett reduction; given
// a integer `a`, returns a integer congruent to
// `a mod Q` in {0,...,Q}.
/**
 * Performs the Barrett reduction algorithm on the given number.
 *
 * @param a - The number to be reduced.
 * @returns The result of the reduction.
 */
function barrett(a) {
    const v = ((1 << 24) + Q / 2) / Q;
    let t = v * a >> 24;
    t = t * Q;
    return a - t;
}
// byteopsMontgomeryReduce computes a Montgomery reduction; given
// a 32-bit integer `a`, returns `a * R^-1 mod Q` where `R=2^16`.
/**
 * Performs Montgomery reduction on a given number.
 * @param a - The number to be reduced.
 * @returns The reduced number.
 */
function byteopsMontgomeryReduce(a) {
    const u = int16(int32(a) * Q_INV);
    let t = u * Q;
    t = a - t;
    t >>= 16;
    return int16(t);
}
// polyToMont performs the in-place conversion of all coefficients
// of a polynomial from the normal domain to the Montgomery domain.
/**
 * Converts a polynomial to the Montgomery domain.
 *
 * @param r - The polynomial to be converted.
 * @returns The polynomial in the Montgomery domain.
 */
function polyToMont(r) {
    // let f = int16(((uint64(1) << 32)) % uint64(Q));
    const f = 1353; // if Q changes then this needs to be updated
    for (let i = 0; i < N; i++) {
        r[i] = byteopsMontgomeryReduce(int32(r[i]) * int32(f));
    }
    return r;
}
// pointwise-multiplies elements of polynomial-vectors
// `a` and `b`, accumulates the results into `r`, and then multiplies by `2^-16`.
/**
 * Multiplies two matrices element-wise and returns the result.
 * @param a - The first matrix.
 * @param b - The second matrix.
 * @returns The resulting matrix after element-wise multiplication.
 */
function multiply(a, b) {
    let r = polyBaseMulMontgomery(a[0], b[0]);
    let t;
    for (let i = 1; i < a.length; i++) {
        t = polyBaseMulMontgomery(a[i], b[i]);
        r = add(r, t);
    }
    return reduce(r);
}
// polyBaseMulMontgomery performs the multiplication of two polynomials
// in the number-theoretic transform (NTT) domain.
/**
 * Performs polynomial base multiplication in Montgomery domain.
 * @param a - The first polynomial array.
 * @param b - The second polynomial array.
 * @returns The result of the polynomial base multiplication.
 */
function polyBaseMulMontgomery(a, b) {
    let rx, ry;
    for (let i = 0; i < N / 4; i++) {
        rx = nttBaseMul(a[4 * i + 0], a[4 * i + 1], b[4 * i + 0], b[4 * i + 1], NTT_ZETAS[64 + i]);
        ry = nttBaseMul(a[4 * i + 2], a[4 * i + 3], b[4 * i + 2], b[4 * i + 3], -NTT_ZETAS[64 + i]);
        a[4 * i + 0] = rx[0];
        a[4 * i + 1] = rx[1];
        a[4 * i + 2] = ry[0];
        a[4 * i + 3] = ry[1];
    }
    return a;
}
// nttBaseMul performs the multiplication of polynomials
// in `Zq[X]/(X^2-zeta)`. Used for multiplication of elements
// in `Rq` in the number-theoretic transformation domain.
/**
 * Performs NTT base multiplication.
 *
 * @param a0 - The first coefficient of the first polynomial.
 * @param a1 - The second coefficient of the first polynomial.
 * @param b0 - The first coefficient of the second polynomial.
 * @param b1 - The second coefficient of the second polynomial.
 * @param zeta - The zeta value used in the multiplication.
 * @returns An array containing the result of the multiplication.
 */
function nttBaseMul(a0, a1, b0, b1, zeta) {
    const r = new Array(2);
    r[0] = nttFqMul(a1, b1);
    r[0] = nttFqMul(r[0], zeta);
    r[0] += nttFqMul(a0, b0);
    r[1] = nttFqMul(a0, b1);
    r[1] += nttFqMul(a1, b0);
    return r;
}
// adds two polynomials.
/**
 * Adds two arrays element-wise.
 * @param a - The first array.
 * @param b - The second array.
 * @returns The resulting array after element-wise addition.
 */
function add(a, b) {
    const c = new Array(384);
    for (let i = 0; i < N; i++) {
        c[i] = a[i] + b[i];
    }
    return c;
}
// subtracts two polynomials.
/**
 * Subtracts the elements of array b from array a.
 *
 * @param a - The array from which to subtract.
 * @param b - The array to subtract.
 * @returns The resulting array after subtraction.
 */
function subtract(a, b) {
    for (let i = 0; i < N; i++) {
        a[i] -= b[i];
    }
    return a;
}
// nttInverse performs an inplace inverse number-theoretic transform (NTT)
// in `Rq` and multiplication by Montgomery factor 2^16.
// The input is in bit-reversed order, the output is in standard order.
/**
 * Performs the inverse Number Theoretic Transform (NTT) on the given array.
 *
 * @param r - The input array to perform the inverse NTT on.
 * @returns The array after performing the inverse NTT.
 */
function nttInverse(r) {
    let j = 0;
    for (let k = 0, l = 2; l <= 128; l <<= 1) {
        for (let start = 0; start < 256; start = j + l) {
            const zeta = NTT_ZETAS_INV[k];
            k = k + 1;
            for (j = start; j < start + l; j++) {
                const t = r[j];
                r[j] = barrett(t + r[j + l]);
                r[j + l] = t - r[j + l];
                r[j + l] = nttFqMul(zeta, r[j + l]);
            }
        }
    }
    for (j = 0; j < 256; j++) {
        r[j] = nttFqMul(r[j], NTT_ZETAS_INV[127]);
    }
    return r;
}
// subtractQ applies the conditional subtraction of q to each coefficient of a polynomial.
// if a is 3329 then convert to 0
// Returns:     a - q if a >= q, else a
/**
 * Subtracts the value of Q from each element in the given array.
 * The result should be a negative integer for each element.
 * If the leftmost bit is 0 (positive number), the value of Q is added back.
 *
 * @param r - The array to subtract Q from.
 * @returns The resulting array after the subtraction.
 */
function subtractQ(r) {
    for (let i = 0; i < N; i++) {
        r[i] -= Q; // should result in a negative integer
        // push left most signed bit to right most position
        // javascript does bitwise operations in signed 32 bit
        // add q back again if left most bit was 0 (positive number)
        r[i] += (r[i] >> 31) & Q;
    }
    return r;
}
