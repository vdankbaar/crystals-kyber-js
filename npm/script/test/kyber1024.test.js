var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../_dnt.test_shims.js", "../deps/deno.land/std@0.213.0/testing/asserts.js", "../deps/deno.land/std@0.213.0/testing/bdd.js", "../mod.js", "../src/utils.js", "./utils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const dntShim = __importStar(require("../_dnt.test_shims.js"));
    const asserts_js_1 = require("../deps/deno.land/std@0.213.0/testing/asserts.js");
    const bdd_js_1 = require("../deps/deno.land/std@0.213.0/testing/bdd.js");
    const mod_js_1 = require("../mod.js");
    const utils_js_1 = require("../src/utils.js");
    const utils_js_2 = require("./utils.js");
    (0, bdd_js_1.describe)("Kyber1024", () => {
        let count;
        let sk;
        let ct;
        let ss;
        (0, bdd_js_1.beforeAll)(async () => {
            count = 0;
            sk = new Array(100);
            ct = new Array(100);
            ss = new Array(100);
            const data = await dntShim.Deno.readTextFile((0, utils_js_2.testVectorPath)() + "/PQCkemKAT_3168.rsp");
            const textByLine = data.split("\n");
            let skCount = 0;
            let ctCount = 0;
            let ssCount = 0;
            for (let i = 0; i < textByLine.length; i++) {
                if (textByLine[i][0] == "c" && textByLine[i][1] == "t") {
                    const tmp = new Uint8Array(1568);
                    for (let j = 0; j < 1568; j++) {
                        tmp[j] = (0, utils_js_2.hexToDec)(textByLine[i][2 * j + 5] + textByLine[i][2 * j + 1 + 5]);
                    }
                    ct[ctCount++] = tmp;
                }
                else if (textByLine[i][0] == "s" && textByLine[i][1] == "s") {
                    const tmp = new Uint8Array(32);
                    for (let j = 0; j < 32; j++) {
                        tmp[j] = (0, utils_js_2.hexToDec)(textByLine[i][2 * j + 5] + textByLine[i][2 * j + 1 + 5]);
                    }
                    ss[ssCount++] = tmp;
                }
                else if (textByLine[i][0] == "s" && textByLine[i][1] == "k") {
                    const tmp = new Uint8Array(3168);
                    for (let j = 0; j < 3168; j++) {
                        tmp[j] = (0, utils_js_2.hexToDec)(textByLine[i][2 * j + 5] + textByLine[i][2 * j + 1 + 5]);
                    }
                    sk[skCount++] = tmp;
                }
            }
        });
        (0, bdd_js_1.afterAll)(() => {
            console.log(`passed/total: ${count}/${sk.length}`);
        });
        (0, bdd_js_1.describe)("PQCkemKAT_3168.rsp", () => {
            (0, bdd_js_1.it)("should match demonstrated values", async () => {
                const kyber = new mod_js_1.Kyber1024();
                for (let i = 0; i < 100; i++) {
                    const res = await kyber.decap(ct[i], sk[i]);
                    (0, asserts_js_1.assertEquals)(res, ss[i]);
                    count++;
                }
            });
        });
        (0, bdd_js_1.describe)("A sample code in README.", () => {
            (0, bdd_js_1.it)("should work normally", async () => {
                const recipient = new mod_js_1.Kyber1024();
                const [pkR, skR] = await recipient.generateKeyPair();
                const sender = new mod_js_1.Kyber1024();
                const [ct, ssS] = await sender.encap(pkR);
                const ssR = await recipient.decap(ct, skR);
                (0, asserts_js_1.assertEquals)(ssS, ssR);
            });
            (0, bdd_js_1.it)("should work normally with deriveKeyPair", async () => {
                const recipient = new mod_js_1.Kyber1024();
                const api = await (0, utils_js_1.loadCrypto)();
                const seed = new Uint8Array(64);
                api.getRandomValues(seed);
                const [pkR, skR] = await recipient.deriveKeyPair(seed);
                const [pkR2, skR2] = await recipient.deriveKeyPair(seed);
                (0, asserts_js_1.assertEquals)(pkR, pkR2);
                (0, asserts_js_1.assertEquals)(skR, skR2);
                const sender = new mod_js_1.Kyber1024();
                const [ct, ssS] = await sender.encap(pkR);
                const ssR = await recipient.decap(ct, skR);
                (0, asserts_js_1.assertEquals)(ssS, ssR);
            });
        });
    });
});
