var gulp = require('gulp')
var postcss = require('gulp-postcss')
var rucksack = require('gulp-rucksack')
var cssnext = require('postcss-cssnext')
//var autoprefixer = require('autoprefixer')
var cssnested = require('postcss-nested')
var mixins = require('postcss-mixins')
var lost = require('lost')
var atImport = require('postcss-import')
var csswring = require('csswring')
var mqpacker = require('css-mqpacker')
var browserSync = require('browser-sync').create()


// Servidor de desarrollo

gulp.task('serve', function(){
    browserSync.init({
        server: {
            baseDir: 'dist' //ruta donde se van a servir los ficheros como la raiz.
        }
    })
})

// Tarea para procesar el CSS

gulp.task('css', function(){
    var processors = [
        //autoprefixer({ browsers: ['> 5%', 'ie 8']}), // Plugin de postcss, estos deben llevar un cierto orden para evitar errores.
                                                    /* 1. A que navegadores queremos dar soporte, ej. más del 5% de utilización, de lo contrario no le colocará esos procesos especiales que tenga para ellos.
                                                     2. Que de soporte a IE a partir del 8, de esta manera incluirá vendorprefixer para estos navegadores.*/
        
        atImport,
        mixins,
        cssnested,
        lost(),
        cssnext({ browsers: ['> 5%', 'ie 8']}), // Ya incluye autoprefixier
        mqpacker,
        csswring()
    ]   
    return gulp.src('src/css/*.css')
        .pipe(rucksack())
        .pipe(postcss(processors))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())
})


// Tarea de vigilancia

gulp.task('watch', function(){
    gulp.watch('src/css/*.css', ['css'])
    gulp.watch('dist/*.html').on('change', browserSync.reload)
})

// Tarea por defecto

gulp.task('default', ['watch', 'serve'])