export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
      },
    ],
  },
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy",
    "musicLibrary/MusicLibrary": "<rootDir>/src/__mocks__/MusicLibraryMock.tsx", // ✅ Mock remote module
  },
  setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.js"],
};
