/** Assertion condition for {@linkcode assertFalse}. */
export type Falsy = false | 0 | 0n | "" | null | undefined;
/**
 * Make an assertion, error will be thrown if `expr` have truthy value.
 *
 * @example
 * ```ts
 * import { assertFalse } from "https://deno.land/std@$STD_VERSION/assert/assert_false.ts";
 *
 * assertFalse(false); // Doesn't throw
 * assertFalse(true); // Throws
 * ```
 */
export declare function assertFalse(expr: unknown, msg?: string): asserts expr is Falsy;
