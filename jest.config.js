const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/equi-react',
    '<rootDir>/libs/equi/feature/context/rotator',
  ],
};
