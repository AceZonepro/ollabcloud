// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyA_OT62IGPCaueoFN7yQP1EmeR1Yem4FW8",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const usernameInput = document.getElementById("username");
const messageForm = document.getElementById("messageForm");
const topicInput = document.getElementById("topic");
const messageInput = document.getElementById("messageInput");
const fileInput = document.getElementById("fileInput");
const messageList = document.getElementById("messageList");
const pinnedMessages = document.getElementById("pinnedMessages");
const searchBox = document.getElementById("searchBox");
const emojiPicker = document.getElementById("emojiPicker");

// Dark Mode
document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Emoji Picker
emojiPicker.addEventListener("emoji-click", e => {
  messageInput.value += e.detail.unicode;
});

// Send Message
messageForm.addEventListener("submit", async e => {
  e.preventDefault();
  const name = usernameInput.value.trim() || "Anonymous";
  const message = messageInput.value.trim();
  const topic = topicInput.value.trim();
  const file = fileInput.files[0];
  let mediaURL = "";

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      mediaURL = reader.result;
      sendToFirebase({ name, message, topic, mediaURL });
    };
    r
