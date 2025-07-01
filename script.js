// 🌙 Toggle Dark Mode
const toggleBtn = document.getElementById('darkToggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// 📱 Toggle Mobile Navbar
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// 🤖 Basic AI Chatbot Logic (mocked)
function sendChat() {
  const input = document.getElementById('userInput');
  const chatlog = document.getElementById('chatlog');
  const userMsg = input.value.trim();

  if (userMsg === '') return;

  // Show user message
  const userBubble = document.createElement('div');
  userBubble.innerHTML = `<strong>You:</strong> ${userMsg}`;
  chatlog.appendChild(userBubble);

  // Simulate bot reply
  const botBubble = document.createElement('div');
  setTimeout(() => {
    botBubble.innerHTML = `<strong>Bot:</strong> ${getBotResponse(userMsg)}`;
    chatlog.appendChild(botBubble);
    chatlog.scrollTop = chatlog.scrollHeight;
  }, 500);

  input.value = '';
}

function getBotResponse(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('hello') || lower.includes('hi')) {
    return 'Hey there! 👋';
  } else if (lower.includes('your name')) {
    return 'I’m your AI assistant!';
  } else if (lower.includes('help')) {
    return 'Ask me anything about this website!';
  } else {
    return 'Sorry, I’m still learning. 😊';
  }
}
