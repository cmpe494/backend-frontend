// API Ayarları - Buraya kendi API key'inizi girin
const API_BASE_URL = "http://localhost:5000/api" // ⚠️ ÖNEMLİ: Python backend'in çalıştığından emin olun
const mermaid = window.mermaid // Declare the mermaid variable

// Requirement üretme fonksiyonu
async function generateRequirements() {
  const input = document.getElementById("bddInput").value.trim()

  if (!input) {
    showToast("Lütfen BDD senaryosu girin!")
    return
  }

  showLoading(true)

  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input, type: "requirement" }),
    })

    if (!response.ok) throw new Error(`API Error: ${response.status}`)

    const data = await response.json()
    if (data.success) {
      displayOutput(data.result)
      showToast("Requirement başarıyla oluşturuldu!")
    } else {
      throw new Error(data.error || "Unknown error")
    }
  } catch (error) {
    displayOutput(`❌ Hata: ${error.message}\n\nPython server çalıştırın: python server.py`)
    showToast("Bir hata oluştu!")
  } finally {
    showLoading(false)
  }
}

// Test Case üretme fonksiyonu
async function generateTestCases() {
  const input = document.getElementById("bddInput").value.trim()

  if (!input) {
    showToast("Lütfen BDD senaryosu girin!")
    return
  }

  showLoading(true)

  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input, type: "testcase" }),
    })

    if (!response.ok) throw new Error(`API Error: ${response.status}`)

    const data = await response.json()
    if (data.success) {
      document.getElementById("testcases-output").innerHTML = `<pre>${data.result}</pre>`
      switchTab("testcases")
      showToast("Test case'ler oluşturuldu!")
    } else {
      throw new Error(data.error || "Unknown error")
    }
  } catch (error) {
    document.getElementById("testcases-output").innerHTML = `<pre>❌ Hata: ${error.message}</pre>`
    showToast("Bir hata oluştu!")
  } finally {
    showLoading(false)
  }
}

async function generateUMLDiagram(diagramType) {
  const input = document.getElementById("bddInput").value.trim()
  const diagramNames = {
    usecase: "Use Case Diagram",
    sequence: "Sequence Diagram",
    class: "Class Diagram",
    activity: "Activity Diagram",
    state: "State Diagram",
  }

  showLoading(true)
  closeUMLDialog()

  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input, type: "uml", diagram_type: diagramNames[diagramType] }),
    })

    if (!response.ok) throw new Error(`API Error: ${response.status}`)

    const data = await response.json()
    if (data.success) {
      const mermaidCode = data.result
        .replace(/```mermaid\n?/g, "")
        .replace(/```\n?/g, "")
        .trim()

      const outputDiv = document.getElementById("uml-output")
      outputDiv.innerHTML = `<div class="mermaid">${mermaidCode}</div>`

      await mermaid.run({ querySelector: "#uml-output .mermaid" })

      switchTab("uml")
      showToast(`${diagramNames[diagramType]} oluşturuldu!`)
    } else {
      throw new Error(data.error || "Unknown error")
    }
  } catch (error) {
    document.getElementById("uml-output").innerHTML = `<pre>❌ Hata: ${error.message}</pre>`
    showToast("Bir hata oluştu!")
  } finally {
    showLoading(false)
  }
}

// Çıktıyı göster
function displayOutput(text) {
  document.getElementById("requirements-output").innerHTML = `<pre>${text}</pre>`
}

// Loading göster/gizle
function showLoading(show) {
  document.getElementById("loadingOverlay").classList.toggle("hidden", !show)
}

// Toast bildirimi göster
function showToast(message) {
  const toast = document.getElementById("toast")
  toast.textContent = message
  toast.classList.remove("hidden")
  setTimeout(() => toast.classList.add("hidden"), 3000)
}

// Girişi temizle
function clearInput() {
  document.getElementById("bddInput").value = ""
  showToast("Giriş temizlendi")
}

// Çıktıyı kopyala
function copyOutput(tabName) {
  const outputText = document.getElementById(`${tabName}-output`).innerText

  if (!outputText || outputText.includes("görünecek")) {
    showToast("Henüz kopyalanacak içerik yok!")
    return
  }

  navigator.clipboard
    .writeText(outputText)
    .then(() => showToast("Panoya kopyalandı!"))
    .catch(() => showToast("Kopyalama başarısız!"))
}

// Çıktıyı indir
function downloadOutput(tabName) {
  const outputText = document.getElementById(`${tabName}-output`).innerText

  if (!outputText || outputText.includes("görünecek")) {
    showToast("Henüz indirilecek içerik yok!")
    return
  }

  const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${tabName}_${Date.now()}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  showToast("Dosya indirildi!")
}

async function downloadDiagram() {
  const svgElement = document.querySelector("#uml-output svg")

  if (!svgElement) {
    showToast("Henüz indirilecek diagram yok!")
    return
  }

  const svgData = new XMLSerializer().serializeToString(svgElement)
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  const img = new Image()
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
  const url = URL.createObjectURL(svgBlob)

  img.onload = () => {
    canvas.width = img.width
    canvas.height = img.height
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0)

    canvas.toBlob((blob) => {
      const downloadUrl = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = `uml_diagram_${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(downloadUrl)
      URL.revokeObjectURL(url)
      showToast("Diagram PNG olarak indirildi!")
    })
  }
  img.src = url
}

// Tab geçişi fonksiyonu
function switchTab(tabName) {
  document.querySelectorAll(".tab-content").forEach((tab) => tab.classList.remove("active"))
  document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"))
  document.getElementById(`${tabName}-tab`).classList.add("active")
  document.querySelector(`.tab-btn[onclick*="${tabName}"]`).classList.add("active")
}

// UML Dialog gösterme fonksiyonu
function showUMLDialog() {
  if (!document.getElementById("bddInput").value.trim()) {
    showToast("Lütfen BDD senaryosu girin!")
    return
  }
  document.getElementById("umlDialog").classList.remove("hidden")
}

function closeUMLDialog() {
  document.getElementById("umlDialog").classList.add("hidden")
}

document.getElementById("bddInput").addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "Enter") generateRequirements()
})
