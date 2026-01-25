# Project Constitution (gemini.md)

## Data Schemas
### Input (User Request)
```json
{
  "user_input": "string",  // The code or scenario to generate test cases for
  "template_type": "string" // Optional: "unit", "e2e", etc. (Default to "general")
}
```

### Output (Test Cases)
```json
{
  "test_cases_markdown": "string", // The generated test cases in Markdown
  "status": "success | error",
  "error_message": "string" // Optional
}
```

### Internal State (Chat History - stored in frontend or volatile backend memory)
```json
[
  { "role": "user", "content": "..." },
  { "role": "assistant", "content": "..." }
]
```

## Behavioral Rules
- Follow BLAST protocol.
- Follow ANT architecture.

## Architectural Invariants
1. **3-Layer Architecture**: SOPs (Arch) -> Navigation (Me) -> Tools (Python).
2. **Deterministic Logic**: No guessing.
3. **Data-First**: Define schema before tools.
