from textblob import TextBlob
import datetime

def analyze_sentiment(text):
    polarity = TextBlob(text).sentiment.polarity
    if polarity < -0.2:
        return {"sentiment": "Angry", "nudge": "Offer a 15% hardship waiver."}
    elif polarity > 0.2:
        return {"sentiment": "Cooperative", "nudge": "Secure payment date now."}
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