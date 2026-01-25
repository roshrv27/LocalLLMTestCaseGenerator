import logging

logger = logging.getLogger(__name__)

STATUS_TEMPLATE = """
You are an expert QA Automation Engineer.
Your task is to generate comprehensive test cases based on the provided user requirements.

**Requirements:**
{user_input}

**Instructions:**
1. Analyze the requirements.
2. Create a list of test cases including:
   - Test Case ID
   - Description
   - Pre-conditions
   - Test Steps
   - Expected Result
3. Format the output in clean Markdown.
4. Cover both positive and negative scenarios.

**Output Format:**
Markdown only. No preamble or postscript.
"""

def build_prompt(user_input: str, template_type: str = "general") -> str:
    """
    Constructs the prompt for the LLM.
    
    Args:
        user_input (str): The raw user requirement.
        template_type (str): The type of test case (currently only 'general' supported).
        
    Returns:
        str: The full prompt to send to Ollama.
    """
    # In the future, we can switch on template_type
    prompt = STATUS_TEMPLATE.format(user_input=user_input)
    logger.info(f"Built prompt for input length: {len(user_input)}")
    return prompt
