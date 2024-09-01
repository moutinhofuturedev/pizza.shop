import path from 'node:path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    setupFiles: ['./vitest/setup.ts'],
    environment: 'happy-dom',
    clearMocks: true,
    coverage: {
      provider: 'istanbul',
      // enabled: true,
      // reporter: ['html'],
      cleanOnRerun: true,
      clean: true,
      include: [
        'src/**/*.{ts,tsx}',
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
        '**/__tests__/**',
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
