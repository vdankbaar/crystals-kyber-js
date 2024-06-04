// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
/**
 * A library of assertion functions.
 * If the assertion is false an `AssertionError` will be thrown which will
 * result in pretty-printed diff of failing assertion.
 *
 * This module is browser compatible, but do not rely on good formatting of
 * values for AssertionError messages in browsers.
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/mod.ts} instead.
 *
 * @module
 */
import * as asserts from "../assert/mod.js";
/**
 * Make an assertion that `actual` and `expected` are almost equal numbers
 * through a given tolerance. It can be used to take into account IEEE-754
 * double-precision floating-point representation limitations. If the values
 * are not almost equal then throw.
 *
 * @example
 * ```ts
 * import { assertAlmostEquals } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * assertAlmostEquals(0.01, 0.02, 0.1); // Doesn't throw
 * assertAlmostEquals(0.01, 0.02); // Throws
 * assertAlmostEquals(0.1 + 0.2, 0.3, 1e-16); // Doesn't throw
 * assertAlmostEquals(0.1 + 0.2, 0.3, 1e-17); // Throws
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/assert_almost_equals.ts} instead.
 */
export function assertAlmostEquals(actual, expected, tolerance = 1e-7, msg) {
    asserts.assertAlmostEquals(actual, expected, tolerance, msg);
}
/**
 * Make an assertion that `actual` includes the `expected` values. If not then
 * an error will be thrown.
 *
 * Type parameter can be specified to ensure values under comparison have the
 * same type.
 *
 * @example
 * ```ts
 * import { assertArrayIncludes } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * assertArrayIncludes([1, 2], [2]); // Doesn't throw
 * assertArrayIncludes([1, 2], [3]); // Throws
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/assert_array_includes.ts} instead.
 */
export function assertArrayIncludes(actual, expected, msg) {
    asserts.assertArrayIncludes(actual, expected, msg);
}
/**
 * Make an assertion that `actual` and `expected` are equal, deeply. If not
 * deeply equal, then throw.
 *
 * Type parameter can be specified to ensure values under comparison have the
 * same type.
 *
 * @example
 * ```ts
 * import { assertEquals } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * assertEquals("world", "world"); // Doesn't throw
 * assertEquals("hello", "world"); // Throws
 * ```
 *
 * Note: formatter option is experimental and may be removed in the future.
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/assert_equals.ts} instead.
 */
export function assertEquals(actual, expected, msg, options = {}) {
    asserts.assertEquals(actual, expected, msg, options);
}
/**
 * Make an assertion that actual is not null or undefined.
 * If not then throw.
 *
 * @example
 * ```ts
 * import { assertExists } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * assertExists("something"); // Doesn't throw
 * assertExists(undefined); // Throws
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/assert_exists.ts} instead.
 */
export function assertExists(actual, msg) {
    asserts.assertExists(actual, msg);
}
/**
 * Make an assertion, error will be thrown if `expr` have truthy value.
 *
 * @example
 * ```ts
 * import { assertFalse } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * assertFalse(false); // Doesn't throw
 * assertFalse(true); // Throws
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/assert_false.ts} instead.
 */
export function assertFalse(expr, msg = "") {
    asserts.assertFalse(expr, msg);
}
/**
 * Make an assertion that `actual` is greater than or equal to `expected`.
 * If not then throw.
 *
 * @example
 * ```ts
 * import { assertGreaterOrEqual } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * assertGreaterOrEqual(2, 1); // Doesn't throw
 * assertGreaterOrEqual(1, 1); // Doesn't throw
 * assertGreaterOrEqual(0, 1); // Throws
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/assert_greater_or_equal.ts} instead.
 */
export function assertGreaterOrEqual(actual, expected, msg) {
    asserts.assertGreaterOrEqual(actual, expected, msg);
}
/**
 * Make an assertion that `actual` is greater than `expected`.
 * If not then throw.
 *
 * @example
 * ```ts
 * import { assertGreater } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * assertGreater(2, 1); // Doesn't throw
 * assertGreater(1, 1); // Throws
 * assertGreater(0, 1); // Throws
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/assert_greater.ts} instead.
 */
export function assertGreater(actual, expected, msg) {
    asserts.assertGreater(actual, expected, msg);
}
/**
 * Make an assertion that `obj` is an instance of `type`.
 * If not then throw.
 *
 * @example
 * ```ts
 * import { assertInstanceOf } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * assertInstanceOf(new Date(), Date); // Doesn't throw
 * assertInstanceOf(new Date(), Number); // Throws
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/assert_instance_of.ts} instead.
 */
export function assertInstanceOf(actual, expectedType, msg = "") {
    asserts.assertInstanceOf(actual, expectedType, msg);
}
/**
 * Make an assertion that `error` is an `Error`.
 * If not then an error will be thrown.
 * An error class and a string that should be included in the
 * error message can also be asserted.
 *
 * @example
 * ```ts
 * import { assertIsError } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * assertIsError(null); // Throws
 * assertIsError(new RangeError("Out of range")); // Doesn't throw
 * assertIsError(new RangeError("Out of range"), SyntaxError); // Throws
 * assertIsError(new RangeError("Out of range"), SyntaxError, "Out of range"); // Doesn't throw
 * assertIsError(new RangeError("Out of range"), SyntaxError, "Within range"); // Throws
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/assert_is_error.ts} instead.
 */
export function assertIsError(error, 
// deno-lint-ignore no-explicit-any
ErrorClass, msgMatches, msg) {
    asserts.assertIsError(error, ErrorClass, msgMatches, msg);
}
/**
 * Make an assertion that `actual` is less than or equal to `expected`.
 * If not then throw.
 *
 * @example
 * ```ts
 * import { assertLessOrEqual } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * assertLessOrEqual(1, 2); // Doesn't throw
 * assertLessOrEqual(1, 1); // Doesn't throw
 * assertLessOrEqual(1, 0); // Throws
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/assert_less_or_equal.ts} instead.
 */
export function assertLessOrEqual(actual, expected, msg) {
    asserts.assertLessOrEqual(actual, expected, msg);
}
/**
 * Make an assertion that `actual` is less than `expected`.
 * If not then throw.
 *
 * @example
 * ```ts
 * import { assertLess } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * assertLess(1, 2); // Doesn't throw
 * assertLess(2, 1); // Throws
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/assert_less.ts} instead.
 */
export function assertLess(actual, expected, msg) {
    asserts.assertLess(actual, expected, msg);
}
/**
 * Make an assertion that `actual` match RegExp `expected`. If not
 * then throw.
 *
 * @example
 * ```ts
 * import { assertMatch } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * assertMatch("Raptor", RegExp(/Raptor/)); // Doesn't throw
 * assertMatch("Denosaurus", RegExp(/Raptor/)); // Throws
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/assert_match.ts} instead.
 */
export function assertMatch(actual, expected, msg) {
    asserts.assertMatch(actual, expected, msg);
}
/**
 * Make an assertion that `actual` and `expected` are not equal, deeply.
 * If not then throw.
 *
 * Type parameter can be specified to ensure values under comparison have the same type.
 *
 * @example
 * ```ts
 * import { assertNotEquals } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * assertNotEquals(1, 2); // Doesn't throw
 * assertNotEquals(1, 1); // Throws
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/assert_not_equals.ts} instead.
 */
export function assertNotEquals(actual, expected, msg) {
    asserts.assertNotEquals(actual, expected, msg);
}
/**
 * Make an assertion that `obj` is not an instance of `type`.
 * If so, then throw.
 *
 * @example
 * ```ts
 * import { assertNotInstanceOf } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * assertNotInstanceOf(new Date(), Number); // Doesn't throw
 * assertNotInstanceOf(new Date(), Date); // Throws
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/assert_not_instance_of.ts} instead.
 */
export function assertNotInstanceOf(actual, 
// deno-lint-ignore no-explicit-any
unexpectedType, msg) {
    asserts.assertNotInstanceOf(actual, unexpectedType, msg);
}
/**
 * Make an assertion that `actual` not match RegExp `expected`. If match
 * then throw.
 *
 * @example
 * ```ts
 * import { assertNotMatch } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * assertNotMatch("Denosaurus", RegExp(/Raptor/)); // Doesn't throw
 * assertNotMatch("Raptor", RegExp(/Raptor/)); // Throws
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/assert_not_match.ts} instead.
 */
export function assertNotMatch(actual, expected, msg) {
    asserts.assertNotMatch(actual, expected, msg);
}
/**
 * Make an assertion that `actual` and `expected` are not strictly equal.
 * If the values are strictly equal then throw.
 *
 * @example
 * ```ts
 * import { assertNotStrictEquals } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * assertNotStrictEquals(1, 1); // Doesn't throw
 * assertNotStrictEquals(1, 2); // Throws
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/assert_not_strict_equals.ts} instead.
 */
export function assertNotStrictEquals(actual, expected, msg) {
    asserts.assertNotStrictEquals(actual, expected, msg);
}
/**
 * Make an assertion that `actual` object is a subset of `expected` object,
 * deeply. If not, then throw.
 *
 * @example
 * ```ts
 * import { assertObjectMatch } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * assertObjectMatch({ foo: "bar" }, { foo: "bar" }); // Doesn't throw
 * assertObjectMatch({ foo: "bar" }, { foo: "baz" }); // Throws
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/assert_object_match.ts} instead.
 */
export function assertObjectMatch(
// deno-lint-ignore no-explicit-any
actual, expected, msg) {
    asserts.assertObjectMatch(actual, expected, msg);
}
export async function assertRejects(fn, errorClassOrMsg, msgIncludesOrMsg, msg) {
    return await asserts.assertRejects(fn, 
    // deno-lint-ignore no-explicit-any
    errorClassOrMsg, // Cast errorClassOrMsg to the correct type
    msgIncludesOrMsg, msg);
}
/**
 * Make an assertion that `actual` and `expected` are strictly equal. If
 * not then throw.
 *
 * @example
 * ```ts
 * import { assertStrictEquals } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * const a = {};
 * const b = a;
 * assertStrictEquals(a, b); // Doesn't throw
 *
 * const c = {};
 * const d = {};
 * assertStrictEquals(c, d); // Throws
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/assert_strict_equals.ts} instead.
 */
export function assertStrictEquals(actual, expected, msg) {
    asserts.assertStrictEquals(actual, expected, msg);
}
/**
 * Make an assertion that actual includes expected. If not
 * then throw.
 *
 * @example
 * ```ts
 * import { assertStringIncludes } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * assertStringIncludes("Hello", "ello"); // Doesn't throw
 * assertStringIncludes("Hello", "world"); // Throws
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/assert_string_includes.ts} instead.
 */
export function assertStringIncludes(actual, expected, msg) {
    asserts.assertStringIncludes(actual, expected, msg);
}
export function assertThrows(fn, errorClassOrMsg, msgIncludesOrMsg, msg) {
    return asserts.assertThrows(fn, 
    // deno-lint-ignore no-explicit-any
    errorClassOrMsg, // Cast errorClassOrMsg to the correct type
    msgIncludesOrMsg, msg);
}
/**
 * Make an assertion, error will be thrown if `expr` does not have truthy value.
 *
 * @example
 * ```ts
 * import { assert } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * assert("hello".includes("ello")); // Doesn't throw
 * assert("hello".includes("world")); // Throws
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/assert.ts} instead.
 */
export function assert(expr, msg = "") {
    asserts.assert(expr, msg);
}
/**
 * Error thrown when an assertion fails.
 *
 * @example
 * ```ts
 * import { AssertionError } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * throw new AssertionError("Assertion failed");
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/assertion_error.ts} instead.
 */
export class AssertionError extends Error {
    /** Constructs a new instance. */
    constructor(message) {
        super(message);
        this.name = "AssertionError";
    }
}
/**
 * Deep equality comparison used in assertions
 * @param c actual value
 * @param d expected value
 *
 * @example
 * ```ts
 * import { equal } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * equal({ foo: "bar" }, { foo: "bar" }); // Returns `true`
 * equal({ foo: "bar" }, { foo: "baz" }); // Returns `false
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/equal.ts} instead.
 */
export function equal(c, d) {
    return asserts.equal(c, d);
}
/**
 * Forcefully throws a failed assertion.
 *
 * @example
 * ```ts
 * import { fail } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * fail("Deliberately failed!"); // Throws
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/fail.ts} instead.
 */
export function fail(msg) {
    asserts.fail(msg);
}
/**
 * Use this to stub out methods that will throw when invoked.
 *
 * @example
 * ```ts
 * import { unimplemented } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * unimplemented(); // Throws
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/unimplemented.ts} instead.
 */
export function unimplemented(msg) {
    asserts.unimplemented(msg);
}
/**
 * Use this to assert unreachable code.
 *
 * @example
 * ```ts
 * import { unreachable } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * unreachable(); // Throws
 * ```
 *
 * @deprecated (will be removed after 1.0.0) Import from {@link https://deno.land/std/assert/unreachable.ts} instead.
 */
export function unreachable() {
    asserts.unreachable();
}
