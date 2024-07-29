import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['./vitest/setup.ts'],
    environment: 'happy-dom',
    coverage: {
      provider: 'istanbul',
      enabled: true,
      reporter: ['html'],
      include: [
        'src/**',
        'tests/**',
        '__tests__/**',
        '__mocks__/**',
        'src/components/**',
        'src/api/**',
        'src/pages/app/orders/**',
        'src/pages/app/dashboard/**',
      ],
      exclude: [
        '**/node_modules/**',
        '**/cypress/**',
        '**/coverage/**',
        '**/public/**',
        '**/pages/_layouts/**',
        '**/src/**/loading/**',
        '**/src/lib/**',
        '**/src/App.tsx',
        '**/src/env.ts',
        '**/src/routes.tsx',
        '**/src/main.tsx',
        '**/src/pages/404.tsx',
        '**/src/pages/Error.tsx',
      ],
    },
  },
})
