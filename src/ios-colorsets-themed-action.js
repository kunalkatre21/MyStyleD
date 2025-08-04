// src/ios-colorsets-themed-action.js

const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'ios-colorsets-themed',
  do: (dictionary, platform) => { // Use 'platform' as the second argument
    // --- THE FIX: Get the brand from platform.options ---
    const brand = platform.options.brand;
    if (!brand) {
      throw new Error("Action 'ios-colorsets-themed' requires 'brand' in platform options.");
    }
    console.log(`[iOS Colorset Action] Building for brand: ${brand}`);
    
    // The 'dictionary.allProperties' here is ALREADY FILTERED by the platform config.
    // It will only contain the 'light' tokens for the current brand.
    const lightTokensToProcess = dictionary.allProperties; 
    
    // --- THE FIX: Get the complete, unfiltered list of all tokens ---
    // This gives us access to the dark tokens needed for comparison.
    const allBrandTokens = dictionary.allTokens;

    // Create a map of the dark tokens for the current brand for quick lookups.
    const darkTokensByPath = allBrandTokens
      .filter(token => token.attributes.brand === brand && token.attributes.theme === 'dark')
      .reduce((acc, token) => {
        // Create a consistent key for matching light/dark pairs (e.g., 'color.background.surface')
        const pathKey = token.path.slice(1).join('.'); 
        acc[pathKey] = token;
        return acc;
      }, {});

    const buildPath = platform.buildPath; // Use 'platform.buildPath'
    const assetPath = path.join(buildPath, 'DesignTokens.xcassets');
    if (!fs.existsSync(assetPath)) fs.mkdirSync(assetPath, { recursive: true });
    fs.writeFileSync(path.join(assetPath, 'Contents.json'), JSON.stringify({ info: { author: 'xcode', version: 1 } }, null, 2));

    lightTokensToProcess.forEach((lightToken) => {
        // Use the same consistent key to find the matching dark token.
        const pathKey = lightToken.path.slice(1).join('.');
        const darkToken = darkTokensByPath[pathKey];

        if (!darkToken) {
          console.warn(`-  Skipping '${lightToken.name}': No matching dark token found for path key '${pathKey}'.`);
          return;
        }

        const colorsetPath = path.join(assetPath, `${lightToken.name}.colorset`);
        if (!fs.existsSync(colorsetPath)) fs.mkdirSync(colorsetPath, { recursive: true });

        // Ensure RGB attributes exist before trying to access them
        const lightRgb = lightToken.attributes.rgb;
        const darkRgb = darkToken.attributes.rgb;
        if (!lightRgb || !darkRgb) {
          console.warn(`- Skipping '${lightToken.name}': Missing RGB values. Ensure 'attribute/color' transform ran.`);
          return;
        }

        const colorsetContent = {
          colors: [
            { // LIGHT
              idiom: 'universal',
              color: { 'color-space': 'srgb', components: {
                  red: `${(lightRgb.r / 255).toFixed(3)}`,
                  green: `${(lightRgb.g / 255).toFixed(3)}`,
                  blue: `${(lightRgb.b / 255).toFixed(3)}`,
                  alpha: `${lightRgb.a.toFixed(3)}`,
              }},
            },
            { // DARK
              idiom: 'universal',
              appearances: [{ appearance: 'luminosity', value: 'dark' }],
              color: { 'color-space': 'srgb', components: {
                  red: `${(darkRgb.r / 255).toFixed(3)}`,
                  green: `${(darkRgb.g / 255).toFixed(3)}`,
                  blue: `${(darkRgb.b / 255).toFixed(3)}`,
                  alpha: `${darkRgb.a.toFixed(3)}`,
              }},
            },
          ],
          info: { author: 'xcode', version: 1 },
        };

        fs.writeFileSync(path.join(colorsetPath, 'Contents.json'), JSON.stringify(colorsetContent, null, 2));
      });
      console.log('[iOS Colorset Action] Finished successfully.');
  },
  undo: (dictionary, platform) => { // Use 'platform' here too
    const assetPath = path.join(platform.buildPath, 'DesignTokens.xcassets');
    if (fs.existsSync(assetPath)) {
      fs.rmSync(assetPath, { recursive: true, force: true });
    }
  },
};