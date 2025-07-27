// build.js

const fs = require('fs');
const deepmerge = require('deepmerge');

// When this line runs, Node executes config.js, registering all our code.
const { registerCustomCode, config } = require('./config.js');

/**
 * The Unifier.
 * This function reads all token files specified in the config,
 * extracts the actual token sets from within them (e.g., 'primitive/Value'),
 * and merges them all into a single, flat object.
 * This solves all reference errors at the root.
 */
function getUnifiedTokens() {
    console.log("[Unifier] I have been summoned to unite the token universes.");
    
    // 1. Read the content of every source file.
    const allFileObjects = config.source.map(filePath => {
        console.log(`  > Reading tokens from: ${filePath}`);
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    });

    // 2. Extract the token set *objects* from each file.
    // We use flatMap to create a single array of all the sets from all the files.
    const allTokenSets = allFileObjects.flatMap(fileObject =>
        Object.keys(fileObject)
            .filter(key => !key.startsWith('$')) // Ignore '$themes' and '$metadata'
            .map(setKey => fileObject[setKey])   // Get the object for that key
    );

    // 3. Merge all of these token set objects into one giant object.
    console.log("  > Merging all token sets into a single namespace... The universe is one!");
    const mergedTokens = deepmerge.all(allTokenSets);
    
    // The individual file paths are preserved on each token, so filtering will still work.
    return mergedTokens;
}

async function run() {
    try {
        console.log("Build process has been initiated...");

        // 1. Get our single, unified token object.
        const unifiedTokens = getUnifiedTokens();
        // console.log("=== DEBUGGING TYPOGRAPHY TOKENS ===");
        // Object.keys(unifiedTokens).forEach(key => {
        //   const token = unifiedTokens[key];
        //   if (token && typeof token === 'object' && token.$type === 'typography') {
        //       console.log(`Typography token found at key: ${key}`);
        //       console.log(`Token structure:`, JSON.stringify(token, null, 2));
        //   }
        // });
        console.log("=== END DEBUGGING ===");
        // 2. Create a final configuration object.
        const finalConfig = {
          ...config,
          tokens: unifiedTokens, // Use the pre-processed object.
          source: undefined,     // Nullify the original source array as it's no longer needed.
        };

        // 3. Pass the fully-formed config to the constructor.
        //    This is the correct way to instantiate Style Dictionary.
        const sd = new StyleDictionary(finalConfig);

        console.log("Building all platforms...");
        await sd.buildAllPlatforms();

        console.log('\n==============================================');
        console.log('\nBuild completed successfully! 🎉');

    } catch (error) {
        console.log('\n==============================================');
        console.error('\n❌ Build failed! An error occurred:');
        console.error(error);
        process.exit(1);
    }
}

run();