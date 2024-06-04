/**
 * Executes a function which returns a promise, expecting it to reject.
 *
 * @example
 * ```ts
 * import { assertRejects } from "https://deno.land/std@$STD_VERSION/assert/assert_rejects.ts";
 *
 * await assertRejects(async () => Promise.reject(new Error())); // Doesn't throw
 * await assertRejects(async () => console.log("Hello world")); // Throws
 * ```
 */
export declare function assertRejects(fn: () => PromiseLike<unknown>, msg?: string): Promise<unknown>;
/**
 * Executes a function which returns a promise, expecting it to reject.
 * If it does not, then it throws. An error class and a string that should be
 * included in the error message can also be asserted.
 *
 * @example
 * ```ts
 * import { assertRejects } from "https://deno.land/std@$STD_VERSION/assert/assert_rejects.ts";
 *
 * await assertRejects(async () => Promise.reject(new Error()), Error); // Doesn't throw
 * await assertRejects(async () => Promise.reject(new Error()), SyntaxError); // Throws
 * ```
 */
export declare function assertRejects<E extends Error = Error>(fn: () => PromiseLike<unknown>, ErrorClass: new (...args: any[]) => E, msgIncludes?: string, msg?: string): Promise<E>;
