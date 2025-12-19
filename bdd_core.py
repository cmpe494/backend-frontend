from __future__ import annotations
import os
import time #sıra bekletir
import random
from google import genai
from google.genai import errors #overload hatasını yakalamak
MODEL = "gemini-2.5-flash"


def get_llm_client() -> genai.Client:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY does not exist. PowerShell: $env:GEMINI_API_KEY='YOUR_KEY'")
    return genai.Client(api_key=api_key)


def _call_llm(prompt: str) -> str:
    """
    - LLM çağrısını tek yerde yönetir
    - 503 (overloaded) durumunda otomatik retry yapar
    - .text boş/None gelirse asla None döndürmez
    - her zaman temiz (strip) string döndürür
    """
    client = get_llm_client()

    max_attempts = 5
    base_delay = 1.0  # seconds

    for attempt in range(1, max_attempts + 1): #deneme mantığı
        try:
            resp = client.models.generate_content(model=MODEL, contents=prompt)

            text = getattr(resp, "text", None)
            if text is None:
                return "❌ LLM returned None (resp.text is None)."

            text = str(text).strip()
            if not text:
                return "❌ LLM returned empty response (resp.text is empty)."

            return text

        except errors.ServerError as e:
            msg = str(e)
            # 503 overloaded → retry(tekrar dene)
            if "503" in msg or "overloaded" in msg.lower():
                if attempt == max_attempts:
                    return "❌ Gemini API is overloaded (503). Please try again later."
                sleep_s = base_delay * (2 ** (attempt - 1)) + random.uniform(0, 0.5)
                time.sleep(sleep_s)
                continue
            raise

def generate_requirements(bdd_text: str) -> str:
    prompt = f"""You are a Senior Technical Analyst. Your task is to convert the provided BDD Feature/Scenario text into a formal Systems Requirements Document.

INPUT TEXT (Gherkin/BDD):
{bdd_text}

TASK: Extract Functional Requirements (FR) and Non-Functional Requirements (NFR) strictly from the Given/When/Then logic.

OUTPUT FORMAT (Markdown):
# System Requirements Specification

## 1. Functional Requirements (FR)
- **[FR-001]** The system shall...
- **[FR-002]** ...

## 2. Non-Functional Requirements (NFR)
- **[NFR-001]** ...

RULES:
- Use technical "The system shall" language
- Convert steps into atomic requirements
- Generalize Scenario Outline rules
- Output must be in English
"""
    return _call_llm(prompt)


def generate_testcases(bdd_text: str) -> str:
    prompt = f"""You are a Senior QA Test Engineer. Your task is to generate comprehensive test cases from the provided BDD Feature/Scenario.

INPUT TEXT:
{bdd_text}

RULES:
- Include positive and negative test cases
- Include steps, expected results, preconditions
- Include boundary and error conditions
- Output must be in English

OUTPUT FORMAT:
### TC-001: [Test Name]
Preconditions:
Steps:
Expected Result:

### TC-002: ...
"""
    return _call_llm(prompt)


def generate_uml_plantuml(bdd_text: str, diagram_type: str) -> str:
    diagram_prompts = {
        "Use Case Diagram": "Generate a Use Case Diagram in PlantUML format representing actors and their interactions",
        "Sequence Diagram": "Generate a Sequence Diagram in PlantUML format showing component interaction flow",
        "Class Diagram": "Generate a Class Diagram in PlantUML format showing class structure and relations",
        "Activity Diagram": "Generate an Activity Diagram in PlantUML format showing workflow decisions",
        "State Diagram": "Generate a State Diagram in PlantUML format showing state transitions",
    }

    instruction = diagram_prompts.get(diagram_type, diagram_prompts["Sequence Diagram"])

    prompt = f"""You are a Senior Software Architect. Your task is to {instruction} based on the provided BDD scenario.

INPUT:
{bdd_text}

RULES:
- Output ONLY PlantUML format
- Must include @startuml and @enduml
- Must be wrapped inside ```plantuml code fences

Example:
```plantuml
@startuml
Alice -> Bob: Hello
@enduml
```"""

    text = _call_llm(prompt)

    # LLM hata mesajı döndürdüyse, diagram gibi paketlemeyelim
    if text.startswith("❌"):
        return text

    t = text.strip()

    # Garanti: @startuml / @enduml
    if "@startuml" not in t:
        t = "@startuml\n" + t
    if "@enduml" not in t:
        t = t + "\n@enduml"

    # Garanti: ```plantuml fence
    if "```" not in t:
        t = f"```plantuml\n{t}\n```"

    return t
