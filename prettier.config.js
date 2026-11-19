/** @type {import("prettier").Config} */
const config = {
  useTabs: false,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'none',
  printWidth: 100,
  plugins: [
    'prettier-plugin-svelte',
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss' // moet als laatste
  ],
  // Volgorde: packages → SvelteKit-aliassen ($app, $env) → #lib → relatief (./$types)
  importOrder: ['<BUILTIN_MODULES>', '<THIRD_PARTY_MODULES>', '^\\$', '^#lib', '^[.]'],
  importOrderTypeScriptVersion: '6.0.0',
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
  tailwindStylesheet: './src/routes/layout.css'
};

export default config;
