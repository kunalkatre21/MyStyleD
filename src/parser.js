// src/parser.js

// This function recursively traverses the token object.
// When it finds a token (an object with a $value or $type), it adds the metadata.
function addMetadataRecursively(obj, metadata) {
  if (typeof obj !== 'object' || obj === null) {
    return;
  }

  // Check if the current object is a token node.
  if (obj.hasOwnProperty('$value') || obj.hasOwnProperty('$type')) {
    // Apply the brand and theme metadata.
    Object.assign(obj, metadata);
  }

  // Continue traversing deeper into the object.
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      addMetadataRecursively(obj[key], metadata);
    }
  }
}

module.exports = {
  // A unique name for the parser
  name: 'json/token-studio',
  // A pattern to match files this parser should handle
  pattern: /\.json$/,
  // The parser function itself
  parser: ({ contents }) => {
    const rawObject = JSON.parse(contents);
    const finalObject = {};

    // Iterate over the top-level keys from your JSON (e.g., "primitive/patient-light")
    for (const key in rawObject) {
      // Ignore metadata keys like "$themes"
      if (key.startsWith('$')) continue;

      const tokens = rawObject[key];
      let brand = 'none';
      let theme = 'none';
      
      // Determine the brand and theme from the top-level key
      if (key.includes('/')) {
          const parts = key.split('/'); // e.g., ["semantic", "patient-dark"]
          const group = parts[0];
          const name = parts[1];

          // Only apply brand/theme to the sets that are structured this way
          if (group === 'primitive' || group === 'semantic') {
              const nameParts = name.split('-');
              brand = nameParts[0]; // "patient"
              theme = nameParts.length > 1 ? nameParts[1] : 'light'; // "dark" or "light"
          }
      }
      
      // Recursively add this brand/theme metadata to all tokens under this key
      addMetadataRecursively(tokens, { brand, theme });
      finalObject[key] = tokens;
    }
    
    return finalObject;
  },
};