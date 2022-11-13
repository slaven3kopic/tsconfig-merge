"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge2TSConfigs = void 0;
const fs_1 = require("fs");
function merge2TSConfigs(tsConfigAPath, tsConfigBPath) {
    if (!tsConfigAPath || !tsConfigBPath) {
        throw Error('Both tsconfig.json files have to be provided!');
    }
    if (!(0, fs_1.existsSync)(tsConfigAPath)) {
        throw Error(`${tsConfigAPath} doesn't exist!`);
    }
    if (!(0, fs_1.existsSync)(tsConfigBPath)) {
        throw Error(`${tsConfigBPath} doesn't exist!`);
    }
    let configA = require(tsConfigAPath);
    let configB = require(tsConfigBPath);
    if (configA.extends) {
        configA = mergeExtension(configA);
    }
    if (configB.extends) {
        configB = mergeExtension(configB);
    }
    return mergeObjects(configA, configB);
}
exports.merge2TSConfigs = merge2TSConfigs;
function mergeExtension(tsConfig) {
    const res = mergeObjects(require(tsConfig.extends), tsConfig);
    delete res.extends;
    return res;
}
function mergeObjects(tsConfigA, tsConfigB) {
    let result = {};
    const tsConfigProps = [...Object.keys(tsConfigA), ...Object.keys(tsConfigB)];
    tsConfigProps.forEach((tsConfigProp) => {
        if (tsConfigB[tsConfigProp] === undefined && tsConfigA[tsConfigProp]) {
            result[tsConfigProp] = tsConfigA[tsConfigProp];
        }
        else if (tsConfigA[tsConfigProp] === undefined &&
            tsConfigB[tsConfigProp]) {
            result[tsConfigProp] = tsConfigB[tsConfigProp];
        }
        else {
            if (typeof tsConfigA[tsConfigProp] === 'object' &&
                !Array.isArray(tsConfigA[tsConfigProp])) {
                result[tsConfigProp] = mergeObjects(tsConfigA[tsConfigProp], tsConfigB[tsConfigProp]);
            }
            else if (Array.isArray(tsConfigA[tsConfigProp])) {
                result[tsConfigProp] = [
                    ...new Set([...tsConfigA[tsConfigProp], ...tsConfigB[tsConfigProp]]),
                ];
            }
            else {
                result[tsConfigProp] = tsConfigB[tsConfigProp];
            }
        }
    });
    return result;
}
