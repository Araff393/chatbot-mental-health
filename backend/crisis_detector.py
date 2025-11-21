def is_crisis(text: str):
    text = text.lower().strip()

    # ===== KATA KUNCI SANGAT KUAT =====
    strong_keywords = [
        "bunuh diri", "mau bunuh diri", "pengen bunuh diri", "pingin bunuh diri",
        "ingin bunuh diri", "niat bunuh diri", "bunuh diri aja", "bunuh diri saja",

        "ingin mati", "pengen mati", "pingin mati", "mau mati",
        "mati aja", "mati saja", "lebih baik mati",

        "suicide", "commit suicide", "kill myself", "want to kill myself",
        "i want to die", "i wanna die", "want to die",
        "end my life", "end this life", "die alone",
    ]

    # ===== RISIKO SEDANG =====
    medium_keywords = [
        "capek hidup", "cape hidup", "lelah hidup", "muak hidup",
        "bosan hidup", "hidup tidak berarti", "hidup ga berarti", "hidup gak berarti",
        "ga sanggup lagi", "gak sanggup lagi", "udah ga kuat", "udah gak kuat",
        "tidak kuat lagi", "tak kuat lagi",
        "ingin menghilang", "pengen hilang", "hilang saja",
        "ingin pergi selamanya", "pergi selamanya",
        "mengakhiri semuanya", "mengakhiri hidupku"
    ]

    # ===== TANDA DEEP DISTRESS =====
    soft_indicators = [
        "hidup percuma", "hidup sia sia", "hidup sia-sia",
        "tidak ada harapan", "tak ada harapan",
        "tidak berarti lagi",
        "tidak ada yang peduli", "ga ada yang peduli", "gak ada yang peduli",
        "sendirian terus", "merasa sendiri"
    ]

    # ===== DETEKSI =====
    if any(k in text for k in strong_keywords):
        return True  # langsung krisis

    if any(k in text for k in medium_keywords):
        return True  # tetap dianggap krisis untuk keamanan

    # soft indicators tidak langsung krisis
    return False
