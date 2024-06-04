// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
import { assertFalse } from "./assert_false.js";
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
export function assertNotInstanceOf(actual, 
// deno-lint-ignore no-explicit-any
unexpectedType, msg) {
    const msgSuffix = msg ? `: ${msg}` : ".";
    msg =
        `Expected object to not be an instance of "${typeof unexpectedType}"${msgSuffix}`;
    assertFalse(actual instanceof unexpectedType, msg);
}
