const fs = require('fs');
const StyleDictionary = require('style-dictionary').default;

// This is an async function so we can use 'await'
async function run() {
  StyleDictionary.registerAction(require('./src/colorset-action.js'));

  const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
  const sd = new StyleDictionary(config);

  // Use 'await' to wait for the build to finish before exiting
  await sd.buildAllPlatforms();

  console.log('\n==============================================');
  console.log('\nBuild completed!');
}

run();