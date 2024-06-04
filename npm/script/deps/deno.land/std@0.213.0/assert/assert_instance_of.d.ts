/** Any constructor */
export type AnyConstructor = new (...args: any[]) => any;
/** Gets constructor type */
export type GetConstructorType<T extends AnyConstructor> = T extends new (...args: any) => infer C ? C : never;
/**
 * Make an assertion that `obj` is an instance of `type`.
 * If not then throw.
 *
 * @example
 * ```ts
 * import { assertInstanceOf } from "https://deno.land/std@$STD_VERSION/assert/assert_instance_of.ts";
 *
 * assertInstanceOf(new Date(), Date); // Doesn't throw
 * assertInstanceOf(new Date(), Number); // Throws
 * ```
 */
export declare function assertInstanceOf<T extends AnyConstructor>(actual: unknown, expectedType: T, msg?: string): asserts actual is GetConstructorType<T>;
