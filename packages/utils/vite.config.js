import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: '../../shared/packages/utils',
        lib: {
            entry: 'src/index.ts',
            name: 'Utils',
            formats: ['es', 'umd'],
            fileName: (format) => `utils.${format}.js`
        }
    }
});