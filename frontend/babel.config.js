export default {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs' // Añade este plugin
  ]
};