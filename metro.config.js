// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push("png", "jpg", "jpeg", "gif", "webp", "svg");

config.resolver.sourceExts.push("sql");

config.resolver.alias = {
  "@": path.resolve(__dirname),
};

module.exports = config;
