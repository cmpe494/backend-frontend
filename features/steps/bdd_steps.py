import os
import re
import traceback
from behave import given, when, then

from bdd_core import (
    generate_requirements,
    generate_testcases,
    generate_uml_plantuml,
)
OUTPUT_DIR = "outputs"
def _run_ai_step(context, fn, *args, label="AI"):
    """
    - AI çağrısını tek yerde yönetir
    - Hata olursa full traceback basar
    - output_text asla None kalmaz (en azından hata metni string olur)
    """
    try:
        result = fn(*args)

        # result None ise bile stringe çevirip koruyalım
        if result is None:
            result = f"❌ {label}: LLM returned None (empty response)."

        context.output_text = str(result)

        print(f"DEBUG({label}): type={type(context.output_text)}, len={len(context.output_text)}")
    except Exception:
        print(f"\n===== {label} ERROR (FULL TRACE) =====")
        traceback.print_exc()
        print("===== END TRACE =====\n")

        # Dosyaya yazılabilsin diye traceback metnini output_text'e koyuyoruz
        context.output_text = "❌ " + label + " ERROR\n\n" + traceback.format_exc()

        # Sen istiyorsan senaryoyu FAIL ettirsin:
        raise
@given("The BDD text to be analyzed is:")
def step_read_bdd(context):
    context.input_text = (context.text or "").strip()
@when("AI analyzes the BDD scenario and generates system requirements")
def step_generate_requirements(context):
    _run_ai_step(
        context,
        generate_requirements,
        context.input_text,
        label="REQUIREMENTS",
    )
@when("AI extracts detailed test cases from the BDD scenario")
def step_generate_testcases(context):
    _run_ai_step(
        context,
        generate_testcases,
        context.input_text,
        label="TESTCASES",
    )
@when('AI generates a "{diagram_type}" from the BDD scenario')
def step_generate_uml(context, diagram_type):
    _run_ai_step(
        context,
        generate_uml_plantuml,
        context.input_text,
        diagram_type,
        label=f"UML-{diagram_type}",
    )
@then('The output should be saved as "{filename}"')
def step_save_output(context, filename):
    # Artık output_text her zaman string olacak.
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    path = os.path.join(OUTPUT_DIR, filename)

    with open(path, "w", encoding="utf-8") as f:
        f.write(context.output_text)

    print(f"Saved: {path}")

@then('The file should contain at least "{min_count}" Test Cases (TC)')
def step_check_min_testcases(context, min_count):
    min_count = int(min_count)
    tc_ids = re.findall(r"\bTC-\d+\b", context.output_text or "")
    assert len(tc_ids) >= min_count, f"Expected >= {min_count} test cases but found {len(tc_ids)}."

@then('The file should contain at least "{min_count}" Functional Requirement (FR)')
def step_check_min_requirements(context, min_count):
    min_count = int(min_count)
    fr_ids = re.findall(r"\[FR-\d+\]", context.output_text or "")
    assert len(fr_ids) >= min_count, f"Expected >= {min_count} FRs but found {len(fr_ids)}."

@then("The file should contain valid PlantUML code")
def step_check_plantuml(context):
    text = (context.output_text or "").strip()
    # code fence varsa temizle
    text = text.replace("```plantuml", "").replace("```", "").strip()
    assert "@startuml" in text, "Invalid PlantUML: Missing @startuml"
    assert "@enduml" in text, "Invalid PlantUML: Missing @enduml"
