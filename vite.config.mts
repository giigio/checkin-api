import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: 'src/tests',
    projects:[
      {
        extends:true,
        test:{
          name:'unit',
          dir:'src/tests'
        },
      },
      {
        extends:true,
        test:{
          name:'e2e',
          dir:'src/controllers/e2e',
          environment:'prisma/vitest-environment-prisma/prisma-test-environment.mts'
        }
      }
    ],
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
  ,
  // Instruct the Vite file watcher to ignore generated/prisma and node_modules so
  // Prisma's temp file operations don't trigger test runner reloads on Windows.
  server: {
    watch: {
      ignored: ['**/generated/**', '**/prisma/**', '**/node_modules/**'],
    },
  },
})
