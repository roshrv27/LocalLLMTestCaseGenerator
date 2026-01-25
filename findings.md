# Findings

## Research

### Ollama Integration
- **API Endpoint**: Ollama runs locally on `http://127.0.0.1:11434`
- **Python Library**: `ollama` package provides simple `ollama.chat()` interface
- **Model Used**: `llama3.2` (3.2B parameters, Q4_K_M quantization, ~2GB)
- **Response Format**: Returns `response['message']['content']` as string

### Flask Setup
- **Template Engine**: Jinja2 with `{{ url_for() }}` for static assets
- **Static Files**: Served from `/static/` directory
- **CORS**: Not needed for same-origin requests

### Markdown Rendering
- **Library**: `marked.js` (CDN) for client-side Markdown parsing
- **Usage**: `marked.parse(text)` converts Markdown to HTML

## Discoveries

### Project Requirements
- **North Star**: Local LLM Testcase generator with Ollama (llama3.2)
- **Integrations**: Ollama
- **Delivery**: UI Chat Interface
- **Source of Truth**: User Input
- **Rules**: User Input → Local LLM → Output

### Technical Constraints
- **Port 5000 Conflict**: macOS uses port 5000 for AirPlay/ControlCenter; switched to 8080
- **Git xcrun Error**: Xcode Command Line Tools were missing; fixed with `xcode-select --install`
- **GitHub Auth**: Password auth deprecated; must use Personal Access Token (PAT)

### Best Practices Learned
- Use `host='0.0.0.0'` in Flask for broader network access
- Use `git credential-osxkeychain` on macOS for secure credential storage
- Create `.gitignore` before first commit to avoid pushing sensitive files

## External Resources
- [Ollama Python Library](https://github.com/ollama/ollama-python)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Marked.js](https://marked.js.org/)
