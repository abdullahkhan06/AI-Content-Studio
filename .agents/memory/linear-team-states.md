---
name: Linear team states for "ai agents"
description: The "ai agents" Linear team has no "Needs Review" state. Valid states and IDs listed here.
---

# Linear "ai agents" Team — Issue States

| Name | Type | ID |
|------|------|----|
| Backlog | backlog | f3ee509d-8a6b-4b2c-b9d0-2a4646a0efd8 |
| Todo | unstarted | 8db2664a-86b2-4b84-82a1-bd80b0679257 |
| In Progress | started | c0255637-c5a8-4f51-9465-7c43e3213492 |
| Done | completed | 995be5a1-36f0-4f27-8d57-954611871d27 |
| Canceled | canceled | 3a4f6e65-4eae-49df-a142-d6a894b0eb0c |
| Duplicate | duplicate | 08d102ea-2f13-494c-ae82-d4511b02fc25 |

**Why:** replit.md references "Needs Review" as a status, but the actual Linear team does not have it. Use "Done" when a slice is complete.

**How to apply:** Use `mcpLinear_saveIssue({ id: "AIA-X", state: "Done" })` — state name, not stateId.
