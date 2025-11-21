const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const chatWindow = document.getElementById("chat-window");
const clearBtn = document.getElementById("clear-chat-btn");
const crisisBox = document.getElementById("crisis-box");

let typingIndicator = null;

/* ==========================================================
   EVENT LISTENERS
   ========================================================== */
sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

clearBtn.addEventListener("click", () => {
    chatWindow.innerHTML = "";
    crisisBox.classList.remove("show");

    addMessage(
        "Halo, aku di sini untuk mendengarkan. Apa yang ingin kamu ceritakan hari ini?",
        "bot"
    );
});


/* ==========================================================
   TAMBAHKAN PESAN (BUBBLE) KE CHAT
   ========================================================== */
function addMessage(text, sender) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("message-wrapper", sender);

    // Bot avatar
   if (sender === "bot") {
    const avatar = document.createElement("img");
    avatar.src = "/static/img/bot.png";
    avatar.classList.add("avatar-bot");

    // pastikan avatar tidak salah ukuran
    avatar.style.maxWidth = "40px";
    avatar.style.maxHeight = "40px";

    wrapper.appendChild(avatar);
}


    // Chat bubble
    const bubble = document.createElement("div");
    bubble.classList.add("message", sender);
    bubble.innerText = text;
    wrapper.appendChild(bubble);

    chatWindow.appendChild(wrapper);

    scrollToBottom();
}


/* ==========================================================
   TYPING INDICATOR
   ========================================================== */
function showTyping() {
    typingIndicator = document.createElement("div");
    typingIndicator.classList.add("typing-indicator");

    typingIndicator.innerHTML = `
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
    `;

    chatWindow.appendChild(typingIndicator);
    scrollToBottom();
}

function hideTyping() {
    if (typingIndicator) {
        typingIndicator.remove();
        typingIndicator = null;
    }
}


/* ==========================================================
   SCROLL TO BOTTOM (Mobile friendly)
   ========================================================== */
function scrollToBottom() {
    setTimeout(() => {
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 80);
}


/* ==========================================================
   TAMPILKAN CRISIS BOX
   ========================================================== */
function showCrisisBox() {
    crisisBox.classList.add("show");
    scrollToBottom();
}


/* ==========================================================
   MENGIRIM PESAN KE BACKEND /chat
   ========================================================== */
function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    hideTyping();
    showTyping();

    fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
    })
    .then(res => res.json())
    .then(data => {
        hideTyping();

        addMessage(data.reply, "bot");

        if (data.crisis === true) {
            showCrisisBox();
        }
    })
    .catch(err => {
        hideTyping();
        addMessage("!!!!!!!!!!!!!!!!!!!!!!!", "bot");
    });
}
