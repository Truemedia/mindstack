require('module-alias/register');
const changeCase = require('change-case');
const fs = require('fs');
const gulp = require('gulp');
const gulpPlugins = require('auto-plug')('gulp');
const lexes = require('auto-plug')({ prefix: 'lex', pattern: ['*-lex'] });
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

/**
  * Build lexicon files from sources
  */
gulp.task('lexicon', function() {
  build.skills.map(skill => {
    jsonfile.readFile(`src/skills/${skill}/skill.json`).then(skillInfo => {
      let {lexicons} = skillInfo;
      if (Object.entries(lexicons).length > 0) { // Import lexicons as text files
        Object.entries(lexicons).map(intent => {
          let [intentName, lexDeps] = intent;
          lexDeps.map(lex => changeCase.camelCase(lex))
            .map( lexicon => {
                if (Object.keys(lexes).includes(lexicon)) {
                  lexes[lexicon].toFile(`src/skills/${skill}/kb/en_GB/${intentName}.txt`);
                }
            });
        });
      }
    });
  });
});
