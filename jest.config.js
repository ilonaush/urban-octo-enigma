
const testDom = process.env.TEST_ENV === 'dom';

module.exports = {
    "collectCoverageFrom": [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts"
    ],
    "resolver": "jest-pnp-resolver",
    "globals": {
        "NODE_ENV": "test"
    },
    "testMatch": testDom ?
        ["<rootDir>/src/js/components/*/?(*.)(spec|test).{js,jsx,ts,tsx}"]
        :
        ["<rootDir>/src/js/tests/?(*.)(spec|test).{js,jsx,ts,tsx}"],
    "testEnvironment": testDom ? "jsdom" : "node",
    "snapshotSerializers": [
        "enzyme-to-json/serializer"
    ],
    "testURL": "http://localhost",
    "moduleFileExtensions": [
        "web.js",
        "js",
        "web.ts",
        "ts",
        "web.tsx",
        "tsx",
        "json",
        "web.jsx",
        "jsx",
        "node",
        "png",
        "jpg"
    ],
    "modulePaths": [
        "images",
        "components"
    ],
    "moduleDirectories": [
        "node_modules",
        "images",
        "components"
    ],
    "setupFiles": [
        "react-app-polyfill/jsdom"
    ],
    "transform": {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
        "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
        "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
    },
    "transformIgnorePatterns": [
        "<rootDir>/node_modules/?!(react-redux/)",
        "^.+\\.module\\.(css|sass|scss)$"
    ],
    "moduleNameMapper": {
        "^react-native$": "react-native-web",
        "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
        "^images(.*)$": "<rootDir>/src/images$1",
        "^components(.*)$": "<rootDir>/src/js/components/$1"
    },
    "modulePathIgnorePatterns": [
        "<rootDir>/node_modules/"
    ],
    "setupTestFrameworkScriptFile": "<rootDir>/src/js/setupTests.js"
};
