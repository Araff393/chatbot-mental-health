const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const chatWindow = document.getElementById("chat-window");

let typingIndicator = null;

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

function addMessage(text, sender) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("message-wrapper", sender);

    if (sender === "bot") {
        const avatar = document.createElement("img");
        avatar.src = "/static/img/bot.png";
        avatar.classList.add("avatar-bot");
        wrapper.appendChild(avatar);
    }

    const bubble = document.createElement("div");
    bubble.classList.add("message", sender);
    bubble.innerText = text;

    wrapper.appendChild(bubble);
    chatWindow.appendChild(wrapper);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

/* === TYPING INDICATOR === */
function showTyping() {
    typingIndicator = document.createElement("div");
    typingIndicator.classList.add("typing-indicator");

    typingIndicator.innerHTML = `
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
    `;

    chatWindow.appendChild(typingIndicator);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function hideTyping() {
    if (typingIndicator) {
        typingIndicator.remove();
        typingIndicator = null;
    }
}

function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    // Munculkan animasi typing
    showTyping();

    fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
    })
    .then(res => res.json())
    .then(data => {
        hideTyping(); // hilangkan animasi typing

        addMessage(data.reply, "bot");

        if (data.crisis === true) {
            alert("Peringatan krisis: Harap hubungi layanan darurat atau hotline.");
        }
    });
}

// Tombol clear chat
const clearBtn = document.getElementById("clear-chat-btn");

clearBtn.addEventListener("click", () => {
    chatWindow.innerHTML = ""; // hapus semua pesan

    // Tambahkan ulang pesan awal chatbot
    addMessage("Halo, aku di sini untuk mendengarkan. Apa yang ingin kamu ceritakan hari ini?", "bot");
});
