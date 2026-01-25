import ollama
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MODEL_NAME = "llama3.2"

def generate_response(prompt: str) -> str:
    """
    Generates a response from the local Ollama instance.
    
    Args:
        prompt (str): The input prompt for the model.
        
    Returns:
        str: The generated response text.
        
    Raises:
        Exception: If connection fails or model errors.
    """
    try:
        logger.info(f"Sending prompt to Ollama ({MODEL_NAME})...")
        response = ollama.chat(model=MODEL_NAME, messages=[
            {
                'role': 'user',
                'content': prompt,
            },
        ])
        content = response['message']['content']
        logger.info("Received response from Ollama.")
        return content
    except Exception as e:
        logger.error(f"Error communicating with Ollama: {e}")
        raise e

if __name__ == "__main__":
    # Handshake / Self-Test
    try:
        print("Testing Ollama Connection...")
        res = generate_response("Say 'Connection Verified' if you can hear me.")
        print(f"Response: {res}")
    except Exception as e:
        print(f"FAILED: {e}")
