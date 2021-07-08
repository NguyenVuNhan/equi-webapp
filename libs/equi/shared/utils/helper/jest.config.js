module.exports = {
  displayName: 'equi-shared-utils-helper',
  preset: '../../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../../coverage/libs/equi/shared/utils/helper',
};
