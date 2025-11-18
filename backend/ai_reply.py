import os
import requests
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def generate_reply(user_text):
    if not GROQ_API_KEY:
        return "API Key Groq tidak ditemukan. Pastikan sudah diatur di file .env."

    url = "https://api.groq.com/openai/v1/chat/completions"

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {GROQ_API_KEY}"
    }

    payload = {
        # MODEL BARU YANG TERSEDIA
        "model": "llama-3.3-70b-versatile",
        "messages": [
            {
                "role": "system",
                "content": (
                    "Kamu adalah chatbot kesehatan mental yang empatik, sopan, "
                    "dan tidak menghakimi. Jawabanmu harus singkat, lembut, dan "
                    "tidak memberikan saran medis atau diagnosis."
                )
            },
            {"role": "user", "content": user_text}
        ],
        "temperature": 0.7,
        "max_tokens": 150
    }

    try:
        response = requests.post(url, json=payload, headers=headers, timeout=20)

        if response.status_code != 200:
            print("Groq API ERROR:", response.text)
            return "Terjadi kendala saat menghubungi layanan AI."

        data = response.json()
        return data["choices"][0]["message"]["content"]

    except Exception as e:
        print("GROQ ERROR:", e)
        return "Maaf, terjadi gangguan saat memproses pesanmu."
