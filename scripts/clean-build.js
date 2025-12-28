#!/usr/bin/env node

/**
 * Cross-platform build cleanup script
 * Moves JS and CSS files and removes the static directory
 */

const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const staticJsDir = path.join(buildDir, 'static', 'js');
const staticCssDir = path.join(buildDir, 'static', 'css');
const staticDir = path.join(buildDir, 'static');

try {
  console.log('🧹 Cleaning build directory...');

  // Find and move JS files
  if (fs.existsSync(staticJsDir)) {
    const jsFiles = fs.readdirSync(staticJsDir).filter(file => file.endsWith('.js'));
    if (jsFiles.length > 0) {
      const sourceJs = path.join(staticJsDir, jsFiles[0]);
      const targetJs = path.join(buildDir, 'big-omega-tools.js');
      fs.renameSync(sourceJs, targetJs);
      console.log('✅ Moved JS file');
    }
  }

  // Find and move CSS files
  if (fs.existsSync(staticCssDir)) {
    const cssFiles = fs.readdirSync(staticCssDir).filter(file => file.endsWith('.css'));
    if (cssFiles.length > 0) {
      const sourceCss = path.join(staticCssDir, cssFiles[0]);
      const targetCss = path.join(buildDir, 'big-omega-tools.css');
      fs.renameSync(sourceCss, targetCss);
      console.log('✅ Moved CSS file');
    }
  }

  // Remove static directory recursively
  if (fs.existsSync(staticDir)) {
    fs.rmSync(staticDir, { recursive: true, force: true });
    console.log('✅ Removed static directory');
  }

  console.log('🎉 Build cleanup complete!');
} catch (error) {
  console.error('❌ Error during cleanup:', error.message);
  process.exit(1);
}
