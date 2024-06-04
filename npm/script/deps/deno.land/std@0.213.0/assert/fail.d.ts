/**
 * Forcefully throws a failed assertion.
 *
 * @example
 * ```ts
 * import { fail } from "https://deno.land/std@$STD_VERSION/assert/fail.ts";
 *
 * fail("Deliberately failed!"); // Throws
 * ```
 */
export declare function fail(msg?: string): never;
