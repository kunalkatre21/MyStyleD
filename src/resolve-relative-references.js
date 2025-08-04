// src/resolve-relative-references.js

const KNOWN_TOKEN_SETS = [
    "primitive/patient-light", "primitive/doctor-light",
    "primitive/patient-dark", "primitive/doctor-dark",
    "semantic/patient-light", "semantic/doctor-light",
    "semantic/patient-dark", "semantic/doctor-dark",
    "component/Value", "M3/mapping", "Font theme/Baseline",
    "Font theme/Wireframe", "Typescale/Baseline", "Shape/Baseline",
    "iOS/mapping", "App Icon Modes/Value", "primitive"
  ];
  
  module.exports = {
    name: 'resolve-relative-references',
    type: 'value',
    transitive: true,
    matcher: (token) => {
        const originalValue = token.original?.$value || token.original?.value;
        return typeof originalValue === 'string' && originalValue.startsWith('{');
    },
    transform: (token, options) => {
        const originalRef = token.original.$value || token.original.value;
        let ref = originalRef.slice(1, -1);
        const { dictionary } = options;
  
        if (dictionary.get(ref.split('.'))) {
            return originalRef;
        }
  
        for (const set of KNOWN_TOKEN_SETS) {
            const newRef = `${set.replace(/\//g, '.')}.${ref}`;
            if (dictionary.get(newRef.split('.'))) {
                return `{${newRef}}`;
            }
        }
        return originalRef;
    }
  };