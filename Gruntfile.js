module.exports = function (grunt) {
    const sassImpl = require('node-sass');

    // Configure grunt
    grunt.initConfig({
        concat: {
            dist: {
                src: [
                    'assets/js/jquery-3.5.1.min.js',
                    'assets/js/jquery.jcarousel.min.js',
                    'assets/js/bootstrap/dropdown.js',
                    'assets/js/js.cookie.js',
                    'assets/js/frogsystem.js'
                ],
                dest: 'www/styles/wop/main.js'
            }
        },
        sass: {
            dist: {
                options: {
                    implementation: sassImpl,
                    style: 'expanded'
                },
                files: {
                    'www/styles/wop/main.css': 'assets/css/main.scss'
                }
            },
            karussell: {
                options: {
                    implementation: sassImpl,
                    style: 'expanded'
                },
                files: {
                    'www/karussell/karussell.css': 'assets/css/karussell.scss'
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
            },
            karussell: {
                options: {
                    sizes: [{
                        width: 92,
                        height: 115,
                        quality: 100
                    }]
                },
                files: [{
                    expand: true,
                    cwd: 'assets/schilde/',
                    src: ['*.{jpg,gif,png}'],
                    custom_dest: 'assets/schilde/medium/'
                }]
            }
        },
        sprite: {
            coat_of_arms: {
                src: 'assets/schilde/small/*.*',
                dest: 'www/styles/wop/img/schilde.png',
                destCss: 'assets/css/_coat-of-arms.scss',
                cssTemplate: 'assets/css/coat-of-arms.scss.mustache',
                imgPath: 'img/schilde.png'
            },
            karussell: {
                src: ['assets/schilde/*.*', '!assets/schilde/_*.*'],
                dest: 'www/karussell/schilde.png',
                destCss: 'assets/css/_karussell.scss',
                padding: 5,
                cssTemplate: 'assets/css/karussell.scss.mustache',
                imgPath: 'schilde.png'
            },
            favicons: {
                engine: 'gmsmith',
                src: 'assets/favicons/*.*',
                dest: 'www/styles/wop/img/favicons.png',
                destCss: 'assets/css/_favicons.scss',
                padding: 4,
                cssTemplate: 'assets/css/favicons.scss.mustache',
                imgPath: 'img/favicons.png'
            }
        },
        cwebp: {
            coat_of_arms: {
                files: {
                    'www/styles/wop/img/schilde.webp': 'www/styles/wop/img/schilde.png'
                }
            },
            favicons: {
                files: {
                    'www/styles/wop/img/favicons.webp': 'www/styles/wop/img/favicons.png'
                }
            },
            karussell: {
                files: {
                    'www/karussell/schilde.webp': 'www/karussell/schilde.png'
                }
            },
            images: {
                files: [{
                    expand: true,
                    cwd: 'www/styles/wop/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'www/styles/wop/img/'
                }]
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
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-cwebp');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass:dist', 'concat:dist']);
    grunt.registerTask('coat_of_arms', ['responsive_images:coat_of_arms', 'sprite:coat_of_arms', 'cwebp:coat_of_arms', 'sass:dist']);
    grunt.registerTask('karussell', ['sprite:karussell', 'cwebp:karussell', 'sass:karussell']);
    grunt.registerTask('favicons', ['sprite:favicons', 'cwebp:favicons', 'sass:dist']);
    grunt.registerTask('images', ['responsive_images:coat_of_arms', 'sprite:coat_of_arms', 'sprite:favicons', 'cwebp:images', 'sass:dist']);
};
