import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()], 
  resolve: {
    alias: {
      '@@app': path.resolve(__dirname, 'src'),
      '@@config': path.resolve(__dirname, 'src/config'),
      '@@shared': path.resolve(__dirname, 'src/shared'),
      '@@modules': path.resolve(__dirname, 'src/modules'),
      '@@transactions': path.resolve(__dirname, 'src/modules/transactions'),
    },
  },
});
