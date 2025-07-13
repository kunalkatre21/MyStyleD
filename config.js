module.exports = {
  // 1. The source array is now inside the JS object.
  source: [
    "tokens/palette.colors.json",
    "tokens/tokens.semantic.json",
    "tokens/theme.material.json"
  ],

  // 2. The platforms object, now with working filter functions.
  platforms: {
    // "compose": {
    //   "transformGroup": "compose",
    //   "buildPath": "build/compose/",
    //   "files": [
    //     {
    //       "destination": "StyleDictionaryColor.kt",
    //       "format": "compose/object",
    //       "transformGroup": "compose",
    //       "options": {
    //         "className": "StyleDictionaryColor",
    //         "packageName": "StyleDictionaryColor"
    //       },
    //       // This filter now works because we are in a .js file.
    //       "filter": (token) => 
    //         token.path[0] !== 'Schemes' && token.path[0] !== 'State Layers' && token.path[0] !== 'Add-ons'
    //     },
    //     {
    //       "destination": "AppColorScheme.kt",
    //       "format": "compose/material-scheme",
    //       "transforms": ["attribute/cti", "color/composeColor"],
    //       // This filter also works now.
    //       "filter": (token) => token.path[0] === 'Schemes'
    //     }
    //   ]
    // },
    // The rest of your platforms, copied exactly from before.
    "compose": {
      "transformGroup": "compose",
      "buildPath": "build/compose/",
      // Custom options to be used in the material-scheme 
      "format": {
        "className": "StyleDictionaryColor",
        "packageName": "StyleDictionaryColor"
      },
      "files": [
        {
          "destination": "StyleDictionaryColor.kt",
          "format": "compose/object",
          "options": {
            "className": "StyleDictionaryColor",
            "packageName": "StyleDictionaryColor"
          },
          "filter": "isNotThemeToken"
        },
        {
          "destination": "StyleDictionarySize.kt",
          "format": "compose/object",
          "options": {
            "className": "StyleDictionarySize",
            "packageName": "StyleDictionarySize",
            "type": "float"
          },
          "filter": {
            "$type": "dimension"
          }
        },
        {
          "destination": "AppColorScheme.kt",
          "format": "compose/material-scheme",
          "options": {
            "packageName": "com.yourcompany.designsystem.theme",
            "className": "AppColorScheme"
          },
          "filter": "isThemeToken" // Use the specific filter here!
        }
      ]
    },
    "ios-colorsets": {
        "transformGroup": "ios",
        "buildPath": "build/ios-colorsets/",
        "transforms": ["attribute/cti", "name/pascal", "color/rgb"],
        "files": [],
        "actions": ["ios-colorsets"]
    },
    "css": {
        "transformGroup": "css",
        "buildPath": "build/css/",
        "files": [{ "destination": "_variables.css", "format": "css/variables" }]
    },
    "android": {
        "transformGroup": "android",
        "buildPath": "build/android/",
        "files": [
            { "destination": "font_dimens.xml", "format": "android/fontDimens" },
            { "destination": "colors.xml", "format": "android/colors" }
        ]
    },
    "ios": {
        "transformGroup": "ios",
        "buildPath": "build/ios/",
        "files": [
            { "destination": "StyleDictionaryColor.h", "format": "ios/colors.h", "className": "StyleDictionaryColor", "type": "StyleDictionaryColorName", "filter": { "$type": "color" }},
            { "destination": "StyleDictionaryColor.m", "format": "ios/colors.m", "className": "StyleDictionaryColor", "type": "StyleDictionaryColorName", "filter": { "$type": "color" }}
        ]
    },
    "ios-swift": {
        "transformGroup": "ios-swift",
        "buildPath": "build/ios-swift/",
        "files": [
            { "destination": "StyleDictionary+Class.swift", "format": "ios-swift/class.swift", "className": "StyleDictionaryClass" },
            { "destination": "StyleDictionary+Enum.swift", "format": "ios-swift/enum.swift", "className": "StyleDictionaryEnum" },
            { "destination": "StyleDictionary+Struct.swift", "format": "ios-swift/any.swift", "className": "StyleDictionaryStruct", "imports": "SwiftUI", "objectType": "struct", "accessControl": "internal" }
        ]
    },
    "ios-swift-separate-enums": {
        "transformGroup": "ios-swift-separate",
        "buildPath": "build/ios-swift/",
        "files": [
            { "destination": "StyleDictionaryColor.swift", "format": "ios-swift/enum.swift", "className": "StyleDictionaryColor", "filter": { "$type": "color" }},
            { "destination": "StyleDictionarySize.swift", "format": "ios-swift/enum.swift", "className": "StyleDictionarySize", "filter": { "$type": "dimension" }}
        ]
    }
  }
};