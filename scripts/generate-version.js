import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

/**
 * Generate version manifest for cache invalidation
 * Creates a version.json file with build metadata that can be used
 * by the client to detect new deployments.
 */

function getGitCommitHash() {
  try {
    return execFileSync('git', ['rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();
  } catch {
    return 'unknown';
  }
}

function getGitCommitDate() {
  try {
    return execFileSync('git', ['log', '-1', '--format=%cI'], { encoding: 'utf8' }).trim();
  } catch {
    return new Date().toISOString();
  }
}

function getPackageVersion() {
  try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    return pkg.version;
  } catch {
    return '1.0.0';
  }
}

async function generateVersion() {
  const version = {
    version: getPackageVersion(),
    buildTime: new Date().toISOString(),
    gitCommit: getGitCommitHash(),
    gitCommitDate: getGitCommitDate(),
    // A unique build ID that changes on every build
    buildId: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
  };

  // Write to public/version.json (will be copied to dist/ by Vite)
  const publicDir = path.resolve('public');
  const versionPath = path.join(publicDir, 'version.json');

  fs.writeFileSync(versionPath, JSON.stringify(version, null, 2));

  console.log('Generated version.json:', versionPath);
  console.log('Version info:', version);

  // Also write to dist/version.json if building
  const distDir = path.resolve('dist');
  if (fs.existsSync(distDir)) {
    const distVersionPath = path.join(distDir, 'version.json');
    fs.writeFileSync(distVersionPath, JSON.stringify(version, null, 2));
    console.log('Also written to:', distVersionPath);
  }
}

generateVersion().catch(console.error);