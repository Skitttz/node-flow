import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import type { UserConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true,
    environment: 'node', // ou 'jsdom', dependendo do que você precisa
  },
} as UserConfig)
