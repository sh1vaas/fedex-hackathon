# 🚛 FedEx Smart DCA Hub
### AI-Powered Debt Collection & Automated Compliance Orchestrator

![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)
![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20Vite-blue)
![Backend](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python-yellow)
![Database](https://img.shields.io/badge/Database-Supabase%20%7C%20PostgreSQL-indigo)
![Deployment](https://img.shields.io/badge/Deployed%20on-Vercel%20%26%20Render-black)

---

## 📖 Project Overview

The **FedEx Smart DCA Hub** is a cloud-native application designed to modernize the interaction between Enterprise Creditors (FedEx) and external Debt Collection Agencies (DCAs).

Traditional debt collection relies on fragmented spreadsheets and manual oversight, leading to operational opacity and high compliance risks. This solution introduces a **centralized, API-first architecture** that orchestrates case allocation, enforces regulatory compliance programmatically, and augments human agents with real-time AI negotiation guidance.

### 🔑 Core Capabilities
1.  **Compliance-as-Code:** A server-side regulatory engine that physically prevents non-compliant interactions (e.g., calling outside legal hours or exceeding frequency caps).
2.  **AI Negotiation Copilot:** A Natural Language Processing (NLP) module that analyzes live conversation sentiment to suggest the "Next Best Action" (e.g., Hardship Waiver vs. Payment Demand).
3.  **Automated Dispute Resolution:** A self-service portal (Ombudsman AI) allowing debtors to upload payment proofs, triggering auto-suspension of collection activities.
4.  **Propensity Scoring:** Heuristic algorithms that prioritize accounts based on recoverability rather than alphabetical order.

---

## 🛠️ Technical Architecture

The application follows a decoupled **Client-Server architecture** using RESTful APIs.

### 1. Frontend (Agency Portal)
* **Framework:** React 18 (via Vite for fast HMR).
* **Styling:** CSS Grid/Flexbox for responsive dashboards.
* **State Management:** React Hooks (`useState`, `useEffect`) for real-time data binding.
* **Hosting:** Vercel Edge Network.

### 2. Backend (Intelligence Engine)
* **Framework:** FastAPI (Python 3.9+) for high-performance, asynchronous request handling.
* **NLP Engine:** `TextBlob` for sentiment polarity analysis and keyword extraction.
* **Validation:** Pydantic models for strict data typing and request validation.
* **Hosting:** Render Web Services.

### 3. Database & Storage
* **Primary DB:** Supabase (PostgreSQL) for relational data (Cases, Logs, DCAs).
* **Audit Trail:** Immutable logs stored for every API interaction to ensure governance.

---

## 📂 Repository Structure

```bash
fedex-hackathon/
├── backend/                        # Python FastAPI Backend
│   ├── ai_engine.py                # Core Logic: Sentiment & Compliance engines
│   ├── main.py                     # API Gateway & Route Definitions
│   ├── requirements.txt            # Python dependencies (pip)
│   └── .env.example                # Environment variable template
├── frontend/                       # React Frontend
│   ├── public/                     # Static assets
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   ├── App.jsx                 # Main Dashboard Logic
│   │   ├── main.jsx                # DOM Entry Point
│   │   └── index.css               # Global Styles
│   ├── package.json                # Node dependencies (npm)
│   └── vite.config.js              # Vite Build Config
├── README.md                       # Project Documentation
└── .gitignore                      # Git exclusion rules

```

---

## 🚀 Installation & Local Setup

Follow these steps to run the full stack environment on your local machine.

### Prerequisites

* **Node.js** (v16+) and **npm**
* **Python** (v3.8+)
* **Git**

### Step 1: Clone the Repository

```bash
git clone [https://github.com/sh1vaas/fedex-hackathon.git](https://github.com/sh1vaas/fedex-hackathon.git)
cd fedex-hackathon

```

### Step 2: Set Up the Backend (Python)

1. Navigate to the backend directory:
```bash
cd backend

```


2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

```


3. Install dependencies:
```bash
pip install -r requirements.txt

```


4. Start the FastAPI server:
```bash
uvicorn main:app --reload

```


*The API will be available at `http://127.0.0.1:8000*`

### Step 3: Set Up the Frontend (React)

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend

```


2. Install Node dependencies:
```bash
npm install

```


3. Start the development server:
```bash
npm run dev

```


*The UI will be available at `http://localhost:5173*`

---

## 📡 API Documentation

The backend exposes the following key endpoints used by the frontend.

### 1. Analyze Interaction (`POST /analyze`)

This is the primary endpoint that processes agent inputs and returns AI guidance.

* **Request Body:**
```json
{
  "text": "I lost my job and cannot pay right now.",
  "call_count": 2,
  "case_id": "FED-1002"
}

```


* **Response (Success):**
```json
{
  "status": "SUCCESS",
  "copilot": {
    "sentiment": "Negative/Hardship",
    "nudge": "Offer a 15% hardship waiver immediately."
  },
  "bttc": {
    "window": "09:00 AM - 11:00 AM",
    "channel": "Call"
  }
}

```


* **Response (Blocked by Compliance):**
```json
{
  "status": "BLOCKED",
  "reason": "BLOCKED: Outside legal calling hours (8AM-8PM)."
}

```



---

## 🧠 AI & Logic Modules

### 1. The Sentiment Engine (`ai_engine.py`)

We utilize a hybrid approach combining **Rule-Based Heuristics** and **Sentiment Polarity**:

* **Keyword Overrides:** Immediate detection of high-risk phrases ("lawyer", "harassment") or hardship markers ("job loss", "hospital").
* **Polarity Scoring:** `TextBlob` calculates a float value (-1.0 to +1.0). Scores below -0.1 trigger "Empathy Protocols"; scores above +0.1 trigger "Commitment Protocols."

### 2. The Compliance Guardrail

This module acts as a middleware interceptor. It validates every request against:

* **Time of Day:** Server time must be between 08:00 and 20:00 (Local Time).
* **Frequency:** Checks the daily interaction count for the specific `case_id`.

---

## 🔮 Roadmap & Future Improvements

While the current MVP is fully functional for the hackathon demonstration, the following features are planned for the production release:

1. **Model Evolution:** Transition from Heuristic Scoring to **XGBoost/LightGBM** models trained on historical FedEx closure data for 95%+ propensity accuracy.
2. **ETL Pipeline:** Implementation of Apache Airflow to handle bulk ingestion of legacy CSV formats from FedEx databases.
3. **Telephony Integration:** Webhooks to connect the Compliance Guardrail directly to Genesys/Avaya dialers to enforce blocking at the network level.
4. **Containerization:** Dockerizing the application for Kubernetes orchestration.

---

## 👥 Authors

**Team FedEx Smart DCA Hub**

* **Sivamani Singupuram** - Lead Developer & Architect

---
