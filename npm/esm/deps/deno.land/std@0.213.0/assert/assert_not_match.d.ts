/**
 * Make an assertion that `actual` not match RegExp `expected`. If match
 * then throw.
 *
 * @example
 * ```ts
 * import { assertNotMatch } from "https://deno.land/std@$STD_VERSION/assert/assert_not_match.ts";
 *
 * assertNotMatch("Denosaurus", RegExp(/Raptor/)); // Doesn't throw
 * assertNotMatch("Raptor", RegExp(/Raptor/)); // Throws
 * ```
 */
export declare function assertNotMatch(actual: string, expected: RegExp, msg?: string): void;
