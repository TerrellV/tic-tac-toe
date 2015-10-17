module.exports = function(grunt) {

  grunt.initConfig({
    browserSync: {
      default_options: {
        files: {
          src: [
            "build/*","*.html"
          ]
        },
        options: {
          watchTask: true,
          reloadDelay: 0,
          server: {
            baseDir: "./"
          }
        }
      }
    },
    jade: {
      index: {
        src: ['dev/jade/*'],
        dest: 'index.html'
      }
    },
    sass: {
      distrib: {
        files: {
          'build/build.css':'dev/scss/styles.scss'
        }
      }
    },
    browserify: {
      dist: {
        options: {
          transform: [
            [ 'babelify', {loose:'all'} ]
          ]
        },
        files: {
          'build/bundle.js' : 'dev/scripts/main.js'
        }
      }
    },
    watch: {
      js: {
        files: ['dev/scripts/**'],
        tasks: ['browserify'],
        options: {
          livereload: true
        }
      },
      indexJade: {
        files: ['dev/jade/*.jade'],
        tasks: ['jade:index'],
        options: {
          livereload: true
        }
      },
      styles: {
        files: ['dev/scss/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-browser-sync');
  // grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['jade', 'sass', 'browserify', 'browserSync', 'watch']);
};
