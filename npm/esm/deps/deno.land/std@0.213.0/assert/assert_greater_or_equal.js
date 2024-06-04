// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
import { format } from "./_format.js";
import { AssertionError } from "./assertion_error.js";
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
export function assertGreaterOrEqual(actual, expected, msg) {
    if (actual >= expected)
        return;
    const actualString = format(actual);
    const expectedString = format(expected);
    throw new AssertionError(msg ?? `Expect ${actualString} >= ${expectedString}`);
}
