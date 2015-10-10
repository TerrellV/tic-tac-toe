module.exports = function(grunt) {

  grunt.initConfig({
    browserSync: {
      default_options: {
        files: {
          src: [
            "styles.scss",
            "*.html",
            "*.js",
          ]
        },
        options: {
          watchTask: true,
          reloadDelay: 2000,
          server: {
            baseDir: "./"
          }
        }
      }
    },
    jade: {
      index: {
        src: ['index.jade'],
        dest: 'index.html'
      }
    },
    sass: {
      distrib: {
        files: {
          'build.css':'styles.scss'
        }
      }
    },
    babel:{
        options: {
            sourceMap: true
        },
        dist: {
            files: [
                {
                    src: ['app.js'],
                    dest: 'app.jsx.js'
                }
            ]
        }
    },
    watch: {
      indexJade: {
        files: ['*.jade'],
        tasks: ['jade:index']
      },
      css: {
        files: ['styles.scss'],
        tasks: ['sass'],
        options: {
          livereload: true
        },
      },
      js: {
        files: ["app.js"],
        tasks: ["babel"]
      }
    }
  });
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['jade', 'sass', 'babel', 'browserSync', 'watch']);
};
