// src/compose-object-with-references.js

/**
 * Enhanced Style Dictionary formatter for Compose/Kotlin with robust alias resolution
 * Handles Tokens Studio token structures and complex reference patterns
 */

module.exports = {
  name: 'compose/object-with-references',
  format: function({ dictionary, file }) {
    const { allTokens } = dictionary;
    const { packageName = 'com.eka.ui.theme', className = 'StyleDictionaryColor' } = file.options || {};

    // console.log('=== DEBUGGING COLOR OBJECT FORMATTER ===');
    // console.log(`Total tokens: ${allTokens.length}`);

    // Enhanced token filtering with better detection
    const primitives = allTokens.filter(token => {
      const originalValue = token.original?.$value || token.original?.value;
      const resolvedValue = token.$value || token.value;
      
      // Check if it's a primitive color token (direct hex value)
      const isPrimitive = (originalValue && typeof originalValue === 'string' && originalValue.startsWith('#')) ||
                         (resolvedValue && typeof resolvedValue === 'string' && resolvedValue.startsWith('#'));
      
      // Also check if the resolved value is a proper hex color
      const hasValidHexValue = resolvedValue && typeof resolvedValue === 'string' && 
                              (resolvedValue.startsWith('#') || /^[0-9A-Fa-f]{6,8}$/.test(resolvedValue));
      
      return isPrimitive || hasValidHexValue;
    });

    // console.log(`Found ${primitives.length} primitive color tokens`);

    const semantics = allTokens.filter(token => {
      const originalValue = token.original?.$value || token.original?.value;
      
      // Look for alias patterns from Tokens Studio
      return originalValue && 
             typeof originalValue === 'string' && 
             originalValue.startsWith('{') && 
             originalValue.endsWith('}');
    });

    // console.log(`Found ${semantics.length} semantic color tokens`);

    // Create comprehensive token mapping for alias resolution
    const tokenMap = new Map();
    
    // Add all tokens with multiple path representations
    allTokens.forEach(token => {
      if (token.path && Array.isArray(token.path)) {
        // Full dot-separated path
        const fullPath = token.path.join('.');
        tokenMap.set(fullPath, token);
        
        // Kebab-case path
        const kebabPath = token.path.join('-');
        tokenMap.set(kebabPath, token);
        
        // Handle nested paths with different separators
        const slashPath = token.path.join('/');
        tokenMap.set(slashPath, token);
        
        // Token name direct mapping
        if (token.name) {
          tokenMap.set(token.name, token);
        }
        
        // Handle Tokens Studio specific patterns
        // Remove common prefixes that might cause mismatches
        const cleanPath = fullPath.replace(/^(primitive|semantic|component)\./, '');
        tokenMap.set(cleanPath, token);
        
        // Also try without the "Value" suffix common in Tokens Studio
        const pathWithoutValue = fullPath.replace(/\.Value$/, '');
        tokenMap.set(pathWithoutValue, token);
      }
    });

    // console.log('Primitive token paths available:');
    primitives.slice(0, 5).forEach(token => {
      const displayValue = token.$value || token.value || token.original?.$value;
      // console.log(`  ${token.path?.join('.') || 'unknown'} -> ${token.name} = ${displayValue}`);
    });

    /**
     * Enhanced alias resolution function
     */
    function resolveAlias(aliasValue, allTokens) {
      if (!aliasValue || !aliasValue.startsWith('{') || !aliasValue.endsWith('}')) {
        return null;
      }

      const aliasPath = aliasValue.slice(1, -1);
      // console.log(`  Attempting to resolve alias: "${aliasPath}"`);

      // Try direct lookup first
      let referencedToken = tokenMap.get(aliasPath);
      if (referencedToken) {
        // console.log(`  ✅ Direct match found: ${referencedToken.name}`);
        return referencedToken;
      }

      // Try various path transformations
      const pathVariations = [
        aliasPath,
        aliasPath.replace(/\./g, '-'),
        aliasPath.replace(/\./g, '/'),
        aliasPath.replace(/-/g, '.'),
        aliasPath.replace(/\//g, '.'),
        `primitive.Value.${aliasPath}`,
        `semantic.Value.${aliasPath}`,
        `component.Value.${aliasPath}`,
        aliasPath.replace(/^color\./, ''),
        `color.${aliasPath}`,
      ];

      for (const variation of pathVariations) {
        referencedToken = tokenMap.get(variation);
        if (referencedToken) {
          // console.log(`  ✅ Match found with variation "${variation}": ${referencedToken.name}`);
          return referencedToken;
        }
      }

      // Advanced fuzzy matching for Tokens Studio patterns
      const aliasSegments = aliasPath.split('.');
      referencedToken = allTokens.find(token => {
        if (!token.path || !Array.isArray(token.path)) return false;

        const tokenPath = token.path;
        
        // Try exact segment matching
        if (tokenPath.length === aliasSegments.length) {
          const exactMatch = tokenPath.every((segment, i) => {
            const aliasSegment = aliasSegments[i];
            return segment === aliasSegment || 
                   segment.toLowerCase() === aliasSegment.toLowerCase() ||
                   segment.replace(/-/g, '') === aliasSegment.replace(/-/g, '');
          });
          if (exactMatch) return true;
        }

        // Try suffix matching (important for Tokens Studio nested structures)
        const suffixLength = Math.min(tokenPath.length, aliasSegments.length);
        const tokenSuffix = tokenPath.slice(-suffixLength);
        const aliasSuffix = aliasSegments.slice(-suffixLength);
        
        const suffixMatch = tokenSuffix.every((segment, i) => {
          const aliasSegment = aliasSuffix[i];
          return segment === aliasSegment || 
                 segment.toLowerCase() === aliasSegment.toLowerCase() ||
                 segment.replace(/-/g, '') === aliasSegment.replace(/-/g, '');
        });

        return suffixMatch;
      });

      if (referencedToken) {
        // console.log(`  ✅ Fuzzy match found: ${referencedToken.name}`);
        return referencedToken;
      }

      // console.log(`  ❌ No match found for alias: "${aliasPath}"`);
      return null;
    }

    // **FIXED**: Generate Kotlin properties for primitive colors
    const primitiveProperties = primitives.map(token => {
      const value = token.$value || token.value || token.original?.$value;
      
      if (!value) {
        // console.warn(`⚠️ No resolved value for primitive token: ${token.name}`);
        return `    // ERROR: No value for primitive token "${token.name}"`;
      }

      // Handle different value formats
      let hexValue = value;
      
      // If it's already a processed color value, extract the hex
      if (typeof hexValue === 'string') {
        // Remove # if present
        if (hexValue.startsWith('#')) {
          hexValue = hexValue.substring(1);
        }
        
        // If it looks like a Color constructor call, extract the hex
        const colorMatch = hexValue.match(/Color\(0x([a-fA-F0-9]+)\)/);
        if (colorMatch) {
          hexValue = colorMatch[1];
        }
      }
      
      // Ensure it's a string and validate hex format
      hexValue = String(hexValue);
      
      // Final validation - should be 6 or 8 hex characters
      if (!/^[0-9A-Fa-f]{6}$|^[0-9A-Fa-f]{8}$/.test(hexValue)) {
        // console.warn(`⚠️ Invalid hex value for token ${token.name}: ${value} -> ${hexValue}`);
        return `    // ERROR: Invalid hex value for "${token.name}": ${value}`;
      }

      // Ensure 8 characters (add ff for alpha if 6 characters)
      if (hexValue.length === 6) {
        hexValue = 'ff' + hexValue;
      }

      return `    val ${token.name} = Color(0x${hexValue})`;
    }).join('\n');

    // Generate Kotlin properties for semantic colors with enhanced resolution
    const semanticProperties = semantics.map(token => {
      const propName = token.name;
      const aliasValue = token.original?.$value || token.original?.value;

      if (!aliasValue || !aliasValue.startsWith('{') || !aliasValue.endsWith('}')) {
        // console.warn(`⚠️ Invalid alias format for token: ${token.name} = ${aliasValue}`);
        return `    // ERROR: Invalid alias format for "${propName}": ${aliasValue}`;
      }

      // console.log(`Processing semantic token: ${propName} -> ${aliasValue}`);

      const referencedToken = resolveAlias(aliasValue, allTokens);

      if (referencedToken) {
        const referencedPropName = referencedToken.name;
        // console.log(`✅ Resolved ${propName} -> ${referencedPropName} (alias: ${aliasValue})`);
        return `    val ${propName} = ${referencedPropName}`;
      } else {
        // console.warn(`❌ Could not resolve alias "${aliasValue}" for semantic token "${propName}"`);
        return `    // ERROR: Could not resolve alias "${aliasValue}" for "${propName}"`;
      }
    }).join('\n');

    // console.log('=== END COLOR OBJECT DEBUG ===');

    // Generate the complete Kotlin file
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
