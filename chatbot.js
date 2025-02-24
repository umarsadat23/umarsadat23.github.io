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
  }
});

// Add a message to the chat window
function addMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
}

// Respond to user messages
function respondToMessage(message) {
  let response = "I'm sorry, I don't understand. Can you rephrase?";
  if (message.toLowerCase().includes('hi') || message.toLowerCase().includes('hello')) {
    response = "Hello! How can I help you?";
  } else if (message.toLowerCase().includes('contact')) {
    response = "You can contact me via the contact form or email.";
  } else if (message.toLowerCase().includes('name')) {
    response = "I'm your friendly chatbot!";
  }
  setTimeout(() => {
    addMessage('bot', response);
  }, 500); // Simulate a delay before responding
}