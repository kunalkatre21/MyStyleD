// build.js

console.log("[LOUDLY] The 'build.js' script has started.");

const { registerCustomCode, getConfig } = require('./config.js');

(async () => {
    try {
        const styleDictionaryModule = await import('style-dictionary');
        const StyleDictionary = styleDictionaryModule.default;
        
        if (!StyleDictionary) throw new Error("Could not find StyleDictionary.default.");

        // Register all your custom code just once.
        registerCustomCode(StyleDictionary);

        const brands = ['patient', 'doctor'];

        for (const brand of brands) {
            console.log(`\n[LOUDLY] Building all platforms for brand: ${brand}`);
            
            // --- THE FIX: Call getConfig to get a brand-specific configuration ---
            const brandConfig = getConfig(brand);
            
            // Create a Style Dictionary instance using this dynamic config.
            // It will have access to ALL source tokens, and the platform's
            // internal filter will correctly select only what's needed.
            const sd = new StyleDictionary(brandConfig);
            
            await sd.buildAllPlatforms();
        }

        console.log('\n==============================================');
        console.log('\nBuild completed successfully! 🎉');

    } catch (error) {
        console.log('\n==============================================');
        console.error('\n❌ Build failed! The show cannot go on:');
        // Add more detailed logging for reference errors
        if (error.message && error.message.includes('Reference Errors')) {
            console.error(error.details || error.message);
        } else {
            console.error(error);
        }
        process.exit(1);
    }
})();