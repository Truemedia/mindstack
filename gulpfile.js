require('module-alias/register');
const fs = require('fs');
const gulp = require('gulp');
const gulpPlugins = require('auto-plug')('gulp');
const jsonfile = require('jsonfile');
const YAML = require('yaml');
const build = YAML.parse( fs.readFileSync('./build.yml', 'utf8') );

// Default
gulp.task('default', ['build']);
// Build
gulp.task('build', ['configuration', 'templates']);

// Aliases
gulp.task('tpl', ['templates']);
gulp.task('template', ['templates']);
gulp.task('cfg', ['configuration']);
gulp.task('config', ['configuration']);

/**
  * Precompile templates to JavaScript functions
  */
gulp.task('templates', function() {
    let {templates} = build.src;
    return gulp.src([
        templates.partials.speech, templates.partials.display
      ].concat(templates.skills.display, templates.skills.speech))
      .pipe( gulpPlugins.precompileHandlebars({noEscape: true}) )
      .pipe( gulpPlugins.rename({ extname: '.js' }) )
      .pipe( gulpPlugins.defineModule('node') )
      .pipe( gulp.dest(build.dest.templates) );
});

/**
  * Compile YAML config to JSON
  */
gulp.task('configuration', function() {
  let {config} = build.src;
  return gulp.src(config)
    .pipe( gulpPlugins.yaml() )
    .pipe( gulp.dest(build.dest.config) );
});
