module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Watch //
        watch: {
            js: {
                files: ['js/**.js'],
                tasks: ['js'],
                options: {
                    spawn: false,
                    interupt: true,
                },
            },
            styles: {
                files: ['css/*.css', 'css/*.scss'],
                tasks: ['styles'],
                options: {
                    spawn: false,
                    interupt: true,
                },
            },
            img: {
                files: ['img/**'],
                tasks: ['images'],
                options: {
                    spawn: false,
                    interupt: true,
                },
            },
            html: {
                files: ['**.html'],
                tasks: ['html'],
                options: {
                    spawn: false,
                    interupt: true,
                },
            },
            gruntTasks: {
                files: ['Gruntfile.js'],
                tasks: ['default'],
                options: {
                    spawn: false,
                    interupt: true,
                },
            }
        },

        // Bower //
        bower_concat: {
            all: {
                dest: 'dist/js/_bower.js',
                cssDest: 'dist/css/_bower.css',
                include: [
                    'angular',
                    'jquery',
                    'modernizr',
                    'foundation',
                ]
            },

        },

        // JS //
        uglify: {
            build: {
                src: ['js/script.js'],
                dest: 'dist/js/main.min.js'
            },
            canvas: {
                src: ['js/canvas.js'],
                dest: 'dist/js/canvas.js'
            },
            // bower_js: {
            //     src: ['dist/js/_bower.js'],
            //     dest: 'dist/js/_bower.js'
            // }
        },

        // CSS //
        sass: {
            dist: {
                files: {
                    'tmp/main.css': 'css/main.scss'
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'dist/css/main.css': ['./tmp/main.css', 'css/*.css']
                }
            },
            bower_css: {
                files: {
                    'dist/css/_bower.css': 'dist/css/_bower.css'
                }
            }
        },
        autoprefixer: {
            autoprefix: {
                expand: true,
                flatten: true,
                src: 'dist/css/main.css',
                dest: 'dist/css/',
            },
        },
        uncss: {
            dist: {
                files: {
                    'dist/css/main.css': ['dist/*.html']
                }
            }
        },

        // Images //
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'img',
                    src: ['**'],
                    dest: 'dist/img'
                }]
            }
        },
        imageoptim: {
            myTask: {
                options: {
                    jpegMini: false,
                    imageAlpha: false,
                    quitAfter: true
                },
                src: ['dist/img']
            }
        },


        // HTML //
        htmlmin: {
            main: {
                options: { // Target options
                    removeComments: false,
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: [{
                    expand: true, // Enable dynamic expansion.
                    cwd: './', // Src matches are relative to this path.
                    src: ['**.html'], // Actual pattern(s) to match.
                    dest: 'dist/', // Destination path prefix.
                    ext: '.html', // Dest filepaths will have this extension.
                    extDot: 'first' // Extensions in filenames begin after the first dot
                }]
            }
        },


        // Clean //
        clean: ['tmp'],

        // Host //
        browserSync: {
            dev: {
                bsFiles: {
                    src: ['dist/**']
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "dist"
                    },
                    ghostMode: false
                }
            },
            host: {
                bsFiles: {
                    src: ['dist/**']
                },
                options: {
                    watchTask: false,
                    server: {
                        baseDir: "dist"
                    },
                    ghostMode: false
                }
            }
        },
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    // JS
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Styles
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-uncss');
    // HTML
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // Images
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-imageoptim');
    // Utilities
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');


    // Tasks
    grunt.registerTask('default', ['bower', 'html', 'js', 'styles', 'images']);

    grunt.registerTask('bower', ['bower_concat']);
    grunt.registerTask('js', ['uglify']);
    grunt.registerTask('html', ['htmlmin']);
    grunt.registerTask('styles', ['sass', 'cssmin', 'newer:uncss:dist', 'autoprefixer', 'clean']);
    grunt.registerTask('images', ['newer:copy:main', 'newer:imageoptim:myTask']);

    grunt.registerTask('serve', ['default', 'browserSync:dev', 'watch']);
    grunt.registerTask('host', 'browserSync:host');


};
