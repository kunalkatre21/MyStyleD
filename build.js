const fs = require('fs');
const StyleDictionary = require('style-dictionary').default;
const { isNotThemeToken, isThemeToken } = require('./src/filter.js');

// This is an async function so we can use 'await'
async function run() {
  // Register the custom filters
  StyleDictionary.registerFilter({
    name: 'isNotThemeToken',
    filter: isNotThemeToken
  });

  StyleDictionary.registerFilter({
    name: 'isThemeToken',
    filter: isThemeToken
  });

  StyleDictionary.registerAction(require('./src/colorset-action.js'));
  StyleDictionary.registerFormat(require('./src/compose-material-scheme.js'));
  StyleDictionary.registerFormat(require('./src/compose-object-with-references.js'));


  const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
  const sd = new StyleDictionary(config);

  // Use 'await' to wait for the build to finish before exiting
  await sd.buildAllPlatforms();

  console.log('\n==============================================');
  console.log('\nBuild completed!');
}

run();