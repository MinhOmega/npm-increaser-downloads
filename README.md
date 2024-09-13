# 📊 npm-increaser-downloads

A tool designed to simulate package downloads and increase the popularity score of npm packages, inspired by [npm-downloads-increaser](https://github.com/lachiejames/npm-downloads-increaser). This enhanced version allows developers to test and analyze the impact of download counts on package visibility and ranking within the npm ecosystem, with added support for packages not found in npms.io and several new features.

## ✨ Features

- Simulates package downloads from the npm registry
- Supports packages not listed on npms.io
- Configurable download count, concurrency, and timeout settings
- Supports both CLI and programmatic usage
- Real-time progress tracking and statistics
- Handles scoped packages and various network conditions

## ⚠️ Disclaimer

This tool is intended for educational and testing purposes only. Artificially inflating download counts may violate npm's terms of service. Use responsibly and at your own risk.

## 🖥️ Running from the command line

### 📥 Installing

Install `npm-increaser-downloads` globally using npm:

```bash
npm install -g npm-increaser-downloads
```

or

```bash
npx npm-increaser-downloads
```

### 🚀 Running

Setup configuration and run:

```bash
npm-increaser-downloads
```

Once you specify your configuration, this will start spamming downloads for the provided package in the npmjs registry. This will increase the popularity score of the npm package.

NOTE: The npmJS Weekly Downloads are updated **once every 24 hours**, so results will not be instantly visible.

### 🎥 Demo

![Demo](https://github.com/user-attachments/assets/964784a9-68d0-4c84-af09-ac9738a0e5a5)

### ⚙️ Configuration options

| Property               | Description                                             | Example                     |
| ---------------------- | ------------------------------------------------------- | --------------------------- |
| packageName            | NPM package to increase the downloads of                | `"npm-increaser-downloads"` |
| numDownloads           | Number of times to download the package                 | `100000`                    |
| maxConcurrentDownloads | Amount of downloads to run in parallel at once          | `300`                       |
| downloadTimeout        | Max time (in ms) to wait for for a download to complete | `3000`                      |

**NOTE: slower** networks may perform better with a **lower** `maxConcurrentDownloads` and a **higher** `downloadTimeout`

## 🛠️ Running in TypeScript

### 📥 Installing

Install the project using:

```bash
git clone https://github.com/lachiejames/npm-increaser-downloads.git
```

### 🔧 Setting up your configuration

Open `npm-increaser-downloads.config.ts` from the root directory, and populate the configuration options as shown in the table above.

### 💻 Running locally

Installing dependencies:

```bash
npm install
```

Running in development mode:

```bash
npm run dev
```

Running the CLI in development mode:

```bash
npm run dev:cli
```

Compiling to JavaScript:

```bash
npm run build
```

Running with Node:

```bash
npm start
```

Running tests:

```bash
npm test
```

Formatting code:

```bash
npm run format
```
