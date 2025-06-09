import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'dist',
        lib: {
            entry: 'src/index.ts',
            name: 'Utils',
            formats: ['es', 'umd'],
            fileName: (format) => `utils.${format}.js`
        }
    }
});