// Chatbot Logic
const chatbotIcon = document.getElementById('chatbot-icon');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendMessage = document.getElementById('send-message');

// Open chat window when chatbot icon is clicked
chatbotIcon.addEventListener('click', () => {
  chatWindow.style.display = 'block';
  addMessage('bot', "Hello! How can I help you today?");
});

// Close chat window when close button is clicked
closeChat.addEventListener('click', () => {
  chatWindow.style.display = 'none';
});

// Send message when send button is clicked
sendMessage.addEventListener('click', () => {
  const message = userInput.value.trim();
  if (message) {
    addMessage('user', message);
    userInput.value = '';
    respondToMessage(message);
  } else {
    alert('Please type a message before sending.');
  }
});

// Send message when Enter key is pressed
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage.click();
  }
});

// Add a message to the chat window
function addMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  saveMessage(sender, message);
}

// Save messages to localStorage
function saveMessage(sender, message) {
  const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
  chatHistory.push({ sender, message });
  localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

// Load messages from localStorage
function loadMessages() {
  const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
  chatHistory.forEach((msg) => {
    addMessage(msg.sender, msg.message);
  });
}

// Respond to user messages
function respondToMessage(message) {
  // Show typing indicator
  const typingIndicator = document.createElement('div');
  typingIndicator.id = 'typing-indicator';
  typingIndicator.textContent = 'Bot is typing...';
  chatMessages.appendChild(typingIndicator);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  setTimeout(() => {
    // Remove typing indicator
    chatMessages.removeChild(typingIndicator);

    // Add bot's response
    let response;
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hello')) {
      response = "Hello! How can I help you?";
    } else if (lowerCaseMessage.includes('contact')) {
      response = "You can contact me via the contact form or email.";
    } else if (lowerCaseMessage.includes('name')) {
      response = "I'm your friendly chatbot!";
    } else if (lowerCaseMessage.includes('thank you') || lowerCaseMessage.includes('thanks')) {
      response = "You're welcome! 😊";
    } else if (lowerCaseMessage.includes('help')) {
      response = "Sure! I can help you with general inquiries. Feel free to ask me anything.";
    } else {
      response = "Thank you for your message! Your feedback is much appreciated. If you have any questions or suggestions, please fill out the contact form. I'd love to hear from you! 😊";
    }

    addMessage('bot', response);
  }, 1000); // Simulate a delay before responding
}

// Load messages when the page loads
window.addEventListener('load', loadMessages);
