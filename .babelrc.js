const config = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          useBuiltIns: 'entry',
          corejs: 3,
        },
      },
    ],
  ],
};

if (process.env.NODE_ENV !== 'production') {
  config.presets = [['next/babel']];
}

if (process.env.ISTANBUL === '1') {
  config.plugins.push('istanbul');
}

module.exports = config;
