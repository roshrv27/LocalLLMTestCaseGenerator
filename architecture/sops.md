# System SOPs

## 1. Test Case Generation Flow
1. **User Input**: Received via Flask `/generate` endpoint.
2. **Context Construction**: `prompt_engine.py` constructs a prompt using the user input and the selected template.
3. **LLM Inference**: `ollama_client.py` sends the prompt to `llama3.2`.
4. **Parsing**: The response is expected to be a Markdown string. No JSON parsing needed for the content itself, but we wrap it in a JSON response for the frontend.
5. **Response**: JSON object `{ "test_cases_markdown": "...", "status": "success" }` sent to frontend.

## 2. Error Handling
- **Ollama Offline**: If `ollama_client.py` fails to connect, return 503 Service Unavailable.
- **Empty Input**: Return 400 Bad Request.
- **Model Error**: Return 500 Internal Server Error with error details.

## 3. Frontend Protocol
- **State**: The frontend maintains the chat history visually.
- **Submission**: AJAX POST to `/generate`.
- **Loading State**: Disable input and show a "Typing..." indicator while waiting.
