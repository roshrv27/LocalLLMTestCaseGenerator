import logging

logger = logging.getLogger(__name__)

STATUS_TEMPLATE = """
You are an expert QA Automation Engineer.
Your task is to generate comprehensive test cases based on the provided user requirements.

**Requirements:**
{user_input}

**Instructions:**
1. Analyze the requirements.
2. Create 5-7 test cases using '##' headers for names.
3. For each case:
   - **ID:** [ID] (Keep this on a single line)
   - **Steps:** [Steps]
   - **Result:** [Expected Result]
4. Format in clean Markdown.

**Output Format:**
Markdown only.
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
