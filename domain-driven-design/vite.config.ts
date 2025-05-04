import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import type { UserConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
} as UserConfig)
