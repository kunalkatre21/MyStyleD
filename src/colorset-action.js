// src/colorset-action.js

const fs = require("fs");
const path = require("path");

const CONTENTS = {
  info: {
    author: "xcode",
    version: 1,
  },
};

const createDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

module.exports = {
  name: 'ios-colorsets',

  do: (dictionary, config) => {
    const buildPath = config.buildPath;
    const assetPath = path.join(buildPath, "DesignTokens.xcassets");

    createDir(assetPath);
    fs.writeFileSync(path.join(assetPath, 'Contents.json'), JSON.stringify(CONTENTS, null, 2));

    // FIX: Filter tokens by '$type' being 'color'.
    dictionary.allTokens
      .filter((token) => token.$type === 'color')
      .forEach((token) => {
        // The 'attribute/color' transform adds RGB attributes (0-255).
        const rgb = token.attributes.rgb; 

        if (!rgb) {
          console.warn(`Skipping token ${token.name}: missing RGB attributes. Ensure 'attribute/color' transform is applied.`);
          return;
        }

        // The name is transformed to PascalCase by the 'name/pascal' transform.
        const colorsetPath = path.join(assetPath, `${token.name}.colorset`);
        createDir(colorsetPath);

        const colorsetContent = {
          colors: [
            {
              idiom: "universal",
              color: {
                "color-space": "srgb",
                // Components must be strings representing floats from 0.0 to 1.0.
                components: {
                  red: `${(rgb.r / 255).toFixed(3)}`,
                  green: `${(rgb.g / 255).toFixed(3)}`,
                  blue: `${(rgb.b / 255).toFixed(3)}`,
                  alpha: `${rgb.a.toFixed(3)}`,
                },
              },
            },
          ],
          ...CONTENTS,
        };

        fs.writeFileSync(
          path.join(colorsetPath, 'Contents.json'),
          JSON.stringify(colorsetContent, null, 2)
        );
      });
  },

  undo: function (dictionary, config) {
    const buildPath = config.buildPath;
    const assetPath = path.join(buildPath, "DesignTokens.xcassets");
    if (fs.existsSync(assetPath)) {
      // Use rmSync for modern Node.js
      fs.rmSync(assetPath, { recursive: true, force: true });
    }
  }
};