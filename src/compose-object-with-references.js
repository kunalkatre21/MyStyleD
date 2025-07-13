// src/compose-object-with-references.js

module.exports = {
  name: 'compose/object-with-references',
  format: function({ dictionary, file }) { // Correct property name is 'format'
    const { allTokens } = dictionary;
    const { packageName, className } = file.options;

    // Filter tokens into primitives (have a raw hex) and semantics (have an alias)
    const primitives = allTokens.filter(token =>
      token.original.$value && token.original.$value.startsWith('#')
    );
    const semantics = allTokens.filter(token =>
      token.original.$value && token.original.$value.startsWith('{')
    );

    // A map to quickly find a primitive token by its alias path for referencing
    const primitiveMap = new Map(primitives.map(token => [token.path.join('.'), token]));

    // Generate Kotlin properties for primitive colors.
    // The `transforms` in config.json have already run, so token.name and token.value are correct.
    const primitiveProperties = primitives.map(token => {
      return `  val ${token.name} = ${token.value}`;
    }).join('\n');

    // Generate Kotlin properties for semantic colors, referencing primitives
    const semanticProperties = semantics.map(token => {
      const propName = token.name;
      const aliasPath = token.original.$value.slice(1, -1);
      const referencedToken = primitiveMap.get(aliasPath);

      if (referencedToken) {
        const referencedPropName = referencedToken.name;
        return `  val ${propName} = ${referencedPropName}`;
      } else {
        return `  // ERROR: Could not find primitive token for alias "${aliasPath}"`;
      }
    }).join('\n');

    return `// Do not edit directly, this file was auto-generated from Style Dictionary.
package ${packageName}

import androidx.compose.ui.graphics.Color

object ${className} {
  // --- Primitives ---
${primitiveProperties}

  // --- Semantics ---
${semanticProperties}
}
`;
  }
};