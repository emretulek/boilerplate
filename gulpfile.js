const {parallel, src, dest} = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify')
const cleanCss = require('gulp-clean-css');

function cssBase() {
    src([
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
    ]).pipe(dest('dist/css'))
}

function cssConcat() {
    src([
        './node_modules/@fancyapps/ui/dist/fancybox.css',
        './node_modules/sweetalert2/dist/sweetalert2.min.css',
        './src/css/sweetalert2.theme.css',
        './src/css/fancybox.theme.css',
    ]).pipe(autoprefixer({
        cascade: false
    })).pipe(cleanCss()).pipe(concat('tools-require.css')).pipe(dest('dist/css'))
}

function jsBase() {
    src([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
        './src/js/tools.js'
    ]).pipe(dest('dist/js'))
}

function jsConcat() {
    src([
        './node_modules/sweetalert2/dist/sweetalert2.min.js',
        './node_modules/@emretulek/jbvalidator/dist/jbvalidator.min.js',
        './node_modules/@fancyapps/ui/dist/fancybox.umd.js',
        './node_modules/imask/dist/imask.min.js',
        './src/js/sweetalert2.jquery.js',
        './src/js/ajax.js',
    ])
        .pipe(concat('tools-require.js'))
        .pipe(uglify()).pipe(dest('dist/js'))
}

exports.default = parallel(cssBase, cssConcat, jsBase, jsConcat);
