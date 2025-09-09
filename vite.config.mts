import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      all: false,
      exclude: [
        'node_modules/**',
        'generated/**',
      ],
    },
  }
})
