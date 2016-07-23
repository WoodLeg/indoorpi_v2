// Gulp dependencies
var browserSync         = require('browser-sync').create(),
    del              	= require('del'),
    gulp             	= require('gulp'),
    concat           	= require('gulp-concat'),
    eslint              = require('gulp-eslint'),
    flatten             = require('gulp-flatten'),
    gulpif           	= require('gulp-if'),
    historyApiFallback  = require('connect-history-api-fallback'),
    inject           	= require('gulp-inject'),
    merge2              = require('merge2'),
    minifyCss        	= require('gulp-minify-css'),
    minifyHtml       	= require('gulp-minify-html'),
    minifyJson          = require('gulp-jsonminify'),
    ngHtml2Js   		= require('gulp-ng-html2js'),
    ngLang2Js           = require('gulp-ng-lang2js'),
    path                = require('path'),
    sass             	= require('gulp-sass'),
    sourcemaps       	= require('gulp-sourcemaps'),
    rev              	= require('gulp-rev'),
    using            	= require('gulp-using'),
    uglify           	= require('gulp-uglify'),
    util             	= require('gulp-util'),
    bowerFiles  		= require('main-bower-files'),
    runSequence      	= require('run-sequence');

// Project paths
var PATHS = {
    SRC 	: {
        BASE 	: 'public/src',
        INDEX  	: 'public/src/index.html',
        APP 	: 'public/src/app.js',

        ASSETS 	: {
            BASE    : 'public/src/assets',
            STYLES  : 'public/src/assets/style',
            IMG     : 'public/src/assets/img',
            FONTS	: 'public/src/assets/fonts',
            I18N   : 'public/src/assets/i18n'
        }
    },

    DEST 	: {
        BASE 	: 'public/dist',

        ASSETS 	: {
            BASE 	: 'public/dist/assets',
            CSS   	: 'public/dist/assets/css',
            IMG   	: 'public/dist/assets/img',
            FONTS 	: 'public/dist/assets/fonts',
            I18N   : 'public/dist/assets/i18n'
        },

        LIB  	: {
            BASE 	: 'public/dist/lib',
            JS    	: 'public/dist/lib/js',
            CSS   	: 'public/dist/lib/css',
            FONTS 	: 'public/dist/lib/fonts'
        }
    },

    TEST 			: {
        BASE    : 'tests',
        UTIL  	: 'tests/util',
        UT 		: 'tests/specs',
        E2E  	: 'tests/e2e'
    }
};

function getAppPartials() {
    return gulp
        .src([
            PATHS.SRC.BASE + '/**/*.html',
            '!' + PATHS.SRC.INDEX
        ],{base : 'public'})
        .pipe(gulpif(util.env.debug,using()))
        .pipe(minifyHtml({
            empty : true
        }))
        .pipe(ngHtml2Js({
            moduleName      : 'indoorPi',
            declareModule   : false,
            prefix          : '/'
        }))
        .pipe(gulpif(util.env.optimize,uglify()));
}

function getAppI18n() {
    return gulp
        .src([
            PATHS.SRC.BASE + '/**/*.json'
        ])
        .pipe(gulpif(util.env.debug,using()))
        .pipe(minifyJson())
        .pipe(ngLang2Js({
            moduleName      : 'indoorPi',
            declareModule   : false,
            prefix          : '/',
            rename: function (translationUrl, translationFile) {
                return translationUrl.replace(translationUrl, 'assets/i18n/'+path.basename(translationUrl));
            }
        }))
        .pipe(gulpif(util.env.optimize,uglify()));
}

// Clean project
gulp.task('clean', function() {
    return del(PATHS.DEST.BASE + '/**/*');
});

// Copy index.html to /dist
gulp.task('index',function(){
    return gulp
        .src(PATHS.SRC.BASE + '/index.html')
        .pipe(gulp.dest(PATHS.DEST.BASE));
});

// Copy sitemap to /dist
gulp.task('sitemap',function(){
    return gulp
        .src(PATHS.SRC.BASE + '/sitemap.xml')
        .pipe(gulp.dest(PATHS.DEST.BASE));
});

// Bower dependencies
gulp.task('bower',function(){
    return gulp.src(bowerFiles(), {
        base: 'public/bower_components'
    });
});

// Bower-specific javascript project dependencies
gulp.task('bower-js', function(){
    return merge2(
        gulp.src('public/bower_components/jquery/dist/jquery.js'),
        gulp.src(bowerFiles(['**/*.js', '!**/jquery.js']))
    )
    .pipe(gulpif(util.env.debug,using()))
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.js'))
    .pipe(gulpif(util.env.optimize,rev()))
    .pipe(gulpif(util.env.optimize,uglify()))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(PATHS.DEST.LIB.JS));
});

// Bower-specific css project dependencies
gulp.task('bower-css',function(){
    return gulp
        .src(bowerFiles('**/*.css'))
        .pipe(gulpif(util.env.debug,using()))
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.css'))
        .pipe(gulpif(util.env.optimize,rev()))
        .pipe(gulpif(util.env.optimize,minifyCss()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(PATHS.DEST.LIB.CSS));
});

// Bower-specific font project dependencies
gulp.task('bower-fonts',function(){
    return gulp
        .src(bowerFiles('**/*.@(eot|svg|ttf|woff|woff2)'))
        .pipe(gulpif(util.env.debug,using()))
        .pipe(gulp.dest(PATHS.DEST.LIB.FONTS+'/bootstrap'));
});

// Project style
gulp.task('app-styles', function() {
    return gulp.src([
        PATHS.SRC.BASE + '/app.scss',
        PATHS.SRC.BASE + 'components/**/*.scss',
        PATHS.SRC.BASE + 'common/**/*.scss'
    ])
        .pipe(sass({
            includePaths: [
                'public/bower_components/bootstrap-sass/assets/stylesheets',
                PATHS.SRC.BASE + '/components/**/*',
                PATHS.SRC.BASE + '/common/**/*'
            ]
        })
        .on('error', sass.logError))
        .pipe(gulpif(util.env.debug,using()))
        .pipe(sourcemaps.init())
        .pipe(concat('app.css'))
        .pipe(gulpif(util.env.optimize,rev()))
        .pipe(gulpif(util.env.optimize,minifyCss()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(PATHS.DEST.LIB.CSS));
});

// Project images
gulp.task('app-images', function() {
    return gulp.src(PATHS.SRC.ASSETS.IMG + '/*')
        .pipe(gulpif(util.env.debug,using()))
        .pipe(gulp.dest(PATHS.DEST.ASSETS.IMG));
});

// Project fonts
gulp.task('app-fonts', function() {
    return gulp.src([PATHS.SRC.ASSETS.FONTS + '/**/*.@(eot|svg|ttf|woff|woff2)'])
        .pipe(gulpif(util.env.debug,using()))
        .pipe(gulp.dest(PATHS.DEST.ASSETS.FONTS));
});

// Project translations
gulp.task('app-i18n',function(){
    return gulp
        .src([
            PATHS.SRC.BASE + '/**/*.json'
        ])
        .pipe(flatten())
        .pipe(gulpif(util.env.debug,using()))
        .pipe(gulp.dest(PATHS.DEST.ASSETS.I18N));
});

// Project javascript components
gulp.task('app-js', function() {
    return merge2(
        gulp.src([
            PATHS.SRC.BASE + '/_app.module.js',
            PATHS.SRC.BASE + '/**/*.module.js',
            PATHS.SRC.BASE + '/common/**/*.js',
            PATHS.SRC.BASE + '/components/**/*.js',
            PATHS.SRC.BASE + '/**/*.js'
        ]),
        getAppPartials(),
        getAppI18n()
    ).pipe(gulpif(util.env.debug,using()))
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(gulpif(util.env.optimize,rev()))
    .pipe(gulpif(util.env.optimize,uglify()))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(PATHS.DEST.BASE));
});

gulp.task('app-js:production', function() {
    return merge2(
        gulp.src([
            PATHS.SRC.BASE + '/_app.module.js',
            PATHS.SRC.BASE + '/**/*.module.js',
            PATHS.SRC.BASE + '/common/**/*.js',
            PATHS.SRC.BASE + '/components/**/*.js',
            PATHS.SRC.BASE + '/**/*.js',
            '!' + PATHS.SRC.BASE + '/app.const.production.js'
        ]),
        getAppPartials(),
        getAppI18n()
    ).pipe(gulpif(util.env.debug,using()))
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(gulpif(util.env.optimize,rev()))
    .pipe(gulpif(util.env.optimize,uglify()))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(PATHS.DEST.BASE));
});

// Project javascript linting
gulp.task('lint', function () {
    return gulp.src([
        PATHS.SRC.BASE + '/_app.module.js',
        PATHS.SRC.BASE + '/**/*.module.js',
        PATHS.SRC.BASE + '/**/*.js'
    ])
        .pipe(gulpif(util.env.debug,using()))
        .pipe(eslint())
        .pipe(eslint.format());
});

// Inject project dependencies into partials
gulp.task('inject', function() {
    return gulp.src(PATHS.SRC.INDEX)
    .pipe(inject(
        gulp.src([
            PATHS.DEST.LIB.JS + '/**/*.js',
            PATHS.DEST.BASE + '/**/*.css',
            PATHS.DEST.BASE + '/**/*.js'
        ], {read : false}),
        {
            addRootSlash    : false,
            ignorePath      : PATHS.DEST.BASE
        }
    ))
    .pipe(gulp.dest(PATHS.DEST.BASE));
});


// Build project
gulp.task('build', function(cb) {
    return runSequence('clean', ['index', 'sitemap', 'app-styles', 'app-images', 'app-fonts', 'app-js', 'bower-js', 'bower-css', 'bower-fonts'], 'inject', cb);
});

gulp.task('build:production', function(cb) {
    return runSequence('clean', ['index', 'sitemap', 'app-styles', 'app-images', 'app-fonts', 'app-js:production', 'bower-js', 'bower-css', 'bower-fonts'], 'inject', cb);
});

// Watch project update
gulp.task('watch', ['build', 'lint'], function() {
    // Watch style
    gulp.watch(PATHS.SRC.BASE + '/**/*.scss', ['app-styles']);

    // Watch fonts
    gulp.watch(PATHS.SRC.ASSETS.FONTS + '/**/*.@(eot|svg|ttf|woff|woff2)', ['app-fonts']);

    // Watch javascript, html
    gulp.watch([
        PATHS.SRC.BASE + '/**/*.js',
        PATHS.SRC.BASE + '/**/*.html',
        PATHS.SRC.BASE + '/**/*.json'
    ], ['app-js', 'lint']);

    // Watch index.html
    gulp.watch(PATHS.SRC.BASE + '/index.html', ['build']);

    // Watch bower dependencies
    gulp.watch('bower.json', ['bower-css','bower-fonts','bower-js']);

});

// Serve project
gulp.task('serve', ['watch'], function(cb){
    browserSync.init({
        files: [
            PATHS.DEST.BASE + '/**/*.css',
            PATHS.DEST.BASE + '/**/*.js',
            PATHS.DEST.BASE + '/**/*.html',
            PATHS.DEST.BASE + '/**/*.json'
        ],

        server: {
            baseDir: PATHS.DEST.BASE,
            middleware: [
                historyApiFallback()
            ]
        },

        port: 1337
    });

    cb();
});
