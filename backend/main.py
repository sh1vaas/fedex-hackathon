from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.ai_engine import analyze_sentiment, get_bttc, verify_compliance

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)


app = FastAPI()

# This part allows your Frontend to talk to this Backend
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.post("/analyze")
def handle_interaction(data: dict):
    compliance = verify_compliance(data.get('call_count', 0))
    if not compliance["allowed"]:
        return {"status": "BLOCKED", "reason": compliance["reason"]}
    
    sentiment = analyze_sentiment(data.get('text', ""))
    bttc = get_bttc(data.get('case_id'))
    return {"status": "SUCCESS", "copilot": sentiment, "bttc": bttc}