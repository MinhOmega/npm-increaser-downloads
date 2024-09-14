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

You can run npm-increaser-downloads in two ways:

1. Interactive mode:

```bash
nid
```

This will prompt you for the necessary configuration options.

2. Command-line arguments:

```bash
nid [options]
```

Available options:

- `-p, --package-name <name>`: NPM package to increase the downloads of
- `-n, --num-downloads <number>`: Number of times to download the package
- `-m, --max-concurrent-downloads <number>`: Amount of downloads to run in parallel at once
- `-t, --download-timeout <number>`: Max time (in ms) to wait for a download to complete
- `help`: Display help information

Examples:

```bash
nid -p my-package -n 1000 -m 300 -t 3000
nid --package-name my-package --num-downloads 1000 --max-concurrent-downloads 300 --download-timeout 3000
```

For more information and all available options, run:

```bash
nid help
```

Once you specify your configuration, this will start spamming downloads for the provided package in the npmjs registry. This will increase the popularity score of the npm package.

NOTE: The npmJS Weekly Downloads are updated **once every 24 hours**, so results will not be instantly visible.

### 🎥 Demo

![Demo](https://github.com/user-attachments/assets/964784a9-68d0-4c84-af09-ac9738a0e5a5)

### ⚙️ Configuration options

| Property               | Description                                             | Example                     |
| ---------------------- | ------------------------------------------------------- | --------------------------- |
| packageName            | NPM package to increase the downloads of                | `"npm-increaser-downloads"` |
| numDownloads           | Number of times to download the package                 | `1000`                      |
| maxConcurrentDownloads | Amount of downloads to run in parallel at once          | `300`                       |
| downloadTimeout        | Max time (in ms) to wait for for a download to complete | `3000`                      |

**NOTE: slower** networks may perform better with a **lower** `maxConcurrentDownloads` and a **higher** `downloadTimeout`

## 🛠️ Running in TypeScript

### 📥 Installing

Install the project using:

```bash
git clone https://github.com/MinhOmega/npm-increaser-downloads
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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.