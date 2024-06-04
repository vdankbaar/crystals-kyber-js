// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_test_suite.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.describe = exports.afterEach = exports.beforeEach = exports.afterAll = exports.beforeAll = exports.it = void 0;
    const _test_suite_js_1 = require("./_test_suite.js");
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
    function it(...args) {
        if (_test_suite_js_1.TestSuiteInternal.runningCount > 0) {
            throw new Error("cannot register new test cases after already registered test cases start running");
        }
        const options = itDefinition(...args);
        const { suite } = options;
        const testSuite = suite
            ? _test_suite_js_1.TestSuiteInternal.suites.get(suite.symbol)
            : _test_suite_js_1.TestSuiteInternal.current;
        if (!_test_suite_js_1.TestSuiteInternal.started)
            _test_suite_js_1.TestSuiteInternal.started = true;
        if (testSuite) {
            _test_suite_js_1.TestSuiteInternal.addStep(testSuite, options);
        }
        else {
            const { name, fn, ignore, only, permissions, sanitizeExit, sanitizeOps, sanitizeResources, } = options;
            _test_suite_js_1.TestSuiteInternal.registerTest({
                name,
                ignore,
                only,
                permissions,
                sanitizeExit,
                sanitizeOps,
                sanitizeResources,
                async fn(t) {
                    _test_suite_js_1.TestSuiteInternal.runningCount++;
                    try {
                        await fn.call({}, t);
                    }
                    finally {
                        _test_suite_js_1.TestSuiteInternal.runningCount--;
                    }
                },
            });
        }
    }
    exports.it = it;
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
        if (!_test_suite_js_1.TestSuiteInternal.current) {
            if (_test_suite_js_1.TestSuiteInternal.started) {
                throw new Error("cannot add global hooks after a global test is registered");
            }
            _test_suite_js_1.TestSuiteInternal.current = new _test_suite_js_1.TestSuiteInternal({
                name: "global",
                [name]: fn,
            });
        }
        else {
            _test_suite_js_1.TestSuiteInternal.setHook(_test_suite_js_1.TestSuiteInternal.current, name, fn);
        }
    }
    /** Run some shared setup before all of the tests in the suite. */
    function beforeAll(fn) {
        addHook("beforeAll", fn);
    }
    exports.beforeAll = beforeAll;
    /** Run some shared teardown after all of the tests in the suite. */
    function afterAll(fn) {
        addHook("afterAll", fn);
    }
    exports.afterAll = afterAll;
    /** Run some shared setup before each test in the suite. */
    function beforeEach(fn) {
        addHook("beforeEach", fn);
    }
    exports.beforeEach = beforeEach;
    /** Run some shared teardown after each test in the suite. */
    function afterEach(fn) {
        addHook("afterEach", fn);
    }
    exports.afterEach = afterEach;
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
        if (!suite && _test_suite_js_1.TestSuiteInternal.current) {
            const { symbol } = _test_suite_js_1.TestSuiteInternal.current;
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
    function describe(...args) {
        if (_test_suite_js_1.TestSuiteInternal.runningCount > 0) {
            throw new Error("cannot register new test suites after already registered test cases start running");
        }
        const options = describeDefinition(...args);
        if (!_test_suite_js_1.TestSuiteInternal.started)
            _test_suite_js_1.TestSuiteInternal.started = true;
        const { symbol } = new _test_suite_js_1.TestSuiteInternal(options);
        return { symbol };
    }
    exports.describe = describe;
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
});
