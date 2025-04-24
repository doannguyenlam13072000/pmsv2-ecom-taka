import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: '../../shared/packages/ui',
        lib: {
            entry: 'src/index.ts',
            name: 'UI',
            formats: ['es', 'umd'],
            fileName: (format) => `ui.${format}.js`
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                }
            }
        }
    }
});