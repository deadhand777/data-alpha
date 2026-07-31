# Zensical CLI Reference

Reference for the Zensical command-line interface used for documentation.

## Available Commands

### `zensical new <path>`

Create a new Zensical documentation site.

### `zensical serve`

Start the local development server with live reload.

### `zensical build`

Build the static site for production deployment.

### `zensical -h, --help`

Show help information for any command.

## Configuration

This repository configures Zensical with `mkdocs.yml` and manages the installed version through `pyproject.toml` and `uv.lock`. Run commands through the locked environment:

```bash
uv sync
uv run zensical serve
uv run zensical build
```

The generated site is written to `site/` and should not be committed. See the [official Zensical documentation](https://zensical.org/docs/) for all supported options.
