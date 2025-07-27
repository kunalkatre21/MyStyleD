// build.js

// --- LOUDLY ANNOUNCE SCRIPT START ---
console.log("[LOUDLY] The 'build.js' script has started. The curtain rises!");

const fs = require('fs');
const deepmerge = require('deepmerge');

// --- LOUDLY ANNOUNCE REQUIREMENT OF CONFIG ---
console.log("[LOUDLY] Loading the 'config.js' module...");
const { registerCustomCode, config } = require('./config.js');
console.log("[LOUDLY] 'config.js' has been loaded successfully.");


function getUnifiedTokens() {
    console.log("[LOUDLY] The Unifier is now at work...");
    
    const allFileObjects = config.source.map(filePath => {
        console.log(`  > Unifier is reading: ${filePath}`);
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    });

    const allTokenSets = allFileObjects.flatMap(fileObject =>
        Object.keys(fileObject)
            .filter(key => !key.startsWith('$'))
            .map(setKey => fileObject[setKey])
    );

    console.log("  > Unifier is merging all token sets...");
    const mergedTokens = deepmerge.all(allTokenSets);
    console.log("[LOUDLY] The Unifier has finished. The universe is one!");
    
    return mergedTokens;
}

// --- MAIN EXECUTION WRAPPED IN AN ASYNC IIFE ---
// This is the correct way to run async code in a CommonJS script.
(async () => {
    try {
        // --- STEP 1: ASYNCHRONOUSLY IMPORT STYLE DICTIONARY ---
        console.log("[LOUDLY] Attempting to import 'style-dictionary' module asynchronously...");
        const styleDictionaryModule = await import('style-dictionary');
        console.log("[LOUDLY] The 'style-dictionary' module has been imported.");
        
        // --- STEP 2: INSPECT AND EXTRACT THE DEFAULT EXPORT ---
        console.log("[LOUDLY] Inspecting the imported module to find the StyleDictionary class...");
        const StyleDictionary = styleDictionaryModule.default;

        if (!StyleDictionary) {
            console.error("[LOUDLY] FATAL ERROR: The 'default' export was not found on the imported module!");
            console.log("[LOUDLY] The imported module looks like this:", styleDictionaryModule);
            throw new Error("Could not find StyleDictionary.default. The build cannot continue.");
        }
        console.log("[LOUDLY] Found the StyleDictionary class successfully!");

        // --- STEP 3: REGISTER OUR CUSTOM CODE ---
        console.log("[LOUDLY] Handing over to the registration function...");
        registerCustomCode(StyleDictionary);

        // --- STEP 4: GET THE UNIFIED TOKENS ---
        const unifiedTokens = getUnifiedTokens();

        // --- STEP 5: PREPARE THE FINAL CONFIGURATION ---
        console.log("[LOUDLY] Assembling the final configuration object...");
        const finalConfig = {
          ...config,
          tokens: unifiedTokens, 
          source: undefined,     
        };
        console.log("[LOUDLY] Final configuration is ready.");

        // --- STEP 6: INSTANTIATE STYLE DICTIONARY ---
        console.log("[LOUDLY] Now creating a new instance of StyleDictionary. This is the moment of truth...");
        const sd = new StyleDictionary(finalConfig);
        console.log("[LOUDLY] StyleDictionary instance created successfully!");

        // --- STEP 7: BUILD PLATFORMS ---
        console.log("[LOUDLY] Instructing Style Dictionary to build all platforms...");
        await sd.buildAllPlatforms();
        console.log('[LOUDLY] All platforms built.');

        console.log('\n==============================================');
        console.log('\nBuild completed successfully! 🎉');

    } catch (error) {
        console.log('\n==============================================');
        console.error('\n❌ Build failed! The show cannot go on:');
        console.error(error);
        process.exit(1);
    }
})();