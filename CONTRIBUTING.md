# ✨ Contributing to Nebula

First off, thanks for taking the time to contribute! Please adhere to the following rules for contributing to the project.

## 📜 Code of Conduct

Please read the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## 🙋 How Can I Contribute?

- Report Bugs
- Improve Documentation
- Solve Open Issues
- Suggest Features
- Add Features

### 🐞 Report Bugs

- To report a bug, open an issue.
- The title should start with the prefix: `Bug:`.
- Describe the bug clearly and provide steps to reproduce.
- Include any relevant screenshots, videos, or logs.

### 📚 Improve Documentation

- Fix typos, formatting issues, or unclear explanations
- You can suggest structure/content changes by opening an issue or directly submitting a pull request
- For significant changes, open an issue to discuss them first

### ✅ Solve Open Issues

- Look for issues
- Comment on the issue to let others know you're working on it
- Link the issue in your PR with `Closes #issue_number`

### 💡 Suggest Features

- To suggest a feature, open an issue.
- The title should start with the prefix: `Feature:`
- Describe the motivation behind the feature and how it improves the project.
- Include mockups, diagrams, or usage examples if applicable.

### ✨ Add Features

- Fork the repository and create a new branch for your change.
- Make sure your code follows the project's style guide.
- Test your changes before committing.
- Use clear and conventional commit messages.
- Link the related issue (if any) in your PR description.

## 🛠 Development Setup

- Fork the project
- Clone your fork
- For development, you'll need to connect to Nebula's Firebase backend. Create a `.env` file in the root of the project and add the following environment variables:
```
# ⚠️ Note: These keys are for the development version of Nebula only
VITE_API_KEY="AIzaSyAmFZEdPD1lgnTnUlW58LyvLrd_MKfaBWU"
VITE_AUTH_DOMAIN="nebula-dev-3c154.firebaseapp.com"
VITE_PROJECT_ID="nebula-dev-3c154"
VITE_STORAGE_BUCKET="nebula-dev-3c154.firebasestorage.app"
VITE_MESSAGING_SENDER_ID="751580422880"
VITE_APP_ID="1:751580422880:web:fd7edfe6aa5eeeefdc2685"
```
- Install dependencies
```
npm install
```
- Run the project
```
npm run dev
```

## ✅ Code Formatting & Linting

- Before submitting your pull request, please ensure your code follows the project's formatting and linting standards.
- Run Prettier to auto-format your code:
```
npm run format
```
- Then, run ESLint to catch any code style issues:
```
npm run lint
```
- ⚠️ Note: If you notice a large number of unexpected Git diffs—especially in files you haven't edited—this likely means your local formatting and linting setup is not aligned with the project's configuration.
Make sure your editor respects the project's Prettier and ESLint settings. Fix the discrepancies and try again.

## 🔁 Pull Request Guidelines

- Keep pull requests focused and minimal — 1 feature/fix per PR is ideal
- Include a clear title and description of the change
- Reference related issues with `Closes #issue_number`
