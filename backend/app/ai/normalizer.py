import json
import re
from typing import Any, Dict

def clean_and_parse_json(raw_text: str) -> Dict[str, Any]:
    """
    Extracts, cleans, and parses JSON content from raw LLM responses,
    stripping markdown backticks and formatting wrappers.
    """
    text = raw_text.strip()
    
    # Check for markdown code fence ```json ... ```
    match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", text, re.IGNORECASE)
    if match:
        text = match.group(1).strip()

    try:
        return json.loads(text)
    except Exception:
        # Secondary fallback: find first '{' and last '}'
        start = text.find("{")
        end = text.rfind("}")
        if start != -1 and end != -1 and end > start:
            try:
                return json.loads(text[start:end+1])
            except Exception:
                pass
        
        # Return empty dictionary if parsing fails
        return {}
