import { transformJison } from './.esbuild/jisonTransformer.cjs';
import { defineConfig } from 'vitest/config';

const fileRegex = /\.jison$/;

/** Transforms jison to js. */
export function jisonPlugin() {
  return {
    name: 'transform-jison',

    transform(src: string, id: string) {
      if (fileRegex.test(id)) {
        // eslint-disable-next-line no-console
        console.log('Transforming', id);
        return {
          // @ts-ignore no typings for jison
          code: transformJison(src),
          map: null, // provide source map if available
        };
      }
    },
  };
}

export default defineConfig({
  resolve: {
    extensions: ['.jison', '.js', '.ts', '.json'],
  },
  plugins: [jisonPlugin()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/tests/setup.ts'],
  },
});
