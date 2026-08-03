# CodeGraph

**🚀 FIRST CHOICE FOR CODE EXPLORATION** - In repositories indexed by CodeGraph (a `.codegraph/` directory exists at the repo root), **always reach for CodeGraph BEFORE using grep/find or reading files** when you need to understand or locate code. This approach provides 5-10x faster responses with significantly reduced token usage.

## Why CodeGraph First?
- **Speed**: Get answers in seconds vs minutes of file reading
- **Efficiency**: Uses 1/10th the tokens of manual file exploration
- **Completeness**: Shows call paths and relationships grep can't find
- **Accuracy**: Always shows current symbol definitions, not outdated copies

## How to Use CodeGraph

### **MCP Tool** (Recommended - when available)
Use `codegraph_explore` for instant, comprehensive code exploration:
```
codegraph_explore({
  query: "AuthService loginUser session-manager"
})
```
Returns: Relevant symbols' verbatim source + call paths between them (including dynamic-dispatch hops grep can't follow)

### **Shell Command** (Always works)
Use `codegraph explore` from terminal:
```bash
codegraph explore "AuthService loginUser session-manager"
```

### **Examples**
**Instead of:** Reading multiple files to understand authentication flow
**Use:** `codegraph_explore({ query: "login authentication cookie storage" })`

**Instead of:** Grepping for component usage across files
**Use:** `codegraph_explore({ query: "Button component usage" })`

**Instead of:** Reading config files to understand setup
**Use:** `codegraph_explore({ query: "tailwind config colors" })`

**Note:** `.codegraph/` currently has no index files (only `.gitignore`) — run `codegraph init` before relying on `codegraph_explore`.

<!-- CODEGRAPH_END -->

See root `@CLAUDE.md` for project overview, structure, and commands — not duplicated here.
