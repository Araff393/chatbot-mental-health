def sanitize(text: str):
    """Membersihkan input dari karakter berbahaya."""
    return text.replace("<", "&lt;").replace(">", "&gt;")
