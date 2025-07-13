// src/compose-material-scheme.js

/**
 * Converts a string to camelCase.
 * e.g., "On Primary Container" -> "onPrimaryContainer"
 */
function toCamelCase(str) {
  return str.replace(/[-_]/g, ' ').split(' ').map((word, index) => {
    if (index === 0) return word.toLowerCase();
    const lowerWord = word.toLowerCase();
    return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
  }).join('');
}

module.exports = {
  name: 'compose/material-scheme',
  format: function({ dictionary, file }) {
    const allTokens = dictionary.allTokens;
    const colorObjectName = "StyleDictionaryColor";

    // Filter to get only the tokens that define the roles in our Material scheme.
    const schemeTokens = allTokens.filter(token =>
      token.filePath === 'tokens/theme.material.json' && token.path[0] === 'Schemes'
    );

    const schemeProperties = schemeTokens.map(token => {
      const materialRole = toCamelCase(token.path[1]);

      // Get the alias from the original, unprocessed token value, e.g., "{brand.purple.500}"
      const alias = token.original.$value;

      // Ensure it is an alias. If not, it's a hard-coded value we can't look up.
      if (!alias || !alias.startsWith('{') || !alias.endsWith('}')) {
        return `    // WARNING: Token "${materialRole}" is not a valid alias. Found value: ${alias}`;
      }

      // Clean the alias to get the path array, e.g., ['brand', 'purple', '500']
      const aliasPath = alias.slice(1, -1).split('.');

      // Find the source token by matching its path with the alias path.
      // This is the most reliable way to link tokens.
      const referencedToken = allTokens.find(t => {
        // `t.path` is an array of strings. We compare it to `aliasPath`.
        if (t.path.length !== aliasPath.length) {
          return false;
        }
        return t.path.every((segment, i) => segment === aliasPath[i]);
      });

      if (referencedToken) {
        // Success! We found the exact source token.
        // The 'compose/object' format uses camelCase names by default.
        // The default 'name/cti/pascal' transform creates PascalCase, so we convert it.
        const tokenName = referencedToken.name;
        const colorReferenceName = tokenName.charAt(0).toLowerCase() + tokenName.slice(1);

        return `    ${materialRole} = ${colorObjectName}.${colorReferenceName}`;
      } else {
        // This is a critical warning: the alias in your theme file points to nothing.
        return `    // ERROR: Could not resolve alias "${alias}" for role "${materialRole}"`;
      }
    }).join(',\n');

    const packageName = file.options?.packageName || 'com.yourcompany.designsystem';
    const className = file.options?.className || 'AppColorScheme';

    return `// Do not edit directly, this file was auto-generated from Style Dictionary.
package ${packageName}

import androidx.compose.material3.lightColorScheme
import androidx.compose.ui.graphics.Color
import ${colorObjectName} // Import the generated color object

val ${className} = lightColorScheme(
${schemeProperties}
)
`;
  }
};