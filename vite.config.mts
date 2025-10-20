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
})
