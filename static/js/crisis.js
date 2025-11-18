function detectLocalCrisis(message) {
    const crisisWords = ["bunuh diri", "ingin mati", "suicide"];
    return crisisWords.some(k => message.toLowerCase().includes(k));
}
