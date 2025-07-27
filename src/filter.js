// src/filter.js

function isNotThemeToken(token) {
  // A "theme" token is one that has a top-level 'theme' attribute.
  // The 'attribute/cti' transform must run first for this to work.
  return !token.attributes.theme;
}

function isThemeToken(token) {
  // A "theme" token is one that has a top-level 'theme' attribute.
  // The 'attribute/cti' transform must run first for this to work.
  return !!token.attributes.theme;
}

module.exports = {
  isNotThemeToken,
  isThemeToken,
};