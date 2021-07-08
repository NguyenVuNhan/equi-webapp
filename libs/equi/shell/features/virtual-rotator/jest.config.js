module.exports = {
  displayName: 'equi-shell-features-virtual-rotator',
  preset: '../../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../../coverage/libs/equi/shell/features/virtual-rotator',
};
