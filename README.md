# SuiJS

TypeScript to Sui Move transpiler.

## What is SuiJS?

SuiJS is a transpiler that enables writing Sui blockchain smart contracts using TypeScript syntax. It provides a decorator-based DSL (Domain Specific Language), allowing web developers to build applications in the Sui ecosystem without learning Move.

```typescript
@Module('hello_world')
class MyContract {
    @Has(['key', 'store'])
    User = {
        name: sui.string,
        age: sui.u8
    }

    @Write('User')
    @Assert([{must: 'age > 18', code: Assertion.ERR_UNDERAGE}])
    create_user(){}
}
```

The TypeScript code above transpiles to:

```move
module hello_world::mycontract {
    const ERR_UNDERAGE: u64 = 1;

    public struct User has key, store {
        id: UID,
        name: string::String,
        age: u8
    }

    public fun create_user(name: string::String, age: u8, ctx: &mut TxContext) {
        assert!(age > 18, ERR_UNDERAGE);
        let user = User {id: object::new(ctx), name, age};
        transfer::share_object(user);
    }
}
```

## Purpose

### 1. Learn Move Fundamentals
- Write in TypeScript, examine the generated Move code to learn the syntax
- See how decorators translate to Move constructs
- Understand abilities (`key`, `store`), object model, and ownership concepts

### 2. Rapid Prototyping
- Test your ideas in minutes
- Create proof-of-concepts without deep Move expertise
- Ship MVPs quickly at hackathons

### 3. Bridge for Web Developers
- Onboard JavaScript/TypeScript developers to the Sui ecosystem
- Start blockchain development with familiar syntax
- Gradual learning path - transition to native Move over time

## Features

| Decorator | Description |
|-----------|-------------|
| `@Module` | Defines the Move module name |
| `@Has` | Struct abilities (`key`, `store`, `drop`, `copy`) |
| `@Write` | Constructor functions that create and share objects |
| `@Assert` | On-chain validation rules |
| `@Balance` | SUI token management (deposit, withdraw) |
| `@Vector` | Collection management |
| `@Mint` | NFT creation |

### Type System

```typescript
sui.string  // → string::String
sui.bool    // → bool
sui.u8      // → u8
sui.u32     // → u32
sui.u64     // → u64
```

### Assertion Helpers

```typescript
Assertion.min('field', 5)      // string length >= 5
Assertion.max('field', 100)    // string length <= 100
Assertion.onlyFor(ADDRESS)     // owner-only access
Assertion.minDeposit(5)        // min 5 SUI deposit
Assertion.maxDeposit(20)       // max 20 SUI deposit
```

## Example: Balance Management

```typescript
@Module('treasury')
class Treasury {
    @Balance()
    @Assert([
        {must: Assertion.minDeposit(5), code: Assertion.ERR_MIN_AMOUNT},
        {must: Assertion.maxDeposit(20), code: Assertion.ERR_MAX_AMOUNT}
    ])
    Budget: BalanceFor = ['deposit', 'withdraw', 'get_balance']
}
```

Generated Move functions:
- `init_BudgetBalance()` - Create balance
- `deposit_BudgetBalance()` - Deposit SUI (min 5, max 20)
- `withdraw_BudgetBalance()` - Withdraw SUI (owner only)
- `get_balance()` - Query balance

## Example: Assertions

```typescript
@Write('User')
@Assert([
    {must: 'age > 18', code: Assertion.ERR_UNDERAGE},
    {must: Assertion.min('name', 3), code: Assertion.ERR_NAME_TOO_SHORT},
    {must: Assertion.onlyFor(ADMIN_ADDRESS), code: Assertion.ERR_NOT_ADMIN}
])
create_user(){}
```

## When to Use

| Scenario | SuiJS | Native Move |
|----------|-------|-------------|
| Learning | ✅ | |
| Hackathon | ✅ | |
| Prototyping | ✅ | |
| Simple dApp | ✅ | |
| DeFi protocol | | ✅ |
| Gas optimization | | ✅ |
| Complex logic | | ✅ |

## Project Structure

```
demo-app/
├── src/
│   ├── lib/           # CLI commands
│   ├── utils/         # Transpiler logic
│   ├── decorators/    # @Module, @Write, @Assert...
│   └── types/         # sui.*, Mut<T>, BalanceFor
├── bin/cli.js         # CLI entry point
└── *.sui.ts           # Example contracts
```

## Contributing

1. Fork the repo
2. Create a feature branch
3. Open a PR

## License

MIT
