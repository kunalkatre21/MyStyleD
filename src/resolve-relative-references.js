// src/resolve-relative-references.js
// These are the top-level token set names from your files. I am the key to solving the mystery.
// --- FIX: Corrected paths to match the JSON structure (e.g., 'primitive/Value') ---
const KNOWN_TOKEN_SETS = [
  'primitive/Value',
  'semantic/Value',
  'component/Value',
  'M3/Value',
  'Font theme/Baseline',
  'Font theme/Wireframe',
  'Typescale/Baseline',
  'Shape/Baseline',
  'System Colors/Value',
  'App Icon Modes/Value'
  ];
  module.exports = {
  name: 'resolve-relative-references',
  type: 'value',
  transitive: true,
  matcher: (token) => {
  // I only care about tokens that have a reference in their original value.
  return token.original?.
  value === 'string' && token.original.$value.startsWith('{');
  },
  transform: (token, options) => {
  const originalRef = token.original.$value;
  let ref = originalRef.slice(1, -1);
  const { dictionary } = options;
  // First, let's see if the reference already works.
if (dictionary.get(ref.split('.'))) {
  // It does! No need for heroics.
  return originalRef;
}

// The reference is broken. This is my moment to shine!
// console.log(`[resolver] I see a broken reference: ${originalRef}. I will now attempt to fix it.`);

// I will try to fix it by prepending the known token set paths.
for (const set of KNOWN_TOKEN_SETS) {
  const newRef = `${set}.${ref}`;
  const resolved = dictionary.get(newRef.split('.'));
  
  if (resolved) {
    // Success! I found the full name.
    // console.log(`  > SUCCESS! I resolved it to: {${newRef}}`);
    // I must return the *new, corrected reference string*, NOT the final value.
    // Style Dictionary will use this corrected path to do the final lookup.
    return `{${newRef}}`;
  }
}

// If I reached here, I have failed. I must announce it.
// console.warn(`  > FAILURE! I could not find a match for ${originalRef} in any known set.`);
return originalRef; // Return the original broken reference.
}
};