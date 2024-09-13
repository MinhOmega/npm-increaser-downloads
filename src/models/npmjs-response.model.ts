interface NpmjsAuthor {
  name: string;
}

interface NpmjsBugs {
  url: string;
}

interface NpmjsScripts {
  [key: string]: string;
}

interface NpmjsDependencies {
  [key: string]: string;
}

interface NpmjsDevDependencies {
  [key: string]: string;
}

interface NpmjsPeerDependencies {
  [key: string]: string;
}

interface NpmjsEngines {
  node: string;
}

interface NpmjsPublishConfig {
  access: string;
  registry: string;
}

interface NpmjsReleaseIt {
  git: {
    commitMessage: string;
    tagName: string;
  };
  npm: {
    publish: boolean;
  };
  github: {
    release: boolean;
  };
  plugins: {
    [key: string]: {
      preset: string;
    };
  };
}

interface NpmjsDist {
  integrity: string;
  shasum: string;
  tarball: string;
  fileCount: number;
  unpackedSize: number;
  signatures: Array<{
    keyid: string;
    sig: string;
  }>;
}

interface NpmjsUser {
  name: string;
  email: string;
}

export interface NpmjsResponse {
  "name": string;
  "version": string;
  "description": string;
  "keywords": string[];
  "homepage": string;
  "bugs": NpmjsBugs;
  "license": string;
  "author": NpmjsAuthor;
  "main": string;
  "typings": string;
  "scripts": NpmjsScripts;
  "dependencies": NpmjsDependencies;
  "devDependencies": NpmjsDevDependencies;
  "peerDependencies": NpmjsPeerDependencies;
  "engines": NpmjsEngines;
  "publishConfig": NpmjsPublishConfig;
  "release-it": NpmjsReleaseIt;
  "_id": string;
  "gitHead": string;
  "_nodeVersion": string;
  "_npmVersion": string;
  "dist": NpmjsDist;
  "_npmUser": NpmjsUser;
  "directories": Record<string, unknown>;
  "maintainers": NpmjsUser[];
  "_npmOperationalInternal": {
    host: string;
    tmp: string;
  };
  "_hasShrinkwrap": boolean;
}
