from flask import Flask, render_template, request, jsonify
from backend.crisis_detector import is_crisis
from backend.ai_reply import generate_reply

app = Flask(__name__)

@app.get("/")
def index():
    return render_template("index.html")

@app.post("/chat")
def chat():
    data = request.json
    text = data.get("message", "")

    if is_crisis(text):
        return jsonify({
            "crisis": True,
            "reply": "Saya mendeteksi tanda bahaya. Tolong hubungi layanan darurat seperti 119 atau hubungi orang terdekat."
        })

    reply = generate_reply(text)

    return jsonify({
        "crisis": False,
        "reply": reply
    })

if __name__ == "__main__":
    app.run(debug=True)
