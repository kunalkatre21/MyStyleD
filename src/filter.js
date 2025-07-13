// src/filters.js

function isNotThemeToken(token) {
    // This will return true if the token is NOT from the theme file,
    // which is what we want for filtering platforms like ios-colorsets.
    return token.filePath !== 'tokens/theme.material.json';
  }
  
  function isThemeToken(token) {
    // This will return true if the token IS from the theme file.
    return token.filePath === 'tokens/theme.material.json';
  }
  
  module.exports = {
    isNotThemeToken,
    isThemeToken
  };