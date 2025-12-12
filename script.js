// API Ayarları
const API_BASE_URL = "http://localhost:5000/api";
const mermaid = window.mermaid; // şimdilik dursun (mermaid kullanmıyorsak bile sorun değil)

// -----------------------------
// ✅ Feature/Scenario Picker State
// -----------------------------
let featureCache = []; // [{path, name}]
let currentFeatureText = ""; // seçili feature dosyasının full text'i
let scenarioCache = []; // [{ title, start, end, blockText }]

// Sayfa açılınca features listesini çek
async function loadFeatureList() {
  const featureSelect = document.getElementById("featureSelect");
  const scenarioSelect = document.getElementById("scenarioSelect");
  const loadScenarioBtn = document.getElementById("loadScenarioBtn");
  const loadFeatureBtn = document.getElementById("loadFeatureBtn");
  const info = document.getElementById("selectedInfo");

  // UI reset
  featureSelect.innerHTML = `<option value="">Yükleniyor...</option>`;
  scenarioSelect.innerHTML = `<option value="">Önce feature seç</option>`;
  scenarioSelect.disabled = true;
  loadScenarioBtn.disabled = true;
  loadFeatureBtn.disabled = true;
  info.textContent = "Seçim yapılmadı.";

  try {
    const res = await fetch(`${API_BASE_URL}/features`);
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    const data = await res.json();

    if (!data.success) throw new Error(data.error || "Unknown error");

    featureCache = data.features || [];
    if (featureCache.length === 0) {
      featureSelect.innerHTML = `<option value="">Feature bulunamadı</option>`;
      return;
    }

    // dropdown doldur
    featureSelect.innerHTML = `<option value="">Feature seç...</option>`;
    for (const f of featureCache) {
      const opt = document.createElement("option");
      opt.value = f.path;
      opt.textContent = f.name || f.path;
      featureSelect.appendChild(opt);
    }
  } catch (err) {
    featureSelect.innerHTML = `<option value="">❌ Features yüklenemedi</option>`;
    showToast(`Feature listesi alınamadı: ${err.message}`);
  }
}

async function onFeatureChange() {
  const featureSelect = document.getElementById("featureSelect");
  const scenarioSelect = document.getElementById("scenarioSelect");
  const loadScenarioBtn = document.getElementById("loadScenarioBtn");
  const loadFeatureBtn = document.getElementById("loadFeatureBtn");
  const info = document.getElementById("selectedInfo");

  const path = featureSelect.value;

  scenarioSelect.innerHTML = `<option value="">Önce feature seç</option>`;
  scenarioSelect.disabled = true;
  loadScenarioBtn.disabled = true;
  loadFeatureBtn.disabled = true;
  info.textContent = "Seçim yapılmadı.";

  if (!path) {
    currentFeatureText = "";
    scenarioCache = [];
    return;
  }

  showLoading(true);
  try {
    const res = await fetch(`${API_BASE_URL}/feature?path=${encodeURIComponent(path)}`);
    if (!res.ok) throw new Error(`API Error: ${res.status}`);

    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Unknown error");

    currentFeatureText = data.content || "";
    scenarioCache = parseScenariosFromFeature(currentFeatureText);

    // scenario dropdown doldur
    scenarioSelect.innerHTML = `<option value="">Scenario seç...</option>`;
    for (let i = 0; i < scenarioCache.length; i++) {
      const s = scenarioCache[i];
      const opt = document.createElement("option");
      opt.value = String(i);
      opt.textContent = s.title;
      scenarioSelect.appendChild(opt);
    }

    scenarioSelect.disabled = scenarioCache.length === 0;
    loadFeatureBtn.disabled = false;

    info.textContent = `Feature seçildi: ${path} — ${scenarioCache.length} scenario bulundu.`;
    showToast("Feature yüklendi!");
  } catch (err) {
    currentFeatureText = "";
    scenarioCache = [];
    showToast(`Feature okunamadı: ${err.message}`);
  } finally {
    showLoading(false);
  }
}

function onScenarioChange() {
  const scenarioSelect = document.getElementById("scenarioSelect");
  const loadScenarioBtn = document.getElementById("loadScenarioBtn");
  const info = document.getElementById("selectedInfo");

  const idx = scenarioSelect.value;
  if (idx === "" || idx == null) {
    loadScenarioBtn.disabled = true;
    info.textContent = "Scenario seçilmedi.";
    return;
  }

  const s = scenarioCache[Number(idx)];
  if (!s) {
    loadScenarioBtn.disabled = true;
    info.textContent = "Scenario bulunamadı.";
    return;
  }

  loadScenarioBtn.disabled = false;
  info.textContent = `Scenario seçildi: ${s.title}`;
}

function loadSelectedScenarioToEditor() {
  const scenarioSelect = document.getElementById("scenarioSelect");
  const idx = scenarioSelect.value;
  if (idx === "" || idx == null) {
    showToast("Önce scenario seç!");
    return;
  }
  const s = scenarioCache[Number(idx)];
  if (!s) {
    showToast("Scenario bulunamadı!");
    return;
  }

  // BDD input'a sadece o scenario bloğunu bas
  document.getElementById("bddInput").value = s.blockText;
  showToast("Scenario editöre aktarıldı!");
}

function loadWholeFeatureToEditor() {
  if (!currentFeatureText.trim()) {
    showToast("Önce feature seç!");
    return;
  }
  document.getElementById("bddInput").value = currentFeatureText;
  showToast("Tüm feature editöre aktarıldı!");
}

// Feature text içinden Scenario bloklarını ayıklar
// Hedef: """ ... """ içindeki BDD metinlerini (Feature: ... Scenario: ...) tek tek çıkarmak
function parseScenariosFromFeature(featureText) {
  const blocks = [];
  const seen = new Set(); // ✅ aynı BDD bloğunu tekrar eklememek için

  const re = /Given The BDD text to be analyzed is:\s*"""\s*([\s\S]*?)\s*"""/g;
  let m;

  while ((m = re.exec(featureText)) !== null) {
    const blockText = (m[1] || "").trim();
    if (!blockText) continue;

    // ✅ AYNI BDD TEXT DAHA ÖNCE EKLENDİYSE ATLANSIN
    if (seen.has(blockText)) continue;
    seen.add(blockText);

    let title = "Scenario Block";

    const scenarioLine =
      blockText.match(/^\s*Scenario Outline:\s*(.+)$/m) ||
      blockText.match(/^\s*Scenario:\s*(.+)$/m);

    const featureLine = blockText.match(/^\s*Feature:\s*(.+)$/m);

    if (scenarioLine && scenarioLine[1]) {
      title = scenarioLine[1].trim();
    } else if (featureLine && featureLine[1]) {
      title = featureLine[1].trim();
    } else {
      title =
        blockText.slice(0, 60).replace(/\s+/g, " ") +
        (blockText.length > 60 ? "..." : "");
    }

    blocks.push({ title, blockText });
  }

  // fallback
  if (blocks.length === 0 && featureText.trim()) {
    blocks.push({
      title: "Full Feature",
      blockText: featureText.trim(),
    });
  }

  return blocks;
}


// -----------------------------
// ✅ Existing Generate Functions (Requirement/Test/UML)
// -----------------------------

async function generateRequirements() {
  const input = document.getElementById("bddInput").value.trim();

  if (!input) {
    showToast("Lütfen BDD senaryosu girin!");
    return;
  }

  showLoading(true);

  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input, type: "requirement" }),
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();
    if (data.success) {
      displayOutput(data.result);
      switchTab("requirements");
      showToast("Requirement başarıyla oluşturuldu!");
    } else {
      throw new Error(data.error || "Unknown error");
    }
  } catch (error) {
    displayOutput(`❌ Hata: ${error.message}\n\nPython server çalıştırın: python server.py`);
    showToast("Bir hata oluştu!");
  } finally {
    showLoading(false);
  }
}

async function generateTestCases() {
  const input = document.getElementById("bddInput").value.trim();

  if (!input) {
    showToast("Lütfen BDD senaryosu girin!");
    return;
  }

  showLoading(true);

  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input, type: "testcase" }),
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();
    if (data.success) {
      document.getElementById("testcases-output").innerHTML = `<pre>${escapeHtml(data.result)}</pre>`;
      switchTab("testcases");
      showToast("Test case'ler oluşturuldu!");
    } else {
      throw new Error(data.error || "Unknown error");
    }
  } catch (error) {
    document.getElementById("testcases-output").innerHTML = `<pre>❌ Hata: ${escapeHtml(error.message)}</pre>`;
    showToast("Bir hata oluştu!");
  } finally {
    showLoading(false);
  }
}

async function generateUMLDiagram(diagramType) {
  const input = document.getElementById("bddInput").value.trim();
  const diagramNames = {
    usecase: "Use Case Diagram",
    sequence: "Sequence Diagram",
    class: "Class Diagram",
    activity: "Activity Diagram",
    state: "State Diagram",
  };

  if (!input) {
    showToast("Lütfen BDD senaryosu girin!");
    return;
  }

  showLoading(true);
  closeUMLDialog();

  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input, type: "uml", diagram_type: diagramNames[diagramType] }),
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();
    if (data.success) {
      // ✅ Biz PlantUML üretiyoruz. Şimdilik kodu ekranda gösterelim (garanti çalışır)
      // Sonraki adım: PlantUML'yi server-side render edip PNG/SVG döndürebiliriz.
      const plantumlCode = (data.result || "").trim();
      const outputDiv = document.getElementById("uml-output");
      outputDiv.innerHTML = `<pre>${escapeHtml(plantumlCode)}</pre>`;

      switchTab("uml");
      showToast(`${diagramNames[diagramType]} oluşturuldu!`);
    } else {
      throw new Error(data.error || "Unknown error");
    }
  } catch (error) {
    document.getElementById("uml-output").innerHTML = `<pre>❌ Hata: ${escapeHtml(error.message)}</pre>`;
    showToast("Bir hata oluştu!");
  } finally {
    showLoading(false);
  }
}

// -----------------------------
// ✅ UI Helpers
// -----------------------------
function displayOutput(text) {
  document.getElementById("requirements-output").innerHTML = `<pre>${escapeHtml(text)}</pre>`;
}

function showLoading(show) {
  document.getElementById("loadingOverlay").classList.toggle("hidden", !show);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 3000);
}

function clearInput() {
  document.getElementById("bddInput").value = "";
  showToast("Giriş temizlendi");
}

function copyOutput(tabName) {
  const outputText = document.getElementById(`${tabName}-output`).innerText;

  if (!outputText || outputText.includes("görünecek")) {
    showToast("Henüz kopyalanacak içerik yok!");
    return;
  }

  navigator.clipboard
    .writeText(outputText)
    .then(() => showToast("Panoya kopyalandı!"))
    .catch(() => showToast("Kopyalama başarısız!"));
}

function downloadOutput(tabName) {
  const outputText = document.getElementById(`${tabName}-output`).innerText;

  if (!outputText || outputText.includes("görünecek")) {
    showToast("Henüz indirilecek içerik yok!");
    return;
  }

  const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${tabName}_${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("Dosya indirildi!");
}

async function downloadDiagram() {
  // Şimdilik PlantUML kodunu indir (PNG değil)
  const text = document.getElementById("uml-output").innerText.trim();
  if (!text) {
    showToast("Henüz indirilecek diagram yok!");
    return;
  }

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `uml_plantuml_${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("PlantUML kodu indirildi!");
}

function switchTab(tabName) {
  document.querySelectorAll(".tab-content").forEach((tab) => tab.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"));
  document.getElementById(`${tabName}-tab`).classList.add("active");
  document.querySelector(`.tab-btn[onclick*="${tabName}"]`).classList.add("active");
}

function showUMLDialog() {
  if (!document.getElementById("bddInput").value.trim()) {
    showToast("Lütfen BDD senaryosu girin!");
    return;
  }
  document.getElementById("umlDialog").classList.remove("hidden");
}

function closeUMLDialog() {
  document.getElementById("umlDialog").classList.add("hidden");
}

document.getElementById("bddInput").addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "Enter") generateRequirements();
});

// XSS/HTML escape (pre içine basarken güvenli)
function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
