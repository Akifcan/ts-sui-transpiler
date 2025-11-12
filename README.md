# Demo App - TypeScript to Move Transpiler

## Features

## Purpose

This is a TypeScript-to-Move transpiler that allows developers to write Sui smart contracts using familiar JavaScript syntax.
It aims to lower the entry barrier for web developers who want to explore the Move ecosystem, enabling rapid prototyping and onboarding without deep knowledge of the Move language.
By combining decorators, classes, and typed structures, MoveJS generates clean, production-ready Move code — helping more developers build on Sui faster.

## Available Commands

### 1. Help Command
Displays usage information and available commands.

```bash
yarn build && node bin/cli.js --help
yarn build && node bin/cli.js -h
```

**Output:**
- Shows all available commands and their descriptions
- Displays usage examples

### 2. Version Command
Shows the current version of the CLI tool.

```bash
yarn build && node bin/cli.js --version
yarn build && node bin/cli.js -v
```

**Output:**
- Displays the version number from package.json

### 3. Create Command
Creates a new demo `.sui.ts` file with a complete template in the current directory.

```bash
yarn build && node bin/cli.js --create
yarn build && node bin/cli.js -cr
```

**Features:**
- Generates a file named `demo[timestamp].sui.ts` (e.g., `demo1762385694564.sui.ts`)
- Includes a complete Move module template with:
  - Module decorator configuration
  - Struct definitions (User, Admin, Counter)
  - Write methods for creating objects
  - Exec methods for modifying objects
- No network connection required
- Instant file generation

**Example Output:**
```
Creating demo file: demo1762385694564.sui.ts

✓ Success! Demo file created.

File created at:
  /Users/yourname/project/demo1762385694564.sui.ts

Next steps:
  1. Open demo1762385694564.sui.ts in your editor
  2. Modify the module as needed
  3. Run: demo-app --compile demo1762385694564.sui.ts
```

### 4. Compile Command
Compiles `.sui.ts` files into Move code with syntax highlighting and proper formatting.

```bash
yarn build && node bin/cli.js --compile <file-path>
yarn build && node bin/cli.js -c <file-path>
```

**Parameters:**
- `<file-path>`: Path to a `.sui.ts` file (required)

**Example:**
```bash
# Compile a specific file
yarn build && node bin/cli.js --compile ./demo.sui.ts

# Compile a generated demo file
yarn build && node bin/cli.js --compile demo1762385694564.sui.ts
```

**Features:**
- Validates file path and ensures `.sui.ts` extension
- Parses TypeScript decorators and class structures
- Generates formatted Move code with:
  - Proper indentation
  - Syntax highlighting (keywords, types, operators)
  - Module structure
  - Struct definitions
  - Public functions
- Colorized output with clear visual separators

**Example Output:**
```
============================================================
Generated Move Code:
============================================================

module hello_world::greeting {
  use std::string::{Self, String};

  public struct User has key, store {
    id: UID,
    name: string::String,
    status: bool,
    age: u8
  }

  public fun create_user(name: String, status: bool, age: u8, ctx: &mut TxContext) {
    let user = User {id: object::new(ctx), name, status, age};
    transfer::share_object(user);
  }
}

============================================================
```

## Quick Start Guide

1. **Create a new demo file:**
   ```bash
   yarn build && node bin/cli.js --create
   ```

2. **Edit the generated file** (optional):
   Open `demo[timestamp].sui.ts` and modify as needed

3. **Compile to Move code:**
   ```bash
   yarn build && node bin/cli.js --compile demo[timestamp].sui.ts
   ```

## Development Scripts

```bash
# Build the TypeScript project
yarn build

# Run any command
yarn build && node bin/cli.js [command] [options]
```

## Writing `.sui.ts` Files

### Basic Structure

```typescript
import { Module, Write } from "./decorators";
import { Mut, sui } from "./types";
import { exec } from "./utils";

@Module('module_name')
class ClassName {
    // Define structs as class properties
    StructName = {
        field1: sui.STRING,
        field2: sui.bool,
        field3: sui.SMALL
    }

    // Write methods create new objects
    @Write('StructName')
    create_struct(){}

    // Exec methods modify existing objects
    modifyStruct(item: Mut<'StructName'>){
        exec`item.field3 = item.field3 + 1;`
    }
}

export default ClassName
```

### Supported Types

- `sui.STRING` → `string::String`
- `sui.bool` → `bool`
- `sui.SMALL` → `u8`
- `sui.large` → `u32`
- `sui.UID` → `UID`

### Example Usage

```
import { Module, Write } from "./src/decorators";
import { Mut, sui } from "./src/types";
import { exec } from "./src/utils";

@Module('hello_world')
class Greeting {

    User = {
        name: sui.STRING,
        status: sui.bool,
        age: sui.SMALL
    }

    Admin = {
        status: sui.bool
    }

    Counter = {
        value: sui.large
    }

    @Write('User')
    create_user(){}

    @Write('Admin')
    create_admin(){}

    incrementCounter(counterItem: Mut<'Counter'>){
        exec`counterItem.value = counterItem.value + 1;`
    }

    multiplyCounter(counterItem: Mut<'Counter'>){
        exec`counterItem.value = counterItem.value * 2;`
    }

    multiply2Counter(counterItem: Mut<'Counter'>){
        exec`counterItem.value = counterItem.value * 4;`
    }
}

export default Greeting
```

### Understanding the Concepts

#### Decorators

Decorators are special annotations that provide metadata about your code and control how it's transpiled to Move.

##### `@Module(name: string)`
- **Purpose:** Defines the Move module name
- **Usage:** Applied to the class declaration
- **Example:** `@Module('hello_world')` generates `module hello_world::greeting`
- **Note:** The class name is automatically converted to lowercase for the package name

##### `@Write(structName: string)`
- **Purpose:** Marks a method as a constructor function that creates and shares a new object
- **Usage:** Applied to methods that should create new on-chain objects
- **Example:** `@Write('User')` generates a function that:
  - Creates a new User struct instance
  - Initializes it with provided parameters
  - Shares it on-chain using `transfer::share_object`
- **Generated Move code includes:**
  - Automatic `ctx: &mut TxContext` parameter
  - `object::new(ctx)` for unique ID generation
  - `transfer::share_object()` call

#### The `exec` Template Literal

The `exec` template literal is used to write Move logic directly within TypeScript methods.

```typescript
exec`counterItem.value = counterItem.value + 1;`
```

- **Purpose:** Embeds Move code directly in your TypeScript
- **Usage:** For methods that modify existing objects
- **Features:**
  - Preserves Move syntax within the template literal
  - Supports all Move operations and expressions
  - Automatically handles parameter type conversion

#### Type System

##### `Mut<T>`
- **Purpose:** Indicates a mutable reference to a struct
- **Usage:** Used in method parameters for objects that will be modified
- **Example:** `Mut<'Counter'>` transpiles to `&mut Counter` in Move
- **Important:** The generic parameter must match an existing struct name

##### `sui` Type Mappings
The `sui` object provides TypeScript representations of Move primitive types:

| TypeScript | Move Type | Description |
|------------|-----------|-------------|
| `sui.STRING` | `string::String` | UTF-8 string type |
| `sui.bool` | `bool` | Boolean value |
| `sui.SMALL` | `u8` | 8-bit unsigned integer (0-255) |
| `sui.large` | `u32` | 32-bit unsigned integer |
| `sui.UID` | `UID` | Unique identifier for objects |

#### Class Structure

##### Properties (Structs)
Class properties define Move structs:

```typescript
User = {
    name: sui.STRING,
    status: sui.bool,
    age: sui.SMALL
}
```

Generates:
```move
public struct User has key, store {
    id: UID,
    name: string::String,
    status: bool,
    age: u8
}
```

**Key points:**
- Each struct automatically gets an `id: UID` field
- All structs have `key, store` abilities by default
- Property names and types are preserved

##### Methods

Methods are transpiled based on their decorators:

1. **Write Methods** (with `@Write` decorator):
   - Create new objects
   - Automatically add transaction context parameter
   - Share objects on-chain

2. **Regular Methods** (no decorator):
   - Modify existing objects
   - Accept mutable references
   - Contain business logic via `exec` template literals

#### Transpilation Process

1. **Parse:** TypeScript AST is analyzed to extract:
   - Class decorators for module info
   - Properties for struct definitions
   - Methods and their decorators

2. **Transform:**
   - Structs are converted to Move struct definitions
   - Write methods become constructor functions
   - Regular methods become public functions with Move logic

3. **Generate:**
   - Formatted Move code with proper indentation
   - Syntax highlighting in terminal output
   - Complete module structure

#### Best Practices

1. **Naming Conventions:**
   - Use PascalCase for struct names (e.g., `User`, `Counter`)
   - Use snake_case for method names (e.g., `create_user`, `increment_counter`)
   - Module names should be lowercase with underscores

2. **Method Design:**
   - Keep Write methods simple (just creation logic)
   - Use regular methods for complex business logic
   - Group related functionality in the same class

3. **Type Safety:**
   - Always use the `sui` type mappings for consistency
   - Use `Mut<T>` for parameters that will be modified
   - Ensure struct names in `Mut<T>` match defined properties

4. **Code Organization:**
   - One module per `.sui.ts` file
   - Export the class as default
   - Keep imports at the top of the file