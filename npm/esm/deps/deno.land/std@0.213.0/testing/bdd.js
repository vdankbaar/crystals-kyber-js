// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
import { TestSuiteInternal, } from "./_test_suite.js";
/** Generates an ItDefinition from ItArgs. */
function itDefinition(...args) {
    let [suiteOptionsOrNameOrFn, optionsOrNameOrFn, optionsOrFn, fn,] = args;
    let suite = undefined;
    let name;
    let options;
    if (typeof suiteOptionsOrNameOrFn === "object" &&
        typeof suiteOptionsOrNameOrFn.symbol === "symbol") {
        suite = suiteOptionsOrNameOrFn;
    }
    else {
        fn = optionsOrFn;
        optionsOrFn = optionsOrNameOrFn;
        optionsOrNameOrFn = suiteOptionsOrNameOrFn;
    }
    if (typeof optionsOrNameOrFn === "string") {
        name = optionsOrNameOrFn;
        if (typeof optionsOrFn === "function") {
            fn = optionsOrFn;
            options = {};
        }
        else {
            options = optionsOrFn;
            if (!fn)
                fn = options.fn;
        }
    }
    else if (typeof optionsOrNameOrFn === "function") {
        fn = optionsOrNameOrFn;
        name = fn.name;
        options = {};
    }
    else {
        options = optionsOrNameOrFn;
        if (typeof optionsOrFn === "function") {
            fn = optionsOrFn;
        }
        else {
            fn = options.fn;
        }
        name = options.name ?? fn.name;
    }
    return {
        suite,
        ...options,
        name,
        fn,
    };
}
/** Registers an individual test case. */
export function it(...args) {
    if (TestSuiteInternal.runningCount > 0) {
        throw new Error("cannot register new test cases after already registered test cases start running");
    }
    const options = itDefinition(...args);
    const { suite } = options;
    const testSuite = suite
        ? TestSuiteInternal.suites.get(suite.symbol)
        : TestSuiteInternal.current;
    if (!TestSuiteInternal.started)
        TestSuiteInternal.started = true;
    if (testSuite) {
        TestSuiteInternal.addStep(testSuite, options);
    }
    else {
        const { name, fn, ignore, only, permissions, sanitizeExit, sanitizeOps, sanitizeResources, } = options;
        TestSuiteInternal.registerTest({
            name,
            ignore,
            only,
            permissions,
            sanitizeExit,
            sanitizeOps,
            sanitizeResources,
            async fn(t) {
                TestSuiteInternal.runningCount++;
                try {
                    await fn.call({}, t);
                }
                finally {
                    TestSuiteInternal.runningCount--;
                }
            },
        });
    }
}
it.only = function itOnly(...args) {
    const options = itDefinition(...args);
    return it({
        ...options,
        only: true,
    });
};
it.ignore = function itIgnore(...args) {
    const options = itDefinition(...args);
    return it({
        ...options,
        ignore: true,
    });
};
it.skip = it.ignore;
function addHook(name, fn) {
    if (!TestSuiteInternal.current) {
        if (TestSuiteInternal.started) {
            throw new Error("cannot add global hooks after a global test is registered");
        }
        TestSuiteInternal.current = new TestSuiteInternal({
            name: "global",
            [name]: fn,
        });
    }
    else {
        TestSuiteInternal.setHook(TestSuiteInternal.current, name, fn);
    }
}
/** Run some shared setup before all of the tests in the suite. */
export function beforeAll(fn) {
    addHook("beforeAll", fn);
}
/** Run some shared teardown after all of the tests in the suite. */
export function afterAll(fn) {
    addHook("afterAll", fn);
}
/** Run some shared setup before each test in the suite. */
export function beforeEach(fn) {
    addHook("beforeEach", fn);
}
/** Run some shared teardown after each test in the suite. */
export function afterEach(fn) {
    addHook("afterEach", fn);
}
/** Generates a DescribeDefinition from DescribeArgs. */
function describeDefinition(...args) {
    let [suiteOptionsOrNameOrFn, optionsOrNameOrFn, optionsOrFn, fn,] = args;
    let suite = undefined;
    let name;
    let options;
    if (typeof suiteOptionsOrNameOrFn === "object" &&
        typeof suiteOptionsOrNameOrFn.symbol === "symbol") {
        suite = suiteOptionsOrNameOrFn;
    }
    else {
        fn = optionsOrFn;
        optionsOrFn = optionsOrNameOrFn;
        optionsOrNameOrFn = suiteOptionsOrNameOrFn;
    }
    if (typeof optionsOrNameOrFn === "string") {
        name = optionsOrNameOrFn;
        if (typeof optionsOrFn === "function") {
            fn = optionsOrFn;
            options = {};
        }
        else {
            options = optionsOrFn ?? {};
            if (!fn)
                fn = options.fn;
        }
    }
    else if (typeof optionsOrNameOrFn === "function") {
        fn = optionsOrNameOrFn;
        name = fn.name;
        options = {};
    }
    else {
        options = optionsOrNameOrFn ?? {};
        if (typeof optionsOrFn === "function") {
            fn = optionsOrFn;
        }
        else {
            fn = options.fn;
        }
        name = options.name ?? fn?.name ?? "";
    }
    if (!suite) {
        suite = options.suite;
    }
    if (!suite && TestSuiteInternal.current) {
        const { symbol } = TestSuiteInternal.current;
        suite = { symbol };
    }
    return {
        ...options,
        suite,
        name,
        fn,
    };
}
/** Registers a test suite. */
export function describe(...args) {
    if (TestSuiteInternal.runningCount > 0) {
        throw new Error("cannot register new test suites after already registered test cases start running");
    }
    const options = describeDefinition(...args);
    if (!TestSuiteInternal.started)
        TestSuiteInternal.started = true;
    const { symbol } = new TestSuiteInternal(options);
    return { symbol };
}
describe.only = function describeOnly(...args) {
    const options = describeDefinition(...args);
    return describe({
        ...options,
        only: true,
    });
};
describe.ignore = function describeIgnore(...args) {
    const options = describeDefinition(...args);
    return describe({
        ...options,
        ignore: true,
    });
};
describe.skip = describe.ignore;
