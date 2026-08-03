# Getting Started with Contributing

Setting up your development environment to contribute to the Data Alpha Portfolio project.

## Prerequisites

- Node.js 20 LTS
- npm 9.6.5 or later
- Python 3.14 or later and [uv](https://docs.astral.sh/uv/) for documentation changes
- Git

## Setup Steps

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/<your-username>/data-alpha.git
   cd data-alpha
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Python dependencies (for documentation)**

   ```bash
   uv sync
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Preview documentation changes**

   ```bash
   uv run zensical serve
   ```

## Making Changes

- Create a new branch for your feature or fix
- Make your changes following the [code style guidelines](./code-style.md)
- Test your changes locally
- Follow the [pull request process](./pull-request-process.md)
