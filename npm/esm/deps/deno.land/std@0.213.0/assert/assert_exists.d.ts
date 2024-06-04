/**
 * Make an assertion that actual is not null or undefined.
 * If not then throw.
 *
 * @example
 * ```ts
 * import { assertExists } from "https://deno.land/std@$STD_VERSION/assert/assert_exists.ts";
 *
 * assertExists("something"); // Doesn't throw
 * assertExists(undefined); // Throws
 * ```
 */
export declare function assertExists<T>(actual: T, msg?: string): asserts actual is NonNullable<T>;
