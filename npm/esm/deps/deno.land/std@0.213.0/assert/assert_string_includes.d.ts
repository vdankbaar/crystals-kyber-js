/**
 * Make an assertion that actual includes expected. If not
 * then throw.
 *
 * @example
 * ```ts
 * import { assertStringIncludes } from "https://deno.land/std@$STD_VERSION/assert/assert_string_includes.ts";
 *
 * assertStringIncludes("Hello", "ello"); // Doesn't throw
 * assertStringIncludes("Hello", "world"); // Throws
 * ```
 */
export declare function assertStringIncludes(actual: string, expected: string, msg?: string): void;
