module.exports = function(grunt) {

    var rootPath = '_resources/';
    var cssPath = rootPath + 'css/';
    var scssPath = rootPath + 'scss/';
    var jsPath = rootPath + 'js/';
    var imgPath = rootPath + 'img/';

    // Create basic empty file
    // var scssFile = scssPath + 'style.scss';
    // var jsFile = jsPath + 'main.js';
    // var content = '';

    // grunt.file.write(scssFile, content);
    // grunt.file.write(jsFile, content);

    grunt.initConfig({
        mkdir: {
            all: {
                options: {
                    create: ['_resources/css', '_resources/scss', '_resources/js', '_resources/img']
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '_resources/css/main.min.css': '_resources/scss/style.scss'
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    '_resources/js/min/main.min.js': [jsPath + '*.js'],
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', jsPath + '/*.js'],
            options: {
            // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        browserSync: {
            bsFiles: {
                src : ['_resources/**/*.css', '_resources/**/*.js', '*.html', '*.php']
            },
            options: {
                watchTask: true
            }
        },
        // imagemin: {
        //     static: {
        //         options: {
        //             optimizationLevel: 3,
        //             svgoPlugins: [{ removeViewBox: false }],
        //             // use: [mozjpeg()]
        //         },
        //         files: {
        //             '_resources/img/min/*.png': '_resources/img/*.png', // 'destination': 'source'
        //             '_resources/img/min/*.jpg': '_resources/img/*.jpg',
        //             '_resources/img/min/*.gif': '_resources/img/*.gif'
        //         }
        //     }
        // },
        notify: {
            sass: {
                options: {
                    title: "Sass task complete",
                    message: "CSS Files built"
                }
            },
            js: {
                options: {
                    title: "JS task complete",
                    message: "JS Files built"
                }
            }
        },
        watch: {
            sass: {
                files: [
                    '_resources/scss/*.scss'
                ],
                tasks: ['sass', 'notify:sass']
            },
            js: {
                files: [
                    '_resources/js/*.js'
                ],
                tasks: ['uglify', 'notify:js']
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-browser-sync');
    // grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.registerTask('init', ['mkdir']);
    grunt.registerTask('default', ['sass', 'jshint', 'uglify', 'browserSync', 'watch']);
};