// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
import { assert } from "./assert.js";
/**
 * Forcefully throws a failed assertion.
 *
 * @example
 * ```ts
 * import { fail } from "https://deno.land/std@$STD_VERSION/assert/fail.ts";
 *
 * fail("Deliberately failed!"); // Throws
 * ```
 */
export function fail(msg) {
    const msgSuffix = msg ? `: ${msg}` : ".";
    assert(false, `Failed assertion${msgSuffix}`);
}
