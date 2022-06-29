/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        include: [
            '**/*.vitest.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        ],
        setupFiles: [
            'src/vitest-setup.ts'
        ],
        restoreMocks: true,
    },
});