// src/compose-object-with-references.js

module.exports = {
  name: 'compose/object-with-references',
  format: function({ dictionary, file }) {
    const { allTokens } = dictionary;
    const { packageName, className } = file.options;

    const primitives = allTokens.filter(token =>
      token.original?.$value && token.original.$value.startsWith('#')
    );
    const semantics = allTokens.filter(token =>
      token.original?.$value && token.original.$value.startsWith('{')
    );

    const primitiveMap = new Map(primitives.map(token => [token.path.join('.'), token]));

    // Generate Kotlin properties for primitive colors.
    const primitiveProperties = primitives.map(token => {
      // --- THE FIX IS HERE ---
      // The debug logs showed the transformed value is in token.$value, not token.value.
      // We will now read from the correct property.
      const value = token.$value; 
      if (value === undefined) {
        // Add a fallback for safety, in case other tokens behave differently.
        return `  // ERROR: Transformed value for "${token.name}" is undefined.`;
      }
      return `  val ${token.name} = ${value}`;
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