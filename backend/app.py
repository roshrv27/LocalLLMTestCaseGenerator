import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from tools.ollama_client import generate_response
from tools.prompt_engine import build_prompt

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "service": "Proj1_LocalLLMTestCaseGenerator API"})

@app.route('/generate', methods=['POST'])
def generate():
    try:
        data = request.json
        user_input = data.get('user_input')
        
        if not user_input:
            return jsonify({"status": "error", "error_message": "No input provided"}), 400
            
        logger.info(f"Received request: {user_input[:50]}...")
        
        # Build Prompt
        prompt = build_prompt(user_input)
        
        # Call Ollama
        response_text = generate_response(prompt)
        
        return jsonify({
            "status": "success",
            "test_cases_markdown": response_text
        })
        
    except Exception as e:
        logger.error(f"Error processing request: {e}")
        return jsonify({"status": "error", "error_message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=3000)
