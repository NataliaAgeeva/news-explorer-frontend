const presets = [
  [
    '@babel/env',
    {
      targets: {
        edge: '15',
        ie: '11',
        firefox: '50',
        chrome: '64',
        android: '84',
        safari: '11.1',
        opera: '30',
      },
      useBuiltIns: 'usage',
      corejs: '3.4.1',
    },
  ],
];

module.exports = { presets };
