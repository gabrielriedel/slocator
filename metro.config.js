const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('heic', 'HEIC', 'heif', 'HEIF');

module.exports = config;
