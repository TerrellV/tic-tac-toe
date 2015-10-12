module.exports = function(grunt) {

  grunt.initConfig({
    browserSync: {
      default_options: {
        files: {
          src: [
            "build/*"
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
        src: ['dev/*.jade'],
        dest: 'index.html'
      }
    },
    sass: {
      distrib: {
        files: {
          'build/build.css':'dev/styles.scss'
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
                    src: ['dev/app.js'],
                    dest: 'build/app.jsx.js'
                }
            ]
        }
    },
    watch: {
      indexJade: {
        files: ['dev/*.jade'],
        tasks: ['jade:index']
      },
      css: {
        files: ['dev/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true
        },
      },
      js: {
        files: ["dev/app.js"],
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
