# BDD to Requirements Generator

## Sistem Açıklaması

Bu sistem BDD senaryolarınızı yapay zeka ile teknik dokümanlara dönüştürür:
- Requirements (Fonksiyonel ve Fonksiyonel Olmayan Gereksinimler)
- Test Case'ler (Pozitif ve Negatif Senaryolar)
- UML Diagramları (5 farklı tip)

## Dosya Yapısı

\`\`\`
project/
├── server.py          # Python Flask backend
├── index.html         # Web arayüzü
├── style.css          # Stil dosyası
├── script.js          # Frontend logic
├── requirements.txt   # Python bağımlılıkları
└── README.md          # Bu dosya
\`\`\`

## Kurulum ve Çalıştırma

### 1. Gereksinimler
\`\`\`bash
pip install -r requirements.txt
\`\`\`

### 2. API Key Ayarı
\`\`\`bash
# Windows
set GEMINI_API_KEY=your_api_key_here

# Linux/Mac
export GEMINI_API_KEY=your_api_key_here
\`\`\`

### 3. Sistemi Başlatın
\`\`\`bash
python server.py
\`\`\`

### 4. Tarayıcıda Açın
http://localhost:5000 adresine gidin.

## Kullanım

1. Sol panele BDD senaryonuzu yazın
2. İstediğiniz butona tıklayın:
   - **Requirement Üret**: Teknik gereksinimler
   - **Test Case Üret**: Test senaryoları
   - **UML Diagram Üret**: Görsel diyagramlar (5 tip)
3. Sonuçları kopyalayın veya indirin

## Teknik Detaylar

- **Backend**: Python Flask + Gemini AI 2.5 Flash
- **Frontend**: HTML5/CSS3/JavaScript (Vanilla)
- **UML**: Mermaid.js rendering
- **API**: RESTful JSON endpoints
- **Port**: 5000

## API Endpoints

- `POST /api/generate` - Ana üretim endpoint'i
  - `type`: "requirement" | "testcase" | "uml"
  - `text`: BDD senaryosu
  - `diagram_type`: (sadece UML için) diyagram tipi
