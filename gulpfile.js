const gulp = require('gulp');
const gulpPlugins = require('auto-plug')('gulp');
const build = require('./build.json');

// Default
gulp.task('default', ['templates']);

// Aliases
gulp.task('tpl', ['templates']);
gulp.task('template', ['templates']);

/**
  * Precompile templates to JavaScript functions
  */
gulp.task('templates', function() {
    let {templates} = build;
    return gulp.src([
        templates.partials.speech, templates.partials.display
      ].concat(templates.skills.display, templates.skills.speech))
      .pipe( gulpPlugins.precompileHandlebars({noEscape: true}) )
      .pipe( gulpPlugins.rename({ extname: '.js' }) )
      .pipe( gulpPlugins.defineModule('node') )
      .pipe(gulp.dest('build/js'));
});
