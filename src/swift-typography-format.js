// swift-typography-format.js

/**
 * Helper to convert a string to a valid Swift type name (PascalCase).
 * e.g., "heading 1" -> "Heading1"
 */
function toPascalCase(str) {
    // First, clean up any problematic characters
    const sanitized = str.replace(/[^a-zA-Z0-9\s]/g, ' ').replace(/\s+/g, ' ');
    // Convert to PascalCase
    return sanitized.replace(/(?:^|\s)(\w)/g, (_, c) => c.toUpperCase()).replace(/\s/g, '');
  }
  
  /**
   * Helper to convert a string to a valid Swift property name (camelCase).
   * e.g., "Regular" -> "regular", "Caps(SB)" -> "capsSb", "20" -> "n20"
   */
  function toCamelCase(str) {
    // If the string is purely numeric, prefix it to make it a valid identifier.
    if (/^\d+$/.test(str)) {
      return `n${str}`;
    }
    // First, handle special cases and sanitize the string.
    const sanitized = str
      .replace(/\((R|SB)\)/g, (match, p1) => p1)
      .replace(/[^a-zA-Z0-9\s]/g, '');
  
    // Then, convert to camelCase.
    return sanitized.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (/\s+/.test(match)) return ""; // remove spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }
  
  /**
   * Creates the PostScript font name from the family and weight.
   * This is more robust and handles combined weights like "Semi Bold Italic".
   * e.g., ("Inter", "Semi Bold Italic") -> "Inter-SemiBoldItalic"
   */
  function getPostScriptName(fontFamily, fontWeight) {
    const family = fontFamily.replace(/\s/g, '');
    const weightSuffix = fontWeight.replace(/\s/g, '');
    return `${family}-${weightSuffix}`;
  }
  
  module.exports = {
    name: 'swift/typography',
    format: function({ dictionary, file, options }) {
      const { className = 'AppTypography', import: imports = ['UIKit', 'SwiftUI'] } = options;
  
      const fileHeader = `//
  // ${file.destination}
  //
  // Do not edit directly, this file is generated from the design tokens.
  //\n`;
  
      const swiftImports = `import ${imports.join('\nimport ')}\n\n`;
  
      const typographyStyleStruct = `/// A container for holding both a UIFont and a SwiftUI Font.
  public struct TypographyStyle {
      public let uiFont: UIFont
      public let font: Font
  }
  
  `;
  
      const groupedTokens = dictionary.allTokens.reduce((acc, token) => {
        const groupKey = token.path[0]; 
        if (!acc[groupKey]) {
          acc[groupKey] = [];
        }
        acc[groupKey].push(token);
        return acc;
      }, {});
  
      const enums = Object.entries(groupedTokens).map(([groupName, tokens]) => {
          const structName = toPascalCase(groupName);
  
          const properties = tokens.map(token => {
              const { value } = token;

              console.log(`[DEBUG] For token '${token.name}', the value type is: ${typeof value}`);


              if (!value || typeof value !== 'object' || !value.fontFamily || !value.fontSize || !value.fontWeight) {
            console.warn(`⚠️ WARNING: Token "${token.name}" is missing required typography values. Skipping.`);
            return null;
            }
              
              const styleName = token.path[token.path.length - 1];
              const propertyName = toCamelCase(styleName);
  
              const postScriptName = getPostScriptName(value.fontFamily, value.fontWeight);
              const fontSize = parseFloat(value.fontSize);
  
              const isUnderline = (value.textDecoration || '').toLowerCase() === 'underline';
  
              // For SwiftUI, we use .custom() with the full PostScript name.
              // The name itself (e.g., "Inter-SemiBoldItalic") defines the style.
              let swiftUIFont = `.custom("${postScriptName}", size: ${fontSize})`;
              if (isUnderline) swiftUIFont += '.underline()';
              
              return `        /// Font: ${postScriptName}, Size: ${fontSize}
          public static let ${propertyName} = TypographyStyle(
              uiFont: UIFont(name: "${postScriptName}", size: ${fontSize})!,
              font: ${swiftUIFont}
          )`;
          }).filter(Boolean).join('\n\n');
  
          return `    public enum ${structName} {
  ${properties}
      }`;
      }).join('\n\n');
  
      return `${fileHeader}${swiftImports}${typographyStyleStruct}public enum ${className} {\n\n${enums}\n\n}\n`;
    }
  };