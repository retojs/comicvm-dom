const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
    roots: [
        "<rootDir>/src"
    ],

    modulePaths: [
        "<rootDir>/comicvm-geometry-2d"
    ],

    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),

    testPathIgnorePatterns: [
        "/node_modules/",
    ],

    testEnvironment: 'jsdom',

    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },

    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],

    setupFiles: ["jest-canvas-mock"]
};