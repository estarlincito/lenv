# lenv ⚡

> _“Load your .env seamlessly. Keep your shell in sync.”_

**lenv** is a **lightweight CLI tool** that reads a `.env` file and exports all variables into your shell environment. Perfect for Node.js, React, Next.js, TypeScript projects, or any workflow where you want your environment variables loaded instantly without extra dependencies.

---

## Features

- 🛠 **Simple CLI**: load `.env` into your current shell
- ⚡ **Bash & Zsh compatible**: works in any POSIX shell
- 🧩 **No external dependencies**: pure Node.js
- 🌐 **Supports quotes & escapes**: handles single/double quotes safely
- 🚀 **Quick setup**: `eval "$(lenv)"` or `source env_vars.sh`

---

## Installation

```bash
npm install -g lenv
# or
yarn global add lenv
# or
pnpm add -g lenv
```

---

## Basic Usage

```bash
# Load environment variables into the current shell
eval "$(lenv)"

# Or create a file to source later
lenv > env_vars.sh
source env_vars.sh

# Now the variables are available
echo $MY_VARIABLE
```

> `lenv` automatically reads `.env` from your current working directory. You can pass a custom path as an argument: `lenv /path/to/project`.

---

## Example `.env`

```env
RUNTIME=SANDBOX
API_KEY="123456"
MY_SECRET='super secret'
```

After running `eval "$(lenv)"`, all variables are available in your shell:

```bash
echo $RUNTIME      # SANDBOX
echo $API_KEY      # 123456
echo $MY_SECRET    # super secret
```

---

### Advanced

- Quotes in values are stripped automatically.
- Single quotes are escaped for safe Bash export.
- Lines starting with `#` or empty lines are ignored.

---

## License

MIT License – see [LICENSE](LICENSE) for details.

**Author:** Estarlin R ([estarlincito.com](https://estarlincito.com))
