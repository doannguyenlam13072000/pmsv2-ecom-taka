import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: '../../shared/packages/constants',
        lib: {
            entry: 'src/index.ts',
            name: 'Constants',
            formats: ['es', 'umd'],
            fileName: (format) => `constants.${format}.js`
        }
    }
});