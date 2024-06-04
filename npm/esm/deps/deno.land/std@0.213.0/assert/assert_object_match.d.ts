/**
 * Make an assertion that `actual` object is a subset of `expected` object,
 * deeply. If not, then throw.
 *
 * @example
 * ```ts
 * import { assertObjectMatch } from "https://deno.land/std@$STD_VERSION/assert/assert_object_match.ts";
 *
 * assertObjectMatch({ foo: "bar" }, { foo: "bar" }); // Doesn't throw
 * assertObjectMatch({ foo: "bar" }, { foo: "baz" }); // Throws
 * ```
 */
export declare function assertObjectMatch(actual: Record<PropertyKey, any>, expected: Record<PropertyKey, unknown>, msg?: string): void;
