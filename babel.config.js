const devPresets = ['@vue/babel-preset-app'];
const buildPresets = [
  [
    '@babel/preset-env',
    // Config for @babel/preset-env
    {
      useBuiltIns: 'usage',
      corejs: 3
    }
  ],
];
module.exports = {
  presets: (process.env.NODE_ENV === 'development' ? devPresets : buildPresets),
};
