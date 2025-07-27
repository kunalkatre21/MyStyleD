// src/parser.js

module.exports = {
    // My name, so everyone in the production knows who I am.
    name: 'json/token-studio', 
    
    // I am looking for files that match this pattern.
    pattern: /\.json$/,
  
    // --- THE TRUE FIX IS HERE ---
    // Style Dictionary's registration system (the 'director') looks for a property
    // with the exact name 'parser' to find the function that does the work.
    // My last instruction to rename this to 'parse' was incorrect. My apologies.
    // I am now correctly named 'parser', and I am ready to perform my duty.
    parser: ({contents, filePath}) => {
      console.log(`[parser:json/token-studio] Greetings! My name is 'parser' and I am now processing: ${filePath}`);
      try {
        const obj = JSON.parse(contents);
  
        // My important job is to remove the conflicting '$themes' and '$metadata' keys.
        // This prevents the 'Token collisions' error down the line.
        if ('$themes' in obj) {
          delete obj['$themes'];
          console.log("  > The '$themes' key has been found and removed. The stage is set!");
        }
        if ('$metadata' in obj) {
          delete obj['$metadata'];
          console.log("  > The '$metadata' key has been found and removed. Clarity is restored!");
        }
        
        // My work here is done. I'm returning the clean token object.
        return obj;
      } catch (e) {
        // If something goes wrong, I will speak up loudly so I can be heard.
        console.error(`[parser:json/token-studio] ❌ An error occurred! I could not parse the JSON from: ${filePath}`);
        console.error(e);
        // I will return an empty object so the show can go on without a major crash.
        return {};
      }
    }
  };