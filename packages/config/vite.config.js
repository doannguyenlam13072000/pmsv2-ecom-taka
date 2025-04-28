import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'dist',
        lib: {
            entry: 'src/index.ts',
            name: 'Config',
            formats: ['es', 'umd'],
            fileName: (format) => `config.${format}.js`
        }
    }
});