/**
 * Make an assertion that `actual` and `expected` are almost equal numbers
 * through a given tolerance. It can be used to take into account IEEE-754
 * double-precision floating-point representation limitations. If the values
 * are not almost equal then throw.
 *
 * @example
 * ```ts
 * import { assertAlmostEquals } from "https://deno.land/std@$STD_VERSION/assert/mod.ts";
 *
 * assertAlmostEquals(0.01, 0.02, 0.1); // Doesn't throw
 * assertAlmostEquals(0.01, 0.02); // Throws
 * assertAlmostEquals(0.1 + 0.2, 0.3, 1e-16); // Doesn't throw
 * assertAlmostEquals(0.1 + 0.2, 0.3, 1e-17); // Throws
 * ```
 */
export declare function assertAlmostEquals(actual: number, expected: number, tolerance?: number, msg?: string): void;
