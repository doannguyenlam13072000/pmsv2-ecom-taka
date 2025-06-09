import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'dist',
        lib: {
            entry: 'src/index.ts',
            name: 'Types',
            formats: ['es', 'umd'],
            fileName: (format) => `types.${format}.js`
        }
    }
});