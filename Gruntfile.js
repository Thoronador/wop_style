module.exports = function (grunt) {
  // Configure grunt
  grunt.initConfig({
    concat: {
      dist: {
        src: [
          'assets/js/jquery-2.1.0.min.js',
          'assets/js/jquery.jcarousel.min.js',
          'assets/js/jquery.jcarousel-autoscroll.min.js',
          'assets/js/bootstrap/dropdown.js',
          'assets/js/frogsystem.js',
        ],
        dest: 'assets/js/main.js',
      },
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'assets/css/main.css': 'assets/css/main.scss',
        }
      }
    },
    responsive_images: {
      coat_of_arms: {
        options: {
          sizes: [{
            width: 80,
            height: 100,
            quality: 100
          }]
        },
        files: [{
          expand: true,
          cwd: 'assets/schilde/',
          src: ['*.{jpg,gif,png}'],
          custom_dest: 'assets/schilde/small/'
        }]
      }
    },
    sprite: {
      coat_of_arms: {
        src: 'assets/schilde/small/*.*',
        destImg: 'assets/css/img/schilde.png',
        destCSS: 'assets/css/_coat-of-arms.scss',
        algorithm: 'binary-tree',
        cssTemplate: 'assets/css/coat-of-arms.scss.mustache'
      }
    },
		watch: {
			options: {
				spawn: false,
				livereload: true
			},
			scss: {
        files: ['assets/css/**/*.scss'],
        tasks: ['sass:dist']
			},
      js: {
        files: ['assets/js/**/*.js'],
        tasks: ['concat:dist']
      }
		}
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass:dist', 'concat:dist']);
  grunt.registerTask('coat_of_arms', ['responsive_images:coat_of_arms', 'sprite:coat_of_arms', 'sass:dist']);
}
