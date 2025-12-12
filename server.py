from __future__ import annotations
import os
import traceback
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

from bdd_core import (
    generate_requirements,
    generate_testcases,
    generate_uml_plantuml,
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FEATURES_DIR = os.path.join(BASE_DIR, "features")

app = Flask(__name__, static_folder=BASE_DIR)
CORS(app)


# -------------------------
# FRONTEND
# -------------------------
@app.get("/")
def index():
    return send_from_directory(BASE_DIR, "index.html")


@app.get("/<path:path>")
def static_files(path: str):
    return send_from_directory(BASE_DIR, path)


# -------------------------
# FEATURE LIST API
# -------------------------
@app.get("/api/features")
def list_features():
    if not os.path.isdir(FEATURES_DIR):
        return jsonify({"success": False, "error": "features klasörü bulunamadı"}), 500

    features = []

    for root, _, files in os.walk(FEATURES_DIR):
        for file in files:
            if file.endswith(".feature"):
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, BASE_DIR)

                features.append({
                    "path": rel_path.replace("\\", "/"),
                    "name": file
                })

    return jsonify({
        "success": True,
        "features": sorted(features, key=lambda x: x["path"])
    })


# -------------------------
# FEATURE CONTENT API
# -------------------------
@app.get("/api/feature")
def read_feature():
    path = request.args.get("path")
    if not path:
        return jsonify({"success": False, "error": "path parametresi gerekli"}), 400

    full_path = os.path.join(BASE_DIR, path)

    if not os.path.isfile(full_path):
        return jsonify({"success": False, "error": "Feature dosyası bulunamadı"}), 404

    try:
        with open(full_path, "r", encoding="utf-8") as f:
            content = f.read()
        return jsonify({"success": True, "content": content})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# -------------------------
# AI GENERATE API
# -------------------------
@app.post("/api/generate")
def generate():
    data = request.get_json(silent=True) or {}

    bdd_text = (data.get("text") or "").strip()
    action_type = (data.get("type") or "requirement").lower()
    diagram_type = data.get("diagram_type", "Use Case Diagram")

    if not bdd_text:
        return jsonify({"success": False, "error": "text boş olamaz"}), 400

    try:
        if action_type == "requirement":
            result = generate_requirements(bdd_text)
        elif action_type == "testcase":
            result = generate_testcases(bdd_text)
        elif action_type == "uml":
            result = generate_uml_plantuml(bdd_text, diagram_type)
        else:
            return jsonify({"success": False, "error": f"Geçersiz type: {action_type}"}), 400

        return jsonify({"success": True, "result": str(result)})

    except Exception:
        print("\n===== SERVER ERROR =====")
        traceback.print_exc()
        print("========================\n")
        return jsonify({"success": False, "error": "Server error"}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
