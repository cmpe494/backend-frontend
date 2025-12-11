# ============================================================================
# BDD to Requirements Generator - Unified System
# Terminal (Behave) + Web (Flask) Support
# ============================================================================

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from behave import given, when, then
from google import genai
import os
import time
import re

# ============================================================================
# CORE: LLM CLIENT
# ============================================================================

def get_llm_client():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("ERROR: GEMINI_API_KEY not found! Set: $env:GEMINI_API_KEY='YOUR_KEY'")
    return genai.Client(api_key=api_key)

# ============================================================================
# BEHAVE STEPS - Terminal Usage
# ============================================================================

@given('The BDD text to be analyzed is:')
def step_read_bdd(context):
    context.input_text = context.text
    print(f"\n[INPUT] BDD text size: {len(context.input_text)} characters")

@when('AI analyzes the BDD scenario and generates system requirements')
def step_generate_requirements(context):
    client = get_llm_client()
    
    prompt = f"""You are a Senior Technical Analyst. Your task is to convert the provided BDD Feature/Scenario text into a formal Systems Requirements Document.

INPUT TEXT (Gherkin/BDD):
{context.input_text}

TASK: Extract Functional Requirements (FR) and Non-Functional Requirements (NFR) strictly from the Given/When/Then logic.

OUTPUT FORMAT (Markdown):
# System Requirements Specification

## 1. Functional Requirements (FR)
- **[FR-001]** The system shall...
- **[FR-002]** ...

## 2. Non-Functional Requirements (NFR)
- **[NFR-001]** ...

RULES:
- Use technical "System shall" language
- Convert steps into atomic requirements
- Generalize Scenario Outline rules
- Output must be in English"""

    try:
        print("AI is generating system requirements...")
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        context.output_text = response.text
        print("\n[AI] Requirement extraction completed!")
        time.sleep(1)
    except Exception as e:
        assert False, f"LLM Error: {e}"

@when('AI extracts detailed test cases from the BDD scenario')
def step_generate_testcases(context):
    client = get_llm_client()
    
    prompt = f"""You are a Senior QA Test Engineer. Your task is to generate comprehensive test cases from the provided BDD Feature/Scenario.

INPUT TEXT:
{context.input_text}

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

### TC-002: ..."""

    try:
        print("AI is generating test cases...")
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        context.output_text = response.text
        print("\n[AI] Test case generation completed!")
        time.sleep(1)
    except Exception as e:
        assert False, f"LLM Error: {e}"

@when('AI generates a "{diagram_type}" from the BDD scenario')
def step_generate_uml(context, diagram_type):
    client = get_llm_client()
    
    diagram_prompts = {
        "Use Case Diagram": "Generate a Use Case Diagram in PlantUML format representing actors and their interactions",
        "Sequence Diagram": "Generate a Sequence Diagram in PlantUML format showing component interaction flow",
        "Class Diagram": "Generate a Class Diagram in PlantUML format showing class structure and relations",
        "Activity Diagram": "Generate an Activity Diagram in PlantUML format showing workflow decisions",
        "State Diagram": "Generate a State Diagram in PlantUML format showing state transitions",
    }
    
    instruction = diagram_prompts.get(diagram_type, diagram_prompts["Use Case Diagram"])
    
    prompt = f"""You are a Senior Software Architect. Your task is to {instruction} based on the provided BDD scenario.

INPUT:
{context.input_text}

RULES:
- Output ONLY PlantUML format
- Must be wrapped inside ```plantuml code fences

Example:
```plantuml
@startuml
Alice -> Bob: Hello
@enduml
```"""

    try:
        print(f"AI is generating UML ({diagram_type})...")
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        context.output_text = response.text
        print("\n[AI] UML diagram generation completed!")
        time.sleep(1)
    except Exception as e:
        assert False, f"LLM Error: {e}"

@then('The output should be saved as "{filename}"')
def step_save_output_to_file(context, filename):
    assert hasattr(context, "output_text"), "ERROR: AI produced no output."
    
    out_dir = "outputs"
    os.makedirs(out_dir, exist_ok=True)
    path = os.path.join(out_dir, filename)
    
    with open(path, "w", encoding="utf-8") as f:
        f.write(context.output_text)
    
    print(f"\nOutput saved to: {path}")

@then('The file should contain at least "{min_count}" Test Cases (TC)')
def step_check_min_testcases(context, min_count):
    assert hasattr(context, "output_text"), "No output_text available."
    
    min_count = int(min_count)
    tc_ids = re.findall(r'\bTC-\d+\b', context.output_text or "")
    print(f"Detected {len(tc_ids)} test cases: {tc_ids}")
    
    assert len(tc_ids) >= min_count, \
        f"Expected >= {min_count} test cases but found {len(tc_ids)}."

@then('The file should contain at least "{min_count}" Functional Requirement (FR)')
def step_check_min_requirements(context, min_count):
    assert hasattr(context, "output_text"), "No output_text available."
    
    min_count = int(min_count)
    fr_ids = re.findall(r'\[FR-\d+\]', context.output_text or "")
    print(f"Detected {len(fr_ids)} Functional Requirements: {fr_ids}")
    
    assert len(fr_ids) >= min_count, \
        f"Expected >= {min_count} FRs but found {len(fr_ids)}."

@then('The file should contain valid PlantUML code')
def step_check_plantuml(context):
    assert hasattr(context, "output_text"), "No output_text available."
    
    text = context.output_text.replace("```plantuml", "").replace("```", "").strip()
    has_start = "@startuml" in text
    has_end = "@enduml" in text
    print(f"UML Check: start={has_start}, end={has_end}")
    
    assert has_start and has_end, "Invalid PlantUML format: Missing @startuml or @enduml."

# ============================================================================
# FLASK API - Web Interface
# ============================================================================

app = Flask(__name__, static_folder='.')
CORS(app)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

@app.route('/api/generate', methods=['POST'])
def generate():
    data = request.json
    bdd_text = data.get('text', '')
    action_type = data.get('type', 'requirement')
    
    prompts = {
        'requirement': f"""You are a Senior Technical Analyst. Convert this BDD scenario to System Requirements.

INPUT: {bdd_text}

OUTPUT FORMAT:
# System Requirements Specification
## 1. Functional Requirements (FR)
- **[FR-001]** The system shall...

## 2. Non-Functional Requirements (NFR)
- **[NFR-001]** ...

RULES: Use "System shall" language, atomic requirements, Turkish output.""",
        
        'testcase': f"""You are a Senior Test Engineer. Generate detailed test cases from this BDD scenario.

INPUT: {bdd_text}

OUTPUT FORMAT:
# Test Cases
## Pozitif Test Senaryoları
| Test ID | Test Adı | Ön Koşullar | Test Adımları | Beklenen Sonuç |
|---------|----------|-------------|---------------|----------------|
| TC-001  | ...      | ...         | ...           | ...            |

## Negatif Test Senaryoları
| Test ID | Test Adı | Ön Koşullar | Test Adımları | Beklenen Sonuç |
|---------|----------|-------------|---------------|----------------|

RULES: Be detailed, cover edge cases, Turkish output.""",
        
        'uml': f"""You are a UML Expert. Generate a {data.get('diagram_type', 'Use Case')} Diagram using Mermaid.js.

INPUT: {bdd_text}

OUTPUT: Only Mermaid.js code, no markdown blocks, Turkish labels OK."""
    }
    
    try:
        client = get_llm_client()
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompts.get(action_type, prompts['requirement'])
        )
        time.sleep(1)
        return jsonify({'success': True, 'result': response.text})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    print("\n BDD to Requirements Generator")
    print(" Terminal: python -m behave features/your_file.feature")
    print(" Web: http://localhost:5000")

    if not os.getenv("GEMINI_API_KEY"):
        print(" ⚠️ GEMINI_API_KEY environment variable NOT set!\n")
    else:
        print(" ✅ GEMINI_API_KEY detected.\n")

    app.run(debug=True, port=5000)

