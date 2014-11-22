var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    appConfig: {
      testUrl: '/tic-tac-toe/test/',
      demoUrl: '/tic-tac-toe/demo.html'
    },
    connect: {
      options : {
        port: 9000,
        hostname: '*'
      },
      test: {
        options: {
          open: {
            target: 'http://localhost:<%= connect.options.port %><%= appConfig.testUrl %>'
          },
          middleware: function (connect) {
            return [
              mountFolder(connect, '../')
            ];
          },
          keepalive: true
        }
      },
      demo: {
        options: {
          open: {
            target: 'http://localhost:<%= connect.options.port %><%= appConfig.demoUrl %>'
          },
          middleware: function (connect) {
            return [
              mountFolder(connect, '../')
            ];
          },
          keepalive: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('demo', ['connect:demo']);
  grunt.registerTask('test', ['connect:test']);
  grunt.registerTask('default', ['test']);
};
