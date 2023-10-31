//jest.config.js

export default {
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    testEnvironment: "jsdom",
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
    },
    transform: {
      "^.+\\.jsx?$": "babel-jest",
    },
    testEnvironment: 'jest-environment-jsdom',
  };
  