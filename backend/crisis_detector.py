def is_crisis(text: str):
    text = text.lower()
    keywords = [
        "bunuh diri",
        "pengin mati",
        "ingin mati",
        "mati saja",
        "suicide",
        "kill myself",
        "i want to die"
    ]
    return any(k in text for k in keywords)
