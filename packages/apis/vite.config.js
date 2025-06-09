import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'dist',
        lib: {
            entry: 'src/index.ts',
            name: 'APIs',
            formats: ['es', 'umd'],
            fileName: (format) => `apis.${format}.js`
        }
    }
});