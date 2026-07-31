# Pull Request Process

How to submit contributions to the Data Alpha Portfolio project.

## Before You Begin

- Ensure you have forked the repository
- Create a new branch from `main` for your changes
- Make sure your local environment is set up correctly

## Creating a Pull Request

1. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

2. **Push to your fork**

   ```bash
   git push origin feature-branch-name
   ```

3. **Open the Pull Request**
   - Go to the original repository on GitHub
   - Click "Compare & pull request"
   - Fill in the PR template completely

## Pull Request Requirements

### Description

- Clearly describe what your changes accomplish
- Reference any related issues (e.g., "Fixes #123")
- Include screenshots for UI changes
- Note any breaking changes or migration steps

### Code Quality

- Build the portfolio successfully with `npm run build`
- Run Astro diagnostics with `npx astro check`
- Build documentation changes with `uv run zensical build`
- Follow the code style guidelines
- Include focused tests when adding testable behavior
- Update documentation as needed

### Documentation

- Update README if adding new features
- Add or modify documentation in `/docs/` as appropriate
- Ensure all public APIs are documented

## Review Process

1. **Initial Review** - Maintainers review for correctness and completeness.
2. **Feedback** - Address any requested changes.
3. **Approval** - A maintainer approves the change.
4. **Merge** - A maintainer merges the pull request.

## After Merge

- Delete your feature branch
- Pull the latest changes from main
