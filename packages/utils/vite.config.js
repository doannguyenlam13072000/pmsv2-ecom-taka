import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'Utils',
            formats: ['es', 'umd'],
            fileName: (format) => `utils.${format}.js`
        }
    }
});