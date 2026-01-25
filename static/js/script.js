const input = document.getElementById('user-input');
const chatContainer = document.getElementById('chat-container');
const sendBtn = document.getElementById('send-btn');

// Auto-resize textarea
input.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
    if (this.value === '') this.style.height = 'auto';
});

// Handle Enter key
input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

function addMessage(text, role) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${role}`;

    // Avatar
    const avatarData = role === 'user' ? '👤' : '🤖';

    // Content Processed (Markdown for system, Text for user)
    let contentHtml = text;
    if (role === 'system') {
        contentHtml = marked.parse(text);
    }

    msgDiv.innerHTML = `
        <div class="avatar">${avatarData}</div>
        <div class="content">${contentHtml}</div>
    `;

    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    // 1. Add User Message
    addMessage(text, 'user');
    input.value = '';
    input.style.height = 'auto';

    // 2. Loading State
    sendBtn.disabled = true;
    const loadingId = 'loading-' + Date.now();
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message system';
    loadingDiv.id = loadingId;
    loadingDiv.innerHTML = `
        <div class="avatar">🤖</div>
        <div class="content">Thinking...</div>
    `;
    chatContainer.appendChild(loadingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
        // 3. API Call
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_input: text })
        });

        const data = await response.json();

        // Remove Loading
        document.getElementById(loadingId).remove();

        if (data.status === 'success') {
            addMessage(data.test_cases_markdown, 'system');
        } else {
            addMessage('Error: ' + data.error_message, 'system');
        }

    } catch (e) {
        document.getElementById(loadingId).remove();
        addMessage('Network Error: ' + e.message, 'system');
    } finally {
        sendBtn.disabled = false;
        input.focus();
    }
}
