// src/swift-uifont-formatter.js

const Handlebars = require('handlebars');
const fs = require('fs');

/**
 * Maps a token group name to a valid UIFont.TextStyle case.
 */
function mapToUIFontTextStyle(groupName) {
    const mapping = {
        "large title": "largeTitle",
        "title1": "title1",
        "title2": "title2", 
        "title3": "title3",
        "headline": "headline",
        "body": "body",
        "callout": "callout",
        "subheadline": "subheadline",
        "footnote": "footnote",
        "caption1": "caption1",
        "caption2": "caption2",
    };

    const normalizedKey = groupName.toLowerCase();
    const style = mapping[normalizedKey];
    
    if (!style) {
        console.warn(`[Style Dictionary] Couldn't find UIFont.TextStyle for "${groupName}". Defaulting to 'body'.`);
        return 'body';
    }
    
    return style;
}

function toCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
        if (/\s+/.test(match)) return "";
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}

module.exports = {
    name: 'swift/uifont-extension',
    format: function({ dictionary }) {
        console.log("Processing typography tokens for Swift UIFont extension...");
        
        const template = fs.readFileSync('src/swift-uifont-extension.hbs', 'utf8');
        const compiledTemplate = Handlebars.compile(template);

        const fonts = dictionary.allTokens
            .filter(token => token.$type === 'typography')
            .map(token => {
                // console.log(`Processing token: ${token.name}`);
                // console.log(`Token value structure:`, token.value || token.$value);
                
                // Try both token.value and token.$value to handle different processing stages
                const tokenValue = token.value || token.$value;
                
                if (!tokenValue) {
                    console.warn(`⚠️ WARNING: Token "${token.name}" has no value. Skipping.`);
                    return null;
                }
                
                // Handle the case where the value might be a reference that hasn't been resolved
                if (typeof tokenValue === 'string') {
                    console.warn(`⚠️ WARNING: Token "${token.name}" value is a string (possibly unresolved reference): ${tokenValue}. Skipping.`);
                    return null;
                }
                
                // Extract typography properties
                const fontFamily = tokenValue.fontFamily;
                const fontSize = tokenValue.fontSize;
                const fontWeight = tokenValue.fontWeight;
                
                if (!fontFamily || !fontSize || !fontWeight) {
                    console.warn(`⚠️ WARNING: Token "${token.name}" is missing required typography properties:`, {
                        fontFamily, fontSize, fontWeight
                    });
                    return null;
                }

                const styleGroup = token.path[0];
                const uiFontTextStyle = mapToUIFontTextStyle(styleGroup);
                const swiftWeight = toCamelCase(fontWeight);

                // console.log(`✅ Successfully processed: ${token.name} -> UIFont.TextStyle.${uiFontTextStyle}`);

                // return {
                //     name: token.name,
                //     size: parseFloat(fontSize),
                //     weight: swiftWeight,
                //     style: uiFontTextStyle
                // };
            })
            .filter(Boolean); // Remove null entries

        console.log(`Processed ${fonts.length} typography tokens for Swift.`);
        
        return compiledTemplate({ fonts: fonts });
    }
};
