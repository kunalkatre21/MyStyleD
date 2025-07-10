const StyleDictionary = require('style-dictionary');
const colorsetAction = require('./src/colorset-action.js'); // Path to your action file

// Register the custom action
StyleDictionary.registerAction(colorsetAction);

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    ios: {
      transformGroup: 'ios',
      buildPath: 'build/ios/',
      // Now, use the action by its name
      actions: ['create_ios_colorsets']
    }
    // ... other platforms
  }
};