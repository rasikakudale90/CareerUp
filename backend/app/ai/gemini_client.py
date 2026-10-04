import os
import time
from typing import Dict, Any, Optional
from backend.app.core.config import settings
from backend.app.ai.normalizer import clean_and_parse_json

class GeminiAIClient:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY or os.getenv("GEMINI_API_KEY", "")
        self.model = settings.GEMINI_MODEL
        self._client = None

        if self.api_key:
            try:
                from google import genai
                self._client = genai.Client(api_key=self.api_key)
            except Exception as e:
                print(f"[WARN] Failed to initialize Google GenAI Client: {e}")

    def generate_json(self, prompt: str, fallback_data: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Sends prompt to Google Gemini API with retry logic.
        Falls back to structured fallback_data if no API key or upon network failure.
        """
        if not self._client or not self.api_key:
            return fallback_data or {}

        max_retries = 3
        for attempt in range(max_retries):
            try:
                response = self._client.models.generate_content(
                    model=self.model,
                    contents=prompt
                )
                if response and response.text:
                    parsed = clean_and_parse_json(response.text)
                    if parsed:
                        return parsed
            except Exception as e:
                print(f"[WARN] Gemini API call attempt {attempt+1} failed: {e}")
                time.sleep(1.0 * (attempt + 1))

        return fallback_data or {}

gemini_client = GeminiAIClient()
