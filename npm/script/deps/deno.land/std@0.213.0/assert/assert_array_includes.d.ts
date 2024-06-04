/** An array-like object (`Array`, `Uint8Array`, `NodeList`, etc.) that is not a string */
export type ArrayLikeArg<T> = ArrayLike<T> & object;
/**
 * Make an assertion that `actual` includes the `expected` values. If not then
 * an error will be thrown.
 *
 * Type parameter can be specified to ensure values under comparison have the
 * same type.
 *
 * @example
 * ```ts
 * import { assertArrayIncludes } from "https://deno.land/std@$STD_VERSION/assert/assert_array_includes.ts";
 *
 * assertArrayIncludes([1, 2], [2]); // Doesn't throw
 * assertArrayIncludes([1, 2], [3]); // Throws
 * ```
 */
export declare function assertArrayIncludes<T>(actual: ArrayLikeArg<T>, expected: ArrayLikeArg<T>, msg?: string): void;
