<a href="#" className="...">...</a>import Image from "next/image";
...
<Image src="/assets/linkflow-logo-trans.png" alt="LinkFlow Logo" width={32} height={32} className="h-8 w-8" /><svg ...>
  <title>Open menu</title>
  <path ... />
</svg># Frontend Developer Guide: Commit Messages & Biome Rules

## 1. How to Write Commit Messages (Conventional Commits)

We use the [Conventional Commits](https://www.conventionalcommits.org/) style. This helps keep our git history clean and automates changelogs and releases.

**Format:**
```
<type>[optional scope]: <short description>

[optional body]
[optional footer]
```

**Examples:**
- `feat: add tooltip component for better UX`
- `fix: correct pagination logic on dashboard`
- `docs: update README with commit instructions`
- `refactor(ui): simplify button component logic`
- `chore: update biome config to disable redundant rules`

**Allowed types:**
- feat (new feature)
- fix (bug fix)
- docs (documentation only)
- style (formatting, no code change)
- refactor (code change, no feature/bug)
- test (adding or fixing tests)
- chore (tooling, config, etc)

**Tips:**
- Use the imperative mood (e.g., "add", not "adds" or "added").
- Keep the first line under 72 characters.
- Use the optional scope in parentheses to specify a part of the codebase (e.g., `feat(api): ...`).

---

## 2. How to Disable a Biome Rule in `biome.json`

If a Biome lint rule is too strict or not relevant, you can disable it in the `biome.json` config file at the project root.

**Example: Disable a rule globally**

To disable the `a11y/noRedundantRoles` rule:

```json
{
  "linter": {
    "rules": {
      "a11y": {
        "noRedundantRoles": "off"
      }
    }
  }
}
```

**Example: Disable a style rule**

To disable the `style/useImportType` rule:

```json
{
  "linter": {
    "rules": {
      "style": {
        "useImportType": "off"
      }
    }
  }
}
```

**Example: Disable a rule only for one line (inline)**

In your code, add this comment above the line:
```tsx
/* biome-ignore lint/a11y/noRedundantRoles */
<nav role="navigation">...</nav>
```

---

## 3. Where to Find the Config
- The Biome config is in `biome.json` at the root of the project.
- Ask the backend team if you need to disable a rule globally or have questions about commit conventions.

---

Happy coding!
