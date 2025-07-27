// config.js

const { isNotThemeToken, isThemeToken } = require('./src/filter.js');

/**
 * This function registers all your custom actions, formats, and filters.
 * It will be called from build.js after StyleDictionary is imported asynchronously.
 */
function registerCustomCode(StyleDictionary) {
  // --- LOUD CONSOLE ANNOUNCEMENT ---
  console.log("[LOUDLY] The 'registerCustomCode' function has been called. The director is on set!");

  if (!StyleDictionary) {
    console.error("[LOUDLY] FATAL ERROR: The StyleDictionary object I received is empty! I cannot register anything.");
    return;
  }

  console.log("  > Registering custom actions, formats, and filters...");
  StyleDictionary.registerAction(require('./src/colorset-action.js'));
  StyleDictionary.registerFormat(require('./src/compose-material-scheme.js'));
  StyleDictionary.registerFormat(require('./src/compose-object-with-references.js'));
  StyleDictionary.registerFormat(require('./src/swift-uifont-formatter.js'));
  StyleDictionary.registerFilter({ name: 'isNotThemeToken', filter: isNotThemeToken });
  StyleDictionary.registerFilter({ name: 'isThemeToken', filter: isThemeToken });
  StyleDictionary.registerFilter({ name: 'isNonThemeColor', filter: (token) => isNotThemeToken(token) && token.$type === 'color' });
  StyleDictionary.registerFilter({ name: 'isTypography', filter: (token) => token.$type === 'typography' });
  StyleDictionary.registerFilter({ name: 'isDimension', filter: (token) => token.$type === 'dimension' });
  StyleDictionary.registerFilter({ name: 'isColor', filter: (token) => token.$type === 'color' });
  
  // --- LOUD CONSOLE ANNOUNCEMENT ---
  console.log("[LOUDLY] All custom code has been registered. The cast is ready!");
}

/**
 * This is the main configuration object for Style Dictionary.
 */
const config = {
  log: { verbosity: 'verbose' },

  source: [
    "tokens/colors.json",
    "tokens/m3.json",
    "tokens/ios.json"
  ],

  platforms: {
    "ios-colorsets": {
      "buildPath": "build/ios-colorsets/",
      "transforms": ["attribute/cti", "name/pascal", "attribute/color"],
      "files": [], 
      "filter": "isColor",
      "actions": ["ios-colorsets"]
    },
    "ios-swift-typography": {
      "transforms": ["attribute/cti", "name/camel"],
      "buildPath": "build/ios-swift/",
      "files": [{
        "destination": "UIFont+AppStyles.swift",
        "format": "swift/uifont-extension",
        "filter": "isTypography",
        "options": { "className": "AppTypography" }
      }]
    },
    "css": {
      "transformGroup": "css",
      "buildPath": "build/css/",
      "files": [{
        "destination": "_variables.css",
        "format": "css/variables",
        "filter": "isNotThemeToken"
      }]
    },
    "android": {
      "transformGroup": "android",
      "buildPath": "build/android/",
      "files": [
        { "destination": "font_dimens.xml", "format": "android/fontDimens", "filter": "isDimension" },
        { "destination": "colors.xml", "format": "android/colors", "filter": "isColor" }
      ]
    },
    "compose": {
      "transforms": ["attribute/color", "name/camel", "color/composeColor"],
      "buildPath": "build/compose/",
      "files": [
        {
          "destination": "StyleDictionaryColor.kt",
          "format": "compose/object-with-references",
          "options": { "className": "StyleDictionaryColor", "packageName": "com.eka.ui.theme" },
          "filter": "isNonThemeColor"
        },
        {
          "destination": "StyleDictionarySize.kt",
          "format": "compose/object",
          "options": { "className": "StyleDictionarySize", "packageName": "StyleDictionarySize", "type": "float" },
          "filter": "isDimension"
        },
        {
          "destination": "AppColorScheme.kt",
          "format": "compose/material-scheme",
          "options": { "className": "AppColorScheme", "packageName": "com.eka.ui.theme" },
          "filter": "isColor"
        }
      ]
    }
  }
};

module.exports = { registerCustomCode, config };