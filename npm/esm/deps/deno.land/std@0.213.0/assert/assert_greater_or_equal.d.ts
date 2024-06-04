/**
 * Make an assertion that `actual` is greater than or equal to `expected`.
 * If not then throw.
 *
 * @example
 * ```ts
 * import { assertGreaterOrEqual } from "https://deno.land/std@$STD_VERSION/assert/assert_greater_or_equal.ts";
 *
 * assertGreaterOrEqual(2, 1); // Doesn't throw
 * assertGreaterOrEqual(1, 1); // Doesn't throw
 * assertGreaterOrEqual(0, 1); // Throws
 * ```
 */
export declare function assertGreaterOrEqual<T>(actual: T, expected: T, msg?: string): void;
