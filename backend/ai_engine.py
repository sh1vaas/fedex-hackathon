from textblob import TextBlob
import datetime

def analyze_sentiment(text):
    # If the text is empty or too short, return neutral immediately
    if not text or len(text.strip()) < 3:
        return {"sentiment": "Neutral", "nudge": "Follow standard SOP."}

    analysis = TextBlob(text)
    polarity = analysis.sentiment.polarity
    
    # We make it more sensitive (0.1 instead of 0.2)
    if polarity <= -0.1:
        return {"sentiment": "Negative/Hardship", "nudge": "Offer a 15% hardship waiver immediately."}
    elif polarity >= 0.1:
        return {"sentiment": "Positive/Cooperative", "nudge": "Client is ready. Confirm payment date now."}
    else:
        return {"sentiment": "Neutral", "nudge": "Follow standard SOP."}

def get_bttc(case_id):
    windows = ["08:00 AM - 10:00 AM", "06:00 PM - 08:00 PM"]
    best = windows[hash(str(case_id)) % 2]
    return {"window": best, "channel": "WhatsApp" if "06:00" in best else "Call"}

def verify_compliance(call_count):
    hour = datetime.datetime.now().hour
    if hour < 8 or hour > 20:
        return {"allowed": False, "reason": "Restricted Calling Hours (8AM-8PM)"}
    return {"allowed": True}

def predict_recovery(data):
    clean_data = [
        data.get('days_overdue', 30),  # Default to 30 days if missing
        data.get('balance', 100.0),    # Default to $100
        data.get('attempts', 0),
        data.get('credit_score', 600)  # Default to 600
    ]
    return 0.75