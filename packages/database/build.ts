import packageJson from './package.json'
import { $ } from 'bun'
import dts from 'bun-plugin-dts'

await $`rm -rf dist`

const result = await Bun.build({
  entrypoints: ['src/index.ts'],
  external: Object.keys(packageJson.dependencies),
  outdir: 'dist',
  target: 'node',
  minify: true,
  plugins: [dts({ output: { noBanner: !0 } })]
})

console.log(result)
