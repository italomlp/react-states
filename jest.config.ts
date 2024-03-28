import { pathsToModuleNameMapper, type JestConfigWithTsJest } from "ts-jest"

import { compilerOptions } from "./tsconfig.json"

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>"],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy",
    "^@/services/todo$": "<rootDir>/src/services/todo.ts",
    "^@/tests$": "<rootDir>/src/tests/index.ts",
    "^@/query$": "<rootDir>/src/query.tsx",
    ...pathsToModuleNameMapper(compilerOptions.paths),
  },
  // setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleDirectories: ["node_modules", "src"],
  coverageProvider: "v8",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: "ts-jest-mock-import-meta",
              options: {
                metaObjectReplacement: {
                  env: {
                    VITE_API_URL: "http://localhost:8000/api",
                    VITE_SENTRY_DSN: "",
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },
}

export default config
