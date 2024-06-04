/**
 * Make an assertion that `actual` is less than or equal to `expected`.
 * If not then throw.
 *
 * @example
 * ```ts
 * import { assertLessOrEqual } from "https://deno.land/std@$STD_VERSION/assert/assert_less_or_equal.ts";
 *
 * assertLessOrEqual(1, 2); // Doesn't throw
 * assertLessOrEqual(1, 1); // Doesn't throw
 * assertLessOrEqual(1, 0); // Throws
 * ```
 */
export declare function assertLessOrEqual<T>(actual: T, expected: T, msg?: string): void;
