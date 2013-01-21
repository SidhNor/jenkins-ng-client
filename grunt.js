'use strict';

var testacular = require('testacular');

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    builddir: 'app/jsbuild',
    deploydir: 'I:/Jenkins/plugins/ng/',
    pkg: '<json:package.json>',
    meta: {
      banner: '/**\n' + ' * <%= pkg.description %>\n' +
      ' * @version v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * @link <%= pkg.homepage %>\n' +
      ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' + ' */'
    },
    concat: {
      build: {
        src: ['<banner:meta.banner>', 'app/js/app.js'],
        dest: '<%= builddir %>/<%= pkg.name %>.js'
      }
    },
    min: {
      build: {
        src: ['<banner:meta.banner>', '<config:concat.build.dest>'],
        dest: '<%= builddir %>/<%= pkg.name %>.min.js'
      }
    },
    lint: {
      files: ['app/js/**/*.js']
    },
    watch: {
      files: ['app/**/*.js', 'test/unit/**/*.js', 'test/e2e/*/**.js', 'app/index.html'],
      tasks: 'lint build deploy test'
    },
    jshint: {
      options: {
        curly: true,
        immed: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
        globalstrict:true
      },
      globals: {
        angular: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'build test');

  grunt.registerTask('build', 'build all', function () {

    var jsBuildFiles = grunt.config('concat.build.src');

    grunt.config('concat.build.src', jsBuildFiles.concat(['app/js/services/*.js', 'app/js/controllers/*.js', 'app/js/filters/*.js', 'app/js/directives/*.js']));

    grunt.task.run('concat min');
  });

  grunt.registerTask('dist', 'change dist location', function() {
    var dir = this.args[0];
    if (dir) { grunt.config('builddir', dir); }
  });

  grunt.registerTask('server', 'start testacular server', function () {
    //Mark the task as async but never call done, so the server stays up
    var done = this.async();
    testacular.server.start({ configFile: 'config/testacular.conf.js'});
  });

  grunt.registerTask('test', 'run tests (make sure server task is run first)', function () {
    var done = this.async();
    grunt.utils.spawn({
      cmd: process.platform === 'win32' ? 'testacular.cmd' : 'testacular',
      args: process.env.TRAVIS ? ['start', 'config/testacular.conf.js', '--single-run', '--no-auto-watch', '--reporters=dots', '--browsers=Firefox'] : ['run']
    }, function (error, result, code) {
      if (error) {
        grunt.warn("Make sure the testacular server is online: run `grunt server`.\n" +
          "Also make sure you have a browser open to http://localhost:8080/.\n" +
          error.stdout + error.stderr);
        //the testacular runner somehow modifies the files if it errors(??).
        //this causes grunt's watch task to re-fire itself constantly,
        //unless we wait for a sec
        setTimeout(done, 1000);
      } else {
        grunt.log.write(result.stdout);
        done();
      }
    });
  });

  grunt.registerTask('deploy', 'Deploy site to jenkins directory', function() {
    grunt.file.expand('app/css/*.*').forEach(function(path) {
      grunt.file.copy(path, grunt.config('deploydir') + path.replace(/app/ ,''));
    });

    grunt.file.expand('app/jsbuild/*.*').forEach(function(path) {
      grunt.file.copy(path, grunt.config('deploydir') + path.replace(/app/ ,''));
    });

    grunt.file.expand('app/views/*.*').forEach(function(path) {
      grunt.file.copy(path, grunt.config('deploydir') + path.replace(/app/ ,''));
    });

    grunt.file.expand('app/lib/*/*.*').forEach(function(path) {
      grunt.file.copy(path, grunt.config('deploydir') + path.replace(/app/ ,''));
    });   

    grunt.file.expand('app/index.html').forEach(function(path) {
      grunt.file.copy(path, grunt.config('deploydir') + path.replace(/app/ ,''));
    });    
  });
};