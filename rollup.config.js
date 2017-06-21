module.exports = {
  format: 'umd',
  moduleName: 'immutable-models',
  external: [
    'immutable'
  ],
  onwarn: function (warning) {
    const skip_codes = [
      'THIS_IS_UNDEFINED',
      'MISSING_GLOBAL_NAME'
    ];

    if (skip_codes.indexOf(warning.code) === -1) {
      console.error(warning);
    }
  }
};
