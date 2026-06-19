---
name: drizzle-zod v4 compatibility
description: drizzle-zod v0.8.x uses Zod v4 internally — createSelectSchema return types conflict with Zod v3 ZodType constraint. Use $inferInsert/$inferSelect instead.
---

# drizzle-zod v0.8.x — Zod v4 Compatibility

**The rule:** Do NOT use `createSelectSchema` from drizzle-zod v0.8.x. Use `$inferInsert` / `$inferSelect` from the table definition for TypeScript types.

**Why:** drizzle-zod v0.8.x generates Zod v4 schemas internally. When you import `z` from `"zod"` (v3 compat) and pass a `ZodString` as a column override, TypeScript errors with "ZodString is missing _type, _parse, _getType…" — the Zod v4 ZodType constraint does not match Zod v3's ZodType.

**How to apply:**
- `createInsertSchema(table)` is safe — call it without column overrides that use `z.string().email()` etc.
- For types: use `typeof table.$inferSelect` and `typeof table.$inferInsert` directly, no `z.infer<>` needed.
- `createSelectSchema` produces unusable types — skip it entirely.
- If you need email validation in an insert schema, do it at the API layer with a separate Zod schema, not in drizzle-zod.
