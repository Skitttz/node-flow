import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: "src",
    workspace: [
      {
        extends: true,
        test: {
          name: "unit",
          dir: "src/modules",
        },
      },
      {
        extends: true,
        test: {
          name: "e2e",
          dir: "src/tests/e2e",
          environment: "./prisma/vitest/prisma-vitest-environment.ts",
        },
      },
    ],
  },
});
