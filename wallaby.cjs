module.exports = () => ({

  autoDetect: true,
  env: {
    type: 'node',
    params: {
      runner: '--experimental-vm-modules --no-warnings',
    },
  },
});
