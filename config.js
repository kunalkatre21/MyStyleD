// config.js

const { isNotThemeToken, isThemeToken } = require('./src/filter.js');

/**
 * This function registers all the custom code Style Dictionary will need.
 */
function registerCustomCode(StyleDictionary) {
  console.log("[LOUDLY] The 'registerCustomCode' function has been called.");

  StyleDictionary.registerTransform(require('./src/resolve-relative-references.js'));

  StyleDictionary.registerParser(require('./src/parser.js'));
  StyleDictionary.registerAction(require('./src/ios-colorsets-themed-action.js'));
  StyleDictionary.registerFormat(require('./src/compose-material-scheme.js'));
  StyleDictionary.registerFormat(require('./src/swift-uifont-formatter.js'));
  StyleDictionary.registerFormat(require('./src/compose-object-with-references.js'));
  
  StyleDictionary.registerFilter({ name: 'isNotThemeToken', filter: isNotThemeToken });
  StyleDictionary.registerFilter({ name: 'isThemeToken', filter: isThemeToken });
  StyleDictionary.registerFilter({ name: 'isColor', filter: (token) => token.$type === 'color' });
  StyleDictionary.registerFilter({ name: 'isLight', filter: (token) => token.theme === 'light' });
  StyleDictionary.registerFilter({ name: 'isDark', filter: (token) => token.theme === 'dark' });
  StyleDictionary.registerFilter({ name: 'isPatient', filter: (token) => token.brand === 'patient' });
  StyleDictionary.registerFilter({ name: 'isDoctor', filter: (token) => token.brand === 'doctor' });
  StyleDictionary.registerFilter({ name: 'isDimension', filter: (token) => token.$type === 'dimension' });
  StyleDictionary.registerFilter({ name: 'isTypography', filter: (token) => token.$type === 'typography' });
  StyleDictionary.registerFilter({ name: 'isNonThemeColor', filter: (token) => token.$type === 'color' && !token.attributes.theme });

  console.log("[LOUDLY] All custom code has been registered.");
}

/**
 * Generates the Style Dictionary configuration for a specific brand.
 */
function getConfig(brand) {
  const baseTransforms = ["resolve-relative-references", "attribute/cti"];

  return {
     // --- START OF THE FIX ---
     "include": [
      "tokens/colors.json"
    ],
    "expand": false, // This tells Style Dictionary NOT to expand references automatically.
    // --- END OF THE FIX ---

    log: {
      verbosity: 'verbose'
    },
    parsers: [
      require('./src/parser.js')
    ],
    source: [
      "tokens/colors.json"
    ],
    platforms: {
      [`ios-${brand}-themed`]: {
        "transforms": [...baseTransforms, "name/pascal", "attribute/color"],
        "buildPath": `build/ios-${brand}/`,
        "actions": ["ios-colorsets-themed"],
        "options": { "brand": brand },
        // --- THIS IS THE FIX ---
        // Change "token.attributes.brand" to "token.brand"
        // Change "token.attributes.theme" to "token.theme"
        "filter": (token) =>
          token.brand === brand &&
          token.theme === 'light' &&
          token.$type === 'color' &&
          !token.path[0].startsWith('primitive') // Use startsWith for safety
      },
      "ios-swift-typography": {
        "transforms": [...baseTransforms, "name/camel"],
        "buildPath": "build/ios-swift/",
        "files": [{
          "destination": "UIFont+AppStyles.swift",
          "format": "swift/uifont-extension",
          "filter": "isTypography",
          "options": { "className": "AppTypography" }
        }]
      },
      "css": {
        "transforms": ["resolve-relative-references", "attribute/cti", "name/kebab", "time/seconds", "html/icon", "size/rem", "color/css"],
        "buildPath": "build/css/",
        "files": [{
          "destination": "_variables.css",
          "format": "css/variables",
          "filter": "isNotThemeToken"
        }]
      },
      // --- THE FIX: Use the correct transform names for Android ---
      "android": {
        "transforms": ["resolve-relative-references", "attribute/cti", "name/snake", "color/hex8android", "size/remToSp", "size/remToDp"],
        "buildPath": "build/android/",
        "files": [
          { "destination": "font_dimens.xml", "format": "android/fontDimens", "filter": "isDimension" },
          { "destination": "colors.xml", "format": "android/colors", "filter": (token) => token.$type === 'color' && (!token.theme || token.theme === 'none') }
        ]
      },
      "compose": {
        "transforms": ["resolve-relative-references", "attribute/cti", "attribute/color", "name/camel", "color/composeColor"],
        "buildPath": "build/compose/",
        "files": [
          {
            "destination": "StyleDictionaryColor.kt",
            "format": "compose/object-with-references",
            "options": { "className": "StyleDictionaryColor", "packageName": "com.eka.ui.theme" },
            "filter": "isColor"
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
}

module.exports = { registerCustomCode, getConfig };