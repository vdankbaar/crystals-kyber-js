// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../fmt/colors.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.buildMessage = exports.diffstr = exports.diff = exports.DiffType = void 0;
    const colors_js_1 = require("../fmt/colors.js");
    exports.DiffType = {
        removed: "removed",
        common: "common",
        added: "added",
    };
    const REMOVED = 1;
    const COMMON = 2;
    const ADDED = 3;
    function createCommon(A, B, reverse) {
        const common = [];
        if (A.length === 0 || B.length === 0)
            return [];
        for (let i = 0; i < Math.min(A.length, B.length); i += 1) {
            const a = reverse ? A[A.length - i - 1] : A[i];
            const b = reverse ? B[B.length - i - 1] : B[i];
            if (a !== undefined && a === b) {
                common.push(a);
            }
            else {
                return common;
            }
        }
        return common;
    }
    function ensureDefined(item) {
        if (item === undefined) {
            throw Error("Unexpected missing FarthestPoint");
        }
        return item;
    }
    /**
     * Renders the differences between the actual and expected values
     * @param A Actual value
     * @param B Expected value
     */
    function diff(A, B) {
        const prefixCommon = createCommon(A, B);
        const suffixCommon = createCommon(A.slice(prefixCommon.length), B.slice(prefixCommon.length), true).reverse();
        A = suffixCommon.length
            ? A.slice(prefixCommon.length, -suffixCommon.length)
            : A.slice(prefixCommon.length);
        B = suffixCommon.length
            ? B.slice(prefixCommon.length, -suffixCommon.length)
            : B.slice(prefixCommon.length);
        const swapped = B.length > A.length;
        [A, B] = swapped ? [B, A] : [A, B];
        const M = A.length;
        const N = B.length;
        if (!M && !N && !suffixCommon.length && !prefixCommon.length)
            return [];
        if (!N) {
            return [
                ...prefixCommon.map((c) => ({ type: exports.DiffType.common, value: c })),
                ...A.map((a) => ({
                    type: swapped ? exports.DiffType.added : exports.DiffType.removed,
                    value: a,
                })),
                ...suffixCommon.map((c) => ({ type: exports.DiffType.common, value: c })),
            ];
        }
        const offset = N;
        const delta = M - N;
        const size = M + N + 1;
        const fp = Array.from({ length: size }, () => ({ y: -1, id: -1 }));
        /**
         * INFO:
         * This buffer is used to save memory and improve performance.
         * The first half is used to save route and last half is used to save diff
         * type.
         * This is because, when I kept new uint8array area to save type,performance
         * worsened.
         */
        const routes = new Uint32Array((M * N + size + 1) * 2);
        const diffTypesPtrOffset = routes.length / 2;
        let ptr = 0;
        let p = -1;
        function backTrace(A, B, current, swapped) {
            const M = A.length;
            const N = B.length;
            const result = [];
            let a = M - 1;
            let b = N - 1;
            let j = routes[current.id];
            let type = routes[current.id + diffTypesPtrOffset];
            while (true) {
                if (!j && !type)
                    break;
                const prev = j;
                if (type === REMOVED) {
                    result.unshift({
                        type: swapped ? exports.DiffType.removed : exports.DiffType.added,
                        value: B[b],
                    });
                    b -= 1;
                }
                else if (type === ADDED) {
                    result.unshift({
                        type: swapped ? exports.DiffType.added : exports.DiffType.removed,
                        value: A[a],
                    });
                    a -= 1;
                }
                else {
                    result.unshift({ type: exports.DiffType.common, value: A[a] });
                    a -= 1;
                    b -= 1;
                }
                j = routes[prev];
                type = routes[prev + diffTypesPtrOffset];
            }
            return result;
        }
        function createFP(slide, down, k, M) {
            if (slide && slide.y === -1 && down && down.y === -1) {
                return { y: 0, id: 0 };
            }
            const isAdding = (down?.y === -1) ||
                k === M ||
                (slide?.y || 0) > (down?.y || 0) + 1;
            if (slide && isAdding) {
                const prev = slide.id;
                ptr++;
                routes[ptr] = prev;
                routes[ptr + diffTypesPtrOffset] = ADDED;
                return { y: slide.y, id: ptr };
            }
            else if (down && !isAdding) {
                const prev = down.id;
                ptr++;
                routes[ptr] = prev;
                routes[ptr + diffTypesPtrOffset] = REMOVED;
                return { y: down.y + 1, id: ptr };
            }
            else {
                throw new Error("Unexpected missing FarthestPoint");
            }
        }
        function snake(k, slide, down, _offset, A, B) {
            const M = A.length;
            const N = B.length;
            if (k < -N || M < k)
                return { y: -1, id: -1 };
            const fp = createFP(slide, down, k, M);
            while (fp.y + k < M && fp.y < N && A[fp.y + k] === B[fp.y]) {
                const prev = fp.id;
                ptr++;
                fp.id = ptr;
                fp.y += 1;
                routes[ptr] = prev;
                routes[ptr + diffTypesPtrOffset] = COMMON;
            }
            return fp;
        }
        let currentFP = ensureDefined(fp[delta + offset]);
        while (currentFP && currentFP.y < N) {
            p = p + 1;
            for (let k = -p; k < delta; ++k) {
                fp[k + offset] = snake(k, fp[k - 1 + offset], fp[k + 1 + offset], offset, A, B);
            }
            for (let k = delta + p; k > delta; --k) {
                fp[k + offset] = snake(k, fp[k - 1 + offset], fp[k + 1 + offset], offset, A, B);
            }
            fp[delta + offset] = snake(delta, fp[delta - 1 + offset], fp[delta + 1 + offset], offset, A, B);
            currentFP = ensureDefined(fp[delta + offset]);
        }
        return [
            ...prefixCommon.map((c) => ({ type: exports.DiffType.common, value: c })),
            ...backTrace(A, B, currentFP, swapped),
            ...suffixCommon.map((c) => ({ type: exports.DiffType.common, value: c })),
        ];
    }
    exports.diff = diff;
    /**
     * Renders the differences between the actual and expected strings
     * Partially inspired from https://github.com/kpdecker/jsdiff
     * @param A Actual string
     * @param B Expected string
     */
    function diffstr(A, B) {
        function unescape(string) {
            // unescape invisible characters.
            // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#escape_sequences
            return string
                .replaceAll("\b", "\\b")
                .replaceAll("\f", "\\f")
                .replaceAll("\t", "\\t")
                .replaceAll("\v", "\\v")
                .replaceAll(// does not remove line breaks
            /\r\n|\r|\n/g, (str) => str === "\r" ? "\\r" : str === "\n" ? "\\n\n" : "\\r\\n\r\n");
        }
        function tokenize(string, { wordDiff = false } = {}) {
            if (wordDiff) {
                // Split string on whitespace symbols
                const tokens = string.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/);
                // Extended Latin character set
                const words = /^[a-zA-Z\u{C0}-\u{FF}\u{D8}-\u{F6}\u{F8}-\u{2C6}\u{2C8}-\u{2D7}\u{2DE}-\u{2FF}\u{1E00}-\u{1EFF}]+$/u;
                // Join boundary splits that we do not consider to be boundaries and merge empty strings surrounded by word chars
                for (let i = 0; i < tokens.length - 1; i++) {
                    const token = tokens[i];
                    const tokenPlusTwo = tokens[i + 2];
                    if (!tokens[i + 1] &&
                        token &&
                        tokenPlusTwo &&
                        words.test(token) &&
                        words.test(tokenPlusTwo)) {
                        tokens[i] += tokenPlusTwo;
                        tokens.splice(i + 1, 2);
                        i--;
                    }
                }
                return tokens.filter((token) => token);
            }
            else {
                // Split string on new lines symbols
                const tokens = [];
                const lines = string.split(/(\n|\r\n)/);
                // Ignore final empty token when text ends with a newline
                if (!lines[lines.length - 1]) {
                    lines.pop();
                }
                // Merge the content and line separators into single tokens
                for (const [i, line] of lines.entries()) {
                    if (i % 2) {
                        tokens[tokens.length - 1] += line;
                    }
                    else {
                        tokens.push(line);
                    }
                }
                return tokens;
            }
        }
        // Create details by filtering relevant word-diff for current line
        // and merge "space-diff" if surrounded by word-diff for cleaner displays
        function createDetails(line, tokens) {
            return tokens.filter(({ type }) => type === line.type || type === exports.DiffType.common).map((result, i, t) => {
                const token = t[i - 1];
                if ((result.type === exports.DiffType.common) && token &&
                    (token.type === t[i + 1]?.type) && /\s+/.test(result.value)) {
                    return {
                        ...result,
                        type: token.type,
                    };
                }
                return result;
            });
        }
        // Compute multi-line diff
        const diffResult = diff(tokenize(`${unescape(A)}\n`), tokenize(`${unescape(B)}\n`));
        const added = [], removed = [];
        for (const result of diffResult) {
            if (result.type === exports.DiffType.added) {
                added.push(result);
            }
            if (result.type === exports.DiffType.removed) {
                removed.push(result);
            }
        }
        // Compute word-diff
        const hasMoreRemovedLines = added.length < removed.length;
        const aLines = hasMoreRemovedLines ? added : removed;
        const bLines = hasMoreRemovedLines ? removed : added;
        for (const a of aLines) {
            let tokens = [], b;
            // Search another diff line with at least one common token
            while (bLines.length) {
                b = bLines.shift();
                const tokenized = [
                    tokenize(a.value, { wordDiff: true }),
                    tokenize(b?.value ?? "", { wordDiff: true }),
                ];
                if (hasMoreRemovedLines)
                    tokenized.reverse();
                tokens = diff(tokenized[0], tokenized[1]);
                if (tokens.some(({ type, value }) => type === exports.DiffType.common && value.trim().length)) {
                    break;
                }
            }
            // Register word-diff details
            a.details = createDetails(a, tokens);
            if (b) {
                b.details = createDetails(b, tokens);
            }
        }
        return diffResult;
    }
    exports.diffstr = diffstr;
    /**
     * Colors the output of assertion diffs
     * @param diffType Difference type, either added or removed
     */
    function createColor(diffType, { background = false } = {}) {
        // TODO(@littledivy): Remove this when we can detect
        // true color terminals.
        // https://github.com/denoland/deno_std/issues/2575
        background = false;
        switch (diffType) {
            case exports.DiffType.added:
                return (s) => background ? (0, colors_js_1.bgGreen)((0, colors_js_1.white)(s)) : (0, colors_js_1.green)((0, colors_js_1.bold)(s));
            case exports.DiffType.removed:
                return (s) => background ? (0, colors_js_1.bgRed)((0, colors_js_1.white)(s)) : (0, colors_js_1.red)((0, colors_js_1.bold)(s));
            default:
                return colors_js_1.white;
        }
    }
    /**
     * Prefixes `+` or `-` in diff output
     * @param diffType Difference type, either added or removed
     */
    function createSign(diffType) {
        switch (diffType) {
            case exports.DiffType.added:
                return "+   ";
            case exports.DiffType.removed:
                return "-   ";
            default:
                return "    ";
        }
    }
    function buildMessage(diffResult, { stringDiff = false } = {}) {
        const messages = [], diffMessages = [];
        messages.push("");
        messages.push("");
        messages.push(`    ${(0, colors_js_1.gray)((0, colors_js_1.bold)("[Diff]"))} ${(0, colors_js_1.red)((0, colors_js_1.bold)("Actual"))} / ${(0, colors_js_1.green)((0, colors_js_1.bold)("Expected"))}`);
        messages.push("");
        messages.push("");
        diffResult.forEach((result) => {
            const c = createColor(result.type);
            const line = result.details?.map((detail) => detail.type !== exports.DiffType.common
                ? createColor(detail.type, { background: true })(detail.value)
                : detail.value).join("") ?? result.value;
            diffMessages.push(c(`${createSign(result.type)}${line}`));
        });
        messages.push(...(stringDiff ? [diffMessages.join("")] : diffMessages));
        messages.push("");
        return messages;
    }
    exports.buildMessage = buildMessage;
});
