// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
// @ts-ignore
import DefineOptions from 'unplugin-vue-define-options/vite';

export default defineConfig({
  test: {
    environment: 'happy-dom'
  },
  build: {
    //压缩
    //minify: false,
    rollupOptions: {
      //忽略不需要打包的文件
      external: ['vue', /\.less/, '@enistry/utils'],
      input: {
        'index': 'index.ts',
        'src/index': 'src/index.ts',
        'src/button/index': 'src/button/index.ts'
      },
      output: [
        {
          //打包格式
          format: 'es',
          //让打包目录和我们目录对应
          preserveModules: true,
          exports: 'named',
          //配置打包根目录
          dir: '../enistry/es',
          preserveModulesRoot: 'src',
          entryFileNames: (chunkInfo) => {
            const name = chunkInfo.name.replace(/^\.\.\/\.\.\/\.\.\/Vue3_TS_vite\/packages\/components\//, '');
            return name === 'index' ? 'index.js' : `${name}.js`;
          }
        },
        {
          //打包格式
          format: 'cjs',
          //让打包目录和我们目录对应
          preserveModules: true,
          exports: 'named',
          //配置打包根目录
          dir: '../enistry/lib',
          preserveModulesRoot: 'src',
          entryFileNames: (chunkInfo) => {
            const name = chunkInfo.name.replace(/^\.\.\/\.\.\/\.\.\/Vue3_TS_vite\/packages\/components\//, '');
            return name === 'index' ? 'index.js' : `${name}.js`;
          }
        }
      ]
    },
    lib: {
      entry: './index.ts',
      name: 'enistry',
      formats: ['es', 'cjs']
    }
  },
  plugins: [
    vue(),
    DefineOptions(),
    dts({
      entryRoot: ".",
      outDir: "../enistry/es",
      tsConfigFilePath: "../../tsconfig.json",
      compilerOptions: {
        preserveSymlinks: true
      }
    }),
    dts({
      entryRoot: ".",
      outDir: "../enistry/lib",
      tsConfigFilePath: "../../tsconfig.json",
      compilerOptions: {
        preserveSymlinks: true
      }
    }),
    {
      name: "style",
      generateBundle(config, bundle) {
        //这里可以获取打包后的文件目录以及代码code
        const keys = Object.keys(bundle);

        for (const key of keys) {
          const bundler: any = bundle[key as any];
          //rollup内置方法,将所有输出文件code中的.less换成.css,因为我们当时没有打包less文件

          this.emitFile({
            type: "asset",
            fileName: key, //文件名名不变
            source: bundler.code.replace(/\.less/g, ".css"),
          });
        }
      }
    }
  ]
});
