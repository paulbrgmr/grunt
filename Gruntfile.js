var srcPath = '_resources/';
var scssSrcPath = srcPath + 'scss/';
var scssDestPath = srcPath + 'css/';
var cssSrcPath = scssDestPath;
var cssDestPath = cssSrcPath;
var jsSrcPath = srcPath + 'js/';
var jsDestPath = jsSrcPath + 'min/';


module.exports = function (grunt) {
    grunt.initConfig({
        watch: { // watch for file changes
            sass: {
                files: [
                    scssSrcPath + 'style.scss'
                ],
                tasks: [
                    'sass',
                    'concat:css',
                    'notify:watch'
                ]
            },
            js: {
                files: [
                    jsSrcPath + '**.js'
                ],
                tasks: [
                    // 'jshint',
                    'uglify',
                    'concat:js',
                    'notify:watch'
                ]
            }
        },

        // jshint: { // check if js has errors
        //     files: [
        //         'Gruntfile.js',
        //         jsSrcPath + '**.js'
        //     ]
        // },

        uglify: { // minify js
            src: {
                src: [
                    jsSrcPath + '**.js'
                ],
                dest: jsDestPath + 'main.min.js'
            }
        },

        sass: { // compile scss to css
            options: {
                style: 'compressed'
                // compress: true,
                // sourceMap: 'auto'
            },
            src: {
                src: [
                    scssSrcPath + '**.scss'
                ],
                dest: scssDestPath + 'style.min.css'
            }
        },

        concat: { // concatenate all js into one file and all css into another
            options: {
                separator: ';'
            },
            js: {
                src: [
                    jsSrcPath + 'jquery-2.1.1.min.js',
                    jsSrcPath + 'bootstrap.min.js',
                    jsSrcPath + '*.min.js'
                ],
                dest: jsDestPath + 'main.min.js'
            },
            css: {
                src: [
                    cssSrcPath + '*.min.css'
                ],
                dest: cssDestPath + 'style.min.css'
            }
        },

        notify: { // send notification if compiling has finished
            watch: {
                options: {
                    message: 'compiled successful',
                    success: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-notify');


    grunt.registerTask('default', [
        // 'jshint',
        'uglify',
        'sass',
        'concat',
        'notify:watch'
    ]);
};
