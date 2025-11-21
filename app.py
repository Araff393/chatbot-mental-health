import os
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

    # Amankan input agar tidak None
    text = data.get("message", "").strip()

    # Jika empty -> bot tetap balas
    if not text:
        return jsonify({
            "crisis": False,
            "reply": "Boleh ceritakan sedikit apa yang sedang kamu rasakan?"
        })

    # Deteksi krisis
    if is_crisis(text):
        return jsonify({
            "crisis": True,
            "reply": (
                "Aku menangkap tanda-tanda bahwa kamu sedang berada dalam kondisi yang sangat berat "
            "dan mungkin tidak aman. Tolong segera hubungi ULBK UNY di +62 823-2948-9495 "
            "atau layanan darurat 119. Kamu tidak harus menghadapi ini sendirian."
            )
        })

    # Panggil AI
    reply = generate_reply(text)

    return jsonify({
        "crisis": False,
        "reply": str(reply)  # paksa reply dalam string aman
    })


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host="0.0.0.0", port=port)
