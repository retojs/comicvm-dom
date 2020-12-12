module.exports = {
    roots: [
        "<rootDir>/src"
    ],

    testEnvironment: 'jsdom',

    testPathIgnorePatterns: [
        "/node_modules/",
    ],

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