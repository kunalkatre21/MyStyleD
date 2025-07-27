// src/compose-material-scheme.js

function toCamelCase(str) {
  return str.replace(/[-_\s]+/g, ' ')
      .split(' ')
      .map((word, index) => {
          if (index === 0) return word.toLowerCase();
          return word.charAt(0).toUpperCase() + word.toLowerCase().slice(1);
      })
      .join('');
}

function resolveAlias(alias, allTokens) {
  if (!alias || !alias.startsWith('{') || !alias.endsWith('}')) {
      return null;
  }
  
  // Remove braces and split the path
  const aliasPath = alias.slice(1, -1).split('.');
  
  // Find token by matching the path segments
  return allTokens.find(token => {
      const tokenPath = token.path || [];
      if (tokenPath.length !== aliasPath.length) {
          return false;
      }
      return tokenPath.every((segment, i) => {
          // Handle kebab-case to camelCase conversion in paths
          const normalizedSegment = segment.replace(/-/g, '');
          const normalizedAlias = aliasPath[i].replace(/-/g, '');
          return normalizedSegment.toLowerCase() === normalizedAlias.toLowerCase();
      });
  });
}

module.exports = {
  name: 'compose/material-scheme',
  format: function({ dictionary, file }) {
      const allTokens = dictionary.allTokens;
      const colorObjectName = "StyleDictionaryColor";
      
      // console.log('=== MATERIAL SCHEME FORMATTER DEBUG ===');
      // console.log(`Total tokens: ${allTokens.length}`);
      
      // Look for scheme tokens by name pattern instead of file path
      const schemeTokens = allTokens.filter(token => {
          const tokenName = (token.name || '').toLowerCase();
          const hasSchemeInPath = token.path && token.path.some(p => 
              p.toLowerCase().includes('scheme') || p === 'M3'
          );
          
          // Look for Material 3 role names in token names
          const materialRoles = [
              'primary', 'surface', 'secondary', 'tertiary', 'error', 
              'background', 'outline', 'shadow', 'scrim', 'inverse'
          ];
          
          const hasRoleInName = materialRoles.some(role => 
              tokenName.includes(role.toLowerCase())
          );
          
          return hasSchemeInPath && hasRoleInName && token.original && 
                 token.original.$value && token.original.$value.startsWith('{');
      });
      
      // console.log(`Found ${schemeTokens.length} potential scheme tokens`);
      
      // If we still don't find them, look at the token structure more broadly
      if (schemeTokens.length === 0) {
          // console.log('No scheme tokens found, checking token structure...');
          
          // Look for any tokens that reference color aliases
          const aliasTokens = allTokens.filter(token => 
              token.original && token.original.$value && 
              token.original.$value.startsWith('{color.')
          );
          
          // console.log(`Found ${aliasTokens.length} tokens with color aliases`);
          
          // Show a few examples
          aliasTokens.slice(0, 5).forEach(token => {
              // console.log(`Alias token: "${token.name}" -> ${token.original.$value}`);
              // console.log(`  Path: [${token.path ? token.path.join(', ') : 'undefined'}]`);
          });
      }
      
      const schemeProperties = schemeTokens.map(token => {
          // Extract Material role from token name
          let roleName = token.name;
          
          // Convert schemes-prefixed names to camelCase roles
          if (roleName.toLowerCase().startsWith('schemes')) {
              roleName = roleName.replace(/^schemes/i, '');
          }
          
          const materialRole = toCamelCase(roleName);
          
          // Get the original alias value
          const alias = token.original.$value;
          
          // console.log(`Processing: ${token.name} -> ${materialRole} (alias: ${alias})`);
          
          if (!alias || !alias.startsWith('{') || !alias.endsWith('}')) {
              return `    // WARNING: Token "${materialRole}" is not a valid alias. Found value: ${alias}`;
          }
          
          // Resolve the alias to find the referenced token
          const referencedToken = resolveAlias(alias, allTokens);
          
          if (referencedToken) {
              // Convert the referenced token name to camelCase for the color object
              const colorReferenceName = referencedToken.name;
              
              // console.log(`✅ Mapped ${materialRole} -> ${colorObjectName}.${colorReferenceName}`);
              return `    ${materialRole} = ${colorObjectName}.${colorReferenceName}`;
          } else {
              console.warn(`❌ Could not resolve alias "${alias}" for role "${materialRole}"`);
              return `    // ERROR: Could not resolve alias "${alias}" for role "${materialRole}"`;
          }
      }).join(',\n');
      
      // console.log('=== END MATERIAL SCHEME DEBUG ===');
      
      const packageName = file.options?.packageName || 'com.eka.ui.theme';
      const className = file.options?.className || 'AppColorScheme';
      
      if (schemeProperties.trim() === '') {
          return `// Do not edit directly, this file was auto-generated from Style Dictionary.
package ${packageName}

import androidx.compose.material3.lightColorScheme
import androidx.compose.ui.graphics.Color

val ${className} = lightColorScheme(
  // No Material scheme tokens found - check debug output above
  primary = Color.Blue, // Fallback
  secondary = Color.Green // Fallback  
)
`;
      }
      
      return `// Do not edit directly, this file was auto-generated from Style Dictionary.
package ${packageName}

import androidx.compose.material3.lightColorScheme
import androidx.compose.ui.graphics.Color

val ${className} = lightColorScheme(
${schemeProperties}
)
`;
  }
};
