/**
 * Make an assertion that `obj` is not an instance of `type`.
 * If so, then throw.
 *
 * @example
 * ```ts
 * import { assertNotInstanceOf } from "https://deno.land/std@$STD_VERSION/assert/assert_not_instance_of.ts";
 *
 * assertNotInstanceOf(new Date(), Number); // Doesn't throw
 * assertNotInstanceOf(new Date(), Date); // Throws
 * ```
 */
export declare function assertNotInstanceOf<A, T>(actual: A, unexpectedType: new (...args: any[]) => T, msg?: string): asserts actual is Exclude<A, T>;
