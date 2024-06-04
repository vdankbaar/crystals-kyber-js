/**
 * Make an assertion that `actual` is greater than `expected`.
 * If not then throw.
 *
 * @example
 * ```ts
 * import { assertGreater } from "https://deno.land/std@$STD_VERSION/assert/assert_greater.ts";
 *
 * assertGreater(2, 1); // Doesn't throw
 * assertGreater(1, 1); // Throws
 * assertGreater(0, 1); // Throws
 * ```
 */
export declare function assertGreater<T>(actual: T, expected: T, msg?: string): void;
